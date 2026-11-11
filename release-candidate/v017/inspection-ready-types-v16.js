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
      operator: "Confirm why the mine is in §103(i) status and what hazard or condition defines the spot-inspection scope. The triggering basis controls the inspection focus and required frequency."
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
    {
      code: "E05",
      title: "§108 Injunctive Action / Other Special Investigation",
      authority: "Mine Act §108",
      plain: "Special-investigation activity conducted under §108 involving injunctive action or another special-investigation purpose.",
      trigger: "Facts indicate that court-ordered relief or another §108-related enforcement response may be necessary, or the matter has been assigned as another special investigation.",
      scope: "The conduct, records, statements, and conditions relevant to the alleged interference, prohibited conduct, or other basis for the special investigation.",
      frequency: "Case-driven.",
      operator: "Preserve relevant records and facts, avoid altering or reconstructing evidence, and involve appropriate management/legal support because the matter can extend beyond routine field compliance."
    },
    {
      code: "E10",
      title: "Petition for Modification Investigation",
      authority: "Mine Act §101(c)/(d); 30 CFR Part 44",
      plain: "Investigation supporting a petition to modify how a mandatory safety standard applies at a mine.",
      trigger: "A petition for modification requests an alternative method or other relief allowed by the Mine Act and Part 44.",
      scope: "Mine conditions, equipment, mining methods, proposed alternatives, engineering or technical support, and the protection provided to affected miners.",
      frequency: "Case-driven by a petition for modification.",
      operator: "Be prepared to explain the existing condition, the requested modification, the alternative method, and the basis for concluding that miner protection is maintained as required."
    },
    {
      code: "E11",
      title: "Section 105(c) Discrimination Investigation",
      authority: "Mine Act §105(c)",
      plain: "Investigation of alleged discrimination or interference involving protected miner activity.",
      trigger: "A miner, representative, or applicant alleges retaliation, discrimination, or interference connected to rights protected by §105(c).",
      scope: "Protected activity, employment or other adverse action, timing, communications, personnel records, witness accounts, and related facts.",
      frequency: "Complaint/case-driven.",
      operator: "Preserve relevant employment and communication records, avoid retaliation or interference, and involve appropriate management/legal support while allowing the investigation to proceed."
    },
    {
      code: "E12",
      title: "Sections 110(c)/(d) Knowing or Willful Violation Investigation",
      authority: "Mine Act §110(c)/(d)",
      plain: "Special investigation into possible knowing or willful conduct associated with Mine Act violations, citations, or orders.",
      trigger: "MSHA identifies facts suggesting that individual knowledge, authorization, ordering, or willful conduct may require investigation under §110(c) or §110(d).",
      scope: "The underlying violation plus evidence of who knew what, when they knew it, what authority they exercised, what actions they directed or carried out, and the records or statements supporting those facts.",
      frequency: "Case-driven; separate from routine E01 inspection scheduling.",
      operator: "Preserve records and facts carefully, avoid speculation or coordinated witness scripting, and involve appropriate management/legal support because individual conduct may be examined."
    },
    {
      code: "E13",
      title: "Re-opening Inspection — Coal only",
      authority: "MSHA E13 event code; applicable Mine Act and 30 CFR requirements",
      plain: "Non-penalty inspection of an entire coal mine after abandonment or inactive status when the mine is reopening.",
      trigger: "A coal mine returns to operation after an abandonment or inactive period covered by the reopening process.",
      scope: "The mine as a whole, with attention to conditions, systems, plans, equipment, records, and other requirements relevant to safe resumption of operations.",
      frequency: "Event-driven when a qualifying coal mine reopens.",
      operator: "Treat reopening as a full operational-readiness event: verify mine status, required plans/notifications, training, examinations, equipment, and field conditions before production resumes."
    },
    {
      code: "E14",
      title: "Compliance Assistance Visit — M/NM only",
      authority: "MSHA E14 event code; applicable Mine Act and 30 CFR requirements",
      plain: "Compliance-assistance visit for a new or reopening metal/nonmetal mine, new facility, or new equipment installation.",
      trigger: "A qualifying M/NM operation, facility, or installation is entering service and MSHA conducts an assistance-oriented visit.",
      scope: "Potential compliance issues associated with the new/reopening operation, facility, or equipment installation.",
      frequency: "Event-driven.",
      operator: "Use the visit to identify and correct gaps early. Keep the assistance purpose distinct from later enforcement activity and document corrective actions taken."
    },
    {
      code: "E17",
      title: "Special Emphasis Program",
      authority: "Mine Act §103 and program-specific authority",
      plain: "Inspection or investigation activity conducted under a defined MSHA special-emphasis initiative.",
      trigger: "MSHA establishes an agency, program-area, district, or mine-type emphasis on a particular hazard, condition, equipment class, practice, or compliance concern.",
      scope: "Defined by the special-emphasis program; it may focus on a particular hazard while other violations observed under lawful authority can still be addressed.",
      frequency: "Program-driven.",
      operator: "Identify the program focus, review the standards and controls that govern that hazard, and ensure field practices and records align before the inspection reaches the affected work."
    },
    {
      code: "E18",
      title: "Shaft, Slope, or Major Construction Spot Inspection",
      authority: "Mine Act §103; applicable 30 CFR standards and approved plans",
      plain: "Focused inspection of shaft, slope, or other major mine-construction activity.",
      trigger: "Major construction work requires focused inspection for hazards, compliance, plan requirements, or previously identified conditions.",
      scope: "Construction area, work methods, ground/roof conditions, equipment, electrical and hoisting systems, plans, and other requirements applicable to the project.",
      frequency: "As needed during qualifying construction activity.",
      operator: "Keep the controlling plans, contractor responsibilities, examinations, task training, equipment controls, and construction-specific hazards aligned with field conditions."
    },
    {
      code: "E19",
      title: "Electrical Technical Investigation",
      authority: "Mine Act §103; applicable 30 CFR electrical standards",
      plain: "Specialist technical investigation of electrical systems or electrical compliance issues.",
      trigger: "An electrical condition, system, survey, incident, or technical question requires specialist review.",
      scope: "Power systems, protection, grounding, circuit components, installations, testing/survey information, maintenance records, and related work practices as applicable.",
      frequency: "Need-driven.",
      operator: "Have knowledgeable electrical personnel and relevant diagrams, test results, maintenance information, and procedures available; distinguish verified measurements from assumptions."
    },
    {
      code: "E20",
      title: "Roof Control Technical Investigation",
      authority: "Mine Act §103; applicable roof/ground-control standards and plans",
      plain: "Engineering or in-depth investigation of roof- or ground-control conditions and systems.",
      trigger: "A roof/ground-control problem, plan issue, changing condition, incident, or technical concern requires focused review.",
      scope: "Geologic conditions, support systems, examinations, installed controls, plan provisions, measurements, prior conditions, and related work practices.",
      frequency: "Need-driven.",
      operator: "Provide the controlling plan and field history, involve personnel who understand the ground-control system, and make sure current field conditions match the assumptions and controls in the plan."
    },
    {
      code: "E21",
      title: "Ventilation Technical Investigation",
      authority: "Mine Act §103; applicable ventilation standards and approved plans",
      plain: "Detailed technical investigation of mine ventilation systems, conditions, or compliance questions.",
      trigger: "A ventilation problem, plan issue, survey result, incident, or technical concern requires focused review.",
      scope: "Air quantities and direction, controls, fans, examinations, gas or contaminant conditions, surveys, approved plan provisions, and related records as applicable.",
      frequency: "Need-driven.",
      operator: "Have current ventilation information, measurements, plans, examination records, and knowledgeable personnel available; verify current conditions rather than relying on historical assumptions."
    },
    {
      code: "E22",
      title: "Health Technical Investigation",
      authority: "Mine Act §103; applicable MSHA health standards",
      plain: "Technical investigation of toxic substances, harmful physical agents, exposure conditions, or operator health programs.",
      trigger: "Sampling results, complaints, observed conditions, health trends, or other technical concerns require focused health investigation.",
      scope: "Exposure sources, sampling, controls, respiratory protection, medical surveillance where applicable, records, work practices, and operator sampling/evaluation programs.",
      frequency: "Need-driven.",
      operator: "Know the exposure source, who may be exposed, current sampling/evaluation data, controls, records, and follow-up actions. Health compliance often depends on evidence that is not visible during a walkthrough."
    },
    {
      code: "E23",
      title: "Impoundment Spot Inspection",
      authority: "Mine Act §103; applicable impoundment standards and approved plans",
      plain: "Focused inspection of an impoundment and the controls intended to keep it safe.",
      trigger: "Routine or condition-driven need to evaluate an impoundment, its performance, or compliance with applicable plans and standards.",
      scope: "Impoundment condition, instrumentation/observations, examinations, construction/maintenance, water levels, drainage, emergency considerations, records, and approved plans as applicable.",
      frequency: "As required or condition-driven.",
      operator: "Keep inspection/examination records, current plan information, monitoring data, corrective actions, and knowledgeable personnel available; escalating conditions should be treated as operational hazards, not paperwork issues."
    },
    {
      code: "E24",
      title: "Other Technical Compliance Investigation",
      authority: "Mine Act §103; applicable Mine Act / 30 CFR authority",
      plain: "Technical compliance investigation that does not fit one of MSHA’s more specific technical event codes.",
      trigger: "A specialized technical issue requires investigation and no more specific technical activity code applies.",
      scope: "Defined by the technical issue, applicable standards, evidence, records, and conditions being evaluated.",
      frequency: "Need-driven.",
      operator: "Clarify the technical subject and applicable standards, identify the people and records that can accurately explain the system, and avoid treating a specialist investigation as a routine paperwork review."
    },
    {
      code: "E25",
      title: "Part 50 Audit",
      authority: "30 CFR Part 50; Mine Act §103",
      plain: "Audit of accident, injury, illness, employment, production, and related Part 50 reporting/recordkeeping information.",
      trigger: "MSHA audits Part 50 records and supporting information for accuracy, completeness, and proper classification/reporting.",
      scope: "Forms 7000-1 and 7000-2, accident/injury/illness records, employment and production information, and other supporting records needed to verify Part 50 reporting.",
      frequency: "Audit/selection-driven.",
      operator: "Make sure filed Part 50 information can be reconciled to supporting records and that reportability/classification decisions are documented consistently."
    },
    {
      code: "E26",
      title: "Other Contacts",
      authority: "Administrative MSHA event code",
      plain: "Industry or technical-assistance contact that MSHA records separately from a mine inspection or investigation.",
      trigger: "A contact or assistance activity occurs that does not qualify as an inspection/investigation event.",
      scope: "Defined by the purpose of the contact.",
      frequency: "As needed.",
      operator: "Clarify the purpose of the contact and document any follow-up commitment or separate enforcement activity if one is opened."
    },
    {
      code: "E27",
      title: "Attempted Inspection — Denial of Entry",
      authority: "Mine Act §103(a) right of entry; §108 remedies may become relevant",
      plain: "MSHA intended to conduct enforcement activity but did not complete the intended inspection because entry was directly or indirectly denied.",
      trigger: "The inspector concludes that access needed for the intended enforcement activity has been denied or obstructed.",
      scope: "The attempted entry, communications, circumstances of the denial, and the intended inspection activity.",
      frequency: "Event-driven.",
      operator: "Do not obstruct lawful MSHA access. If an access dispute arises, elevate it immediately through management/legal channels while accurately documenting what was requested, what occurred, and why."
    },
    {
      code: "E28",
      title: "Mine Idle Activity",
      authority: "Administrative MSHA event code",
      plain: "MSHA intended enforcement activity but the mine was not operating or otherwise available for the intended activity.",
      trigger: "The mine is idle when MSHA arrives for planned enforcement activity.",
      scope: "Administrative documentation of the attempted activity and mine status.",
      frequency: "Event-driven.",
      operator: "Keep mine operating-status information accurate and address any required notification or reopening steps before operations resume."
    }
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
      '<p class="ir-types-intro"><strong>MSHA activities differ in purpose, scope, and authority.</strong> A full E01 inspection, a §103(i) spot inspection, a hazard complaint, an accident investigation, a compliance follow-up, and a §110 special investigation are distinct activities and should be recognized as such.</p>' +
      '<div class="ir-types-note"><strong>MSHA event terminology:</strong> MSHA’s event-code system distinguishes inspections, investigations, emergency operations, audits, assistance visits, and other contacts. The event type helps define the purpose and expected scope of the activity.</div>';

    const core = document.createElement("section");
    core.className = "ir-types-section";
    core.innerHTML = "<h4>Primary inspection and investigation families</h4>";
    coreTypes.forEach(function(item) {
      const card = document.createElement("details");
      card.className = "ir-type-card";
      const s = document.createElement("summary");
      s.innerHTML = '<span class="ir-type-code">' + item.code + '</span>' + item.title;
      card.appendChild(s);
      const c = document.createElement("div");
      c.className = "ir-type-content";
      c.innerHTML =
        "<p><strong>What it is:</strong> " + item.plain + "</p>" +
        '<div class="ir-type-grid">' +
        '<div class="ir-type-fact"><strong>Authority:</strong> ' + item.authority + "</div>" +
        '<div class="ir-type-fact"><strong>Trigger / purpose:</strong> ' + item.trigger + "</div>" +
        '<div class="ir-type-fact"><strong>Typical scope:</strong> ' + item.scope + "</div>" +
        '<div class="ir-type-fact"><strong>Frequency:</strong> ' + item.frequency + "</div>" +
        "</div>" +
        "<p><strong>Operator considerations:</strong> " + item.operator + "</p>";
      card.appendChild(c);
      core.appendChild(card);
    });
    body.appendChild(core);

    const firstMinute = document.createElement("section");
    firstMinute.className = "ir-types-section";
    firstMinute.innerHTML = "<h4>Initial response: identify the event without interfering</h4>";
    const ul = document.createElement("ul");
    ul.className = "ir-arrival-list";
    [
      "Receive the inspector professionally and activate the mine’s normal MSHA notification/escort process.",
      "Confirm the purpose/type of activity: regular E01, §103(i) spot, complaint, accident/emergency, compliance follow-up, other spot, specialist/technical, audit, or special investigation.",
      "Record the inspector name(s), event number if provided, stated purpose, start time, and operator/miner-representative participation.",
      "If the event is a complaint, accident, follow-up, or technical investigation, do not assume the stated focus prevents MSHA from acting on other conditions observed under lawful authority.",
      "If you do not know an answer, verify it. Do not guess, improvise records, coach miners to give a script, or delay lawful inspection activity.",
      "If the activity is a §110(c)/(d) special investigation, preserve relevant records and facts and involve appropriate management/legal support; individual knowledge or conduct may be examined."
    ].forEach(function(text) {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    firstMinute.appendChild(ul);
    body.appendChild(firstMinute);

    const special = document.createElement("section");
    special.className = "ir-types-section";
    special.innerHTML = "<h4>Special investigations, technical investigations, audits, and other MSHA activities</h4><p class=\"ir-types-intro\">These event codes cover activities outside the primary inspection families. Expand an item for its authority, trigger, scope, frequency, and operator considerations.</p>";
    const grid = document.createElement("div");
    grid.className = "ir-special-grid";
    specialty.forEach(function(item) {
      const card = document.createElement("details");
      card.className = "ir-type-card ir-special-card";
      const s = document.createElement("summary");
      s.innerHTML = '<span class="ir-type-code">' + item.code + '</span>' + item.title;
      card.appendChild(s);
      const c = document.createElement("div");
      c.className = "ir-type-content";
      c.innerHTML =
        "<p><strong>What it is:</strong> " + item.plain + "</p>" +
        '<div class="ir-type-grid">' +
        '<div class="ir-type-fact"><strong>Authority:</strong> ' + item.authority + "</div>" +
        '<div class="ir-type-fact"><strong>Trigger / purpose:</strong> ' + item.trigger + "</div>" +
        '<div class="ir-type-fact"><strong>Typical scope:</strong> ' + item.scope + "</div>" +
        '<div class="ir-type-fact"><strong>Frequency:</strong> ' + item.frequency + "</div>" +
        "</div>" +
        "<p><strong>Operator considerations:</strong> " + item.operator + "</p>";
      card.appendChild(c);
      grid.appendChild(card);
    });
    special.appendChild(grid);
    body.appendChild(special);

    const clarification = document.createElement("section");
    clarification.className = "ir-types-section";
    clarification.innerHTML =
      "<h4>Key distinctions in MSHA event terminology</h4>" +
      '<div class="ir-type-fact"><strong>Section 103(i) spot inspections can arise from several statutory triggers.</strong> Methane or other explosive-gas liberation is one basis; qualifying gas ignition/explosion history and other especially hazardous conditions can also place a mine in the §103(i) spot-inspection regime.</div>' +
      '<div class="ir-type-fact"><strong>E12 is the event code for §110(c)/(d) knowing or willful violation investigations.</strong> It is a special-investigation activity distinct from a routine E01 safety and health inspection.</div>' +
      '<div class="ir-type-fact"><strong>Impact inspections are an enhanced-enforcement strategy rather than a separate numbered Mine Act inspection section.</strong> The underlying statutory authority, inspection/investigation type, and event coding still control the activity.</div>';
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
