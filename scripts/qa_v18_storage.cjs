const {chromium}=require("playwright");
const assert=require("node:assert/strict");
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:"block"});
 const base="http://127.0.0.1:8765/";
 try{
  const production=await context.newPage();
  await production.goto(base,{waitUntil:"domcontentloaded",timeout:30000});
  const prodState=await production.evaluate(()=>{
    if(SkyFireStorage.isQA)throw Error("Production must be unprefixed");
    const key="skyfire_bookmarks_title30_v1";
    const data=JSON.stringify([{id:"prod",name:"Protected production folder",items:[]}]);
    localStorage.setItem(key,data);
    return {key,data};
  });
  const qa=await context.newPage();
  await qa.goto(base+"release-candidate/v017/",{waitUntil:"domcontentloaded",timeout:30000});
  assert(await qa.evaluate(()=>SkyFireStorage.isQA),"QA app did not identify same-origin preview path");
  assert.equal(await qa.evaluate(()=>SkyFireStorage.namespace),"skyfire_qa_v18_");
  const before=await qa.evaluate(key=>({
    saved:window.SkyFireStorage.getItem(key),
    raw:localStorage.getItem(key)
  }),prodState.key);
  assert.equal(before.saved,null,"QA inherited production bookmark data");
  assert.equal(before.raw,prodState.data,"QA accidentally changed production data");
  await qa.locator('button.skyfire-hub-home-tile.regulatory-hub').click();
  await qa.locator('#regulatoryResourcesHubSection button.skyfire-hub-item')
    .filter({hasText:"MSHA / 30 CFR"}).click();
  await qa.locator("#newFolderInput").fill("QA Only Folder");
  await qa.locator("#createFolderBtn").click();
  const result=await qa.evaluate(key=>({
    production:localStorage.getItem(key),
    qa:localStorage.getItem("skyfire_qa_v18_"+key),
    section:document.querySelector("#cfrSection")?.className,
    legacy:localStorage.getItem("skyfire.inspectionReady.v16.states")
  }),prodState.key);
  assert.equal(result.production,prodState.data,"QA overwrote production bookmarks");
  assert(result.qa.includes("QA Only Folder"),"QA bookmark missing in prefixed storage");
  await qa.evaluate(()=>{
    SkyFireStorage.setItem("skyfire.inspectionReady.v16.states",'{"test":"QA"}');
  });
  const inspection=await production.evaluate(()=>({
    original:localStorage.getItem("skyfire.inspectionReady.v16.states"),
    qa:localStorage.getItem("skyfire_qa_v18_skyfire.inspectionReady.v16.states")
  }));
  assert.equal(inspection.original,null,"QA inspection state altered production key");
  assert.equal(inspection.qa,'{"test":"QA"}');
  await qa.reload({waitUntil:"domcontentloaded"});
  assert((await qa.evaluate(key=>SkyFireStorage.getItem(key),prodState.key)).includes("QA Only Folder"),"QA namespace not persistent");
  assert.equal(await production.evaluate(key=>localStorage.getItem(key),prodState.key),prodState.data);
  console.log("PASS same-origin production/QA isolated title30 bookmarks, inspection state and QA reload");
 }finally{
  await context.close();await browser.close();
 }
})().catch(e=>{console.error("FAIL QA storage isolation",e.stack||e);process.exit(1)});
