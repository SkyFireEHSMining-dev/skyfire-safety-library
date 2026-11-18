# SkyFire Safety Library — v0.18 Beta Release Notes
**Status:** RELEASE CANDIDATE / production deployment pending  
**Planned release date:** November 17, 2026 (Pacific)  
**Theme:** Regulatory Integrity & Reliability  
**Issues:** #79 (primary), #82 (supporting), Sprint #83  
**Production PR:** #84

## What's improved

### 1. Dated, verifiable offline CFR sources
- Refreshes **29 CFR** and **30 CFR** from the U.S. Government Publishing Office's official eCFR bulk XML; retains exact retrieved SHA-256, source URLs, HTTP published timestamps, and federal eCFR API version/status fields.
- Labels a regulation's **GPO file modification date**, **eCFR API current-through date**, and **SkyFire last verification date** separately from the app release date. No claim of live rule currency or independently verified legal effective date.
- Each CFR reader shows whether it is online or offline, links to the official eCFR, and distinguishes an older preserved cache from the refreshed bundle.
- Corrects a UTC/date-only display issue found during iPhone acceptance, ensuring November 13 API coverage is not shown as November 12 in Pacific time.

### 2. Safer offline updates and saved data
- Keeps older cached CFR datasets available through a service-worker upgrade until both refreshed Title 29 and Title 30 datasets are stored; existing installations can continue accessing prior data offline, labeled accordingly.
- Reuses the existing GitHub Pages application and the same SkyFire QA Home Screen installation.
- Separates **QA bookmark folders and Inspection Ready saved state** using a QA-specific localStorage namespace. Existing production bookmark and inspection-state keys remain unchanged; no accounts or paid services added.

## Regulatory provenance
| | 29 CFR / OSHA | 30 CFR / MSHA |
|---|---|---|
| GPO XML last modified | Nov 12, 2026 | Nov 13, 2026 |
| eCFR API reported current through | Nov 13, 2026 | Nov 13, 2026 |
| GPO source SHA-256 | `c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3` | `a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c` |
| Source section counts | 7,262 | 5,954 |

The Title 29 comparison found 25 removed and two added section-number identifiers relative to the prior bundle; Title 30 §46.3 reflects an updated MSHA contact address and source note. These are source differences, not a comprehensive legal analysis or independent verification of the applicability of every amendment.

## Quality and testing
- [x] Official-source retrieval, structural parsing, checksum and metadata verification.
- [x] Automated Title 29/30 online/offline source-date and reader/search tests.
- [x] Automated v0.17-to-v0.18 existing-installation cache upgrade and bookmark retention.
- [x] Automated same-origin QA/production bookmark and Inspection Ready saved-state isolation.
- [x] Representative SkyFire module regressions (Safety Tools, Mine Act, Forms, Inspection/Incident Ready, guidance).
- [x] Published HTTPS QA preview, caching, source labels, production isolation.
- [x] **Physical iPhone acceptance:** Title 29 §1910.1200 and Title 30 §56.18002 content/source displays, correction of date-only off-by-one, user-reported offline reader success with screenshot-confirmed offline Title 30, and QA bookmark folder absent from regular production.
- [ ] **Physical iPad testing:** deferred; not represented as passed.
- [ ] **Public production v0.18 merge/deployment and live-site check:** pending this release candidate.

## Important limitations and follow-ups
- SkyFire is a dated safety/regulatory field reference, not an always-current legal database or the official filing system. Review controlling regulations, applicability, stays and amendments with authoritative sources.
- A previously cached older edition is explicitly labeled as legacy when needed; app version/release date is not the same as a rule's legal effective date.
- **#80** PDF viewer Return-to-SkyFire navigation remains open; **#81** remaining specialized MSHA form edition/XFA checks remain open. #75/#76 are deferred future scope.
- Do not delete production bookmarks or clear browser storage as part of upgrading.

## Source/engineering references
- `Data/ecfr-source-provenance-v18.json`
- `docs/ECFR_DATA_GOVERNANCE_v18.md`
- `docs/QA_STORAGE_ISOLATION_v18.md`
- `docs/V018_ACCEPTANCE_HANDOFF_DRAFT.md`
- PR #84: https://github.com/SkyFireEHSMining-dev/skyfire-safety-library/pull/84
- Public app: https://skyfireehsmining-dev.github.io/skyfire-safety-library/
- QA app: https://skyfireehsmining-dev.github.io/skyfire-safety-library/release-candidate/v017/

**Final release gate:** PR merge, GitHub Pages deployment, live app v0.18 version date, source SHA and offline smoke checks, QA app preservation, GitHub/Drive closeout of #79/#82/#83. Until recorded, do not call v0.18 officially released.
