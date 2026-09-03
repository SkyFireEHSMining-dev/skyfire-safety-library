(function () {
  let installTries = 0;

  function restoreWindowPosition(scrollX, scrollY) {
    window.requestAnimationFrame(function () {
      window.scrollTo(scrollX, scrollY);
    });
  }

  function rebuildBookmarkControls(libraryKey, controls, section) {
    const state = libraryStates[libraryKey];
    if (!state || !controls || !section) return;

    const previousSelect = controls.querySelector('select');
    const previousFolderId = previousSelect ? previousSelect.value : '';
    const folders = Array.isArray(state.bookmarkFolders) ? state.bookmarkFolders : [];

    controls.innerHTML = '';

    if (!folders.length) {
      const note = document.createElement('span');
      note.className = 'inline-note';
      note.textContent = 'Create a folder to save bookmarks.';
      controls.appendChild(note);
      return;
    }

    const select = document.createElement('select');
    folders.forEach(function (folder) {
      const option = document.createElement('option');
      option.value = folder.id;
      option.textContent = folder.name;
      select.appendChild(option);
    });

    if (previousFolderId && folders.some(function (folder) { return folder.id === previousFolderId; })) {
      select.value = previousFolderId;
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Add Bookmark';
    button.addEventListener('click', function () {
      window.addBookmarkToFolder(libraryKey, select.value, section);
    });

    controls.appendChild(select);
    controls.appendChild(button);
  }

  function refreshVisibleBookmarkControls(libraryKey) {
    const state = libraryStates[libraryKey];
    const container = state && state.dom ? state.dom.container : null;
    if (!state || !container) return;

    container.querySelectorAll('.bookmark-controls').forEach(function (controls) {
      const details = controls.closest('details[data-library][data-section-number]');
      if (!details || details.dataset.library !== libraryKey) return;

      const sectionNumber = details.dataset.sectionNumber || '';
      const section = state.allSections.find(function (item) {
        return String(item.sectionNumber || item.heading || '') === sectionNumber;
      });

      if (section) rebuildBookmarkControls(libraryKey, controls, section);
    });
  }

  function refreshBookmarkUiWithoutReaderRerender(libraryKey, scrollX, scrollY) {
    window.renderBookmarkFolders(libraryKey);
    refreshVisibleBookmarkControls(libraryKey);
    restoreWindowPosition(scrollX, scrollY);
  }

  function installPatch() {
    if (
      typeof window.createFolder !== 'function' ||
      typeof window.addStarterPack !== 'function' ||
      typeof window.addBookmarkToFolder !== 'function' ||
      typeof window.renderBookmarkFolders !== 'function' ||
      typeof window.sortBookmarkFolders !== 'function' ||
      typeof window.saveBookmarkFolders !== 'function' ||
      typeof window.getOrCreateFolderByName !== 'function' ||
      typeof STARTER_PACKS === 'undefined'
    ) {
      installTries += 1;
      if (installTries < 80) window.setTimeout(installPatch, 50);
      return;
    }

    if (window.createFolder.__skyfireV15PreserveReaderState === true) return;

    const originalCreateFolder = window.createFolder;
    const originalAddStarterPack = window.addStarterPack;

    const preserveReaderStateCreateFolder = function (libraryKey) {
      const state = libraryStates[libraryKey];
      const input = state && state.dom ? state.dom.folderInput : null;
      if (!state || !input) {
        return originalCreateFolder(libraryKey);
      }

      const name = input.value.trim();
      if (!name) return;

      const alreadyExists = state.bookmarkFolders.some(function (folder) {
        return folder.name.toLowerCase() === name.toLowerCase();
      });

      if (alreadyExists) {
        alert('A folder with that name already exists.');
        return;
      }

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      state.bookmarkFolders.push({
        id: window.randomId(),
        name: name,
        items: []
      });

      window.sortBookmarkFolders(libraryKey);
      window.saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
      input.value = '';

      // Refresh only bookmark UI. Rebuilding the regulatory tree would collapse
      // the user's open CFR/OSHA hierarchy and make them lose their place.
      refreshBookmarkUiWithoutReaderRerender(libraryKey, scrollX, scrollY);
    };

    const preserveReaderStateAddStarterPack = function (libraryKey, packName) {
      const packGroup = STARTER_PACKS[libraryKey] || {};
      const packItems = packGroup[packName];
      if (!packItems) {
        alert('That starter pack could not be found.');
        return;
      }

      const state = libraryStates[libraryKey];
      if (!state) {
        return originalAddStarterPack(libraryKey, packName);
      }

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const folder = window.getOrCreateFolderByName(libraryKey, packName);
      let addedCount = 0;

      packItems.forEach(function (packItem) {
        const alreadyExists = folder.items.some(function (item) {
          return item.sectionNumber === packItem.sectionNumber;
        });

        if (!alreadyExists) {
          folder.items.push({
            sectionNumber: packItem.sectionNumber,
            heading: packItem.heading
          });
          addedCount += 1;
        }
      });

      window.sortBookmarkFolders(libraryKey);
      window.saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
      refreshBookmarkUiWithoutReaderRerender(libraryKey, scrollX, scrollY);

      if (addedCount === 0) {
        alert('"' + packName + '" is already installed.');
      } else {
        alert('Installed "' + packName + '" starter pack with ' + addedCount + ' bookmark(s).');
      }
    };

    preserveReaderStateCreateFolder.__skyfireV15PreserveReaderState = true;
    preserveReaderStateCreateFolder.__skyfireOriginal = originalCreateFolder;
    preserveReaderStateAddStarterPack.__skyfireV15PreserveReaderState = true;
    preserveReaderStateAddStarterPack.__skyfireOriginal = originalAddStarterPack;

    window.createFolder = preserveReaderStateCreateFolder;
    window.addStarterPack = preserveReaderStateAddStarterPack;
  }

  installPatch();
})();
