(function(){
  const SOURCE_CHECKED='Reviewed for initial publication · August 2026';
  const FINAL_RULE='https://www.federalregister.gov/documents/2023/12/20/2023-27640/safety-program-for-surface-mobile-equipment';
  const FAQ='https://www.msha.gov/sites/default/files/Regulations/FREQUENTLY-ASKED-QUESTIONS-2024-07-15.pdf';
  let tries=0;

  function addStyles(){
    if(document.getElementById('tg001Section12Styles'))return;
    const style=document.createElement('style');
    style.id='tg001Section12Styles';
    style.textContent=`
      .tg12-published{margin-top:12px}
      .tg12-published>summary{cursor:pointer;list-style:none;padding:16px 17px;border:1px solid var(--line-soft,var(--line));border-left:6px solid var(--sf-technical,#f97316);border-radius:15px;background:linear-gradient(90deg,var(--sf-technical-soft,#fff6ed),#fff 38%)}
      .tg12-published>summary::-webkit-details-marker{display:none}
      .tg12-published>summary strong{display:block;color:#c45d0d;font-size:1.18rem;line-height:1.3}
      .tg12-published>summary span{display:block;margin-top:6px;color:var(--muted);line-height:1.4}
      .tg12-body{padding:4px 17px 20px}
      .tg12-body h4{margin:24px 0 8px;font-size:1.12rem;line-height:1.3}
      .tg12-body p,.tg12-body li{line-height:1.6}
      .tg12-body ul,.tg12-body ol{padding-left:23px}
      .tg12-meta{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
      .tg12-chip{display:inline-block;padding:5px 9px;border-radius:999px;background:#fff0e2;color:#8f4a16;font-weight:750;font-size:.78rem}
      .tg12-authority,.tg12-skyfire,.tg12-summary,.tg12-sources{margin:16px 0;padding:13px 15px;border-left:4px solid var(--sf-technical,#f97316);background:var(--sf-technical-soft,#fff6ed)}
      .tg12-authority{border-left-color:#0b84ff;background:#f3f8fd}
      .tg12-authority strong{color:#173f6b}
      .tg12-skyfire strong{color:#9a4b0b}
      .tg12-grid{display:grid;gap:10px;margin:14px 0}
      .tg12-trigger{padding:12px 14px;border:1px solid var(--line-soft,var(--line));border-radius:12px;background:#fff}
      .tg12-trigger strong{display:block;margin-bottom:4px}
      .tg12-sources a{display:block;margin-top:8px;color:#c45d0d;font-weight:750;overflow-wrap:anywhere}
      @media(max-width:600px){.tg12-published>summary{padding:15px 13px}.tg12-body{padding:4px 13px 18px}.tg12-body p,.tg12-body li{font-size:1.04rem}}
    `;
    document.head.appendChild(style);
  }

  function markup(){return `
    <details class="tg-subsection tg12-published" data-tg-subsection="1.2">
      <summary><strong>§1.2 · What MSHA Is Trying to Accomplish</strong><span>A living, mine-specific safety-management program · Published</span></summary>
      <div class="tg-subsection-body tg12-body">
        <div class="tg12-meta"><span class="tg12-chip">TG-001</span><span class="tg12-chip">§1.2</span><span class="tg12-chip">Published</span><span class="tg12-chip">${SOURCE_CHECKED}</span></div>
        <p><strong>Purpose of this subsection.</strong> Section 1.1 explained why MSHA acted. Section 1.2 explains the operating model created by the Surface Mobile Equipment Safety Program rule: a written program that is mine-specific, implemented in practice, informed by miners, reviewed when conditions change, and available for MSHA inspection. Later sections address the individual legal duties in greater detail.</p>

        <h4>1.2.1 The rule is aimed at an operating safety program, not a stand-alone document</h4>
        <p>Section 56.23000 requires operators to develop, implement, and update a written safety program for surface mobile equipment to reduce accidents, injuries, and fatalities. The same section states that the program is intended to promote and support a positive safety culture and improve miners’ safety at the mine. Those are the rule’s express purposes. (30 C.F.R. § 56.23000)</p>
        <p>The distinction between having a document and operating a program matters. Section 56.23002 requires the operator to develop and implement the written program. Section 56.23003 then requires the program to describe actions the operator will take in four subject areas and requires continuing evaluation and updating. In practical terms, a written program is the traceable description of the mine’s planned actions; the regulation also requires those actions to be implemented and the program to remain current.</p>

        <h4>1.2.2 Four required subjects are parts of one mine-specific program</h4>
        <p>Section 56.23003(a) requires the written program to include actions the operator will take in four areas:</p>
        <ol><li>Identify and analyze hazards and reduce the resulting risks related to the movement and operation of surface mobile equipment.</li><li>Develop and maintain procedures and schedules for routine maintenance and non-routine repairs for surface mobile equipment.</li><li>Identify currently available and newly emerging feasible technologies that can enhance safety at the mine and evaluate whether to adopt them.</li><li>Train miners and other persons at the mine necessary to perform work to identify and address or avoid hazards related to surface mobile equipment.</li></ol>
        <p>MSHA describes these requirements as general and performance-based. In the final-rule preamble, the agency explained that the performance-based approach gives operators flexibility to tailor the program to their specific mining conditions and operations. That flexibility concerns how the mine addresses the required subjects; it does not remove the subjects themselves. (88 Fed. Reg. 87,904, 87,909–10)</p>
        <div class="tg12-skyfire"><strong>SkyFire operational reading.</strong> The four subjects are most useful when treated as connected work rather than isolated paperwork. A hazard review can identify a visibility or traffic-interaction problem; maintenance can verify the condition and reliability of equipment and controls; technology evaluation can examine additional feasible controls; training can prepare people to recognize and respond to the hazard; and field experience can show whether the combined controls are working. This is a SkyFire synthesis of how the required subjects can function together, not a separate MSHA mandate.</div>

        <h4>1.2.3 “Performance-based” means mine-specific flexibility with required outcomes</h4>
        <p>MSHA rejected a one-size-fits-all prescriptive hazard-analysis model. The agency explained that operators need flexibility to devise and tailor programs to their unique conditions and operations. The rule therefore does not prescribe one traffic-control plan, one technology, one maintenance system, or one training package for every mine. (88 Fed. Reg. 87,904, 87,909–10)</p>
        <p>That flexibility should not be read as permission to use a generic program that is disconnected from the mine. During regular inspections, MSHA stated that it will review whether the written program reflects actions that identify and address surface-mobile-equipment hazards at the mine site, whether miner input was sought, and whether the program has been adequately evaluated and updated. (88 Fed. Reg. 87,904, 87,908–09)</p>
        <div class="tg12-skyfire"><strong>Practical implication.</strong> A template can provide structure, but the operator should be able to connect the finished program to the mine’s actual equipment, routes, tasks, interaction points, maintenance practices, training needs, and changing conditions. This is operational guidance derived from the rule’s mine-specific, performance-based design.</div>

        <h4>1.2.4 The program must change when the mine changes</h4>
        <p>Under § 56.23003(b), the responsible person must evaluate and update the written safety program at least annually. The same provision requires evaluation and updating as mining conditions or practices change in ways that may adversely affect health and safety, as accidents or injuries occur, or as surface mobile equipment changes or modifications are made. MSHA explained in the preamble that annual evaluation is the minimum and that more frequent evaluation and updating must occur when necessary. (30 C.F.R. § 56.23003(b); 88 Fed. Reg. 87,904, 87,911)</p>
        <div class="tg12-grid"><div class="tg12-trigger"><strong>At least annually</strong>Scheduled full review of whether the written program remains accurate and implemented.</div><div class="tg12-trigger"><strong>Changed mining conditions or practices</strong>Changed routes, traffic flow, work sequencing, dumping/loading arrangements, contractor activity, pedestrian exposure, or other changes that may adversely affect safety.</div><div class="tg12-trigger"><strong>Accident or injury</strong>What the event reveals about hazards, controls, maintenance, training, communication, supervision, or the written program.</div><div class="tg12-trigger"><strong>Equipment change or modification</strong>New machines, attachments, visibility profiles, controls, braking characteristics, warnings, maintenance needs, or fleet interactions.</div></div>
        <p><em>The examples above are SkyFire operational prompts. The regulatory triggers are in § 56.23003(b).</em></p>

        <h4>1.2.5 Miner input and responsible-person authority are built into the program</h4>
        <p>Section 56.23003(c) requires the operator to solicit input from miners and their representatives when developing and updating the written program. MSHA stated that the final rule makes miner participation explicit. The operator retains responsibility for the program; miner input supplies field information that can improve hazard identification and program decisions. (30 C.F.R. § 56.23003(c); 88 Fed. Reg. 87,904, 87,911–12)</p>
        <p>The rule also requires each operator to designate at least one responsible person. The CFR defines that person as someone with authority and responsibility to evaluate and update the written program. MSHA explained that the responsible person needs knowledge of mining conditions and surface mobile equipment sufficient to perform that role. More than one responsible person may be designated. (30 C.F.R. §§ 56.23001–56.23002; 88 Fed. Reg. 87,904, 87,907–08)</p>
        <div class="tg12-skyfire"><strong>SkyFire operational guidance.</strong> The responsible person should have a practical path to the information and decisions needed to evaluate the program. Operations, maintenance, supervisors, safety/training personnel, miners, and contractors may each hold information that matters. MSHA’s regulatory impact analysis assumed participation by supervisors, safety professionals, maintenance workers, miners, and miner representatives when estimating the work required to develop and update programs. That assumption supports cross-functional participation, but it does not assign regulatory ownership to any particular department. (88 Fed. Reg. 87,904, 87,914)</div>

        <h4>1.2.6 MSHA reviews the program during inspection rather than approving it in advance</h4>
        <p>MSHA considered whether written programs should require advance Agency approval and decided they should not. The final-rule preamble states that programs will instead be reviewed during regular inspections. MSHA will examine whether the program reflects actions that identify and address mine-site hazards, verify that miner input was sought, and determine whether the program has been adequately evaluated and updated. (88 Fed. Reg. 87,904, 87,908–09)</p>
        <p>Section 56.23004 requires the operator to make the written program available for inspection by authorized representatives of the Secretary and to provide a copy upon request. The operator must also make it available to miners and their representatives and provide a copy at no cost upon request. MSHA allows the program to be maintained in electronic or hard-copy form as long as it contains the required information and can be made available as required. (30 C.F.R. § 56.23004; 88 Fed. Reg. 87,904, 87,912)</p>
        <div class="tg12-skyfire"><strong>Operational consequence.</strong> A mine should be prepared to explain how its written commitments connect to actual field practices and how the program was developed, implemented, reviewed, and changed. This is a practical preparation point, not an additional documentation requirement beyond the rule.</div>

        <h4>1.2.7 Section 1.2 field-reference summary</h4>
        <div class="tg12-summary"><ul><li>The rule’s express purposes are to reduce accidents, injuries, and fatalities, promote and support a positive safety culture, and improve miners’ safety.</li><li>The written program must include actions addressing hazard/risk reduction, maintenance and repair, feasible-technology evaluation, and training.</li><li>The performance-based structure allows mine-specific methods; it does not eliminate required program subjects.</li><li>The responsible person must evaluate and update the program at least annually and when the regulatory change/event triggers apply.</li><li>The operator must solicit input from miners and their representatives during development and updating.</li><li>At least one responsible person must have authority and responsibility to evaluate and update the program.</li><li>MSHA reviews programs during regular inspections rather than approving them in advance.</li><li>The program must be available for inspection and copies must be provided as required by § 56.23004.</li></ul></div>

        <h4>Questions to test the program at your mine</h4>
        <ul><li>Can the program be traced to the equipment, routes, tasks, people, and interaction points that actually exist at the mine?</li><li>Do hazard review, maintenance, technology evaluation, and training inform one another, or are they maintained as disconnected activities?</li><li>What events besides the annual review date would trigger evaluation of the program at this operation?</li><li>How is miner input solicited, evaluated, and reflected in program decisions?</li><li>Does the responsible person have access to the operational and maintenance information needed to evaluate the program?</li><li>If MSHA reviewed the program during an inspection, could the mine explain how the written actions are implemented and how the program has been updated?</li></ul>

        <div class="tg12-authority"><strong>Authority boundary — controlling rule.</strong> The CFR controls. SkyFire’s discussion of management systems, cross-department coordination, and documentation is operational guidance for applying the rule; it is not additional regulatory text.</div>
        <div class="tg12-sources"><strong>Verification sources</strong><a href="${FINAL_RULE}" target="_blank" rel="noopener">MSHA Final Rule — Safety Program for Surface Mobile Equipment, 88 Fed. Reg. 87,904</a><a href="${FAQ}" target="_blank" rel="noopener">MSHA Frequently Asked Questions — Safety Program for Surface Mobile Equipment</a><p>Primary claims in this subsection were rechecked against the final rule, codified requirements, and current MSHA compliance-assistance material. SkyFire interpretation and operational guidance are labeled separately from controlling regulatory requirements and MSHA’s stated positions.</p></div>
      </div>
    </details>`;}

  function publish(){
    const tg=document.getElementById('tg001Section');
    if(!tg)return false;
    addStyles();
    const old=tg.querySelector('[data-tg-subsection="1.2"]');
    if(old)old.remove();
    const target=tg.querySelector('.tg-body')||tg.querySelector('.info-panel')||tg;
    target.insertAdjacentHTML('beforeend',markup());
    tg.dataset.tg12Published='v0.2';
    return true;
  }

  function start(){if(publish())return;tries+=1;if(tries<120)setTimeout(start,75);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();