#!/usr/bin/env python3
import hashlib, io, json, re, shutil, urllib.request, zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

PINNED = "https://uscode.house.gov/download/releasepoints/us/pl/119/103/xml_usc30@119-103.zip"
TARGETS = {"802","813","814","815","817","820"}
OUT = Path("Data/mine-act")


def local(tag):
    return tag.rsplit("}", 1)[-1]


def clean(value):
    return re.sub(r"\s+", " ", value or "").strip()


def inline_text(el):
    parts = [el.text or ""]
    for child in el:
        tag = local(child.tag)
        cls = child.attrib.get("class", "").lower()
        # Keep statutory wording only. OLRC editorial notes and footnotes are
        # source metadata and must not appear inside the verbatim law display.
        if tag not in {"note", "noteRef", "footnote", "footnoteRef", "notes"} and "footnote" not in cls:
            parts.append(inline_text(child))
        parts.append(child.tail or "")
    return "".join(parts)


def direct_num(el):
    for child in el:
        if local(child.tag) == "num":
            return clean(inline_text(child))
    return ""


def render_unit(el):
    lines, number, used = [], direct_num(el), False
    for child in el:
        tag = local(child.tag)
        if tag in {"num", "heading", "sourceCredit", "notes", "note", "footnote"}:
            continue
        if tag in {"content", "chapeau"}:
            text = clean(inline_text(child))
            if text:
                lines.append(((number + " ") if number and not used else "") + text)
                used = True
        elif tag in {"subsection", "paragraph", "subparagraph", "clause", "subclause", "item"}:
            if number and not used:
                lines.append(number)
                used = True
            lines.extend(render_unit(child))
    if number and not used:
        lines.append(number)
    return lines


def section_number(section):
    ident = section.attrib.get("identifier", "")
    m = re.search(r"/s(\d+)$", ident)
    if m:
        return m.group(1)
    return re.sub(r"\D", "", direct_num(section))


def validate_source_fidelity(found):
    joined = "\n".join(found.values())
    if "Probably should" in joined or "So in original" in joined:
        raise RuntimeError("Editorial footnote text leaked into statutory output")

    required_literals = {
        "813": "Whenever a repersentative of the miners",
        "815": "pursuant to his paragraph.",
        "820": "not more than $$5,000 for each day",
    }
    for num, literal in required_literals.items():
        if literal not in found[num]:
            raise RuntimeError(f"Expected source-fidelity wording missing from section {num}: {literal!r}")


def main():
    req = urllib.request.Request(PINNED, headers={"User-Agent":"SkyFire-source-refresh/0.16"})
    raw = urllib.request.urlopen(req, timeout=60).read()
    with zipfile.ZipFile(io.BytesIO(raw)) as zf:
        name = next(n for n in zf.namelist() if n.lower().endswith(".xml"))
        root = ET.fromstring(zf.read(name))

    found = {}
    for el in root.iter():
        if local(el.tag) != "section":
            continue
        num = section_number(el)
        if num in TARGETS:
            found[num] = "\n\n".join(render_unit(el)).strip() + "\n"

    missing = TARGETS - found.keys()
    if missing:
        raise RuntimeError(f"Missing U.S. Code sections: {sorted(missing)}")

    validate_source_fidelity(found)

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)
    hashes = {}
    for num in sorted(found, key=int):
        path = OUT / f"{num}.txt"
        path.write_text(found[num], encoding="utf-8")
        hashes[num] = hashlib.sha256(found[num].encode()).hexdigest()
    (OUT / "source-meta.json").write_text(json.dumps({
        "source":"Office of the Law Revision Counsel, U.S. Code Title 30",
        "release_point":"Public Law 119-103 (2026-09-02)",
        "source_url":PINNED,
        "sections":hashes
    }, indent=2) + "\n", encoding="utf-8")
    print("Generated", ", ".join(sorted(found, key=int)))


if __name__ == "__main__":
    main()
