const {chromium}=require("playwright");
const fs=require("node:fs");
const path=require("node:path");
const assert=require("node:assert/strict");
const base="http://127.0.0.1:8766/";
const versions={
  old:{"29":"85b5561b9753d64151d9af4bff301578805b3aabfb0746e93da85a6b6a1bb7ac","30":"eb6842184d0c4c2e1f5b7a47e80740c247af5c2e9c1ecc0440155e9934145846"},
  current:{"29":"c6736291247275b289efff576f5e9084c90b9982fcf62e70891b9a03cd61b7f3","30":"a87a94ae38f995bb56cf0242e8de6c7d1694b640fca2eeb776ee0aef42735f7c"}
};
const folder="./live", next="./live-next";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
 try{
  const page=await context.newPage();
  await page.goto(base,{waitUntil:"domcontentloaded",timeout:45000});
  await page.evaluate(async()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller),null,{timeout:35000});
  const marker=JSON.stringify([{id:"do-not-delete",name:"Real production bookmarks preserved",items:[]}]);
  await page.evaluate(value=>localStorage.setItem("skyfire_bookmarks_title30_v1",value),marker);
  async function open(title){
    await page.goto(base,{waitUntil:"domcontentloaded",timeout:35000});
    await page.locator("button.skyfire-hub-home-tile.regulatory-hub").click();
    await page.locator("#regulatoryResourcesHubSection button.skyfire-hub-item")
      .filter({hasText:title===30?"MSHA / 30 CFR":"OSHA / 29 CFR"}).click();
    await page.waitForFunction(id=>{
      const t=document.getElementById(id)?.textContent||"";
      return t.includes("Loaded")||t.includes("Showing");
    },title===30?"statusMessage":"oshaStatusMessage",{timeout:110000});
    return page.locator("#"+(title===30?"cfrSourceStatus":"oshaSourceStatus")).textContent();
  }
  async function version(cacheName,title){
    return page.evaluate(async ({cacheName,title})=>{
      const cache=await caches.open(cacheName);
      const response=await cache.match("./Data/ECFR-title"+title+".xml");
      if(!response)return {sha:null,mark:null};
      const raw=await response.arrayBuffer();
      const digest=await crypto.subtle.digest("SHA-256",raw);
      return {sha:Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,"0")).join(""),
              mark:response.headers.get("X-SkyFire-Data-Provenance")};
    },{cacheName,title});
  }
  await open(30);
  await open(29);
  for(const title of [29,30]){
    await page.waitForFunction(async({title,hash})=>{
      const cache=await caches.open("skyfire-regulatory-data-v1");
      const r=await cache.match("./Data/ECFR-title"+title+".xml");if(!r)return false;
      const d=await crypto.subtle.digest("SHA-256",await r.arrayBuffer());
      const h=Array.from(new Uint8Array(d)).map(x=>x.toString(16).padStart(2,"0")).join("");
      return h===hash;
    },{title,hash:versions.old[title]},{timeout:45000});
  }
  console.log("PASS v0.17 old cached Title 29/30 snapshots and production bookmark seeded");
  fs.symlinkSync("draft",next);
  fs.renameSync(next,folder);
  await page.evaluate(async()=>{await(await navigator.serviceWorker.getRegistration()).update()});
  await page.waitForFunction(async()=>{
    const reg=await navigator.serviceWorker.getRegistration();
    return (await caches.keys()).includes("skyfire-quality-cache-v40") &&
       reg?.active?.state==="activated" && !reg.waiting && !reg.installing &&
       navigator.serviceWorker.controller===reg.active;
  },null,{timeout:120000});
  await page.waitForFunction(async()=>!(await caches.keys()).includes("skyfire-regulatory-data-v1"),null,{timeout:60000});
  for(const title of [29,30]){
    const state=await version("skyfire-regulatory-data-v2",title);
    assert.equal(state.sha,versions.old[title],"Missing migrated old Title "+title+" after update");
    assert.equal(state.mark,"legacy-cache","Old migrated title must be flagged legacy");
  }
  console.log("PASS v0.18 worker migrated both old datasets with explicit LEGACY marker, without dropping offline copies");
  await context.setOffline(true);
  const legacy=await open(30);
  assert(legacy.includes("earlier cached dataset"),"Legacy Title 30 not flagged in UI");
  await open(29);
  assert.equal(await page.evaluate(()=>SkyFireStorage.getItem("skyfire_bookmarks_title30_v1")),marker);
  console.log("PASS old cached Title 29/30 readable OFFLINE after SW upgrade; legacy warning and bookmarks intact");
  await context.setOffline(false);
  await open(30);
  await open(29);
  for(const title of [29,30]){
    const state=await version("skyfire-regulatory-data-v2",title);
    assert.equal(state.sha,versions.current[title],"Network refresh failed Title "+title);
    assert.equal(state.mark,"network-verified-source","Refreshed title source marker missing");
  }
  console.log("PASS online update refreshed both cached XML files with current GPO hashes");
  await context.setOffline(true);
  const refreshed=await open(30);
  assert(!refreshed.includes("earlier cached dataset"),"New Title 30 still marked legacy");
  await open(29);
  assert.equal(await page.evaluate(()=>SkyFireStorage.getItem("skyfire_bookmarks_title30_v1")),marker);
  console.log("PASS new Title 29/30 accessible OFFLINE with preserved production bookmarks");
 }finally{await context.close();await browser.close();}
})().catch(e=>{console.error("FAIL v0.17 -> v0.18 CFR migration",e.stack||e);process.exit(1)});
