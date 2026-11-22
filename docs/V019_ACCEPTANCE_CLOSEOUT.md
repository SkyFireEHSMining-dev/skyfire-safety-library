# SkyFire Safety v0.19 Beta — Acceptance & Release Closeout

**Status:** PRODUCTION VERIFIED / CONTROLLED SPRINT CLOSEOUT  
**Release date:** November 21, 2026 (Pacific)  
**Theme:** Field Reliability & Forms Accessibility  
**Sprint:** #85; primary deliverable #80; bounded source review #81  
**Merged PR:** [#86](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/86)  
**Release commit:** `ad6a636d9f6af9bdc1a49b1cc93c4e4864ecdb5e`

## Approval and user acceptance

The product owner explicitly approved production release **provided final checks pass**, accepting deferral of physical iPad testing and the original-PDF fallback for interactive/XFA/print functions.

- Physical installed iPhone QA: MSHA Form 5000-23 PDF.js pages 1, 2, and 4 of 4 visibly displayed; owner confirmed all pages and navigation controls work — PASS.
- Airplane Mode cold-reopen on physical iPhone: QA dashboard and cached Form 5000-23 remained available; page 4 of 4 and Return to SkyFire reported PASS.
- Second-document physical iPhone: Form 7000-1 pages 1 and 5 of 5 displayed with Airplane Mode visible; owner reported PASS.
- Previous iframe implementation showed only page 1 and was rejected; the offline-cached PDF.js viewer resolves that tested field failure.

## Engineering evidence

| Verification | Result | Evidence |
|---|---|---|
| Static, multipage Chromium/WebKit emulation | PASS | [QA run #44979411235](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979411235) |
| Hosted persistent QA, offline PDF and saved-state separation | PASS | [QA run #44979406343](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979406343) |
| Installed v0.18 → v0.19 PWA upgrade with saved-state and offline source preservation | PASS | [upgrade run #44981379299](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981379299) |
| Final pre-merge release-code static and browser QA | PASS | [QA run #44981384630](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981384630) |
| GitHub Pages deployment from approved merge | PASS | [Pages run #44981593201](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981593201) |
| Live v0.19 production HTTPS, offline PWA, multipage PDF, CFR Title 29/30 and QA isolation | PASS | [production run #44981593912](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981593912) |

## Scope and source integrity

- Public UI/app name updated to **SkyFire Safety**; GitHub Pages URL, existing PWA scope, bookmarks, Inspection Ready saved data and regulatory cache data retained. Shell cache updated to `skyfire-quality-cache-v43`; locally bundled PDF.js display and worker included.
- Existing 14 cached MSHA PDFs unchanged. The approved bounded #81 review covers 5000-1, 2000-224, 7000-52 without claiming authoritative byte equivalence or validated XFA submission pathways.
- Existing 29/30 CFR eCFR/GPO provenance stays dated from v0.18; API then reported current through November 13, 2026. No new rule currency or legal effective-date claim.
- No accounts, backend, subscriptions, enterprise records or unrelated field tools added.

## Explicitly accepted exceptions and unresolved items

- **Real iPad PWA/Safari:** not physically tested. Recorded exception does not constitute a PASS.
- **XFA/device printing:** use original/download agency PDF and official filing instructions; PDF.js canvas is a visual reference, not a certified interactive filing system.
- **Issue #81:** remains OPEN for additional edition, XFA and filing-path verification; no new form binary replacements were claimed.
- Deferred #75/#76 and all other future backlog/discovery candidates remain outside v0.19.

## Final disposition

The approved production PR merged as `ad6a636d9f6af9bdc1a49b1cc93c4e4864ecdb5e`; GitHub Pages deployment and full live HTTPS/offline automated acceptance completed successfully. **v0.19 Beta is verified in production** and can be recorded as the current release. Close #80 as delivered **with documented iPad/XFA limitations** and close Sprint #85 after completing release-note/archive reconciliation. Keep #81 open.

**Production:** https://skyfireehsmining-dev.github.io/skyfire-safety-library/  
**QA:** https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/  
**Release notes:** `docs/RELEASE_NOTES_v0.19.md`
