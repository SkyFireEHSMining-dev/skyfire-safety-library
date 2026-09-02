(function () {
  const STYLE_ID = 'skyfireCfrFullScreenPolishV14';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media (min-width: 760px) {
        .skyfire-full-screen-shell {
          width: min(calc(100% - 48px), 1320px) !important;
          box-sizing: border-box;
        }

        .skyfire-full-screen-overlay {
          background: #f7f9fb !important;
        }

        .skyfire-full-screen-card {
          width: 100%;
          box-sizing: border-box;
        }
      }

      @media (min-width: 1280px) {
        .skyfire-full-screen-shell {
          width: min(calc(100% - 64px), 1400px) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeFullScreenMarkup(root) {
    if (!root || typeof window.highlightText !== 'function') return;

    root.querySelectorAll('.skyfire-full-screen-text p').forEach(function (paragraph) {
      if (paragraph.dataset.skyfireMarkupNormalized === 'true') return;
      const raw = paragraph.textContent || '';
      if (/<\/?[a-z][^>]*>/i.test(raw)) {
        paragraph.innerHTML = window.highlightText(raw, '');
      }
      paragraph.dataset.skyfireMarkupNormalized = 'true';
    });
  }

  function inspectNode(node) {
    if (!(node instanceof Element)) return;
    if (node.matches('.skyfire-full-screen-overlay')) normalizeFullScreenMarkup(node);
    const overlay = node.querySelector('.skyfire-full-screen-overlay');
    if (overlay) normalizeFullScreenMarkup(overlay);
  }

  addStyles();

  const existing = document.querySelector('.skyfire-full-screen-overlay');
  if (existing) normalizeFullScreenMarkup(existing);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(inspectNode);
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
