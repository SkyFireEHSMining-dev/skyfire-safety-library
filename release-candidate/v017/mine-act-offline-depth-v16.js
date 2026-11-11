(function () {
  const depthByAct = {
    "§3": {
      heading: "Offline definition guide",
      intro: "These are the Mine Act terms most likely to affect day-to-day safety, jurisdiction, inspection, and enforcement discussions. They are concise SkyFire summaries, not replacement statutory text.",
      items: [
        ["Operator", "Broadly includes an owner, lessee, or other person who operates, controls, or supervises a mine, and can include independent contractors performing services or construction at a mine."],
        ["Agent", "A person charged by the operator with responsibility for the operation or supervision of all or part of a mine or for supervision of miners."],
        ["Miner", "An individual working in a coal or other mine."],
        ["Coal or other mine", "The Act uses a broad coverage concept that can include land, structures, facilities, equipment, private roads, and extraction or milling/preparation activities connected with mining."],
        ["Imminent danger", "A condition or practice that could reasonably be expected to cause death or serious physical harm before the condition or practice can be abated."],
        ["Accident", "The statutory definition is broad. For Part 50 reporting decisions, use the specific 30 CFR §50.2(h) accident definition and the Incident Ready workflow rather than relying on this definition alone."],
        ["Mandatory health or safety standard", "A standard established under the Mine Act's statutory framework. This term is important when reading citation and enforcement provisions."],
        ["Commission", "The Federal Mine Safety and Health Review Commission (FMSHRC), the independent adjudicatory body that hears Mine Act contests and related cases."]
      ]
    },
    "§103": {
      heading: "Key subsection map",
      intro: "Use this map when you need to remember which part of §103 controls a particular inspection or accident-response question.",
      items: [
        ["§103(a) — Inspection authority", "Sets the purposes of MSHA inspections and investigations; generally bars advance notice; establishes complete-inspection frequencies, including at least two complete inspections per year for surface mines; and provides federal representatives a right of entry for inspections and investigations."],
        ["§103(b) — Investigative hearings and subpoenas", "Authorizes MSHA, after notice, to hold public hearings for accident or health/safety investigations, issue subpoenas, take testimony, require documents, and administer oaths."],
        ["§103(d) — Operator accident investigation and records", "Requires operators to make reasonable investigations of accidents and maintain accident/investigation information and records for availability to MSHA and the appropriate State agency."],
        ["§103(f) — Walkaround participation", "Provides an opportunity for an operator representative and an authorized miners' representative to accompany the inspector during the physical inspection and to participate in pre- or post-inspection conferences at the mine."],
        ["§103(g) — Miner-requested inspection", "Provides a process for a miner or miners' representative to request an inspection when there are reasonable grounds to believe a violation or imminent danger exists, with confidentiality protections for the person making the notice."],
        ["§103(j) — Accident notification, evidence, rescue/recovery", "Requires accident notification and preservation of evidence, and contains the 15-minute statutory notification rule for a death or an injury/entrapment with reasonable potential to cause death. It also addresses MSHA authority during rescue and recovery."],
        ["§103(k) — Accident-control orders", "Allows an MSHA representative present after an accident to issue orders considered appropriate to protect people, and requires MSHA approval of recovery/return-to-normal plans when this authority is invoked."]
      ]
    },
    "§104": {
      heading: "Key enforcement map",
      intro: "Section 104 is the central Mine Act citation/order framework. The facts determine which enforcement path applies; SkyFire is only mapping the statutory structure here.",
      items: [
        ["§104(a) — Citation", "When MSHA believes a Mine Act requirement, mandatory standard, rule, order, or regulation has been violated, the citation identifies the alleged violation and fixes a reasonable time for abatement."],
        ["§104(b) — Failure to abate", "If a cited violation is not totally abated within the allowed time, and further extension is not warranted, MSHA issues a withdrawal order for the affected area until the violation is abated."],
        ["§104(c) — People permitted in an ordered area", "Lists limited categories of people who may remain in or enter an area subject to a withdrawal order when their presence is necessary for correction, official duties, investigation, or related work."],
        ["§104(d) — Unwarrantable failure sequence", "Creates the special citation/order sequence for certain violations found to be caused by an operator's unwarrantable failure. Do not infer unwarrantable failure from a standard alone; it depends on the facts and enforcement findings."],
        ["§104(e) — Pattern of violations", "Provides withdrawal-order consequences for qualifying S&S violations after a mine is placed on a statutory pattern of violations."],
        ["§104(g) — Untrained miner withdrawal", "Authorizes withdrawal of a miner when MSHA finds the miner has not received training required by §115, until the required training is received."],
        ["§104(h) — Duration of citations/orders", "A citation or order remains in effect until it is modified, terminated, or vacated by MSHA, the Commission, or a reviewing court."]
      ]
    },
    "§105": {
      heading: "Key procedure map",
      intro: "Section 105 governs important post-enforcement procedures. Exact deadlines and filing choices should be checked against the current official statute and FMSHRC rules before action is taken.",
      items: [
        ["§105(a) — Proposed penalty notice and contest", "After a citation or order, MSHA later provides notice of the proposed civil penalty. The statute provides a 30-day period to notify the Secretary of a contest; failure to act can make the citation and proposed assessment a final Commission order."],
        ["§105(b) — Failure-to-correct penalty procedures", "Provides notice and contest procedures for penalties proposed because an operator failed to correct a cited violation within the permitted period."],
        ["§105(c) — Miner discrimination / interference", "Creates the Mine Act complaint and Commission-remedy framework for miners, representatives, and applicants who allege prohibited discrimination or interference related to protected safety and health activity."],
        ["§105 process caution", "A Safety and Health Conference, a pre-penalty contest, and a contest of a proposed penalty are not the same process. The future Enforcement Navigator will separate those paths step by step."]
      ]
    },
    "§107": {
      heading: "Imminent-danger map",
      intro: "Section 107 is about removing people from an imminent danger, not merely documenting an ordinary violation.",
      items: [
        ["§107(a) — Withdrawal order", "When an authorized MSHA representative finds an imminent danger during an inspection or investigation, the representative determines the affected area and orders people withdrawn, subject to limited statutory exceptions, until the danger and the conditions or practices causing it no longer exist."],
        ["Separate from an ordinary citation", "The same underlying condition may also support a citation or other enforcement action. An imminent-danger order is a distinct statutory action focused on immediate protection from the danger."],
        ["Do not self-classify", "SkyFire can explain the authority and help you recognize the seriousness of the concept, but it should not predict whether MSHA will make an imminent-danger finding in a live situation."]
      ]
    },
    "§110": {
      heading: "Penalty and liability map",
      intro: "Section 110 establishes several civil and criminal liability provisions. Dollar amounts can be adjusted by regulation and inflation rules, so this offline guide deliberately avoids acting as a current penalty calculator.",
      items: [
        ["§110(a) — Civil penalties", "Establishes civil-penalty authority for Mine Act and mandatory-standard violations and includes a specific penalty provision for failure to make the required timely §103(j) accident notification."],
        ["§110(b) — Continuing failure to correct", "Provides additional civil-penalty authority tied to continuing failure to correct a cited violation after the permitted abatement period."],
        ["§110(c) — Certain individual liability", "Provides potential civil liability for qualifying directors, officers, and agents of a corporation who knowingly authorized, ordered, or carried out certain corporate violations. This is specialized territory and is outside the routine V1 workflow."],
        ["§110(d) and related criminal provisions", "The Act also includes criminal consequences for specified willful conduct and other prohibited acts."],
        ["§110(f) — False statements", "Knowingly making false statements, representations, or certifications in documents required under the Act can carry criminal consequences."],
        ["Current dollar amounts", "For a live penalty question, verify the current statutory text, 30 CFR Part 100, and current federal civil-penalty adjustments rather than relying on historic amounts printed in older copies of the Act."]
      ]
    }
  };

  function ensureStyle() {
    if (document.getElementById("mineActOfflineDepthStyles")) return;
    const style = document.createElement("style");
    style.id = "mineActOfflineDepthStyles";
    style.textContent = `
      .mine-act-offline-depth{margin:18px 0 2px;padding:15px;border:1px solid #cfe3fb;border-left:5px solid var(--sf-law);border-radius:14px;background:#f8fbff}
      .mine-act-offline-depth h4{margin:0 0 5px!important;color:#0b63ad}
      .mine-act-offline-depth>p{margin:0 0 12px!important;color:var(--muted);font-size:.98rem!important}
      .mine-act-depth-list{display:grid;gap:9px}
      .mine-act-depth-item{padding:11px 12px;border:1px solid #d8e6f5;border-radius:11px;background:#fff}
      .mine-act-depth-item strong{display:block;color:#075ca8;line-height:1.3}
      .mine-act-depth-item span{display:block;margin-top:4px;color:var(--text);line-height:1.45}
      .mine-act-depth-note{margin-top:12px;padding:10px 12px;border-left:4px solid var(--sf-skyfire-guidance);background:var(--sf-skyfire-guidance-soft);font-size:.9rem;line-height:1.45}
      @media(min-width:760px){.mine-act-depth-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
    `;
    document.head.appendChild(style);
  }

  function depthMarkup(data) {
    return `
      <div class="mine-act-offline-depth">
        <h4>${data.heading}</h4>
        <p>${data.intro}</p>
        <div class="mine-act-depth-list">
          ${data.items.map(([label,text]) => `<div class="mine-act-depth-item"><strong>${label}</strong><span>${text}</span></div>`).join("")}
        </div>
        <div class="mine-act-depth-note"><strong>Offline-use rule:</strong> This is a source-reviewed SkyFire field reference. It is intentionally more detailed than the quick summary, but it is still not a verbatim substitute for the controlling statutory text.</div>
      </div>`;
  }

  function enhance() {
    const section = document.getElementById("mineActSection");
    if (!section || !section.querySelector(".mine-act-provision")) return false;
    ensureStyle();
    section.querySelectorAll(".mine-act-provision").forEach(card => {
      const act = card.querySelector(".mine-act-section-number")?.textContent.trim();
      const data = depthByAct[act];
      const body = card.querySelector(".mine-act-provision-body");
      if (!data || !body || body.querySelector(".mine-act-offline-depth")) return;
      const sourceNote = body.querySelector(".mine-act-source-note");
      const wrap = document.createElement("div");
      wrap.innerHTML = depthMarkup(data).trim();
      body.insertBefore(wrap.firstElementChild, sourceNote || null);
    });
    return true;
  }

  let attempts = 0;
  function start() {
    if (enhance()) return;
    attempts += 1;
    if (attempts < 140) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
