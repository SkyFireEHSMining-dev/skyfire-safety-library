(function () {
  const STYLE_ID = "inspectionReadyDepthV16Styles";
  const SOURCE_CHECKED = "September 16, 2026";

  const deepDive = {
    tracks: [
      {
        title: "1. Physical conditions and work practices",
        body: "The field inspection is not a paperwork exercise. Expect the inspector to look at the places miners actually work and travel, the condition and use of equipment, safeguards, roadways and travelways, highwalls and ground conditions, electrical installations, drilling/blasting areas where applicable, fire protection, emergency systems, and other conditions governed by the standards that apply to the operation.",
        why: "The practical question is whether the mine in front of the inspector matches the safe condition and work practices the operator's programs, examinations, maintenance systems, and training are supposed to produce."
      },
      {
        title: "2. Record-to-field consistency",
        body: "Records can become field evidence. An inspector may compare workplace examination records, equipment defect records, maintenance information, training records, and other documentation with the condition or practice actually observed.",
        why: "A record that says a condition was examined, corrected, maintained, or trained can create important follow-up questions if the field condition tells a different story."
      },
      {
        title: "3. Miner knowledge and training",
        body: "Inspectors may speak with miners about the work they perform, hazards they encounter, training they received, and how tasks are actually carried out. The training certificate is only one part of the picture.",
        why: "The deeper readiness question is not only 'Is the record here?' but also 'Can the miner safely explain and perform the work the record says they were trained to do?'"
      },
      {
        title: "4. Equipment, defects, and corrective action",
        body: "Mobile equipment and machinery are evaluated as operating systems, not isolated paperwork items. Inspection practices, reported defects, maintenance response, safeguards, warning devices, and the observed condition of the equipment can connect to one another.",
        why: "If a defect is known, the important facts can include what was found, when it was found, what action was taken, whether the equipment remained in service, and what the applicable standard required."
      },
      {
        title: "5. Health hazards and exposure controls",
        body: "The field inspection may also involve occupational-health conditions such as respirable crystalline silica, noise, hazardous chemicals, and other exposures. Current Part 60 duties are a major post-2019 overlay for M/NM operations and should not be missed simply because the inspection handbook predates the rule.",
        why: "Health compliance often depends on more than a visible condition: exposure evaluation, sampling, controls, respiratory protection, medical surveillance, records, and follow-up can all become part of the inspection picture where applicable."
      },
      {
        title: "6. Contractor and shared-work-area reality",
        body: "Contractor activity does not sit outside the inspection simply because the workers are not direct mine employees. Contractor records, training/hazard awareness, work areas, equipment, and coordination can be relevant depending on the circumstances.",
        why: "The operator should know who is working on site, where they are working, what hazards and controls affect the work, and which records or responsibilities apply rather than discovering that structure during the inspection."
      },
      {
        title: "7. Documentation that can support enforcement decisions",
        body: "Inspectors document what they observe and may gather photographs, measurements, statements, records, sampling information, and other facts. If enforcement follows, those facts can become important to the alleged violation and later gravity, negligence, or order analysis.",
        why: "SkyFire should help you recognize which facts matter without pretending to predict an enforcement classification. Capture accurate facts; do not manufacture a legal conclusion from a checklist."
      }
    ],
    playbook: [
      "Use a knowledgeable escort, but bring in the person who actually knows the equipment, area, or process when a technical question arises.",
      "Answer the question asked with facts you know. If a detail can be verified, say you will verify it rather than guessing.",
      "Do not obstruct or delay lawful inspection activity. At the same time, keep a clear internal log of areas visited, records requested, questions requiring follow-up, and enforcement documents received.",
      "If a hazard is identified, protect miners and correct the condition promptly when appropriate. Separately preserve the factual record needed to understand what existed, what was discovered, and what was corrected.",
      "Keep normal examinations, maintenance, training, and reporting processes running during the inspection. Do not let the inspection itself create new readiness gaps.",
      "Treat inconsistencies as learning signals: a good binder with a poor field condition—or a good field condition supported by poor records—both deserve follow-up."
    ],
    weakPoints: [
      "Workplace-examination records say a condition was corrected, but the same or related condition is still present in the field.",
      "Training records are complete, but miners cannot explain the hazard, procedure, or task they are performing.",
      "Equipment inspection/defect records do not line up with the observed condition, maintenance history, or continued use of the equipment.",
      "A written program exists, but supervisors and miners are not using it in the way the program describes.",
      "Contractor work is treated as separate from the mine's normal hazard-control and communication system.",
      "The site relies on the 2019 inspection checklist without accounting for newer requirements such as Surface Mobile Equipment Subpart T or Part 60 silica duties."
    ]
  };

  const links = [
    { label: "Mine Act §103 — inspection authority", tone: "law", type: "mine-act", ref: "§103", note: "Why MSHA can inspect, investigate, enter the mine, and involve operator/miner representatives." },
    { label: "30 CFR §56.18002 — workplace examinations", tone: "law", type: "cfr-search", ref: "56.18002", note: "Useful when comparing examination records, corrective action, and actual conditions." },
    { label: "30 CFR §56.14100 — mobile equipment defects", tone: "law", type: "cfr-search", ref: "56.14100", note: "Connect observed equipment condition to required inspection and defect-handling duties." },
    { label: "30 CFR Part 56 Subpart T — surface mobile equipment", tone: "law", type: "cfr-search", ref: "56.23000", note: "Current written-program overlay for surface mobile equipment where applicable." },
    { label: "30 CFR Part 60 — respirable crystalline silica", tone: "law", type: "cfr-search", ref: "Part 60", note: "Current M/NM health-rule overlay that the 2019 handbook does not contain." },
    { label: "30 CFR Parts 46 / 48 — training", tone: "law", type: "cfr-search", ref: "Part 46 Part 48", note: "Use the correct training regime for the operation and work being performed." },
    { label: "MSHA General Inspection Procedures", tone: "msha", type: "enforcement", ref: "General Inspection Procedures", note: "Inspector-facing procedure baseline for how routine inspections are conducted." },
    { label: "Citation & Order Writing Handbook", tone: "msha", type: "enforcement", ref: "Citation & Order Forms / Writing Handbook", note: "Follow the bridge from observed facts into MSHA's enforcement documentation process." }
  ];

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #inspectionReadySection .ir-deep-dive{margin:18px 0 4px;border:1px solid #b7dedd;border-left:5px solid var(--ir-teal);border-radius:15px;background:#fbfefe;overflow:hidden}
      #inspectionReadySection .ir-deep-dive>summary{list-style:none;cursor:pointer;padding:15px 16px;background:linear-gradient(90deg,var(--ir-teal-soft),#fff 38%);color:var(--ir-teal-strong);font-weight:900;line-height:1.35}
      #inspectionReadySection .ir-deep-dive>summary::-webkit-details-marker{display:none}
      #inspectionReadySection .ir-deep-dive>summary::after{content:'+';float:right;font-size:1.25rem;font-weight:900}
      #inspectionReadySection .ir-deep-dive[open]>summary::after{content:'−'}
      #inspectionReadySection .ir-deep-body{padding:16px}
      #inspectionReadySection .ir-deep-intro{margin:0 0 15px;color:var(--muted);line-height:1.55}
      #inspectionReadySection .ir-deep-section{margin:18px 0 0}
      #inspectionReadySection .ir-deep-section>h4{margin:0 0 9px;color:var(--text);font-size:1.02rem}
      #inspectionReadySection .ir-deep-track{padding:12px 0;border-top:1px solid #d9e8e8}
      #inspectionReadySection .ir-deep-track:first-of-type{border-top:0;padding-top:0}
      #inspectionReadySection .ir-deep-track h5{margin:0 0 5px;color:var(--ir-teal-strong);font-size:.98rem;line-height:1.35}
      #inspectionReadySection .ir-deep-track p{margin:0;color:var(--text);line-height:1.55}
      #inspectionReadySection .ir-deep-why{margin-top:7px!important;padding:8px 10px;border-left:3px solid #8ecfcd;background:#f2fbfa;color:#415164!important}
      #inspectionReadySection .ir-deep-list{margin:5px 0 0;padding-left:22px}
      #inspectionReadySection .ir-deep-list li{margin:7px 0;line-height:1.5}
      #inspectionReadySection .ir-deep-link-grid{display:grid;gap:9px;margin-top:10px}
      #inspectionReadySection .ir-deep-link-card{display:block;width:100%;text-align:left;border:1px solid var(--line);border-left:4px solid #0b84ff;border-radius:11px;padding:11px 12px;background:#fff;cursor:pointer;font:inherit;color:var(--text)}
      #inspectionReadySection .ir-deep-link-card.msha{border-left-color:#6554c0}
      #inspectionReadySection .ir-deep-link-card strong{display:block;color:#075ca8;line-height:1.35}
      #inspectionReadySection .ir-deep-link-card.msha strong{color:#5445a7}
      #inspectionReadySection .ir-deep-link-card span{display:block;margin-top:4px;color:var(--muted);font-size:.84rem;line-height:1.4}
      #inspectionReadySection .ir-deep-link-card strong::after{content:'  →';font-weight:900}
      #inspectionReadySection .ir-deep-caution{margin-top:16px;padding:11px 13px;border-left:4px solid var(--ir-amber);background:var(--ir-amber-soft);line-height:1.5}
      #inspectionReadySection .ir-deep-source{margin-top:13px;color:var(--muted);font-size:.78rem;line-height:1.4}
      @media(max-width:600px){
        #inspectionReadySection .ir-deep-dive{border-right:0;border-radius:0;background:transparent;margin-left:0;margin-right:0}
        #inspectionReadySection .ir-deep-dive>summary{padding:13px 10px;background:linear-gradient(90deg,var(--ir-teal-soft),transparent 72%)}
        #inspectionReadySection .ir-deep-body{padding:14px 10px 10px}
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
      if (count < (tries || 35)) window.setTimeout(run, 100);
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

  function activate(link) {
    if (link.type === "mine-act") return openMineAct(link.ref);
    if (link.type === "enforcement") return openEnforcement(link.ref);
    if (link.type === "cfr-search") return openCfrSearch(link.ref);
  }

  function makeList(items) {
    const ul = document.createElement("ul");
    ul.className = "ir-deep-list";
    items.forEach(text => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    return ul;
  }

  function buildDeepDive() {
    const details = document.createElement("details");
    details.className = "ir-deep-dive";
    details.dataset.fieldInspectionDeepDive = "true";

    const summary = document.createElement("summary");
    summary.textContent = "Go Deeper — learn how the field inspection fits together";
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "ir-deep-body";
    body.innerHTML = `<p class="ir-deep-intro"><strong>This layer is for learning, not just reminding.</strong> Use it when you want to understand what the inspector may be connecting across field conditions, records, miner knowledge, equipment, health exposures, and enforcement documentation.</p>`;

    const tracksSection = document.createElement("section");
    tracksSection.className = "ir-deep-section";
    tracksSection.innerHTML = `<h4>What the inspector is actually connecting</h4>`;
    deepDive.tracks.forEach(track => {
      const article = document.createElement("article");
      article.className = "ir-deep-track";
      article.innerHTML = `<h5>${track.title}</h5><p>${track.body}</p><p class="ir-deep-why"><strong>Why this matters:</strong> ${track.why}</p>`;
      tracksSection.appendChild(article);
    });
    body.appendChild(tracksSection);

    const playbookSection = document.createElement("section");
    playbookSection.className = "ir-deep-section";
    playbookSection.innerHTML = `<h4>Operator playbook during the field inspection</h4>`;
    playbookSection.appendChild(makeList(deepDive.playbook));
    body.appendChild(playbookSection);

    const weakSection = document.createElement("section");
    weakSection.className = "ir-deep-section";
    weakSection.innerHTML = `<h4>Common disconnects worth catching before MSHA does</h4>`;
    weakSection.appendChild(makeList(deepDive.weakPoints));
    body.appendChild(weakSection);

    const linksSection = document.createElement("section");
    linksSection.className = "ir-deep-section";
    linksSection.innerHTML = `<h4>Follow the authority / related SkyFire</h4><p class="ir-deep-intro">These are contextual handoffs, not a claim that every standard applies to every mine or every inspection.</p>`;
    const grid = document.createElement("div");
    grid.className = "ir-deep-link-grid";
    links.forEach(link => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `ir-deep-link-card ${link.tone === "msha" ? "msha" : "law"}`;
      button.innerHTML = `<strong>${link.label}</strong><span>${link.note}</span>`;
      button.addEventListener("click", () => activate(link));
      grid.appendChild(button);
    });
    linksSection.appendChild(grid);
    body.appendChild(linksSection);

    const caution = document.createElement("div");
    caution.className = "ir-deep-caution";
    caution.innerHTML = `<strong>Boundary:</strong> SkyFire can help you understand the inspection process and recognize facts that may matter. It does not determine whether a condition is a violation or predict S&S, negligence, unwarrantable failure, order type, or legal outcome.`;
    body.appendChild(caution);

    const source = document.createElement("p");
    source.className = "ir-deep-source";
    source.textContent = `Source checked ${SOURCE_CHECKED}: Mine Act §103; MSHA General Inspection Procedures Handbook PH19-IV/V-1 (2019 procedural baseline); current 30 CFR Part 56 and Part 60 context. Current requirements control where the older handbook and current rules differ.`;
    body.appendChild(source);

    details.appendChild(body);
    return details;
  }

  function install() {
    const stage = document.querySelector("#inspectionReadySection #ir-stage-field-inspection");
    const body = stage?.querySelector(".ir-stage-body");
    if (!stage || !body) return false;
    if (body.querySelector('[data-field-inspection-deep-dive="true"]')) return true;

    ensureStyles();
    const sourceRow = body.querySelector(".ir-source-row");
    const deep = buildDeepDive();
    if (sourceRow) body.insertBefore(deep, sourceRow);
    else body.appendChild(deep);
    stage.dataset.deepLearningPrototype = "true";
    return true;
  }

  let tries = 0;
  function start() {
    if (install()) return;
    tries += 1;
    if (tries < 180) window.setTimeout(start, 100);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
