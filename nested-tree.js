(function(){
  let tries=0;
  function css(){
    if(document.getElementById('nestedTreeStyle'))return;
    const s=document.createElement('style');
    s.id='nestedTreeStyle';
    s.textContent=`.nested-tree{display:grid;gap:10px;margin-top:18px}.nested-tree details{margin:0;border:1px solid var(--line);border-left:6px solid var(--sf-guidance,#6554c0);border-radius:17px;background:#fff;overflow:hidden}.nested-tree details details{margin-top:10px;border-left-width:5px;box-shadow:none}.nested-tree summary{cursor:pointer;list-style:none;padding:16px 17px;background:linear-gradient(90deg,var(--sf-guidance-soft,#f4f1ff),#fff 38%)}.nested-tree summary::-webkit-details-marker{display:none}.nested-tree summary:before{content:'▶';display:inline-block;margin-right:9px;transition:transform .15s ease}.nested-tree details[open]>summary:before{transform:rotate(90deg)}.nested-tree .nt-code{color:var(--sf-guidance,#6554c0);font-weight:850;font-size:.88rem;letter-spacing:.04em}.nested-tree .nt-title{display:block;margin:6px 0 0 25px;color:var(--text);font-size:1.1rem;font-weight:800;line-height:1.3}.nested-tree .nt-status{display:block;margin:8px 0 0 25px;color:#584b91;font-size:.8rem;font-weight:700}.nested-tree .nt-body{padding:0 10px 12px}.nested-tree .nt-body>.ppm-entry{margin:10px 0 0;box-shadow:none}@media(max-width:600px){.nested-tree summary{padding:15px 13px}.nested-tree .nt-title{font-size:1.03rem}.nested-tree .nt-body{padding:0 6px 10px}}`;
    document.head.appendChild(s);
  }
  function parts(button){return{code:button?.querySelector('.ppm-folder-code')?.textContent.trim()||'',title:button?.querySelector('strong')?.textContent.trim()||'',status:button?.querySelector('.resource-status')?.textContent.trim()||''};}
  function level(p){
    const d=document.createElement('details');d.open=false;
    const m=document.createElement('summary');
    m.innerHTML='<span class="nt-code"></span><span class="nt-title"></span><span class="nt-status"></span>';
    m.querySelector('.nt-code').textContent=p.code;m.querySelector('.nt-title').textContent=p.title;m.querySelector('.nt-status').textContent=p.status;
    const b=document.createElement('div');b.className='nt-body';d.append(m,b);return{details:d,body:b};
  }
  function run(){
    const a=document.getElementById('ppmLibrarySection'),b=document.getElementById('ppmVolume4Section'),c=document.getElementById('ppmSubpartMSection');
    if(!a||!b||!c)return false;if(a.dataset.nestedTree==='1')return true;
    const x=a.querySelector('[data-open-volume]'),y=b.querySelector('[data-open-subpart]'),z=c.querySelector('.ppm-entry'),h=a.querySelector(':scope > .module-header');
    if(!x||!y||!z||!h)return false;
    const src=a.querySelector('.ppm-source-box');const srcCopy=src?src.cloneNode(true):null;const item=z.cloneNode(true);item.open=false;
    const l1=level(parts(x)),l2=level(parts(y));l2.body.appendChild(item);l1.body.appendChild(l2.details);
    Array.from(a.children).forEach(n=>{if(n!==h)n.remove();});
    const panel=document.createElement('div');panel.className='info-panel';
    const tree=document.createElement('div');tree.className='nested-tree';tree.appendChild(l1.details);panel.appendChild(tree);if(srcCopy)panel.appendChild(srcCopy);a.appendChild(panel);
    b.remove();c.remove();a.dataset.nestedTree='1';css();return true;
  }
  function init(){if(run())return;tries++;if(tries<80)setTimeout(init,75);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();