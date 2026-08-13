(function () {
  const CHECKED_LABEL = "Source checked August 2026";
  const PPM_HOME = "https://www.msha.gov/compliance-and-enforcement/compliance-assistance/program-policy-manual";
  const VOLUME_IV_POLICY = "https://www.msha.gov/REGS/COMPLIAN/PPM/PMVOL4D.HTM";
  const CFR_56_14100 = "https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-56/subpart-M/section-56.14100";
  const CFR_57_14100 = "https://www.ecfr.gov/current/title-30/chapter-I/subchapter-K/part-57/subpart-M/section-57.14100";

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
      .ppm-notice{border-left:5px solid #4f83ff}
      .ppm-library-list{display:grid;gap:16px;margin-top:18px}
      .ppm-folder{width:100%;text-align:left;background:linear-gradient(180deg,#fff,#f3f8fd);border:1px solid var(--line);border-radius:20px;padding:22px;box-shadow:var(--shadow);cursor:pointer}
      .ppm-folder-code{display:block;color:var(--accent);font-weight:800;font-size:.9rem;letter-spacing:.03em;margin-bottom:7px}
      .ppm-folder strong{display:block;color:var(--text);font-size:1.25rem;line-height:1.2}
      .ppm-folder span:not(.ppm-folder-code):not(.resource-status){display:block;color:var(--muted);margin-top:9px;line-height:1.45}
      .ppm-entry{padding:0;overflow:hidden}
      .ppm-entry>summary{cursor:pointer;list-style:none;padding:20px 22px}
      .ppm-entry>summary::-webkit-details-marker{display:none}
      .ppm-entry>summary strong{display:block;color:var(--accent);font-size:1.22rem;line-height:1.25}
      .ppm-entry>summary span{display:block;color:var(--muted);margin-top:6px;line-height:1.4}
      .ppm-entry-body{padding:0 22px 22px}
      .ppm-entry-body h4{margin-top:22px;margin-bottom:8px}
      .ppm-entry-body p,.ppm-entry-body li{line-height:1.55}
      .ppm-meta{display:flex;flex-wrap:wrap;gap:8px;margin:4px 0 18px}
      .ppm-chip{display:inline-block;padding:5px 9px;border-radius:999px;background:#eef4fb;color:#52677f;font-weight:700;font-size:.78rem}
      .ppm-source-box{margin-top:18px;padding:14px 16px;border-left:4px solid #4f83ff;background:#f4f8ff}
      .ppm-source-links{display:grid;gap:9px;margin-top:12px}
      .ppm-source-links a{overflow-wrap:anywhere}
      .ppm-cfr-list{padding-left:22px}
      .ppm-cfr-list li{margin:9px 0}
      .ppm-policy-list{padding-left:22px}
      .ppm-policy-list li{margin:9px 0}
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
        <p>The Program Policy Manual explains MSHA policy and how the agency applies or interprets certain requirements. It is presented separately from the regulatory text in 30 CFR.</p>
        <p><strong>Use the CFR for the regulation itself.</strong> Use the PPM to understand the related MSHA policy. SkyFire keeps those source types clearly labeled.</p>
      </div>
      <div class="info-panel">
        <h3>MSHA Guidance Library</h3>
        <p>Only guidance that has been checked and prepared for field reference is shown here.</p>
        <div class="ppm-library-list">
          <button type="button" class="ppm-folder" data-open-ppm="ppmLibrarySection">
            <span class="ppm-folder-code">PROGRAM POLICY MANUAL</span>
            <strong>MSHA Program Policy Manual</strong>
            <span class="resource-status">Volume IV started · ${CHECKED_LABEL}</span>
            <span>Browse reviewed PPM material by volume and the same regulatory organization used by MSHA.</span>
          </button>
        </div>
      </div>
    `);

    const ppmLibrary = buildSection(
      "ppmLibrarySection",
      "Back to MSHA Guidance",
      "MSHA Program Policy Manual",
      "Reviewed PPM material organized by MSHA volume.",
      `<div class="info-panel"><h3>Program Policy Manual</h3><p>SkyFire is building this library one checked entry at a time. Volumes appear here when they contain reviewed material.</p><div class="ppm-library-list"><button type="button" class="ppm-folder" data-open-volume="ppmVolume4Section"><span class="ppm-folder-code">VOLUME IV</span><strong>Metal and Nonmetal Mines</strong><span class="resource-status">1 reviewed entry · ${CHECKED_LABEL}</span><span>Current SkyFire coverage begins with Subpart M — Machinery and Equipment.</span></button></div><div class="ppm-source-box"><strong>Official MSHA source:</strong><div class="ppm-source-links"><a href="${PPM_HOME}" target="_blank" rel="noopener">MSHA Program Policy Manual</a></div></div></div>`
    );

    const volume4 = buildSection(
      "ppmVolume4Section",
      "Back to PPM Volumes",
      "PPM Volume IV",
      "Metal and Nonmetal Mines",
      `<div class="info-panel"><h3>Volume IV · Metal and Nonmetal Mines</h3><div class="ppm-meta"><span class="ppm-chip">Program Policy Manual</span><span class="ppm-chip">Metal / Nonmetal</span><span class="ppm-chip">${CHECKED_LABEL}</span></div><p>SkyFire follows MSHA's regulatory organization so additional Volume IV entries can be added without changing the library structure.</p></div>
       <div class="info-panel"><h3>Volume IV Sections</h3><p>Select a subpart to see the reviewed PPM entries available inside it.</p><div class="ppm-library-list"><button type="button" class="ppm-folder" data-open-subpart="ppmSubpartMSection"><span class="ppm-folder-code">SUBPART M</span><strong>Machinery and Equipment</strong><span class="resource-status">1 reviewed entry · ${CHECKED_LABEL}</span><span>Safety defects, equipment condition, and related machinery guidance.</span></button></div></div>`
    );

    const subpartM = buildSection(
      "ppmSubpartMSection",
      "Back to Volume IV",
      "Subpart M",
      "Machinery and Equipment",
      `<div class="info-panel"><h3>Subpart M · Machinery and Equipment</h3><div class="ppm-meta"><span class="ppm-chip">Volume IV</span><span class="ppm-chip">Subpart M</span><span class="ppm-chip">1 reviewed entry</span></div><p>Select a reviewed PPM entry below.</p></div>
       <details class="info-panel ppm-entry"><summary><strong>56/57.14100 · Safety Defects: Examination, Correction, and Records</strong><span>PPM clarification for self-propelled equipment used on mine property</span></summary><div class="ppm-entry-body">
         <div class="ppm-meta"><span class="ppm-chip">Source type · PPM</span><span class="ppm-chip">Volume IV</span><span class="ppm-chip">Subpart M</span><span class="ppm-chip">${CHECKED_LABEL}</span></div>
         <h4>What the PPM clarifies</h4>
         <ul class="ppm-policy-list">
           <li>The policy applies §56/57.14100 to off-road and on-road self-propelled equipment used on mine property. It specifically includes vehicles such as vans, Suburbans, and pickup trucks when they are used at the mine site.</li>
           <li>Vehicles used only to bring people from off mine property to the mine are generally outside this inspection policy. If the same vehicle transports personnel on mine property—for example, from the gate to work areas—the PPM says it must be inspected.</li>
           <li>For heavy-duty mobile equipment at surface mines and surface operations of underground mines, the PPM directs certain audible-warning-device issues to §56/57.14132 rather than §14100. The policy separately notes that §14100 may be considered for an underground reverse alarm when the alarm is inoperable or inaudible and the defect affects worker safety.</li>
         </ul>
         <h4>Related CFR requirements</h4>
         <p>The PPM does not replace the regulation. In plain terms, §56/57.14100 requires:</p>
         <ol class="ppm-cfr-list">
           <li><strong>(a)</strong> Self-propelled mobile equipment that will be used during a shift is inspected by the equipment operator before it is placed in operation on that shift.</li>
           <li><strong>(b)</strong> Safety-affecting defects on equipment, machinery, and tools are corrected in a timely manner so they do not create a hazard.</li>
           <li><strong>(c)</strong> If a defect makes continued operation hazardous, the item is removed from service and controlled against further use until corrected.</li>
           <li><strong>(d)</strong> Safety defects on self-propelled mobile equipment that are not corrected immediately are reported and recorded by the operator, with the record kept until correction and available for MSHA inspection.</li>
         </ol>
         <div class="ppm-source-box"><strong>Source distinction:</strong><p>The bullets under “What the PPM clarifies” summarize MSHA Program Policy Manual guidance. The four CFR points summarize the related regulatory requirements and are labeled separately so guidance is not presented as regulatory text.</p></div>
         <h4>Official sources</h4>
         <div class="ppm-source-links"><a href="${VOLUME_IV_POLICY}" target="_blank" rel="noopener">MSHA PPM Volume IV policy page · 56/57.14100</a><a href="${CFR_56_14100}" target="_blank" rel="noopener">30 CFR § 56.14100 · eCFR</a><a href="${CFR_57_14100}" target="_blank" rel="noopener">30 CFR § 57.14100 · eCFR</a><a href="${PPM_HOME}" target="_blank" rel="noopener">MSHA Program Policy Manual home</a></div>
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
