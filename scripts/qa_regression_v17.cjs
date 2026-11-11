/* SkyFire v0.17 cross-module navigation/regression smoke. Not a manual device acceptance. */
const {chromium} = require("playwright");
const origin="http://127.0.0.1:8765/";
(async()=>{
 const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
 try {
   const viewports=[{name:"phone",width:390,height:844},{name:"desktop",width:1440,height:900}];
   for(const vp of viewports){
     const ctx=await browser.newContext({viewport:{width:vp.width,height:vp.height},serviceWorkers:"allow"});
     const page=await ctx.newPage(),errors=[];
     page.on("pageerror",e=>errors.push(e.message));
     async function reset(){
       const res=await page.goto(origin,{waitUntil:"domcontentloaded",timeout:45000});
       if(!res || !res.ok())throw Error("home failed "+vp.name);
       await page.locator('button.skyfire-hub-home-tile.regulatory-hub').waitFor({state:"visible",timeout:25000});
     }
     async function hub(name){
       await reset();
       await page.locator("button.skyfire-hub-home-tile").filter({hasText:name}).click();
       const id=name==="Safety Tools"?"safetyToolsHubSection":name==="Regulatory Resources"?"regulatoryResourcesHubSection":"fieldResourcesHubSection";
       if(!await page.locator("#"+id).isVisible())throw Error(name+" not visible");
       return "#"+id;
     }
     async function openFromHub(hubName,itemName,sectionId){
       const hid=await hub(hubName);
       await page.locator(hid+" button.skyfire-hub-item").filter({hasText:itemName}).first().click();
       await page.locator("#"+sectionId).waitFor({state:"visible",timeout:18000});
       console.log("PASS",vp.name,hubName,"/",itemName);
     }
     try {
       await openFromHub("Safety Tools","Risk Assessment Matrix","riskMatrixSection");
       if(await page.locator("#riskRpnResult").count()!==1)throw Error("risk output missing");
       await openFromHub("Safety Tools","Safety ROI Calculator","roiCalculatorSection");
       await openFromHub("Regulatory Resources","MSHA / 30 CFR","cfrSection");
       if(await page.locator("#searchBar").count()!==1)throw Error("CFR search absent");
       await openFromHub("Regulatory Resources","OSHA / 29 CFR","oshaSection");
       await openFromHub("Regulatory Resources","Mine Act","mineActSection");
       for(const [sub,id] of [["inspection","inspectionReadySection"],["incident","incidentReadySection"]]){
         await hub("Regulatory Resources");
         await page.locator("#regulatoryResourcesHubSection button.msha-ready-hub-item").click();
         await page.locator("#mshaReadySection").waitFor({state:"visible",timeout:18000});
         await page.locator('#mshaReadySection [data-msha-ready-target="'+id+'"]').click();
         await page.locator("#"+id).waitFor({state:"visible",timeout:18000});
         console.log("PASS",vp.name,"MSHA Ready /",sub);
       }
       await openFromHub("Regulatory Resources","MSHA Forms Library","docsSection");
       for(const form of ["5000-23","7000-51","2000-38","4000-9","7000-2","5000-1","2000-224"]){
         const rsp=await page.evaluate(async id=>{
           const r=await fetch("docs/MSHA-form-"+id+".pdf");
           return {status:r.status,header:new TextDecoder().decode((await r.arrayBuffer()).slice(0,4))};
         },form);
         if(rsp.status!==200||rsp.header!=="%PDF")throw Error("form "+form+" response: "+JSON.stringify(rsp));
       }
       await openFromHub("Regulatory Resources","MSHA PPM & Agency Guidance","mshaGuidanceSection");
       await openFromHub("Regulatory Resources","SkyFire Technical Guidance","technicalGuidanceSection");
       await openFromHub("Field Resources","Safety Docs","safetyDocsSection");
       await reset();
       await page.locator('button[data-open-section="feedbackSection"]').click();
       await page.locator("#feedbackSection").waitFor({state:"visible",timeout:18000});
       if(errors.length)throw Error("uncaught JS errors: "+JSON.stringify(errors.slice(0,8)));
       console.log("PASS",vp.name,"cross-module navigation and 7 PDF headers, no JS page errors");
     } finally {await ctx.close()}
   }
 }finally{await browser.close()}
})().catch(e=>{console.error("FAIL broad regression",e.stack||e);process.exit(1)});
