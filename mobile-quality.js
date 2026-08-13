(function () {
  const fiveSStageContent = {
    "Sort": `
      <h4>Purpose</h4>
      <p>Remove clutter and unnecessary items so the work area contains what is actually needed for the work.</p>
      <h4>Field actions</h4>
      <ul>
        <li>Identify items that are unnecessary, obsolete, damaged, duplicated, or no longer used.</li>
        <li>Remove, dispose of, return, relocate, or quarantine those items through the appropriate site process.</li>
        <li>Keep only the tools, materials, supplies, and information needed in or near the work area.</li>
      </ul>
      <h4>Ask</h4>
      <p>Does each item here have a current purpose? If it disappeared today, would the work still be performed safely and effectively?</p>
      <div class="five-s-ready"><strong>Ready to move on when:</strong> unnecessary items are removed or controlled and the remaining items have a legitimate purpose.</div>
    `,
    "Set in Order": `
      <h4>Purpose</h4>
      <p>Arrange what remains so people can find, use, and return items with minimal searching, handling, and wasted motion.</p>
      <h4>Field actions</h4>
      <ul>
        <li>Locate frequently used items where they are easy to reach and return.</li>
        <li>Use defined storage locations, labels, outlines, racks, bins, or other visual controls where useful.</li>
        <li>Arrange the area around the actual work flow rather than simply making it look neat.</li>
        <li>Keep access routes, work zones, controls, and emergency equipment clear as required by the site.</li>
      </ul>
      <h4>Ask</h4>
      <p>Can a person unfamiliar with this exact area quickly tell where needed items belong and retrieve them without unnecessary motion or searching?</p>
      <div class="five-s-ready"><strong>Ready to move on when:</strong> needed items have logical locations that support the work and are easy to return correctly.</div>
    `,
    "Shine": `
      <h4>Purpose</h4>
      <p>Clean the workplace enough that leaks, damage, wear, contamination, loose material, and other abnormal conditions are easier to recognize.</p>
      <h4>Field actions</h4>
      <ul>
        <li>Clean work surfaces, floors, equipment areas, and storage locations to the condition appropriate for the operation.</li>
        <li>Look for the source of recurring dirt, debris, leakage, or contamination instead of repeatedly cleaning around it.</li>
        <li>Use cleaning as an opportunity to identify abnormal conditions that need correction or escalation.</li>
      </ul>
      <h4>Ask</h4>
      <p>Is the area clean enough that a new leak, damaged component, spill, buildup, or other abnormal condition would stand out?</p>
      <div class="five-s-ready"><strong>Ready to move on when:</strong> the expected clean condition is established and abnormalities are visible rather than hidden by poor housekeeping.</div>
    `,
    "Standardize": `
      <h4>Purpose</h4>
      <p>Turn the improved condition into a clear, consistent way of working so the first three S's are not dependent on memory or individual preference.</p>
      <h4>Field actions</h4>
      <ul>
        <li>Define what “normal” looks like for the area.</li>
        <li>Use simple visual standards, labels, photographs, markings, checklists, routines, or other controls where they add value.</li>
        <li>Clarify who performs recurring organization and cleaning tasks and when they occur.</li>
        <li>Keep standards as simple as possible while still making the expected condition obvious.</li>
      </ul>
      <h4>Ask</h4>
      <p>Would different people maintain this area in substantially the same condition because the standard is clear?</p>
      <div class="five-s-ready"><strong>Ready to move on when:</strong> the expected condition and routine are clear enough to be repeated consistently.</div>
    `,
    "Sustain": `
      <h4>Purpose</h4>
      <p>Make 5S part of normal work so the area does not slowly return to its previous condition.</p>
      <h4>Field actions</h4>
      <ul>
        <li>Build ownership into routine work rather than relying on occasional cleanup campaigns.</li>
        <li>Use short checks, coaching, visual confirmation, or periodic review to recognize drift.</li>
        <li>Correct the reason the standard is difficult to maintain instead of repeatedly blaming the user.</li>
        <li>Update the standard when the work, equipment, or process changes.</li>
      </ul>
      <h4>Ask</h4>
      <p>Is the improved condition still present weeks later, and does the team know how to respond when it begins to drift?</p>
      <div class="five-s-ready"><strong>System condition:</strong> 5S is sustained when Sort, Set in Order, Shine, and Standardize are maintained as part of everyday work and continuously improved when conditions change.</div>
    `
  };

  function applyMobileQualityStyles() {
    const old = document.getElementById("skyfireMobileQualityStyles");
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = "skyfireMobileQualityStyles";
    style.textContent = `
      :root {
        --sf-regulation: #0b84ff;
        --sf-regulation-deep: #173f6b;
        --sf-regulation-chapter: #2b628f;
        --sf-regulation-subchapter: #4f86b4;
        --sf-regulation-part: #0b84ff;
        --sf-regulation-subpart: #76b4e5;
        --sf-regulation-soft: #f3f8fd;
        --sf-guidance: #6554c0;
        --sf-guidance-soft: #f4f1ff;
        --sf-technical: #f97316;
        --sf-technical-soft: #fff6ed;
        --sf-tools: #0f8f83;
        --sf-tools-soft: #eefaf8;
        --sf-neutral: #64748b;
        --sf-neutral-soft: #f4f6f8;
      }

      #homeSection .skyfire-hub-home-tile:not(.regulatory-hub):not(.field-hub){border-top-color:var(--sf-tools)}
      #homeSection .skyfire-hub-home-tile:not(.regulatory-hub):not(.field-hub) .tile-title{color:var(--sf-tools)}
      #homeSection .skyfire-hub-home-tile.regulatory-hub{border-top-color:var(--sf-regulation)}
      #homeSection .skyfire-hub-home-tile.regulatory-hub .tile-title{color:var(--sf-regulation)}
      #homeSection .skyfire-hub-home-tile.field-hub{border-top-color:var(--sf-neutral)}
      #homeSection .skyfire-hub-home-tile.field-hub .tile-title{color:var(--sf-neutral)}

      #homeSection .feedback-home-tile,
      #homeSection [data-open-section="aboutSection"]{border-top-color:var(--sf-neutral)!important}
      #homeSection .feedback-home-tile .tile-title,
      #homeSection [data-open-section="aboutSection"] .tile-title{color:var(--sf-neutral)!important}
      #feedbackSection .module-header,
      #aboutSection .module-header{border-top-color:var(--sf-neutral)}

      #safetyToolsHubSection .module-header{border-top-color:var(--sf-tools)}
      #regulatoryResourcesHubSection .module-header{border-top-color:var(--sf-regulation)}
      #fieldResourcesHubSection .module-header{border-top-color:var(--sf-neutral)}
      #mshaGuidanceSection .module-header,.ppm-resource-section .module-header{border-top-color:var(--sf-guidance)}
      #technicalGuidanceSection .module-header{border-top-color:var(--sf-technical)}
      #fiveSSection .module-header{border-top-color:var(--sf-tools)}

      #safetyToolsHubSection .skyfire-hub-item{border-left:5px solid var(--sf-tools);background:linear-gradient(90deg,var(--sf-tools-soft),#fff 24%)}
      #safetyToolsHubSection .skyfire-hub-item strong{color:var(--sf-tools)}
      #regulatoryResourcesHubSection .skyfire-hub-item{border-left:5px solid var(--sf-regulation);background:linear-gradient(90deg,var(--sf-regulation-soft),#fff 24%)}
      #regulatoryResourcesHubSection .skyfire-hub-item strong{color:var(--sf-regulation)}
      #regulatoryResourcesHubSection .skyfire-hub-item:nth-child(4){border-left-color:var(--sf-guidance);background:linear-gradient(90deg,var(--sf-guidance-soft),#fff 24%)}
      #regulatoryResourcesHubSection .skyfire-hub-item:nth-child(4) strong{color:var(--sf-guidance)}
      #regulatoryResourcesHubSection .skyfire-hub-item:nth-child(5){border-left-color:var(--sf-technical);background:linear-gradient(90deg,var(--sf-technical-soft),#fff 24%)}
      #regulatoryResourcesHubSection .skyfire-hub-item:nth-child(5) strong{color:#c45d0d}
      #fieldResourcesHubSection .skyfire-hub-item{border-left:5px solid var(--sf-neutral);background:linear-gradient(90deg,var(--sf-neutral-soft),#fff 24%)}
      #fieldResourcesHubSection .skyfire-hub-item strong{color:var(--sf-neutral)}
      #technicalGuidanceSection .resource-notice,#technicalGuidanceSection .tg-skyfire-note{border-left-color:var(--sf-technical)}
      #technicalGuidanceSection .tg-guide-folder{border-left:5px solid var(--sf-technical);background:linear-gradient(90deg,var(--sf-technical-soft),#fff 24%)}
      #technicalGuidanceSection .tg-folder-code,#technicalGuidanceSection .tg-subsection>summary{color:#c45d0d}
      #technicalGuidanceSection .resource-status,#technicalGuidanceSection .tg-chip{background:#fff0e2;color:#8f4a16}
      #mshaGuidanceSection .ppm-notice,.ppm-resource-section .ppm-notice{border-left-color:var(--sf-guidance)}

      #fiveSSection .five-s-answer-row button.selected{outline-color:var(--sf-tools)!important}
      #fiveSSection .five-s-stage-number{background:var(--sf-tools-soft)}
      #fiveSSection .five-s-stage summary>span:last-child{display:flex;flex-direction:column;gap:4px;min-width:0}
      #fiveSSection .five-s-stage summary strong{display:block;margin:0!important;line-height:1.25}
      #fiveSSection .five-s-stage summary small{display:block!important;margin:0!important;line-height:1.35}
      #fiveSSection .five-s-next>span{display:block;margin:0 0 4px!important}
      #fiveSSection .five-s-next>strong{display:block;margin:0 0 8px;line-height:1.25}
      #fiveSSection .five-s-next p{margin-top:0}
      #fiveSSection .five-s-ready strong{margin-right:.28rem}
      #fiveSSection .five-s-stage h4{margin:18px 0 7px}
      #fiveSSection .five-s-stage ul{padding-left:22px;line-height:1.5}
      #fiveSSection .five-s-stage li{margin:7px 0}

      #cfrSection .layout,#oshaSection .layout,#cfrContainer,#oshaContainer,#cfrContainer .section-content,#oshaContainer .section-content{min-width:0;max-width:100%}
      #cfrContainer,#oshaContainer{overflow-x:hidden}
      #cfrContainer .section-path,#oshaContainer .section-path{color:var(--muted);overflow-wrap:anywhere;word-break:normal}
      #cfrContainer .bookmark-controls,#oshaContainer .bookmark-controls{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:12px 0 18px}
      #cfrContainer .bookmark-controls select,#cfrContainer .bookmark-controls button,#oshaContainer .bookmark-controls select,#oshaContainer .bookmark-controls button{min-height:44px;max-width:100%;font-size:1rem}
      #cfrContainer .level-title>summary,#oshaContainer .level-title>summary{border-left:6px solid var(--sf-regulation-deep)!important;background:linear-gradient(90deg,rgba(23,63,107,.11),#fbfdff 34%)!important;font-weight:850}
      #cfrContainer .level-subtitle>summary,#oshaContainer .level-subtitle>summary{border-left:6px solid #214f78!important;background:linear-gradient(90deg,rgba(33,79,120,.10),#fbfdff 34%)!important}
      #cfrContainer .level-chapter>summary,#oshaContainer .level-chapter>summary{border-left:6px solid var(--sf-regulation-chapter)!important;background:linear-gradient(90deg,rgba(43,98,143,.10),#fbfdff 34%)!important}
      #cfrContainer .level-subchapter>summary,#oshaContainer .level-subchapter>summary{border-left:6px solid var(--sf-regulation-subchapter)!important;background:linear-gradient(90deg,rgba(79,134,180,.11),#fbfdff 34%)!important}
      #cfrContainer .level-part>summary,#oshaContainer .level-part>summary{border-left:6px solid var(--sf-regulation-part)!important;background:linear-gradient(90deg,rgba(11,132,255,.10),#fbfdff 34%)!important}
      #cfrContainer .level-subpart>summary,#oshaContainer .level-subpart>summary{border-left:6px solid var(--sf-regulation-subpart)!important;background:linear-gradient(90deg,rgba(118,180,229,.15),#fbfdff 34%)!important}
      #cfrContainer .level-section,#oshaContainer .level-section{border-left:6px solid var(--sf-regulation)!important;background:#fff}
      #cfrContainer .level-section>summary,#oshaContainer .level-section>summary{color:var(--text);background:linear-gradient(90deg,rgba(11,132,255,.08),#fff 38%)}

      @media(max-width:600px){
        #cfrSection .layout,#oshaSection .layout{gap:14px}
        #cfrContainer,#oshaContainer{padding:8px;border-radius:16px}
        #cfrContainer details,#oshaContainer details{width:100%;max-width:100%;min-width:0;margin:9px 0;padding:0;overflow:hidden}
        #cfrContainer details:not(.level-section),#oshaContainer details:not(.level-section){border:0;border-radius:0;background:transparent}
        #cfrContainer details:not(.level-section)>summary,#oshaContainer details:not(.level-section)>summary{display:block;width:100%;padding:13px 14px;border-top:1px solid var(--line-soft);border-right:1px solid var(--line-soft);border-bottom:1px solid var(--line-soft);border-radius:14px;font-size:1.06rem;line-height:1.3;overflow-wrap:anywhere}
        #cfrContainer .level-title>summary,#oshaContainer .level-title>summary{font-size:1.12rem;letter-spacing:-.01em}
        #cfrContainer .level-chapter>summary,#oshaContainer .level-chapter>summary{font-size:1.08rem}
        #cfrContainer .level-subchapter>summary,#oshaContainer .level-subchapter>summary,#cfrContainer .level-part>summary,#oshaContainer .level-part>summary{font-size:1.05rem}
        #cfrContainer .level-subpart>summary,#oshaContainer .level-subpart>summary{font-size:1.02rem}
        #cfrContainer details:not(.level-section)>.section-content,#oshaContainer details:not(.level-section)>.section-content{width:100%;padding:0;margin:0}
        #cfrContainer .level-section,#oshaContainer .level-section{border-top:1px solid var(--line-soft)!important;border-right:1px solid var(--line-soft)!important;border-bottom:1px solid var(--line-soft)!important;border-radius:15px;background:#fff}
        #cfrContainer .level-section>summary,#oshaContainer .level-section>summary{padding:15px 14px;font-size:1.14rem;line-height:1.32;overflow-wrap:anywhere}
        #cfrContainer .level-section>.section-content,#oshaContainer .level-section>.section-content{padding:0 14px 16px}
        #cfrContainer .level-section .section-content>p:not(.section-path),#oshaContainer .level-section .section-content>p:not(.section-path){font-size:1.12rem;line-height:1.58;overflow-wrap:anywhere}
        #cfrContainer .section-path,#oshaContainer .section-path{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;margin:3px 0 12px;font-size:.82rem;line-height:1.35;color:#6b7788}
        #cfrContainer .bookmark-controls,#oshaContainer .bookmark-controls{margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid #e5eaf0}
      }
    `;
    document.head.appendChild(style);
  }

  function applyFiveSContentQuality(attempt) {
    const section = document.getElementById("fiveSSection");
    if (!section) {
      if (attempt < 40) window.setTimeout(() => applyFiveSContentQuality(attempt + 1), 100);
      return;
    }

    const overview = section.querySelector(".five-s-overview");
    if (overview) overview.open = false;

    Object.entries(fiveSStageContent).forEach(([stageName, html]) => {
      const stage = section.querySelector(`.five-s-stage[data-stage="${stageName}"]`);
      const body = stage ? stage.querySelector(".five-s-detail-body") : null;
      if (body) body.innerHTML = html;
    });
  }

  function loadScript(selector,src,dataName){
    if(document.querySelector(selector))return;
    const script=document.createElement("script");
    script.src=src;
    script.defer=true;
    script.dataset[dataName]="true";
    document.head.appendChild(script);
  }

  function initializeQualityPass(){
    applyMobileQualityStyles();
    applyFiveSContentQuality(0);
    loadScript('script[data-skyfire-navigation="true"]','./navigation.js?v=quality-v7','skyfireNavigation');
    loadScript('script[data-nested-tree="true"]','./nested-tree.js?v=quality-v7','nestedTree');
    loadScript('script[data-home-preview="true"]','./home-preview.js?v=quality-v7','homePreview');
  }

  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initializeQualityPass);
  else initializeQualityPass();
})();