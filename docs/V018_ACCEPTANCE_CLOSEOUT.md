# SkyFire v0.18 Beta — Acceptance and Release Closeout

**Status:** PRODUCTION VERIFIED / SPRINT CLOSEOUT APPROVED  
**Date:** November 17, 2026 (Pacific)  
**Theme:** Regulatory Integrity & Reliability  
**Sprint:** #83; primary delivery #79; supporting delivery #82  
**Merged PR:** [#84](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/84)  
**Release commit:** `a37e0368e672e608bf4327a99cef0620bcaeaf3a`

## User acceptance

- **Title 30 iPhone:** QA v0.18 preview correctly displayed GPO modification Nov 13, 2026, eCFR API coverage through Nov 13, 2026, SkyFire last verification Nov 17, 2026; user opened and read §56.18002. Pacific date-only formatting defect was corrected and retested physically.
- **Title 29 iPhone:** QA preview displayed GPO modification Nov 12, API current through Nov 13, and readable §1910.1200 Hazard Communication text.
- **Offline iPhone:** User explicitly reported PASS after Airplane Mode and restarting the installed QA app; screenshots show offline Title 30 source status and loaded regulation index. Do not misstate offline Title 29 physical screenshots as independently seen.
- **QA bookmark isolation:** Screenshot-confirmed `QA Isolation Test` folder exists in SkyFire QA and does not appear in the regular production app, while existing production bookmark folders remain intact.
- **Physical iPad:** Not performed, deliberately deferred; automated tablet-size testing is not the same as physical acceptance.

## Technical verification

- Official GPO Title 29/30 XML source retrieval, XML parsing, SHA checks, latest reported eCFR status and semantic sample comparison in `Data/ecfr-source-provenance-v18.json`.
- Final static data/JS/metadata QA [#44222049634](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44222049634) PASS.
- Full Chromium CFR offline and cross-module regression [#44222060797](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44222060797) PASS.
- Existing v0.17 → v0.18 cache migration with preservation of saved bookmarks and old offline CFR fallback [#44215863014](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44215863014) PASS.
- GitHub Pages production deployment [#44222375663](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44222375663) PASS.
- Post-release public HTTPS test [#44222714450](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44222714450) PASS: production v0.18 and fixed date, **both** GPO XML SHA checks, both readers online/offline, 14 MSHA form links, four verified PDF SHA checks online/offline, QA worker/cache separation and bookmarks unchanged.

## Source snapshot and boundaries

| Source | Title 29 | Title 30 |
|---|---|---|
| GPO last-modified | Nov 12, 2026 | Nov 13, 2026 |
| eCFR API reported current through | Nov 13, 2026 | Nov 13, 2026 |
| SHA-256 | `c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3` | `a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c` |

eCFR source files are a dated **unofficial editorial compilation**; release does not establish that a rule is legally effective or that every amendment is current. Actual applicability, stays and controlling legal texts require source review. The update workflow requires explicit authorization, not automatic publishing.

## Scope disposition

- **#79 and #82:** completed within v0.18 and eligible for closure after documentation readback.
- **#83:** sprint complete after final GitHub/Drive reconciliation.
- **#80:** PDF viewer return navigation — remains OPEN.
- **#81:** remaining specialist MSHA PDF edition/XFA verification — remains OPEN.
- **#75/#76:** deferred future features — remain OPEN.
- No new backend, accounts, subscriptions or paid hosting.

## Records

- Final GitHub notes: `docs/RELEASE_NOTES_v0.18.md`
- Regulatory source governance: `docs/ECFR_DATA_GOVERNANCE_v18.md`
- QA storage isolation: `docs/QA_STORAGE_ISOLATION_v18.md`
- Historical QA handoff: `docs/V018_ACCEPTANCE_HANDOFF_DRAFT.md`
- Production: https://skyfireehsmining-dev.github.io/skyfire-safety-library/
- QA: https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/
