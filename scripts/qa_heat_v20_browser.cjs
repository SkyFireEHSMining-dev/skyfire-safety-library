/* SkyFire v0.20 Playwright QA: browser/phone/tablet, offline reload. Not physical iPhone testing. */
"use strict";
const {chromium,webkit}=require("playwright");
const base="http://127.0.0.1:8765/";
async function navigateToHeat(page){
  const tile=page.locator(".skyfire-hub-home-tile").filter({hasText:"Safety Tools"}).first();
  await tile.waitFor({state:"visible",timeout:30000});
  await tile.click();
  const card=page.locator("#safetyToolsHubSection .skyfire-hub-item").filter({hasText:"Occupational Heat Stress"});
  await card.waitFor({state:"visible"});
  await card.click();
  await page.locator("#heatStressSection").waitFor({state:"visible",timeout:10000});
}
async function checkCalculations(page){
  await navigateToHeat(page);
  await page.locator("#heatAirTemperature").fill("100");
  await page.locator("#heatHumidity").fill("40");
  await page.locator("#heatIndexForm button[type=submit]").click();
  const value=await page.locator("#heatIndexValue").innerText();
  const band=await page.locator("#heatIndexBand").innerText();
  if(!value.startsWith("109."))throw Error("Heat index wrong: "+value);
  if(!band.includes("High"))throw Error("Incorrect NIOSH band: "+band);
  await page.locator("#heatTabWbgt").click();
  if(!await page.locator("#heatWbgtPanel").isVisible())throw Error("WBGT tab hidden");
  await page.locator("#heatWbgtMeasured").fill("24");
  await page.locator("#heatWbgtWorkload").selectOption("heavy");
  await page.locator("#heatWbgtClothing").selectOption("double");
  await page.locator("#heatWbgtForm button[type=submit]").click();
  const effective=await page.locator("#heatWbgtValue").innerText();
  if(effective!=="27.0°C")throw Error("WBGT/cloth error: "+effective);
  if(!(await page.locator("#heatWbgtGuidance").innerText()).includes("At or above"))throw Error("No action advice");
  await page.locator("#heatWbgtClothing").selectOption("other");
  await page.locator("#heatWbgtForm button[type=submit]").click();
  if(!await page.locator("#heatWbgtError").isVisible())throw Error("Unlisted PPE not blocked");
  if(await page.locator("#heatWbgtResult").isVisible())throw Error("Stale WBGT result still visible");
  await page.locator("#heatTabIndex").click();
  if(!await page.locator("#heatIndexPanel").isVisible())throw Error("Heat Index tab hidden");
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth+3);
  if(overflow)throw Error("Horizontal overflow detected");
}
(async()=>{
  for(const [name,engine] of [["Chromium",chromium],["WebKit",webkit]]){
    const browser=await engine.launch({headless:true,args:name==="Chromium"?["--no-sandbox"]:[]});
    try{
      for(const device of [
        {name:"phone",width:390,height:844,mobile:true},
        {name:"tablet",width:820,height:1180,mobile:true},
        {name:"desktop",width:1440,height:900,mobile:false}
      ]){
        const context=await browser.newContext({viewport:{width:device.width,height:device.height},isMobile:device.mobile,hasTouch:device.mobile,serviceWorkers:"allow"});
        try{
          const page=await context.newPage(),errors=[];
          page.on("pageerror",e=>errors.push(e.message));
          const response=await page.goto(base,{waitUntil:"domcontentloaded",timeout:60000});
          if(!response||!response.ok())throw Error("Home unavailable for "+name+" "+device.name);
          await checkCalculations(page);
          if(name==="Chromium"){
            await page.evaluate(()=>navigator.serviceWorker.ready);
            await page.waitForFunction(async()=>{
              const js=await caches.match("./heat-stress-v20.js",{ignoreSearch:true});
              const css=await caches.match("./heat-stress-v20.css",{ignoreSearch:true});
              return Boolean(js&&js.ok&&css&&css.ok);
            },null,{timeout:120000});
            await context.setOffline(true);
            await page.reload({waitUntil:"domcontentloaded",timeout:60000});
            await checkCalculations(page);
            console.log("PASS "+name+" "+device.name+" offline cold-reload and heat/WBGT modes");
          }
          if(errors.length)throw Error("Page script errors: "+errors.join("; "));
          console.log("PASS "+name+" "+device.name+" heat/WBGT tests");
        }finally{await context.close();}
      }
    }finally{await browser.close();}
  }
})().catch(e=>{console.error("FAIL v0.20 browser QA:",e.stack||e);process.exit(1)});
