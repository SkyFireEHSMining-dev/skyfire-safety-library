/* SkyFire Safety v0.19 public HTTPS post-release smoke.
 * Runs in an isolated CI Chromium context only after merged release. */
const {chromium}=require("playwright"),assert=require("node:assert/strict");
const origin="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const qa=origin+"release-candidate/v017/";
const releaseDate="November 21, 2026",name="SkyFire Safety";
const expectedHashes={
 "29":"c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3",
 "30":"a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c"
};
async function openHub(page,name){
 await page.goto(origin,{waitUntil:"domcontentloaded",timeout:60000});
 await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
 await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
   .filter({hasText:name}).first().click();
}
async function readCFR(page,title){
 await openHub(page,title===30?"MSHA / 30 CFR":"OSHA / 29 CFR");
 const el=title===30?"statusMessage":"oshaStatusMessage";
 await page.waitForFunction(id=>{
   const str=document.getElementById(id)?.textContent||"";
   return str.includes("Loaded")||str.includes("Showing");
 },el,{timeout:120000});
 const status=await page.locator("#"+(title===30?"cfrSourceStatus":"oshaSourceStatus")).textContent();
 assert(status.includes("eCFR API reported current through"),"Missing CFR source date "+title);
 console.log("PASS Title "+title+" CFR reader with dated provenance");
}
async function openForm(page,num,total){
 await openHub(page,"MSHA Forms Library");
 const a=page.locator('#docsSection a[href="docs/MSHA-form-'+num+'.pdf"][target="_blank"]');
 await a.scrollIntoViewIfNeeded();
 const before=await page.evaluate(()=>scrollY);
 await a.click();
 await page.locator("#skyfirePdfPreview").waitFor({state:"visible",timeout:25000});
 await page.waitForFunction(n=>document.querySelectorAll("#sfPdfPages .sf-pdf-page").length===n,total,{timeout:60000});
 assert.equal(await page.locator("#skyfirePdfPreview iframe").count(),0);
 await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+total+'"]').scrollIntoViewIfNeeded();
 await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+total+'"] canvas').waitFor({state:"visible",timeout:60000});
 const rendered=await page.locator('#sfPdfPages .sf-pdf-page[data-page="'+total+'"] canvas').evaluate(c=>c.width>200&&c.height>200);
 assert(rendered,"Last page canvas failed");
 await page.locator("#sfPdfReturn").click();
 assert(await page.locator("#docsSection").isVisible(),"Lost Forms Library");
 assert(Math.abs((await page.evaluate(()=>scrollY))-before)<14,"Forms scroll changed");
 console.log("PASS published multipage Form "+num+" pages "+total+" return intact");
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow",timezoneId:"America/Los_Angeles"});
 try{
  const page=await context.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  // GitHub Pages deploy runs asynchronously after the merge. Do not claim
  // release success until the actual public site reports the expected version.
  let available=false;
  for(let attempt=0;attempt<24;attempt++){
    try{
      const r=await page.goto(origin,{waitUntil:"domcontentloaded",timeout:60000});
      if(r?.ok() && (await page.locator(".main-header h1").textContent())?.trim()===name &&
           (await page.locator(".quick-banner-subtitle").textContent())?.includes("v0.19 Beta") &&
           (await page.locator("#homeLastUpdated").textContent())?.trim()===releaseDate){
        available=true;break;
      }
    }catch(err){console.log("Published label not ready (attempt "+(attempt+1)+"): "+err.message.slice(0,160))}
    await new Promise(resolve=>setTimeout(resolve,12000));
  }
  assert(available,"Live public site did not show SkyFire Safety v0.19 and verified release date");
  assert.equal(await page.title(),name);
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),name);
  const manifest=await page.evaluate(async()=>await(await fetch("manifest.json",{cache:"reload"})).json());
  assert.equal(manifest.name,name);
  assert.equal(manifest.short_name,name);
  assert.equal(manifest.start_url,"./index.html");
  assert.equal(manifest.scope,"./");
  const meta=await page.evaluate(async()=>await(await fetch("Data/ecfr-source-provenance-v18.json")).json());
  assert.equal(meta.titles["29"].retrieved_sha256,expectedHashes["29"]);
  assert.equal(meta.titles["30"].retrieved_sha256,expectedHashes["30"]);
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.waitForFunction(async()=> (await caches.keys()).includes("skyfire-quality-cache-v43"),null,{timeout:140000});
  await page.waitForFunction(async()=>{
    const paths=["./pdf-preview-v19.js","./vendor/pdfjs/pdf.mjs","./vendor/pdfjs/pdf.worker.mjs"];
    return (await Promise.all(paths.map(p=>caches.match(p,{ignoreSearch:true})))).every(r=>r?.ok);
  },null,{timeout:100000});
  const bookmarked=JSON.stringify([{id:"live-v19-qa",name:"Preserve production bookmark",items:[]}]);
  await page.evaluate(s=>localStorage.setItem("skyfire_bookmarks_title30_v1",s),bookmarked);
  console.log("PASS production v0.19 title/date/manifest, pinned CFR source hashes, offline viewer assets");

  await openForm(page,"5000-23",4);
  await openForm(page,"7000-1",5);
  await readCFR(page,30);
  await readCFR(page,29);

  await context.setOffline(true);
  await page.goto(origin,{waitUntil:"domcontentloaded",timeout:55000});
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),name);
  await openForm(page,"5000-23",4);
  await readCFR(page,30);
  await readCFR(page,29);
  assert.equal(await page.evaluate(()=>localStorage.getItem("skyfire_bookmarks_title30_v1")),bookmarked);
  console.log("PASS PUBLIC PRODUCTION v0.19 Airplane Mode cold launch: PDF page 4, CFR 29/30, bookmarks");
  await context.setOffline(false);

  const qaPage=await context.newPage();
  await qaPage.goto(qa,{waitUntil:"domcontentloaded",timeout:65000});
  await qaPage.locator("#skyfire-v019-test-banner").waitFor({state:"visible",timeout:25000});
  assert.equal(await qaPage.evaluate(()=>SkyFireStorage.isQA),true);
  const afterQA=await page.evaluate(()=>localStorage.getItem("skyfire_bookmarks_title30_v1"));
  assert.equal(afterQA,bookmarked,"QA unexpectedly affected production saved state");
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),name);
  if(errors.length)throw Error("JavaScript errors: "+errors.slice(0,5).join("; "));
  console.log("PASS deployed production and QA separate PWA scope/local state, no script errors");
 }finally{await context.close();await browser.close()}
})().catch(e=>{console.error("FAIL v0.19 live public release",e.stack||e);process.exit(1)});
