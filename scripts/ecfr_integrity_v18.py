#!/usr/bin/env python3
"""SkyFire eCFR bulk-source integrity check / guarded two-title refresh.

Usage:
  python3 scripts/ecfr_integrity_v18.py check
  python3 scripts/ecfr_integrity_v18.py apply
  python3 scripts/ecfr_integrity_v18.py verify

'check' never writes; 'apply' fetches and validates BOTH titles before writing
either file. Updates only the isolated development branch via an authorized CI
workflow. No automatic scheduling or production deployment.
"""
import datetime as dt
import difflib
import email.utils
import hashlib
import json
import pathlib
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter

ROOT = pathlib.Path(__file__).resolve().parents[1]
DATA = ROOT / "Data"
METADATA = DATA / "ecfr-source-provenance-v18.json"
TITLES = (29, 30)
URL = "https://www.govinfo.gov/bulkdata/ECFR/title-{t}/ECFR-title{t}.xml"
API = "https://www.ecfr.gov/api/versioner/v1/titles.json"
CRITICAL = {
    29: ["1910.1200", "1910.134", "1910.147", "1910.95", "1926.501"],
    30: ["46.3", "46.5", "48.5", "50.10", "56.18002", "56.14107", "60.1"],
}

def utc_now():
    return dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds")

def sha(raw):
    return hashlib.sha256(raw).hexdigest()

def request_bytes(url, max_bytes):
    req = urllib.request.Request(url, headers={
        "User-Agent": "SkyFire Safety Library Source-Integrity/0.18 (public research; github repo)",
        "Accept": "application/xml,application/json,text/xml,*/*"
    })
    # The eCFR API may reject automated clients; it is optional and must be
    # recorded as unavailable, never replaced by invented freshness dates.
    with urllib.request.urlopen(req, timeout=90) as r:
        if r.status != 200: raise RuntimeError(f"HTTP {r.status}: {url}")
        blob = r.read(max_bytes + 1)
        if len(blob) > max_bytes: raise RuntimeError(f"Source unexpectedly large: {url}")
        return blob, {
            "last_modified": r.headers.get("Last-Modified"),
            "etag": r.headers.get("ETag"),
            "content_type": r.headers.get("Content-Type"),
            "final_url": r.url
        }

def section_number(raw):
    if not raw: return ""
    text = raw.replace("§", "").strip().replace("\u00a0", " ")
    m = re.search(r"\b(\d{1,4}\.\d{1,7})\b", text)
    return m.group(1) if m else ""

def inspect_xml(path, title):
    numbers=set()
    samples={}
    sample_text={}
    tagcounts=Counter()
    try:
        for _, el in ET.iterparse(str(path), events=("end",)):
            tag=el.tag.rsplit("}",1)[-1]
            if tag == "DIV8" and el.get("TYPE","").upper()=="SECTION":
                num=section_number(el.get("N") or el.findtext("HEAD") or "")
                if num:
                    numbers.add(num)
                    if num in CRITICAL[title]:
                        wording=" ".join("".join(el.itertext()).split())
                        samples[num]=hashlib.sha256(wording.encode()).hexdigest()
                        sample_text[num]=wording
                tagcounts["sections"] += 1
                el.clear()
            elif tag in ("DIV1","DIV5","DIV6","DIV9"):
                tagcounts[tag] += 1
                if tag in ("DIV1","DIV5","DIV6","DIV9"): el.clear()
    except ET.ParseError as exc:
        raise RuntimeError(f"Malformed XML Title {title}: {exc}") from exc
    if tagcounts["sections"] < (1500 if title==30 else 5000):
        raise RuntimeError(f"Title {title}: implausibly few sections: {tagcounts['sections']}")
    missing=[n for n in CRITICAL[title] if n not in numbers]
    if missing: raise RuntimeError(f"Title {title}: missing critical test sections {missing}")
    return {"section_count":tagcounts["sections"],"unique_section_numbers":len(numbers),
            "critical_sections":samples,"critical_text":sample_text,"all_section_numbers":sorted(numbers),
            "structural_counts":dict(tagcounts)}

def versioner_status():
    try:
        raw,headers=request_bytes(API,1_000_000)
        j=json.loads(raw)
        return ({str(e["number"]):{
           "latest_amended_on":e.get("latest_amended_on"),
           "latest_issue_date":e.get("latest_issue_date"),
           "up_to_date_as_of":e.get("up_to_date_as_of")}
           for e in j.get("titles",[]) if e.get("number") in TITLES},
           {"retrieved":utc_now(),"url":API,"source":"eCFR versioner API"})
    except Exception as exc:
        return {}, {"retrieved":utc_now(),"url":API,
                    "error":type(exc).__name__+": "+str(exc)[:180],
                    "source":"eCFR versioner API unavailable; no up-to-date claim"}

def check(apply=False):
    import tempfile
    results={}
    info={}
    verified,versioner=versioner_status()
    with tempfile.TemporaryDirectory(prefix="skyfire-ecfr-") as tmp:
        staging=pathlib.Path(tmp)
        for t in TITLES:
            path=DATA / f"ECFR-title{t}.xml"
            old_bytes=path.read_bytes()
            old_sha=sha(old_bytes)
            old_info=inspect_xml(path,t)
            blob,h=request_bytes(URL.format(t=t),60_000_000)
            if b"<?xml" not in blob[:150] and b"<ECFR" not in blob[:1500]:
                raise RuntimeError(f"Title {t}: source is not recognizable XML")
            new=staging/path.name
            new.write_bytes(blob)
            new_info=inspect_xml(new,t)
            if new_info["section_count"] < old_info["section_count"]*0.85:
                raise RuntimeError(f"Title {t}: >15% section loss vs baseline")
            changes={n: ("changed" if old_info["critical_sections"].get(n)!=new_info["critical_sections"].get(n)
                         else "same") for n in CRITICAL[t]}
            additions=sorted(set(new_info["all_section_numbers"])-set(old_info["all_section_numbers"]))
            removals=sorted(set(old_info["all_section_numbers"])-set(new_info["all_section_numbers"]))
            print(json.dumps({"title":t,"added_sections":additions[:80],"removed_sections":removals[:80],
                        "total_added":len(additions),"total_removed":len(removals)}))
            for n in CRITICAL[t]:
                if changes[n]=="changed":
                    old_words=old_info["critical_text"][n].split()
                    new_words=new_info["critical_text"][n].split()
                    difference=list(difflib.unified_diff(old_words,new_words,fromfile="bundled-"+n,tofile="GPO-"+n,n=7))
                    print(json.dumps({"title":t,"critical_change":n,"token_diff_lines":difference[:140],
                                      "diff_truncated":len(difference)>140}))
            results[str(t)]={"source_url":URL.format(t=t),"existing_sha256":old_sha,
                  "retrieved_sha256":sha(blob),"existing_bytes":len(old_bytes),
                  "retrieved_bytes":len(blob),"old_sections":old_info["section_count"],
                  "new_sections":new_info["section_count"],"critical_section_comparison":changes,
                  "retrieved_checks":{k:v for k,v in new_info.items() if k not in ("critical_text","all_section_numbers")},
                  "section_additions":additions,"section_removals":removals,
                  "http":h,"ecfr_versioner":verified.get(str(t)),
                  "changed":old_sha!=sha(blob)}
            info[str(t)]=new
            print(json.dumps({"title":t,"result":"VALIDATED","existing_sha256":old_sha,
                    "new_sha256":sha(blob),"section_counts":[old_info["section_count"],new_info["section_count"]],
                    "critical_differences":changes,"http_last_modified":h["last_modified"],
                    "ecfr_versioner":verified.get(str(t))}))
        if apply:
            # Write only after both titles passed validation.
            for t in TITLES:
                destination=DATA/f"ECFR-title{t}.xml"
                incoming=info[str(t)]
                destination.write_bytes(incoming.read_bytes())
            DATA.mkdir(exist_ok=True)
            manifest={"schema":"skyfire-ecfr-provenance-v18","verification_time_utc":utc_now(),
              "publisher":"U.S. Government Publishing Office (GovInfo eCFR bulk data)",
              "source_type":"eCFR continually updated unofficial editorial compilation (not annual legal CFR edition)",
              "ecfr_status_api":versioner,
              "note":"HTTP Last-Modified is file publication metadata; latest_amended_on is not the file snapshot date. Confirm applicable effective dates in controlling text. Cached/offline copy is not live.",
              "titles":results}
            METADATA.write_text(json.dumps(manifest,indent=2,sort_keys=True)+"\n",encoding="utf-8")
            print("APPLY COMPLETE: both new XML files and provenance manifest written")
        else:
            print("CHECK COMPLETE: no changes written")

def verify():
    if not METADATA.is_file():
        raise RuntimeError("Provenance manifest absent")
    j=json.loads(METADATA.read_text())
    for t in TITLES:
        e=j["titles"][str(t)]
        path=DATA/f"ECFR-title{t}.xml"
        d=path.read_bytes()
        if sha(d)!=e["retrieved_sha256"]: raise RuntimeError(f"Title {t}: stored bytes do not match provenance")
        parsed=inspect_xml(path,t)
        if parsed["section_count"]!=e["new_sections"]: raise RuntimeError(f"Title {t}: section count mismatch")
        print(f"PASS Title {t}: SHA-256 source manifest and {parsed['section_count']} sections")
    print("PASS release XML integrity")

if __name__=="__main__":
    mode=sys.argv[1] if len(sys.argv)>1 else "check"
    if mode=="verify": verify()
    elif mode=="check": check(False)
    elif mode=="apply": check(True)
    else: raise SystemExit("Specify check, apply or verify")
