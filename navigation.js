(function () {
  const NAV_TREE = {
    homeSection: { label: "Home", parent: null },

    safetyToolsHubSection: { label: "Safety Tools", parent: "homeSection" },
    regulatoryResourcesHubSection: { label: "Regulatory Resources", parent: "homeSection" },
    fieldResourcesHubSection: { label: "Field Resources", parent: "homeSection" },

    riskMatrixSection: { label: "Risk Assessment Matrix", parent: "safetyToolsHubSection" },
    roiCalculatorSection: { label: "Safety ROI Calculator", parent: "safetyToolsHubSection" },
    fiveSSection: { label: "5S Workplace Organization", parent: "safetyToolsHubSection" },

    cfrSection: { label: "MSHA / 30 CFR", parent: "regulatoryResourcesHubSection" },
    oshaSection: { label: "OSHA / 29 CFR", parent: "regulatoryResourcesHubSection" },
    docsSection: { label: "MSHA Forms", parent: "regulatoryResourcesHubSection" },
    mshaGuidanceSection: { label: "MSHA Guidance", parent: "regulatoryResourcesHubSection" },
    technicalGuidanceSection: { label: "Technical Guidance", parent: "regulatoryResourcesHubSection" },

    ppmLibrarySection: { label: "Program Policy Manual", parent: "mshaGuidanceSection" },
    ppmVolume4Section: { label: "Volume IV", parent: "ppmLibrarySection" },
    ppmSubpartMSection: { label: "Subpart M", parent: "ppmVolume4Section" },

    tg001Section: { label: "TG-001", parent: "technicalGuidanceSection" },

    safetyDocsSection: { label: "Safety Docs", parent: "fieldResourcesHubSection" },
    toolboxTalksSection: { label: "Toolbox Talks", parent: "fieldResourcesHubSection" },

    feedbackSection: { label: "Feedback & Suggestions", parent: "homeSection" },
    aboutSection: { label: "About SkyFire", parent: "homeSection" }
  };

  const DYNAMIC_IDS = new Set([
    "safetyToolsHubSection",
    "regulatoryResourcesHubSection",
    "fieldResourcesHubSection",
    "fiveSSection",
    "mshaGuidanceSection",
    "technicalGuidanceSection",
    "ppmLibrarySection",
    "ppmVolume4Section",
    "ppmSubpartMSection",
    "tg001Section"
  ]);

  let decorationScheduled = false;

  function addStyles() {
    const old = document.getElementById("skyfireNavigationStyles");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "skyfireNavigationStyles";
    style.textContent = `
      .module-header.skyfire-nav-ready > .module-home-btn {
        display: none !important;
      }

      .skyfire-nav-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
        margin: 0 0 10px;
      }

      .skyfire-nav-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 44px;
        padding: 9px 15px;
        border: 1px solid #b8c6d4;
        border-radius: 13px;
        background: #ffffff;
        color: var(--accent);
        font: inherit;
        font-weight: 700;
        line-height: 1.15;
        cursor: pointer;
      }

      .skyfire-nav-btn:hover,
      .skyfire-nav-btn:focus-visible {
        outline: 3px solid rgba(11,132,255,.16);
        outline-offset: 1px;
      }

      .skyfire-nav-home {
        color: #52677f;
        background: #f8fafc;
      }

      .skyfire-nav-context {
        margin: 0 0 18px;
        color: #6b7788;
        font-size: .82rem;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }

      .skyfire-nav-context span {
        color: #9aa6b4;
        padding: 0 4px;
      }

      @media (max-width: 480px) {
        .skyfire-nav-actions {
          gap: 8px;
        }

        .skyfire-nav-btn {
          min-height: 42px;
          padding: 8px 13px;
          font-size: .95rem;
        }

        .skyfire-nav-context {
          font-size: .78rem;
          margin-bottom: 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function getPath(sectionId) {
    const path = [];
    let current = sectionId;
    const visited = new Set();

    while (current && NAV_TREE[current] && !visited.has(current)) {
      visited.add(current);
      path.unshift({ id: current, label: NAV_TREE[current].label });
      current = NAV_TREE[current].parent;
    }

    return path;
  }

  function hideAllSections() {
    document.querySelectorAll(".app-section").forEach(section => section.classList.add("hidden"));
  }

  function navigateTo(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    hideAllSections();

    if (DYNAMIC_IDS.has(sectionId)) {
      if (typeof window.openDynamicSection === "function") {
        window.openDynamicSection(target);
      } else {
        target.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (typeof window.showSection === "function") {
      window.showSection(sectionId);
    } else {
      target.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function buildButton(text, className, destinationId, ariaLabel) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `skyfire-nav-btn ${className}`.trim();
    button.textContent = text;
    button.setAttribute("aria-label", ariaLabel);
    button.addEventListener("click", () => navigateTo(destinationId));
    return button;
  }

  function decorateSection(section) {
    if (!section || !section.id || section.id === "homeSection") return;
    const nav = NAV_TREE[section.id];
    if (!nav) return;

    const header = section.querySelector(":scope > .module-header");
    if (!header) return;

    const oldActions = header.querySelector(":scope > .skyfire-nav-actions");
    if (oldActions) oldActions.remove();
    const oldContext = header.querySelector(":scope > .skyfire-nav-context");
    if (oldContext) oldContext.remove();

    header.classList.add("skyfire-nav-ready");

    const actions = document.createElement("div");
    actions.className = "skyfire-nav-actions";

    const parentId = nav.parent;
    const parent = parentId ? NAV_TREE[parentId] : null;
    const isOneStepFromHome = parentId === "homeSection";

    if (parentId && !isOneStepFromHome) {
      actions.appendChild(
        buildButton(
          "← Back",
          "skyfire-nav-back",
          parentId,
          `Back to ${parent ? parent.label : "previous section"}`
        )
      );
    }

    actions.appendChild(
      buildButton("⌂ Home", "skyfire-nav-home", "homeSection", "Go to SkyFire Home")
    );

    const headerText = header.querySelector(":scope > .module-header-text");
    header.insertBefore(actions, headerText || header.firstChild);

    const path = getPath(section.id).filter(item => item.id !== "homeSection");
    if (path.length >= 2) {
      const context = document.createElement("div");
      context.className = "skyfire-nav-context";
      context.setAttribute("aria-label", "Current location");
      path.forEach((item, index) => {
        if (index > 0) {
          const separator = document.createElement("span");
          separator.textContent = "›";
          context.appendChild(separator);
        }
        context.appendChild(document.createTextNode(item.label));
      });
      header.insertBefore(context, headerText || null);
    }
  }

  function decorateAll() {
    Object.keys(NAV_TREE).forEach(sectionId => {
      if (sectionId === "homeSection") return;
      decorateSection(document.getElementById(sectionId));
    });
  }

  function scheduleDecoration() {
    if (decorationScheduled) return;
    decorationScheduled = true;
    window.setTimeout(() => {
      decorationScheduled = false;
      decorateAll();
    }, 0);
  }

  function initializeNavigation() {
    addStyles();
    decorateAll();

    const observer = new MutationObserver(scheduleDecoration);
    observer.observe(document.body, { childList: true, subtree: true });

    /* Dynamic PPM sections are created just after DOMContentLoaded. */
    window.setTimeout(decorateAll, 100);
    window.setTimeout(decorateAll, 400);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeNavigation);
  } else {
    initializeNavigation();
  }
})();
