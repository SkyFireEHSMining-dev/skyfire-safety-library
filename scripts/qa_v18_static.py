#!/usr/bin/env python3
"""Source-fidelity and cross-product safety checks for v0.18 candidate."""
from pathlib import Path
import json,re,subprocess,sys
ROOT=Path(__file__).resolve().parents[1]
def contents(p): return (ROOT/p).read_text(encoding="utf-8")
html=contents("index.html")
app=contents("app.js")
sw=contents("service-worker.js")
qa_storage=contents("storage-namespace-v18.js")
inspection=contents("inspection-ready-v16.js")
source=contents("ecfr-provenance-v18.js")
manifest=json.loads(contents("Data/ecfr-source-provenance-v18.json"))
assert manifest["schema"]=="skyfire-ecfr-provenance-v18"
assert set(manifest["titles"])=={"29","30"}
assert html.index("storage-namespace-v18.js") < html.index('src="app.js')
assert html.count('id="cfrSourceStatus"')==1
assert html.count('id="oshaSourceStatus"')==1
assert "ecfr-provenance-v18.js" in html
assert 'const SHELL_CACHE_NAME = "skyfire-quality-cache-v40";' in sw
assert 'const DATA_CACHE_NAME = "skyfire-regulatory-data-v2";' in sw
for path in ("storage-namespace-v18.js","ecfr-provenance-v18.js","Data/ecfr-source-provenance-v18.json"):
    assert "./"+path in sw,path
assert '"X-SkyFire-Data-Provenance","legacy-cache"' in sw
assert '"X-SkyFire-Data-Provenance","network-verified-source"' in sw
assert "window.SkyFireStorage." in app
assert "window.SkyFireStorage." in inspection
# These two modules are the only modules that called origin-wide Storage
# during the November inventory; they must not write raw production keys.
assert re.search(r'(?<!\.)\blocalStorage\.(?:getItem|setItem|removeItem|clear)',app) is None
assert re.search(r'(?<!\.)\blocalStorage\.(?:getItem|setItem|removeItem|clear)',inspection) is None
assert '"skyfire_qa_v18_"' in qa_storage
assert re.search(r'localStorage\.clear\(',qa_storage) is None
assert "source===\\"legacy-cache\\"" in source
for number in (29,30):
    title=manifest["titles"][str(number)]
    assert title["ecfr_versioner"]["up_to_date_as_of"]
    assert title["http"]["last_modified"]
    assert title["retrieved_sha256"]!=title["existing_sha256"]
    assert all(x in title for x in ("section_additions","section_removals","critical_section_comparison"))
for path in ROOT.glob("*.js"):
    p=subprocess.run(["node","--check",str(path)],capture_output=True,text=True)
    if p.returncode: raise AssertionError(f"{path.name}: {p.stderr}")
p=subprocess.run([sys.executable,str(ROOT/"scripts/ecfr_integrity_v18.py"),"verify"],capture_output=True,text=True)
if p.returncode:raise AssertionError(p.stderr[-2000:])
print(p.stdout)
print("PASS v0.18 static QA: GPO provenance, both XML bytes, JS parsing, scoped storage, SW cache transitions and source UI")
