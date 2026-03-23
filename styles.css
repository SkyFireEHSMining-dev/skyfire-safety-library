const XML_FILE_NAME = "ECFR-title30.xml";
const XML_FOLDER_NAME = "Data";
const CACHE_KEY = "title30_xml_cache_v4";
const BOOKMARKS_KEY = "title30_bookmark_folders_v1";
const FOCUS_MODE_KEY = "skyfire_focus_mode_v1";

const cfrContainer = document.getElementById("cfrContainer");
const searchBar = document.getElementById("searchBar");
const statusMessage = document.getElementById("statusMessage");
const newFolderInput = document.getElementById("newFolderInput");
const createFolderBtn = document.getElementById("createFolderBtn");
const bookmarkFoldersContainer = document.getElementById("bookmarkFolders");
const alertsList = document.getElementById("alertsList");
const exportBookmarksBtn = document.getElementById("exportBookmarksBtn");
const importBookmarksBtn = document.getElementById("importBookmarksBtn");
const importBookmarksInput = document.getElementById("importBookmarksInput");
const focusModeBtn = document.getElementById("focusModeBtn");
const bookmarkSidebar = document.getElementById("bookmarkSidebar");
const mobileBookmarkToggle = document.getElementById("mobileBookmarkToggle");

let allSections = [];
let bookmarkFolders = loadBookmarkFolders();
let searchDebounceTimer = null;
let focusModeEnabled = loadFocusMode();

const MIN_TEXT_SEARCH_LENGTH = 3;
const MAX_SEARCH_RESULTS = 100;
const MAX_PREVIEW_PARAGRAPHS = 2;
const PREVIEW_SNIPPET_LENGTH = 220;

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function cleanText(text) {
  return decodeHtmlEntities(text)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getHeadingLevel(text) {
  const t = text.trim();

  if (/^Title 30\b/i.test(t)) return "volume";
  if (/^CHAPTER\b/i.test(t)) return "chapter";
  if (/^SUBCHAPTER\b/i.test(t)) return "subchapter";
  if (/^PART\b/i.test(t)) return "part";
  if (/^§\s*\d+/i.test(t)) return "section";

  return "other";
}

function extractSectionNumber(text) {
  const match = text.match(/^§\s*([0-9]+(?:\.[0-9A-Za-z-]+)?)/i);
  return match ? match[1] : "";
}

function buildSectionsFromXmlText(xmlText) {
  allSections = [];

  const regex = /<HEAD>([\s\S]*?)<\/HEAD>|<P>([\s\S]*?)<\/P>/gi;
  let match;

  let currentVolume = "";
  let currentChapter = "";
  let currentSubchapter = "";
  let currentPart = "";
  let currentSection = null;

  while ((match = regex.exec(xmlText)) !== null) {
    if (match[1]) {
      const headingText = cleanText(match[1]);
      if (!headingText) continue;

      const level = getHeadingLevel(headingText);

      if (level === "volume") {
        currentVolume = headingText;
        currentChapter = "";
        currentSubchapter = "";
        currentPart = "";
        currentSection = null;
      } else if (level === "chapter") {
        currentChapter = headingText;
        currentSubchapter = "";
        currentPart = "";
        currentSection = null;
      } else if (level === "subchapter") {
        currentSubchapter = headingText;
        currentPart = "";
        currentSection = null;
      } else if (level === "part") {
        currentPart = headingText;
        currentSection = null;
      } else if (level === "section") {
        currentSection = {
          volume: currentVolume || "Title 30",
          chapter: currentChapter || "No Chapter",
          subchapter: currentSubchapter || "No Subchapter",
          part: currentPart || "No Part",
          heading: headingText,
          sectionNumber: extractSectionNumber(headingText),
          paragraphs: []
        };

        allSections.push(currentSection);
      }
    }

    if (match[2]) {
      const paragraphText = cleanText(match[2]);
      if (!paragraphText) continue;

      if (currentSection) {
        currentSection.paragraphs.push(paragraphText);
      }
    }
  }
}

function buildHierarchy(sections) {
  const tree = {};

  for (const section of sections) {
    const volumeKey = section.volume;
    const chapterKey = section.chapter;
    const subchapterKey = section.subchapter;
    const partKey = section.part;

    if (!tree[volumeKey]) tree[volumeKey] = {};
    if (!tree[volumeKey][chapterKey]) tree[volumeKey][chapterKey] = {};
    if (!tree[volumeKey][chapterKey][subchapterKey]) {
      tree[volumeKey][chapterKey][subchapterKey] = {};
    }
    if (!tree[volumeKey][chapterKey][subchapterKey][partKey]) {
      tree[volumeKey][chapterKey][subchapterKey][partKey] = [];
    }

    tree[volumeKey][chapterKey][subchapterKey][partKey].push(section);
  }

  return tree;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
  if (!query) return text;

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function createDetails(title, openByDefault = false, className = "") {
  const details = document.createElement("details");
  details.className = className || "section";

  if (openByDefault) {
    details.open = true;
  }

  const summary = document.createElement("summary");
  summary.innerHTML = title;

  const content = document.createElement("div");
  content.className = "section-content";

  details.appendChild(summary);
  details.appendChild(content);

  return { details, content };
}

function saveXmlCache(xmlText) {
  try {
    localStorage.setItem(CACHE_KEY, xmlText);
  } catch (error) {
    console.warn("Could not save XML cache:", error);
  }
}

function loadXmlCache() {
  try {
    return localStorage.getItem(CACHE_KEY);
  } catch (error) {
    console.warn("Could not load XML cache:", error);
    return null;
  }
}

function saveBookmarkFolders() {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarkFolders));
}

function loadBookmarkFolders() {
  try {
    const saved = localStorage.getItem(BOOKMARKS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Could not load bookmark folders:", error);
    return [];
  }
}

function saveFocusMode(enabled) {
  try {
    localStorage.setItem(FOCUS_MODE_KEY, JSON.stringify(enabled));
  } catch (error) {
    console.warn("Could not save focus mode:", error);
  }
}

function loadFocusMode() {
  try {
    const saved = localStorage.getItem(FOCUS_MODE_KEY);
    return saved ? JSON.parse(saved) : false;
  } catch (error) {
    console.warn("Could not load focus mode:", error);
    return false;
  }
}

function applyFocusMode() {
  document.body.classList.toggle("focus-mode", focusModeEnabled);

  if (focusModeBtn) {
    focusModeBtn.textContent = focusModeEnabled
      ? "Exit Focus Mode"
      : "Enter Focus Mode";
  }
}

function toggleFocusMode() {
  focusModeEnabled = !focusModeEnabled;
  saveFocusMode(focusModeEnabled);
  applyFocusMode();
}

function sortBookmarkFolders() {
  bookmarkFolders.sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of bookmarkFolders) {
    folder.items.sort((a, b) =>
      a.heading.localeCompare(b.heading, undefined, { numeric: true })
    );
  }
}

function rerenderCurrentView() {
  renderBookmarkFolders();
  runSearch();
}

function createFolder() {
  const name = newFolderInput.value.trim();
  if (!name) return;

  const alreadyExists = bookmarkFolders.some(
    folder => folder.name.toLowerCase() === name.toLowerCase()
  );

  if (alreadyExists) {
    alert("A folder with that name already exists.");
    return;
  }

  bookmarkFolders.push({
    id: crypto.randomUUID(),
    name,
    items: []
  });

  sortBookmarkFolders();
  saveBookmarkFolders();
  newFolderInput.value = "";
  rerenderCurrentView();
}

function deleteFolder(folderId) {
  const folder = bookmarkFolders.find(f => f.id === folderId);
  if (!folder) return;

  const confirmed = confirm(`Delete folder "${folder.name}" and all bookmarks inside it?`);
  if (!confirmed) return;

  bookmarkFolders = bookmarkFolders.filter(f => f.id !== folderId);
  saveBookmarkFolders();
  rerenderCurrentView();
}

function addBookmarkToFolder(folderId, section) {
  const folder = bookmarkFolders.find(f => f.id === folderId);
  if (!folder) {
    alert("That folder could not be found. Please try again.");
    return;
  }

  const alreadyExists = folder.items.some(
    item => item.sectionNumber === section.sectionNumber
  );

  if (alreadyExists) {
    alert("That bookmark is already in this folder.");
    return;
  }

  folder.items.push({
    sectionNumber: section.sectionNumber,
    heading: section.heading
  });

  sortBookmarkFolders();
  saveBookmarkFolders();
  rerenderCurrentView();
}

function removeBookmarkFromFolder(folderId, sectionNumber) {
  const folder = bookmarkFolders.find(f => f.id === folderId);
  if (!folder) return;

  folder.items = folder.items.filter(item => item.sectionNumber !== sectionNumber);

  sortBookmarkFolders();
  saveBookmarkFolders();
  rerenderCurrentView();
}

function isBookmarked(sectionNumber) {
  return bookmarkFolders.some(folder =>
    folder.items.some(item => item.sectionNumber === sectionNumber)
  );
}

function goToBookmark(sectionNumber) {
  searchBar.value = sectionNumber;
  runSearch();

  setTimeout(function () {
    const target = document.querySelector(`[data-section-number="${sectionNumber}"]`);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("highlighted-section");

    setTimeout(function () {
      target.classList.remove("highlighted-section");
    }, 2000);
  }, 100);
}

function createBookmarkExportData() {
  return {
    app: "SkyFire Safety Library",
    version: 1,
    exportedAt: new Date().toISOString(),
    folders: bookmarkFolders
  };
}

function downloadBookmarksFile(fileText) {
  const blob = new Blob([fileText], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const stamp = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = url;
  link.download = `skyfire-bookmarks-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}

function createModalShell(titleText) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(0,0,0,0.45)";
  overlay.style.zIndex = "9999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.padding = "16px";
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  const modal = document.createElement("div");
  modal.style.background = "#ffffff";
  modal.style.width = "100%";
  modal.style.maxWidth = "720px";
  modal.style.maxHeight = "85vh";
  modal.style.overflow = "auto";
  modal.style.borderRadius = "12px";
  modal.style.padding = "18px";
  modal.style.boxSizing = "border-box";
  modal.style.boxShadow = "0 20px 50px rgba(0,0,0,0.25)";

  const title = document.createElement("h2");
  title.textContent = titleText;
  title.style.marginTop = "0";

  modal.appendChild(title);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  return { overlay, modal };
}

function exportBookmarks() {
  try {
    const data = createBookmarkExportData();
    const fileText = JSON.stringify(data, null, 2);

    const { overlay, modal } = createModalShell("Export Bookmarks");

    const help = document.createElement("p");
    help.textContent =
      "On desktop, you can download the file. On phones, you can copy or share this bookmark data.";
    modal.appendChild(help);

    const textArea = document.createElement("textarea");
    textArea.value = fileText;
    textArea.readOnly = true;
    textArea.style.width = "100%";
    textArea.style.minHeight = "240px";
    textArea.style.boxSizing = "border-box";
    textArea.style.padding = "12px";
    textArea.style.fontFamily = "monospace";
    textArea.style.fontSize = "0.9rem";
    textArea.style.border = "1px solid #bfbfbf";
    textArea.style.borderRadius = "8px";
    modal.appendChild(textArea);

    const buttonRow = document.createElement("div");
    buttonRow.style.display = "flex";
    buttonRow.style.gap = "10px";
    buttonRow.style.flexWrap = "wrap";
    buttonRow.style.marginTop = "14px";

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", async function () {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(fileText);
        } else {
          textArea.select();
          document.execCommand("copy");
        }
        alert("Bookmark data copied.");
      } catch (error) {
        console.error(error);
        alert("Could not copy bookmark data.");
      }
    });

    const shareBtn = document.createElement("button");
    shareBtn.textContent = "Share";
    shareBtn.addEventListener("click", async function () {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "SkyFire Bookmarks",
            text: fileText
          });
        } else {
          alert("Share is not supported on this device.");
        }
      } catch (error) {
        console.error(error);
      }
    });

    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download File";
    downloadBtn.addEventListener("click", function () {
      try {
        downloadBookmarksFile(fileText);
      } catch (error) {
        console.error(error);
        alert("Could not download bookmarks file.");
      }
    });

    const closeBtn = document.createElement("button");
    closeBtn.textContent = "Close";
    closeBtn.addEventListener("click", function () {
      overlay.remove();
    });

    buttonRow.appendChild(copyBtn);
    buttonRow.appendChild(shareBtn);
    buttonRow.appendChild(downloadBtn);
    buttonRow.appendChild(closeBtn);

    modal.appendChild(buttonRow);
  } catch (error) {
    console.error(error);
    alert("Could not export bookmarks.");
  }
}

function normalizeImportedFolders(rawFolders) {
  if (!Array.isArray(rawFolders)) return [];

  const validFolders = [];

  for (const folder of rawFolders) {
    if (!folder || typeof folder.name !== "string") continue;

    const cleanName = folder.name.trim();
    if (!cleanName) continue;

    const items = Array.isArray(folder.items) ? folder.items : [];

    const cleanItems = items
      .filter(item =>
        item &&
        typeof item.sectionNumber === "string" &&
        typeof item.heading === "string"
      )
      .map(item => ({
        sectionNumber: item.sectionNumber.trim(),
        heading: item.heading.trim()
      }))
      .filter(item => item.sectionNumber && item.heading);

    validFolders.push({
      id: crypto.randomUUID(),
      name: cleanName,
      items: cleanItems
    });
  }

  return validFolders;
}

function mergeImportedFolders(importedFolders) {
  let addedFolderCount = 0;
  let addedBookmarkCount = 0;

  for (const importedFolder of importedFolders) {
    let existingFolder = bookmarkFolders.find(
      folder => folder.name.toLowerCase() === importedFolder.name.toLowerCase()
    );

    if (!existingFolder) {
      existingFolder = {
        id: crypto.randomUUID(),
        name: importedFolder.name,
        items: []
      };
      bookmarkFolders.push(existingFolder);
      addedFolderCount += 1;
    }

    for (const importedItem of importedFolder.items) {
      const alreadyExists = existingFolder.items.some(
        item => item.sectionNumber === importedItem.sectionNumber
      );

      if (!alreadyExists) {
        existingFolder.items.push({
          sectionNumber: importedItem.sectionNumber,
          heading: importedItem.heading
        });
        addedBookmarkCount += 1;
      }
    }
  }

  sortBookmarkFolders();
  saveBookmarkFolders();
  rerenderCurrentView();

  alert(
    `Import complete. Added ${addedFolderCount} folder(s) and ${addedBookmarkCount} bookmark(s).`
  );
}

function importBookmarksFromText(text) {
  try {
    const parsed = JSON.parse(text);
    const importedFolders = normalizeImportedFolders(parsed.folders);

    if (importedFolders.length === 0) {
      alert("No valid bookmark folders were found in that data.");
      return;
    }

    mergeImportedFolders(importedFolders);
  } catch (error) {
    console.error(error);
    alert("That bookmark data could not be imported.");
  }
}

function importBookmarksFromFile(file) {
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    importBookmarksFromText(event.target.result);
  };

  reader.onerror = function () {
    alert("Could not read that file.");
  };

  reader.readAsText(file);
}

function openImportModal() {
  const { overlay, modal } = createModalShell("Import Bookmarks");

  const help = document.createElement("p");
  help.textContent =
    "Paste exported SkyFire bookmark data below to merge it into this device. Desktop users can also choose a file.";
  modal.appendChild(help);

  const textArea = document.createElement("textarea");
  textArea.placeholder = "Paste SkyFire bookmark JSON here...";
  textArea.style.width = "100%";
  textArea.style.minHeight = "220px";
  textArea.style.boxSizing = "border-box";
  textArea.style.padding = "12px";
  textArea.style.fontFamily = "monospace";
  textArea.style.fontSize = "0.9rem";
  textArea.style.border = "1px solid #bfbfbf";
  textArea.style.borderRadius = "8px";
  modal.appendChild(textArea);

  const buttonRow = document.createElement("div");
  buttonRow.style.display = "flex";
  buttonRow.style.gap = "10px";
  buttonRow.style.flexWrap = "wrap";
  buttonRow.style.marginTop = "14px";

  const importPasteBtn = document.createElement("button");
  importPasteBtn.textContent = "Import Pasted Data";
  importPasteBtn.addEventListener("click", function () {
    const text = textArea.value.trim();
    if (!text) {
      alert("Paste bookmark data first.");
      return;
    }
    importBookmarksFromText(text);
    overlay.remove();
  });

  const chooseFileBtn = document.createElement("button");
  chooseFileBtn.textContent = "Choose File";
  chooseFileBtn.addEventListener("click", function () {
    if (importBookmarksInput) {
      importBookmarksInput.click();
    } else {
      alert("File import is not available.");
    }
  });

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", function () {
    overlay.remove();
  });

  buttonRow.appendChild(importPasteBtn);
  buttonRow.appendChild(chooseFileBtn);
  buttonRow.appendChild(closeBtn);

  modal.appendChild(buttonRow);
}

function renderBookmarkFolders() {
  bookmarkFoldersContainer.innerHTML = "";

  if (bookmarkFolders.length === 0) {
    bookmarkFoldersContainer.innerHTML = "<p><em>No bookmarks yet.</em></p>";
    return;
  }

  for (const folder of bookmarkFolders) {
    const details = document.createElement("details");
    details.className = "bookmark-folder";
    details.open = false;

    const summary = document.createElement("summary");
    summary.className = "bookmark-folder-title";
    summary.textContent = `${folder.name} (${folder.items.length})`;
    details.appendChild(summary);

    const content = document.createElement("div");
    content.className = "bookmark-folder-content";

    const folderControls = document.createElement("div");
    folderControls.className = "bookmark-item";

    const deleteFolderBtn = document.createElement("button");
    deleteFolderBtn.textContent = "Delete Folder";
    deleteFolderBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      deleteFolder(folder.id);
    });

    folderControls.appendChild(deleteFolderBtn);
    content.appendChild(folderControls);

    if (folder.items.length > 0) {
      for (const item of folder.items) {
        const itemCard = document.createElement("div");
        itemCard.className = "bookmark-item";

        const itemTitle = document.createElement("div");
        itemTitle.className = "bookmark-item-title";
        itemTitle.textContent = item.heading;

        const buttonRow = document.createElement("div");
        buttonRow.className = "bookmark-button-row";

        const goBtn = document.createElement("button");
        goBtn.textContent = "Go to";
        goBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          goToBookmark(item.sectionNumber);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function (event) {
          event.stopPropagation();
          removeBookmarkFromFolder(folder.id, item.sectionNumber);
        });

        buttonRow.appendChild(goBtn);
        buttonRow.appendChild(removeBtn);

        itemCard.appendChild(itemTitle);
        itemCard.appendChild(buttonRow);
        content.appendChild(itemCard);
      }
    }

    details.appendChild(content);
    bookmarkFoldersContainer.appendChild(details);
  }
}

function createFolderDropdown(section) {
  const wrapper = document.createElement("div");
  wrapper.className = "bookmark-controls";

  const select = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose folder";
  select.appendChild(defaultOption);

  for (const folder of bookmarkFolders) {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    select.appendChild(option);
  }

  if (bookmarkFolders.length === 1) {
    select.value = bookmarkFolders[0].id;
  }

  const button = document.createElement("button");
  button.textContent = isBookmarked(section.sectionNumber)
    ? "☆ Bookmarked"
    : "☆ Add Bookmark";
  button.disabled = isBookmarked(section.sectionNumber);

  button.addEventListener("click", function () {
    const selectedFolderId = select.value;

    if (!selectedFolderId) {
      alert("Choose a folder first.");
      return;
    }

    addBookmarkToFolder(selectedFolderId, section);
  });

  wrapper.appendChild(select);
  wrapper.appendChild(button);

  return wrapper;
}

function trimPreviewText(text, maxLength = PREVIEW_SNIPPET_LENGTH) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

function buildSnippetAroundMatch(text, query, maxLength = PREVIEW_SNIPPET_LENGTH) {
  if (!text) return "";

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) {
    return trimPreviewText(text, maxLength);
  }

  const half = Math.floor(maxLength / 2);
  let start = Math.max(0, index - half);
  let end = Math.min(text.length, start + maxLength);

  if (end - start < maxLength) {
    start = Math.max(0, end - maxLength);
  }

  let snippet = text.slice(start, end).trim();

  if (start > 0) snippet = "..." + snippet;
  if (end < text.length) snippet = snippet + "...";

  return snippet;
}

function getPreviewParagraphs(section, query, numericLike) {
  if (!section.paragraphs || section.paragraphs.length === 0) {
    return [];
  }

  if (numericLike) {
    return section.paragraphs
      .slice(0, MAX_PREVIEW_PARAGRAPHS)
      .map(paragraph => trimPreviewText(paragraph));
  }

  const q = query.toLowerCase();

  const matchingParagraphs = section.paragraphs.filter(paragraph =>
    paragraph.toLowerCase().includes(q)
  );

  if (matchingParagraphs.length > 0) {
    return matchingParagraphs
      .slice(0, MAX_PREVIEW_PARAGRAPHS)
      .map(paragraph => buildSnippetAroundMatch(paragraph, query));
  }

  return section.paragraphs
    .slice(0, 1)
    .map(paragraph => trimPreviewText(paragraph));
}

function renderHierarchySections(sectionsToRender, query = "") {
  cfrContainer.innerHTML = "";

  if (!sectionsToRender.length) {
    cfrContainer.innerHTML = "<p><em>No results found.</em></p>";
    return;
  }

  const tree = buildHierarchy(sectionsToRender);

  for (const volumeName of Object.keys(tree)) {
    const volumeNode = createDetails(
      highlightText(volumeName, query),
      true,
      "section level-title"
    );
    cfrContainer.appendChild(volumeNode.details);

    const chapters = tree[volumeName];

    for (const chapterName of Object.keys(chapters)) {
      const chapterNode = createDetails(
        highlightText(chapterName, query),
        false,
        "section level-chapter"
      );
      volumeNode.content.appendChild(chapterNode.details);

      const subchapters = chapters[chapterName];

      for (const subchapterName of Object.keys(subchapters)) {
        const subchapterNode = createDetails(
          highlightText(subchapterName, query),
          false,
          "section level-subchapter"
        );
        chapterNode.content.appendChild(subchapterNode.details);

        const parts = subchapters[subchapterName];

        for (const partName of Object.keys(parts)) {
          const partNode = createDetails(
            highlightText(partName, query),
            false,
            "section level-part"
          );
          subchapterNode.content.appendChild(partNode.details);

          const sections = parts[partName];

          for (const section of sections) {
            const sectionNode = createDetails(
              highlightText(section.heading, query),
              false,
              "section level-section"
            );

            sectionNode.details.setAttribute("data-section-number", section.sectionNumber);
            partNode.content.appendChild(sectionNode.details);

            sectionNode.content.appendChild(createFolderDropdown(section));

            if (section.paragraphs.length === 0) {
              const empty = document.createElement("p");
              empty.innerHTML = "<em>No paragraph text under this heading.</em>";
              sectionNode.content.appendChild(empty);
            } else {
              for (const paragraph of section.paragraphs) {
                const p = document.createElement("p");
                p.innerHTML = highlightText(paragraph, query);
                sectionNode.content.appendChild(p);
              }
            }
          }
        }
      }
    }
  }
}

function renderFlatSearchResults(sectionsToRender, query = "") {
  cfrContainer.innerHTML = "";

  if (!sectionsToRender.length) {
    cfrContainer.innerHTML = "<p><em>No results found.</em></p>";
    return;
  }

  const numericLike = isNumericLikeQuery(query);

  const resultsWrapper = document.createElement("div");
  resultsWrapper.className = "search-results-wrapper";

  const resultCount = document.createElement("p");
  resultCount.innerHTML = `<strong>${sectionsToRender.length}</strong> result(s) shown`;
  resultsWrapper.appendChild(resultCount);

  for (const section of sectionsToRender) {
    const card = document.createElement("div");
    card.className = "bookmark-folder";
    card.setAttribute("data-section-number", section.sectionNumber);

    const title = document.createElement("div");
    title.className = "bookmark-folder-title";
    title.innerHTML = highlightText(section.heading, query);

    const meta = document.createElement("div");
    meta.className = "bookmark-item";
    meta.innerHTML = `
      <div style="margin-bottom: 10px; line-height: 1.5;">
        <strong>${highlightText(section.volume, query)}</strong><br>
        ${highlightText(section.chapter, query)}<br>
        ${highlightText(section.subchapter, query)}<br>
        ${highlightText(section.part, query)}
      </div>
    `;

    meta.appendChild(createFolderDropdown(section));

    const previewParagraphs = getPreviewParagraphs(section, query, numericLike);

    if (previewParagraphs.length === 0) {
      const empty = document.createElement("p");
      empty.innerHTML = "<em>No paragraph text under this heading.</em>";
      meta.appendChild(empty);
    } else {
      for (const previewText of previewParagraphs) {
        const p = document.createElement("p");
        p.innerHTML = highlightText(previewText, query);
        p.style.lineHeight = "1.6";
        meta.appendChild(p);
      }

      const note = document.createElement("p");
      note.style.fontStyle = "italic";
      note.style.opacity = "0.8";
      note.style.marginTop = "8px";
      note.textContent = "Preview shown for speed.";
      meta.appendChild(note);
    }

    card.appendChild(title);
    card.appendChild(meta);
    resultsWrapper.appendChild(card);
  }

  cfrContainer.appendChild(resultsWrapper);
}

function isNumericLikeQuery(query) {
  return /^[0-9.\s§-]+$/.test(query);
}

function filterSections(query) {
  const q = query.trim().toLowerCase();

  if (!q) return allSections;

  const numericLike = isNumericLikeQuery(q);

  if (!numericLike && q.length < MIN_TEXT_SEARCH_LENGTH) {
    return null;
  }

  const matches = allSections.filter(section => {
    const headingMatch = section.heading.toLowerCase().includes(q);
    const sectionNumberMatch = section.sectionNumber.toLowerCase().includes(q);
    const paragraphMatch = section.paragraphs.some(p => p.toLowerCase().includes(q));

    return headingMatch || sectionNumberMatch || paragraphMatch;
  });

  return matches.slice(0, MAX_SEARCH_RESULTS);
}

function runSearch() {
  const query = searchBar.value.trim();

  if (!query) {
    statusMessage.textContent =
      `Loaded ${allSections.length} CFR sections. Browse the full library below.`;
    renderHierarchySections(allSections);
    return;
  }

  const numericLike = isNumericLikeQuery(query);
  const filtered = filterSections(query);

  if (filtered === null) {
    statusMessage.textContent =
      `Type at least ${MIN_TEXT_SEARCH_LENGTH} letters for text search.`;
    cfrContainer.innerHTML = "<p><em>Keep typing to search the CFR library.</em></p>";
    return;
  }

  statusMessage.textContent = numericLike
    ? `Showing up to ${MAX_SEARCH_RESULTS} numeric search results for "${query}".`
    : `Showing up to ${MAX_SEARCH_RESULTS} text search results for "${query}".`;

  renderFlatSearchResults(filtered, query);
}

function getXmlPathCandidates() {
  const origin = window.location.origin;
  const pathname = window.location.pathname;

  const currentFolder = pathname.endsWith("/")
    ? pathname
    : pathname.substring(0, pathname.lastIndexOf("/") + 1);

  const candidates = [
    `./${XML_FOLDER_NAME}/${XML_FILE_NAME}`,
    `${XML_FOLDER_NAME}/${XML_FILE_NAME}`,
    `${currentFolder}${XML_FOLDER_NAME}/${XML_FILE_NAME}`,
    `${origin}${currentFolder}${XML_FOLDER_NAME}/${XML_FILE_NAME}`
  ];

  return [...new Set(candidates)];
}

function looksLikeValidXml(xmlText) {
  if (!xmlText) return false;

  const hasHead = xmlText.includes("<HEAD>");
  const hasParagraph = xmlText.includes("<P>");
  const hasHtml404 = /<html|<!doctype html/i.test(xmlText);

  return (hasHead || hasParagraph) && !hasHtml404;
}

async function fetchXmlFromCandidates() {
  const candidates = getXmlPathCandidates();
  let lastError = null;

  for (const candidate of candidates) {
    try {
      const response = await fetch(candidate, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} loading ${candidate}`);
      }

      const xmlText = await response.text();

      if (!looksLikeValidXml(xmlText)) {
        throw new Error(`Received invalid XML content from ${candidate}`);
      }

      return {
        xmlText,
        source: "live XML",
        pathUsed: candidate
      };
    } catch (error) {
      console.warn("XML candidate failed:", candidate, error);
      lastError = error;
    }
  }

  throw lastError || new Error("Unable to load XML from any candidate path.");
}

function updateAlertsPlaceholder() {
  if (!alertsList) return;

  alertsList.innerHTML = `
    <p>No active alerts</p>
  `;
}

async function loadCfr() {
  try {
    statusMessage.textContent = "Loading CFR data...";

    let xmlText = null;
    let source = "";
    let pathUsed = "";

    try {
      const result = await fetchXmlFromCandidates();
      xmlText = result.xmlText;
      source = result.source;
      pathUsed = result.pathUsed;

      saveXmlCache(xmlText);
    } catch (liveError) {
      const cachedXml = loadXmlCache();

      if (!cachedXml) {
        throw liveError;
      }

      xmlText = cachedXml;
      source = "saved cache";
      pathUsed = "browser cache";
      console.warn("Live XML unavailable, using saved cache instead.", liveError);
    }

    statusMessage.textContent = "Building CFR hierarchy...";
    buildSectionsFromXmlText(xmlText);

    if (source === "live XML") {
      statusMessage.textContent =
        `Loaded ${allSections.length} CFR sections from ${pathUsed}. Offline cache refreshed just now.`;
    } else {
      statusMessage.textContent =
        `Live XML unavailable. Loaded ${allSections.length} CFR sections from saved cache.`;
    }

    renderBookmarkFolders();
    renderHierarchySections(allSections);
  } catch (error) {
    statusMessage.textContent = "Error loading CFR data.";
    cfrContainer.innerHTML =
      "<p><strong>Problem:</strong> " + error.message + "</p>";
    console.error(error);
  }
}

searchBar.addEventListener("input", function () {
  clearTimeout(searchDebounceTimer);

  searchDebounceTimer = setTimeout(function () {
    runSearch();
  }, 350);
});

createFolderBtn.addEventListener("click", createFolder);

newFolderInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createFolder();
  }
});

if (focusModeBtn) {
  focusModeBtn.addEventListener("click", toggleFocusMode);
}

if (mobileBookmarkToggle && bookmarkSidebar) {
  mobileBookmarkToggle.addEventListener("click", function () {
    bookmarkSidebar.classList.toggle("mobile-open");
    mobileBookmarkToggle.textContent = bookmarkSidebar.classList.contains("mobile-open")
      ? "Hide Bookmarks"
      : "Show Bookmarks";
  });
}

if (exportBookmarksBtn) {
  exportBookmarksBtn.addEventListener("click", exportBookmarks);
}

if (importBookmarksBtn && importBookmarksInput) {
  importBookmarksBtn.addEventListener("click", function () {
    openImportModal();
  });

  importBookmarksInput.addEventListener("change", function (event) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      importBookmarksFromFile(file);
    }
    importBookmarksInput.value = "";
  });
}

applyFocusMode();
updateAlertsPlaceholder();
renderBookmarkFolders();
loadCfr();
