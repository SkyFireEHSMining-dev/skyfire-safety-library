(function () {
  const STYLE_ID = "skyfireCfrV13Styles";
  let installTries = 0;

  function applyResponsiveStyles() {
    const old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* v0.13 CFR reader parity: use the same flat hierarchy philosophy on
         phone, tablet, and desktop. Structural nesting should communicate
         hierarchy through rails/color, not progressively narrower cards. */
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
      #oshaContainer {
        overflow-x: hidden;
      }

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

      @media (min-width: 760px) {
        #cfrContainer details:not(.level-section) > summary,
        #oshaContainer details:not(.level-section) > summary {
          padding: 15px 18px;
        }

        #cfrContainer .level-section > summary,
        #oshaContainer .level-section > summary {
          padding: 16px 18px;
          font-size: 1.12rem;
        }

        #cfrContainer .level-section > .section-content,
        #oshaContainer .level-section > .section-content {
          padding: 0 18px 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function installPerformancePatch() {
    if (
      typeof window.createSectionBlock !== "function" ||
      typeof window.createDetails !== "function" ||
      typeof window.highlightText !== "function" ||
      typeof window.buildSectionPath !== "function" ||
      typeof window.createBookmarkControls !== "function"
    ) {
      installTries += 1;
      if (installTries < 80) window.setTimeout(installPerformancePatch, 50);
      return;
    }

    if (window.createSectionBlock.__skyfireV13Lazy === true) return;

    /* The service worker already stores regulatory XML in Cache Storage.
       Title 29 is ~29 MB, so duplicating that same raw XML into synchronous
       localStorage adds work and commonly exceeds browser storage quotas. */
    if (typeof window.saveXmlCache === "function" && !window.saveXmlCache.__skyfireV13NoLargeXml) {
      const originalSaveXmlCache = window.saveXmlCache;
      const replacementSaveXmlCache = function (cacheKey, xmlText) {
        if (/^skyfire_xml_cache_title(?:29|30)_/i.test(String(cacheKey || ""))) {
          return;
        }
        return originalSaveXmlCache(cacheKey, xmlText);
      };
      replacementSaveXmlCache.__skyfireV13NoLargeXml = true;
      window.saveXmlCache = replacementSaveXmlCache;
    }

    const lazyCreateSectionBlock = function (libraryKey, section, query, options) {
      const opts = Object.assign(
        {
          showFullViewButton: false,
          openByDefault: false
        },
        options || {}
      );

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

        content.appendChild(window.createBookmarkControls(libraryKey, section));

        if (opts.showFullViewButton && typeof window.openSectionInFullView === "function") {
          const openBtn = document.createElement("button");
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

    lazyCreateSectionBlock.__skyfireV13Lazy = true;
    window.createSectionBlock = lazyCreateSectionBlock;

    window.SkyFireCfrV13 = {
      lazySectionBodies: true,
      largeXmlLocalStorageDisabled: true,
      responsiveParity: true
    };
  }

  applyResponsiveStyles();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installPerformancePatch);
  } else {
    installPerformancePatch();
  }
})();
