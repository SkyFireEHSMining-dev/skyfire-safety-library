/* Hosted v0.19 Chromium QA smoke. Not physical iOS acceptance. */
const {chromium} = require("playwright"), assert=require("node:assert/strict");
const base="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const qa=base+"release-candidate/v017/";
(async()=>{
 const b=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const ctx=await b.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
 try{
  const prod=await ctx.newPage(),test=await ctx.newPage();
  let p=await prod.goto(base,{waitUntil:"domcontentloaded",timeout:60000});
  assert(p&&p.ok());
  assert.equal((await prod.locator(".main-header h1").innerText()).trim(),"SkyFire Safety Library");
  assert((await prod.locator(".quick-banner-subtitle").textContent()).includes("v0.18 Beta"));
  await prod.evaluate(()=>navigator.serviceWorker.ready);
  const key="skyfire_bookmarks_title30_v1", sentinel="PRODUCTION_QA_TEST_SENTINEL";
  await prod.evaluate(args=>localStorage.setItem(args.key,args.sentinel),{key,sentinel});
  const cacheBefore=await prod.evaluate(async()=>await caches.keys());
  p=await test.goto(qa,{waitUntil:"domcontentloaded",timeout:60000});
  assert(p&&p.ok(),"QA unavailable");
  await test.locator("#skyfire-v019-test-banner").waitFor({state:"visible"});
  assert.equal((await test.locator(".main-header h1").innerText()).trim(),"SkyFire Safety");
  assert.equal(await test.evaluate(()=>SkyFireStorage.isQA),true);
  const meta=await test.evaluate(async()=>await (await fetch("PREVIEW_PROVENANCE.json",{cache:"no-store"})).json());
  assert.equal(meta.releaseCandidate,"SkyFire Safety v0.19");
  assert.equal(meta.productionApp,"v0.18 unchanged");
  const mf=await test.evaluate(async()=>await (await fetch("manifest.json")).json());
  assert.equal(mf.short_name,"SkyFire QA");
  assert.equal(mf.start_url,"./index.html");
  await test.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
  await test.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
    .filter({hasText:"MSHA Forms Library"}).first().click();
  for(const id of ["5000-23","7000-1"]){
    const a=test.locator('#docsSection a[href="docs/MSHA-form-'+id+'.pdf"][target="_blank"]');
    await a.scrollIntoViewIfNeeded();
    const y=await test.evaluate(()=>scrollY),n=ctx.pages().length;
    await a.click();
    await test.locator("#skyfirePdfPreview").waitFor({state:"visible"});
    assert.equal(ctx.pages().length,n);
    assert(await test.locator("#sfPdfReturn").isVisible());
    await test.locator("#sfPdfReturn").click();
    assert(await test.locator("#docsSection").isVisible());
    assert(Math.abs((await test.evaluate(()=>scrollY))-y)<10);
    console.log("PASS hosted online PDF return "+id);
  }
  await test.evaluate(()=>navigator.serviceWorker.ready);
  await test.waitForFunction(async()=>(await caches.keys()).includes("skyfire-preview-v017-shell-v42"),null,{timeout:70000});
  await test.reload({waitUntil:"domcontentloaded",timeout:35000});
  await test.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes("/release-candidate/v017/service-worker.js"),null,{timeout:50000});
  const cacheAfter=await test.evaluate(async()=>await caches.keys());
  assert(cacheBefore.some(n=>cacheAfter.includes(n)),"QA deleted production cache");
  await ctx.setOffline(true);
  await test.reload({waitUntil:"domcontentloaded",timeout:35000});
  await test.locator("#skyfire-v019-test-banner").waitFor({state:"visible"});
  await test.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
  await test.locator("#regulatoryResourcesHubSection button.skyfire-hub-item").filter({hasText:"MSHA Forms Library"}).first().click();
  await test.locator('#docsSection a[href="docs/MSHA-form-5000-23.pdf"][target="_blank"]').click();
  await test.locator("#skyfirePdfPreview").waitFor({state:"visible"});
  const pdf=await test.evaluate(async()=>{const r=await fetch("docs/MSHA-form-5000-23.pdf");return {status:r.status,sig:new TextDecoder().decode((await r.arrayBuffer()).slice(0,4))}});
  assert.equal(pdf.status,200);assert.equal(pdf.sig,"%PDF");
  await test.locator("#sfPdfReturn").click();
  console.log("PASS hosted offline cold launch, PDF response and return");
  await ctx.setOffline(false);
  await prod.goto(base,{waitUntil:"domcontentloaded"});
  assert.equal((await prod.locator(".main-header h1").innerText()).trim(),"SkyFire Safety Library");
  assert.equal(await prod.evaluate(k=>localStorage.getItem(k),key),sentinel,"QA changed production saved data");
  console.log("PASS live v0.18 production unchanged and isolated from QA");
 }finally{await ctx.close();await b.close()}
})().catch(e=>{console.error("FAIL hosted v0.19",e.stack||e);process.exit(1)});
