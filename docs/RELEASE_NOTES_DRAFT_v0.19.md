# SkyFire Safety — v0.19 Beta Release Notes (PRE-RELEASE DRAFT)

**Status:** Approved for release **subject to final verification** — this is NOT evidence of production deployment.  
**Planned date:** November 21, 2026 (Pacific)  
**Theme:** Field Reliability & Forms Accessibility  
**Sprint:** #85 | **Primary:** #80 | **Bounded secondary review:** #81  
**Draft PR:** #86

## What's changing

### SkyFire Safety — simplified product name
The main application is now named **SkyFire Safety** throughout its user-facing header, page title, PWA install name, current About/Feedback view, and bookmark export label. The GitHub repository, existing application URL, cached-data identity, and stored bookmarks remain unchanged. Previous release documentation retains the historical name **SkyFire Safety Library**.

### Reliable multipage PDF viewing and return
The MSHA Forms Library now opens locally cached PDF references in an in-app viewer with **Return to SkyFire**, **Previous/Next page**, a live **Page N of M** indicator, **Fit width**, zoom, and scrolling. The previous embedded iPhone PDF viewer exposed only page 1; the replacement uses self-hosted **PDF.js v5.4.624**, pinned and distributed with its license and checksums, rather than depending on an online CDN. The original PDFs are preserved for separate device viewing or downloading, with direct official MSHA source links. The viewer does **not** claim that interactive/XFA form fields operate within the canvas preview or that its canvas is the approved filing instrument.

### MSHA forms: bounded source and filing review
Source/status review covered **5000-1**, **2000-224**, and **7000-52**. Where authoritative current agency PDFs, accepted filing instruments or XFA compatibility could not be verified, the local documents remain clearly identified as reference/legacy material with an official MSHA handoff. **No PDF binaries were replaced.** The rest of #81 remains open; v0.19 is not a certification that all 14 PDFs are current or accepted for filing.

## Quality evidence assembled for final acceptance
- Owner's installed iPhone testing: **Form 5000-23** all four pages online and Airplane Mode, including page 4 and the return flow — PASS.
- Owner's additional installed iPhone testing: **Form 7000-1** all five pages with Airplane Mode indicated — PASS.
- Browser engineering QA: Chromium emulated phone/tablet/desktop online and offline, WebKit emulated phone/tablet/desktop online — PASS in completed runs [#44979411235](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979411235) and [#44979300320](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979300320).
- Hosted HTTPS QA: multipage Form 5000-23 and Form 7000-1, offline cold restart, and QA-versus-production cache/bookmark isolation — PASS [#44979406343](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/44979406343).
- Final release-label/upgrade checks and actual production merge/deploy verification are pending in this draft and must be recorded in the final release notes.

## Accepted and continuing limitations
- Physical iPad testing not performed. Automated tablet-size tests are not physical iPad acceptance.
- Interactive XFA fields, signing, and device printing depend on a compatible original PDF viewer; canvas reference pages are not an editable filing workflow. Verify agency-required submission pathways.
- Cached CFR material is a **dated editorial reference**, not an automatically current or official legal determination; Title 29 and Title 30 provenance remains as shipped in v0.18 (eCFR API reported current through November 13, 2026).
- Qualified and deferred #81 checks, #75 Enforcement Process Ready, #76 Compliance Guides, and later field utility candidates remain separate backlog.
- No accounts, backend, subscriptions, changes to QA versus production saved-state keys, or new SkyFire Education LMS scope.

## Release control
The product owner approved production release with the documented limitations **provided final checks pass**. The release is not effective until the approved PR is merged, GitHub Pages deployment is verified, live HTTPS and offline acceptance pass, and versioned release history is finalized. Production remains v0.18 until that point.

**Production URL:** https://skyfireehsmining-dev.github.io/skyfire-safety-library/  
**Persistent QA URL:** https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/  
**Development PR:** https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/86  
**Forms evidence:** `docs/MSHA_FORMS_V019_SOURCE_RECHECK_2026-11-21.md`

This draft will be retained as historical pre-release evidence; the final release notes will provide verified merge, deployment and acceptance references.
