(function(){
  const SOURCE_CHECKED="September 18, 2026";
  const POSTER_URL="./docs/SkyFire-Part-50-Decision-Tree-v0.16.html";
  const PART50_URL="https://www.ecfr.gov/current/title-30/chapter-I/subchapter-I/part-50";
  const FORM7000_URL="https://www.msha.gov/sites/default/files/Support_Resources/Forms/MSHA%207000-1.pdf";
  const PHONE="1-800-746-1553";
  let tries=0;

  const accidents=[
    {n:1,title:"Death at a mine",exact:"A death of an individual at a mine.",note:"Any death meeting this definition is a Part 50 accident."},
    {n:2,title:"Injury with reasonable potential to cause death",exact:"An injury to an individual at a mine which has a reasonable potential to cause death.",note:"Do not reduce this to the final medical outcome. The relevant question is the reasonable potential based on the circumstances known or reasonably knowable."},
    {n:3,title:"Entrapment",exact:"An entrapment of an individual for more than 30 minutes or which has a reasonable potential to cause death.",note:"Either branch can qualify: more than 30 minutes, or reasonable potential to cause death."},
    {n:4,title:"Unplanned inundation",exact:"An unplanned inundation of a mine by a liquid or gas.",note:"A qualifying unplanned inundation is an accident even if no one is injured."},
    {n:5,title:"Unplanned ignition or explosion of gas or dust",exact:"An unplanned ignition or explosion of gas or dust.",note:"No injury is required for the event itself to qualify."},
    {n:6,title:"Unplanned fire",exact:"In underground mines, an unplanned fire not extinguished within 10 minutes of discovery; in surface mines and surface areas of underground mines, an unplanned fire not extinguished within 30 minutes of discovery.",note:"The time threshold depends on underground versus surface/surface area."},
    {n:7,title:"Blasting agent or explosive ignition/explosion",exact:"An unplanned ignition or explosion of a blasting agent or an explosive.",note:"The occurrence itself can be reportable as an accident."},
    {n:8,title:"Qualifying roof or rib fall",exact:"An unplanned roof fall at or above the anchorage zone in active workings where roof bolts are in use; or, an unplanned roof or rib fall in active workings that impairs ventilation or impedes passage.",note:"This category is specific to the listed conditions in active workings."},
    {n:9,title:"Coal or rock outburst",exact:"A coal or rock outburst that causes withdrawal of miners or which disrupts regular mining activity for more than one hour.",note:"Either withdrawal of miners or more than one hour of disruption can independently satisfy the definition."},
    {n:10,title:"Impoundment / refuse pile / culm bank",exact:"An unstable condition at an impoundment, refuse pile, or culm bank which requires emergency action in order to prevent failure, or which causes individuals to evacuate an area; or, failure of an impoundment, refuse pile, or culm bank.",note:"The definition includes both qualifying unstable conditions and actual failure."},
    {n:11,title:"Shaft or slope hoisting equipment damage",exact:"Damage to hoisting equipment in a shaft or slope which endangers an individual or which interferes with use of the equipment for more than thirty minutes.",note:"Either endangerment or more than 30 minutes of interference can independently qualify."},
    {n:12,title:"Mine event injuring someone off mine property",exact:"An event at a mine which causes death or bodily injury to an individual not at the mine at the time the event occurs.",note:"The triggering event occurs at the mine even though the affected person is elsewhere."}
  ];

  const stages=[
    {
      id:"classify",title:"Classify the occurrence",short:"Decide whether the event meets one of the 12 Part 50 accident definitions.",
      quick:["Protect people and control immediate hazards first.","Compare the occurrence against the exact §50.2(h) accident definition.","If reasonable-potential-to-cause-death is in question, make the determination promptly from the circumstances rather than waiting for a final diagnosis."],
      what:"Part 50 uses “accident” as a defined term. The 12 categories in 30 CFR §50.2(h) control whether the immediate-notification branch applies.",
      lens:"The definition includes events with no injury, such as certain fires, explosions, inundations, roof/rib falls, outbursts, impoundment events, and hoisting-equipment damage.",
      guidance:"Use the exact regulatory definition rather than ordinary workplace usage of the word accident.",
      authority:"30 CFR §50.2(h)"
    },
    {
      id:"notify",title:"Immediate MSHA notification",short:"If a Part 50 accident occurred, make the §50.10 call at once without delay and within 15 minutes.",
      quick:["Call MSHA at "+PHONE+".","The timing rule is tied to when the operator knows or should know that an accident has occurred.","Do not treat Form 7000-1 as a substitute for the immediate phone call."],
      what:"Section 50.10 requires immediate contact with MSHA at once without delay and within 15 minutes once the operator knows or should know that an accident has occurred.",
      lens:"The 15-minute requirement applies to the defined Part 50 accidents. The notification decision is separate from later Form 7000-1 reporting.",
      guidance:"Have the emergency reporting number and the internal notification path available before an incident occurs.",
      authority:"30 CFR §50.10; Mine Act §103(j)"
    },
    {
      id:"preserve",title:"Protect people and preserve the scene",short:"Rescue and stabilize first; then preserve accident evidence within the limits of §50.12.",
      quick:["Rescue or recover individuals and eliminate imminent danger as necessary.","Do not alter the accident site or accident-related area beyond the regulatory exceptions unless the MSHA District Manager grants permission.","Document what was changed for rescue, hazard control, or equipment preservation."],
      what:"Section 50.12 restricts alteration of an accident site or accident-related area until investigations are complete, subject to specific exceptions.",
      lens:"The listed exceptions include rescue/recovery, prevention or elimination of imminent danger, and prevention of destruction of mining equipment.",
      guidance:"Separate life-safety actions from unnecessary scene disturbance. Preserve photographs, measurements, controls, equipment position, records, and other factual evidence when it can be done safely.",
      authority:"30 CFR §50.12"
    },
    {
      id:"investigate",title:"Conduct the operator investigation",short:"Investigate every accident and every occupational injury and develop the required report.",
      quick:["Start the operator investigation promptly.","Record the required facts and people involved.","Do not rely on MSHA’s investigation report to satisfy the operator’s §50.11 duty."],
      what:"Section 50.11(b) requires each operator to investigate each accident and each occupational injury at the mine and to develop an investigation report.",
      lens:"The regulation identifies nine required report elements, including date/time, investigators, site description, event explanation, miner information, sketches where pertinent, preventive steps, and identification of any §50.20 report.",
      guidance:"Preserve contemporaneous notes and evidence so the investigation report can distinguish observed facts, later findings, and corrective actions.",
      authority:"30 CFR §50.11; Mine Act §103(d)"
    },
    {
      id:"7000",title:"Determine Form 7000-1 reporting",short:"Report each accident, occupational injury, or occupational illness within the Part 50 timeline.",
      quick:["Every Part 50 accident requires Form 7000-1 even when nobody was injured.","Each occupational injury or occupational illness is separately reportable under §50.20.","Mail/submit the completed form within 10 working days after an accident or occupational injury occurs, or an occupational illness is diagnosed."],
      what:"Section 50.20 requires reporting of each accident, occupational injury, and occupational illness. Multiple injured/ill miners require separate forms.",
      lens:"An immediate §50.10 call and a later §50.20 Form 7000-1 filing are different obligations.",
      guidance:"Use the current official form and instructions. The form should reflect the facts known at filing, with return-to-duty information updated as required.",
      authority:"30 CFR §50.20 and §50.20-1"
    },
    {
      id:"injury",title:"If it is not a Part 50 accident, evaluate injury / illness",short:"A non-accident event may still create Form 7000-1 duties.",
      quick:["Check the occupational-injury definition in §50.2(e).","Check occupational illness under §50.2(f).","Use §50.20-3 to distinguish first aid from medical treatment."],
      what:"An occurrence can fail the 12-part accident definition but still involve a reportable occupational injury or occupational illness.",
      lens:"Occupational injury includes medical treatment, death/loss of consciousness, inability to perform all job duties on any day after injury, temporary assignment to other duties, or transfer to another job.",
      guidance:"Diagnostic procedures by themselves do not automatically constitute medical treatment. Use the specific Part 50 criteria instead of importing OSHA recordkeeping concepts.",
      authority:"30 CFR §§50.2(e)–(g), 50.20, 50.20-3"
    }
  ];

  const deep=[
    ["Reasonable potential to cause death","This phrase is not the same as “did the person die?” or “did the hospital later call it critical?” MSHA’s rulemaking explains that the decision must be made in the first minutes from what a reasonable person would discern under the circumstances. Examples discussed by MSHA include concussions, CPR, limb amputations, major upper-body blunt-force trauma, and intermittent or extended unconsciousness.","30 CFR §§50.2(h)(2)–(3); §50.10"],
    ["The 15-minute clock","The regulatory trigger is when the operator knows or should know that a Part 50 accident has occurred. The operator may need a brief period to determine whether the definition is met, but the rule emphasizes prompt action once the facts support that conclusion.","30 CFR §50.10"],
    ["Accident versus occupational injury","Part 50 accident status and occupational-injury status answer different questions. A fire, explosion, roof fall, inundation, or hoisting event can be a Part 50 accident with no injured miner. Conversely, a miner can have a reportable occupational injury even though the event itself is not one of the 12 accident categories.","30 CFR §§50.2(e), 50.2(h), 50.20"],
    ["Operator investigation report versus Form 7000-1","The operator’s §50.11 investigation report is a separate requirement from Form 7000-1. A limited exception allows a mine with fewer than 20 miners to use Form 7000-1 as the investigation report for an occupational injury not related to an accident.","30 CFR §50.11(b)"],
    ["First aid versus medical treatment","Part 50 contains its own criteria. One-time treatment and observational follow-up for minor injuries can fall within first aid, while sutures, fracture treatment, professional immobilization, infection treatment, debridement, amputation/permanent loss of use, and treatment of second- or third-degree burns are examples of medical treatment. Diagnostic and preventive procedures by themselves are not automatically medical treatment.","30 CFR §50.20-3"],
    ["Scene preservation","The preservation rule is broad: an operator may not alter an accident site or accident-related area until investigations are complete unless a listed exception applies or the MSHA District Manager grants permission. Rescue and imminent-danger control come first, but unnecessary cleanup, equipment movement, or reconstruction can destroy evidence.","30 CFR §50.12"]
  ];

  function esc(v){return String(v??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function show(section){if(!section)return;if(window.SkyFireMSHAReady&&typeof window.SkyFireMSHAReady.show==="function"){window.SkyFireMSHAReady.show(section);return;}if(typeof window.openDynamicSection==="function"){window.openDynamicSection(section);return;}document.querySelectorAll(".app-section").forEach(x=>x.classList.add("hidden"));section.classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"});}
  function stylesheet(){if(document.querySelector('link[data-incident-ready-v16="true"]'))return;const l=document.createElement("link");l.rel="stylesheet";l.href="./incident-ready-v16.css?v=v0.16-incident-ready-1";l.dataset.incidentReadyV16="true";document.head.appendChild(l);}
  function retry(fn,tries){let c=0;function run(){if(fn())return;c++;if(c<(tries||40))setTimeout(run,100);}run();}
  function openCfr(query){if(typeof window.showSection==="function")window.showSection("cfrSection");else show(document.getElementById("cfrSection"));retry(()=>{const input=document.getElementById("searchBar");if(!input)return false;input.value=query;input.dispatchEvent(new Event("input",{bubbles:true}));input.focus({preventScroll:true});input.scrollIntoView({behavior:"smooth",block:"center"});return true;});}
  function openMineAct(provision){show(document.getElementById("mineActSection"));retry(()=>{const cards=[...document.querySelectorAll("#mineActSection .mine-act-provision")];const card=cards.find(x=>x.querySelector(".mine-act-section-number")?.textContent.trim()===provision);if(!card)return false;card.open=true;card.scrollIntoView({behavior:"smooth",block:"start"});return true;});}
  function openSafetyDoc(){show(document.getElementById("safetyDocsSection"));retry(()=>{const card=document.getElementById("part50DecisionTreeCard");if(!card)return false;card.scrollIntoView({behavior:"smooth",block:"center"});return true;});}
  function openEnforcement(){show(document.getElementById("mshaEnforcementSection"));}
  function stageMarkup(s,i){return '<details class="incident-stage" id="incident-stage-'+esc(s.id)+'"><summary><strong>'+(i+1)+'. '+esc(s.title)+'</strong><span>'+esc(s.short)+'</span></summary><div class="incident-stage-body"><h4>Quick View / Do Now</h4><ul>'+s.quick.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><h4>What this is</h4><p>'+esc(s.what)+'</p><h4>MSHA / regulatory lens</h4><p>'+esc(s.lens)+'</p><div class="incident-skyfire-guidance"><strong>SkyFire guidance:</strong> '+esc(s.guidance)+'</div><div class="incident-source-row"><span class="incident-chip law">'+esc(s.authority)+'</span><span class="incident-chip gray">Source checked '+SOURCE_CHECKED+'</span></div></div></details>';}
  function accidentMarkup(a){return '<details class="accident-card"><summary>'+a.n+'. '+esc(a.title)+'</summary><div class="accident-body"><p>'+esc(a.note)+'</p><div class="exact"><strong>Exact §50.2(h) text:</strong><br>'+esc(a.exact)+'</div></div></details>';}

  function markup(){
    return '<div class="module-header"><div class="ir-nav"><button class="module-home-btn incident-back" type="button">← Back</button><button class="module-home-btn incident-home" type="button">⌂ Home</button></div><div class="module-header-text"><h2>Incident Ready — Part 50</h2><p>Source-backed incident decision support for immediate notification, scene preservation, investigation, and Form 7000-1.</p></div></div>'+
    '<div class="info-panel incident-intro"><div class="incident-kicker">MSHA Ready · Incident Response</div><h3>Something happened at the mine</h3><p><strong>Protect people first, then make the Part 50 decisions in the correct order.</strong></p><p>This workflow separates the immediate §50.10 accident-notification decision from later operator-investigation and Form 7000-1 duties. It is designed for field use and deeper learning without replacing current 30 CFR, MSHA direction, site emergency procedures, or qualified legal advice.</p><div class="incident-emergency"><strong>Part 50 immediate notification</strong><a class="incident-phone" href="tel:18007461553">'+PHONE+'</a><span> — at once, without delay, and within 15 minutes once the operator knows or should know that a Part 50 accident has occurred.</span></div><div class="incident-meta"><span class="incident-chip workflow">SkyFire guided workflow</span><span class="incident-chip law">30 CFR Part 50</span><span class="incident-chip msha">MSHA reporting guidance</span><span class="incident-chip gray">Source checked '+SOURCE_CHECKED+'</span></div><div class="incident-warning"><strong>Decision rule:</strong> The emergency phone call, the operator investigation, scene preservation, and Form 7000-1 are related but separate duties. Do not treat one step as satisfying the others.</div></div>'+
    '<div class="incident-visual-card" id="incidentPosterPreview"><div class="incident-kicker">Printable field companion</div><h3>MSHA Part 50 Decision Tree</h3><p>A whole-picture visual for supervisors and field use. The interactive workflow below remains the primary in-app decision tool.</p><div class="incident-visual-preview"><iframe title="Part 50 decision tree preview" loading="lazy" src="'+POSTER_URL+'?embed=1"></iframe></div><div class="incident-action-row"><a class="incident-action-btn field" href="'+POSTER_URL+'" target="_blank" rel="noopener">Open / Print Decision Tree</a><button type="button" class="incident-action-btn field" data-open-field-resource>View in Field Resources</button></div></div>'+
    '<div class="info-panel"><div class="incident-kicker">30-second roadmap</div><h3>Part 50 incident-response sequence</h3><div class="incident-roadmap">'+stages.map((s,i)=>'<button type="button" data-incident-jump="'+s.id+'"><span class="incident-roadmap-num">'+(i+1)+'</span><span><strong>'+esc(s.title)+'</strong><span>'+esc(s.short)+'</span></span></button>').join("")+'</div></div>'+
    '<div class="decision-panel"><div class="decision-question">Does the occurrence meet one of the 12 “accident” definitions in 30 CFR §50.2(h)?</div><div class="decision-options"><button type="button" data-decision="yes">Yes</button><button type="button" data-decision="no">No</button><button type="button" data-decision="unsure">Not sure yet</button></div><div id="incidentDecisionResult" class="decision-result blue">Use the 12-category list below. Accident status is a defined regulatory classification, not ordinary workplace terminology.</div></div>'+
    '<div class="info-panel"><div class="incident-kicker">30 CFR §50.2(h)</div><h3>The 12 Part 50 accident categories</h3><p>Each card includes the exact regulatory definition and a short operational note.</p><div class="accident-grid">'+accidents.map(accidentMarkup).join("")+'</div><div class="time-grid" style="margin-top:14px"><div class="time-card"><strong>10 minutes</strong>Underground unplanned fire not extinguished.</div><div class="time-card"><strong>30 minutes</strong>Surface/surface-area unplanned fire not extinguished.</div><div class="time-card"><strong>&gt;30 minutes</strong>Entrapment independently qualifies; RPTCD can qualify sooner.</div><div class="time-card"><strong>&gt;30 minutes</strong>Hoisting interference independently qualifies; endangerment can qualify sooner.</div><div class="time-card"><strong>&gt;1 hour</strong>Coal/rock outburst disruption; withdrawal of miners independently qualifies.</div></div></div>'+
    '<div class="incident-stage-list">'+stages.map(stageMarkup).join("")+'</div>'+
    '<details class="deep-dive"><summary>Go Deeper — learn the Part 50 decision points and common edge cases</summary><div class="deep-body">'+deep.map(d=>'<article class="deep-track"><h5>'+esc(d[0])+'</h5><p>'+esc(d[1])+'</p><p class="deep-why"><strong>Authority:</strong> '+esc(d[2])+'</p></article>').join("")+'<h4>Operator investigation report — required elements</h4><ul><li>Date and hour of occurrence.</li><li>Date the investigation began.</li><li>Names of individuals participating in the investigation.</li><li>Description of the site.</li><li>Explanation of the accident or injury, equipment involved, relevant events before/after, and cause information.</li><li>Name, occupation, and experience of any miner involved.</li><li>Sketch where pertinent, including dimensions.</li><li>Steps taken to prevent recurrence.</li><li>Identification of any report submitted under §50.20.</li></ul></div></details>'+
    '<div class="info-panel"><h3>Follow the authority / related SkyFire</h3><div class="incident-link-grid"><button class="incident-link" data-open-mine103><strong>Mine Act §103 — accident notification / control authority</strong><span>Statutory foundation for notification, investigation, and accident-control authority.</span></button><button class="incident-link" data-cfr="50.2"><strong>30 CFR §50.2 — definitions</strong><span>Occupational injury, illness, first aid, and the 12 accident categories.</span></button><button class="incident-link urgent" data-cfr="50.10"><strong>30 CFR §50.10 — immediate notification</strong><span>At once, without delay, and within 15 minutes.</span></button><button class="incident-link" data-cfr="50.11"><strong>30 CFR §50.11 — investigation</strong><span>Operator investigation duties and report elements.</span></button><button class="incident-link" data-cfr="50.12"><strong>30 CFR §50.12 — preservation of evidence</strong><span>Accident-site preservation and listed exceptions.</span></button><button class="incident-link" data-cfr="50.20"><strong>30 CFR §50.20 — Form 7000-1</strong><span>Accident, occupational injury, and occupational illness reporting.</span></button><button class="incident-link" data-cfr="50.20-3"><strong>30 CFR §50.20-3 — first aid vs medical treatment</strong><span>Part 50 treatment criteria.</span></button><button class="incident-link msha" data-open-enforcement><strong>MSHA Enforcement & Inspector Resources</strong><span>Official inspector-facing and enforcement material.</span></button></div><div class="incident-source-card"><strong>Current MSHA Form 7000-1</strong><p>Official MSHA form and instructions. Use the current agency-served form.</p><a href="'+FORM7000_URL+'" target="_blank" rel="noopener">Open official Form 7000-1 →</a></div><div class="incident-source-card"><strong>Current 30 CFR Part 50</strong><p>Controlling regulatory text for definitions, notification, investigation, preservation, and reporting.</p><a href="'+PART50_URL+'" target="_blank" rel="noopener">Open current eCFR Part 50 →</a></div></div>';
  }

  function addSafetyDoc(){
    const section=document.getElementById("safetyDocsSection");if(!section)return false;
    if(section.querySelector("#part50DecisionTreeCard"))return true;
    const panels=[...section.querySelectorAll(".info-panel")];
    let target=panels[panels.length-1]||section;
    const card=document.createElement("div");card.id="part50DecisionTreeCard";card.className="document-card part50-doc-card";
    card.innerHTML='<h4>SkyFire MSHA Part 50 Decision Tree</h4><p>Printable whole-picture guide for immediate notification, scene preservation, operator investigation, injury/illness reporting, and Form 7000-1 decisions.</p><div class="part50-doc-preview"><iframe title="Part 50 decision tree field resource preview" loading="lazy" src="'+POSTER_URL+'?embed=1"></iframe></div><div class="document-actions"><a href="'+POSTER_URL+'" target="_blank" rel="noopener">Open / Print Visual</a><button type="button" data-open-incident-from-doc>Open Incident Ready</button></div><p class="part50-doc-meta">Source checked '+SOURCE_CHECKED+' · offline-cached field reference.</p>';
    target.appendChild(card);
    card.querySelector("[data-open-incident-from-doc]")?.addEventListener("click",()=>show(document.getElementById("incidentReadySection")));
    return true;
  }

  function initialize(){
    const section=document.getElementById("incidentReadySection");
    const ready=document.getElementById("mshaReadySection");
    const home=document.getElementById("homeSection");
    if(!section||!ready||!home)return false;
    stylesheet();
    section.innerHTML=markup();

    section.querySelector(".incident-back")?.addEventListener("click",()=>show(ready));
    section.querySelector(".incident-home")?.addEventListener("click",()=>show(home));
    section.querySelectorAll("[data-incident-jump]").forEach(b=>b.addEventListener("click",()=>{const d=section.querySelector("#incident-stage-"+b.dataset.incidentJump);if(d){d.open=true;d.scrollIntoView({behavior:"smooth",block:"start"});}}));
    section.querySelectorAll("[data-cfr]").forEach(b=>b.addEventListener("click",()=>openCfr(b.dataset.cfr)));
    section.querySelector("[data-open-mine103]")?.addEventListener("click",()=>openMineAct("§103"));
    section.querySelector("[data-open-enforcement]")?.addEventListener("click",openEnforcement);
    section.querySelector("[data-open-field-resource]")?.addEventListener("click",openSafetyDoc);

    const result=section.querySelector("#incidentDecisionResult");
    section.querySelectorAll("[data-decision]").forEach(b=>b.addEventListener("click",()=>{
      const v=b.dataset.decision;
      if(v==="yes"){result.className="decision-result red";result.innerHTML='<strong>Part 50 accident branch:</strong> Call MSHA at '+PHONE+' at once without delay and within 15 minutes once the operator knows or should know. Protect people, preserve the scene under §50.12, conduct the operator investigation, and complete Form 7000-1.';const d=section.querySelector("#incident-stage-notify");if(d)d.open=true;}
      else if(v==="no"){result.className="decision-result green";result.innerHTML='<strong>Not a §50.2(h) accident:</strong> The immediate §50.10 accident-notification branch does not apply on that basis. Continue by evaluating whether an occupational injury or occupational illness is reportable under Part 50.';const d=section.querySelector("#incident-stage-injury");if(d)d.open=true;}
      else{result.className="decision-result amber";result.innerHTML='<strong>Classification not resolved:</strong> Review the exact §50.2(h) categories immediately. For injury or entrapment with possible fatal potential, make the determination from the circumstances known or reasonably knowable; do not wait for a final diagnosis merely to decide whether the Part 50 accident definition is met.';}
    }));

    addSafetyDoc();setTimeout(addSafetyDoc,300);setTimeout(addSafetyDoc,1000);
    window.SkyFireIncidentReadyV16={sourceChecked:SOURCE_CHECKED,poster:POSTER_URL,open:()=>show(section)};
    return true;
  }

  function start(){if(initialize())return;tries++;if(tries<180)setTimeout(start,100);}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();