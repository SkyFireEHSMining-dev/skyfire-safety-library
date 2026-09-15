(function () {
  const SOURCE_CHECKED = "September 14, 2026";
  const CURRENT_THROUGH = "Public Law 119-103 (September 2, 2026)";
  const REQUIRED = ["§3", "§103", "§104", "§105", "§107", "§110"];

  function esc(value) {
    return String(value ?? "").replace(/[&<>\"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
  }

  function ensureStyle() {
    if (document.getElementById("mineActVerbatimStyles")) return;
    const style = document.createElement("style");
    style.id = "mineActVerbatimStyles";
    style.textContent = `
      .mine-act-verbatim{margin:16px 0 2px;border:1px solid #bfd9f3;border-left:5px solid var(--sf-law);border-radius:14px;background:#fff;overflow:hidden}
      .mine-act-verbatim>summary{list-style:none;cursor:pointer;padding:13px 14px;color:#075ca8;font-weight:850;line-height:1.35;background:#f8fbff}
      .mine-act-verbatim>summary::-webkit-details-marker{display:none}
      .mine-act-verbatim>summary::after{content:'+';float:right;font-size:1.15rem}.mine-act-verbatim[open]>summary::after{content:'−'}
      .mine-act-verbatim-body{padding:14px}
      .mine-act-verbatim-meta{display:flex;flex-wrap:wrap;gap:7px;align-items:center;margin-bottom:11px}
      .mine-act-verbatim-chip{display:inline-flex;padding:5px 8px;border-radius:999px;background:var(--sf-law-soft);color:#075ca8;font-size:.78rem;font-weight:900;letter-spacing:.03em}
      .mine-act-verbatim-citation{font-weight:850;color:#075ca8}
      .mine-act-verbatim-status{margin:0 0 13px!important;color:var(--muted);font-size:.88rem!important;line-height:1.45!important}
      .mine-act-verbatim-block{padding:11px 0;border-top:1px solid #d8e6f5}
      .mine-act-verbatim-block:first-of-type{border-top:0}
      .mine-act-verbatim-label{display:block;margin-bottom:5px;color:#075ca8;font-weight:850}
      .mine-act-verbatim-block p{margin:0 0 8px!important;font-family:Georgia,'Times New Roman',serif;font-size:1rem!important;line-height:1.58!important;color:var(--text)}
      .mine-act-verbatim-block p:last-child{margin-bottom:0!important}
      .mine-act-verbatim-note{margin:11px 0 0;padding:9px 11px;border-left:4px solid #64748b;background:#f8fafc;color:var(--muted);font-size:.88rem;line-height:1.45}
      .mine-act-verbatim-penalty-note{border-left-color:var(--sf-amber,#d97706);background:#fff8ed;color:var(--text)}
      .mine-act-verbatim-link{display:flex;justify-content:center;margin-top:13px;padding:10px 12px;border-radius:11px;background:#0b84ff;color:#fff;text-decoration:none;font-weight:850;text-align:center}
      @media(max-width:600px){
        #mineActSection .mine-act-verbatim{margin:16px 0 2px;border:0;border-left:5px solid #75b7f0;border-radius:0;background:transparent;overflow:visible}
        #mineActSection .mine-act-verbatim>summary{padding:10px 0 10px 11px;background:transparent}
        #mineActSection .mine-act-verbatim-body{padding:0 0 0 11px}
        #mineActSection .mine-act-verbatim-block{padding:11px 2px}
        #mineActSection .mine-act-verbatim-block p{font-size:1rem!important;line-height:1.55!important}
      }
    `;
    document.head.appendChild(style);
  }

  function renderData(data) {
    const notes = (data.sourceNotes || []).map(note => `<div class="mine-act-verbatim-note"><strong>Source fidelity note:</strong> ${esc(note)}</div>`).join("");
    const penalty = data.penaltyNote ? `<div class="mine-act-verbatim-note mine-act-verbatim-penalty-note"><strong>Penalty caution:</strong> ${esc(data.penaltyNote)}</div>` : "";
    const blocks = data.blocks.map(block => `
      <div class="mine-act-verbatim-block">
        ${block.label ? `<span class="mine-act-verbatim-label">${esc(block.label)}</span>` : ""}
        ${block.paras.map(p => `<p>${esc(p)}</p>`).join("")}
      </div>`).join("");
    return `
      <details class="mine-act-verbatim">
        <summary>Exact statutory text — expand to read</summary>
        <div class="mine-act-verbatim-body">
          <div class="mine-act-verbatim-meta">
            <span class="mine-act-verbatim-chip">VERBATIM U.S. CODE TEXT</span>
            <span class="mine-act-verbatim-citation">Mine Act ${esc(data.act)} ↔ ${esc(data.usc)}</span>
          </div>
          <p class="mine-act-verbatim-status">Current codified U.S. Code text stored locally for offline reference. Source checked ${SOURCE_CHECKED}; U.S. Code release point current through ${CURRENT_THROUGH}.</p>
          ${blocks}
          ${notes}
          ${penalty}
          <a class="mine-act-verbatim-link" href="${esc(data.url)}" target="_blank" rel="noopener noreferrer">Open official ${esc(data.usc)}</a>
        </div>
      </details>`;
  }

  function install() {
    const data = window.SkyFireMineActVerbatimData;
    if (!data || !REQUIRED.every(key => data[key])) return false;
    const section = document.getElementById("mineActSection");
    if (!section || !section.querySelector(".mine-act-provision")) return false;
    ensureStyle();

    section.querySelectorAll(".mine-act-provision").forEach(card => {
      const act = card.querySelector(".mine-act-section-number")?.textContent.trim();
      const item = data[act];
      const body = card.querySelector(".mine-act-provision-body");
      if (!item || !body || body.querySelector(".mine-act-verbatim")) return;
      const anchor = body.querySelector(".mine-act-source-note");
      const depth = body.querySelector(".mine-act-offline-depth");
      const wrap = document.createElement("div");
      wrap.innerHTML = renderData(item).trim();
      if (depth) depth.insertAdjacentElement("afterend", wrap.firstElementChild);
      else body.insertBefore(wrap.firstElementChild, anchor || null);
    });

    window.SkyFireMineActVerbatimV16 = { sourceChecked: SOURCE_CHECKED, currentThrough: CURRENT_THROUGH, sections: REQUIRED.slice() };
    return true;
  }

  let attempts = 0;
  function start() {
    if (install()) return;
    attempts += 1;
    if (attempts < 220) window.setTimeout(start, 75);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();
