/* SkyFire Safety v0.20 — Occupational Heat Stress.
 * Source check: 2026-11-22. See docs/HEAT_SOURCE_BASELINE_v0.20.md.
 * This module calculates Heat Index, but DOES NOT measure WBGT or authorize work. */
(function(){
"use strict";
const LIMITS = Object.freeze({
 light:{unacclimatized:28,acclimatized:30},
 moderate:{unacclimatized:25,acclimatized:28},
 heavy:{unacclimatized:23,acclimatized:26},
 veryHeavy:{unacclimatized:21,acclimatized:25}
});
const CLOTHING = Object.freeze({work:0,cloth:0,sms:0.5,polyolefin:1,double:3,vapor:11});
const fToC=f=>(f-32)*5/9, cToF=c=>c*9/5+32;
const round=v=>(Math.round((v+Number.EPSILON)*10)/10).toFixed(1);
function heatIndexF(t,rh){
 if(!Number.isFinite(t)||!Number.isFinite(rh)||rh<0||rh>100)throw RangeError("Use a numeric temperature and humidity from 0% to 100%.");
 const simple=.5*(t+61+(t-68)*1.2+rh*.094);
 let result=(simple+t)/2;
 if(result<80)return result;
 result=-42.379+2.04901523*t+10.14333127*rh-.22475541*t*rh-.00683783*t*t-.05481717*rh*rh+.00122874*t*t*rh+.00085282*t*rh*rh-.00000199*t*t*rh*rh;
 if(rh<13&&t>=80&&t<=112)result-=((13-rh)/4)*Math.sqrt((17-Math.abs(t-95))/17);
 else if(rh>85&&t>=80&&t<=87)result+=((rh-85)/10)*((87-t)/5);
 return result;
}
function bandFor(hi){
 if(!Number.isFinite(hi))throw RangeError("Invalid Heat Index.");
 if(hi<91)return {level:"caution",label:"Lower (caution) screening band",guidance:"Maintain basic prevention measures. This is not proof that work is safe."};
 if(hi<103)return {level:"moderate",label:"Moderate screening band",guidance:"Heighten awareness and apply site-specific heat precautions."};
 if(hi<=115)return {level:"high",label:"High screening band",guidance:"Additional protections and worksite heat assessment are warranted."};
 return {level:"extreme",label:"Very high to extreme screening band",guidance:"Escalate to site heat controls and qualified assessment without delay."};
}
function assessWBGT(value,unit,work,accl,clothes){
 if(!Number.isFinite(value))throw RangeError("Enter an actual numeric WBGT instrument reading.");
 if(unit!=="F"&&unit!=="C")throw RangeError("Choose an instrument temperature unit.");
 if(!Object.hasOwn(LIMITS,work))throw RangeError("Choose the correct physical workload.");
 if(accl!=="acclimatized"&&accl!=="unacclimatized")throw RangeError("Choose heat acclimatization.");
 if(!Object.hasOwn(CLOTHING,clothes))throw RangeError("Unlisted PPE has no approved factor in this table; seek site/IH review.");
 const measuredC=unit==="F"?fToC(value):value;
 const adjustmentC=CLOTHING[clothes], effectiveC=measuredC+adjustmentC, limitC=LIMITS[work][accl];
 return {measuredC,adjustmentC,effectiveC,limitC,atOrAbove:effectiveC>=limitC,deltaC:effectiveC-limitC,
  label:accl==="unacclimatized"?"Recommended Action Limit (unacclimatized)":"Recommended Threshold Limit Value (acclimatized)"};
}
const publicAPI=Object.freeze({heatIndexF,bandFor,assessWBGT,fToC,cToF,LIMITS,CLOTHING});
if(typeof module!=="undefined"&&module.exports)module.exports=publicAPI;
if(typeof document==="undefined")return;
function el(id){return document.getElementById(id)}
function error(id,msg){const node=el(id);node.textContent=msg||"";node.hidden=!msg}
function hide(id){el(id).hidden=true}
function inputNumber(id,label){
 const raw=el(id).value.trim();
 if(!raw)throw RangeError("Enter "+label+".");
 const n=Number(raw);
 if(!Number.isFinite(n))throw RangeError("Enter a valid number for "+label+".");
 return n;
}
function mode(which,focus){
 const index=which==="index";
 el("heatIndexPanel").hidden=!index;
 el("heatWbgtPanel").hidden=index;
 for(const [id,active] of [["heatTabIndex",index],["heatTabWbgt",!index]]){
  el(id).setAttribute("aria-selected",String(active));
  el(id).tabIndex=active?0:-1;
 }
 if(focus)el(index?"heatTabIndex":"heatTabWbgt").focus();
}
function switchUnits(selectId,valueId){
 let prev=el(selectId).value;
 el(selectId).addEventListener("change",()=>{
  const raw=el(valueId).value.trim(),next=el(selectId).value;
  if(raw&&Number.isFinite(Number(raw))&&next!==prev)el(valueId).value=round(prev==="F"?fToC(Number(raw)):cToF(Number(raw)));
  prev=next;hide("heatIndexResult");hide("heatWbgtResult");
 });
}
function indexSubmit(event){
 event.preventDefault();error("heatIndexError","");hide("heatIndexResult");
 try{
  const input=inputNumber("heatAirTemperature","air temperature");
  const rh=inputNumber("heatHumidity","relative humidity");
  const unit=el("heatIndexUnit").value,t=unit==="C"?cToF(input):input;
  if(t< -40||t>140)throw RangeError("Temperature is outside this tool's input guardrail (−40°F to 140°F). Verify it with your site heat program.");
  const value=heatIndexF(t,rh),band=bandFor(value);
  const contexts=[...document.querySelectorAll('input[name="heatContext"]:checked')].map(node=>node.value);
  const notes=[
   "Heat Index is not a measured WBGT or a work authorization.",
   "Sun, radiant heat, wind blockage, hot machinery, indoor or underground work can make this screen underestimate risk."
  ];
  if(["heavy","veryHeavy"].includes(el("heatIndexWorkload").value))notes.push("Heavy physical work adds metabolic heat; prefer measured WBGT.");
  if(contexts.length)notes.push("Selected conditions: "+contexts.join(", ")+". Consult onsite WBGT assessment.");
  if(t<80)notes.push("NWS low-end approximation was used; a low band does not establish safe conditions.");
  if(t>110||value>136)notes.push("Extreme conditions may exceed the dependable range of typical Heat Index tables.");
  el("heatIndexValue").textContent=round(unit==="C"?fToC(value):value)+"°"+unit;
  el("heatIndexOtherUnit").textContent=round(unit==="C"?value:fToC(value))+"°"+(unit==="C"?"F":"C");
  el("heatIndexBand").textContent=band.label;
  el("heatIndexGuidance").textContent=band.guidance;
  el("heatIndexNotes").textContent=notes.join(" ");
  el("heatIndexResult").dataset.level=band.level;
  el("heatIndexResult").hidden=false;
 }catch(e){error("heatIndexError",e.message||"Unable to calculate Heat Index.")}
}
function wbgtSubmit(event){
 event.preventDefault();error("heatWbgtError","");hide("heatWbgtResult");
 try{
  const value=inputNumber("heatWbgtMeasured","a measured WBGT reading");
  const unit=el("heatWbgtUnit").value,measuredC=unit==="F"?fToC(value):value;
  if(measuredC< -20||measuredC>60)throw RangeError("Check the WBGT instrument and units (outside −20°C to 60°C input guardrail).");
  const result=assessWBGT(value,unit,el("heatWbgtWorkload").value,el("heatWbgtAcclimatization").value,el("heatWbgtClothing").value);
  const effective=unit==="F"?cToF(result.effectiveC):result.effectiveC;
  const limit=unit==="F"?cToF(result.limitC):result.limitC;
  const adjustment=unit==="F"?result.adjustmentC*9/5:result.adjustmentC;
  el("heatWbgtValue").textContent=round(effective)+"°"+unit;
  el("heatWbgtOtherUnit").textContent=round(unit==="F"?result.effectiveC:cToF(result.effectiveC))+"°"+(unit==="F"?"C":"F");
  el("heatWbgtFactor").textContent="Clothing adjustment: +"+round(adjustment)+"°"+unit;
  el("heatWbgtLimit").textContent="Source comparison: "+round(limit)+"°"+unit+" — "+result.label;
  el("heatWbgtGuidance").textContent=result.atOrAbove
   ?"At or above the selected recommended screening value. Obtain site-specific assessment and protective measures."
   :"Below the selected recommended screening value. This is NOT proof that work is safe; apply site-specific controls.";
  el("heatWbgtResult").dataset.level=result.atOrAbove?"high":"caution";
  el("heatWbgtResult").hidden=false;
 }catch(e){error("heatWbgtError",e.message||"Unable to compare WBGT.")}
}
function initialize(){
 const section=el("heatStressSection");
 if(!section||section.dataset.ready)return;
 section.dataset.ready="true";
 el("heatTabIndex").addEventListener("click",()=>mode("index",true));
 el("heatTabWbgt").addEventListener("click",()=>mode("wbgt",true));
 section.querySelector(".sf-heat-tabs").addEventListener("keydown",event=>{
  if(!["ArrowLeft","ArrowRight","Home","End"].includes(event.key))return;
  event.preventDefault();
  const current=el("heatTabIndex").getAttribute("aria-selected")==="true";
  mode(event.key==="Home"?"index":event.key==="End"?"wbgt":current?"wbgt":"index",true);
 });
 el("heatIndexForm").addEventListener("submit",indexSubmit);
 el("heatWbgtForm").addEventListener("submit",wbgtSubmit);
 switchUnits("heatIndexUnit","heatAirTemperature");switchUnits("heatWbgtUnit","heatWbgtMeasured");
 section.querySelectorAll("input, select").forEach(input=>{
  for(const eventName of ["input","change"])input.addEventListener(eventName,()=>{
   hide("heatIndexResult");hide("heatWbgtResult");error("heatIndexError","");error("heatWbgtError","");
  });
 });
 mode("index",false);
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize);
else initialize();
})();