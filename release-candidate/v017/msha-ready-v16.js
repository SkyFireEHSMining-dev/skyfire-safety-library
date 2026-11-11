(function () {
  const SOURCE_REVIEWED = "Source checked September 2026";
  let tries = 0;

  function ensureStylesheet() {
    if (document.querySelector('link[data-msha-ready-v16="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./msha-ready-v16.css?v=v0.16-msha-ready-3";
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
        <div class="msha-ready-note"><strong>Authority rule:</strong> SkyFire will keep controlling law/regulation, official MSHA resources/guidance, professional commentary, and SkyFire practical guidance visibly separate.</div>
      </div>
    `;
  }

  function authorityKeyMarkup() {
    return `
      <div class="regulatory-authority-key" aria-label="SkyFire regulatory and workflow color key">
        <div class="regulatory-authority-key-heading">
          <strong>SkyFire color guide</strong>
          <span>Source colors tell you where information comes from. Workflow/status colors tell you how the app is helping you use it.</span>
        </div>

        <div class="regulatory-key-section">
          <div class="regulatory-key-section-title">Source / authority colors</div>
          <div class="regulatory-authority-key-grid">
            <span class="authority-key-chip authority-law"><b>Blue</b> · Law / Regulation</span>
            <span class="authority-key-chip authority-msha"><b>Purple</b> · Official MSHA Resource / Guidance</span>
            <span class="authority-key-chip authority-skyfire"><b>Orange</b> · SkyFire Guidance</span>
            <span class="authority-key-chip authority-professional"><b>Gray</b> · Professional Reference</span>
          </div>
        </div>

        <div class="regulatory-key-section workflow-key-section">
          <div class="regulatory-key-section-title">Workflow / status colors</div>
          <div class="regulatory-authority-key-grid workflow-status-key-grid">
            <span class="authority-key-chip authority-workflow"><b>Teal</b> · SkyFire Guided Workflow</span>
            <span class="authority-key-chip authority-urgent"><b>Red</b> · Urgent / Emergency Action</span>
            <span class="authority-key-chip authority-caution"><b>Amber</b> · Caution / Attention</span>
          </div>
        </div>
      </div>
    `;
  }

  function readyMarkup() {
    return `
      <div class="module-header">
        <button class="module-home-btn msha-ready-home" type="button">Back Home</button>
        <div class="module-header-text">
          <h2>MSHA Ready</h2>
          <p>Use source-backed workflows to prepare for MSHA and make the right decisions under pressure.</p>
        </div>
      </div>

      <div class="info-panel msha-ready-intro">
        <div class="msha-ready-kicker">Prepare · Understand · Respond</div>
        <h3>MSHA readiness without the guesswork</h3>
        <p><strong>Regulatory Resources tells you what the source is. MSHA Ready helps you use those sources in a real situation.</strong></p>
        <p>Use the short path when you already know the process. Expand source-backed detail when you are studying or need to verify why a step matters.</p>
        <div class="msha-review-meta">
          <span class="msha-reviewed-date">${SOURCE_REVIEWED}</span>
        </div>
      </div>

      <div class="msha-ready-grid" aria-label="MSHA Ready workflows">
        <button class="msha-ready-card" type="button" data-msha-ready-target="inspectionReadySection">
          <strong>Inspection Ready</strong>
          <span>Routine MSHA inspection preparation, lifecycle guidance, and readiness checks.</span>
          <span class="msha-ready-status">Stage 1 · v0.16</span>
        </button>
        <button class="msha-ready-card incident-ready-card" type="button" data-msha-ready-target="incidentReadySection">
          <strong>Incident Ready</strong>
          <span>Part 50 incident decision support for reporting, scene preservation, investigation, and Form 7000-1.</span>
          <span class="msha-ready-status">Part 50 · v0.16</span>
        </button>
      </div>

      <div class="info-panel msha-ready-reference-panel">
        <h3>Reference shortcuts</h3>
        <p>Open the controlling or official source without turning the reference library into another workflow.</p>
        <div class="msha-reference-shortcuts">
          <button type="button" class="msha-reference-btn reference-law" data-msha-reference-target="mineActSection"><strong>Mine Act</strong><span>Controlling statutory authority</span></button>
          <button type="button" class="msha-reference-btn reference-law" data-msha-reference-target="cfrSection"><strong>MSHA / 30 CFR</strong><span>Controlling regulations</span></button>
          <button type="button" class="msha-reference-btn reference-msha" data-msha-reference-target="mshaEnforcementSection"><strong>Enforcement &amp; Inspector Resources</strong><span>Official MSHA handbooks and enforcement resources</span></button>
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

  function findHubItem(list, title) {
    return Array.from(list.querySelectorAll(".skyfire-hub-item")).find(item => {
      const strong = item.querySelector("strong");
      return strong && strong.textContent.trim() === title;
    }) || null;
  }

  function applyRegulatoryMeaning(list) {
    const classByTitle = {
      "MSHA / 30 CFR": "law-regulation-hub-item",
      "OSHA / 29 CFR": "law-regulation-hub-item",
      "Mine Act": "law-regulation-hub-item",
      "MSHA Forms Library": "msha-official-hub-item",
      "MSHA PPM & Agency Guidance": "msha-official-hub-item",
      "MSHA Enforcement & Inspector Resources": "msha-official-hub-item",
      "SkyFire Technical Guidance": "skyfire-guidance-hub-item",
      "MSHA Ready": "msha-ready-hub-item"
    };

    list.querySelectorAll(".skyfire-hub-item").forEach(item => {
      const title = item.querySelector("strong")?.textContent.trim();
      const semanticClass = title ? classByTitle[title] : null;
      if (semanticClass) item.classList.add(semanticClass);
    });
  }

  function ensureAuthorityKey(hub, list) {
    if (hub.querySelector(".regulatory-authority-key")) return;
    const panel = list.closest(".info-panel");
    if (!panel) return;
    const key = document.createElement("div");
    key.innerHTML = authorityKeyMarkup().trim();
    panel.insertBefore(key.firstElementChild, list);
  }

  function ensureRegulatoryOrder(list) {
    const desired = [
      "MSHA Ready",
      "MSHA / 30 CFR",
      "Mine Act",
      "OSHA / 29 CFR",
      "MSHA Forms Library",
      "MSHA PPM & Agency Guidance",
      "SkyFire Technical Guidance",
      "MSHA Enforcement & Inspector Resources"
    ];
    desired.forEach(title => {
      const item = findHubItem(list, title);
      if (item) list.appendChild(item);
    });
  }

  function openEnforcement(fallbackSection) {
    let attempts = 0;
    function tryOpen() {
      const section = document.getElementById("mshaEnforcementSection");
      if (section) {
        show(section);
        return;
      }
      attempts += 1;
      if (attempts < 20) window.setTimeout(tryOpen, 100);
      else show(fallbackSection);
    }
    tryOpen();
  }

  function initialize() {
    const home = document.getElementById("homeSection");
    const hub = document.getElementById("regulatoryResourcesHubSection");
    const list = hub?.querySelector(".skyfire-hub-list");
    if (!home || !hub || !list) return false;

    ensureStylesheet();
    ensureAuthorityKey(hub, list);

    let readyButton = list.querySelector(".msha-ready-hub-item") || findHubItem(list, "MSHA Ready");
    if (!readyButton) {
      readyButton = document.createElement("button");
      readyButton.type = "button";
      readyButton.className = "skyfire-hub-item msha-ready-hub-item";
      readyButton.innerHTML = `<strong>MSHA Ready</strong><span>Inspection readiness and Part 50 incident-response workflows backed by clearly identified sources.</span>`;
      list.appendChild(readyButton);
    } else {
      readyButton.classList.add("msha-ready-hub-item");
      const subtitle = readyButton.querySelector("span");
      if (subtitle) subtitle.textContent = "Inspection readiness and Part 50 incident-response workflows backed by clearly identified sources.";
    }

    const ready = makeSection("mshaReadySection", readyMarkup(), home);
    const inspection = makeSection(
      "inspectionReadySection",
      placeholderMarkup(
        "Inspection Ready",
        "Prepare for and navigate a routine MSHA inspection.",
        "source-msha",
        "MSHA OFFICIAL RESOURCE / GUIDANCE"
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

    let mineActButton = findHubItem(list, "Mine Act");
    if (!mineActButton) {
      mineActButton = document.createElement("button");
      mineActButton.type = "button";
      mineActButton.className = "skyfire-hub-item mine-act-hub-item law-regulation-hub-item";
      mineActButton.innerHTML = `<strong>Mine Act</strong><span>Federal statutory authority behind MSHA inspections, citations/orders, contests, imminent danger, and penalties.</span>`;
      list.appendChild(mineActButton);
    }

    readyButton.addEventListener("click", () => show(ready));
    mineActButton.addEventListener("click", () => show(mineAct));

    ready.querySelectorAll("[data-msha-ready-target]").forEach(card => {
      card.addEventListener("click", () => show(document.getElementById(card.dataset.mshaReadyTarget)));
    });

    ready.querySelectorAll("[data-msha-reference-target]").forEach(button => {
      button.addEventListener("click", () => {
        const targetId = button.dataset.mshaReferenceTarget;
        if (targetId === "mshaEnforcementSection") {
          openEnforcement(ready);
          return;
        }
        show(document.getElementById(targetId));
      });
    });

    ready.querySelector(".msha-ready-home")?.addEventListener("click", () => show(home));
    [inspection, incident].forEach(section => {
      section.querySelector(".msha-ready-back")?.addEventListener("click", () => show(ready));
    });
    mineAct.querySelector(".msha-ready-back")?.addEventListener("click", () => show(hub));

    function normalizeRegulatoryHub() {
      applyRegulatoryMeaning(list);
      ensureRegulatoryOrder(list);
    }

    normalizeRegulatoryHub();
    window.setTimeout(normalizeRegulatoryHub, 150);
    window.setTimeout(normalizeRegulatoryHub, 500);
    window.setTimeout(normalizeRegulatoryHub, 1200);

    addPreviewItem();
    window.setTimeout(addPreviewItem, 250);

    window.SkyFireMSHAReady = {
      show,
      open: () => show(ready),
      sourceReviewed: SOURCE_REVIEWED,
      normalizeRegulatoryHub
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
