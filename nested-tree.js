// Legacy compatibility shim.
// The PPM reader is now rendered directly inside the MSHA Guidance section by ppm-guidance.js.
// This file remains because older cached SkyFire shells still request it, and it also loads
// v0.14 rule-specific guidance and reviewed Technical Guidance additions.
(function () {
  window.SkyFireLegacyNestedTreeRetired = true;

  function loadOnce(selector, src, dataName) {
    if (document.querySelector(selector)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.dataset[dataName] = 'true';
    document.head.appendChild(script);
  }

  loadOnce('script[data-surface-mobile-guidance="true"]', './surface-mobile-guidance.js?v=v0.14-sme-1', 'surfaceMobileGuidance');
  loadOnce('script[data-tg001-section12="true"]', './tg001-section12.js?v=v0.14-tg001-12-1', 'tg001Section12');
})();