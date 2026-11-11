// Public HTTPS staging smoke test. Never writes to production.
const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const crypto=require("node:crypto");
const base="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const preview=base+"release-candidate/v017/";
const knownCurrentSha="feb6fd371dbfda725f0d47b0f03140e552110b942301d53d5b912de142f6d567";
(async ()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try {
   const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
   const page=await context.newPage();
   const root=await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
   assert(root&&root.ok(),"Published v0.16 homepage not accessible");
   assert(!(await page.locator("#skyfire-v017-test-banner").count()),"Production contains staging banner");
   await page.evaluate(async()=>{await navigator.serviceWorker.ready});
   console.log("PASS production root reachable and unchanged UI");
   const res=await page.goto(preview,{waitUntil:"domcontentloaded",timeout:45000});
   assert(res&&res.ok(),"Staging URL inaccessible; HTTP "+res?.status());
   await page.locator("#skyfire-v017-test-banner").waitFor({state:"visible",timeout:20000});
   assert((await page.title()).includes("QA Preview"),"Missing preview browser title");
   assert.equal(await page.locator('a[href="docs/MSHA-form-5000-23.pdf"]').count(),2);
   const provenance=await page.evaluate(async()=>{const r=await fetch("PREVIEW_PROVENANCE.json",{cache:"no-store"});return {status:r.status,body:await r.json()};});
   assert.equal(provenance.status,200);
   assert.equal(provenance.body.sourceCommit,"d6b947d6c0feb3e31fc73d8816cde98ad07ac9ef");
   await page.waitForFunction(async()=>(await caches.keys()).includes("skyfire-preview-v017-shell-v39"),null,{timeout:65000});
   await page.reload({waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes("/release-candidate/v017/service-worker.js"),null,{timeout:30000});
   const state=await page.evaluate(async()=>{
     const reg=await navigator.serviceWorker.getRegistration();
     const keys=await caches.keys();
     const old=keys.includes("skyfire-quality-cache-v36");
     return {scope:reg?.scope,keys,rootCachePreserved:old};
   });
   assert(state.scope.endsWith("/release-candidate/v017/"),"Staging service-worker scope not isolated "+JSON.stringify(state));
   assert(state.keys.includes("skyfire-preview-v017-shell-v39"),"Staging offline cache missing");
   console.log("PASS staging page, provenance, PWA scope, isolated cache",JSON.stringify(state));
   await context.setOffline(true);
   await page.reload({waitUntil:"domcontentloaded",timeout:30000});
   await page.locator("#skyfire-v017-test-banner").waitFor({state:"visible"});
   const off=await page.evaluate(async()=>{
     let r=await fetch("docs/MSHA-form-5000-23.pdf");
     const hash=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",await r.arrayBuffer()))).map(n=>n.toString(16).padStart(2,"0")).join("");
     return {ok:r.ok,sha:hash};
   });
   assert(off.ok&&off.sha===knownCurrentSha,"Staging offline PDF is wrong: "+JSON.stringify(off));
   console.log("PASS public HTTPS staging offline corrected Form 5000-23",JSON.stringify(off));
   await context.setOffline(false);
   const after=await page.goto(base,{waitUntil:"domcontentloaded",timeout:30000});
   assert(after&&after.ok(),"Live homepage unavailable after staging PWA install");
   assert(!(await page.locator("#skyfire-v017-test-banner").count()),"Preview banner appeared on production");
   console.log("PASS live homepage still accessible after preview install");
   await context.close();
 } finally{await browser.close()}
})().catch(e=>{console.error("FAIL remotely hosted staging QA",e.stack||e);process.exit(1)});
