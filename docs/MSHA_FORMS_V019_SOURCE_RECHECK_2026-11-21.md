# v0.19 bounded MSHA Forms Source Recheck — 2026-11-21

**Status:** Working evidence, not verification that the cached instrument is current for filing.  
**Sprint:** #85 | Parent follow-up: #81 (remains OPEN) | Primary objective: #80 PDF return navigation.

## Review method and limits
Review of public agency/OMB information-collection records and the existing v0.17 forms-disposition ledger. This review intentionally avoids replacing binary PDFs when a verified current agency instrument cannot be retrieved and compared. The current MSHA site may return JavaScript/anti-bot interstitials to automated retrieval; such a response is not the source PDF and cannot support byte-equivalence, current revision, or XFA-compatibility claims. Public third-party summaries are not controlling agency filing instructions.

The 14 offline forms and the four federally sourced replacements shipped in v0.17 remain unchanged by this evidence-only pass. Source URLs and user-facing filing cautions remain in the app.

## 5000-1 — Certificate of Electrical Training
- **Current authoritative collection evidence:** OMB 1219-0001, ICR **202504-1219-004**; active through **2028-12-31** per collection records (see RegInfo linked below). This collection includes different variants/instructor populations; a collection status does **not** establish the cached PDF matches a specific currently accepted instrument.
- **Agency filing page already linked in app:** https://www.msha.gov/support-resources/forms-online-filing/2015/04/15/certificate-electricalnoise-training
- **Purpose and mining scope:** Coal-mine electrical qualification training is distinct from general surface gold-mine Part 48 Certificates of Training; do not imply this is the universal Part 48 training record.
- **Unresolved:** exact agency instrument variant and revision, current binary equivalence, PDF XFA interactive behavior and confirmed accepted submission path on a live compatible browser.
- **Disposition:** keep existing PDF marked **reference only**, link to MSHA, do not swap local binary. Further verification required.

## 2000-224 — Operator's Annual Certification of Mine Rescue Team Qualifications
- **Agency inventory:** RegInfo ICR **202512-1219-001** lists MSHA Form 2000-224 and a 2025-hosted official instrument URL, https://www.msha.gov/sites/default/files/Support_Resources/Forms/2025/MSHA_2000-224.pdf.
- **Existing local baseline:** the previous v0.17 audit identified a September 2023 local edition; equivalence to the agency's 2025-hosted instrument has not been proven.
- **Unresolved:** retrieval of official current PDF bytes, exact displayed form revision, comparison checksum, native/XFA behavior and current filing instruction; direct government PDF retrieval in this review returned a browser-verification interstitial, **not a usable instrument**.
- **Disposition:** preserve local reference with agency handoff and explicit uncertainty. No binary replacement.

## 7000-52 — Contractor Identification Request
- **Agency electronic filing evidence:** MSHA/DOL Online Forms Advisor identifies Form 7000-52 and provides current process orientation. RegInfo ICR **202410-1219-002** identifies an online-capable Contractor ID Request, referencing the official MSHA source page. The legacy printable form in past MSHA handbooks is dated **April 2012**.
- **Agency source linked by the app:** https://www.msha.gov/support-resources/forms-online-filing/2015/04/15/contractor-id-request
- **Unresolved:** precise agency-current printable edition vs. online filing instrument and whether the local legacy PDF provides enough continuing reference utility to retain.
- **Disposition:** retain as explicitly labeled **legacy reference** for now and point users to MSHA's official online filing process; **do not present the cached PDF as the approved current filing instrument**. Make the keep/remove decision with product owner after evaluating real field use.

## Result and explicit open items
All three were source-disposition checks only. **None** has a verified agency-current byte-level match or an accepted XFA/device-compatibility PASS as of this review, so no forms are claimed complete under #81. Continue the rest of #81 for 5000-3, 5000-41, 5000-46, 7000-2, XFA 2000-38 and 4000-9, and any changed agency sources. Do not close #81 on the basis of this limited pass.

For v0.19 PDF preview, prefer preserving the original PDF and independent Download / official MSHA link, and document that an in-app iframe may not render interactive XFA features. Physical iPhone/iPad and desktop testing remains required.

## Source index
1. MSHA / DOL, Electrical Training Filing Page: https://www.msha.gov/support-resources/forms-online-filing/2015/04/15/certificate-electricalnoise-training
2. RegInfo, electrical-training information collection: https://www.reginfo.gov/public/do/PRAViewIC?icID=192599&ref_nbr=202504-1219-004
3. RegInfo, 2000-224 current mine-rescue instrument listing: https://www.reginfo.gov/public/do/PRAViewIC?icID=208447&ref_nbr=202512-1219-001
4. MSHA, 2000-224 official file route: https://www.msha.gov/sites/default/files/Support_Resources/Forms/2025/MSHA_2000-224.pdf
5. MSHA / DOL, Contractor ID Request: https://www.msha.gov/support-resources/forms-online-filing/2015/04/15/contractor-id-request
6. DOL MSHA Online Forms Advisor, contractor: https://webapps.dol.gov/elaws/msha/forms/contractor.htm
7. RegInfo, Contractor ID Request collection: https://www.reginfo.gov/public/do/PRAViewIC?icID=14399&ref_nbr=202410-1219-002
8. v0.17 original form source-disposition ledger: https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/blob/main/docs/MSHA_FORMS_SOURCE_DISPOSITION_2026-11-11.md

**Evidence statement:** Sources were consulted on November 21, 2026. The listed dates refer to collections or referenced instruments; they are not declarations that a particular offline binary is legally current or that a submission method is verified live.
