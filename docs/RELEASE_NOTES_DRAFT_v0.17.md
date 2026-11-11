# SkyFire Safety Library v0.17 Beta — Release Notes (DRAFT)
**Status:** DRAFT / NOT PUBLISHED / NO RELEASE GO  
**Release date:** To be set only after formal acceptance  
**Theme:** MSHA Forms Integrity & Maintenance  
**Sprint change:** Issue #77 was formally reduced to one committed work item (#57); #75 and #76 were deferred to the unassigned backlog.

## Proposed changes
- Audited the full 14-form MSHA Forms Library and linked each form to an authoritative MSHA source or agency filing instructions.
- Replaced four older local reference PDFs in the draft branch using SHA-verified federal government instruments, preserving original/new checksum and source provenance:
  - Form 5000-23, Certificate of Training — February 2025 (previous editions obsolete);
  - Form 7000-51, Mine Operator Identification Request — February 2025 (previous editions obsolete);
  - Form 2000-38, electrically operated equipment field approval (coal only) — federal April 2013 XFA instrument; use a compatible reader;
  - Form 4000-9, Record of Individual Exposure to Radon Daughters — federal August 2015 edition with later federal instrument metadata, pending current-control verification.
- Corrected five source-fidelity names/descriptions (5000-1, 5000-41, 7000-51, 2000-7, 7000-52).
- Flagged the 7000-52 local PDF as a **legacy printable** reference; directed users to the official filing process.
- Added form-level caveats about current submission paths, interactive/XFA PDF compatibility, and the difference between a current information collection and a particular PDF edition.
- Maintained source and revision audit records, old/new checksums, and a durable disposition ledger.
- Updated the PWA shell caching logic to bypass the browser HTTP cache during fresh asset precaching, intended to prevent outdated PDF bytes from persisting after upgrades.
- Added reproducible structural, cross-module, offline, and installed-PWA upgrade test coverage.

## Verification evidence (do not infer completion of pending checks)
- Static source/media integrity: [run 43054085060 — PASS](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/43054085060).
- Broad Chromium cross-module / all-14-forms offline: [run 43054768282 — PASS](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/43054768282).
- Earlier cross-engine browser regression: [run 42970961367 — PASS](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/42970961367), preceding later labeling/source-link changes.
- Installed v0.16 → v0.17 PWA migration: **PENDING final proof**; prior diagnostics identified a stale cached PDF response; do not approve this gate until an actual offline response contains the corrected 2025 form.
- Physical iPhone/iPad Safari acceptance: **NOT PERFORMED**.
- Live GitHub Pages deploy and post-merge verification: **NOT PERFORMED**.

## Important user-facing limits
SkyFire's offline blank PDFs are convenient reference copies, **not a guarantee that each is the latest MSHA-approved instrument for current filing**. Follow the official agency link and instructions before filing; specialized XFA forms may not open in every browser PDF viewer. Form 7000-1 does not replace separate immediate MSHA accident-notification duties. SkyFire provides educational and operational-support references, not legal advice.

## Not part of this release
- #75 Enforcement Process Ready and #76 Compliance Guides & Assistance were deferred, not canceled.
- #79 CFR Title 29/30 offline data source-currency review remains open and high priority.
- No new accounts, cloud backend, compliance-document system of record, or expanded safety-management functionality.

## Acceptance and closeout (must be completed before publishing)
- [ ] Verify the installed-PWA upgrade returns the new 5000-23 offline after real or simulated transition.
- [ ] Review unresolved local-PDF/official-website version differences; preserve limited reference-only status where equivalence cannot be established.
- [ ] Perform physical-device viewer and post-install/offline acceptance, or formally approve a controlled deploy-then-validate method with rollback.
- [ ] Update Dashboard, About and Feedback release metadata and final last-updated date after release approval.
- [ ] Merge draft PR #78 and verify GitHub Pages serves the updated PDFs and cache version.
- [ ] Publish and reconcile v0.17 Release Notes, Sprint Snapshot/History and Master Backlog in SkyFire Drive; close #57 and #77 with evidence.

**Reference files:** `docs/MSHA_FORMS_ACCEPTANCE_STATUS_v0.17.md`; `docs/MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md`; `docs/MSHA_FORMS_MANUAL_DEVICE_QA_v0.17.md`.
