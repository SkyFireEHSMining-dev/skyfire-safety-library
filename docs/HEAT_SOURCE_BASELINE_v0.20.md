# SkyFire Safety v0.20 Heat Source Ledger
**Reverified:** November 22, 2026. **Purpose:** occupational screening guidance, not a regulatory work authorization or actual WBGT measurement.

- [NWS Heat Index](https://www.weather.gov/tbw/heatindex): simple low-range/Steadman approximation, Rothfusz regression and low-/high-humidity adjustments. Heat Index is shade/light wind; extremes have limitations.
- [NIOSH 2016-106 Criteria](https://www.cdc.gov/niosh/docs/2016-106/), Appendix C **Table C-1, printed page 159**: <91°F Lower/caution, 91–103°F Moderate, 103–115°F High, >115°F Very High/Extreme. Shared boundaries handled with 103°F entering High, >115°F Very High. Caution band is *not* a safe-work decision.
- [OSHA Heat Hazard Recognition](https://www.osha.gov/heat-exposure/hazards), Table 2: WBGT comparisons (unacclimatized/acclimatized) Light 28/30°C; Moderate 25/28°C; Heavy 23/26°C; Very Heavy 21/25°C. Recommended occupational screening values adapted from NIOSH (2016), **not an MSHA regulatory legal limit**.
- OSHA same source clothing increments °C: Work 0, cloth coveralls 0, SMS 0.5, polyolefin 1, double cloth 3, limited-use vapor barrier 11. Unlisted PPE blocked; *temperature differences* use 9/5 for °F conversion, never +32.
- [NIOSH Workplace Recommendations (July 2026)](https://www.cdc.gov/niosh/heat-stress/recommendations/), [acclimatization](https://www.cdc.gov/niosh/heat-stress/recommendations/acclimatization.html) and [MSHA Heat Alert](https://www.msha.gov/sites/default/files/Alerts%20and%20Hazards/HealthAlert-HeatStress.pdf).
- [OSHA heat rulemaking](https://www.osha.gov/heat-exposure/rulemaking): proposed on Nov 22, 2026; not a final broadly applicable mining work-stop threshold.

## V1 Guardrails
- Manual °F/°C air temperature and RH; no weather feed.
- User supplies *measured* onsite WBGT. No calculated/estimated WBGT and no personal medical records.
- Screening bands are not compliance, exposure certifications, work authorization or universal work/rest schedules.
- Sources may change; the source verification date is not the release date.
- Mandatory QA before production: Node numerical tests, Chromium/WebKit phone/tablet/desktop browser tests, offline cold-reopen, and physical iPhone owner acceptance.
