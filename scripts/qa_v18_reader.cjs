const {chromium}=require("playwright");
const assert=require("node:assert/strict");
const base="http://127.0.0.1:8765/";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try {
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:"allow"});
  const page=await context.newPage();
  const errors=[];
  page.on("pageerror",e=>errors.push(e.message));
  await page.goto(base,{waitUntil:"domcontentloaded",timeout:40000});
  await page.evaluate(async()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller),null,{timeout:30000});
  assert.equal(await page.evaluate(()=>SkyFireStorage.isQA),false);
  await page.waitForFunction(()=>{
   const text=document.querySelector("#cfrSourceStatus")?.textContent||"";
   return text.includes("GPO") && text.includes("Nov") && text.includes("2026");
  },null,{timeout:20000});
  console.log("PASS provenance/date UI populated with authoritative metadata");
  async function openReader(hubText,title,searchId,statusId,sectionId){
    await page.locator('button.skyfire-hub-home-tile.regulatory-hub').click({timeout:15000});
    await page.locator('#regulatoryResourcesHubSection button.skyfire-hub-item')
      .filter({hasText:hubText}).first().click();
    await page.locator("#"+sectionId).waitFor({state:"visible",timeout:20000});
    await page.waitForFunction(id=>{
      const status=document.getElementById(id)?.textContent||"";
      return status.includes("Loaded") || status.includes("Showing");
    },statusId,{timeout:90000});
    const status=await page.locator("#"+statusId).textContent();
    assert(/Loaded|Showing/.test(status),title+": CFR not loaded "+status);
    const source=await page.locator("#"+(title===30?"cfrSourceStatus":"oshaSourceStatus")).textContent();
    assert(source.includes("eCFR API reported current through:"),"Source date missing");
    assert(source.includes("2026"),"Source year missing");
    console.log("PASS Title",title,"reader, source label, status:",status.slice(0,90));
    // Avoid saving any user data; queries exercise the live parsed reader.
    const search=page.locator("#"+searchId);
    await search.fill(title===30?"56.18002":"1910.1200");
    await page.waitForTimeout(600);
    const result=await page.locator("#"+statusId).textContent();
    assert(!result.includes("XML, but no sections were parsed"),"CFR parsing failure");
    await page.locator("#"+searchId).fill("");
  }
  await openReader("MSHA / 30 CFR",30,"searchBar","statusMessage","cfrSection");
  await page.goto(base,{waitUntil:"domcontentloaded",timeout:30000});
  await openReader("OSHA / 29 CFR",29,"oshaSearchBar","oshaStatusMessage","oshaSection");
  const keys=await page.evaluate(()=>caches.keys());
  assert(keys.includes("skyfire-regulatory-data-v2"),"Missing data cache v2");
  await context.setOffline(true);
  await page.reload({waitUntil:"domcontentloaded",timeout:30000});
  const source=await page.locator("#cfrSourceStatus").textContent();
  assert(source.includes("Offline"),"Offline not clearly labeled");
  await openReader("MSHA / 30 CFR",30,"searchBar","statusMessage","cfrSection");
  await page.goto(base,{waitUntil:"domcontentloaded",timeout:30000});
  await openReader("OSHA / 29 CFR",29,"oshaSearchBar","oshaStatusMessage","oshaSection");
  assert.equal(errors.length,0,"JS runtime errors: "+JSON.stringify(errors.slice(0,5)));
  console.log("PASS both eCFR reader modules, source date status and cached XML while fully offline");
  await context.close();
 }finally{await browser.close();}
})().catch(e=>{console.error("FAIL v0.18 reader browser test",e.stack||e);process.exit(1)});
