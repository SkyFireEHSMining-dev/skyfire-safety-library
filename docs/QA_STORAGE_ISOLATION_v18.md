# SkyFire QA and Production Saved-State Isolation — v0.18

## Problem
The installed SkyFire QA PWA at `/skyfire-safety-library/release-candidate/v017/` and production at `/skyfire-safety-library/` share an HTTPS origin on GitHub Pages. Browser localStorage keys are origin-scoped even when worker scopes/caches differ. Before v0.18 a QA bookmark/folder update could change a production key in browsers with shared origin state.

## Inventory / decisions
Search of all production-root JavaScript modules in November 2026 identified direct persistent localStorage calls in:
- `app.js`: `skyfire_bookmarks_title30_v1`, `skyfire_bookmarks_title29_v1`; historical XML localStorage keys `skyfire_xml_cache_title30_v1` and `skyfire_xml_cache_title29_v1` (large XML writes already suppressed by `cfr-v13.js`).
- `inspection-ready-v16.js`: `skyfire.inspectionReady.v16.states` (local site-preparation check states).

Other source files use exported helper functions, not direct browser localStorage APIs. That is the current complete JS-module inventory; newly added persistent modules must use the same boundary.

## v0.18 implementation
`storage-namespace-v18.js` provides `SkyFireStorage.getItem/setItem/removeItem`. It is loaded *before* application and inspection modules. In **production**, keys are passed to localStorage **unchanged**, so existing user bookmarks/folders and inspection preparation state remain readable with zero migration. In **QA** (path `/release-candidate/vNNN/`), all these logical keys are prefixed `skyfire_qa_v18_`.

The QA version preserves the same installed Home Screen URL. It starts with its own blank bookmarked-folder state rather than silently importing production bookmarks into QA. No localStorage-wide `clear()` operation exists in the boundary.

The production and QA service workers maintain separate scope and cache name families. The production SW cleans only its own `skyfire-quality-cache-` and `skyfire-regulatory-data-` families during updates; the QA SW cleans only `skyfire-preview-v017-` caches. A QA refresh is not allowed to delete production caches or saved state.

## QA / acceptance
- Confirm same-origin production bookmark folder stays unchanged after the QA app creates/removes folders.
- Confirm QA namespace persists across refresh/restart; data is not silently copied to the production namespace.
- Confirm Inspection Ready local state is similarly separated.
- Confirm production existing bookmark keys are NOT renamed, reset, deleted or merged.
- Verify production/QA PWA scopes and cache families are isolated. Confirm the old SkyFire QA Home Screen icon opens the upgraded v0.18 preview without reinstalling.
- Browser automation is evidence for shared origin; physical iPhone Home Screen testing verifies installed-app behavior separately. Never claim the latter passed from automation alone.

## Current user guidance
Until the v0.18 QA preview has passed its acceptance tests, do not create/delete production bookmarks as part of QA exercises. Do not delete the real SkyFire app or clear Safari website data; both are unnecessary for this migration.
