# SkyFire v0.17 — MSHA Forms Library Source Audit

**Issue:** #57  
**Audit started:** October 6, 2026  
**Branch:** `v0.17/forms-audit-57`  
**Phase:** 1 — authoritative-source and metadata reconciliation

## Audit rule

A URL resolving on an MSHA site is not enough by itself to prove that a locally stored PDF is the current form. For each shipped form, SkyFire must separately establish:

1. the current authoritative MSHA/OMB source or filing path;
2. the official form title and known revision;
3. whether MSHA expressly says previous editions are obsolete;
4. whether the current SkyFire local PDF bytes match the intended official revision;
5. whether the card title/description accurately describes the official form;
6. whether local open/download and offline caching still work after any replacement.

**Important:** a printed OMB expiration date is not, by itself, proof that a form is obsolete. Current MSHA publication and current OMB information-collection status control the audit disposition.

## Phase 1 findings

| Form | Official title / current source finding | Known revision / status | SkyFire action |
|---|---|---|---|
| 5000-23 | Certificate of Training | Feb. 2025; **Previous editions are obsolete** | **Replacement required** for known older local copy. |
| 5000-1 | Certificate of Electrical Training | Active OMB collection through 12/31/2028 | Correct SkyFire display title; local binary comparison still required. |
| 5000-41 | Safety and Health Activity Certification or Hoisting Engineers Qualification Request | Current instrument listing confirmed; known PDF revision Aug. 2015 | Normalize SkyFire display title; binary comparison required. |
| 5000-46 | Request for MSHA Individual Identification Number (MIIN) | Current 2026 instrument listing confirmed; known revision Oct. 2020 | Keep title; binary comparison required. |
| 7000-51 | Mine Operator Identification Request | Feb. 2025; **Previous editions are obsolete** | Use official title; binary comparison required. |
| 2000-7 | Legal Identity Report | Feb. 2025; **Previous editions are obsolete** | Change SkyFire title from “Legal Identification Report”; binary comparison required. |
| 7000-52 | Contractor Identification (ID) Request | Current OMB program renewed through 02/29/2028; current filing is online; legacy printable revision is old | Review whether SkyFire should retain the static PDF or emphasize the official online filing path. Do not discard only because of age. |
| 7000-1 | Mine Accident, Injury and Illness Report | MSHA still serves official Oct. 2016 revised form | Keep; compare local bytes. Do not reject solely because printed OMB date is old. |
| 7000-2 | Quarterly Mine Employment and Coal Production Report | Sept. 2024; **Previous editions are obsolete** | Binary comparison required; replace if local copy is earlier. |
| 2000-224 | Operator’s Annual Certification of Mine Rescue Team Qualifications | Current 2025 instrument URL confirmed in 2025/2026 OMB package | Binary/revision comparison required. |
| 2000-238 | Representative of Miners Designation Form | Feb. 2025; **Previous editions are obsolete** | Binary comparison required. |
| 2000-38 | Electrically Operated Equipment Field Approval Application (Coal Only) | Official form known revision Apr. 2013; current-control follow-up required | Keep pending OMB/control check; binary comparison required. |
| 5000-3 | Certificate of Physical Qualification for Mine Rescue Work | Current 2025 instrument URL confirmed; XFA PDF | Binary comparison required; preserve viewer-compatibility awareness. |
| 4000-9 | Record of Individual Exposure to Radon Daughters | Official Aug. 2015 revision; current-control follow-up required | Keep pending current-control check; binary comparison required. |

## Definite metadata corrections identified

The current SkyFire card copy needs these source-fidelity corrections before #57 can close:

- **5000-1:** “Certificate of Electrical/Noise Training” → **Certificate of Electrical Training**. Current OMB/MSHA collection language supports electrical qualification/training; the current SkyFire description should not imply the form is a general noise-training certificate.
- **2000-7:** “Legal Identification Report” → **Legal Identity Report**.
- **7000-51:** “Mine ID Request” → **Mine Operator Identification Request**. A short plain-language helper description may still say “Mine ID.”
- **5000-41:** normalize to **Safety and Health Activity Certification or Hoisting Engineers Qualification Request**.

## Binary-equivalence gate

The current GitHub repository contains all 14 PDFs and they remain in the offline shell. Phase 1 records their blob SHAs in `Data/msha-forms-registry-v17.json`.

The audit intentionally does **not** claim a local PDF matches the current official PDF until the PDF revision/content is actually confirmed. The known 5000-23 copy is already designated for replacement. For forms whose official source says “Previous editions are obsolete” (2000-7, 2000-238, 5000-23, 7000-51, 7000-2), binary/revision confirmation is a release gate.

## Next implementation pass

1. Correct the four confirmed UI metadata/title issues.
2. Resolve the local-vs-current binary revision for the five “previous editions obsolete” forms first.
3. Replace confirmed outdated PDFs and record old/new provenance.
4. Resolve 7000-52 static-PDF vs official-online-filing treatment.
5. Finish current-control checks for 2000-38 and 4000-9.
6. Retest every open/download link and the service-worker offline cache.
7. Run representative phone and desktop Forms Library QA.

## No-silent-replacement rule

Any PDF replacement must record the prior local blob SHA, replacement source, official revision/date if available, reason for replacement, and verification date. The provenance registry is the durable record for future audits.
