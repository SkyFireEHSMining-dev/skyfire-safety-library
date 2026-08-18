(function () {
  const CHECKED_LABEL = "Source checked August 2026";
  const PPM_HOME = "https://www.msha.gov/compliance-and-enforcement/compliance-assistance/program-policy-manual";

  const PPM_DATA = [
    {
      code: "VOLUME IV",
      title: "Metal and Nonmetal Mines",
      groups: [
        {
          code: "SUBPART M",
          title: "Machinery and Equipment",
          entries: [
            {
              code: "56/57.14100",
              title: "Safety Defects: Examination, Correction, and Records",
              text: [
                "This standard applies to all off-road and on-road self-propelled equipment used on mine property, including vehicles such as vans, suburbans, and pick-up trucks that are used at mine sites and remain on mine property. In most instances, it does not apply to vehicles used to transport persons between locations off mine property to mine property; however, if such vehicles transport personnel on mine property (e.g., from the gate to various sites at the mine), then such equipment must be inspected.",
                "This standard will not be cited when an audible warning device has been installed on heavy duty mobile equipment at surface mines and surface operations of underground mines, but is inoperative because of electrical or mechanical defect.",
                "Standard .14132 shall be used when the equipment has not been equipped with audible warning devices, or when they have been so equipped, and the device is not operational for whatever reason.",
                "In some cases, mine operators have installed audible reverse alarms on underground equipment because prevailing conditions have dictated the need for a warning device to ensure miner safety. In this instance, Standard .14100 can be considered if the alarm is inoperable or inaudible and the defect can be shown to affect the safety of workers in the area. Surrounding noise levels, confined work areas, and distracting work assignments shall be considered at the time."
              ]
            },
            {
              code: "56/57.14101(a)",
              title: "Brakes/Minimum Requirements",
              text: [
                "Subsection (a) is divided into three parts. Part (1) of this subsection sets a minimum performance standard for service brake systems on self-propelled mobile equipment. Part (2) sets a minimum performance standard for parking brakes on self-propelled mobile equipment. Part (3) sets a maintenance standard for all braking systems on self-propelled mobile equipment.",
                "Standard 56/57.14101(a)(1) should be cited if a service brake system is not capable of stopping and holding the equipment with its typical load on the maximum grade it travels.",
                "Standard 56/57.14101(a)(2) should be cited if the parking brakes are not capable of holding the equipment with its typical load on the maximum grade it travels.",
                "Standard 56/57.14101(a)(3) should be cited if a component or portion of any braking system on the equipment is not maintained in functional condition even though the braking system is in compliance with (1) and/or (2) above. It is important to note that if a component or portion of either system renders the equipment incapable of stopping or holding itself with its typical load on the maximum grade it travels, the appropriate standard, 56/57.14101(a)(1) or (2), should be cited.",
                "Separate citations or orders should be issued if violations of 56/57.14101(a)(1) and 56/57.14101(a)(2) are found on the same piece of equipment."
              ]
            }
          ]
        }
      ]
    }
  ];

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

  function countEntries(node) {
    if (Array.isArray(node.entries)) return node.entries.length;
    if (Array.isArray(node.groups)) return node.groups.reduce((sum, group) => sum + countEntries(group), 0);
    return 0;
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
      .ppm-resource-section .resource-status,#mshaGuidanceSection .resource-status{background:#eeeafd;color:#584b91}

      .ppm-reader-panel{padding:16px;overflow:hidden}
      .ppm-reader{display:grid;gap:10px;width:100%;max-width:100%;min-width:0}
      .ppm-tree-level{width:100%;max-width:100%;min-width:0;margin:8px 0;padding:0;border:0;background:transparent;box-shadow:none;overflow:visible}
      .ppm-tree-level>summary{display:block;width:100%;box-sizing:border-box;cursor:pointer;list-style:none;padding:15px 16px;border-top:1px solid var(--line-soft,var(--line));border-right:1px solid var(--line-soft,var(--line));border-bottom:1px solid var(--line-soft,var(--line));border-radius:15px;line-height:1.3;overflow-wrap:anywhere}
      .ppm-tree-level>summary::-webkit-details-marker{display:none}
      .ppm-tree-level>summary:before{content:'▶';display:inline-block;margin-right:9px;color:var(--text);transition:transform .15s ease}
      .ppm-tree-level[open]>summary:before{transform:rotate(90deg)}
      .ppm-tree-volume>summary{border-left:6px solid #43389f;background:linear-gradient(90deg,rgba(67,56,159,.14),#fff 36%)}
      .ppm-tree-group>summary{border-left:6px solid var(--sf-guidance,#6554c0);background:linear-gradient(90deg,rgba(101,84,192,.11),#fff 36%)}
      .ppm-tree-code{font-weight:850;font-size:.9rem;letter-spacing:.04em;color:var(--sf-guidance,#6554c0)}
      .ppm-tree-volume .ppm-tree-code{color:#43389f}
      .ppm-tree-title{display:block;margin:6px 0 0 25px;color:var(--text);font-size:1.08rem;font-weight:800;line-height:1.3}
      .ppm-tree-status{display:block;margin:8px 0 0 25px;color:#65589c;font-size:.79rem;font-weight:700}
      .ppm-tree-body{width:100%;max-width:100%;min-width:0;padding:0;margin:0}

      .ppm-entry{width:100%;max-width:100%;min-width:0;margin:10px 0 0;padding:0;border-top:1px solid var(--line-soft,var(--line));border-right:1px solid var(--line-soft,var(--line));border-bottom:1px solid var(--line-soft,var(--line));border-left:6px solid #9788df;border-radius:15px;background:#fff;box-shadow:none;overflow:hidden}
      .ppm-entry>summary{cursor:pointer;list-style:none;width:100%;box-sizing:border-box;padding:16px 17px;background:linear-gradient(90deg,rgba(151,136,223,.13),#fff 38%)}
      .ppm-entry>summary::-webkit-details-marker{display:none}
      .ppm-entry>summary strong{display:block;color:#5d50b7;font-size:1.18rem;line-height:1.28}
      .ppm-entry>summary span{display:block;color:var(--muted);margin-top:6px;line-height:1.4}
      .ppm-entry-body{width:100%;max-width:100%;min-width:0;box-sizing:border-box;padding:0 17px 20px}
      .ppm-entry-body h4{margin-top:22px;margin-bottom:8px}
      .ppm-entry-body p,.ppm-entry-body li{line-height:1.58;overflow-wrap:anywhere}
      .ppm-meta{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0}
      .ppm-chip{display:inline-block;padding:5px 9px;border-radius:999px;background:#eeeafd;color:#584b91;font-weight:700;font-size:.78rem}
      .ppm-official-text p{margin:0 0 18px;line-height:1.62}
      .ppm-source-box{margin-top:18px;padding:14px 16px;border-left:4px solid var(--sf-guidance,#6554c0);background:var(--sf-guidance-soft,#f4f1ff)}
      .ppm-source-links{display:grid;gap:9px;margin-top:12px}
      .ppm-source-links a{overflow-wrap:anywhere;color:var(--sf-guidance,#6554c0)}

      @media(max-width:600px){
        .ppm-reader-panel{padding:10px}
        .ppm-tree-level>summary{padding:14px 13px;font-size:1.02rem}
        .ppm-tree-title{font-size:1.02rem;margin-left:24px}
        .ppm-tree-status{margin-left:24px}
        .ppm-entry>summary{padding:15px 13px}
        .ppm-entry-body{padding:0 13px 18px}
        .ppm-entry-body p,.ppm-entry-body li{font-size:1.05rem;line-height:1.55}
      }
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

  function renderEntry(entry, volume, group) {
    return `
      <details class="ppm-entry">
        <summary>
          <strong>${entry.code} · ${entry.title}</strong>
          <span>Official MSHA Program Policy Manual text</span>
        </summary>
        <div class="ppm-entry-body">
          <div class="ppm-meta">
            <span class="ppm-chip">Source type · PPM</span>
            <span class="ppm-chip">${volume.code}</span>
            <span class="ppm-chip">${group.code}</span>
            <span class="ppm-chip">${CHECKED_LABEL}</span>
          </div>
          <h4>Official MSHA PPM text</h4>
          <div class="ppm-official-text">
            ${entry.text.map(paragraph => `<p>${paragraph}</p>`).join("")}
          </div>
        </div>
      </details>
    `;
  }

  function renderGroup(group, volume) {
    const entryCount = countEntries(group);
    if (!entryCount) return "";

    return `
      <details class="ppm-tree-level ppm-tree-group">
        <summary>
          <span class="ppm-tree-code">${group.code}</span>
          <span class="ppm-tree-title">${group.title}</span>
          <span class="ppm-tree-status">${entryCount} source-checked ${entryCount === 1 ? "entry" : "entries"}</span>
        </summary>
        <div class="ppm-tree-body">
          ${group.entries.map(entry => renderEntry(entry, volume, group)).join("")}
        </div>
      </details>
    `;
  }

  function renderVolume(volume) {
    const entryCount = countEntries(volume);
    if (!entryCount) return "";

    return `
      <details class="ppm-tree-level ppm-tree-volume">
        <summary>
          <span class="ppm-tree-code">${volume.code}</span>
          <span class="ppm-tree-title">${volume.title}</span>
          <span class="ppm-tree-status">${entryCount} source-checked ${entryCount === 1 ? "entry" : "entries"}</span>
        </summary>
        <div class="ppm-tree-body">
          ${volume.groups.map(group => renderGroup(group, volume)).join("")}
        </div>
      </details>
    `;
  }

  function renderReader() {
    return `
      <div class="info-panel ppm-reader-panel">
        <div class="ppm-reader">
          ${PPM_DATA.map(renderVolume).join("")}
        </div>
        <div class="ppm-source-box">
          <strong>Official MSHA source:</strong>
          <div class="ppm-source-links"><a href="${PPM_HOME}" target="_blank" rel="noopener">MSHA Program Policy Manual</a></div>
        </div>
      </div>
    `;
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
            <span class="resource-status">2 source-checked entries · ${CHECKED_LABEL}</span>
            <span>Open the PPM once, then drill down through the source-checked hierarchy to the official MSHA text.</span>
          </button>
        </div>
      </div>
    `);

    const ppmLibrary = buildSection(
      "ppmLibrarySection",
      "Back to MSHA Guidance",
      "MSHA Program Policy Manual",
      "Source-checked PPM material organized in one inline reader.",
      renderReader()
    );
    ppmLibrary.dataset.ppmInlineReader = "true";

    const guideButton = guidance.querySelector('[data-open-ppm="ppmLibrarySection"]');
    if (guideButton) guideButton.addEventListener("click", () => openSection(ppmLibrary));
    ppmLibrary.querySelector(".ppm-back").addEventListener("click", () => openSection(guidance));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => window.setTimeout(initializePPMGuidance, 0));
  } else {
    window.setTimeout(initializePPMGuidance, 0);
  }
})();