(function () {
  const STYLE_ID = "inspectionReadyTypesV16Styles";
  const SOURCE_CHECKED = "September 17, 2026";
  const COW_URL = "https://www.msha.gov/sites/default/files/Directive%20%26%20Guidance/Handbooks/PH25-I-1-Citation-and-Order-Writing-Handbook-1_18_25.pdf";
  const GIP_URL = "https://arlweb.msha.gov/READROOM/HANDBOOK/PH19-IV.pdf";
  const COMPLAINT_URL = "https://www.msha.gov/sites/default/files/Directive%20%26%20Guidance/Handbooks/PH20-I-2%20Hazardous%20Condition%20Complaint%20Procedures%20Handbook.pdf";
  const PART43_URL = "https://www.ecfr.gov/current/title-30/chapter-I/subchapter-G/part-43";
  const PART50_URL = "https://www.ecfr.gov/current/title-30/chapter-I/subchapter-I/part-50";

  const coreTypes = [
    {
      code: "E01",
      title: "Regular Safety and Health Inspection",
      authority: "Mine Act §103(a)",
      plain: "The standard full-mine inspection. MSHA inspects the mine in its entirety for compliance and other §103(a) purposes.",
      trigger: "Statutory recurring inspection duty.",
      scope: "Entire mine. The current MSHA event-code description calls E01 the mandatory safety and health inspection of an entire mine, surface facility, or other entity with a mine ID.",
      frequency: "At least 4 times each year for underground mines and at least 2 times each year for surface mines.",
      operator: "Treat this as the broadest routine inspection. Expect field conditions, work practices, records, training, equipment, programs, and miner knowledge to be compared. Advance notice is generally prohibited."
    },
    {
      code: "E02",
      title: "Section 103(i) Spot Inspection",
      authority: "Mine Act §103(i)",
      plain: "A targeted, higher-frequency spot inspection for a mine placed in §103(i) status.",
      trigger: "Excessive methane or other explosive-gas liberation; a qualifying gas ignition/explosion with death or serious injury during the prior 5 years; or other especially hazardous conditions.",
      scope: "All or part of the mine, focused on the reason the mine is in §103(i) status. This is not simply a smaller E01.",
      frequency: "Methane/explosive-gas status can produce 5-, 10-, or 15-working-day schedules. Current MSHA guidance uses >1,000,000 ft³/24 hr for 5-day status, >500,000 but <1,000,000 for 10-day, and >200,000 but <500,000 for 15-day. Ignition/explosion and especially hazardous-condition status use the 5-working-day schedule.",
      operator: "The word “gassy” is useful shorthand, but incomplete. The key question is why the mine is in §103(i) status and what specific hazard the spot inspection is meant to address."
    },
    {
      code: "E03 / E04",
      title: "Hazard Complaint Inspection",
      authority: "Mine Act §103(g); 30 CFR Part 43",
      plain: "MSHA responds to an allegation that a violation, hazardous condition, or imminent danger exists.",
      trigger: "E03 is the formal §103(g) written-notification path for a miner or representative of miners. E04 covers other hazard complaints that are not a §103(g) request, including verbal/anonymous or other non-§103(g) complaints.",
      scope: "The alleged condition is the reason for the visit, but the operator should not assume other observed violations are invisible to MSHA.",
      frequency: "As complaints arise. A qualifying §103(g) notice gives the miner/representative a statutory right to an immediate inspection; MSHA procedures require prompt handling.",
      operator: "The operator receives the complaint information required by law, but the complainant’s identity is protected from the operator copy. Know 30 CFR Part 43 and do not retaliate or try to identify the complainant."
    },
    {
      code: "E06 / E07 / E08 / E09",
      title: "Accident Investigation / Mine Emergency",
      authority: "Mine Act §103(b), §103(j), §103(k); 30 CFR Part 50",
      plain: "These are investigation/emergency activities, not a normal routine inspection.",
      trigger: "E06 fatal accident, E07 serious non-fatal accident, E08 non-injury accident as defined by Part 50, and E09 mine emergency operations/rescue and recovery.",
      scope: "The accident scene, causes, relevant records, interviews, physical evidence, rescue/recovery activity, and related conditions. §103(j)/(k) can place the affected area under broad MSHA control for safety and evidence preservation.",
      frequency: "Event-driven.",
      operator: "Part 50 knowledge is essential. Immediate notification, scene/evidence preservation, operator investigation, and coordination with MSHA can all become critical before the normal inspection playbook matters."
    },
    {
      code: "E15",
      title: "Compliance Follow-up Inspection",
      authority: "Mine Act §104; especially §104(b) failure-to-abate consequences",
      plain: "MSHA returns or follows up to determine whether a previously cited condition has been abated.",
      trigger: "An open citation/order or abatement requirement needs follow-up.",
      scope: "The previously cited condition and its abatement status, although other inspection activity may also occur under separate authority/event activity.",
      frequency: "Driven by abatement dates and enforcement follow-up.",
      operator: "Do not treat the abatement date as a calendar reminder only. Verify the condition is actually corrected, the correction is sustainable, and the documentation matches reality. Failure to abate can lead to a §104(b) withdrawal order when extension is not justified."
    },
    {
      code: "E16",
      title: "Other Spot Inspection",
      authority: "Mine Act §103(a) inspection authority and applicable standards",
      plain: "A focused inspection of all or part of a mine that is not the special §103(i) event.",
      trigger: "MSHA needs to examine a particular area, condition, subject, or compliance concern.",
      scope: "Narrower than a full E01 and defined by the purpose of the visit.",
      frequency: "As needed.",
      operator: "Ask what the inspection is focused on, but do not confuse a stated focus with permission to obstruct lawful inspection activity or ignore other conditions an inspector observes."
    }
  ];

  const specialty = [
    ["E05", "§108 Injunctive Action / Other Special Investigation", "Mine Act §108", "Special investigation activity involving injunctive action or another special-investigation purpose."],
    ["E10", "Petition for Modification Investigation", "Mine Act §101(c)/(d); 30 CFR Part 44", "Investigation supporting a petition to modify the application of a mandatory safety standard."],
    ["E11", "Discrimination Investigation", "Mine Act §105(c)", "Investigation of alleged discrimination or interference with protected miner rights."],
    ["E12", "Knowing / Willful Violation Investigation", "Mine Act §110(c)/(d)", "This is the “110 investigation” many safety professionals refer to. It is a special investigation into possible knowing or willful conduct—not a routine inspection category."],
    ["E13", "Re-opening Inspection — Coal only", "MSHA event-code taxonomy", "Non-penalty inspection of an entire coal mine after abandonment or inactive status."],
    ["E14", "Compliance Assistance Visit — M/NM only", "MSHA event-code taxonomy", "Visit to a new/reopening M/NM mine, new facility, or new equipment installation to identify potential violations without proposed monetary civil penalties."],
    ["E17", "Special Emphasis Program", "MSHA event-code taxonomy", "Specialized agency, coal, or M/NM activity with a defined emphasis. The program purpose controls the scope."],
    ["E18", "Shaft, Slope, or Major Construction Spot Inspection", "Mine Act §103 / applicable standards", "Focused construction inspection for imminent danger, standards, plans, and previously issued violations."],
    ["E19", "Electrical Technical Investigation", "Applicable 30 CFR electrical standards", "Specialist investigation of electrical components, systems, surveys, protection, grounding, or other electrical compliance issues."],
    ["E20", "Roof Control Technical Investigation", "Applicable roof/ground-control requirements", "Engineering or in-depth investigation of roof-control problems or potential problems."],
    ["E21", "Ventilation Technical Investigation", "Applicable ventilation requirements", "Detailed investigation of ventilation systems, problems, surveys, or related technical questions."],
    ["E22", "Health Technical Investigation", "Applicable health standards", "Investigation of toxic substances or harmful physical agents; can include sampling and operator sampling programs."],
    ["E23", "Impoundment Spot Inspection", "Applicable impoundment standards / approved plans", "Inspection of an impoundment for imminent danger and compliance with approved plans and safety/health standards."],
    ["E24", "Other Technical Compliance Investigation", "Applicable Mine Act / 30 CFR authority", "Technical investigation that does not fit another technical event code."],
    ["E25", "Part 50 Audit", "30 CFR Part 50", "Audit of accident, injury, illness, employment, and related Part 50 records."],
    ["E26", "Other Contacts", "Administrative event code", "Industry/technical assistance and other contacts. MSHA’s current handbook expressly says this is not a mine inspection or investigation."],
    ["E27", "Attempted Inspection — Denial of Entry", "Mine Act §103(a) right of entry", "Mine visit intended for enforcement activity that did not occur because entry was directly or indirectly denied."],
    ["E28", "Mine Idle Activity", "Administrative event code", "Mine visit intended for enforcement activity that did not occur because the mine was not operating/available for the intended activity."]
  ];

  const links = [
    {label:"Mine Act §103 — inspections & investigations", type:"mine-act", ref:"§103", tone:"law"},
    {label:"Mine Act §104 — citations, orders & abatement", type:"mine-act", ref:"§104", tone:"law"},
    {label:"Mine Act §105 — procedures / discrimination", type:"mine-act", ref:"§105", tone:"law"},
    {label:"Mine Act §107 — imminent danger", type:"mine-act", ref:"§107", tone:"law"},
    {label:"Mine Act §110 — penalties / knowing or willful conduct", type:"mine-act", ref:"§110", tone:"law"},
    {label:"30 CFR Part 43 — hazardous-condition complaints", type:"cfr-search", ref:"Part 43", tone:"law"},
    {label:"30 CFR Part 50 — accidents, investigations & reporting", type:"cfr-search", ref:"Part 50", tone:"law"},
    {label:"MSHA General Inspection Procedures", type:"enforcement", ref:"General Inspection Procedures", tone:"msha"},
    {label:"Citation & Order Writing Handbook", type:"enforcement", ref:"Citation & Order Forms / Writing Handbook", tone:"msha"}
  ];

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      "#inspectionReadySection .ir-types-deep{margin:18px 0 4px;border:1px solid #b7dedd;border-left:5px solid var(--ir-teal);border-radius:15px;background:#fbfefe;overflow:hidden}" +
      "#inspectionReadySection .ir-types-deep>summary{list-style:none;cursor:pointer;padding:15px 16px;background:linear-gradient(90deg,var(--ir-teal-soft),#fff 40%);color:var(--ir-teal-strong);font-weight:900;line-height:1.35}" +
      "#inspectionReadySection .ir-types-deep>summary::-webkit-details-marker{display:none}" +
      "#inspectionReadySection .ir-types-deep>summary::after{content:'+';float:right;font-size:1.25rem;font-weight:900}" +
      "#inspectionReadySection .ir-types-deep[open]>summary::after{content:'−'}" +
      "#inspectionReadySection .ir-types-body{padding:16px}" +
      "#inspectionReadySection .ir-types-intro{margin:0 0 14px;color:var(--muted);line-height:1.55}" +
      "#inspectionReadySection .ir-types-note{margin:12px 0;padding:11px 13px;border-left:4px solid var(--ir-amber);background:var(--ir-amber-soft);line-height:1.5}" +
      "#inspectionReadySection .ir-types-section{margin-top:20px}" +
      "#inspectionReadySection .ir-types-section h4{margin:0 0 10px;font-size:1.04rem}" +
      "#inspectionReadySection .ir-type-card{margin:10px 0;border:1px solid #d8e4e6;border-radius:12px;background:#fff;overflow:hidden}" +
      "#inspectionReadySection .ir-type-card>summary{list-style:none;cursor:pointer;padding:12px 13px;font-weight:900;color:var(--ir-teal-strong);line-height:1.35}" +
      "#inspectionReadySection .ir-type-card>summary::-webkit-details-marker{display:none}" +
      "#inspectionReadySection .ir-type-card>summary::after{content:'+';float:right}" +
      "#inspectionReadySection .ir-type-card[open]>summary::after{content:'−'}" +
      "#inspectionReadySection .ir-type-code{display:inline-block;margin-right:7px;padding:2px 7px;border-radius:999px;background:#e9f8f7;color:#0b7374;font-size:.78rem}" +
      "#inspectionReadySection .ir-type-content{padding:0 13px 13px}" +
      "#inspectionReadySection .ir-type-content p{margin:8px 0;line-height:1.52}" +
      "#inspectionReadySection .ir-type-grid{display:grid;grid-template-columns:1fr;gap:8px}" +
      "#inspectionReadySection .ir-type-fact{padding:9px 10px;background:#f7fafc;border-left:3px solid #9dc9cb;line-height:1.45}" +
      "#inspectionReadySection .ir-special-grid{display:grid;gap:8px}" +
      "#inspectionReadySection .ir-special{padding:10px 11px;border:1px solid #dce5e8;border-radius:10px;background:#fff}" +
      "#inspectionReadySection .ir-special strong{display:block;color:var(--ir-teal-strong);line-height:1.35}" +
      "#inspectionReadySection .ir-special span{display:block;margin-top:3px;color:#526174;font-size:.84rem;font-weight:700}" +
      "#inspectionReadySection .ir-special p{margin:6px 0 0;line-height:1.45}" +
      "#inspectionReadySection .ir-arrival-list{margin:5px 0 0;padding-left:22px}" +
      "#inspectionReadySection .ir-arrival-list li{margin:7px 0;line-height:1.5}" +
      "#inspectionReadySection .ir-types-link-grid{display:grid;gap:8px;margin-top:9px}" +
      "#inspectionReadySection .ir-types-link{display:block;width:100%;text-align:left;border:1px solid var(--line);border-left:4px solid #0b84ff;border-radius:11px;padding:10px 11px;background:#fff;cursor:pointer;font:inherit;font-weight:800;color:#075ca8}" +
      "#inspectionReadySection .ir-types-link.msha{border-left-color:#6554c0;color:#5445a7}" +
      "#inspectionReadySection .ir-types-link::after{content:'  →';font-weight:900}" +
      "#inspectionReadySection .ir-official-links{display:grid;gap:7px;margin-top:9px}" +
      "#inspectionReadySection .ir-official-links a{display:block;padding:9px 10px;border:1px solid #dce5e8;border-radius:9px;background:#fff;font-weight:800}" +
      "#inspectionReadySection .ir-types-source{margin-top:14px;color:var(--muted);font-size:.78rem;line-height:1.4}" +
      "@media(max-width:600px){#inspectionReadySection .ir-types-deep{border-right:0;border-radius:0;background:transparent}#inspectionReadySection .ir-types-deep>summary{padding:13px 10px;background:linear-gradient(90deg,var(--ir-teal-soft),transparent 72%)}#inspectionReadySection .ir-types-body{padding:14px 10px 10px}}";
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
    document.querySelectorAll(".app-section").forEach(function(item){ item.classList.add("hidden"); });
    section.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    return true;
  }

  function retry(fn, tries) {
    let count = 0;
    const run = function() {
      if (fn()) return;
      count += 1;
      if (count < (tries || 35)) window.setTimeout(run, 100);
    };
    run();
  }

  function openMineAct(provision) {
    if (!showSection("mineActSection")) return;
    retry(function() {
      const cards = Array.from(document.querySelectorAll("#mineActSection .mine-act-provision"));
      const card = cards.find(function(item){
        const n = item.querySelector(".mine-act-section-number");
        return n && n.textContent.trim() === provision;
      });
      if (!card) return false;
      card.open = true;
      card.scrollIntoView({behavior:"smooth",block:"start"});
      return true;
    });
  }

  function openEnforcement(resourceTitle) {
    if (!showSection("mshaEnforcementSection")) return;
    retry(function() {
      const cards = Array.from(document.querySelectorAll("#mshaEnforcementSection details.enforcement-resource"));
      const card = cards.find(function(item){
        const n = item.querySelector("summary strong");
        return n && n.textContent.trim().includes(resourceTitle);
      });
      if (!card) return false;
      card.open = true;
      card.scrollIntoView({behavior:"smooth",block:"start"});
      return true;
    });
  }

  function openCfrSearch(query) {
    if (typeof window.showSection === "function") window.showSection("cfrSection");
    else showSection("cfrSection");
    retry(function() {
      const input = document.getElementById("searchBar");
      if (!input) return false;
      input.value = query;
      input.dispatchEvent(new Event("input",{bubbles:true}));
      input.focus({preventScroll:true});
      input.scrollIntoView({behavior:"smooth",block:"center"});
      return true;
    });
  }

  function activate(link) {
    if (link.type === "mine-act") return openMineAct(link.ref);
    if (link.type === "enforcement") return openEnforcement(link.ref);
    if (link.type === "cfr-search") return openCfrSearch(link.ref);
  }

  function build() {
    const details = document.createElement("details");
    details.className = "ir-types-deep";
    details.dataset.inspectionTypesDeepDive = "true";

    const summary = document.createElement("summary");
    summary.textContent = "Go Deeper — learn the types of MSHA inspections & investigations";
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "ir-types-body";
    body.innerHTML =
      '<p class="ir-types-intro"><strong>Start here if “MSHA is at the gate” is still too vague.</strong> The first skill is identifying what kind of MSHA activity is actually occurring, because a full E01 inspection, a §103(i) spot inspection, a hazard complaint, an accident investigation, a follow-up, and a §110 special investigation are not the same event.</p>' +
      '<div class="ir-types-note"><strong>Important terminology:</strong> “inspection” is often used casually for any MSHA visit. MSHA itself uses a broader event-code system covering inspections, investigations, emergency operations, audits, assistance visits, and other contacts. Learning the difference prevents bad assumptions about purpose and scope.</div>';

    const core = document.createElement("section");
    core.className = "ir-types-section";
    core.innerHTML = "<h4>The six inspection/investigation families to know first</h4>";
    coreTypes.forEach(function(item) {
      const card = document.createElement("details");
      card.className = "ir-type-card";
      const s = document.createElement("summary");
      s.innerHTML = '<span class="ir-type-code">' + item.code + '</span>' + item.title;
      card.appendChild(s);
      const c = document.createElement("div");
      c.className = "ir-type-content";
      c.innerHTML =
        "<p><strong>Plain English:</strong> " + item.plain + "</p>" +
        '<div class="ir-type-grid">' +
        '<div class="ir-type-fact"><strong>Authority:</strong> ' + item.authority + "</div>" +
        '<div class="ir-type-fact"><strong>Why it happens:</strong> ' + item.trigger + "</div>" +
        '<div class="ir-type-fact"><strong>Typical scope:</strong> ' + item.scope + "</div>" +
        '<div class="ir-type-fact"><strong>Frequency:</strong> ' + item.frequency + "</div>" +
        "</div>" +
        "<p><strong>Operator learning point:</strong> " + item.operator + "</p>";
      card.appendChild(c);
      core.appendChild(card);
    });
    body.appendChild(core);

    const firstMinute = document.createElement("section");
    firstMinute.className = "ir-types-section";
    firstMinute.innerHTML = "<h4>Your first 60 seconds: identify the event without interfering</h4>";
    const ul = document.createElement("ul");
    ul.className = "ir-arrival-list";
    [
      "Receive the inspector professionally and activate the mine’s normal MSHA notification/escort process.",
      "Confirm the purpose/type of activity: regular E01, §103(i) spot, complaint, accident/emergency, compliance follow-up, other spot, specialist/technical, audit, or special investigation.",
      "Record the inspector name(s), event number if provided, stated purpose, start time, and operator/miner-representative participation.",
      "If the event is a complaint, accident, follow-up, or technical investigation, do not assume the stated focus prevents MSHA from acting on other conditions observed under lawful authority.",
      "If you do not know an answer, verify it. Do not guess, improvise records, coach miners to give a script, or delay lawful inspection activity.",
      "Treat a §110(c)/(d) special investigation differently from a routine E01: preserve records and facts carefully and involve appropriate management/legal support because individual knowledge/conduct may be under investigation."
    ].forEach(function(text) {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    firstMinute.appendChild(ul);
    body.appendChild(firstMinute);

    const special = document.createElement("section");
    special.className = "ir-types-section";
    special.innerHTML = "<h4>Less-common and specialist MSHA activities you should still recognize</h4><p class=\"ir-types-intro\">You do not need to memorize every event code on day one. The goal is to recognize the category and know where to look next.</p>";
    const grid = document.createElement("div");
    grid.className = "ir-special-grid";
    specialty.forEach(function(row) {
      const div = document.createElement("div");
      div.className = "ir-special";
      div.innerHTML = "<strong>" + row[0] + " · " + row[1] + "</strong><span>" + row[2] + "</span><p>" + row[3] + "</p>";
      grid.appendChild(div);
    });
    special.appendChild(grid);
    body.appendChild(special);

    const clarification = document.createElement("section");
    clarification.className = "ir-types-section";
    clarification.innerHTML =
      "<h4>Three distinctions that prevent common beginner mistakes</h4>" +
      '<div class="ir-type-fact"><strong>§103(i) is not just “the gassy-mine inspection.”</strong> Gas liberation is one path, but qualifying ignition/explosion history and other especially hazardous conditions can also put a mine into the 5-working-day spot-inspection regime.</div>' +
      '<div class="ir-type-fact"><strong>A §110 investigation is real—but it is better called a special investigation, not a normal “110 inspection.”</strong> MSHA’s current E12 code covers possible knowing or willful violations under §110(c)/(d).</div>' +
      '<div class="ir-type-fact"><strong>“Impact inspection” describes an enhanced enforcement strategy, not a separate numbered Mine Act inspection section.</strong> The underlying inspection/investigation authority and event coding still matter.</div>';
    body.appendChild(clarification);

    const related = document.createElement("section");
    related.className = "ir-types-section";
    related.innerHTML = '<h4>Follow the authority / related SkyFire</h4><p class="ir-types-intro">Use these links to move from the learning summary into the law, current regulations, and inspector-facing procedure.</p>';
    const linkGrid = document.createElement("div");
    linkGrid.className = "ir-types-link-grid";
    links.forEach(function(link) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "ir-types-link " + (link.tone === "msha" ? "msha" : "law");
      button.textContent = link.label;
      button.addEventListener("click", function(){ activate(link); });
      linkGrid.appendChild(button);
    });
    related.appendChild(linkGrid);

    const official = document.createElement("div");
    official.className = "ir-official-links";
    [
      [COW_URL, "Official MSHA Citation & Order Writing Handbook — Appendix A event codes"],
      [GIP_URL, "Official MSHA General Inspection Procedures Handbook"],
      [COMPLAINT_URL, "Official MSHA Hazardous Condition Complaint Procedures Handbook"],
      [PART43_URL, "Current eCFR Part 43 — hazardous-condition complaints"],
      [PART50_URL, "Current eCFR Part 50 — accidents, investigations, reporting & records"]
    ].forEach(function(row) {
      const a = document.createElement("a");
      a.href = row[0];
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = row[1] + " →";
      official.appendChild(a);
    });
    related.appendChild(official);
    body.appendChild(related);

    const source = document.createElement("p");
    source.className = "ir-types-source";
    source.textContent = "Source checked " + SOURCE_CHECKED + ": Federal Mine Safety and Health Act §§103–110 as applicable; MSHA Citation & Order Writing Handbook PH25-I-1 Appendix A (current event-code taxonomy); General Inspection Procedures Handbook PH19-IV/V-1; Hazardous Condition Complaint Procedures Handbook PH20-I-2; current 30 CFR Parts 43 and 50.";
    body.appendChild(source);

    details.appendChild(body);
    return details;
  }

  function install() {
    const stage = document.querySelector("#inspectionReadySection #ir-stage-inspector-arrives");
    const body = stage && stage.querySelector(".ir-stage-body");
    if (!stage || !body) return false;
    if (body.querySelector('[data-inspection-types-deep-dive="true"]')) return true;
    ensureStyles();
    const sourceRow = body.querySelector(".ir-source-row");
    const deep = build();
    if (sourceRow) body.insertBefore(deep, sourceRow);
    else body.appendChild(deep);
    stage.dataset.inspectionTypesLearning = "true";
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
