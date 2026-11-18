/* SkyFire storage boundary: preserves all existing production keys; QA uses its own namespace.
   This script MUST load before app.js and other persistent-state modules. */
(function () {
  "use strict";
  const qa = /\/release-candidate\/v\d+\//.test(window.location.pathname);
  const prefix = qa ? "skyfire_qa_v18_" : "";
  function scoped(key) {
    return prefix + String(key);
  }
  const api = Object.freeze({
    isQA: qa,
    namespace: prefix || "production-existing-keys",
    getItem(key) { return localStorage.getItem(scoped(key)); },
    setItem(key, value) { localStorage.setItem(scoped(key), String(value)); },
    removeItem(key) { localStorage.removeItem(scoped(key)); },
    // Never expose a clear() method: clearing all origin storage could destroy
    // production bookmarks from a same-origin preview.
    keyForTest(key) { return scoped(key); }
  });
  Object.defineProperty(window, "SkyFireStorage", { value: api, writable: false, configurable: false });
})();
