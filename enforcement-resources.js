(function () {
  const SOURCE_CHECKED = "Source checked August 2026";
  const HANDBOOK_URL = "https://www.msha.gov/sites/default/files/Directive%20%26%20Guidance/PH25-I-1-Citation_and_Order_Writing_Handbook-1_18_2025.pdf";
  const GENERAL_INSPECTION_URL = "https://arlweb.msha.gov/READROOM/HANDBOOK/PH19-IV.pdf";
  const MDRS_URL = "https://www.msha.gov/mdrs";

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
      .enforcement-nav-actions{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:20px}
      .enforcement-nav-actions .module-home-btn{margin-bottom:0}
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
      @media(min-width:900px){.enforcement-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:600px){.enforcement-resource>summary{padding:16px 14px}.enforcement-body{padding:0 14px 18px}.enforcement-body p,.enforcement-body li{font-size:1.04rem}}
    `;
    document.head.appendChild(style);
  }

  function sectionMarkup() {
    return `
      <div class="module-header">
        <div class="enforcement-nav-actions">
          <button class="module-home-btn enforcement-back" type="button">← Back</button>
          <button class="module-home-btn enforcement-home" type="button">⌂ Home</button>
        </div>
        <div class="module-header-text">
          <h2>MSHA Enforcement &amp; Inspector Resources</h2>
          <p>Public MSHA materials for understanding inspection procedures, citations, orders, and enforcement records.</p>
        </div>
      </div>

      <div class="info-panel enforcement-notice">
        <h3>Enforcement Resource Notice</h3>
        <p><strong>These are MSHA enforcement and inspector resources, not operator filing forms or controlling regulations.</strong> They are provided so mine personnel can better understand the procedures, documents, and public information MSHA uses or produces during inspection and enforcement activity.</p>
        <p>The Mine Act and applicable 30 CFR requirements remain the controlling authorities. SkyFire links to authoritative MSHA materials here for practical reference.</p>
      </div>

      <div class="enforcement-grid">
        <details class="info-panel enforcement-resource">
          <summary>
            <strong>General Inspection Procedures</strong>
            <span>MSHA Handbook PH19-IV/V-1 · Coal + Metal/Nonmetal · December 2019</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA handbook</span>
              <span class="enforcement-chip">Audience · MSHA inspection personnel</span>
              <span class="enforcement-chip">Coal + Metal/Nonmetal</span>
              <span class="enforcement-chip">PH19-IV/V-1</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>MSHA's <strong>General Inspection Procedures Handbook</strong> sets out procedures for MSHA personnel conducting inspections of underground and surface mines and mine facilities. It is the combined general-inspection handbook for Coal and Metal/Nonmetal inspection activity.</p>
            <p><strong>Why this is useful:</strong> mine operators and Safety Managers can use the handbook to better understand the general inspection process and the areas, records, conditions, work practices, and enforcement-related activities MSHA personnel may address during an inspection.</p>
            <p>This handbook is agency procedure and guidance for MSHA personnel. It does not replace the Mine Act, applicable 30 CFR requirements, Commission decisions, or other controlling authority.</p>
            <div class="enforcement-caution"><strong>SkyFire authority note:</strong> use this resource to understand MSHA inspection procedure—not as a substitute for determining the requirement that applies to a mine or condition.</div>
            <div class="enforcement-links">
              <a href="${GENERAL_INSPECTION_URL}" target="_blank" rel="noopener">Open official MSHA General Inspection Procedures Handbook</a>
            </div>
          </div>
        </details>

        <details class="info-panel enforcement-resource">
          <summary>
            <strong>Citation &amp; Order Forms / Writing Handbook</strong>
            <span>Forms 7000-3 &amp; 7000-3a · Handbook PH25-I-1 · January 2025</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA handbook + enforcement forms</span>
              <span class="enforcement-chip">Audience · Enforcement personnel</span>
              <span class="enforcement-chip">Not an operator filing form</span>
              <span class="enforcement-chip">PH25-I-1</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>MSHA's current <strong>Citation and Order Writing Handbook</strong> identifies Form 7000-3 as the <strong>Mine Citation/Order</strong> and Form 7000-3a as the <strong>Mine Citation/Order Continuation</strong>. The handbook explains how enforcement personnel document citations, orders, gravity and negligence evaluations, modifications, extensions, terminations, and related enforcement actions.</p>
            <p>For mine personnel, this resource helps explain the structure and terminology of enforcement documents that may be served to an operator and how MSHA instructs its enforcement personnel to support those actions. The forms are issued by MSHA; they are not forms a mine operator completes and submits as an operator filing.</p>
            <p>The handbook is guidance for MSHA enforcement personnel. It does not replace the Mine Act, 30 CFR, Commission decisions, or other controlling authority.</p>
            <div class="enforcement-caution"><strong>SkyFire source rule:</strong> no blank 7000-3 is displayed here unless a current public MSHA template can be verified.</div>
            <div class="enforcement-links">
              <a href="${HANDBOOK_URL}" target="_blank" rel="noopener">Open official MSHA Citation and Order Writing Handbook</a>
            </div>
          </div>
        </details>

        <details class="info-panel enforcement-resource">
          <summary>
            <strong>Search MSHA Violations by Mine</strong>
            <span>Browser-based Mine Data Retrieval System (MDRS)</span>
          </summary>
          <div class="enforcement-body">
            <div class="enforcement-meta">
              <span class="enforcement-chip">Source type · MSHA public reporting tool</span>
              <span class="enforcement-chip">Mine-level reports</span>
              <span class="enforcement-chip">Violations + inspections + related mine data</span>
              <span class="enforcement-chip">${SOURCE_CHECKED}</span>
            </div>
            <p>MSHA's <strong>Mine Data Retrieval System (MDRS)</strong> generates public reports on individual mines, including violations, inspections, accidents, ownership, VPID, POV, and health-sample history. This browser-based system is the better field-facing path for reviewing mine enforcement history.</p>
            <p>MSHA separately publishes bulk flat-file datasets for analysts and database users. Those raw files can download as ZIP archives and are not the primary SkyFire link because they are cumbersome on phones and require additional software or data-processing steps.</p>
            <div class="enforcement-caution"><strong>Online resource:</strong> MDRS requires an internet connection and is maintained by MSHA. Availability and interface behavior are controlled by the agency.</div>
            <div class="enforcement-links">
              <a href="${MDRS_URL}" target="_blank" rel="noopener">Open MSHA Mine Data Retrieval System</a>
            </div>
          </div>
        </details>
      </div>
    `;
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

  function addPreviewItem() {
    const home = document.getElementById("homeSection");
    if (!home) return;
    const tile = home.querySelector(".skyfire-hub-home-tile.regulatory-hub");
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
    button.innerHTML = `<strong>MSHA Enforcement &amp; Inspector Resources</strong><span>Public inspection, citation/order, and mine-level enforcement resources.</span>`;
    list.appendChild(button);

    const section = document.createElement("section");
    section.id = "mshaEnforcementSection";
    section.className = "app-section hidden skyfire-resource-section";
    section.innerHTML = sectionMarkup();
    home.parentNode.insertBefore(section, home.nextSibling);

    button.addEventListener("click", () => show(section));
    section.querySelector(".enforcement-back").addEventListener("click", () => show(hub));
    section.querySelector(".enforcement-home").addEventListener("click", () => show(home));

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
