const { chromium } = require("playwright");

(async () => {
  const root = "http://127.0.0.1:8765/";
  const screens = [
    {name:"phone",viewport:{width:390,height:844},isMobile:true,hasTouch:true},
    {name:"tablet",viewport:{width:820,height:1180},isMobile:true,hasTouch:true},
    {name:"desktop",viewport:{width:1440,height:900},isMobile:false,hasTouch:false}
  ];
  const browser = await chromium.launch({headless:true,args:["--no-sandbox"]});
  try {
    for (const screen of screens) {
      const context = await browser.newContext({
        viewport:screen.viewport,isMobile:screen.isMobile,hasTouch:screen.hasTouch,
        serviceWorkers:"allow"
      });
      try {
        const page = await context.newPage();
        const errors=[];
        page.on("pageerror",e=>errors.push(e.message));
        const resp = await page.goto(root,{waitUntil:"domcontentloaded",timeout:30000});
        if (!resp || !resp.ok()) throw new Error(screen.name+": home unavailable");
        await page.waitForSelector('button.skyfire-hub-home-tile.regulatory-hub',{timeout:25000});
        await page.locator('button.skyfire-hub-home-tile.regulatory-hub').click();
        await page.locator('#regulatoryResourcesHubSection button.skyfire-hub-item').filter({hasText:'MSHA Forms Library'}).click();
        if (!await page.locator("#docsSection").isVisible()) {
          throw new Error(screen.name+": Forms Library did not open");
        }
        const anchorCount = await page.locator('#docsSection a[href^="docs/MSHA-form-"][href$=".pdf"]').count();
        if(anchorCount < 28) throw new Error(screen.name+": missing form links "+anchorCount);
        // PWA install is asynchronous; confirm its cache contains the corrected sources.
        await page.evaluate(async () => { await navigator.serviceWorker.ready; });
        await page.waitForFunction(async () => {
          const hit = await caches.match("./docs/MSHA-form-5000-23.pdf");
          return Boolean(hit && hit.ok);
        },null,{timeout:60000});
        await context.setOffline(true);
        const offline = await page.reload({waitUntil:"domcontentloaded",timeout:30000});
        if(!offline || !offline.ok()) throw new Error(screen.name+": cached home unavailable offline");
        await page.waitForSelector('button.skyfire-hub-home-tile.regulatory-hub',{timeout:20000});
        await page.locator('button.skyfire-hub-home-tile.regulatory-hub').click();
        await page.locator('#regulatoryResourcesHubSection button.skyfire-hub-item').filter({hasText:'MSHA Forms Library'}).click();
        if(!await page.locator("#docsSection").isVisible()) throw new Error(screen.name+": offline Forms Library not accessible");
        const asset = await page.evaluate(async () => {
          const paths = ["docs/MSHA-form-5000-23.pdf","docs/MSHA-form-7000-51.pdf","docs/MSHA-form-2000-38.pdf","docs/MSHA-form-4000-9.pdf"];
          const report=[];
          for (const path of paths) {
            const r=await fetch(path);
            const b=await r.arrayBuffer();
            report.push({path,status:r.status,bytes:b.byteLength});
          }
          return report;
        });
        if(asset.some(x=>x.status!==200 || x.bytes<10000)) throw new Error(screen.name+": offline corrected form not available "+JSON.stringify(asset));
        if(errors.length) console.warn(screen.name+" browser page errors: "+errors.slice(0,3).join(" | "));
        console.log("PASS "+screen.name+" (Chromium emulation): online/open, 14 PDF links, SW cache, offline reload, four corrected PDFs "+JSON.stringify(asset.map(x=>x.bytes)));
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
})().catch(e=>{console.error("FAIL browser smoke:",e.stack||e);process.exit(1)});
