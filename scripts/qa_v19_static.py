#!/usr/bin/env python3
"""v0.19 product-brand, PDF-preview, and existing Forms Library contract checks."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
index = (root / "index.html").read_text(encoding="utf-8")
script = (root / "pdf-preview-v19.js").read_text(encoding="utf-8")
css = (root / "pdf-preview-v19.css").read_text(encoding="utf-8")
worker = (root / "service-worker.js").read_text(encoding="utf-8")
manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
app = (root / "app.js").read_text(encoding="utf-8")

assert manifest["name"] == "SkyFire Safety", manifest["name"]
assert manifest["short_name"] == "SkyFire Safety", manifest["short_name"]
assert manifest["scope"] == "./" and manifest["start_url"] == "./index.html"
assert "<title>SkyFire Safety</title>" in index
assert "<h1>SkyFire Safety</h1>" in index
assert "SkyFire Safety v0.19 Beta — Field Reliability & Forms Accessibility" in index
assert 'id="homeLastUpdated">November 21, 2026' in index
assert 'const dateText = "November 21, 2026";' in app
assert 'const SKYFIRE_FEEDBACK_VERSION = "v0.19 Beta";' in (root / "feedback.js").read_text(encoding="utf-8")
assert "SkyFire Safety Library" not in index
assert "pdf-preview-v19.css" in index and "pdf-preview-v19.js" in index
assert "SkyFire Safety Library" not in app and "app: \"SkyFire Safety\"" in app
assert "SkyFire Safety Library" not in (root / "feedback.js").read_text(encoding="utf-8")
assert "skyfire-quality-cache-v43" in worker
assert "pdf-preview-v19.css" in worker and "pdf-preview-v19.js" in worker
assert "sfPdfReturn" in script and "sfPdfClose" in script
assert 'dialog.showModal()' in script and 'dialog.addEventListener("close", restorePlace)' in script
assert "url.origin !== appRoot.origin" in script and "link.hasAttribute(\"download\")" in script
assert "html" not in script[:1]  # basic read sanity
assert ".sf-pdf-preview" in css
assert "<iframe" not in script and "<object" not in script
assert "lib.getDocument" in script and "pdf.numPages" in script
assert "Page \" + n + \" of \"" in script
assert "pdfModulePromise = import(modulePath)" in script
assert "sfPdfScroll" in script and "sfPdfPages" in script
assert "sfPdfPrev" in script and "sfPdfNext" in script
assert ".sf-pdf-scroll" in css and ".sf-pdf-page" in css
for filename, min_bytes in (("pdf.mjs", 100_000), ("pdf.worker.mjs", 100_000)):
    vendor = root / "vendor" / "pdfjs" / filename
    assert vendor.exists() and vendor.stat().st_size > min_bytes, vendor
    assert filename in worker, "Vendored PDF.js file missing from offline cache"
assert (root / "vendor" / "pdfjs" / "LICENSE").exists()
assert "version 5.4.624" in (root / "vendor" / "pdfjs" / "README.md").read_text(encoding="utf-8")
for filename in ("pdf.mjs", "pdf.worker.mjs"):
    assert b"getOrInsertComputed" not in (root / "vendor" / "pdfjs" / filename).read_bytes(), filename


opens = re.findall(r'<a href="docs/MSHA-form-([\w-]+)\.pdf" target="_blank" rel="noopener">Open Form</a>', index)
downloads = re.findall(r'<a href="docs/MSHA-form-([\w-]+)\.pdf" download>Download PDF</a>', index)
assert len(opens) == 14 and len(downloads) == 14, (len(opens), len(downloads))
assert set(opens) == set(downloads)
for form in set(opens):
    path = root / "docs" / ("MSHA-form-" + form + ".pdf")
    assert path.exists() and path.stat().st_size > 1000, path

print("PASS v0.19 static: SkyFire Safety branding, 14 form pairs, no PDF iframe, self-hosted PDF.js multipage renderer, PWA identity and offline cache")
