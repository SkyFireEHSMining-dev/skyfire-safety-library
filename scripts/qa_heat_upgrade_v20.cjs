/* SkyFire v0.19 -> v0.20 installed-PWA upgrade proof on one isolated localhost origin.
   Changes the test runner's local 'live' symlink, NEVER production GitHub Pages. */
"use strict";
const {chromium}=require("playwright");
const fs=require("node:fs");
const assert=require("node:assert/strict");
const origin="http://127.0.0.1:8766/live/";
const oldCache="skyfire-quality-cache-v43",newCache="skyfire-quality-cache-v44";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
 try{
  const page=await ctx.newPage(),errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  const resp=await page.goto(origin,{waitUntil:"domcontentloaded",timeout:60000});
  assert(resp?.ok(),"v0.19 baseline not served");
  assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.19 Beta"),"Wrong baseline");
  assert.equal((await page.locator(".main-header h1").textContent()).trim(),"SkyFire Safety");
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller),null,{timeout:65000});
  await page.waitForFunction(c=>(caches.keys()).then(keys=>keys.includes(c)),oldCache,{timeout:90000});
  const bookmarks=JSON.stringify([{id:"heat-migration",name:"Preserved bookmarks",items:[]}]);
  const inspection=JSON.stringify({test:"existing-inspection-state",signed:false});
  await page.evaluate(({bookmarks,inspection})=>{
    localStorage.setItem("skyfire_bookmarks_title30_v1",bookmarks);
    localStorage.setItem("skyfire.inspectionReady.v16.states",inspection);
  },{bookmarks,inspection});
  for(const title of [29,30]){
    const response=await page.evaluate(async t=>{
      const r=await fetch("Data/ECFR-title"+t+".xml");
      if(!r.ok) return false;
      await r.arrayBuffer();
      return true;
    },title);
    assert(response,"Could not cache baseline CFR "+title);
    await page.waitForFunction(async t=>Boolean(await caches.match("./Data/ECFR-title"+t+".xml",{ignoreSearch:true})),title,{timeout:90000});
  }
  const form=await page.evaluate(async()=>{
    const r=await fetch("docs/MSHA-form-5000-23.pdf");
    return {ok:r.ok,bytes:new TextDecoder().decode((await r.arrayBuffer()).slice(0,4))};
  });
  assert.equal(form.bytes,"%PDF");assert.equal(form.ok,true);
  console.log("PASS v0.19 baseline: offline cache, 29/30 CFR, form, bookmarks and inspection state");

  // Switch the test server's same-origin directory, atomically, without touching main.
  fs.symlinkSync("draft","live-next"); fs.renameSync("live-next","live");
  await page.evaluate(async()=>{const reg=await navigator.serviceWorker.getRegistration();if(!reg)throw Error("No service worker");await reg.update()});
  await page.waitForFunction(async cacheName=>{
    const reg=await navigator.serviceWorker.getRegistration();
    return (await caches.keys()).includes(cacheName)
      && reg?.active?.state==="activated" && !reg.installing && !reg.waiting
      && navigator.serviceWorker.controller===reg.active;
  },newCache,{timeout:160000});
  const next=await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  assert(next?.ok(),"v0.20 upgrade failed to serve");
  assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.19 Beta"),"Development must not claim production v0.20");
  const stored=await page.evaluate(()=>({
    bookmarks:localStorage.getItem("skyfire_bookmarks_title30_v1"),
    inspection:localStorage.getItem("skyfire.inspectionReady.v16.states")
  }));
  assert.equal(stored.bookmarks,bookmarks,"Bookmarks lost in cache upgrade");
  assert.equal(stored.inspection,inspection,"Inspection state lost in cache upgrade");
  await page.waitForFunction(async()=>{
    const assets=["./heat-stress-v20.js","./heat-stress-v20.css","./pdf-preview-v19.js","./docs/MSHA-form-5000-23.pdf"];
    const result=await Promise.all(assets.map(path=>caches.match(path,{ignoreSearch:true})));
    return result.every(r=>r?.ok);
  },null,{timeout:90000});
  console.log("PASS v0.19 -> v0.20: v44 active, heat assets and legacy PDF cache, saved state intact");

  await ctx.setOffline(true);
  const offline=await page.reload({waitUntil:"domcontentloaded",timeout:60000});
  assert(offline?.ok(),"Offline cold-reload unavailable");
  const s=page.locator(".skyfire-hub-home-tile").filter({hasText:"Safety Tools"}).first();
  await s.click();
  await page.locator("#safetyToolsHubSection .skyfire-hub-item").filter({hasText:"Occupational Heat Stress"}).click();
  await page.locator("#heatAirTemperature").fill("100");
  await page.locator("#heatHumidity").fill("40");
  await page.locator("#heatIndexForm button[type=submit]").click();
  assert((await page.locator("#heatIndexValue").innerText()).startsWith("109."),"Heat Index offline unavailable");
  await page.locator("#heatTabWbgt").click();
  await page.locator("#heatWbgtMeasured").fill("24");
  await page.locator("#heatWbgtWorkload").selectOption("heavy");
  await page.locator("#heatWbgtClothing").selectOption("double");
  await page.locator("#heatWbgtForm button[type=submit]").click();
  assert.equal(await page.locator("#heatWbgtValue").innerText(),"27.0°C");
  for(const title of [29,30]){
    const res=await page.evaluate(async t=>{try{const r=await fetch("Data/ECFR-title"+t+".xml");return r.ok}catch(e){return false}},title);
    assert(res,"Cached CFR "+title+" unavailable after offline upgrade");
  }
  const oldPdf=await page.evaluate(async()=>{
    const r=await fetch("docs/MSHA-form-5000-23.pdf");
    return r.ok && new TextDecoder().decode((await r.arrayBuffer()).slice(0,4))==="%PDF";
  });
  assert(oldPdf,"Original MSHA form unavailable after offline upgrade");
  assert.equal(await page.evaluate(()=>localStorage.getItem("skyfire_bookmarks_title30_v1")),bookmarks);
  assert.equal(await page.evaluate(()=>localStorage.getItem("skyfire.inspectionReady.v16.states")),inspection);
  if(errors.length)throw Error("Page script errors: "+errors.join("; "));
  console.log("PASS physical-scope simulated v0.19->v0.20: offline Heat/WBGT, CFR 29/30, PDF and saved state");
 }finally{await ctx.close();await browser.close()}
})().catch(e=>{console.error("FAIL same-origin upgrade",e.stack||e);process.exit(1)});
