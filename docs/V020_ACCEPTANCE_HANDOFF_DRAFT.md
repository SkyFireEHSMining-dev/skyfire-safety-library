# SkyFire Safety v0.20 Beta — Engineering Handoff (DRAFT)

**As of:** November 22, 2026 (Pacific)  
**State:** Development branch implemented; numerical/automated browser QA underway; **NOT production or product-owner field acceptance**  
**Approved sprint:** [#87](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/87)  
**Draft review PR:** [#88](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/88)  
**Development branch:** `v0.20/occupational-heat-stress`  
**Production baseline:** `main` is v0.19 Beta; production merge **not authorized**.

## Implemented
1. **Occupational Heat Stress** as a fourth entry under the established **Safety Tools** hub. No permanent new Home card, no Weather/Conditions dependency.
2. **Heat Index Quick Screen:** manually entered temperature and relative humidity, °C/°F conversion, NWS lower-range/Rothfusz method, NIOSH occupational screening bands, selectable workload/site factors and source/limits wording.
3. **Measured WBGT Assessment:** instrument-entered onsite WBGT, workload, acclimatization, OSHA source-supported clothing adjustments and effective WBGT versus NIOSH-derived screening values, with disallowance of unknown/unlisted PPE factor.
4. Offline resource inclusion via service-worker shell cache v44. No location permission, weather API, paid backend, accounts or personal medical data.
5. Product-boundary documentation: independent SkyFire SDS and Education, Safety as public field aid, no duplication of mine-controlled official records/Lynx workflows.
6. Updated the Safety Director Responsibility & Tool Coverage Matrix in Google Drive (six tabs, 71 selected cell values) while retaining cell formatting, training/compliance/permit decision ownership and source links.

## Internal verification
| Gate | Evidence | State |
| --- | --- | --- |
| Source provenance, NWS/NIOSH/OSHA/MSHA material, heat-rule status | [Source ledger](HEAT_SOURCE_BASELINE_v0.20.md), discovery #15 | REVIEWED Nov 22 |
| Heat Index and WBGT numerical/invalid-input tests | `node scripts/qa_heat_v20.cjs` | PASS via [CI #45095114966](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/45095114966) |
| v0.19 app/PDF static regression and SW-cache migration | `python3 scripts/qa_v19_static.py` | PASS via CI #45095114966 |
| New heat module on Chromium/WebKit phone/tablet/desktop, including Chromium offline reload | `node scripts/qa_heat_v20_browser.cjs` | PASS via CI #45095114966, navigation extension pending rerun |
| Full v0.19 PDF.js multipage online/offline browser regression | `node scripts/qa_v19_browser.cjs` added to v0.20 CI | PENDING latest CI (not yet a recorded PASS) |
| Actual installed iPhone PWA: online, Airplane Mode cold reopen, both modes | Physical owner device | NOT TESTED |
| Actual installed iPad | Physical owner device | NOT TESTED / exception not approved |
| Upgrade from v0.19 with preservation of CFR caches/bookmarks/inspection data | Upgrade regression | NOT YET VERIFIED for this release |
| Isolated HTTPS hosted QA preview | N/A — GitHub branch source + CI sandbox currently only | NOT ESTABLISHED |
| Product owner acceptance and production merge | Separate approval required | NOT AUTHORIZED |

## Core user QA script once isolated preview is available
1. Open Safety Tools → Occupational Heat Stress on iPhone. Heat Index: 100°F and 40% RH should show approximately **109.3°F**, High **screening** band, not "Safe/Unsafe". Confirm Back and Home navigation.
2. Choose Measured WBGT; with **24°C**, **Heavy**, **Unacclimatized**, and **Double-layer cloth**, effective WBGT is **27°C** versus selected recommended value **23°C**; assessment should flag added controls. Choose **Other/unlisted PPE** and verify calculation is blocked, not guessed.
3. Refresh online so the newly published package can be cached. Activate Airplane Mode, fully close/reopen the installed PWA and repeat both modes. Verify existing 29/30 CFR references, bookmarks and MSHA forms remain available.
4. Confirm source links do not imply they are freshly retrieved while offline, and emergency conditions refer to site response rather than an automatic permit decision.

## Explicit exclusions / non-claims
No automatic start/stop or work-rest schedules, no diagnosis/medical profile, no online weather data, no computed WBGT substitute for real instrument readings, no legal MSHA compliance certification, no automatic employer heat-program approval. NIOSH/OSHA tables are recommendations and qualified site review prevails.

## Important release boundary
- Preserve `main` and GitHub Pages **v0.19** until owner acceptance and explicit release approval.
- Draft PR #88 must remain **DRAFT** until acceptance prerequisites are satisfied.
- No automated GitHub notification emails or production release announcements. MSHA learning/news schedules unaffected.
- Final v0.20 release notes, saved quarterly LinkedIn release archive, production deployment checks, issue/Drive closeout and release metadata are **not yet completed**.
