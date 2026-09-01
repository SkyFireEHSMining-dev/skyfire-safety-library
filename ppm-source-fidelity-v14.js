(function () {
  const CHECKED = 'Source checked August 2026';
  let tries = 0;

  const replacements = [
    {
      match: 'I.4-3',
      title: 'I.4-3 · Jurisdiction Over Borrow Pits',
      paragraphs: [
        'Section 6(b)(7) in the MSHA/OSHA Interagency Agreement states:',
        "'Borrow Pits' are subject to OSHA jurisdiction except those borrow pits located on mine property or related to mining. (For example, a borrow pit used to build a road or construct a surface facility on mine property is subject to MSHA jurisdiction.) 'Borrow Pit' means an area of land where the overburden, consisting of unconsolidated rock, glacial debris, or other earth material overlying bedrock is extracted from the surface. Extraction occurs on a one-time basis or intermittently as need occurs, for use as fill materials by the extracting party in the form in which it is extracted. No milling is involved, except for the use of a scalping screen to remove large rocks, wood and trash. The material is used by the extracting party more for its bulk than its intrinsic qualities on land which is relatively near the borrow pit.",
        'Thus, if earth is being extracted from a pit and is used as fill material in basically the same form as it is extracted, the operation is considered to be a "borrow pit." For example, if a landowner has a loader and uses bank run material to fill potholes in a road, low places in the yard, etc., and no milling or processing is involved, except for the use of a scalping screen, the operation is a borrow pit.',
        'The scalping screen can be either portable or stationary and is used to remove large rocks, wood, and trash. In addition, whether the scalping is located where the material is dug, or whether the user of the material from the pit is the owner of the pit or a purchaser of the material from the pit, does not change the character of the operation, as long as it meets the other criteria.',
        'District managers should contact headquarters regarding any questionable operations before final determinations are made.'
      ]
    },
    {
      match: '48.5/48.25',
      title: '48.5/48.25 · Training of New Miners; Minimum Courses of Instruction; Hours of Instruction',
      paragraphs: [
        'A. Underground Mines',
        'An experienced surface miner who begins work in an underground mine is, for training purposes, a new miner and must receive new miner training under Section 48.5. The MSHA district manager may credit applicable surface training (Subpart B) toward the underground training (Subpart A) requirement.',
        'B. Surface Mines and Surface Areas of Underground Mines',
        'An experienced underground miner who begins work in a surface mine is, for training purposes, a new miner and must receive new miner training under Section 48.25. The MSHA district manager may credit applicable underground training (Subpart A) toward the surface training (Subpart B) requirements.',
        'Job Site Training',
        'Health and safety training may be conducted at the job site and may involve performance of actual job tasks. Job site training must be completed under close and continuous supervision of an approved instructor, with training, not production, as the primary goal. The training is acceptable if the following conditions are met:',
        '1. Instructors must follow an outline in which each step of the job is broken down into instructional units. The students must demonstrate safe performance of each job step. Several units may be combined in the same instructional period.',
        '2. All health and safety standards must be observed.'
      ]
    }
  ];

  function findEntry(match) {
    return Array.from(document.querySelectorAll('#mshaGuidanceSection details.ppm-entry'))
      .find(entry => (entry.querySelector(':scope > summary')?.textContent || '').includes(match));
  }

  function renderParagraph(p) {
    if (p === 'A. Underground Mines' || p === 'B. Surface Mines and Surface Areas of Underground Mines' || p === 'Job Site Training') {
      return `<h4 class="ppm-source-subhead">${p}</h4>`;
    }
    return `<p>${p}</p>`;
  }

  function applyReplacement(config) {
    const entry = findEntry(config.match);
    if (!entry) return false;

    const strong = entry.querySelector(':scope > summary strong');
    if (strong) strong.textContent = config.title;

    const official = entry.querySelector('.ppm-official-text');
    if (!official) return false;
    official.innerHTML = config.paragraphs.map(renderParagraph).join('');

    entry.dataset.ppmSourceFidelity = 'complete';
    return true;
  }

  function addStyles() {
    if (document.getElementById('ppmSourceFidelityStyles')) return;
    const style = document.createElement('style');
    style.id = 'ppmSourceFidelityStyles';
    style.textContent = `
      .ppm-source-subhead{margin:22px 0 8px;font-size:1.04rem;line-height:1.35;color:var(--text);font-weight:850}
      .ppm-official-text .ppm-source-subhead:first-child{margin-top:4px}
    `;
    document.head.appendChild(style);
  }

  function start() {
    addStyles();
    const results = replacements.map(applyReplacement);
    if (results.every(Boolean)) {
      window.SkyFirePPMSourceFidelityV14 = {
        completeEntries: ['I.4-3', '48.5/48.25'],
        checked: CHECKED
      };
      return;
    }
    tries += 1;
    if (tries < 160) setTimeout(start, 75);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();