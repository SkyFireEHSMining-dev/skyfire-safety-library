(function () {
  const NOTE_CLASS = "mine-act-verbatim-fidelity-note";

  function addNote(card, text) {
    const body = card?.querySelector(".mine-act-verbatim-body");
    if (!body || [...body.querySelectorAll(`.${NOTE_CLASS}`)].some(note => note.textContent.includes(text))) return;
    const note = document.createElement("div");
    note.className = NOTE_CLASS;
    note.innerHTML = `<strong>Source fidelity note:</strong> ${text}`;
    body.appendChild(note);
  }

  function replaceInCard(card, from, to) {
    if (!card) return false;
    const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.nodeValue.includes(from)) {
        node.nodeValue = node.nodeValue.replace(from, to);
        return true;
      }
    }
    return false;
  }

  function provisionFor(sectionText) {
    return [...document.querySelectorAll("#mineActSection .mine-act-provision")].find(card =>
      card.querySelector(".mine-act-section-number")?.textContent.trim() === sectionText
    );
  }

  function installStyle() {
    if (document.getElementById("mineActVerbatimFidelityStyles")) return;
    const style = document.createElement("style");
    style.id = "mineActVerbatimFidelityStyles";
    style.textContent = `
      .mine-act-verbatim-fidelity-note{margin:12px 0 0;padding:9px 11px;border-left:4px solid #64748b;background:#f8fafc;color:var(--muted);font-size:.88rem;line-height:1.45}
    `;
    document.head.appendChild(style);
  }

  function apply() {
    const root = document.getElementById("mineActSection");
    if (!root || !root.querySelector(".mine-act-verbatim")) return false;
    installStyle();

    root.querySelectorAll(".mine-act-verbatim-chip").forEach(chip => {
      if (chip.textContent.trim() === "VERBATIM LAW") chip.textContent = "VERBATIM U.S. CODE TEXT";
    });

    const section105 = provisionFor("§105")?.querySelector(".mine-act-verbatim");
    if (replaceInCard(section105, "pursuant to this paragraph.", "pursuant to his paragraph.")) {
      addNote(section105, "30 U.S.C. §815(c)(2) reads “his paragraph” in the codified source; the U.S. Code editorial note states that it probably should be “this.” SkyFire preserves the source wording rather than silently correcting it.");
    }

    const section110 = provisionFor("§110")?.querySelector(".mine-act-verbatim");
    if (replaceInCard(section110, "not more than $5,000 for each day", "not more than $$5,000 for each day")) {
      addNote(section110, "30 U.S.C. §820(b)(1) displays “$$5,000” in the codified source and marks it “So in original.” SkyFire preserves that source text. This historical statutory figure is not a current penalty calculator; verify current Part 100 and federal civil-penalty adjustments for live penalty amounts.");
    }

    return true;
  }

  let attempts = 0;
  function start() {
    if (apply()) return;
    attempts += 1;
    if (attempts < 180) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
