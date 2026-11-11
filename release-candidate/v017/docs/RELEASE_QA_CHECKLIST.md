# SkyFire Release QA & Regression Checklist

## Purpose
Use this checklist before each SkyFire release to catch regressions without creating unnecessary process overhead. The checklist is intentionally lean: test the areas most likely to break, add change-specific tests when a sprint touches higher-risk systems, and record only what is needed to support a confident release decision.

## 1. Core release gate — run every release

### Home and information architecture
- [ ] Home loads without visible layout errors.
- [ ] Major destinations are easy to identify and open.
- [ ] Home “Inside” previews match the destinations actually available.
- [ ] No empty or misleading user-facing placeholders appear.

### Navigation
- [ ] SkyFire Back and Home controls work through representative multi-level paths.
- [ ] Browser Back/Forward work when browser-history navigation is supported.
- [ ] Breadcrumb/context text matches the current location.
- [ ] No navigation path strands the user or opens the wrong section.

### Regulatory resources
- [ ] 30 CFR opens and a representative regulation displays full text.
- [ ] 29 CFR opens and a representative regulation displays full text.
- [ ] CFR search returns relevant results and opens a result correctly.
- [ ] Bookmark create/save behavior works.
- [ ] MSHA PPM/Agency Guidance opens and reviewed entries display correctly.
- [ ] SkyFire Technical Guidance opens and published/reviewed sections display correctly.
- [ ] Representative official-source links work.

### Safety tools
- [ ] Risk Matrix calculation and post-control calculation work with a representative example.
- [ ] Safety ROI Calculator produces plausible results from a simple test case.
- [ ] 5S assessment accepts answers, calculates a score, and recommends the expected earliest deficient stage.

### Forms and field resources
- [ ] MSHA Forms Library opens and representative Open Form / Download PDF actions work.
- [ ] Safety Docs / available Field Resources open correctly.

### Feedback and About
- [ ] Feedback & Suggestions opens.
- [ ] “Problem or Bug” remains a selectable feedback type.
- [ ] Bug prompt asks what happened, what was expected, and reproduction information.
- [ ] Prepared feedback email includes type, area, user text, and SkyFire version.
- [ ] About SkyFire displays current release/version information.

### Offline / PWA
- [ ] Previously loaded SkyFire shell opens while offline.
- [ ] Previously loaded 30 CFR content remains available offline.
- [ ] Previously loaded 29 CFR content remains available offline.
- [ ] Navigation still works offline.
- [ ] Any information that requires a live internet connection does not falsely imply that current data is available while offline.

### Release metadata
- [ ] Field Status Dashboard version is correct.
- [ ] Last-updated/release date is correct.
- [ ] Feedback/About version strings match the release.
- [ ] Release notes match what actually shipped.

## 2. Minimum device matrix
Run representative checks on:

- [ ] iPhone/mobile Safari or equivalent phone-sized browser.
- [ ] iPad/tablet Safari or equivalent tablet-sized browser.
- [ ] Laptop/desktop browser at a typical full-window size.

Also test installed/Home Screen/PWA behavior when a sprint changes navigation, caching, offline behavior, or manifest/service-worker behavior.

The goal is representative coverage, not exhaustive testing of every screen on every device.

## 3. Change-triggered regression tests
Add these tests only when the sprint changes the related area.

### Navigation / routing changes
- Browser Back/Forward through multiple SkyFire levels.
- SkyFire Back/Home after browser-history use.
- Direct movement among Home, hubs, and deep resources.
- Repeat a representative path offline.

### Responsive/layout changes
- Phone, tablet, laptop/desktop visual pass.
- Common portrait and landscape orientations where practical.
- No horizontal overflow, clipping, cumulative nesting, or excessive unused space.
- Long-form text remains comfortable to read.

### CFR/regulatory-data changes
- Cold/warm load timing when practical.
- 30 CFR and 29 CFR open after the change.
- Search and bookmarks still work.
- Actual regulation text still renders when a section is expanded.
- Offline cache survives the change.

### Service worker/cache changes
- Online refresh retrieves the current app version.
- Previously cached shell/resources still work offline.
- Updated assets replace stale versions after refresh/reload.
- Regulatory datasets behave as intended online and offline.

### Regulatory/guidance content changes
- Compare the app entry to the current authoritative source.
- PPM/Agency Guidance preserves agency wording when represented as official source material.
- SkyFire Technical Guidance remains clearly distinct from regulation and agency guidance.
- Source links are checked before release.

### Calculator/tool logic changes
- Test a simple known-value case.
- Test a boundary or zero-value case when relevant.
- Confirm units, labels, and interpretation still match the calculation.

### Feedback changes
- Problem/Bug path works.
- Mailto subject/body are structured correctly.
- No feedback is transmitted before the user sends the prepared email.

## 4. Bug intake and triage
SkyFire’s current Feedback & Suggestions form is the primary lightweight user bug-reporting path.

When a bug report arrives:
1. Confirm the reported SkyFire version and affected area.
2. Attempt to reproduce the problem.
3. Classify it into one of three simple actions:
   - **Release blocker:** safety/compliance-risking misinformation, broken core navigation, inaccessible major resources, data-loss behavior, or a defect that prevents normal use.
   - **Fix in current sprint:** meaningful defect with a reasonable near-term repair that should not wait for another release.
   - **Backlog:** non-blocking improvement, edge case, cosmetic issue, or issue requiring broader design work.
4. Add a GitHub issue when the defect needs tracked work.
5. Re-test the affected area after repair and run the relevant change-triggered regression checks above.

Avoid creating unnecessary duplicate tickets for tiny defects repaired immediately during active development; document material fixes in the active sprint issue or release history.

## 5. Release decision
A release can close when:
- All committed sprint work intended for the release is complete or explicitly removed from scope.
- Core release-gate checks pass.
- Change-triggered regression checks pass for systems touched by the sprint.
- No known release blocker remains open.
- Any non-blocking unresolved finding is captured in the backlog.
- Release metadata, release notes, and sprint history accurately reflect the shipped product.

## Working principle
**Test broadly enough to protect the user, but keep the process proportional to SkyFire’s size.** As the application grows, automate only checks that repeatedly consume time or reliably catch regressions; do not add automation merely for its own sake.
