(function () {
  const rows = [
    ["§2", "30 U.S.C. §801", "Findings and purpose", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A801+edition%3Aprelim%29"],
    ["§3", "30 U.S.C. §802", "Definitions", "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section802"],
    ["§4", "30 U.S.C. §803", "Mines subject to coverage", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A803+edition%3Aprelim%29"],
    ["§101", "30 U.S.C. §811", "Mandatory safety and health standards", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A811+edition%3Aprelim%29"],
    ["§103", "30 U.S.C. §813", "Inspections, investigations, and recordkeeping", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A813+edition%3Aprelim%29"],
    ["§104", "30 U.S.C. §814", "Citations and orders", "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section814"],
    ["§105", "30 U.S.C. §815", "Procedure for enforcement", "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section815"],
    ["§107", "30 U.S.C. §817", "Imminent-danger / withdrawal authority", "https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title30-section817"],
    ["§110", "30 U.S.C. §820", "Penalties", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A820+edition%3Aprelim%29"],
    ["§115", "30 U.S.C. §825", "Mandatory health and safety training", "https://uscode.house.gov/view.xhtml?req=%28title%3A30+section%3A825+edition%3Aprelim%29"]
  ];

  function ensureStyle() {
    if (document.getElementById("mineActCrosswalkStyles")) return;
    const style = document.createElement("style");
    style.id = "mineActCrosswalkStyles";
    style.textContent = `
      .mine-act-crosswalk{margin:14px 0 16px;border:1px solid #cfe3fb;border-left:5px solid var(--sf-law);border-radius:14px;background:#f8fbff;overflow:hidden}
      .mine-act-crosswalk>summary{list-style:none;cursor:pointer;padding:13px 14px;color:#075ca8;font-weight:850;line-height:1.3}
      .mine-act-crosswalk>summary::-webkit-details-marker{display:none}
      .mine-act-crosswalk>summary::after{content:'+';float:right;font-size:1.15rem;line-height:1}
      .mine-act-crosswalk[open]>summary::after{content:'−'}
      .mine-act-crosswalk-body{padding:0 14px 14px}
      .mine-act-crosswalk-body>p{margin:0 0 10px!important;font-size:.95rem!important;color:var(--muted)}
      .mine-act-crosswalk-list{display:grid;gap:0;border-top:1px solid #d8e6f5}
      .mine-act-crosswalk-row{display:grid;grid-template-columns:minmax(70px,.65fr) minmax(118px,1fr);gap:6px 12px;padding:10px 2px;border-bottom:1px solid #d8e6f5;text-decoration:none;color:var(--text)}
      .mine-act-crosswalk-row strong{color:#075ca8}
      .mine-act-crosswalk-row span{font-weight:750}
      .mine-act-crosswalk-row small{grid-column:1/-1;color:var(--muted);font-size:.86rem}
      .mine-act-crosswalk-note{margin-top:10px;padding:9px 10px;border-left:4px solid var(--sf-law);background:#fff;font-size:.88rem;line-height:1.42;color:var(--muted)}
      @media(max-width:600px){
        .mine-act-crosswalk{margin:12px 0 14px;border-radius:12px}
        .mine-act-crosswalk>summary{padding:12px}
        .mine-act-crosswalk-body{padding:0 12px 12px}
        .mine-act-crosswalk-row{grid-template-columns:1fr;gap:2px;padding:9px 1px}
        .mine-act-crosswalk-row small{grid-column:auto}
      }
    `;
    document.head.appendChild(style);
  }

  function markup() {
    return `
      <details class="mine-act-crosswalk">
        <summary>Mine Act ↔ U.S. Code crosswalk</summary>
        <div class="mine-act-crosswalk-body">
          <p>The Mine Act keeps its original Act section numbers, while the official U.S. Code site displays the codified Title 30 section numbers. These pairs point to the same statutory provisions.</p>
          <div class="mine-act-crosswalk-list">
            ${rows.map(([act, usc, title, url]) => `
              <a class="mine-act-crosswalk-row" href="${url}" target="_blank" rel="noopener noreferrer">
                <strong>Mine Act ${act}</strong>
                <span>${usc}</span>
                <small>${title}</small>
              </a>`).join("")}
          </div>
          <div class="mine-act-crosswalk-note"><strong>Example:</strong> if someone cites <strong>Mine Act §104(d)</strong>, the official U.S. Code page is <strong>30 U.S.C. §814(d)</strong>. The subsection letter normally carries across even though the section number changes.</div>
        </div>
      </details>`;
  }

  function install() {
    const section = document.getElementById("mineActSection");
    const intro = section?.querySelector(".mine-act-intro");
    const equation = intro?.querySelector(".mine-act-equation");
    if (!section || !intro || !equation) return false;
    if (intro.querySelector(".mine-act-crosswalk")) return true;
    ensureStyle();
    const wrap = document.createElement("div");
    wrap.innerHTML = markup().trim();
    equation.insertAdjacentElement("afterend", wrap.firstElementChild);
    return true;
  }

  let attempts = 0;
  function start() {
    if (install()) return;
    attempts += 1;
    if (attempts < 160) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
