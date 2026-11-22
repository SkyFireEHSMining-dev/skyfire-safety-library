# SkyFire Safety — v0.19 Beta Release Notes

> **Production release record.** The pre-release draft remains in `docs/RELEASE_NOTES_DRAFT_v0.19.md`.

**Status:** RELEASED — GitHub Pages and live HTTPS/offline verification PASSED  
**Release date:** November 21, 2026 (Pacific)  
**Theme:** Field Reliability & Forms Accessibility  
**Sprint:** #85; primary #80; bounded source recheck #81  
**Merged PR:** [#86](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/86)  
**Release commit:** `ad6a636d9f6af9bdc1a49b1cc93c4e4864ecdb5e`

## What's improved

### 1. New user-facing name: SkyFire Safety
The public app now uses **SkyFire Safety** for its homepage, browser title, PWA install manifest, current About/Feedback content and bookmark exports. The existing GitHub Pages URL and repository name remain unchanged. This is a **display/product name change**, not a reset of local storage, URLs, or historical records.

### 2. Complete MSHA PDF pages with reliable return navigation
- Replaces the installed-iPhone embedded PDF iframe that exposed **only page 1** with a self-hosted, offline-cached multipage PDF.js reference viewer.
- Provides **Return to SkyFire**, page counters, Previous/Next, scrolling, Fit Width and zoom.
- Preserves direct **Open original PDF**, **Download PDF**, and verified agency-source/filer links; the original 14 cached PDFs were **not modified**.
- Bundles pinned **PDF.js 5.4.624** (Apache-2.0; `vendor/pdfjs`, license and SHA-256 manifest), avoiding a third-party online CDN dependency for locally cached form viewing.

### 3. Limited MSHA form disposition review
Issue #81 was addressed **only in the approved bounded scope**: Forms **5000-1**, **2000-224** and **7000-52**. The review documents missing evidence of current agency binary equivalence, certain filing routes and XFA compatibility. Unverified blanks remain designated reference/legacy resources with direct MSHA handoffs; **no PDF binary replacements** were justified. Issue #81 is intentionally **still open** for remaining specialized forms and edition confirmation.

## Validation

- **Physical owner iPhone, online:** Form 5000-23 visible pages 1–4, page controls and return-to-SkyFire flow — PASS.
- **Physical owner iPhone, Airplane Mode:** Installed QA app reopened, cached Form 5000-23 reached page 4 of 4 and returned to the app — PASS.
- **Physical owner iPhone, second document:** Form 7000-1 pages 1 and 5 of 5 visible with Airplane Mode shown and owner-reported PASS.
- **Automated Chromium and WebKit browser QA:** emulated phone/tablet/desktop multipage rendering; Chromium offline cached PDF — PASS, [run #44979411235](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979411235).
- **Published QA and production saved-state isolation:** online/offline multipage references and distinct same-origin QA/production keys — PASS, [run #44979406343](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979406343).
- **Existing v0.18 installed-PWA upgrade:** version and cache migration, preserved bookmarks, Inspection Ready state, CFR 29/30 reference access, PDF pages offline — PASS, [run #44981379299](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981379299).
- **Final release-code static and browser QA:** PASS, [run #44981384630](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981384630).
- **Production GitHub Pages deployment:** PASS, [run #44981593201](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981593201).
- **Live production HTTPS and offline:** correct public product/version/date/manifest, 5000-23 all 4 and 7000-1 all 5 pages, offline cold launch, Title 29/30 readers, source metadata and QA isolation — PASS, [run #44981593912](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44981593912).

## Accepted limitations and outstanding work

- **Physical iPad:** explicitly deferred and **not tested**, despite emulated tablet coverage. The product owner accepted that release exception.
- **XFA, interactive PDF completion, digital signing and printing:** not guaranteed by the canvas preview. Use the **original PDF** in a compatible viewer or follow official MSHA filing instructions. The product owner accepted this bounded limitation.
- **Form editions/filing:** #81 remains open; this release does **not** claim all 14 cached blanks are the currently approved submission instruments. Do not use an OMB print date alone to infer obsolescence.
- **Regulatory source dates:** v0.19 does **not** refresh CFR datasets. The dated offline eCFR editorial snapshot remains the v0.18 source, with the API reporting coverage through **November 13, 2026**. Official applicability, effective rules and stayed/proposed changes require separate verification.
- Deferred #75 Enforcement Process Ready, #76 MSHA Compliance Guides and later chemical/heat/field capabilities remain out of v0.19; no SkyFire Education LMS changes.

## Release and project records

- Formal closeout: `docs/V019_ACCEPTANCE_CLOSEOUT.md`.
- Bounded forms evidence: `docs/MSHA_FORMS_V019_SOURCE_RECHECK_2026-11-21.md`.
- Previous source history: `docs/RELEASE_NOTES_v0.18.md`, `docs/ECFR_DATA_GOVERNANCE_v18.md`.
- Production: https://skyfireehsmining-dev.github.io/skyfire-safety-library/
- Persistent QA: https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/

**Release disposition:** v0.19 is verified in production, within the accepted device/XFA and source-currentness boundaries. Quarterly LinkedIn notes are archived for an optional single Q4 update, **not automatically posted**.
