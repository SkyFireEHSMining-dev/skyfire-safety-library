(function () {
  let installTries = 0;

  function getOpenFolderNames(container) {
    if (!container) return [];

    return Array.from(container.querySelectorAll('details.bookmark-folder[open]'))
      .map(function (details) {
        const summary = details.querySelector(':scope > summary.bookmark-folder-title');
        return summary ? (summary.textContent || '').trim() : '';
      })
      .filter(Boolean);
  }

  function restoreOpenFolderNames(container, openFolderNames) {
    if (!container || !openFolderNames.length) return;
    const wanted = new Set(openFolderNames);

    container.querySelectorAll('details.bookmark-folder').forEach(function (details) {
      const summary = details.querySelector(':scope > summary.bookmark-folder-title');
      const name = summary ? (summary.textContent || '').trim() : '';
      if (wanted.has(name)) details.open = true;
    });
  }

  function installPatch() {
    if (
      typeof window.removeBookmarkFromFolder !== 'function' ||
      typeof window.renderBookmarkFolders !== 'function' ||
      typeof window.sortBookmarkFolders !== 'function' ||
      typeof window.saveBookmarkFolders !== 'function'
    ) {
      installTries += 1;
      if (installTries < 80) window.setTimeout(installPatch, 50);
      return;
    }

    if (window.removeBookmarkFromFolder.__skyfireV15PreserveReaderState === true) return;

    const originalRemoveBookmarkFromFolder = window.removeBookmarkFromFolder;

    const preserveReaderStateRemoveBookmark = function (libraryKey, folderId, sectionNumber) {
      const state = libraryStates[libraryKey];
      if (!state) {
        return originalRemoveBookmarkFromFolder(libraryKey, folderId, sectionNumber);
      }

      const folder = state.bookmarkFolders.find(function (item) {
        return item.id === folderId;
      });
      if (!folder) return;

      const folderContainer = state.dom && state.dom.folderContainer;
      const openFolderNames = getOpenFolderNames(folderContainer);
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      folder.items = folder.items.filter(function (item) {
        return item.sectionNumber !== sectionNumber;
      });

      window.sortBookmarkFolders(libraryKey);
      window.saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);

      // Refresh only the bookmark sidebar. Do not rerender the CFR/OSHA reader,
      // which would collapse open hierarchy, disturb search results, and move scroll position.
      window.renderBookmarkFolders(libraryKey);
      restoreOpenFolderNames(folderContainer, openFolderNames);

      window.requestAnimationFrame(function () {
        window.scrollTo(scrollX, scrollY);
      });
    };

    preserveReaderStateRemoveBookmark.__skyfireV15PreserveReaderState = true;
    preserveReaderStateRemoveBookmark.__skyfireOriginal = originalRemoveBookmarkFromFolder;
    window.removeBookmarkFromFolder = preserveReaderStateRemoveBookmark;
  }

  installPatch();
})();
