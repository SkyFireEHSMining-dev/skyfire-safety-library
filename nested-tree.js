// Legacy compatibility shim.
// The PPM reader is now rendered directly inside the MSHA Guidance section by ppm-guidance.js.
// This file remains because older cached SkyFire shells still request it, and it now also loads
// the rule-specific Surface Mobile Equipment guidance resource collection.
(function () {
  window.SkyFireLegacyNestedTreeRetired = true;

  if (document.querySelector('script[data-surface-mobile-guidance="true"]')) return;

  const script = document.createElement('script');
  script.src = './surface-mobile-guidance.js?v=v0.14-sme-1';
  script.defer = true;
  script.dataset.surfaceMobileGuidance = 'true';
  document.head.appendChild(script);
})();