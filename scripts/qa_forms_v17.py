#!/usr/bin/env python3
"""SkyFire v0.17 structural/static forms smoke test, not a substitute for device QA."""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
HTML = (ROOT / "index.html").read_text(encoding="utf-8")
SW = (ROOT / "service-worker.js").read_text(encoding="utf-8")
REG = json.loads((ROOT / "Data/msha-forms-registry-v17.json").read_text(encoding="utf-8"))
KNOWN_SHA256 = {
    "5000-23": "feb6fd371dbfda725f0d47b0f03140e552110b942301d53d5b912de142f6d567",
    "7000-51": "6294cf4e177430b923ebf321feec730d64bf4c935f7b6ebea55722142e8c20b8",
    "2000-38": "3a8f7d9c7f69d8b264d0c9e07117e5e53d8a9c76a3473b970735fc8e60ca96d7",
    "4000-9": "d09e5babbf75040384797d4e0b92b4f562852c8ad9f77c802304193e9e04861c",
}

def assert_true(pred, message):
    if not pred:
        raise AssertionError(message)

forms = REG["forms"]
assert_true(len(forms) == 14, "Expected exactly 14 MSHA source registry entries")
names = [f["formNumber"] for f in forms]
assert_true(len(set(names)) == 14, "Duplicate form number in source registry")
doc_names = set(p.name for p in (ROOT / "docs").glob("MSHA-form-*.pdf"))
assert_true(doc_names == {Path(f["localFilename"]).name for f in forms},
            "PDF inventory and provenance registry disagree")
for item in forms:
    n = item["formNumber"]
    path = ROOT / item["localFilename"]
    data = path.read_bytes()
    assert_true(data.startswith(b"%PDF"), f"{n}: not a PDF")
    assert_true(item["officialSourceUrl"].startswith("https://"), f"{n}: missing HTTPS official source")
    git_blob_sha = hashlib.sha1(f"blob {len(data)}\0".encode("ascii") + data).hexdigest()
    assert_true(item["localBlobSha"] == git_blob_sha, f"{n}: local blob provenance out of sync")
    link = f'docs/MSHA-form-{n}.pdf'
    assert_true(HTML.count(f'href="{link}"') == 2, f"{n}: expected open and download links")
    assert_true(f'./{link}' in SW, f"{n}: no explicit offline shell entry")
    subprocess.run(["pdfinfo", str(path)], check=True, capture_output=True)
    if n in KNOWN_SHA256:
        assert_true(hashlib.sha256(data).hexdigest() == KNOWN_SHA256[n],
                    f"{n}: verified federal instrument checksum mismatch")
        assert_true(item.get("localStatus", "").startswith("verified-replaced-"),
                    f"{n}: missing verified replacement status")
    print(f"OK form {n}: PDF, sha, registry, two links, offline manifest")

for asset in re.findall(r'(?:href|src)="([^"]+)"', HTML):
    if asset.startswith(("http://", "https://", "#", "mailto:", "tel:", "data:")):
        continue
    asset_path = asset.split("?",1)[0].split("#",1)[0]
    assert_true((ROOT / asset_path).is_file(), f"HTML references missing asset: {asset}")
ids = re.findall(r'\bid="([^"]+)"', HTML)
assert_true(len(ids) == len(set(ids)), "Duplicate static DOM IDs")
for section in re.findall(r'data-open-section="([^"]+)"', HTML):
    assert_true(section in ids, f"Missing navigation destination: {section}")
for asset in re.findall(r'["\x27\x60]\.\/([A-Za-z0-9_./-]+)(?:\?[^"\x27\x60]*)?["\x27\x60]', SW):
    if "${" in asset:
        continue
    assert_true((ROOT / asset).is_file(), f"Missing service-worker shell resource: {asset}")
assert_true("skyfire-quality-cache-v39" in SW and "quality-v39" in SW,
            "Form correction must ship with a new offline cache version")
json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
for path in ROOT.glob("*.js"):
    subprocess.run(["node", "--check", str(path)], check=True, capture_output=True)
for title in ("29","30"):
    source = ROOT / f"Data/ECFR-title{title}.xml"
    # Syntax validity, NOT currency or accuracy against effective federal text.
    for _, elem in ET.iterparse(source, events=("end",)):
        elem.clear()
    print(f"OK Title {title} XML syntax (source currency remains issue #79)")
print("PASS: 14 forms, provenance, checksums, local links, JS, XML, offline inventory")
print("LIMITATION: no actual browser/PWA offline usage, device interaction, or live agency-source validation")
