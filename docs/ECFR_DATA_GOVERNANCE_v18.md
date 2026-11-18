# SkyFire v0.18 — Offline eCFR Source Integrity & Refresh Governance

## Scope and authoritative sources
- **Data source:** U.S. Government Publishing Office (GovInfo) eCFR XML; not the annual CFR print-edition XML.
- Title 29: https://www.govinfo.gov/bulkdata/ECFR/title-29/ECFR-title29.xml
- Title 30: https://www.govinfo.gov/bulkdata/ECFR/title-30/ECFR-title30.xml
- **Date-status cross-check:** https://www.ecfr.gov/api/versioner/v1/titles.json
- GPO user guide: https://www.govinfo.gov/bulkdata/ECFR/resources/ECFR-XML-User-Guide.pdf
- eCFR is a continually updated **unofficial editorial compilation**. Actual applicability, amendment effective dates, stays and legal interpretation must be independently evaluated. A *proposed rule* does not automatically change effective regulation text.

## Captured v0.18 source snapshot
Date checked: **November 17, 2026 Pacific / November 18 UTC**, committed to the development branch only.

| Field | 29 CFR / OSHA | 30 CFR / MSHA |
|---|---|---|
| GPO XML HTTP last-modified (GMT) | Nov 12, 2026 | Nov 13, 2026 |
| eCFR API reports current through | Nov 13, 2026 | Nov 13, 2026 |
| eCFR API latest amended | Nov 10, 2026 | Nov 12, 2026 |
| Old bundled SHA-256 | `85b5561b9753d64151d9af4bff301578805b3aabfb0746e93da85a6b6a1bb7ac` | `eb6842184d0c4c2e1f5b7a47e80740c247af5c2e9c1ecc0440155e9934145846` |
| Updated GPO XML SHA-256 | `c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3` | `a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c` |
| Section count (old → refreshed) | 7,284 → 7,262 | 5,954 → 5,954 |

The exact source URL, HTTP metadata, retrieval time, old/new hashes, complete section additions/removals, and critical section comparison are stored in `Data/ecfr-source-provenance-v18.json`. These *source freshness fields are not interchangeable*:
- **GPO Last-Modified**: timestamp of the distributed XML file;
- **latest amended**: last eCFR amendment date reported by API, not proof the entire source changed on that day;
- **latest issue date**: latest publication issue reported by API;
- **up-to-date-as-of**: eCFR's own coverage status at acquisition;
- **last checked**: SkyFire's source verification time;
- **app last updated**: when a SkyFire production release shipped, independent of all above.

## Notable source differences and interpretation boundary
- Title 29: 25 distinct section-number identifiers were removed from the current bundled set, and 2 were added. The source comparison recorded all numbers in the manifest; this is not independent legal analysis of why each was removed.
- Title 30: §46.3 differs in the current GPO XML by an MSHA contact-address update (200 Constitution Avenue NW, Washington, DC 20210 replacing an Arlington address) and a Feb 26, 2026 Federal Register source reference. Other sampled high-use 30 CFR provisions had matching normalized text. A changed sample is not a declaration of legal applicability/effectiveness without controlling-authority review.
- Sampled 29 CFR provisions §1910.1200, §1910.134, §1910.147, §1910.95 and §1926.501 had equal normalized text between the prior bundle and the GPO acquisition. This is bounded regression evidence; it is not exhaustive certification.

## Repeatable source lifecycle
1. **Read-only check**: `python3 scripts/ecfr_integrity_v18.py check`. Downloads *both* official XML files to a temporary directory, parses/compares all sections, enforces critical section preservation and a section-count regression threshold, prints hashes and diffs. Does not write files.
2. **Explicitly authorized refresh**: `python3 scripts/ecfr_integrity_v18.py apply`. Validates both files first; then writes `Data/ECFR-title29.xml`, `Data/ECFR-title30.xml` and the structured source manifest to the working copy. Run only in a reviewed development branch and verify before commit.
3. **Offline integrity**: `python3 scripts/ecfr_integrity_v18.py verify`. Parses and verifies both exact data SHA-256 values/counts against the manifest. `scripts/qa_v18_static.py` also checks link/status/JS/storage invariants.
4. Review the old/new changed section list. Have a qualified reviewer handle amendments, effective dates or conflicting legal sources. A scraper/last-modified timestamp alone is insufficient.
5. Run browser, search, bookmark migration and offline PWA regression before releasing. Never silently deploy source updates directly to `main`.

## Offline behavior
The CFR XML is stored through the service worker's Cache Storage (not as giant localStorage strings). Its v0.18 data cache version is intentionally advanced. During an upgrade, the old `skyfire-regulatory-data-v1` cache is preserved rather than discarded. The v0.18 reader first attempts a fresh online fetch into the new v2 cache; when offline and v2 has no content, it falls back to v1 with a `legacy-cache` marker. The old cache is deleted only after both new Title 29 and 30 files have been stored in v2. This prevents an upgrade from losing existing downloaded CFR data and avoids falsely giving a legacy XML file the new source date.

The source manifest is precached as a small shell asset. The visible reader states **GPO file last modified**, **eCFR reported current through**, **source integrity check**, and **app release date separately**, with an offline warning and official eCFR link. It does not provide legally authoritative real-time amendments.

## Intentionally not implemented
No paid hosting, user login, back-end database, automatic nightly deployment, notification engine, or legal interpretation engine. Refreshes must be reviewed and explicitly authorized for each future release.
