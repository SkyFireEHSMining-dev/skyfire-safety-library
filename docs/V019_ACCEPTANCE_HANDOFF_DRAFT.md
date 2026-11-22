# SkyFire Safety v0.19 — Engineering Acceptance & Product Owner Handoff (DRAFT)

**As of:** November 21, 2026 (Pacific)  
**Status:** QA READY — PRODUCTION MERGE NOT APPROVED  
**Production:** v0.18 Beta (unchanged)  
**Sprint:** [#85](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/85)  
**Draft PR:** [#86](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/86)  
**Primary issue:** [#80](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/80)  
**Bounded secondary:** [#81](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/issues/81) (remains open)

## What was built

1. New in-app multi-page PDF reference viewer using pinned, locally bundled **PDF.js 5.4.624** (Apache 2.0) with page counter, Next/Previous, Fit Width, zoom, and **Return to SkyFire**. Original/download/official source links remain available. Original cached PDFs remain unmodified.
2. User-facing app brand **SkyFire Safety** replaces **SkyFire Safety Library** in header, browser title, manifest, current about/feedback/project labels, and bookmark-export identifier. Repository/path/storage identity remain unchanged.
3. Source-disposition recheck for Forms **5000-1**, **2000-224**, **7000-52**; unresolved current-edition/XFA/equivalence and filing-path questions documented. No unverified binary substitutions. Issue #81's remaining work intentionally stays open.

## Safety and source constraints

The canvas viewer displays a reference document, not an MSHA-approved online filing method. A canvas rendering is not a guarantee that interactive/XFA fields work or that the document prints correctly. Preserve the downloadable original, and verify any filing method on the official MSHA site. A printed OMB date alone does not determine whether a form is acceptable.

## Verification performed

| Check | Evidence | Status |
| --- | --- | --- |
| iPhone Home Screen QA brand + return from Form 5000-23 | Product owner screenshots and report | PASS |
| iPhone Form 5000-23 all 4 pages online | Physical iPhone screenshots pages 1, 2, 4 + owner's confirmation | PASS |
| iPhone offline cold-open, Form 5000-23 page 4 + return | Physical iPhone Airplane Mode screenshots + owner's Pass | PASS |
| iPhone Form 7000-1 all 5 pages + return | Physical iPhone screenshots page 1 and 5, Airplane Mode active; owner's Pass | PASS |
| Chromium emulated phone/tablet/desktop online and offline | [CI run 44979411235](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979411235) | PASS |
| WebKit emulated phone/tablet/desktop online 5000-23/7000-1 | [CI run 44979411235](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979411235) | PASS |
| Hosted QA: online/offline multipage and production saved-state isolation | [CI run 44979406343](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979406343) | PASS |
| Real iPad installed PWA and Safari PDF rendering | No physical iPad evidence | DEFERRED |
| Interactive XFA form operation / device printing | Original-PDF handoff offered; not independently demonstrated | NOT VERIFIED |
| All remaining #81 cached PDFs latest and current for filing | Source audit remains incomplete; caveats in app | NOT VERIFIED — parent issue open |

The physical iPhone screenshots **do not independently show a post-return screenshot for the last Form 7000-1 test**; the owner's explicit Pass is the acceptance evidence for the requested return workflow. The iPhone Airplane Mode test after PDF.js replacement is supported by screenshots, and no claim is made that Linux headless WebKit offline cold restart passed.

## Release prerequisites — NOT YET SATISFIED

1. Product owner expressly decides whether to accept the physical-iPad exception and documented XFA/print limitations (original-PDF fallback).
2. Product owner explicitly authorizes the v0.19 **production** release; the last **Pass** referred to a device test, not a merge approval.
3. CTO updates the **production release banner**, **release date**, `app.js` displayed release date, and `feedback.js` version label to **v0.19** for the actual chosen release date. The current draft branch still deliberately carries v0.18 release metadata until this finalization step.
4. CTO reviews against current `main` and reruns the full branch/static/browser/hosted and production-source acceptance set after the release-metadata change; ensure production v0.18 user data survives the v0.19 cache and manifest migration.
5. Create final v0.19 release notes and Master Register addendum, update quarterly LinkedIn release archive, and preserve remaining issues and accepted limitations.
6. Merge draft PR #86 **only after owner approval**, verify Pages deployment and actual live site offline/cached forms, then close the sprint and resolved #80 as appropriate. Keep #81 open for its residual specialist-form review.

## Product-owner recommendation

**Recommended: conditional GO to release preparation.** Physical-iPhone usability blocker for #80 is resolved on the tested documents, online and offline. The remaining physical-iPad and interactive-PDF limitations can be explicitly deferred if the owner accepts the risk and continues to provide the original PDF handoff. There is no evidence supporting a claim of comprehensive current form editions. No production merge is authorized or complete as of this document.
