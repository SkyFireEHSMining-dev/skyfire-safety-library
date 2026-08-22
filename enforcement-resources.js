(function () {
  const SOURCE_CHECKED = "Source checked August 2026";
  const HANDBOOK_URL = "https://www.msha.gov/sites/default/files/Directive%20%26%20Guidance/Handbooks/PH25-I-1-Citation-and-Order-Writing-Handbook-1_18_25.pdf";
  const VIOLATIONS_URL = "https://arlweb.msha.gov/OpenGovernmentData/OGIMSHA.asp";

  let tries = 0;

  function addStyles() {
    const old = document.getElementById("skyfireEnforcementStyles");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "skyfireEnforcementStyles";
    style.textContent = `
      :root{--sf-enforcement:#465f78;--sf-enforcement-soft:#f1f5f8}
      #regulatoryResourcesHubSection .skyfire-hub-item.enforcement-hub-item{
        border-left:5px solid var(--sf-enforcement)!important;
        background:linear-gradient(90deg,var(--sf-enforcement-soft),#fff 24%)!important;
      }
      #regulatoryResourcesHubSection .skyfire-hub-item.enforcement-hub-item strong{color:var(--sf-enforcement)!important}
      #mshaEnforcementSection .module-header{border-top-color:var(--sf-enforcement)}
      #mshaEnforcementSection .enforcement-notice{border-left:5px solid var(--sf-enforcement)}
      .enforcement-grid{display:grid;gap:16px}
      .enforcement-resource{padding:0;overflow:hidden;border-left:5px solid var(--sf-enforcement)}
      .enforcement-resource>summary{cursor:pointer;list-style:none;padding:19px 20px;background:linear-gradient(90deg,var(--sf-enforcement-soft),#fff 30%)}
      .enforcement-resource>summary::-webkit-details-marker{display:none}
      .enforcement-resource>summary strong{display:block;color:var(--sf-enforcement);font-size:1.18rem;line-height:1.3}
      .enforcement-resource>summary span{display:block;color:var(--muted);margin-top:6px;line-height:1.4}
      .enforcement-body{padding:0 20px 20px}
      .enforcement-meta{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}
      .enforcement-chip{display:inline-block;padding:5px 9px;border-radius:999px;background:#e8eef3;color:#40566b;font-weight:750;font-size:.78rem}
      .enforcement-body p,.enforcement-body li{line-height:1.58}
      .enforcement-links{display:grid;gap:9px;margin-top:14px}
      .enforcement-links a{color:var(--sf-enforcement);font-weight:750;overflow-wrap:anywhere}
      .enforcement-caution{margin-top:15px;padding:12px 14px;border-left:4px solid #7b8794;background:#f7f8fa;line-height:1.5}
      @media(min-width:900px){.enforcement-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.enforcement-resource:last-child:nth-child(odd){grid-column:1/-1}}
      @media(max-width:600px){.enforcement-resource>summary{padding:16px 14px}.enforcement-body{padding:0 14px 18px}.enforcement-body p,.enforcement-body li{font-size:1.04rem}}
    `;
    document.head.appendChild(style);
  }

  function sectionMarkup() {
    return `
      <div class="module-header">
        <button class="module-home-btn enforcement-back" type="button">Back to Regulatory Resources</button>
        <div class="module-header-text">
          <h2>MSHA Enforcement &amp; Inspector Resources</h2>
          <p>Public MSHA materials for understanding how citations, orders, and enforcement records are documented.</p>
        </div>
      </div>

      <div class="info-panel enforcement-notice">
        <h3>Enforcement Resource Notice</h3>
        <p><strong>These are MSHA enforcement and inspector resources, not operator filing forms.</strong> They are provided so mine personnel can better understand the documents and public information MSHA uses or produces during enforcement activity.</p>
        <p>SkyFire does not currently host a blank Form 7000-3 because a current public blank template has not been verified from MSHA. Where MSHA publishes official guidance or public data instead, SkyFire links to that authoritative source.</p>
      </div>

      <div class="enforcement-grid">
        <details class="info-panel enforcement-resource">
          <summary>
            <strong>MSHA Forms 7000-3 &amp; 7000-3a</strong>
            <span>Mine Citation/Order and Mine Citation/Order Continuation</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA enforcement forms</span>
              <span class="enforcement-chip">Intended user · MSHA Authorized Representative</span>
              <span class="enforcement-chip">Not an operator filing form</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>MSHA's current Citation and Order Writing Handbook identifies Form 7000-3 as the <strong>Mine Citation/Order</strong> and Form 7000-3a as the <strong>Mine Citation/Order Continuation</strong>. The handbook explains how enforcement personnel complete these forms through MSHA's Inspection Application System and how subsequent actions are documented.</p>
            <p>For mine personnel, the value is understanding the structure and terminology of the enforcement document that may be served to the operator. The form is issued by MSHA; it is not something a mine operator completes and submits as an operator filing.</p>
            <div class="enforcement-caution"><strong>SkyFire source rule:</strong> no blank 7000-3 is displayed here unless a current public MSHA template can be verified.</div>
            <div class="enforcement-links">
              <a href="${HANDBOOK_URL}" target="_blank" rel="noopener">Official MSHA Citation and Order Writing Handbook</a>
            </div>
          </div>
        </details>

        <details class="info-panel enforcement-resource">
          <summary>
            <strong>Citation and Order Writing Handbook</strong>
            <span>Handbook PH25-I-1 · January 2025</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA handbook</span>
              <span class="enforcement-chip">Audience · Enforcement personnel</span>
              <span class="enforcement-chip">PH25-I-1</span>
              <span class="enforcement-chip">January 2025</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>This is MSHA's current public handbook for citation and order writing. It provides enforcement personnel with instructions for documenting citations, orders of withdrawal, gravity and negligence evaluations, health violations, modifications, extensions, terminations, and other enforcement actions.</p>
            <p>Reading the handbook can help mine operators and safety personnel understand how MSHA instructs its enforcement personnel to document and support enforcement actions. It does not replace the Mine Act, 30 CFR, Commission decisions, or other controlling authority.</p>
            <div class="enforcement-links">
              <a href="${HANDBOOK_URL}" target="_blank" rel="noopener">Open official MSHA handbook PDF</a>
            </div>
          </div>
        </details>

        <details class="info-panel enforcement-resource">
          <summary>
            <strong>MSHA Public Violations Data</strong>
            <span>Public citation/order data captured from Form 7000-3</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA public data</span>
              <span class="enforcement-chip">Form 7000-3-derived</span>
              <span class="enforcement-chip">Violations since 2000</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>MSHA's Open Government data portal states that its Violations Data Set contains violations issued as a result of MSHA inspections beginning January 1, 2000. The dataset includes citation/order/safeguard details such as the Mine Act section, relevant dates, and the condition or practice associated with the enforcement action.</p>
            <p>MSHA states that the violations data is captured from <strong>Form 7000-3</strong>. This gives mine personnel a public way to study real enforcement records without SkyFire reproducing or inventing a blank citation form.</p>
            <div class="enforcement-links">
              <a href="${VIOLATIONS_URL}" target="_blank" rel="noopener">Open MSHA Open Government Data portal</a>
            </div>
          </div>
        </details>
      </div>
    `;
  }

  function addPreviewItem() {
    const home = document.getElementById("homeSection");
    if (!home) return;
    const tile = Array.from(home.querySelectorAll(".skyfire-hub-home-tile.regulatory-hub"))[0];
    const grid = tile?.querySelector(".home-hub-preview-grid");
    if (!grid) return;
    const exists = Array.from(grid.querySelectorAll(".home-hub-preview-item")).some(item => item.textContent.trim() === "MSHA Enforcement & Inspector Resources");
    if (exists) return;
    const item = document.createElement("span");
    item.className = "home-hub-preview-item";
    item.textContent = "MSHA Enforcement & Inspector Resources";
    grid.appendChild(item);
  }

  function initialize() {
    const home = document.getElementById("homeSection");
    const hub = document.getElementById("regulatoryResourcesHubSection");
    const list = hub?.querySelector(".skyfire-hub-list");
    if (!home || !hub || !list) return false;

    if (document.getElementById("mshaEnforcementSection")) {
      addPreviewItem();
      return true;
    }

    addStyles();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "skyfire-hub-item enforcement-hub-item";
    button.innerHTML = `<strong>MSHA Enforcement &amp; Inspector Resources</strong><span>Public citation/order forms, inspector guidance, and enforcement data.</span>`;
    list.appendChild(button);

    const section = document.createElement("section");
    section.id = "mshaEnforcementSection";
    section.className = "app-section hidden skyfire-resource-section";
    section.innerHTML = sectionMarkup();
    home.parentNode.insertBefore(section, home.nextSibling);

    button.addEventListener("click", () => {
      if (typeof window.openDynamicSection === "function") window.openDynamicSection(section);
      else {
        document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
        section.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    section.querySelector(".enforcement-back").addEventListener("click", () => {
      if (typeof window.openDynamicSection === "function") window.openDynamicSection(hub);
      else {
        document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
        hub.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });

    addPreviewItem();
    window.setTimeout(addPreviewItem, 250);
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
