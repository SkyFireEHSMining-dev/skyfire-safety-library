/* v0.19 browser proof: every page rendered, online and offline.
 * Playwright emulation is not physical iPhone or iPad acceptance. */
const {chromium,webkit}=require("playwright");
const root="http://127.0.0.1:8765/";
const screens=[
  {name:"phone",viewport:{width:390,height:844},isMobile:true,hasTouch:true},
  {name:"tablet",viewport:{width:820,height:1180},isMobile:true,hasTouch:true},
  {name:"desktop",viewport:{width:1440,height:900},isMobile:false,hasTouch:false}
];
async function openForms(page){
  await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
  await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
    .filter({hasText:"MSHA Forms Library"}).first().click();
  await page.locator("#docsSection").waitFor({state:"visible",timeout:15000});
}
async function checkForm(page,context,id,expectedPages){
  const link=page.locator('#docsSection a[href="docs/MSHA-form-'+id+'.pdf"][target="_blank"]');
  await link.scrollIntoViewIfNeeded();
  const before=await page.evaluate(()=>scrollY),tabsBefore=context.pages().length;
  await link.click();
  await page.locator("#skyfirePdfPreview").waitFor({state:"visible",timeout:12000});
  if(context.pages().length!==tabsBefore) throw Error("Unexpected tab opened");
  const frames=await page.locator("#skyfirePdfPreview iframe").count();
  if(frames) throw Error("Native PDF iframe is still present");
  const pageItems=page.locator("#sfPdfPages .sf-pdf-page");
  await page.waitForFunction(expected=>{
    const nodes=document.querySelectorAll("#sfPdfPages .sf-pdf-page");
    return nodes.length>=expected && document.querySelector("#sfPdfCounter").textContent.includes("of "+expected);
  },expectedPages,{timeout:35000});
  const count=await pageItems.count();
  if(count!==expectedPages) throw Error(id+" had "+count+" page containers, expected "+expectedPages);
  await page.locator('#sfPdfPages .sf-pdf-page[data-page="1"] canvas').waitFor({state:"visible",timeout:45000});
  await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+expectedPages+'"]').scrollIntoViewIfNeeded();
  await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+expectedPages+'"] canvas')
    .waitFor({state:"visible",timeout:45000});
  const dimensions=await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+expectedPages+'"] canvas')
    .evaluate(c=>({width:c.width,height:c.height}));
  if(dimensions.width<180||dimensions.height<180) throw Error("Last page canvas too small: "+JSON.stringify(dimensions));
  const fallback=await page.locator('#sfPdfExternal[href$=".pdf"],#sfPdfDownload[download][href$=".pdf"]').count();
  if(fallback!==2)throw Error("Missing original/download actions");
  await page.locator("#sfPdfReturn").click();
  if(await page.locator("#skyfirePdfPreview").isVisible())throw Error("Return did not close viewer");
  if(!await page.locator("#docsSection").isVisible())throw Error("Lost Forms Library");
  const after=await page.evaluate(()=>scrollY);
  if(Math.abs(before-after)>12)throw Error("Scroll lost "+before+" -> "+after);
  console.log("PASS multipage PDF "+id+": "+expectedPages+" page containers, last canvas rendered, return preserved");
}
(async()=>{
 for(const [name,engine] of [["Chromium",chromium],["WebKit",webkit]]){
  const browser=await engine.launch({headless:true,args:name==="Chromium"?["--no-sandbox"]:[]});
  try{
   for(const screen of screens){
    const ctx=await browser.newContext({...screen,serviceWorkers:"allow"});
    try{
     const page=await ctx.newPage(),errors=[];
     page.on("pageerror",e=>errors.push(e.message));
     const home=await page.goto(root,{waitUntil:"domcontentloaded",timeout:60000});
     if(!home||!home.ok())throw Error("Home unavailable "+name+" "+screen.name);
     if((await page.title())!=="SkyFire Safety")throw Error("Wrong branding");
     await openForms(page);
     const links=await page.locator('#docsSection .document-actions a[href^="docs/MSHA-form-"][href$=".pdf"]').count();
     if(links!==28)throw Error("Forms inventory incomplete: "+links);
     await checkForm(page,ctx,"5000-23",4);
     // The second form catches state-reset and renderer reuse errors.
     await checkForm(page,ctx,"7000-1",2);
     if(name==="Chromium"){
      await page.evaluate(()=>navigator.serviceWorker.ready);
      await page.waitForFunction(async()=>{
       const a=await caches.match("./vendor/pdfjs/pdf.mjs",{ignoreSearch:true});
       const b=await caches.match("./vendor/pdfjs/pdf.worker.mjs",{ignoreSearch:true});
       const c=await caches.match("./docs/MSHA-form-5000-23.pdf");
       return Boolean(a&&a.ok&&b&&b.ok&&c&&c.ok);
      },null,{timeout:90000});
      await page.reload({waitUntil:"domcontentloaded",timeout:45000});
      await ctx.setOffline(true);
      await page.reload({waitUntil:"domcontentloaded",timeout:45000});
      await openForms(page);
      await checkForm(page,ctx,"5000-23",4);
      console.log("PASS offline cold PWA reload, all 4 PDF.js pages, "+name+" "+screen.name);
     }else{
      console.log("LIMITATION Linux WebKit headless offline cold launch not certified; physical iPhone test required");
     }
     if(errors.length)throw Error("Page JS errors: "+errors.slice(0,5).join("; "));
     console.log("PASS "+name+" "+screen.name+" multi-page online viewer");
    }finally{await ctx.close()}
   }
  }finally{await browser.close()}
 }
})().catch(e=>{console.error("FAIL v0.19 browser: ",e.stack||e);process.exit(1)});
