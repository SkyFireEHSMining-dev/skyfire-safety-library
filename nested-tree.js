// Legacy compatibility shim.
// The PPM reader is now rendered directly inside the MSHA Guidance section by ppm-guidance.js.
// This file remains because older cached SkyFire shells still request it, and it also loads
// v0.14 rule-specific guidance, reviewed Technical Guidance additions, stretch PPM content,
// source-fidelity corrections, PPM audit corrections, CFR full-screen reading polish,
// and v0.15 bookmark onboarding/state-preservation improvements.
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
  loadOnce('script[data-tg-reader-v14="true"]', './tg-reader-v14.js?v=v0.14-tg-reader-2', 'tgReaderV14');
  loadOnce('script[data-ppm-14109-stretch="true"]', './ppm-14109-stretch.js?v=v0.14-ppm-14109-1', 'ppm14109Stretch');
  loadOnce('script[data-ppm-source-fidelity-v14="true"]', './ppm-source-fidelity-v14.js?v=v0.14-ppm-fidelity-1', 'ppmSourceFidelityV14');
  loadOnce('script[data-ppm-audit-v14="true"]', './ppm-audit-v14.js?v=v0.14-ppm-audit-1', 'ppmAuditV14');
  loadOnce('script[data-cfr-fullscreen-polish-v14="true"]', './cfr-fullscreen-polish-v14.js?v=v0.14-cfr-fullscreen-1', 'cfrFullscreenPolishV14');
  loadOnce('script[data-bookmark-onboarding-v15="true"]', './bookmark-onboarding-v15.js?v=v0.15-bookmark-onboarding-1', 'bookmarkOnboardingV15');
  loadOnce('script[data-bookmark-remove-state-v15="true"]', './bookmark-remove-state-v15.js?v=v0.15-bookmark-remove-state-1', 'bookmarkRemoveStateV15');
  loadOnce('script[data-bookmark-folder-state-v15="true"]', './bookmark-folder-state-v15.js?v=v0.15-bookmark-folder-state-1', 'bookmarkFolderStateV15');
})();
