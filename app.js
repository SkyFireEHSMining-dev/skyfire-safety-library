const XML_FILE_NAME = "ECFR-title30.xml";
const XML_FOLDER_NAME = "Data";
const CACHE_KEY = "title30_xml_cache_v3";
const BOOKMARKS_KEY = "title30_bookmark_folders_v1";

const cfrContainer = document.getElementById("cfrContainer");
const searchBar = document.getElementById("searchBar");
const statusMessage = document.getElementById("statusMessage");
const newFolderInput = document.getElementById("newFolderInput");
const createFolderBtn = document.getElementById("createFolderBtn");
const bookmarkFoldersContainer = document.getElementById("bookmarkFolders");
const alertsList = document.getElementById("alertsList");

let allSections = [];
let bookmarkFolders = loadBookmarkFolders();

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

function sortBookmarkFolders() {
  bookmarkFolders.sort((a, b) => a.name.localeCompare(b.name));

  for (const folder of bookmarkFolders) {
    folder.items.sort((a, b) =>
      a.heading.localeCompare(b.heading, undefined, { numeric: true })
    );
  }
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
  renderBookmarkFolders();
  newFolderInput.value = "";
}

function addBookmarkToFolder(folderId, section) {
  const folder = bookmarkFolders.find(f => f.id === folderId);
  if (!folder) return;

  const alreadyExists = folder.items.some(
    item => item.sectionNumber === section.sectionNumber
  );
  if (alreadyExists) return;

  folder.items.push({
    sectionNumber: section.sectionNumber,
    heading: section.heading
  });

  sortBookmarkFolders();
  saveBookmarkFolders();
  renderBookmarkFolders();
  renderSections(filterSections(searchBar.value.trim()), searchBar.value.trim());
}

function removeBookmarkFromFolder(folderId, sectionNumber) {
  const folder = bookmarkFolders.find(f => f.id === folderId);
  if (!folder) return;

  folder.items = folder.items.filter(item => item.sectionNumber !== sectionNumber);

  sortBookmarkFolders();
  saveBookmarkFolders();
  renderBookmarkFolders();
  renderSections(filterSections(searchBar.value.trim()), searchBar.value.trim());
}

function isBookmarked(sectionNumber) {
  return bookmarkFolders.some(folder =>
    folder.items.some(item => item.sectionNumber === sectionNumber)
  );
}

function goToBookmark(sectionNumber) {
  const currentQuery = searchBar.value.trim();

  if (currentQuery) {
    searchBar.value = sectionNumber;
    renderSections(filterSections(sectionNumber), sectionNumber);
  }

  setTimeout(function () {
    const target = document.querySelector(`[data-section-number="${sectionNumber}"]`);
    if (!target) return;

    let parent = target.parentElement;
    while (parent) {
      if (parent.tagName === "DETAILS") {
        parent.open = true;
      }
      parent = parent.parentElement;
    }

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("highlighted-section");

    setTimeout(function () {
      target.classList.remove("highlighted-section");
    }, 2000);
  }, 100);
}

function renderBookmarkFolders() {
  bookmarkFoldersContainer.innerHTML = "";

  if (bookmarkFolders.length === 0) {
    bookmarkFoldersContainer.innerHTML = "<p><em>No bookmarks yet.</em></p>";
    return;
  }

  for (const folder of bookmarkFolders) {
    const folderCard = document.createElement("div");
    folderCard.className = "bookmark-folder";

    const folderTitle = document.createElement("div");
    folderTitle.className = "bookmark-folder-title";
    folderTitle.textContent = `${folder.name} (${folder.items.length})`;
    folderCard.appendChild(folderTitle);

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
        goBtn.addEventListener("click", function () {
          goToBookmark(item.sectionNumber);
        });

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", function () {
          removeBookmarkFromFolder(folder.id, item.sectionNumber);
        });

        buttonRow.appendChild(goBtn);
        buttonRow.appendChild(removeBtn);

        itemCard.appendChild(itemTitle);
        itemCard.appendChild(buttonRow);
        folderCard.appendChild(itemCard);
      }
    }

    bookmarkFoldersContainer.appendChild(folderCard);
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

  const button = document.createElement("button");
  button.textContent = isBookmarked(section.sectionNumber)
    ? "☆ Bookmarked"
    : "☆ Add Bookmark";
  button.disabled = isBookmarked(section.sectionNumber);

  button.addEventListener("click", function () {
    if (!select.value) {
      alert("Choose a folder first.");
      return;
    }

    addBookmarkToFolder(select.value, section);
  });

  wrapper.appendChild(select);
  wrapper.appendChild(button);

  return wrapper;
}

function renderSections(sectionsToRender, query = "") {
  cfrContainer.innerHTML = "";

  if (!sectionsToRender.length) {
    cfrContainer.innerHTML = "<p><em>No results found.</em></p>";
    return;
  }

  const tree = buildHierarchy(sectionsToRender);
  const hasQuery = query.trim() !== "";

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
        hasQuery,
        "section level-chapter"
      );
      volumeNode.content.appendChild(chapterNode.details);

      const subchapters = chapters[chapterName];

      for (const subchapterName of Object.keys(subchapters)) {
        const subchapterNode = createDetails(
          highlightText(subchapterName, query),
          hasQuery,
          "section level-subchapter"
        );
        chapterNode.content.appendChild(subchapterNode.details);

        const parts = subchapters[subchapterName];

        for (const partName of Object.keys(parts)) {
          const partNode = createDetails(
            highlightText(partName, query),
            hasQuery,
            "section level-part"
          );
          subchapterNode.content.appendChild(partNode.details);

          const sections = parts[partName];

          for (const section of sections) {
            const sectionNode = createDetails(
              highlightText(section.heading, query),
              hasQuery,
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

function filterSections(query) {
  const q = query.trim().toLowerCase();

  if (!q) return allSections;

  return allSections.filter(section => {
    const headingMatch = section.heading.toLowerCase().includes(q);
    const sectionNumberMatch = section.sectionNumber.toLowerCase().includes(q);
    const paragraphMatch = section.paragraphs.some(p => p.toLowerCase().includes(q));

    return headingMatch || sectionNumberMatch || paragraphMatch;
  });
}

function getXmlPathCandidates() {
  const origin = window.location.origin;
  const pathname = window.location.pathname;

  // Folder where index.html is living
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
    renderSections(allSections);
  } catch (error) {
    statusMessage.textContent = "Error loading CFR data.";
    cfrContainer.innerHTML =
      "<p><strong>Problem:</strong> " + error.message + "</p>";
    console.error(error);
  }
}

searchBar.addEventListener("input", function () {
  const query = searchBar.value.trim();
  const filtered = filterSections(query);
  renderSections(filtered, query);
});

createFolderBtn.addEventListener("click", createFolder);

newFolderInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    createFolder();
  }
});

updateAlertsPlaceholder();
renderBookmarkFolders();
loadCfr();
