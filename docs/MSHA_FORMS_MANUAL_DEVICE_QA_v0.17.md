# SkyFire v0.17 - Manual Device Acceptance Card
**Status:** READY FOR EXECUTION ON AN ACCESSIBLE v0.17 BUILD; NOT YET TESTED  
**Issue:** #57 | **Release:** MSHA Forms Integrity & Maintenance

**Critical limitation:** The existing public GitHub Pages app is still v0.16. Testing that URL now cannot count as v0.17 acceptance. This checklist must be performed against a separately accessible, version-confirmed v0.17 release candidate or a formally approved controlled rollout after merge. No production change is authorized by this document.

## Device and environment record
- Tester / date / timezone:
- Device and iOS/iPadOS version:
- Browser (Safari / installed PWA / other):
- Test build URL and Git SHA:
- Prior installed version (v0.16 or none):
- Connection (Wi-Fi/cellular):
- Outcome PASS / FAIL / BLOCKED:

## A. Initial form and source QA (online)
1. Confirm version/build identity matches the v0.17 candidate and no page-error banner appears. Navigate **Home → Regulatory Resources → MSHA Forms Library**.
2. Confirm **14 forms** appear with two local PDF actions each and a separate **official MSHA source / filing link**. Form 7000-52 must say the cached blank is a legacy printable reference and direct to official filing.
3. Open the local **5000-23** and **7000-51** PDFs. Confirm both show February 2025 editions and pages are legible. Verify they are not replaced by old cached 2021/2011 copies.
4. Open and download **2000-38** (XFA) and **5000-1**. Record whether Safari displays a compatibility notice, correctly renders fields, or requires Adobe Acrobat. This is a compatibility check, **not** a requirement to make Safari support XFA.
5. Open **2000-224** and check the linked official MSHA source. Record any visible edition differences; **do not submit an unverified local copy**.
6. Spot-check 7000-1 and 7000-2 form opens. Confirm official links do not masquerade as local downloadable copies.

## B. Offline and update behavior
1. With the app online, allow service worker installation to finish. Close and reopen the home screen once.
2. Switch to Airplane Mode and turn Wi-Fi off, then reopen the installed PWA.
3. Confirm Home → Regulatory Resources → Forms Library remains accessible. Open **5000-23**, **7000-51**, **2000-38** and **4000-9** offline. Note any PDF viewer limitations separately from missing cache data.
4. For an existing v0.16 installation, reconnect, reopen, reload/update if prompted, then go offline again. **5000-23 must be February 2025**, not its older cached edition.
5. Reconnect and confirm the official external MSHA links work. Online-only agency pages are not expected to load in Airplane Mode.

## C. Representative broader regression
1. Open MSHA/30 CFR and OSHA/29 CFR search and one bookmarked provision; confirm reader state is preserved when returning.
2. Open **Mine Act**, **Inspection Ready**, and **Incident Ready / Part 50**. Verify navigation and the Part 50 field companion are usable.
3. Open Risk Matrix and Safety ROI calculator and confirm basic inputs/results work.
4. Confirm Feedback & Suggestions can be opened; do not submit a test message unless specifically authorized.

## Evidence and approval
- Record screenshots only for defects or confusing displays; avoid capturing personal data.
- For FAIL, record exact device/build, steps to reproduce, expected vs. actual, and screenshot (if useful).
- Mark overall **PASS** only if the required checks pass, XFA limitations are accurately disclosed, and no release-blocking defects remain.
- Final approval: tester/date, release manager/date.
- After acceptance: merge PR #78, verify deployed GitHub Pages contents, reconcile v0.17 release notes/history/backlog, close #57 and #77.

**Reference:** Form-specific source review: `docs/MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md`; full acceptance register: `docs/MSHA_FORMS_ACCEPTANCE_STATUS_v0.17.md`.
