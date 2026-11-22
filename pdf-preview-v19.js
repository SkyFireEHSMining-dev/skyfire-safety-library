/* SkyFire v0.19: local PDF preview with a persistent, accessible return control.
 * Only same-app, cached document links are intercepted. Downloads and official
 * agency links retain their native behavior. Embedded-PDF/XFA support is
 * platform-dependent; the original-PDF action remains available as a fallback.
 */
(function () {
  "use strict";

  function initializePdfPreview() {
    if (!document.body || typeof HTMLDialogElement === "undefined" ||
        typeof HTMLDialogElement.prototype.showModal !== "function") {
      return; // Native links remain functional on unsupported browsers.
    }

    var dialog = document.createElement("dialog");
    dialog.id = "skyfirePdfPreview";
    dialog.className = "sf-pdf-preview";
    dialog.setAttribute("aria-labelledby", "sfPdfTitle");
    dialog.setAttribute("aria-describedby", "sfPdfNotice");
    dialog.innerHTML =
      '<div class="sf-pdf-layout">' +
      '  <header class="sf-pdf-header">' +
      '    <button type="button" id="sfPdfReturn" class="sf-pdf-return">← Return to SkyFire</button>' +
      '    <h2 id="sfPdfTitle">PDF reference</h2>' +
      '    <button type="button" id="sfPdfClose" class="sf-pdf-close" aria-label="Close PDF preview">×</button>' +
      '  </header>' +
      '  <p id="sfPdfNotice" class="sf-pdf-notice">Cached reference copy. Check the official MSHA source before filing. Interactive/XFA fields may require a compatible PDF reader.</p>' +
      '  <iframe id="sfPdfFrame" class="sf-pdf-frame" title="Local PDF document preview"></iframe>' +
      '  <footer class="sf-pdf-footer">' +
      '    <a id="sfPdfExternal" target="_blank" rel="noopener noreferrer">Open original PDF in device viewer</a>' +
      '    <a id="sfPdfDownload" download>Download PDF</a>' +
      '    <a id="sfPdfOfficial" target="_blank" rel="noopener noreferrer" hidden>Official MSHA source</a>' +
      '    <p>If the embedded viewer does not show all pages, use the original PDF or Download PDF. Opening the device viewer may leave SkyFire; return to this app afterward.</p>' +
      '  </footer>' +
      '</div>';
    document.body.appendChild(dialog);

    var frame = dialog.querySelector("#sfPdfFrame");
    var returnButton = dialog.querySelector("#sfPdfReturn");
    var closeButton = dialog.querySelector("#sfPdfClose");
    var title = dialog.querySelector("#sfPdfTitle");
    var externalLink = dialog.querySelector("#sfPdfExternal");
    var downloadLink = dialog.querySelector("#sfPdfDownload");
    var officialLink = dialog.querySelector("#sfPdfOfficial");

    var previousFocus = null;
    var previousX = 0;
    var previousY = 0;

    function closePreview() {
      if (dialog.open) dialog.close();
    }

    function restorePlace() {
      frame.removeAttribute("src");
      document.body.classList.remove("sf-pdf-is-open");
      window.scrollTo(previousX, previousY);
      if (previousFocus && previousFocus.isConnected &&
          typeof previousFocus.focus === "function") {
        try { previousFocus.focus({ preventScroll: true }); }
        catch (error) { previousFocus.focus(); }
      }
      // Focus restoration must not move the underlying Forms Library.
      window.scrollTo(previousX, previousY);
    }

    returnButton.addEventListener("click", closePreview);
    closeButton.addEventListener("click", closePreview);
    dialog.addEventListener("close", restorePlace);

    function openPreview(link, pdfUrl) {
      var card = link.closest(".document-card");
      var cardTitle = card && card.querySelector("h4");
      var official = card && card.querySelector('a[href^="https://www.msha.gov/"]');
      var officialUrl = null;
      if (official) {
        try {
          var candidate = new URL(official.href);
          if (candidate.protocol === "https:" &&
              (candidate.hostname === "msha.gov" ||
               candidate.hostname.endsWith(".msha.gov"))) {
            officialUrl = candidate.href;
          }
        } catch (error) { /* Omit unsupported official links. */ }
      }

      previousFocus = link;
      previousX = window.scrollX;
      previousY = window.scrollY;
      title.textContent = cardTitle ? cardTitle.textContent.trim() :
        (link.getAttribute("aria-label") || "PDF reference");
      externalLink.href = pdfUrl.href;
      downloadLink.href = pdfUrl.href;
      officialLink.hidden = !officialUrl;
      if (officialUrl) officialLink.href = officialUrl;
      else officialLink.removeAttribute("href");

      dialog.showModal();
      document.body.classList.add("sf-pdf-is-open");
      frame.src = pdfUrl.href;
      returnButton.focus({ preventScroll: true });
    }

    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
          !event.target || !event.target.closest) return;
      var link = event.target.closest("a[href]");
      if (!link || dialog.contains(link) || link.hasAttribute("download")) return;

      // Never intercept official external sources, or non-PDF resources.
      var url;
      try { url = new URL(link.href, document.baseURI); }
      catch (error) { return; }
      var appRoot = new URL("./", document.baseURI);
      if (url.origin !== appRoot.origin ||
          !url.pathname.startsWith(appRoot.pathname + "docs/") ||
          !/\.pdf$/i.test(url.pathname)) return;
      event.preventDefault();
      openPreview(link, url);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePdfPreview);
  } else {
    initializePdfPreview();
  }
})();