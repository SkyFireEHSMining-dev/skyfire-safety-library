/* eCFR provenance strip. Governing text is always the bundled XML snapshot,
   never a live feed. Snapshot/file checked/amendment dates remain distinct. */
(function(){
  "use strict";
  let provenance=null;
  function date(iso) {
    if(!iso) return "not verified";
    const d=new Date(iso);
    return Number.isNaN(d.getTime()) ? String(iso).slice(0,10) :
      d.toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});
  }
  function text(id,t) {
    const node=document.getElementById(id);
    if(node) node.textContent=t;
  }
  function htmlSafe(s){return String(s||"").replace(/[&<>\"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));}
  function render(title) {
    const target=document.getElementById(title===30?"cfrSourceStatus":"oshaSourceStatus");
    if(!target)return;
    const entry=provenance?.titles?.[String(title)];
    const online=navigator.onLine;
    const live=online?"Connected — this still displays a dated offline-capable snapshot.":
         "Offline — cached snapshot only; current amendments cannot be checked.";
    if(!entry) {
      target.textContent="Source provenance unavailable. Bundled regulation text is a dated reference, not verified current. "+live;
      return;
    }
    const s=entry.ecfr_versioner||{};
    const gpo=entry.http?.last_modified ? date(entry.http.last_modified):"not confirmed";
    const through=s.up_to_date_as_of ? date(s.up_to_date_as_of):"not independently verified";
    target.innerHTML='<strong>Source:</strong> GPO eCFR Title '+title+
      ' bulk XML (unofficial editorial compilation). '+
      '<strong>GPO file last modified:</strong> '+htmlSafe(gpo)+'. '+
      '<strong>eCFR API reported current through:</strong> '+htmlSafe(through)+'. '+
      '<strong>Last source integrity check:</strong> '+htmlSafe(date(provenance.verification_time_utc))+'. '+
      '<strong>App release date:</strong> see Dashboard (separate from regulation dates). '+
      '<strong>Status:</strong> '+htmlSafe(live)+
      ' <a target="_blank" rel="noopener noreferrer" href="https://www.ecfr.gov/current/title-'+title+'">Check official eCFR</a>.';
  }
  function all(){render(29);render(30);}
  async function initialize(){
    all();
    try{
      const response=await fetch("Data/ecfr-source-provenance-v18.json",{cache:"no-store"});
      if(!response.ok)throw Error("HTTP "+response.status);
      const j=await response.json();
      if(j.schema!=="skyfire-ecfr-provenance-v18")throw Error("Unknown provenance schema");
      provenance=j;
    }catch(e){console.warn("CFR source metadata not available",e);}
    all();
    window.addEventListener("online",all);
    window.addEventListener("offline",all);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",initialize,{once:true});
  else initialize();
})();
