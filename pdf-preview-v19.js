/* SkyFire Safety v0.19 — local, multipage PDF reference viewer.
 * Uses a pinned, locally vendored Apache-2.0 PDF.js display engine.
 * Native iOS embedded PDFs expose page 1 only: DO NOT use an iframe/object.
 * The original cached PDFs remain unchanged and downloadable; XFA form
 * interactivity is not guaranteed by the canvas reference preview.
 */
(function () {
  "use strict";

  var pdfModulePromise;
  var modulePath = new URL("./vendor/pdfjs/pdf.mjs", document.baseURI).href;
  var workerPath = new URL("./vendor/pdfjs/pdf.worker.mjs", document.baseURI).href;

  function pdfLibrary() {
    if (!pdfModulePromise) {
      pdfModulePromise = import(modulePath).then(function (lib) {
        lib.GlobalWorkerOptions.workerSrc = workerPath;
        return lib;
      }).catch(function (error) {
        pdfModulePromise = null;
        throw error;
      });
    }
    return pdfModulePromise;
  }

  function initializePdfPreview() {
    if (!document.body || typeof HTMLDialogElement === "undefined" ||
        typeof HTMLDialogElement.prototype.showModal !== "function") return;

    var dialog = document.createElement("dialog");
    dialog.id = "skyfirePdfPreview";
    dialog.className = "sf-pdf-preview";
    dialog.setAttribute("aria-labelledby", "sfPdfTitle");
    dialog.setAttribute("aria-describedby", "sfPdfNotice");
    dialog.innerHTML =
      '<div class="sf-pdf-layout">' +
      '<header class="sf-pdf-header">' +
      '  <button type="button" id="sfPdfReturn" class="sf-pdf-return">← Return to SkyFire</button>' +
      '  <h2 id="sfPdfTitle">PDF reference</h2>' +
      '  <button type="button" id="sfPdfClose" class="sf-pdf-close" aria-label="Close PDF preview">×</button>' +
      '</header>' +
      '<p id="sfPdfNotice" class="sf-pdf-notice">Local reference copy. Confirm the official MSHA source before filing. Interactive/XFA fields may require a compatible PDF reader.</p>' +
      '<div class="sf-pdf-toolbar">' +
      '  <button type="button" id="sfPdfPrev">Previous page</button>' +
      '  <span id="sfPdfCounter" role="status" aria-live="polite">Loading document…</span>' +
      '  <button type="button" id="sfPdfNext">Next page</button>' +
      '  <button type="button" id="sfPdfZoomOut" aria-label="Zoom out">−</button>' +
      '  <button type="button" id="sfPdfFit">Fit width</button>' +
      '  <button type="button" id="sfPdfZoomIn" aria-label="Zoom in">+</button>' +
      '</div>' +
      '<div id="sfPdfScroll" class="sf-pdf-scroll" role="region" aria-label="Scrollable PDF pages" tabindex="0">' +
      '  <div id="sfPdfPages" class="sf-pdf-pages">' +
      '    <p class="sf-pdf-message">Loading PDF pages…</p>' +
      '  </div>' +
      '</div>' +
      '<footer class="sf-pdf-footer">' +
      '  <a id="sfPdfExternal" target="_blank" rel="noopener noreferrer">Open original PDF in device viewer</a>' +
      '  <a id="sfPdfDownload" download>Download PDF</a>' +
      '  <a id="sfPdfOfficial" target="_blank" rel="noopener noreferrer" hidden>Official MSHA source</a>' +
      '  <p>All pages are rendered in this scrollable preview. For interactive forms, printing or a complete selectable PDF, use the original document.</p>' +
      '</footer></div>';
    document.body.appendChild(dialog);

    var scroll = dialog.querySelector("#sfPdfScroll");
    var pagesBox = dialog.querySelector("#sfPdfPages");
    var counter = dialog.querySelector("#sfPdfCounter");
    var returnButton = dialog.querySelector("#sfPdfReturn");
    var prevButton = dialog.querySelector("#sfPdfPrev");
    var nextButton = dialog.querySelector("#sfPdfNext");
    var zoomIn = dialog.querySelector("#sfPdfZoomIn");
    var zoomOut = dialog.querySelector("#sfPdfZoomOut");
    var fitButton = dialog.querySelector("#sfPdfFit");
    var closeButton = dialog.querySelector("#sfPdfClose");
    var title = dialog.querySelector("#sfPdfTitle");
    var externalLink = dialog.querySelector("#sfPdfExternal");
    var downloadLink = dialog.querySelector("#sfPdfDownload");
    var officialLink = dialog.querySelector("#sfPdfOfficial");

    var state = {
      previousFocus: null, x: 0, y: 0, loadToken: 0, generation: 0,
      abort: null, loadingTask: null, pdf: null, count: 0,
      pageElements: [], observer: null, queue: [], queued: new Set(),
      active: 0, renders: [], zoom: 1, current: 1
    };

    function status(message) {
      counter.textContent = message;
    }
    function counterRefresh() {
      status(state.count ? "Page " + state.current + " of " + state.count :
        "Loading document…");
      prevButton.disabled = state.current <= 1 || !state.count;
      nextButton.disabled = state.current >= state.count || !state.count;
    }
    function invalidateRenders() {
      state.generation++;
      if (state.observer) { state.observer.disconnect(); state.observer = null; }
      state.renders.forEach(function (task) {
        try { task.cancel(); } catch (ignore) {}
      });
      state.renders = [];
      state.queue = [];
      state.queued = new Set();
      state.active = 0;
    }
    function releaseDocument() {
      state.loadToken++;
      invalidateRenders();
      if (state.abort) { state.abort.abort(); state.abort = null; }
      var task = state.loadingTask, pdf = state.pdf;
      state.loadingTask = null;
      state.pdf = null;
      state.count = 0;
      state.pageElements = [];
      if (task) Promise.resolve(task.destroy()).catch(function () {});
      else if (pdf) Promise.resolve(pdf.destroy()).catch(function () {});
    }
    function restorePlace() {
      releaseDocument();
      pagesBox.replaceChildren();
      document.body.classList.remove("sf-pdf-is-open");
      window.scrollTo(state.x, state.y);
      if (state.previousFocus && state.previousFocus.isConnected) {
        try { state.previousFocus.focus({ preventScroll: true }); }
        catch (ignore) { state.previousFocus.focus(); }
      }
      window.scrollTo(state.x, state.y);
    }
    returnButton.addEventListener("click", function () { dialog.close(); });
    closeButton.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("close", restorePlace);

    function updateCurrentPage() {
      if (!state.pageElements.length) return;
      var top = scroll.getBoundingClientRect().top + 55;
      var current = 1;
      state.pageElements.forEach(function (element, i) {
        if (element.getBoundingClientRect().top <= top) current = i + 1;
      });
      if (state.current !== current) { state.current = current; counterRefresh(); }
    }
    scroll.addEventListener("scroll", updateCurrentPage, { passive: true });

    function goToPage(pageNumber) {
      if (!state.count) return;
      var n = Math.max(1, Math.min(state.count, pageNumber));
      var target = state.pageElements[n - 1];
      if (target) {
        scroll.scrollTop = target.offsetTop - pagesBox.offsetTop;
        state.current = n;
        counterRefresh();
        requestPage(n);
      }
    }
    prevButton.addEventListener("click", function () { goToPage(state.current - 1); });
    nextButton.addEventListener("click", function () { goToPage(state.current + 1); });

    function fitScale(page) {
      var unscaled = page.getViewport({ scale: 1 }).width;
      var available = Math.max(240, scroll.clientWidth - 32);
      return Math.min(1.4, available / unscaled) * state.zoom;
    }

    function renderNext() {
      if (!state.pdf || state.active >= 2 || !state.queue.length) return;
      var n = state.queue.shift();
      var generation = state.generation;
      var documentRef = state.pdf;
      state.active++;
      (async function () {
        var shell = state.pageElements[n - 1];
        if (!shell) return;
        var holder = shell.querySelector(".sf-pdf-page-media");
        try {
          var page = await documentRef.getPage(n);
          if (state.generation !== generation || state.pdf !== documentRef) return;
          var viewport = page.getViewport({ scale: fitScale(page) });
          var ratio = Math.min(window.devicePixelRatio || 1, 1.65);
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d", { alpha: false });
          if (!ctx) throw Error("Canvas unavailable");
          canvas.width = Math.ceil(viewport.width * ratio);
          canvas.height = Math.ceil(viewport.height * ratio);
          canvas.style.width = Math.ceil(viewport.width) + "px";
          canvas.style.height = Math.ceil(viewport.height) + "px";
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", "Rendered PDF page " + n + " of " + state.count +
            ". The original document is available below.");
          holder.style.width = canvas.style.width;
          holder.style.minHeight = canvas.style.height;
          var task = page.render({
            canvas: canvas, canvasContext: ctx, viewport: viewport,
            transform: [ratio, 0, 0, ratio, 0, 0], intent: "display"
          });
          state.renders.push(task);
          await task.promise;
          if (state.generation !== generation || state.pdf !== documentRef) return;
          holder.replaceChildren(canvas);
          shell.dataset.rendered = "true";
        } catch (error) {
          if (state.generation !== generation || state.pdf !== documentRef) return;
          var p = document.createElement("p");
          p.className = "sf-pdf-message";
          p.textContent = "Page " + n +
            " could not be displayed here. Use Open original PDF or Download PDF.";
          holder.replaceChildren(p);
          shell.dataset.rendered = "error";
          console.warn("SkyFire PDF page render:", n, error);
        }
      })().finally(function () {
        if (state.generation !== generation) return;
        state.active--;
        renderNext();
      });
      if (state.active < 2) renderNext();
    }

    function requestPage(n) {
      if (n < 1 || n > state.count || !state.pdf) return;
      var shell = state.pageElements[n - 1];
      if (!shell || shell.dataset.rendered || state.queued.has(n)) return;
      state.queued.add(n);
      state.queue.push(n);
      renderNext();
    }

    function buildPages() {
      invalidateRenders();
      pagesBox.replaceChildren();
      state.pageElements = [];
      var frag = document.createDocumentFragment();
      for (var n = 1; n <= state.count; n++) {
        var shell = document.createElement("section");
        shell.className = "sf-pdf-page";
        shell.dataset.page = String(n);
        shell.setAttribute("aria-label", "PDF page " + n + " of " + state.count);
        var label = document.createElement("h3");
        label.textContent = "Page " + n + " of " + state.count;
        var media = document.createElement("div");
        media.className = "sf-pdf-page-media";
        var loading = document.createElement("p");
        loading.className = "sf-pdf-message";
        loading.textContent = "Preparing page " + n + "…";
        media.appendChild(loading);
        shell.appendChild(label);
        shell.appendChild(media);
        frag.appendChild(shell);
        state.pageElements.push(shell);
      }
      pagesBox.appendChild(frag);
      if ("IntersectionObserver" in window) {
        state.observer = new IntersectionObserver(function (items) {
          items.forEach(function (item) {
            if (item.isIntersecting) requestPage(Number(item.target.dataset.page));
          });
        }, { root: scroll, rootMargin: "650px 100px", threshold: 0 });
        state.pageElements.forEach(function (el) { state.observer.observe(el); });
      } else {
        // The first pages are available without IntersectionObserver; paging
        // buttons and scroll request additional pages as needed.
        requestPage(1);
        requestPage(2);
      }
      counterRefresh();
      requestPage(state.current);
    }

    function changeZoom(value) {
      if (!state.pdf) return;
      state.zoom = Math.max(.8, Math.min(2.5, value));
      var current = state.current;
      buildPages();
      goToPage(current);
    }
    zoomIn.addEventListener("click", function () { changeZoom(state.zoom + .25); });
    zoomOut.addEventListener("click", function () { changeZoom(state.zoom - .25); });
    fitButton.addEventListener("click", function () { changeZoom(1); });

    async function loadDocument(url, token) {
      try {
        var lib = await pdfLibrary();
        if (token !== state.loadToken) return;
        state.abort = new AbortController();
        var response = await fetch(url, { signal: state.abort.signal });
        if (!response.ok) throw Error("PDF HTTP " + response.status);
        var data = new Uint8Array(await response.arrayBuffer());
        if (token !== state.loadToken) return;
        state.loadingTask = lib.getDocument({ data: data });
        var pdf = await state.loadingTask.promise;
        if (token !== state.loadToken) { await pdf.destroy(); return; }
        state.pdf = pdf;
        state.count = pdf.numPages;
        state.current = 1;
        if (!state.count) throw Error("PDF contains no pages");
        buildPages();
        goToPage(1);
      } catch (error) {
        if (token !== state.loadToken) return;
        pagesBox.innerHTML =
          '<p class="sf-pdf-message" role="alert">This PDF cannot be displayed ' +
          'in the in-app viewer. Use Open original PDF in device viewer or ' +
          'Download PDF below.</p>';
        status("PDF preview unavailable");
        console.warn("SkyFire local PDF preview:", error);
      }
    }

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
               candidate.hostname.endsWith(".msha.gov"))) officialUrl = candidate.href;
        } catch (ignore) {}
      }
      releaseDocument();
      state.previousFocus = link;
      state.x = window.scrollX;
      state.y = window.scrollY;
      state.current = 1;
      state.zoom = 1;
      title.textContent = cardTitle ? cardTitle.textContent.trim() : "PDF reference";
      externalLink.href = pdfUrl.href;
      downloadLink.href = pdfUrl.href;
      officialLink.hidden = !officialUrl;
      if (officialUrl) officialLink.href = officialUrl;
      else officialLink.removeAttribute("href");
      pagesBox.innerHTML = '<p class="sf-pdf-message">Loading all PDF pages…</p>';
      status("Loading document…");
      dialog.showModal();
      document.body.classList.add("sf-pdf-is-open");
      returnButton.focus({ preventScroll: true });
      loadDocument(pdfUrl.href, state.loadToken);
    }

    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0 ||
          event.ctrlKey || event.metaKey || event.altKey || event.shiftKey ||
          !event.target || !event.target.closest) return;
      var link = event.target.closest("a[href]");
      if (!link || dialog.contains(link) || link.hasAttribute("download")) return;
      var url;
      try { url = new URL(link.href, document.baseURI); }
      catch (ignore) { return; }
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