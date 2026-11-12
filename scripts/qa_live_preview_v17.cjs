// Published-site release smoke test: production v0.17 + isolated QA preview.
// Never modifies source data on the hosted application.
const { chromium }=require("playwright");
const assert=require("node:assert/strict");
const base="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const known={
 "5000-23":"feb6fd371dbfda725f0d47b0f03140e552110b942301d53d5b912de142f6d567",
 "7000-51":"6294cf4e177430b923ebf321feec730d64bf4c935f7b6ebea55722142e8c20b8",
 "2000-38":"3a8f7d9c7f69d8b264d0c9e07117e5e53d8a9c76a3473b970735fc8e60ca96d7",
 "4000-9":"d09e5babbf75040384797d4e0b92b4f562852c8ad9f77c802304193e9e04861c"
};
async function shaOfResponse(page,url){
 return page.evaluate(async url=>{
   const response=await fetch(url);
   const bytes=await response.arrayBuffer();
   const b=await crypto.subtle.digest("SHA-256",bytes);
   const hash=Array.from(new Uint8Array(b)).map(n=>n.toString(16).padStart(2,"0")).join("");
   return {status:response.status,bytes:bytes.byteLength,sha:hash};
 },url);
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try{
   const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
   const page=await context.newPage();
   let r=await page.goto(base,{waitUntil:"domcontentloaded",timeout:60000});
   assert(r?.ok(),"Production root is not online");
   assert.equal(await page.locator("#skyfire-v017-test-banner").count(),0);
   assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.17 Beta"),"Live dashboard not v0.17");
   assert.equal((await page.locator("#homeLastUpdated").textContent()).trim(),"November 11, 2026","Release date not fixed");
   assert.equal(await page.locator('#docsSection a[href^="docs/MSHA-form-"][href$=".pdf"]').count(),28);
   for(const [form,sha] of Object.entries(known)){
     const result=await shaOfResponse(page,"docs/MSHA-form-"+form+".pdf");
     assert.equal(result.status,200);
     assert.equal(result.sha,sha,"Live PDF checksum mismatch "+form);
   }
   console.log("PASS production v0.17 dashboard and four corrected federal PDF SHA-256 values");
   await page.evaluate(async()=>navigator.serviceWorker.ready);
   await page.waitForFunction(async()=>(await caches.keys()).includes("skyfire-quality-cache-v39"),null,{timeout:120000});
   await page.reload({waitUntil:"domcontentloaded",timeout:30000});
   await page.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.endsWith("/skyfire-safety-library/service-worker.js"),null,{timeout:45000});
   await context.setOffline(true);
   await page.reload({waitUntil:"domcontentloaded",timeout:30000});
   const paths=await page.locator('#docsSection a[href^="docs/MSHA-form-"][href$=".pdf"]').evaluateAll(links=>[...new Set(links.map(x=>x.getAttribute("href")))]);
   assert.equal(paths.length,14,"Production missing one or more local forms");
   for(const path of paths){
     const check=await shaOfResponse(page,path);
     assert(check.status===200&&check.bytes>10000,"Offline PDF missing "+path);
     const form=path.match(/MSHA-form-(.+)\.pdf/)[1];
     if(known[form])assert.equal(check.sha,known[form],"Offline PDF stale "+form);
   }
   console.log("PASS live installed production PWA offline reload and all 14 forms, corrected SHA values");
   await context.setOffline(false);
   r=await page.goto(base+"release-candidate/v017/",{waitUntil:"domcontentloaded",timeout:45000});
   assert(r?.ok(),"QA preview unavailable");
   await page.locator("#skyfire-v017-test-banner").waitFor({state:"visible",timeout:15000});
   await page.evaluate(async()=>navigator.serviceWorker.ready);
   const state=await page.evaluate(async()=>{
     const reg=await navigator.serviceWorker.getRegistration();
     return {scope:reg?.scope,keys:await caches.keys()};
   });
   assert(state.scope.endsWith("/release-candidate/v017/"),"QA SW unexpectedly controls production");
   assert(state.keys.includes("skyfire-quality-cache-v39"),"QA deleted production cache");
   console.log("PASS separate SkyFire QA scope and production cache preserved");
   await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error("FAIL post-release smoke",e.stack||e);process.exit(1);});
