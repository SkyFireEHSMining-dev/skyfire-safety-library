(function () {
  const STYLE_ID = "inspectionReadyQaV16Styles";
  const LINK_MAP = {
    "stay-ready": [
      { label: "Mine Act §103(a)", tone: "law", type: "mine-act", ref: "§103" },
      { label: "General Inspection Procedures", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" }
    ],
    "inspector-arrives": [
      { label: "Mine Act §103(a) & §103(f)", tone: "law", type: "mine-act", ref: "§103" },
      { label: "General Inspection Procedures", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" }
    ],
    "opening-records": [
      { label: "Browse applicable 30 CFR recordkeeping", tone: "law", type: "section", ref: "cfrSection" },
      { label: "Mine Act §103", tone: "law", type: "mine-act", ref: "§103" },
      { label: "General Inspection Procedures · Ch. 3 & 5", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" }
    ],
    "field-inspection": [
      { label: "Browse 30 CFR Part 56", tone: "law", type: "cfr-search", ref: "Part 56" },
      { label: "General Inspection Procedures · Ch. 3", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" }
    ],
    "ongoing-review": [
      { label: "Mine Act reference", tone: "law", type: "section", ref: "mineActSection" },
      { label: "30 CFR reference", tone: "law", type: "section", ref: "cfrSection" },
      { label: "General Inspection Procedures", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" }
    ],
    "closeout": [
      { label: "Mine Act §§104–107", tone: "law", type: "section", ref: "mineActSection" },
      { label: "General Inspection Procedures", tone: "msha", type: "enforcement", ref: "General Inspection Procedures" },
      { label: "Citation & Order Writing Handbook", tone: "msha", type: "enforcement", ref: "Citation & Order Forms / Writing Handbook" }
    ],
    "citation-fork": [
      { label: "Mine Act §104", tone: "law", type: "mine-act", ref: "§104" },
      { label: "Citation & Order Writing Handbook", tone: "msha", type: "enforcement", ref: "Citation & Order Forms / Writing Handbook" }
    ]
  };

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #inspectionReadySection .ir-nav{display:none!important}
      #inspectionReadySection .ir-source-row{align-items:stretch}
      #inspectionReadySection .ir-quick-link{
        appearance:none;
        border:0;
        cursor:pointer;
        text-align:left;
        line-height:1.3;
        font:inherit;
        min-height:34px;
      }
      #inspectionReadySection .ir-quick-link::after{content:'  →';font-weight:900}
      #inspectionReadySection .ir-quick-link:focus-visible{outline:3px solid rgba(11,132,255,.18);outline-offset:2px}
      @media(max-width:600px){
        #inspectionReadySection .ir-source-row{display:grid;grid-template-columns:1fr;gap:7px}
        #inspectionReadySection .ir-source-row .ir-chip{width:100%;box-sizing:border-box}
      }
    `;
    document.head.appendChild(style);
  }

  function showSection(id) {
    const section = document.getElementById(id);
    if (!section) return false;

    if (window.SkyFireMSHAReady && typeof window.SkyFireMSHAReady.show === "function") {
      window.SkyFireMSHAReady.show(section);
      return true;
    }
    if (typeof window.openDynamicSection === "function") {
      window.openDynamicSection(section);
      return true;
    }
    if (typeof window.showSection === "function") {
      window.showSection(id);
      return true;
    }

    document.querySelectorAll(".app-section").forEach(item => item.classList.add("hidden"));
    section.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  }

  function retry(fn, tries) {
    let count = 0;
    const run = () => {
      if (fn()) return;
      count += 1;
      if (count < (tries || 30)) window.setTimeout(run, 100);
    };
    run();
  }

  function openMineAct(provision) {
    if (!showSection("mineActSection")) return;
    retry(() => {
      const cards = Array.from(document.querySelectorAll("#mineActSection .mine-act-provision"));
      const card = cards.find(item => item.querySelector(".mine-act-section-number")?.textContent.trim() === provision);
      if (!card) return false;
      card.open = true;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    });
  }

  function openEnforcement(resourceTitle) {
    if (!showSection("mshaEnforcementSection")) return;
    retry(() => {
      const cards = Array.from(document.querySelectorAll("#mshaEnforcementSection details.enforcement-resource"));
      const card = cards.find(item => item.querySelector("summary strong")?.textContent.trim().includes(resourceTitle));
      if (!card) return false;
      card.open = true;
      card.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    });
  }

  function openCfrSearch(query) {
    if (typeof window.showSection === "function") window.showSection("cfrSection");
    else showSection("cfrSection");

    retry(() => {
      const input = document.getElementById("searchBar");
      if (!input) return false;
      input.value = query;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus({ preventScroll: true });
      input.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    });
  }

  function activateLink(link) {
    if (link.type === "mine-act") return openMineAct(link.ref);
    if (link.type === "enforcement") return openEnforcement(link.ref);
    if (link.type === "cfr-search") return openCfrSearch(link.ref);
    if (link.type === "section") return showSection(link.ref);
  }

  function decorateSourceRows(section) {
    Object.entries(LINK_MAP).forEach(([stageId, links]) => {
      const stage = section.querySelector(`#ir-stage-${stageId}`);
      const row = stage?.querySelector(".ir-source-row");
      if (!row || row.dataset.quickLinks === "true") return;

      const checked = row.querySelector(".ir-chip.gray")?.cloneNode(true);
      row.innerHTML = "";

      links.forEach(link => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `ir-chip ir-quick-link ${link.tone}`;
        button.textContent = link.label;
        button.setAttribute("aria-label", `Open ${link.label} in SkyFire`);
        button.addEventListener("click", () => activateLink(link));
        row.appendChild(button);
      });

      if (checked) row.appendChild(checked);
      row.dataset.quickLinks = "true";
    });
  }

  function initialize() {
    const section = document.getElementById("inspectionReadySection");
    if (!section || section.dataset.inspectionReadyStage1 !== "true") return false;

    ensureStyles();
    section.querySelector(":scope > .module-header .ir-nav")?.remove();
    decorateSourceRows(section);
    section.dataset.inspectionReadyQaV16 = "true";
    return true;
  }

  let tries = 0;
  function start() {
    if (initialize()) return;
    tries += 1;
    if (tries < 180) window.setTimeout(start, 100);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
