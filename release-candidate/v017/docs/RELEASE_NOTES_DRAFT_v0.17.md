# SkyFire Safety Library v0.17 Beta — MSHA Forms Integrity & Maintenance

**Release date:** November 11, 2026 (Pacific)
**Status:** RELEASE CANDIDATE — approved for a controlled beta release, pending final merge and live verification.

## What changed

SkyFire v0.17 focuses on the accuracy, provenance and offline reliability of the existing MSHA Forms Library. It does not add the Enforcement Process Ready or Compliance Guides work deferred in the controlled scope reset.

- **All 14 existing MSHA PDF references reviewed** with form-number, agency-source, current-filing or reference-only information recorded in `Data/msha-forms-registry-v17.json` and `docs/MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md`.
- **Four local PDFs replaced** using checksum-verified federal instruments: **5000-23** (Certificate of Training, February 2025); **7000-51** (Mine Operator Identification Request, February 2025); **2000-38** (federal 2013 XFA field-approval instrument); **4000-9** (federal August 2015 instrument).
- **Five form titles/descriptions corrected**, and all 14 forms now show or link to official MSHA sources and relevant filing instructions.
- **Reference copy guidance added:** local blank PDFs are convenient offline references, not a guarantee that the agency accepts a particular edition for filing. Some XFA PDFs require compatible readers; contractor ID Form 7000-52 prioritizes the agency online-filing path.
- **Important offline cache fix:** on upgrading an existing v0.16 PWA, the service worker now fetches fresh asset bytes before claiming activation, preventing an outdated Form 5000-23 from being served after a nominal cache update.
- **Release metadata updated:** v0.17 dashboard and feedback version, with a fixed last-updated date rather than automatically showing today's date.

## Verification

- [x] Source/static asset and metadata QA (after release-label changes).
- [x] Automated browser/device-size navigation, 14 forms available offline, and representative CFR, Mine Act, Safety Tools, Inspection and Incident Ready regression.
- [x] Automated v0.16 → v0.17 installed PWA upgrade, with verified old-cache retirement and corrected **February 2025 Form 5000-23** served offline.
- [x] Hosted QA preview `/release-candidate/v017/` opens over HTTPS and accesses all 14 PDFs offline with production app files preserved.
- [x] Physical iPhone: installed SkyFire QA opens/reopens offline after online initialization, and Form 5000-23 February 2025 renders from the app offline.
- [ ] Physical iPad: deliberately deferred to a post-release beta follow-up; automated tablet-size testing passed but is not a physical device result.
- [ ] Live production GitHub Pages deployment and cache/asset verification: pending at this release-candidate checkpoint.

## Important limitations and next work

SkyFire is an educational/operational reference, not official MSHA filing software, legal advice or a substitute for site-specific controlled safety documents.

- **#81**: confirm exact latest permitted editions/online filing paths and XFA compatibility for remaining specialized reference forms.
- **#80**: add reliable Back to SkyFire / Close action when a PDF is opened on iPhone, iPad or desktop.
- **#79**: independently verify 29/30 CFR offline XML effective dates and refresh/provenance. **This release does not certify the currentness of the entire CFR dataset.**
- **#75 and #76**: deferred from v0.17, still open in backlog.

## Release evidence

- PR #78: https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/78
- Source ledger: `docs/MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md`
- Acceptance / exceptions: `docs/MSHA_FORMS_ACCEPTANCE_STATUS_v0.17.md`
- Physical QA card: `docs/MSHA_FORMS_MANUAL_DEVICE_QA_v0.17.md`
- v0.17 QA preview: https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/
- Live app: https://skyfireehsmining-dev.github.io/skyfire-safety-library/

**No issue or sprint may be marked complete until the production release is verified and closeout is recorded.**
