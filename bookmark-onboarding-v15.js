(function () {
  const STYLE_ID = 'skyfireBookmarkOnboardingV15Styles';
  const OLD_MESSAGE = 'Create a folder to save bookmarks.';
  const NEW_MESSAGE = 'Create a bookmark folder in the Bookmarks panel first. Then you can save this section to it.';

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .bookmark-controls .skyfire-bookmark-folder-guidance {
        display: block;
        width: 100%;
        box-sizing: border-box;
        margin: 2px 0 8px;
        padding: 10px 12px;
        border-left: 4px solid var(--sf-regulation, #0b84ff);
        border-radius: 8px;
        background: #f5f8ff;
        line-height: 1.4;
      }
    `;
    document.head.appendChild(style);
  }

  function updateGuidance(root) {
    if (!root || typeof root.querySelectorAll !== 'function') return;

    root.querySelectorAll('.bookmark-controls .inline-note').forEach(function (note) {
      if ((note.textContent || '').trim() !== OLD_MESSAGE) return;
      note.textContent = NEW_MESSAGE;
      note.classList.add('skyfire-bookmark-folder-guidance');
      note.setAttribute('role', 'note');
    });
  }

  function inspectNode(node) {
    if (!(node instanceof Element)) return;

    if (node.matches('.bookmark-controls, .bookmark-controls .inline-note')) {
      updateGuidance(node.matches('.bookmark-controls') ? node : node.parentElement);
    }

    updateGuidance(node);
  }

  addStyles();
  updateGuidance(document);

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(inspectNode);
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
