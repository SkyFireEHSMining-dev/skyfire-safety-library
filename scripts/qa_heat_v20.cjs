/* v0.20 heat mathematical regression, source values verified 2026-11-22. */
"use strict";
const assert=require("node:assert/strict");
const h=require("../heat-stress-v20.js");
const near=(a,b,tol=1)=>assert.ok(Math.abs(a-b)<=tol,String(a)+" should be near "+b);
near(h.heatIndexF(90,70),105);
near(h.heatIndexF(100,40),109);
near(h.heatIndexF(90,40),91);
near(h.heatIndexF(80,40),80);
assert.ok(h.heatIndexF(95,10)<h.heatIndexF(95,40));
assert.ok(h.heatIndexF(85,90)>h.heatIndexF(85,50));
near(h.fToC(95),35,1e-9);near(h.cToF(35),95,1e-9);
assert.throws(()=>h.heatIndexF(90,-1),RangeError);
assert.throws(()=>h.heatIndexF(90,101),RangeError);
assert.throws(()=>h.heatIndexF(NaN,50),RangeError);
assert.equal(h.bandFor(90.99).level,"caution");
assert.equal(h.bandFor(91).level,"moderate");
assert.equal(h.bandFor(103).level,"high");
assert.equal(h.bandFor(115).level,"high");
assert.equal(h.bandFor(115.01).level,"extreme");
for(const [work,unaccl,accl] of [["light",28,30],["moderate",25,28],["heavy",23,26],["veryHeavy",21,25]]){
 assert.equal(h.LIMITS[work].unacclimatized,unaccl);
 assert.equal(h.LIMITS[work].acclimatized,accl);
}
for(const [clothing,factor] of [["work",0],["cloth",0],["sms",.5],["polyolefin",1],["double",3],["vapor",11]]){
 const result=h.assessWBGT(24,"C","heavy","acclimatized",clothing);
 near(result.effectiveC,24+factor,1e-9);
}
assert.equal(h.assessWBGT(24,"C","heavy","unacclimatized","work").atOrAbove,true);
assert.equal(h.assessWBGT(24,"C","heavy","acclimatized","work").atOrAbove,false);
assert.equal(h.assessWBGT(26,"C","heavy","acclimatized","work").atOrAbove,true);
near(h.assessWBGT(77,"F","moderate","unacclimatized","sms").effectiveC,25.5,1e-9);
assert.throws(()=>h.assessWBGT(25,"C","heavy","acclimatized","other"),/Unlisted PPE/);
assert.throws(()=>h.assessWBGT(NaN,"C","heavy","acclimatized","work"),RangeError);
console.log("PASS v0.20 heat formula, published OSHA/NIOSH thresholds, unit and clothing conversions");
