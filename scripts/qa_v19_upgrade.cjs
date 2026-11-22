/* v0.18 production -> v0.19 same-scope installed PWA upgrade.
 * Runs on localhost in an isolated CI browser; never touches a real user's data. */
const {chromium}=require("playwright");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const origin="http://127.0.0.1:8766/";
const oldCache="skyfire-quality-cache-v40",newCache="skyfire-quality-cache-v43";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
 try{
  const page=await context.newPage();
  const response=await page.goto(origin,{waitUntil:"domcontentloaded",timeout:60000});
  assert(response?.ok(),"Baseline production v0.18 unavailable");
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),"SkyFire Safety Library");
  assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.18 Beta"));
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller),null,{timeout:60000});
  await page.waitForFunction(async expected=>(await caches.keys()).includes(expected),oldCache,{timeout:85000});
  const bookmarks=JSON.stringify([{id:"migration-test",name:"Preserved production bookmarks",items:[]}]);
  const inspection=JSON.stringify({test:"preserved",reviewed:false});
  await page.evaluate(({bookmarks,inspection})=>{
    localStorage.setItem("skyfire_bookmarks_title30_v1",bookmarks);
    localStorage.setItem("skyfire.inspectionReady.v16.states",inspection);
  },{bookmarks,inspection});
  const oldForm=await page.evaluate(async()=>{
    const r=await fetch("./docs/MSHA-form-5000-23.pdf");
    const b=await r.arrayBuffer();
    return {status:r.status,sig:new TextDecoder().decode(b.slice(0,4))};
  });
  assert.equal(oldForm.status,200);assert.equal(oldForm.sig,"%PDF");
  console.log("PASS v0.18 baseline installed, bookmarks and inspection sentinel seeded, PDF cached");

  // Switch server assets atomically without changing the origin or data store.
  fs.symlinkSync("draft","./live-next");
  fs.renameSync("./live-next","./live");
  await page.evaluate(async()=>{
    const reg=await navigator.serviceWorker.getRegistration();
    if(!reg)throw Error("Missing service worker");
    await reg.update();
  });
  await page.waitForFunction(async name=>{
    const reg=await navigator.serviceWorker.getRegistration();
    return (await caches.keys()).includes(name) &&
      reg?.active?.state==="activated" && !reg.installing && !reg.waiting &&
      navigator.serviceWorker.controller===reg.active;
  },newCache,{timeout:150000});
  const next=await page.reload({waitUntil:"domcontentloaded",timeout:45000});
  assert(next?.ok(),"Upgraded v0.19 UI unavailable");
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),"SkyFire Safety");
  assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.19 Beta"));
  assert.equal((await page.locator("#homeLastUpdated").textContent()).trim(),"November 21, 2026");
  const manifest=await page.evaluate(async()=>await(await fetch("manifest.json")).json());
  assert.equal(manifest.name,"SkyFire Safety");
  assert.equal(manifest.scope,"./");
  assert.equal(manifest.start_url,"./index.html");
  const state=await page.evaluate(()=>({
    bookmark:localStorage.getItem("skyfire_bookmarks_title30_v1"),
    inspection:localStorage.getItem("skyfire.inspectionReady.v16.states"),
    keys:Object.keys(localStorage)
  }));
  assert.equal(state.bookmark,bookmarks,"Bookmarks lost during upgrade");
  assert.equal(state.inspection,inspection,"Inspection state lost during upgrade");
  await page.waitForFunction(async()=>{
    const paths=["./pdf-preview-v19.js","./vendor/pdfjs/pdf.mjs","./vendor/pdfjs/pdf.worker.mjs","./docs/MSHA-form-5000-23.pdf"];
    const all=await Promise.all(paths.map(p=>caches.match(p,{ignoreSearch:true})));
    return all.every(r=>r?.ok);
  },null,{timeout:90000});
  console.log("PASS same-origin upgrade v0.18 to v0.19: branding, version/date, saved data, PDF.js offline assets");

  await context.setOffline(true);
  const cold=await page.reload({waitUntil:"domcontentloaded",timeout:45000});
  assert(cold?.ok(),"v0.19 offline cold reopen failed");
  await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
  await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
    .filter({hasText:"MSHA Forms Library"}).first().click();
  await page.locator('#docsSection a[href="docs/MSHA-form-5000-23.pdf"][target="_blank"]').click();
  await page.locator("#skyfirePdfPreview").waitFor({state:"visible"});
  await page.waitForFunction(()=>document.querySelectorAll("#sfPdfPages .sf-pdf-page").length===4,null,{timeout:60000});
  await page.locator('#sfPdfPages .sf-pdf-page[data-page="4"]').scrollIntoViewIfNeeded();
  await page.locator('#sfPdfPages .sf-pdf-page[data-page="4"] canvas').waitFor({state:"visible",timeout:60000});
  await page.locator("#sfPdfReturn").click();
  assert(await page.locator("#docsSection").isVisible(),"Forms Library lost after offline return");
  assert.equal(await page.evaluate(()=>localStorage.getItem("skyfire_bookmarks_title30_v1")),bookmarks);
  assert.equal(await page.evaluate(()=>localStorage.getItem("skyfire.inspectionReady.v16.states")),inspection);
  for(const title of [29,30]){
    const source=await page.evaluate(async id=>{
      const r=await fetch("Data/ECFR-title"+id+".xml");
      return {ok:r.ok,contentType:r.headers.get("Content-Type")};
    },title);
    // The CFR resources are cached as-is from the verified v0.18 baseline.
    if(!source.ok) throw Error("Title "+title+" missing after offline upgrade");
  }
  console.log("PASS v0.19 offline cold launch, Form 5000-23 all four pages, CFR 29/30 fetches, saved state");
 }finally{await context.close();await browser.close()}
})().catch(e=>{console.error("FAIL v0.18 -> v0.19 same-scope upgrade",e.stack||e);process.exit(1)});
