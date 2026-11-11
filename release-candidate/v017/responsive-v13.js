(function () {
  const STYLE_ID = "skyfireResponsiveV13Styles";

  function applyResponsiveLayout() {
    const old = document.getElementById(STYLE_ID);
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --sf-wide-shell: 1680px;
        --sf-readable-line: 100ch;
      }

      /* Keep phone and ordinary tablet behavior unchanged. The wider shell
         only activates when the viewport is truly laptop/desktop sized. */
      @media (min-width: 1100px) {
        .main-header {
          padding-left: clamp(36px, 3.2vw, 64px);
          padding-right: clamp(36px, 3.2vw, 64px);
        }

        .main-header .brand-row {
          width: 100%;
          max-width: min(var(--sf-wide-shell), 96vw);
          margin-left: auto;
          margin-right: auto;
        }

        main {
          width: 100%;
          max-width: min(var(--sf-wide-shell), 96vw) !important;
          padding-left: clamp(36px, 3.2vw, 64px) !important;
          padding-right: clamp(36px, 3.2vw, 64px) !important;
        }

        #siteFooter {
          width: 100%;
          max-width: min(var(--sf-wide-shell), 96vw) !important;
          padding-left: clamp(36px, 3.2vw, 64px) !important;
          padding-right: clamp(36px, 3.2vw, 64px) !important;
        }

        /* Regulatory readers benefit from a slightly wider navigation rail
           while the reference text receives most of the available width. */
        #cfrSection .layout,
        #oshaSection .layout {
          grid-template-columns: minmax(290px, 340px) minmax(0, 1fr) !important;
          gap: clamp(22px, 2vw, 34px);
        }

        /* Use the larger canvas for scanning, but keep prose at a comfortable
           line length inside otherwise full-width cards/panels. */
        .info-panel > p,
        .about-card > p,
        .ppm-official-text,
        .tg-body > p,
        .tg-subsection-body > p,
        .five-s-detail-body > p,
        .five-s-detail-body > ul,
        .five-s-detail-body > ol {
          max-width: var(--sf-readable-line);
        }

        .ppm-entry-body p,
        .ppm-entry-body li,
        .tg-body p,
        .tg-body li {
          font-size: 1.08rem;
        }

        .skyfire-hub-list,
        .ppm-library-list,
        .tg-library-list {
          gap: clamp(18px, 1.8vw, 28px);
        }
      }

      @media (min-width: 1450px) {
        /* Home and hub cards should take advantage of a genuinely wide
           desktop without creating a long single-column page. */
        #homeSection .dashboard-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 24px;
        }

        .skyfire-hub-list,
        .ppm-library-list,
        .tg-library-list {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
        }

        .dashboard-tile {
          min-height: 180px;
        }

        .dashboard-tile .tile-subtitle {
          margin-top: 46px;
        }
      }

      /* If a desktop window is narrowed again, fall back naturally without
         forcing columns that no longer fit. */
      @media (min-width: 1100px) and (max-width: 1449px) {
        #homeSection .dashboard-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `;

    document.head.appendChild(style);
  }

  applyResponsiveLayout();

  window.SkyFireResponsiveV13 = {
    wideShell: true,
    maxShellPx: 1680,
    readableLineLength: "100ch"
  };
})();
