const { webkit } = require("playwright");
(async () => {
  const views=[
    {name:"iPhone-sized WebKit",viewport:{width:390,height:844},isMobile:true,hasTouch:true},
    {name:"iPad-sized WebKit",viewport:{width:820,height:1180},isMobile:true,hasTouch:true},
    {name:"desktop WebKit",viewport:{width:1440,height:900},isMobile:false,hasTouch:false}
  ];
  const browser=await webkit.launch({headless:true});
  try {
    for(const view of views) {
      const context=await browser.newContext({viewport:view.viewport,isMobile:view.isMobile,hasTouch:view.hasTouch});
      try {
        const page=await context.newPage();
        const response=await page.goto("http://127.0.0.1:8765/",{waitUntil:"domcontentloaded",timeout:30000});
        if(!response || !response.ok())throw new Error(view.name+" failed to load home");
        await page.locator('button.skyfire-hub-home-tile.regulatory-hub').click({timeout:25000});
        await page.locator('#regulatoryResourcesHubSection button.skyfire-hub-item').filter({hasText:"MSHA Forms Library"}).click();
        if(!await page.locator("#docsSection").isVisible())throw new Error(view.name+" Forms Library hidden");
        const count=await page.locator('#docsSection a[href^="docs/MSHA-form-"][href$=".pdf"]').count();
        if(count!==28)throw new Error(view.name+" expected 28 PDF action links, got "+count);
        const sizes=await page.evaluate(async ()=>{
          const paths=["docs/MSHA-form-5000-23.pdf","docs/MSHA-form-7000-51.pdf","docs/MSHA-form-2000-38.pdf","docs/MSHA-form-4000-9.pdf"];
          const out=[];
          for (const p of paths) {
            const r=await fetch(p);
            out.push([r.status,(await r.arrayBuffer()).byteLength]);
          }
          return out;
        });
        if(sizes.some(p=>p[0]!==200||p[1]<10000))throw new Error(view.name+" current form fetch failed: "+JSON.stringify(sizes));
        console.log("PASS "+view.name+": navigation, all 14 form links, four replacement PDF downloads");
      } finally {await context.close();}
    }
  } finally {await browser.close();}
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
