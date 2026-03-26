const APP_VERSION = "library-shell-2-title29-parser";
const XML_FOLDER_NAME = "Data";
const MIN_TEXT_SEARCH_LENGTH = 3;
const MAX_SEARCH_RESULTS = 100;
const MAX_PREVIEW_PARAGRAPHS = 2;
const PREVIEW_SNIPPET_LENGTH = 220;
const LEVELS = ["title", "subtitle", "chapter", "subchapter", "part", "subpart"];

const STARTER_PACKS = {
  cfr: {
    "Ground Control": [
      { sectionNumber: "56.3130", heading: "§ 56.3130 Wall, bank, and slope stability." },
      { sectionNumber: "56.3131", heading: "§ 56.3131 Inspection and scaling of loose ground." },
      { sectionNumber: "56.3200", heading: "§ 56.3200 Correction of hazardous conditions." },
      { sectionNumber: "56.3201", heading: "§ 56.3201 Location for performing scaling." }
    ],
    "Fire Protection": [
      { sectionNumber: "56.4100", heading: "§ 56.4100 Firefighting equipment." },
      { sectionNumber: "56.4200", heading: "§ 56.4200 Use of mobile equipment for firefighting." },
      { sectionNumber: "56.4230", heading: "§ 56.4230 Self-propelled equipment; fire extinguishers." },
      { sectionNumber: "56.4330", heading: "§ 56.4330 Separate exit ways." },
      { sectionNumber: "56.4600", heading: "§ 56.4600 Extinguishing fires." }
    ],
    "Electrical": [
      { sectionNumber: "56.12001", heading: "§ 56.12001 Circuit breakers and switches." },
      { sectionNumber: "56.12016", heading: "§ 56.12016 Work on electrically powered equipment." },
      { sectionNumber: "56.12017", heading: "§ 56.12017 Work on power circuits." },
      { sectionNumber: "56.12025", heading: "§ 56.12025 Identification of power wires and cables." },
      { sectionNumber: "56.12071", heading: "§ 56.12071 Movement or operation of equipment near high-voltage power lines; warning." }
    ],
    "Training": [
      { sectionNumber: "46.3", heading: "§ 46.3 Training plans: Submission and approval." },
      { sectionNumber: "46.5", heading: "§ 46.5 New miner training." },
      { sectionNumber: "46.6", heading: "§ 46.6 Newly hired experienced miner training." },
      { sectionNumber: "46.7", heading: "§ 46.7 New task training." },
      { sectionNumber: "46.8", heading: "§ 46.8 Annual refresher training." },
      { sectionNumber: "46.11", heading: "§ 46.11 Site-specific hazard awareness training." }
    ]
  }
};

const LIBRARY_CONFIGS = {
  cfr: {
    key: "cfr",
    label: "MSHA / 30 CFR",
    sectionId: "cfrSection",
    xmlFileName: "ECFR-title30.xml",
    cacheKey: "skyfire_xml_cache_title30_v1",
    bookmarksKey: "skyfire_bookmarks_title30_v1",
    defaultTitle: "Title 30",
    dom: {
      container: "cfrContainer",
      searchInput: "searchBar",
      statusMessage: "statusMessage",
      folderInput: "newFolderInput",
      createFolderBtn: "createFolderBtn",
      folderContainer: "bookmarkFolders",
      exportBtn: "exportBookmarksBtn",
      importBtn: "importBookmarksBtn",
      importInput: "importBookmarksInput",
      sidebar: "bookmarkSidebar"
    }
  },
  osha: {
    key: "osha",
    label: "OSHA / 29 CFR",
    sectionId: "oshaSection",
    xmlFileName: "ECFR-title29.xml",
    cacheKey: "skyfire_xml_cache_title29_v1",
    bookmarksKey: "skyfire_bookmarks_title29_v1",
    defaultTitle: "Title 29",
    dom: {
      container: "oshaContainer",
      searchInput: "oshaSearchBar",
      statusMessage: "oshaStatusMessage",
      folderInput: "oshaNewFolderInput",
      createFolderBtn: "oshaCreateFolderBtn",
      folderContainer: "oshaBookmarkFolders",
      exportBtn: "oshaExportBookmarksBtn",
      importBtn: "oshaImportBookmarksBtn",
      importInput: "oshaImportBookmarksInput",
      sidebar: "oshaBookmarkSidebar"
    }
  }
};

const appSections = document.querySelectorAll(".app-section");
const homeAlertStatus = document.getElementById("homeAlertStatus");
const fatalityStat = document.getElementById("fatalityStat");
const fatalgramNote = document.getElementById("fatalgramNote");
const homeLastUpdated = document.getElementById("homeLastUpdated");
const alertsList = document.getElementById("alertsList");

const libraryStates = {};

function createInitialState(config) {
  return {
    config,
    dom: getLibraryDom(config),
    allSections: [],
    bookmarkFolders: loadBookmarkFolders(config.bookmarksKey),
    searchDebounceTimer: null,
    currentQuery: "",
    isLoaded: false
  };
}

function getLibraryDom(config) {
  return {
    container: document.getElementById(config.dom.container),
    searchInput: document.getElementById(config.dom.searchInput),
    statusMessage: document.getElementById(config.dom.statusMessage),
    folderInput: document.getElementById(config.dom.folderInput),
    createFolderBtn: document.getElementById(config.dom.createFolderBtn),
    folderContainer: document.getElementById(config.dom.folderContainer),
    exportBtn: document.getElementById(config.dom.exportBtn),
    importBtn: document.getElementById(config.dom.importBtn),
    importInput: document.getElementById(config.dom.importInput),
    sidebar: document.getElementById(config.dom.sidebar)
  };
}

function showSection(sectionId) {
  appSections.forEach(section => section.classList.add("hidden"));

  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function bindSectionButtons() {
  const buttons = document.querySelectorAll("[data-open-section]");
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const targetId = button.getAttribute("data-open-section");
      if (targetId) {
        showSection(targetId);
      }
    });
  });
}

function setHomePlaceholders() {
  const today = new Date();
  const dateText = today.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  if (fatalityStat) fatalityStat.textContent = "Placeholder";
  if (homeAlertStatus) homeAlertStatus.textContent = "No active alerts";
  if (fatalgramNote) {
    fatalgramNote.textContent =
      "Offline-ready placeholder. Future fatalgram and quick safety information can live here.";
  }
  if (homeLastUpdated) homeLastUpdated.textContent = dateText;
  if (alertsList) alertsList.innerHTML = "<p>No active alerts</p>";
}

function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

function cleanText(text) {
  return decodeHtmlEntities(text || "")
    .replace(/\s+/g, " ")
    .trim();
}

function getHeadingLevel(text) {
  const value = cleanText(text);

  if (/^Title\s+\d+/i.test(value)) return "title";
  if (/^Subtitle\b/i.test(value)) return "subtitle";
  if (/^CHAPTER\b/i.test(value)) return "chapter";
  if (/^Chapter\b/i.test(value)) return "chapter";
  if (/^SUBCHAPTER\b/i.test(value)) return "subchapter";
  if (/^Subchapter\b/i.test(value)) return "subchapter";
  if (/^PART\b/i.test(value)) return "part";
  if (/^Part\b/i.test(value)) return "part";
  if (/^Subpart\b/i.test(value)) return "subpart";
  if (/^§\s*[0-9]/i.test(value)) return "section";

  return "other";
}

function extractSectionNumber(text) {
  const match = cleanText(text).match(/^§\s*([0-9]+(?:\.[0-9A-Za-z()-]+)*)/i);
  return match ? match[1] : "";
}

function normalizeHeadingSpacing(text) {
  return cleanText(text)
    .replace(/\s+—\s+/g, " — ")
    .replace(/\s*-\s*/g, " - ");
}

function defaultLabelFor(level, config) {
  const map = {
    title: config.defaultTitle || "Title",
    subtitle: "No Subtitle",
    chapter: "No Chapter",
    subchapter: "No Subchapter",
    part: "No Part",
    subpart: "No Subpart"
  };

  return map[level];
}

function isDefaultLevelLabel(level, value, config) {
  return value === defaultLabelFor(level, config);
}

function createBaseContext(config) {
  return {
    title: config.defaultTitle || "Title",
    subtitle: defaultLabelFor("subtitle", config),
    chapter: defaultLabelFor("chapter", config),
    subchapter: defaultLabelFor("subchapter", config),
    part: defaultLabelFor("part", config),
    subpart: defaultLabelFor("subpart", config)
  };
}

function cloneContext(context) {
  return {
    title: context.title,
    subtitle: context.subtitle,
    chapter: context.chapter,
    subchapter: context.subchapter,
    part: context.part,
    subpart: context.subpart
  };
}

function parseLegacyHeadParagraphXml(xmlText, config) {
  const sections = [];
  const regex = /<HEAD>([\s\S]*?)<\/HEAD>|<P>([\s\S]*?)<\/P>/gi;

  let match;
  let current = createBaseContext(config);
  let currentSection = null;

  while ((match = regex.exec(xmlText)) !== null) {
    if (match[1]) {
      const headingText = cleanText(match[1]);
      if (!headingText) continue;

      const level = getHeadingLevel(headingText);

      if (level === "title") {
        current.title = headingText;
        current.subtitle = defaultLabelFor("subtitle", config);
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
        currentSection = null;
      } else if (level === "subtitle") {
        current.subtitle = headingText;
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
        currentSection = null;
      } else if (level === "chapter") {
        current.chapter = headingText;
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
        currentSection = null;
      } else if (level === "subchapter") {
        current.subchapter = headingText;
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
        currentSection = null;
      } else if (level === "part") {
        current.part = headingText;
        current.subpart = defaultLabelFor("subpart", config);
        currentSection = null;
      } else if (level === "subpart") {
        current.subpart = headingText;
        currentSection = null;
      } else if (level === "section") {
        currentSection = {
          ...cloneContext(current),
          heading: headingText,
          sectionNumber: extractSectionNumber(headingText),
          paragraphs: []
        };
        sections.push(currentSection);
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

  return sections;
}

function parseCfrDocXml(xmlText, config) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");

  if (xmlDoc.querySelector("parsererror")) {
    console.warn("XML parser error for", config.label, xmlDoc.querySelector("parsererror").textContent);
    return [];
  }

  const sections = [];
  const current = createBaseContext(config);

  const titleNum = xmlDoc.querySelector("TITLENUM");
  if (titleNum) {
    current.title = normalizeHeadingSpacing(titleNum.textContent);
  }

  const treeWalker = xmlDoc.createTreeWalker(
    xmlDoc.documentElement,
    NodeFilter.SHOW_ELEMENT,
    null
  );

  let node = treeWalker.currentNode;

  while (node) {
    const tag = node.tagName ? node.tagName.toUpperCase() : "";

    if (tag === "TITLENUM") {
      current.title = normalizeHeadingSpacing(node.textContent);
    } else if (tag === "SUBTITLE" || tag === "SUBTITLEG") {
      const text = normalizeHeadingSpacing(node.textContent);
      if (text) {
        current.subtitle = text;
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      }
    } else if (tag === "CHAPNO") {
      const text = normalizeHeadingSpacing(node.textContent);
      if (!text) {
        node = treeWalker.nextNode();
        continue;
      }

      if (/^Subtitle\b/i.test(text)) {
        current.subtitle = text;
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Chapter\b/i.test(text)) {
        current.chapter = text;
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      }
    } else if (tag === "HD") {
      const text = normalizeHeadingSpacing(node.textContent);
      const source = (node.getAttribute("SOURCE") || "").toUpperCase();

      if (!text) {
        node = treeWalker.nextNode();
        continue;
      }

      if (/^Title\s+\d+/i.test(text)) {
        current.title = text;
        current.subtitle = defaultLabelFor("subtitle", config);
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Subtitle\b/i.test(text)) {
        current.subtitle = text;
        current.chapter = defaultLabelFor("chapter", config);
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Chapter\b/i.test(text)) {
        current.chapter = text;
        current.subchapter = defaultLabelFor("subchapter", config);
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Subchapter\b/i.test(text)) {
        current.subchapter = text;
        current.part = defaultLabelFor("part", config);
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Part\s+[0-9A-Za-z.-]+/i.test(text)) {
        current.part = text;
        current.subpart = defaultLabelFor("subpart", config);
      } else if (/^Subpart\b/i.test(text)) {
        current.subpart = text;
      } else if (source === "HED" && /^§\s*[0-9]/i.test(text)) {
        const subjectNode = node.parentElement ? node.parentElement.querySelector("SUBJECT") : null;
        const subjectText = subjectNode ? normalizeHeadingSpacing(subjectNode.textContent) : "";
        const fullHeading = subjectText ? `${text} ${subjectText}` : text;

        const paragraphNodes = node.parentElement
          ? Array.from(node.parentElement.querySelectorAll(":scope > P"))
          : [];

        const paragraphs = paragraphNodes
          .map(p => cleanText(p.textContent))
          .filter(Boolean);

        sections.push({
          ...cloneContext(current),
          heading: fullHeading,
          sectionNumber: extractSectionNumber(text),
          paragraphs
        });
      }
    } else if (tag === "SECTION") {
      const sectnoNode = node.querySelector(":scope > SECTNO");
      if (!sectnoNode) {
        node = treeWalker.nextNode();
        continue;
      }

      const sectnoText = normalizeHeadingSpacing(sectnoNode.textContent);
      if (!sectnoText) {
        node = treeWalker.nextNode();
        continue;
      }

      const subjectNode = node.querySelector(":scope > SUBJECT");
      const subjectText = subjectNode ? normalizeHeadingSpacing(subjectNode.textContent) : "";
      const heading = subjectText ? `${sectnoText} ${subjectText}` : sectnoText;

      const paragraphNodes = Array.from(node.querySelectorAll(":scope > P, :scope > FP, :scope > EXTRACT > P"));
      const paragraphs = paragraphNodes
        .map(p => cleanText(p.textContent))
        .filter(Boolean);

      let inferredPart = current.part;
      if (/^No Part/i.test(inferredPart)) {
        const match = sectnoText.match(/^§\s*([0-9]+)/);
        if (match) {
          inferredPart = `Part ${match[1]}`;
        }
      }

      sections.push({
        title: current.title,
        subtitle: current.subtitle,
        chapter: current.chapter,
        subchapter: current.subchapter,
        part: inferredPart,
        subpart: current.subpart,
        heading,
        sectionNumber: extractSectionNumber(sectnoText),
        paragraphs
      });
    }

    node = treeWalker.nextNode();
  }

  return dedupeSections(sections);
}

function dedupeSections(sections) {
  const seen = new Set();
  const unique = [];

  sections.forEach(section => {
    const key = `${section.sectionNumber}||${section.heading}`;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(section);
    }
  });

  return unique;
}

function buildSectionsFromXmlText(xmlText, config) {
  const looksLikeCfrDoc = /<CFRDOC[\s>]/i.test(xmlText);

  if (config.key === "osha" || looksLikeCfrDoc) {
    const cfrDocSections = parseCfrDocXml(xmlText, config);
    if (cfrDocSections.length) {
      return cfrDocSections;
    }
  }

  const legacySections = parseLegacyHeadParagraphXml(xmlText, config);
  if (legacySections.length) {
    return legacySections;
  }

  if (looksLikeCfrDoc) {
    return parseCfrDocXml(xmlText, config);
  }

  return [];
}

function buildHierarchy(sections, config) {
  const tree = {};

  sections.forEach(section => {
    let cursor = tree;

    LEVELS.forEach(level => {
      const key = section[level] || defaultLabelFor(level, config);
      if (!cursor[key]) {
        cursor[key] = {};
      }
      cursor = cursor[key];
    });

    if (!cursor.__sections) {
      cursor.__sections = [];
    }

    cursor.__sections.push(section);
  });

  return tree;
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

function levelClassName(index) {
  const names = [
    "level-title",
    "level-subtitle",
    "level-chapter",
    "level-subchapter",
    "level-part",
    "level-subpart"
  ];

  return names[index] || "section";
}

function sortKeysForDisplay(keys) {
  return keys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text, query) {
  if (!query) return text;

  const safeQuery = escapeRegExp(query);
  const regex = new RegExp(`(${safeQuery})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}

function createBookmarkControls(libraryKey, section) {
  const state = libraryStates[libraryKey];
  const controls = document.createElement("div");
  controls.className = "bookmark-controls";

  if (!state.bookmarkFolders.length) {
    const note = document.createElement("span");
    note.className = "inline-note";
    note.textContent = "Create a folder to save bookmarks.";
    controls.appendChild(note);
    return controls;
  }

  const select = document.createElement("select");
  state.bookmarkFolders.forEach(folder => {
    const option = document.createElement("option");
    option.value = folder.id;
    option.textContent = folder.name;
    select.appendChild(option);
  });

  const button = document.createElement("button");
  button.textContent = "Add Bookmark";
  button.addEventListener("click", function () {
    addBookmarkToFolder(libraryKey, select.value, section);
  });

  controls.appendChild(select);
  controls.appendChild(button);
  return controls;
}

function createSectionBlock(libraryKey, section, query, options = {}) {
  const opts = {
    showFullViewButton: false,
    openByDefault: false,
    ...options
  };

  const { details, content } = createDetails(
    highlightText(section.heading, query),
    opts.openByDefault,
    "level-section"
  );

  details.dataset.sectionNumber = section.sectionNumber || section.heading;
  details.dataset.library = libraryKey;

  const path = document.createElement("p");
  path.className = "section-path";
  path.textContent = buildSectionPath(section);
  content.appendChild(path);

  content.appendChild(createBookmarkControls(libraryKey, section));

  if (opts.showFullViewButton) {
    const openBtn = document.createElement("button");
    openBtn.textContent = "Open in Full View";
    openBtn.style.marginBottom = "14px";
    openBtn.addEventListener("click", function () {
      openSectionInFullView(libraryKey, section.sectionNumber);
    });
    content.appendChild(openBtn);
  }

  const paragraphs = section.paragraphs.length
    ? section.paragraphs
    : ["No paragraph text was parsed for this section."];

  paragraphs.forEach(paragraph => {
    const p = document.createElement("p");
    p.innerHTML = highlightText(paragraph, query);
    content.appendChild(p);
  });

  return details;
}

function renderTree(libraryKey, node, levelIndex, query) {
  const config = libraryStates[libraryKey].config;
  const fragment = document.createDocumentFragment();

  if (levelIndex >= LEVELS.length) {
    const sections = node.__sections || [];
    sortSectionsForDisplay(sections).forEach(section => {
      fragment.appendChild(createSectionBlock(libraryKey, section, query, { openByDefault: false }));
    });
    return fragment;
  }

  const level = LEVELS[levelIndex];
  const keys = sortKeysForDisplay(Object.keys(node).filter(key => key !== "__sections"));

  keys.forEach(key => {
    const childNode = node[key];

    if (isDefaultLevelLabel(level, key, config)) {
      fragment.appendChild(renderTree(libraryKey, childNode, levelIndex + 1, query));
      return;
    }

    const { details, content } = createDetails(
      highlightText(key, query),
      levelIndex === 0,
      levelClassName(levelIndex)
    );

    content.appendChild(renderTree(libraryKey, childNode, levelIndex + 1, query));
    fragment.appendChild(details);
  });

  if (node.__sections && node.__sections.length) {
    sortSectionsForDisplay(node.__sections).forEach(section => {
      fragment.appendChild(createSectionBlock(libraryKey, section, query, { openByDefault: false }));
    });
  }

  return fragment;
}

function buildSectionPath(section) {
  return [section.title, section.subtitle, section.chapter, section.subchapter, section.part, section.subpart]
    .filter(Boolean)
    .filter(value => !/^No /i.test(value))
    .join(" > ");
}

function sortSectionsForDisplay(sections) {
  return [...sections].sort((a, b) =>
    (a.sectionNumber || a.heading).localeCompare((b.sectionNumber || b.heading), undefined, { numeric: true })
  );
}

function renderHierarchySections(libraryKey) {
  const state = libraryStates[libraryKey];
  const container = state.dom.container;

  if (!container) return;
  container.innerHTML = "";

  if (!state.allSections.length) {
    const panel = document.createElement("div");
    panel.className = "info-panel";
    panel.innerHTML = `
      <h3>${state.config.label} is not loaded yet</h3>
      <p>
        Add <strong>${state.config.xmlFileName}</strong> to the <strong>${XML_FOLDER_NAME}</strong> folder, then reload the app.
      </p>
    `;
    container.appendChild(panel);
    return;
  }

  const tree = buildHierarchy(state.allSections, state.config);
  container.appendChild(renderTree(libraryKey, tree, 0, ""));
}

function getPreviewParagraphs(section, query) {
  if (!section.paragraphs.length) {
    return ["No paragraph text was parsed for this section."];
  }

  if (!query) {
    return section.paragraphs.slice(0, MAX_PREVIEW_PARAGRAPHS);
  }

  const lowerQuery = query.toLowerCase();
  const matchedParagraphs = section.paragraphs.filter(paragraph =>
    paragraph.toLowerCase().includes(lowerQuery)
  );

  if (matchedParagraphs.length) {
    return matchedParagraphs.slice(0, MAX_PREVIEW_PARAGRAPHS);
  }

  return section.paragraphs.slice(0, MAX_PREVIEW_PARAGRAPHS);
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

function getMatchingSections(libraryKey, query) {
  const state = libraryStates[libraryKey];
  const lowerQuery = query.toLowerCase();

  return state.allSections.filter(section => {
    const headingMatch = section.heading.toLowerCase().includes(lowerQuery);
    const numberMatch = (section.sectionNumber || "").toLowerCase().includes(lowerQuery);
    const paragraphMatch = section.paragraphs.some(paragraph =>
      paragraph.toLowerCase().includes(lowerQuery)
    );
    const pathMatch = buildSectionPath(section).toLowerCase().includes(lowerQuery);

    return headingMatch || numberMatch || paragraphMatch || pathMatch;
  });
}

function isNumericLikeQuery(query) {
  return /^[0-9.\-§ ]+$/.test(query);
}

function runSearch(libraryKey) {
  const state = libraryStates[libraryKey];
  const container = state.dom.container;
  const input = state.dom.searchInput;
  const status = state.dom.statusMessage;

  if (!container || !input || !status) return;

  const query = input.value.trim();
  state.currentQuery = query;

  if (!query) {
    status.textContent = state.isLoaded
      ? `Showing all ${state.config.label} sections.`
      : `Loading ${state.config.label} data...`;
    renderHierarchySections(libraryKey);
    return;
  }

  if (!isNumericLikeQuery(query) && query.length < MIN_TEXT_SEARCH_LENGTH) {
    status.textContent = `Type at least ${MIN_TEXT_SEARCH_LENGTH} letters, or enter a section number.`;
    renderHierarchySections(libraryKey);
    return;
  }

  const matches = getMatchingSections(libraryKey, query).slice(0, MAX_SEARCH_RESULTS);
  container.innerHTML = "";

  if (!matches.length) {
    status.textContent = `No ${state.config.label} matches found for "${query}".`;
    return;
  }

  status.textContent = `Showing ${matches.length} ${state.config.label} result(s) for "${query}".`;

  const wrapper = document.createElement("div");
  wrapper.className = "search-results-wrapper";

  sortSectionsForDisplay(matches).forEach(section => {
    const card = document.createElement("div");
    card.className = "bookmark-folder";

    const header = document.createElement("div");
    header.className = "bookmark-folder-title";
    header.innerHTML = highlightText(section.heading, query);

    const body = document.createElement("div");
    body.className = "bookmark-folder-content";

    const item = document.createElement("div");
    item.className = "bookmark-item";

    const path = document.createElement("div");
    path.className = "section-path";
    path.textContent = buildSectionPath(section);

    const preview = document.createElement("div");
    preview.className = "preview-snippets";

    getPreviewParagraphs(section, query).forEach(paragraph => {
      const p = document.createElement("p");
      p.innerHTML = highlightText(truncateText(paragraph, PREVIEW_SNIPPET_LENGTH), query);
      preview.appendChild(p);
    });

    const controls = document.createElement("div");
    controls.className = "bookmark-button-row";

    const openBtn = document.createElement("button");
    openBtn.textContent = "Open in Full View";
    openBtn.addEventListener("click", function () {
      openSectionInFullView(libraryKey, section.sectionNumber);
    });

    controls.appendChild(openBtn);

    item.appendChild(path);
    item.appendChild(preview);
    item.appendChild(createBookmarkControls(libraryKey, section));
    item.appendChild(controls);

    body.appendChild(item);
    card.appendChild(header);
    card.appendChild(body);
    wrapper.appendChild(card);
  });

  container.appendChild(wrapper);
}

function rerenderCurrentView(libraryKey) {
  renderBookmarkFolders(libraryKey);
  renderStarterPacks(libraryKey);
  runSearch(libraryKey);
}

function saveXmlCache(cacheKey, xmlText) {
  try {
    localStorage.setItem(cacheKey, xmlText);
  } catch (error) {
    console.warn("Could not save XML cache:", error);
  }
}

function loadXmlCache(cacheKey) {
  try {
    return localStorage.getItem(cacheKey);
  } catch (error) {
    console.warn("Could not load XML cache:", error);
    return null;
  }
}

function saveBookmarkFolders(bookmarksKey, folders) {
  try {
    localStorage.setItem(bookmarksKey, JSON.stringify(folders));
  } catch (error) {
    console.warn("Could not save bookmark folders:", error);
  }
}

function loadBookmarkFolders(bookmarksKey) {
  try {
    const saved = localStorage.getItem(bookmarksKey);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Could not load bookmark folders:", error);
    return [];
  }
}

function randomId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function sortBookmarkFolders(libraryKey) {
  const state = libraryStates[libraryKey];

  state.bookmarkFolders.sort((a, b) => a.name.localeCompare(b.name));

  state.bookmarkFolders.forEach(folder => {
    folder.items.sort((a, b) =>
      a.heading.localeCompare(b.heading, undefined, { numeric: true })
    );
  });
}

function createFolder(libraryKey) {
  const state = libraryStates[libraryKey];
  const input = state.dom.folderInput;
  if (!input) return;

  const name = input.value.trim();
  if (!name) return;

  const alreadyExists = state.bookmarkFolders.some(
    folder => folder.name.toLowerCase() === name.toLowerCase()
  );

  if (alreadyExists) {
    alert("A folder with that name already exists.");
    return;
  }

  state.bookmarkFolders.push({
    id: randomId(),
    name,
    items: []
  });

  sortBookmarkFolders(libraryKey);
  saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
  input.value = "";
  rerenderCurrentView(libraryKey);
}

function deleteFolder(libraryKey, folderId) {
  const state = libraryStates[libraryKey];
  const folder = state.bookmarkFolders.find(item => item.id === folderId);
  if (!folder) return;

  const confirmed = confirm(`Delete folder "${folder.name}" and all bookmarks inside it?`);
  if (!confirmed) return;

  state.bookmarkFolders = state.bookmarkFolders.filter(item => item.id !== folderId);
  saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
  rerenderCurrentView(libraryKey);
}

function addBookmarkToFolder(libraryKey, folderId, section) {
  const state = libraryStates[libraryKey];
  const folder = state.bookmarkFolders.find(item => item.id === folderId);

  if (!folder) {
    alert("That folder could not be found.");
    return;
  }

  const alreadyExists = folder.items.some(item => item.sectionNumber === section.sectionNumber);
  if (alreadyExists) {
    alert("That bookmark is already in this folder.");
    return;
  }

  folder.items.push({
    sectionNumber: section.sectionNumber,
    heading: section.heading
  });

  sortBookmarkFolders(libraryKey);
  saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
  rerenderCurrentView(libraryKey);
}

function removeBookmarkFromFolder(libraryKey, folderId, sectionNumber) {
  const state = libraryStates[libraryKey];
  const folder = state.bookmarkFolders.find(item => item.id === folderId);
  if (!folder) return;

  folder.items = folder.items.filter(item => item.sectionNumber !== sectionNumber);
  sortBookmarkFolders(libraryKey);
  saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
  rerenderCurrentView(libraryKey);
}

function openAncestorsForElement(element) {
  let current = element.parentElement;

  while (current) {
    if (current.tagName && current.tagName.toLowerCase() === "details") {
      current.open = true;
    }
    current = current.parentElement;
  }
}

function scrollToAndHighlightSection(libraryKey, sectionNumber) {
  setTimeout(function () {
    const safeNumber = CSS.escape(sectionNumber);
    const target = document.querySelector(`[data-library="${libraryKey}"][data-section-number="${safeNumber}"]`);
    if (!target) return;

    openAncestorsForElement(target);
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("highlighted-section");

    setTimeout(function () {
      target.classList.remove("highlighted-section");
    }, 2000);
  }, 100);
}

function goToBookmark(libraryKey, sectionNumber) {
  const state = libraryStates[libraryKey];
  showSection(state.config.sectionId);

  if (state.dom.searchInput) {
    state.dom.searchInput.value = sectionNumber;
  }

  renderHierarchySections(libraryKey);

  if (state.dom.statusMessage) {
    state.dom.statusMessage.textContent = `Opened ${state.config.label} section ${sectionNumber}.`;
  }

  scrollToAndHighlightSection(libraryKey, sectionNumber);
}

function openSectionInFullView(libraryKey, sectionNumber) {
  const state = libraryStates[libraryKey];
  showSection(state.config.sectionId);

  if (state.dom.searchInput) {
    state.dom.searchInput.value = sectionNumber;
  }

  renderHierarchySections(libraryKey);

  if (state.dom.statusMessage) {
    state.dom.statusMessage.textContent = `Opened full ${state.config.label} view for section ${sectionNumber}.`;
  }

  scrollToAndHighlightSection(libraryKey, sectionNumber);
}

function renderBookmarkFolders(libraryKey) {
  const state = libraryStates[libraryKey];
  const container = state.dom.folderContainer;
  if (!container) return;

  container.innerHTML = "";

  if (!state.bookmarkFolders.length) {
    container.innerHTML = "<p><em>No bookmarks yet.</em></p>";
    return;
  }

  state.bookmarkFolders.forEach(folder => {
    const details = document.createElement("details");
    details.className = "bookmark-folder";
    details.open = true;

    const summary = document.createElement("summary");
    summary.className = "bookmark-folder-title";
    summary.textContent = folder.name;

    const content = document.createElement("div");
    content.className = "bookmark-folder-content";

    const folderControls = document.createElement("div");
    folderControls.className = "bookmark-item";

    const deleteFolderBtn = document.createElement("button");
    deleteFolderBtn.textContent = "Delete Folder";
    deleteFolderBtn.addEventListener("click", function () {
      deleteFolder(libraryKey, folder.id);
    });

    folderControls.appendChild(deleteFolderBtn);
    content.appendChild(folderControls);

    folder.items.forEach(item => {
      const row = document.createElement("div");
      row.className = "bookmark-item";

      const title = document.createElement("div");
      title.className = "bookmark-item-title";
      title.textContent = item.heading;

      const buttonRow = document.createElement("div");
      buttonRow.className = "bookmark-button-row";

      const openBtn = document.createElement("button");
      openBtn.textContent = "Open";
      openBtn.addEventListener("click", function () {
        goToBookmark(libraryKey, item.sectionNumber);
      });

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", function () {
        removeBookmarkFromFolder(libraryKey, folder.id, item.sectionNumber);
      });

      buttonRow.appendChild(openBtn);
      buttonRow.appendChild(removeBtn);

      row.appendChild(title);
      row.appendChild(buttonRow);
      content.appendChild(row);
    });

    details.appendChild(summary);
    details.appendChild(content);
    container.appendChild(details);
  });
}

function getOrCreateFolderByName(libraryKey, folderName) {
  const state = libraryStates[libraryKey];
  let folder = state.bookmarkFolders.find(
    item => item.name.toLowerCase() === folderName.toLowerCase()
  );

  if (!folder) {
    folder = {
      id: randomId(),
      name: folderName,
      items: []
    };
    state.bookmarkFolders.push(folder);
  }

  return folder;
}

function addStarterPack(libraryKey, packName) {
  const packGroup = STARTER_PACKS[libraryKey] || {};
  const packItems = packGroup[packName];
  if (!packItems) {
    alert("That starter pack could not be found.");
    return;
  }

  const folder = getOrCreateFolderByName(libraryKey, packName);
  let addedCount = 0;

  packItems.forEach(packItem => {
    const alreadyExists = folder.items.some(item => item.sectionNumber === packItem.sectionNumber);

    if (!alreadyExists) {
      folder.items.push({
        sectionNumber: packItem.sectionNumber,
        heading: packItem.heading
      });
      addedCount += 1;
    }
  });

  sortBookmarkFolders(libraryKey);
  saveBookmarkFolders(libraryStates[libraryKey].config.bookmarksKey, libraryStates[libraryKey].bookmarkFolders);
  rerenderCurrentView(libraryKey);

  if (addedCount === 0) {
    alert(`"${packName}" is already installed.`);
  } else {
    alert(`Installed "${packName}" starter pack with ${addedCount} bookmark(s).`);
  }
}

function renderStarterPacks(libraryKey) {
  const state = libraryStates[libraryKey];
  const sidebar = state.dom.sidebar;
  if (!sidebar) return;

  const existing = sidebar.querySelector(".starter-pack-section");
  if (existing) {
    existing.remove();
  }

  const packGroup = STARTER_PACKS[libraryKey];
  if (!packGroup || !Object.keys(packGroup).length) {
    return;
  }

  const section = document.createElement("div");
  section.className = "bookmark-item starter-pack-section";

  const title = document.createElement("div");
  title.className = "bookmark-item-title";
  title.textContent = "Starter Packs";

  const text = document.createElement("p");
  text.textContent = "Add prebuilt bookmark folders for common safety topics.";
  text.style.marginTop = "0";
  text.style.marginBottom = "12px";
  text.style.lineHeight = "1.5";

  const buttonWrap = document.createElement("div");
  buttonWrap.className = "bookmark-button-row";

  Object.keys(packGroup).forEach(packName => {
    const button = document.createElement("button");
    button.textContent = packName;
    button.addEventListener("click", function () {
      addStarterPack(libraryKey, packName);
    });
    buttonWrap.appendChild(button);
  });

  section.appendChild(title);
  section.appendChild(text);
  section.appendChild(buttonWrap);

  const folderCreateRow = sidebar.querySelector(".folder-create-row");
  if (folderCreateRow) {
    folderCreateRow.insertAdjacentElement("afterend", section);
  }
}

function createBookmarkExportData(libraryKey) {
  const state = libraryStates[libraryKey];
  return {
    app: "SkyFire Safety Library",
    library: state.config.label,
    exportedAt: new Date().toISOString(),
    folders: state.bookmarkFolders
  };
}

function downloadTextFile(fileName, fileText, mimeType) {
  const blob = new Blob([fileText], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(function () {
    URL.revokeObjectURL(url);
  }, 1000);
}

function createModalShell(titleText) {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.remove();
    }
  });

  const modal = document.createElement("div");
  modal.className = "modal-card";

  const title = document.createElement("h2");
  title.textContent = titleText;

  modal.appendChild(title);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  return { overlay, modal };
}

function exportBookmarks(libraryKey) {
  const state = libraryStates[libraryKey];
  const data = createBookmarkExportData(libraryKey);
  const fileText = JSON.stringify(data, null, 2);

  const { modal } = createModalShell(`Export ${state.config.label} Bookmarks`);

  const help = document.createElement("p");
  help.textContent =
    "You can download this file, or copy the text below as a backup.";
  modal.appendChild(help);

  const textArea = document.createElement("textarea");
  textArea.value = fileText;
  textArea.readOnly = true;
  textArea.className = "modal-textarea";
  modal.appendChild(textArea);

  const buttonRow = document.createElement("div");
  buttonRow.className = "bookmark-button-row";

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

  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "Download";
  downloadBtn.addEventListener("click", function () {
    const stamp = new Date().toISOString().slice(0, 10);
    const safeKey = state.config.key;
    downloadTextFile(`skyfire-${safeKey}-bookmarks-${stamp}.json`, fileText, "application/json");
  });

  buttonRow.appendChild(copyBtn);
  buttonRow.appendChild(downloadBtn);
  modal.appendChild(buttonRow);
}

function importBookmarks(libraryKey, fileText) {
  const state = libraryStates[libraryKey];

  let data;
  try {
    data = JSON.parse(fileText);
  } catch (error) {
    alert("That bookmark file could not be read.");
    return;
  }

  if (!data || !Array.isArray(data.folders)) {
    alert("That file does not look like a valid SkyFire bookmark export.");
    return;
  }

  state.bookmarkFolders = data.folders.map(folder => ({
    id: folder.id || randomId(),
    name: folder.name || "Imported Folder",
    items: Array.isArray(folder.items) ? folder.items : []
  }));

  sortBookmarkFolders(libraryKey);
  saveBookmarkFolders(state.config.bookmarksKey, state.bookmarkFolders);
  rerenderCurrentView(libraryKey);
  alert(`${state.config.label} bookmarks imported.`);
}

async function loadLibraryXml(libraryKey) {
  const state = libraryStates[libraryKey];
  const config = state.config;
  const status = state.dom.statusMessage;

  if (status) {
    status.textContent = `Loading ${config.label} data...`;
  }

  const xmlPath = `${XML_FOLDER_NAME}/${config.xmlFileName}`;
  let xmlText = "";

  try {
    const response = await fetch(xmlPath, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    xmlText = await response.text();
    saveXmlCache(config.cacheKey, xmlText);
  } catch (error) {
    console.warn(`Could not fetch ${config.label} XML. Trying local cache.`, error);
    xmlText = loadXmlCache(config.cacheKey) || "";
  }

  if (!xmlText) {
    state.allSections = [];
    state.isLoaded = false;

    if (status) {
      status.textContent =
        `${config.label} data was not found. Add ${config.xmlFileName} to the ${XML_FOLDER_NAME} folder, then reload.`;
    }

    renderHierarchySections(libraryKey);
    return;
  }

  state.allSections = buildSectionsFromXmlText(xmlText, config);
  state.isLoaded = state.allSections.length > 0;

  if (status) {
    status.textContent = state.allSections.length
      ? `Loaded ${state.allSections.length} ${config.label} sections.`
      : `Loaded ${config.label} XML, but no sections were parsed.`;
  }

  rerenderCurrentView(libraryKey);
}

function bindLibraryEvents(libraryKey) {
  const state = libraryStates[libraryKey];
  const dom = state.dom;

  if (dom.createFolderBtn) {
    dom.createFolderBtn.addEventListener("click", function () {
      createFolder(libraryKey);
    });
  }

  if (dom.folderInput) {
    dom.folderInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        createFolder(libraryKey);
      }
    });
  }

  if (dom.searchInput) {
    dom.searchInput.addEventListener("input", function () {
      clearTimeout(state.searchDebounceTimer);
      state.searchDebounceTimer = setTimeout(function () {
        runSearch(libraryKey);
      }, 180);
    });
  }

  if (dom.exportBtn) {
    dom.exportBtn.addEventListener("click", function () {
      exportBookmarks(libraryKey);
    });
  }

  if (dom.importBtn && dom.importInput) {
    dom.importBtn.addEventListener("click", function () {
      dom.importInput.click();
    });

    dom.importInput.addEventListener("change", function (event) {
      const file = event.target.files && event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function () {
        importBookmarks(libraryKey, reader.result);
        dom.importInput.value = "";
      };
      reader.readAsText(file);
    });
  }
}

function initializeLibraries() {
  Object.keys(LIBRARY_CONFIGS).forEach(libraryKey => {
    libraryStates[libraryKey] = createInitialState(LIBRARY_CONFIGS[libraryKey]);
    sortBookmarkFolders(libraryKey);
    renderBookmarkFolders(libraryKey);
    renderStarterPacks(libraryKey);
    bindLibraryEvents(libraryKey);
    loadLibraryXml(libraryKey);
  });
}

function initializeApp() {
  bindSectionButtons();
  setHomePlaceholders();
  initializeLibraries();
}

initializeApp();
