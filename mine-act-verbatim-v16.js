(function () {
  const SOURCE_CHECKED = "September 14, 2026";
  const CURRENT_THROUGH = "Public Law 119-103 (September 2, 2026)";
  const manifest = {
    "§3": { usc:"30 U.S.C. §802", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section802", files:["802.txt"] },
    "§103": { usc:"30 U.S.C. §813", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section813", files:["813.txt"], clean:[["repersentative 1 So in original. Probably should be “representative”. of", "repersentative of"]], notes:[`The codified source contains the spelling "repersentative" in subsection (g)(1); the U.S. Code editorial note states that it probably should be "representative." SkyFire preserves the statutory wording and removes only the editorial footnote marker from the displayed law text.`] },
    "§104": { usc:"30 U.S.C. §814", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section814", files:["814.txt"] },
    "§105": { usc:"30 U.S.C. §815", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section815", files:["815.txt"], clean:[["his 1 So in original. Probably should be “this”. paragraph", "his paragraph"]], notes:[`30 U.S.C. §815(c)(2) reads "his paragraph" in the codified source; the U.S. Code editorial note states that it probably should be "this." SkyFire preserves the statutory wording and removes only the editorial footnote marker from the displayed law text.`] },
    "§107": { usc:"30 U.S.C. §817", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section817", files:["817.txt"] },
    "§110": { usc:"30 U.S.C. §820", url:"https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section820", files:["820.txt"], clean:[["$$5,000 1 So in original. for", "$$5,000 for"]], notes:[`30 U.S.C. §820(b)(1) displays "$$5,000" in the codified source and marks it "So in original." SkyFire preserves the statutory wording and removes only the editorial footnote marker from the displayed law text.`], penalty:`Statutory dollar figures shown here are the codified statutory text, not a current penalty calculator. For a live penalty amount, verify current 30 CFR Part 100 and current federal civil-penalty adjustments.` }
  };

  function esc(v){return String(v??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function ensureStyle(){
    if(document.getElementById("mineActVerbatimStyles"))return;
    const s=document.createElement("style");s.id="mineActVerbatimStyles";s.textContent=`
      .mine-act-verbatim{margin:16px 0 2px;border:1px solid #bfd9f3;border-left:5px solid var(--sf-law);border-radius:14px;background:#fff;overflow:hidden}
      .mine-act-verbatim>summary{list-style:none;cursor:pointer;padding:13px 14px;color:#075ca8;font-weight:850;line-height:1.35;background:#f8fbff}
      .mine-act-verbatim>summary::-webkit-details-marker{display:none}.mine-act-verbatim>summary::after{content:'+';float:right}.mine-act-verbatim[open]>summary::after{content:'−'}
      .mine-act-verbatim-body{padding:14px}.mine-act-verbatim-meta{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-bottom:10px}
      .mine-act-verbatim-chip{padding:5px 8px;border-radius:999px;background:var(--sf-law-soft);color:#075ca8;font-size:.78rem;font-weight:900}.mine-act-verbatim-citation{font-weight:850;color:#075ca8}
      .mine-act-verbatim-status{margin:0 0 12px!important;color:var(--muted);font-size:.88rem!important;line-height:1.45!important}
      .mine-act-verbatim-text{white-space:pre-wrap;font-family:Georgia,'Times New Roman',serif;font-size:1rem;line-height:1.58;color:var(--text);border-top:1px solid #d8e6f5;padding-top:12px}
      .mine-act-verbatim-note{margin:11px 0 0;padding:9px 11px;border-left:4px solid #64748b;background:#f8fafc;color:var(--muted);font-size:.88rem;line-height:1.45}
      .mine-act-verbatim-penalty{border-left-color:var(--sf-amber,#d97706);background:#fff8ed;color:var(--text)}
      .mine-act-verbatim-link{display:flex;justify-content:center;margin-top:13px;padding:10px 12px;border-radius:11px;background:#0b84ff;color:#fff;text-decoration:none;font-weight:850;text-align:center}
      @media(max-width:600px){#mineActSection .mine-act-verbatim{border:0;border-left:5px solid #75b7f0;border-radius:0;background:transparent;overflow:visible}#mineActSection .mine-act-verbatim>summary{padding:10px 0 10px 11px;background:transparent}#mineActSection .mine-act-verbatim-body{padding:0 0 0 11px}.mine-act-verbatim-text{line-height:1.55}}
    `;document.head.appendChild(s);
  }
  async function loadText(files){const parts=await Promise.all(files.map(async f=>{const r=await fetch(`./Data/mine-act/${f}`);if(!r.ok)throw new Error(`${f}: ${r.status}`);return r.text();}));return parts.join("");}
  function statutoryOnly(item,text){return (item.clean||[]).reduce((out,[from,to])=>out.split(from).join(to),text);}
  function makeDetails(act,item,text){
    const d=document.createElement("details");d.className="mine-act-verbatim";
    d.innerHTML=`<summary>Exact statutory text — expand to read</summary><div class="mine-act-verbatim-body"><div class="mine-act-verbatim-meta"><span class="mine-act-verbatim-chip">VERBATIM U.S. CODE TEXT</span><span class="mine-act-verbatim-citation">Mine Act ${esc(act)} ↔ ${esc(item.usc)}</span></div><p class="mine-act-verbatim-status">Current codified U.S. Code source stored locally for offline reference. Display removes only non-statutory editorial footnote callouts identified below. Source checked ${SOURCE_CHECKED}; U.S. Code release point current through ${CURRENT_THROUGH}.</p><div class="mine-act-verbatim-text"></div>${(item.notes||[]).map(n=>`<div class="mine-act-verbatim-note"><strong>Source fidelity note:</strong> ${esc(n)}</div>`).join("")}${item.penalty?`<div class="mine-act-verbatim-note mine-act-verbatim-penalty"><strong>Penalty caution:</strong> ${esc(item.penalty)}</div>`:""}<a class="mine-act-verbatim-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Open official ${esc(item.usc)}</a></div>`;
    d.querySelector(".mine-act-verbatim-text").textContent=statutoryOnly(item,text);return d;
  }
  let running=false,done=false;
  async function install(){
    if(done||running)return done;const section=document.getElementById("mineActSection");if(!section?.querySelector(".mine-act-provision"))return false;running=true;ensureStyle();
    try{
      for(const card of section.querySelectorAll(".mine-act-provision")){const act=card.querySelector(".mine-act-section-number")?.textContent.trim();const item=manifest[act];const body=card.querySelector(".mine-act-provision-body");if(!item||!body||body.querySelector(".mine-act-verbatim"))continue;const text=await loadText(item.files);const el=makeDetails(act,item,text);const depth=body.querySelector(".mine-act-offline-depth");if(depth)depth.insertAdjacentElement("afterend",el);else body.insertBefore(el,body.querySelector(".mine-act-source-note")||null);}
      done=true;window.SkyFireMineActVerbatimV16={sourceChecked:SOURCE_CHECKED,currentThrough:CURRENT_THROUGH,manifest};return true;
    }catch(e){console.error("Mine Act verbatim load failed",e);return false;}finally{running=false;}
  }
  let tries=0;function start(){Promise.resolve(install()).then(ok=>{if(ok)return;tries++;if(tries<160)setTimeout(start,100);});}if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
