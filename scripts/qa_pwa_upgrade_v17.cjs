/* SkyFire v0.16 -> v0.17 cache upgrade check. Browser simulation, not physical iOS QA. */
const { chromium } = require("playwright");
const fs = require("node:fs");
const path = require("node:path");

(async () => {
  const base = "http://127.0.0.1:8766/";
  const browser = await chromium.launch({headless:true, args:["--no-sandbox"]});
  const context = await browser.newContext({viewport:{width:390,height:844}, isMobile:true, hasTouch:true, serviceWorkers:"allow"});
  const page = await context.newPage();
  const oldSha = "fcad8a09d4987a60415dbc3fa995fa5114b9ecfd8f86a58eb2a47e0057b955fb";
  const newSha = "feb6fd371dbfda725f0d47b0f03140e552110b942301d53d5b912de142f6d567";
  const currentLink = path.resolve(process.cwd(),"live");
  const newLink = path.resolve(process.cwd(),"live-next");
  const dump = async () => page.evaluate(async () => {
    const ks = await caches.keys();
    const versions = {};
    for (const name of ks) {
      const cache = await caches.open(name);
      const response = await cache.match("./docs/MSHA-form-5000-23.pdf");
      if (response) {
        const digest = await crypto.subtle.digest("SHA-256",await response.arrayBuffer());
        versions[name] = Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join("");
      } else versions[name]=null;
    }
    return {keys:ks,versions,controller:navigator.serviceWorker.controller?.scriptURL,
      sw:(await navigator.serviceWorker.getRegistration())?.active?.scriptURL};
  });
  try {
    await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
    await page.evaluate(async () => {await navigator.serviceWorker.ready});
    await page.waitForFunction(async () => {
      const keys = await caches.keys();
      return keys.includes("skyfire-quality-cache-v36");
    },null,{timeout:90000});
    // Simulate a real v0.16 user who has already opened this PDF, so the
    // pre-upgrade cache definitely contains the old document.
    await page.reload({waitUntil:"domcontentloaded",timeout:30000});
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller),null,{timeout:25000});
    const first = await page.evaluate(async () => {
      const r=await fetch("docs/MSHA-form-5000-23.pdf");
      return {ok:r.ok,bytes:(await r.arrayBuffer()).byteLength};
    });
    if(!first.ok || first.bytes<10000)throw Error("Could not prime old PDF: "+JSON.stringify(first));
    await page.waitForFunction(async expected => {
      const pdf=await caches.match("./docs/MSHA-form-5000-23.pdf");
      if(!pdf)return false;
      const d=await crypto.subtle.digest("SHA-256",await pdf.arrayBuffer());
      const sha=Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("");
      return sha===expected;
    },oldSha,{timeout:90000});
    let s=await dump();
    console.log("PRE-UPGRADE",JSON.stringify(s));
    if(s.versions["skyfire-quality-cache-v36"] !== oldSha) throw new Error("Old installed cached form hash mismatch: "+JSON.stringify(s.versions));
    // Keep the same origin and browser profile; atomically update the served directory.
    if(fs.existsSync(newLink)) fs.unlinkSync(newLink);
    fs.symlinkSync("draft",newLink);
    fs.renameSync(newLink,currentLink);
    await page.evaluate(async () => (await navigator.serviceWorker.getRegistration()).update());
    await page.waitForFunction(async expected => {
      const ks=await caches.keys();
      if(!ks.includes("skyfire-quality-cache-v39")) return false;
      const newCache=await caches.open("skyfire-quality-cache-v39");
      const cached=await newCache.match("./docs/MSHA-form-5000-23.pdf");
      if(!cached) return false;
      const d=await crypto.subtle.digest("SHA-256",await cached.arrayBuffer());
      const h=Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("");
      return h===expected;
    },newSha,{timeout:90000});
    s=await dump();
    console.log("POST-UPGRADE",JSON.stringify(s));
    if(s.versions["skyfire-quality-cache-v39"]!==newSha)
      throw new Error("New named cache has wrong PDF checksum: "+JSON.stringify(s.versions));
    await page.reload({waitUntil:"domcontentloaded",timeout:30000});
    await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click({timeout:20000});
    await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item").filter({hasText:"MSHA Forms Library"}).click();
    if(!await page.locator("#docsSection").isVisible()) throw new Error("Forms section invisible");
    await context.setOffline(true);
    await page.reload({waitUntil:"domcontentloaded",timeout:30000});
    await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click({timeout:20000});
    await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item").filter({hasText:"MSHA Forms Library"}).click();
    if(!await page.locator("#docsSection").isVisible())throw new Error("Updated Forms Section unavailable offline");
    const offline=await page.evaluate(async ()=>{
      const names=["5000-23","7000-51","2000-38","4000-9"];
      const results=[];
      for(const form of names){const r=await fetch("docs/MSHA-form-"+form+".pdf");results.push({form,status:r.status,bytes:(await r.arrayBuffer()).byteLength});}
      return results;
    });
    if(offline.some(x=>x.status!==200 || x.bytes<10000))throw Error("Offline corrected files absent "+JSON.stringify(offline));
    const offlineHash=await page.evaluate(async()=>{
      const r=await fetch("docs/MSHA-form-5000-23.pdf");
      const d=await crypto.subtle.digest("SHA-256",await r.arrayBuffer());
      return Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("");
    });
    if(offlineHash!==newSha)throw Error("Actual OFFLINE fetch returned stale 5000-23: "+offlineHash);
    const finalState=await dump();
    console.log("FINAL-CACHE",JSON.stringify(finalState));
    console.log("PASS v0.16 -> v0.17 cache upgrade and offline availability",JSON.stringify(offline));
  } finally {await browser.close();}
})().catch(err=>{console.error("FAIL PWA upgrade test",err.stack||err);process.exit(1)});
