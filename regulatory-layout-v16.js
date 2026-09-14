(function () {
  const order = [
    "MSHA Ready",
    "SkyFire Technical Guidance",
    "MSHA / 30 CFR",
    "Mine Act",
    "OSHA / 29 CFR",
    "MSHA Forms Library",
    "MSHA PPM & Agency Guidance",
    "MSHA Enforcement & Inspector Resources"
  ];

  const classByTitle = {
    "MSHA Ready": "reg-slot-ready",
    "SkyFire Technical Guidance": "reg-slot-skyfire",
    "MSHA / 30 CFR": "reg-slot-msha-cfr",
    "Mine Act": "reg-slot-mine-act",
    "OSHA / 29 CFR": "reg-slot-osha-cfr",
    "MSHA Forms Library": "reg-slot-forms",
    "MSHA PPM & Agency Guidance": "reg-slot-ppm",
    "MSHA Enforcement & Inspector Resources": "reg-slot-enforcement"
  };

  function ensureStyle() {
    if (document.getElementById("regulatoryLayoutV16Styles")) return;
    const style = document.createElement("style");
    style.id = "regulatoryLayoutV16Styles";
    style.textContent = `
      @media(min-width:1000px){
        #regulatoryResourcesHubSection .skyfire-hub-list{grid-template-columns:repeat(3,minmax(0,1fr))!important;align-items:stretch}
        #regulatoryResourcesHubSection .reg-slot-ready{grid-column:1;grid-row:1}
        #regulatoryResourcesHubSection .reg-slot-skyfire{grid-column:2;grid-row:1}
        #regulatoryResourcesHubSection .reg-slot-msha-cfr{grid-column:1;grid-row:2}
        #regulatoryResourcesHubSection .reg-slot-mine-act{grid-column:2;grid-row:2}
        #regulatoryResourcesHubSection .reg-slot-osha-cfr{grid-column:3;grid-row:2}
        #regulatoryResourcesHubSection .reg-slot-forms{grid-column:1;grid-row:3}
        #regulatoryResourcesHubSection .reg-slot-ppm{grid-column:2;grid-row:3}
        #regulatoryResourcesHubSection .reg-slot-enforcement{grid-column:3;grid-row:3}
      }
    `;
    document.head.appendChild(style);
  }

  function findByTitle(list, title) {
    return Array.from(list.querySelectorAll(".skyfire-hub-item")).find(item => item.querySelector("strong")?.textContent.trim() === title) || null;
  }

  function normalize() {
    const list = document.querySelector("#regulatoryResourcesHubSection .skyfire-hub-list");
    if (!list) return false;
    ensureStyle();
    order.forEach(title => {
      const item = findByTitle(list, title);
      if (!item) return;
      const cls = classByTitle[title];
      if (cls) item.classList.add(cls);
      list.appendChild(item);
    });
    return true;
  }

  let attempts = 0;
  function start() {
    if (normalize()) {
      window.setTimeout(normalize, 250);
      window.setTimeout(normalize, 800);
      return;
    }
    attempts += 1;
    if (attempts < 120) window.setTimeout(start, 75);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
