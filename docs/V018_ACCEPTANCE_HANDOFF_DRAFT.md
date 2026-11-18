# SkyFire v0.18 Beta — Acceptance Handoff (Draft; production NOT released)
**Sprint:** #83 | **Primary:** #79 | **Supporting:** #82  
**QA installation:** existing SkyFire QA icon at https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/  
**State:** CTO build / internal QA; only begin manual steps once the v0.18 yellow TEST PREVIEW banner and automated pass evidence are confirmed.

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

## CTO evidence required before handoff
- [ ] GPO Title 29/30 updated XML hashes and section diff recorded; source dates verified from official API/HTTP.
- [ ] Static/source/schema checks passed.
- [ ] Desktop/phone-emulated tests of both CFR readers online/offline and source-status indicators passed.
- [ ] Browser test demonstrates QA bookmarks and Inspection Ready saved states cannot modify production keys on same origin.
- [ ] Updated HTTPS QA candidate deployed to existing path, no production-root changes; PWA scopes/caches isolated.
- [ ] All applicable v0.17 regressions pass.
- [ ] Owner acceptance and release approval remains separate from code readiness.

## Known limitations
The eCFR is an unofficial, frequently updated editorial compilation; cached SkyFire reference is dated, not an always-current live legal database. A newly proposed rule is not automatically the law. Source dates do not prove independent review of every section. CFR §46.3 and Title 29 section inventory changed; the authoritative-source diff must remain preserved. No data migration should overwrite or merge production bookmarks into QA. Future periodic refreshes require verification and authorization; auto-deployment is intentionally disabled.
