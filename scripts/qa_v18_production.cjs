// Live production acceptance: after v0.18 merge / Pages deployment.
// Fresh browser context only. Does not change any actual user's saved state.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const root="https://skyfireehsmining-dev.github.io/skyfire-safety-library/";
const preview=root+"release-candidate/v017/";
const expected={
 "29":"c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3",
 "30":"a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c"
};
const pdfs={
 "5000-23":"feb6fd371dbfda725f0d47b0f03140e552110b942301d53d5b912de142f6d567",
 "7000-51":"6294cf4e177430b923ebf321feec730d64bf4c935f7b6ebea55722142e8c20b8",
 "2000-38":"3a8f7d9c7f69d8b264d0c9e07117e5e53d8a9c76a3473b970735fc8e60ca96d7",
 "4000-9":"d09e5babbf75040384797d4e0b92b4f562852c8ad9f77c802304193e9e04861c"
};
const browserFn = async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow",timezoneId:"America/Los_Angeles"});
 const page=await context.newPage();
 const errors=[];
 page.on("pageerror",e=>errors.push(e.message));
 async function hashFetch(path){
   return page.evaluate(async path=>{
     const r=await fetch(path);
     const bytes=await r.arrayBuffer();
     const digest=await crypto.subtle.digest("SHA-256",bytes);
     const sha=Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join("");
     return {status:r.status,sha,bytes:bytes.byteLength,source:r.headers.get("X-SkyFire-Data-Provenance")};
   },path);
 }
 async function home(){
   const r=await page.goto(root,{waitUntil:"domcontentloaded",timeout:45000});
   assert(r?.ok(),"Live root not online");
   await page.locator(".quick-banner-subtitle").waitFor();
   assert((await page.locator(".quick-banner-subtitle").textContent()).includes("v0.18 Beta"),"Production v0.18 release label absent");
   assert.equal((await page.locator("#homeLastUpdated").textContent()).trim(),"November 17, 2026");
   assert.equal(await page.locator("#skyfire-v018-test-banner").count(),0);
 }
 async function openReader(title){
   await home();
   await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click({timeout:16000});
   await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
     .filter({hasText:title==="30"?"MSHA / 30 CFR":"OSHA / 29 CFR"}).first().click();
   const status=title==="30"?"statusMessage":"oshaStatusMessage";
   await page.waitForFunction(status=>{
     const s=document.getElementById(status)?.textContent||"";
     return s.includes("Showing")||s.includes("Loaded");
   },status,{timeout:120000});
   const metadata=await page.locator("#"+(title==="30"?"cfrSourceStatus":"oshaSourceStatus")).textContent();
   assert(metadata.includes("eCFR API reported current through: Nov 13, 2026"),"Incorrect source date for Title "+title+": "+metadata);
   assert(metadata.includes(title==="30"?"GPO file last modified: Nov 13, 2026":"GPO file last modified: Nov 12, 2026"));
   assert(metadata.includes(navigatorOnline()?"Status: Connected":"Status: Offline"),"Unexpected status text "+metadata);
   const section=title==="30"?"56.18002":"1910.1200";
   const key=title==="30"?"searchBar":"oshaSearchBar";
   await page.locator("#"+key).fill(section);
   await page.waitForTimeout(500);
   // The search result is visible in the CFR reader and expanded independently.
   assert((await page.locator("#"+(title==="30"?"cfrContainer":"oshaContainer")).textContent()).includes(section),
        "CFR section not found: "+section);
   await page.locator("#"+key).fill("");
   return metadata;
 }
 let offline=false;
 function navigatorOnline(){return !offline}
 try{
   await home();
   await page.evaluate(async()=>navigator.serviceWorker.ready);
   await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller),null,{timeout:60000});
   const data=await page.evaluate(async()=>{const r=await fetch("Data/ecfr-source-provenance-v18.json");return r.json()});
   assert.equal(data.schema,"skyfire-ecfr-provenance-v18");
   for(const t of ["29","30"])assert.equal(data.titles[t].retrieved_sha256,expected[t],"Regulatory manifest mismatch");
   for(const t of ["30","29"]){
     await openReader(t);
     const actual=await hashFetch("Data/ECFR-title"+t+".xml");
     assert.equal(actual.status,200);
     assert.equal(actual.sha,expected[t],"Production Title "+t+" XML doesn't match official source manifest");
     console.log("PASS live production Title",t,"source labels, search and GPO XML SHA-256");
   }
   await home();
   const paths=await page.locator('#docsSection a[href^="docs/MSHA-form-"][href$=".pdf"]').evaluateAll(v=>[...new Set(v.map(a=>a.getAttribute("href")))]);
   assert.equal(paths.length,14,"Form inventory changed");
   for(const [id,sha]of Object.entries(pdfs)){
     const f=await hashFetch("docs/MSHA-form-"+id+".pdf");
     assert.equal(f.status,200);
     assert.equal(f.sha,sha,"v0.17 verified MSHA form regressed: "+id);
   }
   await page.waitForFunction(async()=>{
      const keys=await caches.keys();return keys.includes("skyfire-quality-cache-v40");
   },null,{timeout:95000});
   console.log("PASS live v0.18 metadata, 14 form links and four verified PDF hashes");
   offline=true;await context.setOffline(true);
   for(const t of ["30","29"]){
     const status=await openReader(t);
     assert(status.includes("Status: Offline"),"Offline status absent in "+t);
     const actual=await hashFetch("Data/ECFR-title"+t+".xml");
     assert.equal(actual.status,200);
     assert.equal(actual.sha,expected[t],"Offline Title "+t+" XML stale");
     console.log("PASS v0.18 installed production offline Title",t,"reader and source");
   }
   await home();
   for(const id of Object.keys(pdfs)){
     const f=await hashFetch("docs/MSHA-form-"+id+".pdf");
     assert.equal(f.sha,pdfs[id],"Offline verified form stale "+id);
   }
   console.log("PASS production cold offline shell, both CFR source files and four corrected MSHA PDFs");
   offline=false;await context.setOffline(false);
   await home();
   const bookmarkKey="skyfire_bookmarks_title30_v1",orig=JSON.stringify([{id:"production-smoke",name:"Production marker",items:[]}]);
   await page.evaluate(({key,orig})=>localStorage.setItem(key,orig),{key:bookmarkKey,orig});
   const qaResponse=await page.goto(preview,{waitUntil:"domcontentloaded",timeout:45000});
   assert(qaResponse?.ok(),"Preview unavailable after production merge");
   await page.locator("#skyfire-v018-test-banner").waitFor({state:"visible",timeout:30000});
   assert(await page.evaluate(()=>SkyFireStorage.isQA),"QA namespace missing");
   await page.waitForFunction(async()=>{
      const regs=await navigator.serviceWorker.getRegistrations();
      return regs.some(r=>r.scope.endsWith("/release-candidate/v017/") && r.active);
   },null,{timeout:60000});
   await page.reload({waitUntil:"domcontentloaded"});
   await page.waitForFunction(()=>navigator.serviceWorker.controller?.scriptURL.includes("/release-candidate/v017/service-worker.js"),null,{timeout:60000});
   const iso=await page.evaluate(({key})=>{
      SkyFireStorage.setItem(key,JSON.stringify([{id:"qa-smoke",name:"QA Only",items:[]}]));
      return {original:localStorage.getItem(key),qa:localStorage.getItem("skyfire_qa_v18_"+key),keys:caches.keys()};
   },{key:bookmarkKey});
   assert.equal(iso.original,orig,"QA changed production saved bookmark");
   assert(iso.qa.includes("QA Only"));
   const cachesList=await page.evaluate(()=>caches.keys());
   assert(cachesList.includes("skyfire-quality-cache-v40"),"QA worker removed production shell");
   assert(cachesList.some(k=>k.startsWith("skyfire-preview-v017-shell-")),"QA shell cache absent");
   console.log("PASS QA test app remains independently installed and cannot modify production saved bookmarks");
   await home();
   assert.equal(await page.evaluate(k=>localStorage.getItem(k),bookmarkKey),orig);
   assert.equal(errors.length,0,"Page errors: "+errors.slice(0,4).join("; "));
   console.log("PASS final SkyFire v0.18 post-release smoke without runtime errors");
 }finally{await context.close();await browser.close();}
};
browserFn().catch(e=>{console.error("FAIL production v0.18 smoke",e.stack||e);process.exit(1)});
