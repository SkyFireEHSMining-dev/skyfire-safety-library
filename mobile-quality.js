(function () {
  function applyMobileQualityStyles() {
    if (document.getElementById("skyfireMobileQualityStyles")) return;

    const style = document.createElement("style");
    style.id = "skyfireMobileQualityStyles";
    style.textContent = `
      /* Final sprint quality pass: keep deep CFR/OSHA hierarchy readable on phones. */
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

      #cfrContainer .section-path,
      #oshaContainer .section-path {
        color: var(--muted);
        overflow-wrap: anywhere;
        word-break: normal;
      }

      #cfrContainer .bookmark-controls,
      #oshaContainer .bookmark-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
        margin: 12px 0 18px;
      }

      #cfrContainer .bookmark-controls select,
      #cfrContainer .bookmark-controls button,
      #oshaContainer .bookmark-controls select,
      #oshaContainer .bookmark-controls button {
        min-height: 44px;
        max-width: 100%;
        font-size: 1rem;
      }

      @media (max-width: 600px) {
        #cfrSection .layout,
        #oshaSection .layout {
          gap: 14px;
        }

        #cfrContainer,
        #oshaContainer {
          padding: 8px;
          border-radius: 16px;
        }

        /* Hierarchy levels act like full-width folders instead of nesting inward. */
        #cfrContainer details,
        #oshaContainer details {
          width: 100%;
          max-width: 100%;
          min-width: 0;
          margin: 8px 0;
          padding: 0;
          overflow: hidden;
        }

        #cfrContainer details:not(.level-section),
        #oshaContainer details:not(.level-section) {
          border: 0;
          border-radius: 0;
          background: transparent;
        }

        #cfrContainer details:not(.level-section) > summary,
        #oshaContainer details:not(.level-section) > summary {
          display: block;
          width: 100%;
          padding: 13px 14px;
          border: 1px solid var(--line-soft);
          border-radius: 14px;
          background: #f8fbfe;
          font-size: 1.08rem;
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        /* Do not add horizontal padding at every CFR hierarchy level. */
        #cfrContainer details:not(.level-section) > .section-content,
        #oshaContainer details:not(.level-section) > .section-content {
          width: 100%;
          padding: 0;
          margin: 0;
        }

        #cfrContainer .level-section,
        #oshaContainer .level-section {
          border: 1px solid var(--line-soft);
          border-radius: 15px;
          background: #fff;
        }

        #cfrContainer .level-section > summary,
        #oshaContainer .level-section > summary {
          padding: 15px 14px;
          font-size: 1.12rem;
          line-height: 1.32;
          overflow-wrap: anywhere;
        }

        #cfrContainer .level-section > .section-content,
        #oshaContainer .level-section > .section-content {
          padding: 0 14px 16px;
        }

        #cfrContainer .level-section .section-content > p:not(.section-path),
        #oshaContainer .level-section .section-content > p:not(.section-path) {
          font-size: 1.12rem;
          line-height: 1.58;
          overflow-wrap: anywhere;
        }

        #cfrContainer .section-path,
        #oshaContainer .section-path {
          margin: 2px 0 12px;
          font-size: 0.92rem;
          line-height: 1.4;
        }

        #cfrContainer .bookmark-controls,
        #oshaContainer .bookmark-controls {
          margin-bottom: 20px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyMobileQualityStyles);
  } else {
    applyMobileQualityStyles();
  }
})();
