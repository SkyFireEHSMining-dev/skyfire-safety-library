(function () {
  const STYLE_ID = "inspectionReadyLifecycleDepthV16Styles";
  const SOURCE_CHECKED = "September 18, 2026";
  const CONTEST_URL = "https://arlweb.msha.gov/SOLICITOR/FMSHRC/CONTEST/contest3.htm";
  const PENALTY_CONTEST_URL = "https://arlweb.msha.gov/SOLICITOR/FMSHRC/CONTEST/contest4.htm";
  const PART100_URL = "https://www.ecfr.gov/current/title-30/chapter-I/subchapter-P/part-100";

  const stageData = {
    "stay-ready": {
      summary: "Go Deeper — build an inspection-ready operating system",
      intro: "Inspection readiness is a normal operating condition, not a pre-inspection event. The strongest programs keep field conditions, records, training, written programs, and corrective actions aligned before MSHA arrives.",
      sections: [
        ["1. Applicability map", "Start with the rules that actually govern the operation. For a surface M/NM mine this can include Part 56, Part 46 or 48 training, Part 45 contractors, Part 47 HazCom, Part 50 reporting, Part 60 silica, Part 62 noise, and specialized requirements for blasting, hoisting, electrical systems, impoundments, and other site-specific systems.", "Readiness weakens when the mine relies on a generic checklist that does not match its actual equipment, processes, contractors, or training regime."],
        ["2. Field-condition control", "Working places, travelways, highwalls, mobile equipment, guards, electrical systems, fire protection, emergency equipment, and other active conditions should be managed through routine examinations, maintenance, supervision, and corrective action rather than inspection-driven cleanup.", "A strong record cannot compensate for a hazardous field condition. MSHA can compare records and programs with the condition actually observed."],
        ["3. Training and task competence", "Training records should match the work miners actually perform. The applicable Part 46 or Part 48 regime, task training, hazard training, annual refresher requirements, and trainer/qualified-person requirements should be understood before records are requested.", "Training readiness includes both the record and the miner’s ability to explain hazards, controls, and the task being performed."],
        ["4. Program-to-practice alignment", "Written programs such as HazCom, surface mobile equipment safety, respiratory protection, emergency procedures, and other required plans should describe how the operation actually works. Supervisors and miners should follow the same controls the written program describes.", "An outdated or unused written program can create a record-to-field inconsistency during an inspection."],
        ["5. Equipment and maintenance evidence", "Pre-operational examinations, defect reports, maintenance actions, removal-from-service decisions, and return-to-service decisions should connect logically. Specialized equipment records should be current where the standard requires them.", "Known defects and documented corrective actions can become important facts if the equipment condition is later inspected."],
        ["6. Health, chemical, and emergency readiness", "Silica, noise, hazardous chemicals, respiratory protection, medical surveillance where applicable, fire protection, evacuation, emergency contacts, first-response arrangements, and related records should be integrated into the normal safety system.", "Health compliance often depends on sampling, evaluations, controls, records, and follow-up that are not visible during a simple walkthrough."],
        ["7. Change control", "New equipment, new contractors, process changes, reopening activity, new regulatory requirements, and significant incidents should trigger a review of affected training, programs, examinations, records, and controls.", "Many inspection gaps begin when the operation changes but the safety system does not change with it."]
      ],
      practicesTitle: "Recommended readiness cadence",
      practices: [
        "Shift/daily: keep required examinations, equipment checks, hazard corrections, and active records current.",
        "Weekly: review unresolved hazards, maintenance holds, contractor changes, overdue corrective actions, and unusual operating conditions.",
        "Monthly/periodic: verify training status, required inspections/tests, emergency systems, HazCom/SDS changes, and specialized records.",
        "Change-triggered: reassess applicability when equipment, processes, contractors, staffing, or regulatory requirements change.",
        "Management review: compare the written program, the records, miner knowledge, and the field condition as one system."
      ],
      links: [
        ["Mine Act §103 — inspection authority","mine-act","§103","law","Complete-inspection authority and the general prohibition on advance notice."],
        ["30 CFR §56.18002 — workplace examinations","cfr-search","56.18002","law","Core field-condition and corrective-action control for surface M/NM work places."],
        ["30 CFR Parts 46 / 48 — training","cfr-search","Part 46 Part 48","law","Training regime, task training, refresher training, and related records."],
        ["30 CFR Part 47 — HazCom","cfr-search","Part 47","law","Written program, labels, SDS, information, and training."],
        ["30 CFR Part 50 — reporting & records","cfr-search","Part 50","law","Accident, injury, illness, investigation, and quarterly reporting duties."],
        ["30 CFR Part 56 Subpart T — surface mobile equipment","cfr-search","56.23000","law","Current surface mobile equipment safety-program requirements."],
        ["30 CFR Part 60 — respirable crystalline silica","cfr-search","Part 60","law","Current M/NM exposure, controls, records, respirator, and medical-surveillance duties."],
        ["MSHA General Inspection Procedures","enforcement","General Inspection Procedures","msha","Inspector-facing baseline for routine inspection activity."]
      ]
    },
    "opening-records": {
      summary: "Go Deeper — understand the records phase and what MSHA is testing",
      intro: "The records phase is not separate from the field inspection. Records can establish what the operator knew, what was examined, what training occurred, what hazards were identified, and what corrective action was taken.",
      sections: [
        ["1. Record families commonly reviewed", "Expect requests that can include legal identity, contractor information, training records, HazCom/SDS, Part 50 reports, workplace-examination records, equipment defect/maintenance records, fire and emergency records, health records, and specialized records that apply to the mine.", "The correct records set depends on applicability. A complete binder is not the goal; accurate, current, relevant records are."],
        ["2. Request control", "Use one internal point of control for document requests when practical. Record what was requested, what was produced, the date/time, and whether follow-up is still open. Keep originals controlled and provide copies or access in an orderly way.", "A simple request log reduces duplicate production, missed follow-up, and conflicting answers across shifts or departments."],
        ["3. Record integrity", "Do not backdate, recreate, or silently alter required records to make them appear contemporaneous. If a correction is legitimate, preserve the original history and follow the recordkeeping rule that applies.", "A questionable record can create a more serious problem than the underlying administrative gap."],
        ["4. Record-to-field consistency", "A workplace examination, defect report, training record, maintenance entry, sampling record, or written program can be compared with what the inspector sees and what miners say occurred.", "The strongest readiness state is consistency: the document, the field condition, and the people involved tell the same factual story."],
        ["5. Scope and relevance", "Produce records responsive to the lawful request and applicable authority. If a request is unclear, clarify what period, equipment, person, area, or record category is being requested rather than guessing.", "Clear scope improves accuracy without obstructing the inspection."],
        ["6. High-consequence records", "Part 50 accident records, training certifications, workplace examinations, exposure/sampling records, and records connected to known hazards or equipment defects deserve particular care because they can connect directly to statutory or regulatory duties.", "These records may influence both compliance findings and later enforcement analysis."]
      ],
      practicesTitle: "Records-phase operating practices",
      practices: [
        "Designate who receives and tracks document requests.",
        "Keep a copy or index of what was provided and when.",
        "Verify dates, signatures/certifications, retention periods, and applicability before producing a record.",
        "Separate known facts from assumptions; if a document must be located or a detail verified, say so and follow through.",
        "Escalate unusual requests involving privileged, highly sensitive, or legally significant material through appropriate management/legal channels without delaying lawful inspection activity."
      ],
      links: [
        ["Mine Act §103 — records & inspection authority","mine-act","§103","law","Statutory inspection, investigation, record, and right-of-entry framework."],
        ["30 CFR Part 41 — legal identity","cfr-search","Part 41","law","Operator legal identity information and changes."],
        ["30 CFR Part 45 — independent contractors","cfr-search","Part 45","law","Contractor identification and required information."],
        ["30 CFR Parts 46 / 48 — training records","cfr-search","Part 46 Part 48","law","Training plans, records, and certification requirements."],
        ["30 CFR Part 47 — HazCom / SDS","cfr-search","Part 47","law","Hazard communication records and information."],
        ["30 CFR Part 50 — accident / injury / illness records","cfr-search","Part 50","law","Reporting, investigation, and recordkeeping requirements."],
        ["30 CFR §56.18002 — workplace examination records","cfr-search","56.18002","law","Required record content, corrective-action dates, and retention."],
        ["30 CFR §56.14100 — equipment defect examinations","cfr-search","56.14100","law","Inspection and correction of safety defects on self-propelled mobile equipment."]
      ]
    },
    "ongoing-review": {
      summary: "Go Deeper — control a multi-day inspection without losing the thread",
      intro: "When an inspection continues across shifts or days, the operational challenge is continuity. Requests, field observations, corrections, sampling, enforcement documents, and normal safety duties all need to remain controlled.",
      sections: [
        ["1. Maintain an inspection event log", "Track inspectors present, areas visited, records requested/provided, samples or measurements taken, questions requiring follow-up, conditions corrected, citations/orders served, and commitments made.", "A contemporaneous log supports accurate shift handoffs and reduces reliance on memory after a long inspection."],
        ["2. Keep normal safety systems running", "Workplace examinations, training, maintenance, Part 50 reporting, contractor coordination, and other routine duties continue while MSHA is on site.", "Inspection activity should not create new compliance or safety gaps by diverting the people who normally control them."],
        ["3. Correct hazards and preserve facts", "Protect miners and correct hazardous conditions promptly when appropriate. Separately document what existed, when it was found, what interim controls were used, what was corrected, and who performed the work.", "Correction is not the same as erasing the factual history. Accurate before/after information can matter later."],
        ["4. Control open requests", "Assign an owner and due time to each unresolved document request, technical question, maintenance action, or inspection follow-up. Verify completion rather than assuming a handoff occurred.", "Uncontrolled open requests often become the most avoidable inspection-management failure."],
        ["5. Track sampling and technical work", "Noise, silica, ventilation, electrical testing, measurements, photographs, and other technical work may generate results after the physical observation occurs.", "A condition can remain operationally important even when the final analytical or enforcement result is still pending."],
        ["6. Manage enforcement documents immediately", "When a citation, order, modification, extension, or termination is served, capture the exact document number, standard/authority, condition described, affected area, abatement time, and any immediate withdrawal requirement.", "Do not rely on a later closeout meeting to reconstruct a document that already creates an obligation."]
      ],
      practicesTitle: "Daily inspection control loop",
      practices: [
        "Start-of-shift: confirm who is escorting, what is open from the prior shift/day, and which records or areas are still pending.",
        "During the shift: log requests, field issues, samples, and enforcement documents as they occur.",
        "Before a handoff: verify unresolved items, owners, deadlines, and any area/equipment restrictions.",
        "End-of-day: reconcile the internal log with documents received and work completed; preserve photos, notes, and records in a controlled location.",
        "Escalate immediately when an order restricts access, an abatement deadline is at risk, or the inspection shifts into accident, special-investigation, or other higher-consequence activity."
      ],
      links: [
        ["Mine Act §103 — inspection & investigation authority","mine-act","§103","law","Authority governing inspection activity and representative participation."],
        ["Mine Act §104 — citations, orders & abatement","mine-act","§104","law","Primary enforcement framework once violations are alleged."],
        ["30 CFR Part 50 — accident / investigation duties","cfr-search","Part 50","law","Use if an event during the inspection creates Part 50 obligations."],
        ["30 CFR Part 60 — health sampling context","cfr-search","Part 60","law","Current silica evaluation, sampling, control, and record requirements."],
        ["MSHA General Inspection Procedures","enforcement","General Inspection Procedures","msha","Procedural baseline for ongoing inspection documentation and activity."],
        ["Citation & Order Writing Handbook","enforcement","Citation & Order Forms / Writing Handbook","msha","How MSHA documents enforcement actions, modifications, and terminations."]
      ]
    },
    "closeout": {
      summary: "Go Deeper — close the inspection with a controlled action picture",
      intro: "The field portion can end while important issues remain open. Closeout should distinguish what is final, what is still pending, what must be abated, and what requires later follow-up.",
      sections: [
        ["1. Separate outcomes into categories", "Classify each item as no enforcement action, citation/order issued, abatement still open, sampling/technical result pending, document request pending, follow-up inspection expected, or other unresolved matter.", "Different outcomes create different next actions and timelines."],
        ["2. Capture every enforcement document exactly", "Record citation/order number, statutory or regulatory provision, condition or practice described, location, issuance date/time, affected area, abatement date/time, and any modification or termination.", "The official document controls. Internal summaries should never replace the actual citation or order."],
        ["3. Understand what is still pending", "Health samples, laboratory results, technical reviews, special investigations, Part 50 audits, or later penalty assessments may continue after the physical inspection ends.", "Do not treat the closeout conference as proof that every issue is complete."],
        ["4. Control abatement obligations", "Assign each abatement item to an accountable owner, verify the corrective action, preserve completion evidence, and monitor the deadline. If additional time may be necessary, address the issue with MSHA before the deadline rather than after it expires.", "A missed abatement deadline can create separate enforcement consequences under §104(b)."],
        ["5. Preserve the inspection record", "Retain the internal inspection log, records produced, photographs, sampling information, maintenance evidence, training information, correspondence, and enforcement documents under the mine’s document-control process.", "A clear factual record supports later conferencing, contest decisions, management review, and corrective action."],
        ["6. Conduct an internal learning review", "After immediate obligations are controlled, compare findings against the mine’s systems: examinations, maintenance, training, supervision, contractor controls, written programs, and management follow-up.", "The goal is not simply to close citations; it is to correct the system that allowed the condition or documentation gap to exist."]
      ],
      practicesTitle: "Closeout capture checklist",
      practices: [
        "All citations/orders/modifications/terminations received and indexed.",
        "Every abatement date/time assigned to an owner.",
        "Pending samples, technical reviews, document requests, and follow-up items listed separately.",
        "Areas/equipment subject to withdrawal or restriction clearly communicated to affected personnel.",
        "Internal notes distinguish observed facts from legal opinions or contest strategy.",
        "Management receives a concise summary of immediate obligations, pending items, and system-level corrective actions."
      ],
      links: [
        ["Mine Act §104 — citations, orders & abatement","mine-act","§104","law","Primary statutory framework for citations and several withdrawal orders."],
        ["Mine Act §105 — enforcement procedure","mine-act","§105","law","Penalty notice and formal contest framework."],
        ["Mine Act §107 — imminent danger","mine-act","§107","law","Separate imminent-danger withdrawal authority."],
        ["30 CFR Part 100 — penalties & safety/health conference","cfr-search","Part 100","law","Pre-penalty conference and civil-penalty procedures."],
        ["Citation & Order Writing Handbook","enforcement","Citation & Order Forms / Writing Handbook","msha","Inspector-facing rules for enforcement documents, modifications, extensions, and terminations."]
      ]
    },
    "citation-fork": {
      summary: "Go Deeper — identify the enforcement document and its immediate consequences",
      intro: "A citation or order should be read in two layers: first, what must be done immediately to protect miners and comply with the document; second, what review, conference, contest, or penalty process may follow.",
      sections: [
        ["1. §104(a) citation", "The basic Mine Act citation. MSHA alleges a violation of the Act, a mandatory standard, rule, order, or regulation and sets a reasonable abatement time.", "The immediate operator task is to understand the alleged condition and cited authority, protect miners, and complete effective abatement by the required time."],
        ["2. §104(b) failure-to-abate order", "If a previously cited violation is not totally abated within the allowed time and further extension is not warranted, MSHA issues a withdrawal order for the affected area or equipment until abatement is completed.", "This is a withdrawal order tied to failure to abate, not a new description of the original violation."],
        ["3. §104(d)(1) citation and unwarrantable-failure chain", "A §104(d)(1) citation includes findings that a mandatory-standard violation is S&S and caused by the operator’s unwarrantable failure. Another unwarrantable-failure violation during the same inspection or within the statutory 90-day period can trigger a §104(d)(1) withdrawal order; subsequent unwarrantable-failure findings can continue the order chain under §104(d)(2) until the statutory reset condition is met.", "These findings carry consequences beyond an ordinary §104(a) citation. SkyFire explains the statutory structure but does not independently decide whether S&S or unwarrantable failure exists."],
        ["4. §104(g)(1) untrained-miner withdrawal order", "MSHA uses §104(g)(1) to withdraw miners who have not received required training under §115 and the applicable Part 46 or Part 48 provisions. The order remains in effect for the affected miner until the required training is received.", "Training-plan or recordkeeping defects are not automatically the same as an untrained-miner withdrawal situation; the applicable training facts matter."],
        ["5. §107(a) imminent-danger order", "When an inspector finds an imminent danger, §107(a) requires withdrawal of persons from the affected area, subject to statutory exceptions, until the imminent danger and the conditions or practices causing it no longer exist.", "Imminent danger is a separate statutory finding focused on immediate protection from death or serious physical harm before the condition can be abated."],
        ["6. §104(e) pattern-of-violations orders", "After the statutory pattern process is triggered, qualifying S&S violations can produce withdrawal orders under §104(e).", "POV is a specialized enforcement track and should be handled with careful reference to the current Mine Act, applicable procedures, and qualified legal guidance."],
        ["7. §103(k) accident-control orders", "During an accident, an authorized representative may issue orders under §103(k) to protect persons and control recovery or return-to-normal activities in the affected area.", "A §103(k) order arises from accident-control authority rather than the ordinary §104 citation sequence."]
      ],
      practicesTitle: "Immediate document review",
      practices: [
        "Read the exact section/standard cited and the condition or practice described.",
        "Identify whether the document is a citation, withdrawal order, modification, extension, or termination.",
        "Confirm the affected area/equipment and whether miners must be withdrawn.",
        "Capture the abatement date/time and assign the corrective action immediately.",
        "Preserve relevant records, photographs, measurements, statements, and maintenance/training evidence.",
        "Do not alter facts or create records after the event to improve the appearance of the file.",
        "If the operator disagrees, separate safety/abatement obligations from later conference or contest strategy."
      ],
      links: [
        ["Mine Act §104 — citation/order framework","mine-act","§104","law","§104(a), §104(b), §104(d), §104(e), and §104(g) enforcement structure."],
        ["Mine Act §105 — enforcement procedure","mine-act","§105","law","Penalty notice and formal contest framework."],
        ["Mine Act §107 — imminent danger","mine-act","§107","law","Imminent-danger withdrawal authority."],
        ["Mine Act §110 — penalties & individual liability","mine-act","§110","law","Civil/criminal penalty and individual-liability framework."],
        ["30 CFR Part 100 — conference & civil penalties","cfr-search","Part 100","law","Includes the safety and health conference process and penalty procedures."],
        ["30 CFR Parts 46 / 48 — training","cfr-search","Part 46 Part 48","law","Relevant to §104(g)(1) untrained-miner orders."],
        ["Citation & Order Writing Handbook","enforcement","Citation & Order Forms / Writing Handbook","msha","Current inspector-facing enforcement-document guidance."]
      ],
      official: [
        [PART100_URL,"Current eCFR Part 100 — civil penalties and conference procedures"],
        [CONTEST_URL,"Official contest path — citations and orders"],
        [PENALTY_CONTEST_URL,"Official contest path — proposed penalties"]
      ],
      timing: "Current MSHA guidance generally provides 10 calendar days from issuance/notification to submit additional information or request a safety and health conference under 30 CFR §100.6. Formal citation/order contests and proposed-penalty contests have separate 30-day windows under the Mine Act and Commission procedures. These are legal deadlines; verify the current rule and the document served."
    }
  };

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent =
      "#inspectionReadySection .ir-life-deep{margin:18px 0 4px;border:1px solid #b7dedd;border-left:5px solid var(--ir-teal);border-radius:15px;background:#fbfefe;overflow:hidden}" +
      "#inspectionReadySection .ir-life-deep>summary{list-style:none;cursor:pointer;padding:15px 16px;background:linear-gradient(90deg,var(--ir-teal-soft),#fff 40%);color:var(--ir-teal-strong);font-weight:900;line-height:1.35}" +
      "#inspectionReadySection .ir-life-deep>summary::-webkit-details-marker{display:none}" +
      "#inspectionReadySection .ir-life-deep>summary::after{content:'+';float:right;font-size:1.25rem;font-weight:900}" +
      "#inspectionReadySection .ir-life-deep[open]>summary::after{content:'−'}" +
      "#inspectionReadySection .ir-life-body{padding:16px}" +
      "#inspectionReadySection .ir-life-intro{margin:0 0 15px;color:var(--muted);line-height:1.55}" +
      "#inspectionReadySection .ir-life-section{margin:18px 0 0}" +
      "#inspectionReadySection .ir-life-section>h4{margin:0 0 9px;color:var(--text);font-size:1.02rem}" +
      "#inspectionReadySection .ir-life-track{padding:12px 0;border-top:1px solid #d9e8e8}" +
      "#inspectionReadySection .ir-life-track:first-of-type{border-top:0;padding-top:0}" +
      "#inspectionReadySection .ir-life-track h5{margin:0 0 5px;color:var(--ir-teal-strong);font-size:.98rem;line-height:1.35}" +
      "#inspectionReadySection .ir-life-track p{margin:0;color:var(--text);line-height:1.55}" +
      "#inspectionReadySection .ir-life-why{margin-top:7px!important;padding:8px 10px;border-left:3px solid #8ecfcd;background:#f2fbfa;color:#415164!important}" +
      "#inspectionReadySection .ir-life-list{margin:5px 0 0;padding-left:22px}" +
      "#inspectionReadySection .ir-life-list li{margin:7px 0;line-height:1.5}" +
      "#inspectionReadySection .ir-life-link-grid{display:grid;gap:9px;margin-top:10px}" +
      "#inspectionReadySection .ir-life-link{display:block;width:100%;text-align:left;border:1px solid var(--line);border-left:4px solid #0b84ff;border-radius:11px;padding:11px 12px;background:#fff;cursor:pointer;font:inherit;color:var(--text)}" +
      "#inspectionReadySection .ir-life-link.msha{border-left-color:#6554c0}" +
      "#inspectionReadySection .ir-life-link strong{display:block;color:#075ca8;line-height:1.35}" +
      "#inspectionReadySection .ir-life-link.msha strong{color:#5445a7}" +
      "#inspectionReadySection .ir-life-link span{display:block;margin-top:4px;color:var(--muted);font-size:.84rem;line-height:1.4}" +
      "#inspectionReadySection .ir-life-link strong::after{content:'  →';font-weight:900}" +
      "#inspectionReadySection .ir-life-official{display:grid;gap:7px;margin-top:10px}" +
      "#inspectionReadySection .ir-life-official a{display:block;padding:9px 10px;border:1px solid #dce5e8;border-radius:9px;background:#fff;font-weight:800}" +
      "#inspectionReadySection .ir-life-caution{margin-top:16px;padding:11px 13px;border-left:4px solid var(--ir-amber);background:var(--ir-amber-soft);line-height:1.5}" +
      "#inspectionReadySection .ir-life-source{margin-top:13px;color:var(--muted);font-size:.78rem;line-height:1.4}" +
      "@media(max-width:600px){#inspectionReadySection .ir-life-deep{border-right:0;border-radius:0;background:transparent}#inspectionReadySection .ir-life-deep>summary{padding:13px 10px;background:linear-gradient(90deg,var(--ir-teal-soft),transparent 72%)}#inspectionReadySection .ir-life-body{padding:14px 10px 10px}}";
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
    document.querySelectorAll(".app-section").forEach(function(item){item.classList.add("hidden");});
    section.classList.remove("hidden");
    window.scrollTo({top:0,behavior:"smooth"});
    return true;
  }

  function retry(fn, tries) {
    let count = 0;
    const run = function() {
      if (fn()) return;
      count += 1;
      if (count < (tries || 35)) window.setTimeout(run,100);
    };
    run();
  }

  function openMineAct(provision) {
    if (!showSection("mineActSection")) return;
    retry(function() {
      const cards = Array.from(document.querySelectorAll("#mineActSection .mine-act-provision"));
      const card = cards.find(function(item){return item.querySelector(".mine-act-section-number")?.textContent.trim() === provision;});
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
      const card = cards.find(function(item){return item.querySelector("summary strong")?.textContent.trim().includes(resourceTitle);});
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
    const type = link[1], ref = link[2];
    if (type === "mine-act") return openMineAct(ref);
    if (type === "enforcement") return openEnforcement(ref);
    if (type === "cfr-search") return openCfrSearch(ref);
  }

  function makeList(items) {
    const ul = document.createElement("ul");
    ul.className = "ir-life-list";
    items.forEach(function(txt){const li=document.createElement("li");li.textContent=txt;ul.appendChild(li);});
    return ul;
  }

  function build(stageId,data) {
    const details=document.createElement("details");
    details.className="ir-life-deep";
    details.dataset.lifecycleDeepDive=stageId;
    const summary=document.createElement("summary");
    summary.textContent=data.summary;
    details.appendChild(summary);

    const body=document.createElement("div");
    body.className="ir-life-body";
    body.innerHTML='<p class="ir-life-intro">'+data.intro+'</p>';

    const concepts=document.createElement("section");
    concepts.className="ir-life-section";
    concepts.innerHTML="<h4>Core concepts</h4>";
    data.sections.forEach(function(row){
      const article=document.createElement("article");
      article.className="ir-life-track";
      article.innerHTML="<h5>"+row[0]+"</h5><p>"+row[1]+'</p><p class="ir-life-why"><strong>Why this matters:</strong> '+row[2]+"</p>";
      concepts.appendChild(article);
    });
    body.appendChild(concepts);

    const practices=document.createElement("section");
    practices.className="ir-life-section";
    practices.innerHTML="<h4>"+data.practicesTitle+"</h4>";
    practices.appendChild(makeList(data.practices));
    body.appendChild(practices);

    const links=document.createElement("section");
    links.className="ir-life-section";
    links.innerHTML="<h4>Follow the authority / related SkyFire</h4>";
    const grid=document.createElement("div");
    grid.className="ir-life-link-grid";
    data.links.forEach(function(link){
      const button=document.createElement("button");
      button.type="button";
      button.className="ir-life-link "+(link[3]==="msha"?"msha":"law");
      button.innerHTML="<strong>"+link[0]+"</strong><span>"+link[4]+"</span>";
      button.addEventListener("click",function(){activate(link);});
      grid.appendChild(button);
    });
    links.appendChild(grid);

    if(data.official){
      const official=document.createElement("div");
      official.className="ir-life-official";
      data.official.forEach(function(row){
        const a=document.createElement("a");
        a.href=row[0];a.target="_blank";a.rel="noopener";a.textContent=row[1]+" →";official.appendChild(a);
      });
      links.appendChild(official);
    }
    body.appendChild(links);

    if(data.timing){
      const caution=document.createElement("div");
      caution.className="ir-life-caution";
      caution.innerHTML="<strong>Timing note:</strong> "+data.timing;
      body.appendChild(caution);
    }

    const source=document.createElement("p");
    source.className="ir-life-source";
    source.textContent="Source checked "+SOURCE_CHECKED+": Federal Mine Safety and Health Act; current 30 CFR as linked; MSHA General Inspection Procedures Handbook PH19-IV/V-1; MSHA Citation & Order Writing Handbook PH25-I-1. Current requirements control where older procedural guidance and current regulations differ.";
    body.appendChild(source);

    details.appendChild(body);
    return details;
  }

  function installStage(stageId,data){
    const stage=document.querySelector("#inspectionReadySection #ir-stage-"+stageId);
    const body=stage?.querySelector(".ir-stage-body");
    if(!stage||!body)return false;
    if(body.querySelector('[data-lifecycle-deep-dive="'+stageId+'"]'))return true;
    const sourceRow=body.querySelector(".ir-source-row");
    const deep=build(stageId,data);
    if(sourceRow)body.insertBefore(deep,sourceRow);else body.appendChild(deep);
    return true;
  }

  function install(){
    ensureStyles();
    let complete=true;
    Object.entries(stageData).forEach(function(entry){if(!installStage(entry[0],entry[1]))complete=false;});
    if(complete)window.SkyFireInspectionReadyLifecycleDepthV16={sourceChecked:SOURCE_CHECKED,stages:Object.keys(stageData)};
    return complete;
  }

  let tries=0;
  function start(){if(install())return;tries+=1;if(tries<180)window.setTimeout(start,100);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();