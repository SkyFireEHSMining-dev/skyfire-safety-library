(function () {
  const CHECKED_LABEL = "Source checked August 2026";
  const PPM_HOME = "https://www.msha.gov/compliance-and-enforcement/compliance-assistance/program-policy-manual";

  function openSection(section) {
    if (!section) return;
    if (typeof window.openDynamicSection === "function") {
      window.openDynamicSection(section);
      return;
    }
    document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
    section.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addStyles() {
    const old = document.getElementById("ppmGuidanceStyles");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "ppmGuidanceStyles";
    style.textContent = `
      .ppm-notice{border-left:5px solid var(--sf-guidance,#6554c0)}
      .ppm-library-list{display:grid;gap:16px;margin-top:18px}
      .ppm-folder{width:100%;text-align:left;background:linear-gradient(90deg,var(--sf-guidance-soft,#f4f1ff),#fff 24%);border:1px solid var(--line);border-left:5px solid var(--sf-guidance,#6554c0);border-radius:20px;padding:22px;box-shadow:var(--shadow);cursor:pointer}
      .ppm-folder-code{display:block;color:var(--sf-guidance,#6554c0);font-weight:800;font-size:.9rem;letter-spacing:.03em;margin-bottom:7px}
      .ppm-folder strong{display:block;color:var(--text);font-size:1.25rem;line-height:1.2}
      .ppm-folder span:not(.ppm-folder-code):not(.resource-status){display:block;color:var(--muted);margin-top:9px;line-height:1.45}
      .ppm-entry{padding:0;overflow:hidden;border-left:5px solid var(--sf-guidance,#6554c0)}
      .ppm-entry>summary{cursor:pointer;list-style:none;padding:20px 22px;background:linear-gradient(90deg,var(--sf-guidance-soft,#f4f1ff),#fff 32%)}
      .ppm-entry>summary::-webkit-details-marker{display:none}
      .ppm-entry>summary strong{display:block;color:var(--sf-guidance,#6554c0);font-size:1.22rem;line-height:1.25}
      .ppm-entry>summary span{display:block;color:var(--muted);margin-top:6px;line-height:1.4}
      .ppm-entry-body{padding:0 22px 22px}
      .ppm-entry-body h4{margin-top:22px;margin-bottom:8px}
      .ppm-entry-body p,.ppm-entry-body li{line-height:1.55}
      .ppm-meta{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 18px}
      .ppm-chip{display:inline-block;padding:5px 9px;border-radius:999px;background:#eeeafd;color:#584b91;font-weight:700;font-size:.78rem}
      .ppm-source-box{margin-top:18px;padding:14px 16px;border-left:4px solid var(--sf-guidance,#6554c0);background:var(--sf-guidance-soft,#f4f1ff)}
      .ppm-source-links{display:grid;gap:9px;margin-top:12px}
      .ppm-source-links a{overflow-wrap:anywhere;color:var(--sf-guidance,#6554c0)}
      .ppm-official-text p{margin:0 0 18px;line-height:1.62}
      .ppm-resource-section .resource-status,#mshaGuidanceSection .resource-status{background:#eeeafd;color:#584b91}
      @media(min-width:760px){.ppm-library-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  function buildSection(id, backLabel, title, subtitle, body) {
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const section = document.createElement("section");
    section.id = id;
    section.className = "app-section hidden skyfire-resource-section ppm-resource-section";
    section.innerHTML = `
      <div class="module-header">
        <button class="module-home-btn ppm-back" type="button">${backLabel}</button>
        <div class="module-header-text"><h2>${title}</h2><p>${subtitle}</p></div>
      </div>
      ${body}
    `;
    const home = document.getElementById("homeSection");
    if (home && home.parentNode) home.parentNode.insertBefore(section, home.nextSibling);
    return section;
  }

  function initializePPMGuidance() {
    const guidance = document.getElementById("mshaGuidanceSection");
    if (!guidance) {
      window.setTimeout(initializePPMGuidance, 75);
      return;
    }
    if (guidance.dataset.ppmInitialized === "true") return;
    guidance.dataset.ppmInitialized = "true";

    addStyles();

    Array.from(guidance.children).slice(1).forEach(child => child.remove());
    guidance.insertAdjacentHTML("beforeend", `
      <div class="info-panel ppm-notice">
        <h3>MSHA Guidance Notice</h3>
        <p>The Program Policy Manual is an MSHA guidance source and is presented separately from regulatory text in 30 CFR.</p>
        <p><strong>SkyFire reproduces source-checked PPM entries using MSHA's published wording rather than paraphrasing or interpreting the agency's policy.</strong></p>
      </div>
      <div class="info-panel">
        <h3>MSHA Guidance Library</h3>
        <p>Only source-checked guidance is shown here.</p>
        <div class="ppm-library-list">
          <button type="button" class="ppm-folder" data-open-ppm="ppmLibrarySection">
            <span class="ppm-folder-code">PROGRAM POLICY MANUAL</span>
            <strong>MSHA Program Policy Manual</strong>
            <span class="resource-status">Volume IV started · ${CHECKED_LABEL}</span>
            <span>Browse source-checked PPM material by volume and the same regulatory organization used by MSHA.</span>
          </button>
        </div>
      </div>
    `);

    const ppmLibrary = buildSection(
      "ppmLibrarySection",
      "Back to MSHA Guidance",
      "MSHA Program Policy Manual",
      "Source-checked PPM material organized by MSHA volume.",
      `<div class="info-panel"><h3>Program Policy Manual</h3><p>SkyFire is building this library one source-checked entry at a time. Volumes appear here when they contain verified material.</p><div class="ppm-library-list"><button type="button" class="ppm-folder" data-open-volume="ppmVolume4Section"><span class="ppm-folder-code">VOLUME IV</span><strong>Metal and Nonmetal Mines</strong><span class="resource-status">1 source-checked entry · ${CHECKED_LABEL}</span><span>Current SkyFire coverage begins with Subpart M — Machinery and Equipment.</span></button></div><div class="ppm-source-box"><strong>Official MSHA source:</strong><div class="ppm-source-links"><a href="${PPM_HOME}" target="_blank" rel="noopener">MSHA Program Policy Manual</a></div></div></div>`
    );

    const volume4 = buildSection(
      "ppmVolume4Section",
      "Back to PPM Volumes",
      "PPM Volume IV",
      "Metal and Nonmetal Mines",
      `<div class="info-panel"><h3>Volume IV · Metal and Nonmetal Mines</h3><div class="ppm-meta"><span class="ppm-chip">Program Policy Manual</span><span class="ppm-chip">Metal / Nonmetal</span><span class="ppm-chip">${CHECKED_LABEL}</span></div><p>SkyFire follows MSHA's regulatory organization so additional Volume IV entries can be added without changing the library structure.</p></div>
       <div class="info-panel"><h3>Volume IV Sections</h3><p>Select a subpart to see the source-checked PPM entries available inside it.</p><div class="ppm-library-list"><button type="button" class="ppm-folder" data-open-subpart="ppmSubpartMSection"><span class="ppm-folder-code">SUBPART M</span><strong>Machinery and Equipment</strong><span class="resource-status">1 source-checked entry · ${CHECKED_LABEL}</span><span>Safety defects, equipment condition, and related machinery guidance.</span></button></div></div>`
    );

    const subpartM = buildSection(
      "ppmSubpartMSection",
      "Back to Volume IV",
      "Subpart M",
      "Machinery and Equipment",
      `<div class="info-panel"><h3>Subpart M · Machinery and Equipment</h3><div class="ppm-meta"><span class="ppm-chip">Volume IV</span><span class="ppm-chip">Subpart M</span><span class="ppm-chip">1 source-checked entry</span></div><p>Select a source-checked PPM entry below.</p></div>
       <details class="info-panel ppm-entry"><summary><strong>56/57.14100 · Safety Defects: Examination, Correction, and Records</strong><span>Official MSHA Program Policy Manual text</span></summary><div class="ppm-entry-body">
         <div class="ppm-meta"><span class="ppm-chip">Source type · PPM</span><span class="ppm-chip">Volume IV</span><span class="ppm-chip">Subpart M</span><span class="ppm-chip">${CHECKED_LABEL}</span></div>
         <h4>Official MSHA PPM text</h4>
         <div class="ppm-official-text">
           <p>This standard applies to all off-road and on-road self-propelled equipment used on mine property, including vehicles such as vans, suburbans, and pick-up trucks that are used at mine sites and remain on mine property. In most instances, it does not apply to vehicles used to transport persons between locations off mine property to mine property; however, if such vehicles transport personnel on mine property (e.g., from the gate to various sites at the mine), then such equipment must be inspected.</p>
           <p>This standard will not be cited when an audible warning device has been installed on heavy duty mobile equipment at surface mines and surface operations of underground mines, but is inoperative because of electrical or mechanical defect.</p>
           <p>Standard .14132 shall be used when the equipment has not been equipped with audible warning devices, or when they have been so equipped, and the device is not operational for whatever reason.</p>
           <p>In some cases, mine operators have installed audible reverse alarms on underground equipment because prevailing conditions have dictated the need for a warning device to ensure miner safety. In this instance, Standard .14100 can be considered if the alarm is inoperable or inaudible and the defect can be shown to affect the safety of workers in the area. Surrounding noise levels, confined work areas, and distracting work assignments shall be considered at the time.</p>
         </div>
       </div></details>`
    );

    const guideButton = guidance.querySelector('[data-open-ppm="ppmLibrarySection"]');
    if (guideButton) guideButton.addEventListener("click", () => openSection(ppmLibrary));

    const volumeButton = ppmLibrary.querySelector('[data-open-volume="ppmVolume4Section"]');
    if (volumeButton) volumeButton.addEventListener("click", () => openSection(volume4));

    const subpartButton = volume4.querySelector('[data-open-subpart="ppmSubpartMSection"]');
    if (subpartButton) subpartButton.addEventListener("click", () => openSection(subpartM));

    ppmLibrary.querySelector(".ppm-back").addEventListener("click", () => openSection(guidance));
    volume4.querySelector(".ppm-back").addEventListener("click", () => openSection(ppmLibrary));
    subpartM.querySelector(".ppm-back").addEventListener("click", () => openSection(volume4));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initializePPMGuidance, 0));
  } else {
    window.setTimeout(initializePPMGuidance, 0);
  }
})();