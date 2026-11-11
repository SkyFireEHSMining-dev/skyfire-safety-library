(function () {
  const SOURCE_CHECKED = "September 14, 2026";
  const FULL_ACT_URL = "https://uscode.house.gov/view.xhtml?edition=prelim&path=%2Fprelim%40title30%2Fchapter22";

  const provisions = [
    {
      act: "§3",
      usc: "30 U.S.C. §802",
      title: "Definitions",
      why: "Defines core Mine Act terms that shape who and what the law covers.",
      points: [
        "Defines operator, agent, miner, coal or other mine, imminent danger, accident, mandatory health or safety standard, and the Commission.",
        "The Mine Act definition of mine is broad and reaches many areas, facilities, roads, structures, equipment, and milling/preparation activities connected to mineral extraction.",
        "Use the Part 50 definition in 30 CFR §50.2(h), not this general statutory definition alone, when deciding whether an event is a Part 50 accident for reporting purposes."
      ],
      url: "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section802"
    },
    {
      act: "§103",
      usc: "30 U.S.C. §813",
      title: "Inspections, investigations, and recordkeeping",
      why: "This is the core statutory authority behind routine MSHA inspections and several accident-response powers.",
      points: [
        "Authorizes frequent inspections and investigations and gives authorized representatives a right of entry to mines subject to the Act.",
        "Generally prohibits advance notice of an inspection and establishes complete-inspection frequency requirements, including at least two complete inspections per year at surface mines.",
        "Provides for operator and miners' representatives to accompany an inspector during the physical inspection.",
        "Includes accident-notification and accident-control authority in subsections (j) and (k), which connect directly to Incident Ready / Part 50 response."
      ],
      url: "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A813+edition%3Aprelim%29",
      connections: ["inspectionReadySection", "incidentReadySection"]
    },
    {
      act: "§104",
      usc: "30 U.S.C. §814",
      title: "Citations and orders",
      why: "Establishes the statutory framework MSHA uses to issue citations and several types of withdrawal orders.",
      points: [
        "A citation identifies the alleged violation and the provision of law, standard, rule, regulation, or order MSHA believes was violated.",
        "The section establishes abatement timing and the failure-to-abate withdrawal-order mechanism.",
        "It also contains the unwarrantable-failure sequence and other specialized withdrawal-order authority.",
        "The existence and classification of a violation depend on the facts; SkyFire does not automatically determine S&S, negligence, unwarrantable failure, or order type."
      ],
      url: "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section814"
    },
    {
      act: "§105",
      usc: "30 U.S.C. §815",
      title: "Procedure for enforcement",
      why: "Explains important Mine Act procedures after citations, orders, and proposed penalties are issued.",
      points: [
        "Provides the statutory framework for notice of proposed penalties and contest proceedings before the Federal Mine Safety and Health Review Commission.",
        "The statute includes 30-day contest deadlines in several contexts; later Enforcement Navigator guidance will distinguish those deadlines from separate MSHA conference procedures.",
        "Also contains miner discrimination and interference protections and related Commission procedures.",
        "Use the official text and current Commission procedural rules for a live case or deadline decision."
      ],
      url: "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section815"
    },
    {
      act: "§107",
      usc: "30 U.S.C. §817",
      title: "Imminent danger",
      why: "Authorizes withdrawal action when an inspector determines that an imminent danger exists.",
      points: [
        "Allows an authorized representative to issue an order requiring people to be withdrawn from the affected area when an imminent danger is found.",
        "The order is aimed at removing people from the danger area while necessary corrective or rescue activity is addressed.",
        "An imminent-danger order can exist in addition to a citation or penalty based on the same underlying conditions.",
        "SkyFire should be used to understand the authority, not to predict whether MSHA will make an imminent-danger finding."
      ],
      url: "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section817"
    },
    {
      act: "§110",
      usc: "30 U.S.C. §820",
      title: "Penalties and liability",
      why: "Establishes the Mine Act's civil and criminal penalty framework and certain individual-liability provisions.",
      points: [
        "Provides civil-penalty authority for violations and for certain failures to comply with Mine Act requirements.",
        "Includes specific consequences tied to untimely accident notification and certain failure-to-abate situations.",
        "Contains provisions addressing knowing violations by certain corporate personnel and criminal conduct such as knowing false statements.",
        "Do not use this offline summary to calculate a current penalty amount; current penalty amounts and assessment rules must be checked against current MSHA regulations and penalty-adjustment requirements."
      ],
      url: "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A820+edition%3Aprelim%29"
    }
  ];

  function ensureStylesheet() {
    if (document.querySelector('link[data-mine-act-v16="true"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./mine-act-v16.css?v=v0.16-mine-act-1";
    link.dataset.mineActV16 = "true";
    document.head.appendChild(link);
  }

  function renderProvision(item) {
    const connectionButtons = (item.connections || []).map(target => {
      const label = target === "inspectionReadySection" ? "Open Inspection Ready" : "Open Incident Ready";
      return `<button type="button" class="mine-act-context-btn" data-mine-act-target="${target}">${label}</button>`;
    }).join("");

    return `
      <details class="mine-act-provision">
        <summary>
          <span class="mine-act-section-number">${item.act}</span>
          <span class="mine-act-summary-text"><strong>${item.title}</strong><small>${item.usc}</small></span>
        </summary>
        <div class="mine-act-provision-body">
          <div class="mine-act-source-row">
            <span class="msha-source-chip source-law">LAW</span>
            <span class="mine-act-usc">${item.usc}</span>
          </div>
          <h4>Why it matters</h4>
          <p>${item.why}</p>
          <h4>Offline reference summary</h4>
          <ul>${item.points.map(point => `<li>${point}</li>`).join("")}</ul>
          <div class="mine-act-source-note"><strong>Source rule:</strong> This summary is SkyFire navigation/context, not a substitute for the statutory text. Use the official U.S. Code link for the controlling language.</div>
          <div class="mine-act-actions">
            <a class="mine-act-official-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Read official ${item.act} / ${item.usc}</a>
            ${connectionButtons}
          </div>
        </div>
      </details>`;
  }

  function markup() {
    return `
      <div class="module-header mine-act-header">
        <button class="module-home-btn mine-act-back" type="button">← Back</button>
        <button class="module-home-btn mine-act-home" type="button">⌂ Home</button>
        <div class="module-header-text">
          <div class="module-breadcrumb">Regulatory Resources › Mine Act</div>
          <h2>Federal Mine Safety and Health Act</h2>
          <p>Statutory authority behind MSHA inspections, citations and orders, contests, imminent danger, and penalties.</p>
        </div>
      </div>

      <div class="info-panel mine-act-intro">
        <div class="msha-review-meta">
          <span class="msha-source-chip source-law">LAW</span>
          <span class="msha-reviewed-date">Source checked ${SOURCE_CHECKED}</span>
        </div>
        <h3>Mine Act authority is different from 30 CFR</h3>
        <p><strong>Mine Act §103</strong> is statutory authority. <strong>30 CFR §56.14100</strong> is a regulatory standard. SkyFire keeps those systems separate so a section number is not mistaken for a CFR citation.</p>
        <div class="mine-act-equation" aria-label="Mine Act and U.S. Code section mapping">
          <strong>Mine Act §103</strong><span>=</span><strong>30 U.S.C. §813</strong>
        </div>
        <a class="mine-act-full-link" href="${FULL_ACT_URL}" target="_blank" rel="noopener noreferrer">Read Full Mine Act — Official U.S. Code</a>
        <p class="mine-act-online-note">The full Act link opens the Office of the Law Revision Counsel's U.S. Code presentation and requires an internet connection. The key-reference summaries below remain available in SkyFire after the app shell is cached.</p>
      </div>

      <div class="info-panel mine-act-key-panel">
        <div class="mine-act-heading-row">
          <div>
            <h3>Key provisions for mine safety professionals</h3>
            <p>Open only the section you need. Each card shows the Mine Act section, its U.S. Code location, a practical offline summary, and the controlling official source.</p>
          </div>
          <span class="resource-status">v0.16</span>
        </div>
        <div class="mine-act-provision-list">
          ${provisions.map(renderProvision).join("")}
        </div>
      </div>

      <div class="info-panel mine-act-caution">
        <h3>Use the right authority for the decision</h3>
        <p>The Mine Act supplies statutory authority. 30 CFR contains many of the mandatory standards and implementing rules used day to day. MSHA handbooks and the Program Policy Manual explain agency procedure or interpretation but are not substitutes for controlling law or regulation.</p>
        <p>When a live inspection, citation, order, contest deadline, accident, or penalty decision matters, verify the current official text and applicable procedural rules.</p>
      </div>`;
  }

  function showTarget(id) {
    const section = document.getElementById(id);
    if (!section) return;
    if (window.SkyFireMSHAReady && typeof window.SkyFireMSHAReady.show === "function") {
      window.SkyFireMSHAReady.show(section);
      return;
    }
    document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
    section.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function initialize() {
    const section = document.getElementById("mineActSection");
    if (!section) return false;
    ensureStylesheet();
    section.innerHTML = markup();

    section.querySelector(".mine-act-back")?.addEventListener("click", () => showTarget("regulatoryResourcesHubSection"));
    section.querySelector(".mine-act-home")?.addEventListener("click", () => showTarget("homeSection"));
    section.querySelectorAll("[data-mine-act-target]").forEach(button => {
      button.addEventListener("click", () => showTarget(button.dataset.mineActTarget));
    });

    window.SkyFireMineActV16 = {
      sourceChecked: SOURCE_CHECKED,
      fullActUrl: FULL_ACT_URL,
      provisions
    };
    return true;
  }

  let attempts = 0;
  function start() {
    if (initialize()) return;
    attempts += 1;
    if (attempts < 120) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
