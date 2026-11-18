const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const base="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const qa=base+"release-candidate/v017/";
const source={"29":"c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3",
              "30":"a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c"};
async function expectLoaded(page,title){
  await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
  await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
    .filter({hasText:title===30?"MSHA / 30 CFR":"OSHA / 29 CFR"}).first().click();
  const id=title===30?"statusMessage":"oshaStatusMessage";
  await page.waitForFunction(id=>{
    const text=document.getElementById(id)?.textContent||"";
    return text.includes("Loaded") || text.includes("Showing");
  },id,{timeout:120000});
  const data=await page.locator("#"+(title===30?"cfrSourceStatus":"oshaSourceStatus")).textContent();
  assert(data.includes("eCFR API reported current through"),"Source current-through label missing");
  const expected=new Date(2026,10,13).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
  assert(data.includes("eCFR API reported current through: "+expected),"Incorrect date-only rendering in Pacific timezone: "+data);
  console.log("PASS Title",title,"loaded:",(await page.locator("#"+id).textContent()).slice(0,90));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow",timezoneId:"America/Los_Angeles"});
 try{
  const prod=await context.newPage();
  const pr=await prod.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
  assert(pr?.ok());
  assert((await prod.locator(".quick-banner-subtitle").textContent()).includes("v0.17 Beta"),
         "Production changed during v0.18 QA deployment");
  assert.equal(await prod.locator("#skyfire-v018-test-banner").count(),0);
  await prod.evaluate(async()=>navigator.serviceWorker.ready);
  const prodKey="skyfire_bookmarks_title30_v1";
  const baseline=JSON.stringify([{id:"protected",name:"Protected production folder",items:[]}]);
  await prod.evaluate(({k,v})=>localStorage.setItem(k,v),{k:prodKey,v:baseline});
  const test=await context.newPage();
  const qr=await test.goto(qa,{waitUntil:"domcontentloaded",timeout:60000});
  assert(qr?.ok(),"QA URL returned HTTP "+qr?.status());
  await test.locator("#skyfire-v018-test-banner").waitFor({state:"visible",timeout:15000});
  assert(await test.evaluate(()=>SkyFireStorage.isQA),"QA missing storage namespace");
  const meta=await test.evaluate(async()=>{const r=await fetch("Data/ecfr-source-provenance-v18.json");return r.json()});
  assert.equal(meta.schema,"skyfire-ecfr-provenance-v18");
  for(const title of [29,30])assert.equal(meta.titles[String(title)].retrieved_sha256,source[String(title)]);
  await test.waitForFunction(async()=>{
    const regs=await navigator.serviceWorker.getRegistrations();
    return regs.some(x=>x.scope.endsWith("/release-candidate/v017/")&&x.active);
  },null,{timeout:90000});
  await test.reload({waitUntil:"domcontentloaded"});
  await test.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes("/release-candidate/v017/service-worker.js"),null,{timeout:60000});
  const scope=await test.evaluate(async()=>{
    const r=await navigator.serviceWorker.getRegistrations();
    return {qa:r.find(x=>x.scope.endsWith("/release-candidate/v017/"))?.scope,
       keys:await caches.keys()};
  });
  assert(scope.qa.endsWith("/release-candidate/v017/"));
  assert(scope.keys.includes("skyfire-preview-v017-shell-v40"),"Preview shell not installed");
  assert(scope.keys.some(x=>x.startsWith("skyfire-quality-cache-")),"Preview deleted prod cache");
  console.log("PASS v0.18 preview banner, source manifest, independent PWA scope and caches");
  await expectLoaded(test,30);
  await test.goto(qa,{waitUntil:"domcontentloaded"});
  await expectLoaded(test,29);
  await test.goto(qa,{waitUntil:"domcontentloaded"});
  await test.locator('button.skyfire-hub-home-tile.regulatory-hub').click();
  await test.locator('#regulatoryResourcesHubSection button.skyfire-hub-item').filter({hasText:"MSHA / 30 CFR"}).click();
  await test.locator("#newFolderInput").fill("QA Preview Isolation Test");
  await test.locator("#createFolderBtn").click();
  const vals=await test.evaluate(key=>({production:localStorage.getItem(key),qa:localStorage.getItem("skyfire_qa_v18_"+key)}),prodKey);
  assert.equal(vals.production,baseline,"QA altered production bookmark");
  assert(vals.qa.includes("QA Preview Isolation Test"),"QA bookmark didn't use namespace");
  console.log("PASS hosted same-origin QA bookmark writes do not modify production");
  await context.setOffline(true);
  await test.goto(qa,{waitUntil:"domcontentloaded",timeout:30000});
  await test.locator("#skyfire-v018-test-banner").waitFor({state:"visible"});
  const label=await test.locator("#cfrSourceStatus").textContent();
  assert(label.includes("Offline"),"Missing offline status");
  await expectLoaded(test,30);
  await test.goto(qa,{waitUntil:"domcontentloaded"});
  await expectLoaded(test,29);
  console.log("PASS QA Home Screen shell and both CFR titles remain usable offline");
  await context.setOffline(false);
  await prod.goto(base,{waitUntil:"domcontentloaded"});
  assert((await prod.locator(".quick-banner-subtitle").textContent()).includes("v0.17 Beta"));
  assert.equal(await prod.evaluate(key=>localStorage.getItem(key),prodKey),baseline);
  console.log("PASS production v0.17 unchanged after v0.18 QA install and state mutations");
 }finally{await context.close();await browser.close();}
})().catch(e=>{console.error("FAIL hosted v0.18 QA",e.stack||e);process.exit(1)});
