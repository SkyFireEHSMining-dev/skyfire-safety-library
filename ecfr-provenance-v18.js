/* eCFR provenance strip. Governing text is always the bundled XML snapshot,
   never a live feed. Snapshot/file checked/amendment dates remain distinct. */
(function(){
  "use strict";
  let provenance=null;
  const dataStatus={29:"not-yet-loaded",30:"not-yet-loaded"};
  function date(iso) {
    if (!iso) return "not verified";
    const str=String(iso);
    // eCFR API "up_to_date_as_of" is a calendar date, not a UTC timestamp.
    // Date.parse("YYYY-MM-DD") treats midnight as UTC and displays the
    // previous day in western US time zones. Preserve the source's date.
    const match=/^(\d{4})-(\d{2})-(\d{2})$/.exec(str);
    const d=match
      ? new Date(Number(match[1]),Number(match[2])-1,Number(match[3]))
      : new Date(str);
    return Number.isNaN(d.getTime()) ? str.slice(0,10) :
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
    const source=dataStatus[title];
    const flag=source==="legacy-cache"?
      "WARNING: earlier cached dataset loaded; reconnect and refresh before relying on the listed snapshot date. ":
      source==="network-verified-source"?
      "SkyFire bundled snapshot (downloaded online, available from offline cache); not live eCFR. ":
      source==="not-yet-loaded"?
      "Dataset not loaded yet; open the reader online before depending on offline access. ":
      "Dataset provenance cannot yet be confirmed. ";
    const live=(online?"Connected — bundled snapshot, not live regulations. ":
      "Offline — only previously loaded data is available. ")+flag;
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
    window.addEventListener("skyfire:cfr-data-status",event=>{
      const t=Number(event.detail?.title);
      if(t===29||t===30){
        dataStatus[t]=event.detail.sourceStatus||"unmarked";
        render(t);
      }
    });
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
