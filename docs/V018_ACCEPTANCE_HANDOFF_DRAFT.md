# SkyFire v0.18 Beta — Acceptance Handoff (CTO BUILD COMPLETE / OWNER QA PENDING)
**Sprint:** #83 | **Primary:** #79 | **Supporting:** #82  
**QA installation:** existing SkyFire QA icon at https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/  
**State:** READY FOR PRODUCT OWNER'S PHYSICAL ACCEPTANCE. All mandatory source, offline, migration, QA isolation and regression tests have passed. Production remains v0.17. No release authorization or physical device pass is implied.

## Internal QA evidence — completed on November 17, 2026 Pacific
- [x] Authoritative Title 29/30 official GPO acquisition, exact source hashes / section-change diff and eCFR API dates: [#44206930663](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44206930663) PASS.
- [x] Static source/schema/JS/storage invariant QA: [#44209610813](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44209610813) PASS.
- [x] Browser Title 29 and Title 30 readers, date labels, search and offline XML: [#44210980589](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44210980589) PASS.
- [x] Same-origin QA bookmark and Inspection Ready state isolation: [#44210980589](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44210980589) PASS.
- [x] Hosted HTTPS QA preview, both CFR readers online/offline, production v0.17 unchanged: [#44208498820 attempt 2](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44208498820) PASS, following [GitHub Pages preview update #44210355949](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44210355949) PASS.
- [x] Existing installed v0.17 service-worker migration, preserved bookmarks and offline CFR, correct legacy/fresh cache status, eventual new SHA from official source: [#44210268217](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44210268217) PASS.
- [x] Broad existing SkyFire field modules (Risk, ROI, Mine Act, Inspection/Incident Ready, Forms Library and guidance): [#44210980589](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44210980589) PASS on phone/desktop-sized browser.
- [ ] Actual physical iPhone installed QA app, bookmarks and offline reader acceptance: OWNER PENDING.
- [ ] Production release merge and final v0.18 public metadata: NOT AUTHORIZED.

## Implementation intent
1. Refresh both offline CFR titles from GPO authoritative eCFR bulk XML with SHA-256/provenance. Display GPO file last-modified, eCFR API up-to-date-through, date checked, app release date and offline status as separate fields.
2. Protect saved bookmarks / Inspection Ready state by retaining existing production keys and isolating QA keys. The existing QA Home Screen installation is updated in place.
3. Preserve offline first-load process: open SkyFire QA online, enter each CFR reader and let the section list finish loading once before the offline test. A Home Screen app first opened only in Airplane Mode cannot be expected to have initialized.

## Product owner acceptance: test only after CTO hands off a validated QA build
**Step 1 — QA/source status online**
- Open *SkyFire QA* Home Screen icon online. Verify a yellow **SkyFire v0.18 TEST PREVIEW** banner.
- Navigate Regulatory Resources → MSHA/30 CFR. Confirm text loads, search for `56.18002`, open the full section, and read the new source strip. It should distinguish GPO modified date, eCFR API through-date, last-checked and offline status; not claim live currentness.
- Repeat OSHA/29 CFR with `1910.1200`.
- Report any empty/error result or inaccurate dates; do not infer a provision's current legal effect from the app date alone.

**Step 2 — actual iPhone offline reader**
- With both CFR readers completely loaded online, turn on Airplane Mode and disable Wi-Fi.
- Fully close and reopen the *SkyFire QA* Home Screen app. Open Title 30 and Title 29, search/expand the same sections offline. Confirm the source strip explicitly says offline.
- If offline content doesn't load, note which title and provide screenshot. Do not clear Safari data or reinstall either app.

**Step 3 — isolated QA saved state**
- While in *SkyFire QA*, create a new CFR bookmark folder named `QA Isolation Test`.
- Open the *regular production SkyFire* app. It should NOT contain that newly created QA folder.
- Return to QA: the folder should still be there. Delete only the test QA folder afterward (never a production folder).
- Check Inspection Ready saved states if supported by the current UI and repeat only if the tool's location is clear; no need to overwrite genuine production preparation records.

**Step 4 — broader regression if available**
- Check representative safety tools, Mine Act, Inspection Ready and Form 5000-23 navigation. Do not treat iPad physical acceptance as complete without an actual iPad test.
- Confirm the production app remains on v0.17 until the final merge is authorized.

## Known limitations
The eCFR is an unofficial, frequently updated editorial compilation; cached SkyFire reference is dated, not an always-current live legal database. A newly proposed rule is not automatically the law. Source dates do not prove independent review of every section. CFR §46.3 and Title 29 section inventory changed; the authoritative-source diff must remain preserved. No data migration should overwrite or merge production bookmarks into QA. Future periodic refreshes require verification and authorization; auto-deployment is intentionally disabled.
