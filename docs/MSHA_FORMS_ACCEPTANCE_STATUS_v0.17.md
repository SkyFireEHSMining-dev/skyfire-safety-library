# SkyFire v0.17 - MSHA Forms Library Acceptance & Remaining Decisions
**Status:** DRAFT / NOT RELEASED / NOT ACCEPTED  
**Audit checkpoint:** November 10, 2026 (Pacific; GitHub Actions timestamps may show November 11 UTC)  
**Issue:** #57 • **PR:** #78 • **Superseding sprint plan:** #77

The test evidence below applies to this draft branch and does **not** establish that an older installed SkyFire PWA or the current public main branch has received these changes.

## November 11 source-and-test checkpoint

- [x] All 14 Forms Library cards link to a specific official MSHA source or agency filing instruction; offline reference and filing-currentness caveats added.
- [x] Federal source/filer evidence and unresolved edition equivalence recorded in [source disposition ledger](MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md).
- [x] Four corrected PDFs have source and SHA-256 provenance; prior byte evidence preserved.
- [x] Network-independent static QA successfully ran on the draft branch: [GitHub Actions run 43054085060](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/43054085060).
- [x] Original automated Chromium offline smoke and WebKit navigation/PDF-download checks passed on earlier draft: [run 42970961367](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/42970961367).
- [ ] New broad regression and v0.16-to-v0.17 installed-PWA upgrade workflows: **not yet accepted**. Initial attempt(s) were blocked before tests ran by the CI runner's inability to resolve Ubuntu package mirrors. The workflow dependencies have been reduced and reruns submitted.
- [ ] Physical Safari/iPad PDF/installed-PWA check: **not performed**. [Manual device QA card](MSHA_FORMS_MANUAL_DEVICE_QA_v0.17.md) is ready once the v0.17 candidate is accessible without affecting production.
- [ ] For forms with unverified exact current local binary (notably 5000-1, 2000-224), complete final official-document/viewer acceptance or explicitly retain reference-only status and official-filing handoff. Do not falsely claim all 14 offline blanks are the latest agency submission editions.
- [ ] Formal v0.17 release metadata, merge/live-site verification, and Google Drive closeout: **not performed**.

**Disposition:** Draft remains UNMERGED. A static test PASS cannot substitute for new browser test outcomes or physical-device acceptance.

## Form-by-form disposition
| Form | Draft branch source-integrity state | Current release gate |
|---|---|---|
| 5000-23 | **Updated** Feb. 2025 official federal instrument; old editions explicitly obsolete; old/new hashes recorded | Check interactive PDF display and installed PWA replacement |
| 7000-51 | **Updated** Feb. 2025 official federal instrument; old editions explicitly obsolete; hashes recorded | Check interactive PDF display and installed PWA replacement |
| 2000-38 | **Updated** to more recent available federal Apr. 2013 XFA instrument, hash verified | Check current OMB/control and XFA field usability in supported viewer |
| 4000-9 | **Updated** to federal Aug. 2015 instrument with newer (but past-dated) printed OMB information | Confirm current official instrument status, applicable use, and readable PDF |
| 2000-7 | **Exact Oct. 6 SHA-256 match** to Feb. 2025 federal instrument | Reconfirm official listing/date for release |
| 2000-238 | **Exact Oct. 6 SHA-256 match** to Feb. 2025 federal instrument | Reconfirm official listing/date for release |
| 7000-1 | **Exact Oct. 6 SHA-256 match** to then-official federal instrument | Confirm current official link and opening behavior |
| 7000-2 | Local PDF says Sept. 2024; official MSHA listing also says Sept. 2024, previous editions obsolete | Official direct PDF fetch blocked to CI; manual current-filing check/visual QA |
| 2000-224 | Local copy September 2023; official 2025 source path was identified | Must NOT replace automatically with older federal mirrors; manually inspect current MSHA PDF, revisions, and appropriateness |
| 5000-1 | Local PDF differs from federal OMB instrument; official federal copy is XFA-based | Confirm latest official form and whether replacement would break built-in browsers; choose product link/alternate |
| 5000-3 | Local copy Apr. 2013 and official agency source still shows that revision | Direct source fetch blocked to CI; verify current MSHA listing and viewer behavior |
| 5000-41 | Local copy and official agency page reference Aug. 2015 form | Direct source fetch blocked; verify official status and readable form |
| 5000-46 | Local copy Oct. 2020; official agency source describes that revision | Direct source fetch blocked; verify current status and form compatibility |
| 7000-52 | Legacy Apr. 2012 printable PDF retained; current official process is online | Decide whether local PDF should remain as reference; product currently emphasizes official filing path |

**Important distinction:** A direct-file fetch blocked by MSHA's bot-protection page is not a finding that the official form is obsolete. A PDF byte mismatch alone does not prove obsolescence. Nor does an expired printed OMB date alone establish what MSHA currently accepts. Current source verification and actual viewer behavior must be documented before release.

## Automated test evidence
- **Static QA:** [successful run 42970864644](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/42970864644). Checks all local form files, registry and links, corrected hashes, JS syntax, XML parse, service-worker shell inventory.
- **Cross-browser/limited offline QA:** [successful run 42970961367](https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/actions/runs/42970961367). Chromium at phone/tablet/desktop emulation passed Forms Library navigation, offline reload, and cached reads of the four corrected PDFs. WebKit at iPhone/iPad/desktop sizes passed navigation and remote PDF retrieval, **not** installed-iOS Safari or XFA field rendering.
- **PWA cache update:** branch changes cache from quality-v38 to quality-v39 and shell cache v36 to v39; fresh installation smoke tested. **Upgrade of an already-installed v0.16 PWA has not been proven.**

## Required formal acceptance before merge / release
- [ ] Complete official-source disposition and safe filing path for all 14 forms above.
- [ ] Confirm all 14 PDF open/download actions and XFA behavior in supported native/Adobe readers as applicable.
- [ ] Verify an actual iPhone Safari and iPad Safari installed-PWA upgrade, updated PDF cache, navigation, offline re-open, and browser PDF behavior.
- [ ] Complete representative broad regression checks (CFR/OSHA, search/bookmarks, Mine Act, Inspection Ready, Incident Ready, safety tools and feedback).
- [ ] Review source and version labels; only then update v0.17 About/Feedback/Dashboard version and release date.
- [ ] Merge PR, verify GitHub Pages current assets, reconcile Drive Master Backlog, v0.17 Snapshot/History and Release Notes, close issues #57 and #77 with evidence.

**Separate application-level limitation:** Offline CFR datasets have not been proven current (issue #79); this must remain clearly disclosed and separately prioritized. Do not use a Forms Library QA pass to assert the entire application is current.

## Preserved evidence
- `Data/msha-forms-registry-v17.json`
- `docs/MSHA_FORMS_BINARY_REPLACEMENTS_v0.17.md`
- `docs/MSHA_FORMS_BINARY_REPLACEMENTS_FOLLOWUP_v0.17.md`
- Historical October 2026 audit and binary comparison files (explicitly labeled pre-replacement)
