(function () {
  const STYLE_ID = "skyfireCfrV13Styles";
  let installTries = 0;
  let fullScreenOverlay = null;

  function applyResponsiveStyles() {
    const old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #cfrSection .layout,
      #oshaSection .layout,
      #cfrContainer,
      #oshaContainer,
      #cfrContainer .section-content,
      #oshaContainer .section-content {
        min-width: 0;
        max-width: 100%;
      }

      #cfrContainer,
      #oshaContainer { overflow-x: hidden; }

      #cfrContainer details,
      #oshaContainer details {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        margin: 9px 0;
        padding: 0;
        overflow: hidden;
      }

      #cfrContainer details:not(.level-section),
      #oshaContainer details:not(.level-section) {
        border: 0;
        border-radius: 0;
        background: transparent;
        box-shadow: none;
      }

      #cfrContainer details:not(.level-section) > summary,
      #oshaContainer details:not(.level-section) > summary {
        display: block;
        width: 100%;
        box-sizing: border-box;
        padding: 14px 16px;
        border-top: 1px solid var(--line-soft, var(--line));
        border-right: 1px solid var(--line-soft, var(--line));
        border-bottom: 1px solid var(--line-soft, var(--line));
        border-radius: 14px;
        line-height: 1.3;
        overflow-wrap: anywhere;
      }

      #cfrContainer details:not(.level-section) > .section-content,
      #oshaContainer details:not(.level-section) > .section-content {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        padding: 0;
        margin: 0;
      }

      #cfrContainer .level-section,
      #oshaContainer .level-section {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        border-top: 1px solid var(--line-soft, var(--line)) !important;
        border-right: 1px solid var(--line-soft, var(--line)) !important;
        border-bottom: 1px solid var(--line-soft, var(--line)) !important;
        border-left: 6px solid var(--sf-regulation, #0b84ff) !important;
        border-radius: 15px;
        background: #fff;
        box-shadow: none;
      }

      #cfrContainer .level-section > summary,
      #oshaContainer .level-section > summary {
        width: 100%;
        box-sizing: border-box;
        padding: 15px 16px;
        font-size: 1.1rem;
        line-height: 1.32;
        overflow-wrap: anywhere;
      }

      #cfrContainer .level-section > .section-content,
      #oshaContainer .level-section > .section-content {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        box-sizing: border-box;
        padding: 0 16px 18px;
      }

      #cfrContainer .level-section .section-content > p:not(.section-path),
      #oshaContainer .level-section .section-content > p:not(.section-path) {
        font-size: 1.08rem;
        line-height: 1.58;
        overflow-wrap: anywhere;
      }

      #cfrContainer .section-path,
      #oshaContainer .section-path {
        overflow-wrap: anywhere;
        word-break: normal;
      }

      .skyfire-full-screen-btn { display: none; }

      @media (min-width: 760px) {
        #cfrContainer details:not(.level-section) > summary,
        #oshaContainer details:not(.level-section) > summary { padding: 15px 18px; }

        #cfrContainer .level-section > summary,
        #oshaContainer .level-section > summary {
          padding: 16px 18px;
          font-size: 1.12rem;
        }

        #cfrContainer .level-section > .section-content,
        #oshaContainer .level-section > .section-content { padding: 0 18px 20px; }

        .skyfire-full-screen-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          margin: 0 0 14px 10px;
          padding: 8px 13px;
          border: 1px solid var(--line, #cbd5e1);
          border-radius: 10px;
          background: #eef4fa;
          color: var(--accent-dark, #1f4e79);
          font-weight: 750;
        }

        .skyfire-legacy-full-view { display: none !important; }
      }

      .skyfire-full-screen-overlay {
        position: fixed;
        inset: 0;
        z-index: 1000;
        overflow-y: auto;
        background: var(--bg, #eef3f7);
        color: var(--text, #111827);
        -webkit-overflow-scrolling: touch;
      }

      .skyfire-full-screen-shell {
        width: min(100%, 980px);
        min-height: 100%;
        margin: 0 auto;
        padding: 24px 30px 54px;
      }

      .skyfire-full-screen-toolbar {
        position: sticky;
        top: 0;
        z-index: 2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: -24px -30px 24px;
        padding: 18px 30px;
        background: rgba(248, 251, 254, 0.97);
        border-bottom: 1px solid var(--line-soft, #d8e2ec);
        backdrop-filter: blur(10px);
      }

      .skyfire-full-screen-toolbar strong { font-size: 1.05rem; }

      .skyfire-full-screen-return {
        min-height: 44px;
        padding: 9px 14px;
        border: 1px solid var(--line, #cbd5e1);
        border-radius: 11px;
        background: #fff;
        color: var(--accent-dark, #1f4e79);
        font-weight: 800;
      }

      .skyfire-full-screen-card {
        background: #fff;
        border: 1px solid var(--line, #cbd5e1);
        border-left: 7px solid var(--sf-regulation, #0b84ff);
        border-radius: 18px;
        padding: 26px 28px 34px;
        box-shadow: var(--shadow, 0 10px 28px rgba(15, 23, 42, 0.08));
      }

      .skyfire-full-screen-card h2 {
        margin: 0 0 12px;
        font-size: clamp(1.65rem, 3vw, 2.35rem);
        line-height: 1.18;
      }

      .skyfire-full-screen-card .section-path {
        margin: 0 0 18px;
        color: var(--muted, #4b5563);
      }

      .skyfire-full-screen-card .bookmark-controls {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin: 0 0 24px;
      }

      .skyfire-full-screen-card .bookmark-controls select,
      .skyfire-full-screen-card .bookmark-controls button {
        min-height: 42px;
      }

      .skyfire-full-screen-text {
        border-top: 1px solid var(--line-soft, #d8e2ec);
        padding-top: 18px;
      }

      .skyfire-full-screen-text p {
        font-size: 1.16rem;
        line-height: 1.68;
        overflow-wrap: anywhere;
      }

      @media (max-width: 759px) {
        .skyfire-full-screen-overlay { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function getLiveBookmarkFolders(libraryKey) {
    const state = libraryStates[libraryKey];
    if (!state) return [];

    let folders = Array.isArray(state.bookmarkFolders) ? state.bookmarkFolders : [];

    if (typeof window.loadBookmarkFolders === "function") {
      const stored = window.loadBookmarkFolders(state.config.bookmarksKey);
      if (Array.isArray(stored) && stored.length > folders.length) {
        state.bookmarkFolders = stored;
        folders = stored;
      }
    }

    return folders;
  }

  function createLiveBookmarkControls(libraryKey, section) {
    const controls = document.createElement("div");
    controls.className = "bookmark-controls";
    const folders = getLiveBookmarkFolders(libraryKey);

    if (!folders.length) {
      const note = document.createElement("span");
      note.className = "inline-note";
      note.textContent = "Create a folder to save bookmarks.";
      controls.appendChild(note);
      return controls;
    }

    const select = document.createElement("select");
    folders.forEach(function (folder) {
      const option = document.createElement("option");
      option.value = folder.id;
      option.textContent = folder.name;
      select.appendChild(option);
    });

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Add Bookmark";
    button.addEventListener("click", function () {
      window.addBookmarkToFolder(libraryKey, select.value, section);
    });

    controls.appendChild(select);
    controls.appendChild(button);
    return controls;
  }

  function closeFullScreenView() {
    if (!fullScreenOverlay) return;
    fullScreenOverlay.remove();
    fullScreenOverlay = null;
    document.body.style.overflow = "";
  }

  function openFullScreenView(libraryKey, section) {
    if (!window.matchMedia("(min-width: 760px)").matches || !section) return;
    closeFullScreenView();

    const overlay = document.createElement("div");
    overlay.className = "skyfire-full-screen-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", `Full screen regulatory reading view for ${section.sectionNumber || section.heading}`);

    const shell = document.createElement("div");
    shell.className = "skyfire-full-screen-shell";

    const toolbar = document.createElement("div");
    toolbar.className = "skyfire-full-screen-toolbar";

    const label = document.createElement("strong");
    label.textContent = "Full Screen Regulatory Reading";

    const returnBtn = document.createElement("button");
    returnBtn.type = "button";
    returnBtn.className = "skyfire-full-screen-return";
    returnBtn.textContent = "← Return to CFR";
    returnBtn.addEventListener("click", closeFullScreenView);

    toolbar.appendChild(label);
    toolbar.appendChild(returnBtn);

    const card = document.createElement("article");
    card.className = "skyfire-full-screen-card";

    const heading = document.createElement("h2");
    heading.textContent = section.heading || section.sectionNumber || "Regulatory Section";
    card.appendChild(heading);

    const path = document.createElement("p");
    path.className = "section-path";
    path.textContent = window.buildSectionPath(section);
    card.appendChild(path);

    card.appendChild(createLiveBookmarkControls(libraryKey, section));

    const textWrap = document.createElement("div");
    textWrap.className = "skyfire-full-screen-text";
    const paragraphs = section.paragraphs && section.paragraphs.length
      ? section.paragraphs
      : ["No paragraph text was parsed for this section."];

    paragraphs.forEach(function (paragraph) {
      const p = document.createElement("p");
      p.textContent = paragraph;
      textWrap.appendChild(p);
    });

    card.appendChild(textWrap);
    shell.appendChild(toolbar);
    shell.appendChild(card);
    overlay.appendChild(shell);
    document.body.appendChild(overlay);
    document.body.style.overflow = "hidden";
    fullScreenOverlay = overlay;
    returnBtn.focus();
  }

  function installPerformancePatch() {
    if (
      typeof window.createSectionBlock !== "function" ||
      typeof window.createDetails !== "function" ||
      typeof window.highlightText !== "function" ||
      typeof window.buildSectionPath !== "function" ||
      typeof window.addBookmarkToFolder !== "function"
    ) {
      installTries += 1;
      if (installTries < 80) window.setTimeout(installPerformancePatch, 50);
      return;
    }

    if (window.createSectionBlock.__skyfireV14FullScreen === true) return;

    if (typeof window.saveXmlCache === "function" && !window.saveXmlCache.__skyfireV13NoLargeXml) {
      const originalSaveXmlCache = window.saveXmlCache;
      const replacementSaveXmlCache = function (cacheKey, xmlText) {
        if (/^skyfire_xml_cache_title(?:29|30)_/i.test(String(cacheKey || ""))) return;
        return originalSaveXmlCache(cacheKey, xmlText);
      };
      replacementSaveXmlCache.__skyfireV13NoLargeXml = true;
      window.saveXmlCache = replacementSaveXmlCache;
    }

    const fullScreenCreateSectionBlock = function (libraryKey, section, query, options) {
      const opts = Object.assign({ showFullViewButton: false, openByDefault: false }, options || {});
      const pair = window.createDetails(
        window.highlightText(section.heading, query || ""),
        opts.openByDefault,
        "level-section"
      );
      const details = pair.details;
      const content = pair.content;

      details.dataset.sectionNumber = section.sectionNumber || section.heading;
      details.dataset.library = libraryKey;
      details.dataset.hydrated = "false";

      function hydrate() {
        if (details.dataset.hydrated === "true") return;
        details.dataset.hydrated = "true";

        const path = document.createElement("p");
        path.className = "section-path";
        path.textContent = window.buildSectionPath(section);
        content.appendChild(path);

        content.appendChild(createLiveBookmarkControls(libraryKey, section));

        const fullScreenBtn = document.createElement("button");
        fullScreenBtn.type = "button";
        fullScreenBtn.className = "skyfire-full-screen-btn";
        fullScreenBtn.textContent = "⛶ Full Screen View";
        fullScreenBtn.setAttribute("aria-label", `Open ${section.sectionNumber || "this section"} in full screen view`);
        fullScreenBtn.addEventListener("click", function () {
          openFullScreenView(libraryKey, section);
        });
        content.appendChild(fullScreenBtn);

        if (opts.showFullViewButton && typeof window.openSectionInFullView === "function") {
          const openBtn = document.createElement("button");
          openBtn.type = "button";
          openBtn.className = "skyfire-legacy-full-view";
          openBtn.textContent = "Open in Full View";
          openBtn.style.marginBottom = "14px";
          openBtn.addEventListener("click", function () {
            window.openSectionInFullView(libraryKey, section.sectionNumber);
          });
          content.appendChild(openBtn);
        }

        const paragraphs = section.paragraphs && section.paragraphs.length
          ? section.paragraphs
          : ["No paragraph text was parsed for this section."];

        paragraphs.forEach(function (paragraph) {
          const p = document.createElement("p");
          p.innerHTML = window.highlightText(paragraph, query || "");
          content.appendChild(p);
        });
      }

      if (opts.openByDefault) {
        hydrate();
      } else {
        const onToggle = function () {
          if (!details.open) return;
          hydrate();
          details.removeEventListener("toggle", onToggle);
        };
        details.addEventListener("toggle", onToggle);
      }

      return details;
    };

    fullScreenCreateSectionBlock.__skyfireV13Lazy = true;
    fullScreenCreateSectionBlock.__skyfireV14FullScreen = true;
    window.createSectionBlock = fullScreenCreateSectionBlock;

    window.SkyFireCfrV13 = {
      lazySectionBodies: true,
      largeXmlLocalStorageDisabled: true,
      responsiveParity: true,
      fullScreenReadingView: true,
      liveBookmarkControls: true
    };
  }

  function installBookmarkPositionPatch() {
    if (
      typeof window.addBookmarkToFolder !== "function" ||
      typeof window.renderBookmarkFolders !== "function" ||
      typeof window.sortBookmarkFolders !== "function" ||
      typeof window.saveBookmarkFolders !== "function"
    ) {
      window.setTimeout(installBookmarkPositionPatch, 50);
      return;
    }

    if (window.addBookmarkToFolder.__skyfireV14PreservePosition === true) return;

    const replacementAddBookmarkToFolder = function (libraryKey, folderId, section) {
      const state = libraryStates[libraryKey];
      const folders = getLiveBookmarkFolders(libraryKey);
      const folder = folders.find(function (item) { return item.id === folderId; });

      if (!folder) {
        alert("That folder could not be found.");
        return;
      }

      const alreadyExists = folder.items.some(function (item) {
        return item.sectionNumber === section.sectionNumber;
      });
      if (alreadyExists) {
        alert("That bookmark is already in this folder.");
        return;
      }

      folder.items.push({ sectionNumber: section.sectionNumber, heading: section.heading });
      state.bookmarkFolders = folders;
      window.sortBookmarkFolders(libraryKey);
      window.saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
      window.renderBookmarkFolders(libraryKey);
      alert(`Bookmark saved to "${folder.name}".`);
    };

    replacementAddBookmarkToFolder.__skyfireV14PreservePosition = true;
    window.addBookmarkToFolder = replacementAddBookmarkToFolder;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && fullScreenOverlay) closeFullScreenView();
  });

  applyResponsiveStyles();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      installPerformancePatch();
      installBookmarkPositionPatch();
    });
  } else {
    installPerformancePatch();
    installBookmarkPositionPatch();
  }
})();
