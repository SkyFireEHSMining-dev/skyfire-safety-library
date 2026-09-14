(function () {
  const SOURCE_REVIEWED = "Source checked September 2026";
  let tries = 0;

  function ensureStylesheet() {
    if (document.querySelector('link[data-msha-ready-v16="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./msha-ready-v16.css?v=v0.16-msha-ready-1";
    link.dataset.mshaReadyV16 = "true";
    document.head.appendChild(link);
  }

  function show(section) {
    if (!section) return;
    if (typeof window.openDynamicSection === "function") {
      window.openDynamicSection(section);
      return;
    }
    document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
    section.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function placeholderMarkup(title, purpose, sourceChipClass, sourceChipText) {
    return `
      <div class="module-header">
        <button class="module-home-btn msha-ready-back" type="button">← Back</button>
        <div class="module-header-text">
          <h2>${title}</h2>
          <p>${purpose}</p>
        </div>
      </div>
      <div class="info-panel msha-ready-placeholder">
        <div class="msha-ready-kicker">MSHA Ready · v0.16 foundation</div>
        <h3>Foundation Ready</h3>
        <p>This destination is now part of the MSHA Ready architecture. Its substantive source-reviewed content is added in the next committed v0.16 work item.</p>
        <div class="msha-review-meta">
          <span class="msha-source-chip ${sourceChipClass}">${sourceChipText}</span>
          <span class="msha-reviewed-date">${SOURCE_REVIEWED}</span>
        </div>
        <div class="msha-ready-note"><strong>Authority rule:</strong> SkyFire will keep controlling law/regulation, MSHA procedure/guidance, professional commentary, and SkyFire practical guidance visibly separate.</div>
      </div>
    `;
  }

  function readyMarkup() {
    return `
      <div class="module-header">
        <button class="module-home-btn msha-ready-home" type="button">Back Home</button>
        <div class="module-header-text">
          <h2>MSHA Ready</h2>
          <p>Prepare for inspections, understand MSHA authority, and respond correctly when something happens at the mine.</p>
        </div>
      </div>

      <div class="info-panel msha-ready-intro">
        <div class="msha-ready-kicker">Prepare · Understand · Respond</div>
        <h3>MSHA readiness without the guesswork</h3>
        <p>MSHA Ready connects the legal authority, agency procedure, practical preparation, and under-pressure decision support that a mine safety professional may need before, during, and after an MSHA interaction.</p>
        <p>Use the short path when you already know the process. Expand the source-backed detail when you are studying or need to verify why a step matters.</p>
        <div class="msha-review-meta">
          <span class="msha-reviewed-date">${SOURCE_REVIEWED}</span>
        </div>
      </div>

      <div class="msha-ready-grid" aria-label="MSHA Ready destinations">
        <button class="msha-ready-card" type="button" data-msha-ready-target="inspectionReadySection">
          <strong>Inspection Ready</strong>
          <span>Routine MSHA inspection preparation, lifecycle guidance, and readiness checks.</span>
          <span class="msha-ready-status">Stage 1 · v0.16</span>
        </button>
        <button class="msha-ready-card incident-ready-card" type="button" data-msha-ready-target="incidentReadySection">
          <strong>Something Happened at the Mine</strong>
          <span>Part 50 incident decision support for reporting, scene preservation, investigation, and Form 7000-1.</span>
          <span class="msha-ready-status">Incident Ready · v0.16</span>
        </button>
        <button class="msha-ready-card" type="button" data-msha-ready-target="mineActSection">
          <strong>Mine Act</strong>
          <span>Statutory authority behind inspections, citations/orders, contests, imminent danger, and penalties.</span>
          <span class="msha-ready-status">Key provisions · v0.16</span>
        </button>
        <button class="msha-ready-card enforcement-ready-card" type="button" data-msha-ready-target="mshaEnforcementSection">
          <strong>Enforcement &amp; Inspector Resources</strong>
          <span>Open the existing MSHA inspection, citation/order, and enforcement-reference section.</span>
          <span class="msha-ready-status">Existing SkyFire resource</span>
        </button>
      </div>

      <div class="info-panel">
        <h3>How SkyFire labels authority</h3>
        <p>MSHA Ready will always show what kind of source you are reading so practical advice is not mistaken for a legal requirement.</p>
        <div class="msha-source-grid">
          <div class="msha-source-card source-law"><strong>LAW / REGULATION</strong><p>Mine Act / U.S. Code and 30 CFR controlling authority.</p></div>
          <div class="msha-source-card source-msha"><strong>MSHA PROCEDURE / GUIDANCE</strong><p>MSHA handbooks, Program Policy Manual, agency guidance, and procedures.</p></div>
          <div class="msha-source-card source-professional"><strong>PROFESSIONAL REFERENCE</strong><p>Clearly attributed outside mine-law or safety analysis used as secondary perspective.</p></div>
          <div class="msha-source-card source-skyfire"><strong>SKYFIRE GUIDANCE</strong><p>SkyFire's independently written practical synthesis and field recommendations.</p></div>
        </div>
      </div>

      <div class="info-panel">
        <h3>MSHA Ready boundary</h3>
        <p>This area provides preparation, reference, education, and bounded decision support. It does not replace current controlling authority, qualified legal advice, site-specific procedures, or an organization's formal system of record.</p>
      </div>
    `;
  }

  function addPreviewItem() {
    const home = document.getElementById("homeSection");
    if (!home) return;
    const tile = home.querySelector(".skyfire-hub-home-tile.regulatory-hub");
    const grid = tile?.querySelector(".home-hub-preview-grid");
    if (!grid) return;
    const exists = Array.from(grid.querySelectorAll(".home-hub-preview-item")).some(item => item.textContent.trim() === "MSHA Ready");
    if (exists) return;
    const item = document.createElement("span");
    item.className = "home-hub-preview-item";
    item.textContent = "MSHA Ready";
    grid.prepend(item);
  }

  function makeSection(id, html, home) {
    let section = document.getElementById(id);
    if (section) return section;
    section = document.createElement("section");
    section.id = id;
    section.className = "app-section hidden skyfire-resource-section";
    section.innerHTML = html;
    home.parentNode.insertBefore(section, home.nextSibling);
    return section;
  }

  function openEnforcement(readySection) {
    let attempts = 0;
    function tryOpen() {
      const section = document.getElementById("mshaEnforcementSection");
      if (section) {
        show(section);
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(tryOpen, 100);
      else show(readySection);
    }
    tryOpen();
  }

  function initialize() {
    const home = document.getElementById("homeSection");
    const hub = document.getElementById("regulatoryResourcesHubSection");
    const list = hub?.querySelector(".skyfire-hub-list");
    if (!home || !hub || !list) return false;

    ensureStylesheet();

    let button = list.querySelector(".msha-ready-hub-item");
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "skyfire-hub-item msha-ready-hub-item";
      button.innerHTML = `<strong>MSHA Ready</strong><span>Inspection readiness, Mine Act authority, Part 50 incident response, and enforcement context.</span>`;
      const insertBefore = list.children[1] || null;
      list.insertBefore(button, insertBefore);
    }

    const ready = makeSection("mshaReadySection", readyMarkup(), home);
    const inspection = makeSection(
      "inspectionReadySection",
      placeholderMarkup(
        "Inspection Ready",
        "Prepare for and navigate a routine MSHA inspection.",
        "source-msha",
        "MSHA PROCEDURE / GUIDANCE"
      ),
      home
    );
    const incident = makeSection(
      "incidentReadySection",
      placeholderMarkup(
        "Incident Ready — Part 50",
        "Make the right immediate reporting and investigation decisions under pressure.",
        "source-law",
        "LAW / REGULATION"
      ),
      home
    );
    const mineAct = makeSection(
      "mineActSection",
      placeholderMarkup(
        "Federal Mine Safety and Health Act",
        "Read the statutory authority behind MSHA inspections and enforcement.",
        "source-law",
        "LAW"
      ),
      home
    );

    button.addEventListener("click", () => show(ready));

    ready.querySelectorAll("[data-msha-ready-target]").forEach(card => {
      card.addEventListener("click", () => {
        const targetId = card.dataset.mshaReadyTarget;
        if (targetId === "mshaEnforcementSection") {
          openEnforcement(ready);
          return;
        }
        show(document.getElementById(targetId));
      });
    });

    ready.querySelector(".msha-ready-home")?.addEventListener("click", () => show(home));
    [inspection, incident, mineAct].forEach(section => {
      section.querySelector(".msha-ready-back")?.addEventListener("click", () => show(ready));
    });

    addPreviewItem();
    window.setTimeout(addPreviewItem, 250);

    window.SkyFireMSHAReady = {
      show,
      open: () => show(ready),
      sourceReviewed: SOURCE_REVIEWED
    };

    return true;
  }

  function start() {
    if (initialize()) return;
    tries += 1;
    if (tries < 100) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
