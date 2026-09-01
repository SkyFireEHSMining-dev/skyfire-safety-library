(function(){
  let tries=0;

  function addStyles(){
    if(document.getElementById('skyfireTgReaderV14Styles'))return;
    const style=document.createElement('style');
    style.id='skyfireTgReaderV14Styles';
    style.textContent=`
      #technicalGuidanceSection .tg-library-root{width:100%;max-width:100%;margin:0;padding:0;border:0;background:transparent;box-shadow:none}
      #technicalGuidanceSection .tg-library-root>summary{display:block;cursor:pointer;list-style:none}
      #technicalGuidanceSection .tg-library-root>summary::-webkit-details-marker{display:none}
      #technicalGuidanceSection .tg-library-root>summary:before{content:'▶';display:inline-block;margin-right:9px;color:#c45d0d;transition:transform .15s ease}
      #technicalGuidanceSection .tg-library-root[open]>summary:before{transform:rotate(90deg)}
      #technicalGuidanceSection .tg-library-root>summary .tg-folder-code{display:inline;color:#c45d0d;font-weight:800;font-size:.9rem;letter-spacing:.03em}
      #technicalGuidanceSection .tg-library-root>summary strong{display:block;color:var(--text);font-size:1.25rem;line-height:1.2;margin-top:7px}
      #technicalGuidanceSection .tg-library-root>summary .resource-status{display:inline-block;margin-top:12px}
      #technicalGuidanceSection .tg-library-root>summary .tg-folder-description{display:block;color:var(--muted);margin-top:10px;line-height:1.45}
      #technicalGuidanceSection .tg-inline-guide{padding:10px 0 0}
      #technicalGuidanceSection .tg-reader-hint{margin:0 0 14px;padding:10px 13px;border-left:4px solid #f0a15f;background:#fff9f3;color:var(--muted);line-height:1.45}

      #technicalGuidanceSection details.tg-tree-root,
      #technicalGuidanceSection details.tg-tree-leaf{width:100%;max-width:100%;min-width:0;margin:10px 0;padding:0;border:0;background:transparent;box-shadow:none;overflow:visible}
      #technicalGuidanceSection details.tg-tree-root>summary,
      #technicalGuidanceSection details.tg-tree-leaf>summary{display:block;width:100%;box-sizing:border-box;cursor:pointer;list-style:none;border-top:1px solid var(--line-soft,var(--line));border-right:1px solid var(--line-soft,var(--line));border-bottom:1px solid var(--line-soft,var(--line));border-radius:15px;line-height:1.3;overflow-wrap:anywhere}
      #technicalGuidanceSection details.tg-tree-root>summary::-webkit-details-marker,
      #technicalGuidanceSection details.tg-tree-leaf>summary::-webkit-details-marker{display:none}
      #technicalGuidanceSection details.tg-tree-root>summary:before,
      #technicalGuidanceSection details.tg-tree-leaf>summary:before{content:'▶';display:inline-block;margin-right:9px;color:#c45d0d;transition:transform .15s ease}
      #technicalGuidanceSection details.tg-tree-root[open]>summary:before,
      #technicalGuidanceSection details.tg-tree-leaf[open]>summary:before{transform:rotate(90deg)}

      #technicalGuidanceSection details.tg-tree-root>summary{padding:16px 17px;border-left:6px solid #c45d0d;background:linear-gradient(90deg,rgba(249,115,22,.13),#fff 38%)}
      #technicalGuidanceSection details.tg-tree-root>summary strong{display:inline;color:#9a4b0b;font-size:1.17rem;line-height:1.3}
      #technicalGuidanceSection details.tg-tree-root>summary span{display:block;margin:7px 0 0 25px;color:var(--muted);font-size:.92rem;line-height:1.4}
      #technicalGuidanceSection details.tg-tree-intro>summary{border-left-color:#9a6a43;background:linear-gradient(90deg,rgba(154,106,67,.11),#fff 38%)}
      #technicalGuidanceSection details.tg-tree-intro>summary strong{color:#7b5538}

      #technicalGuidanceSection details.tg-tree-leaf>summary{padding:14px 14px;border-left:6px solid #f0a15f;background:linear-gradient(90deg,rgba(240,161,95,.10),#fff 40%);font-weight:800;color:#a64d0a}
      #technicalGuidanceSection details.tg-tree-leaf .tg-subsection-body{box-sizing:border-box;padding:4px 15px 16px}
      #technicalGuidanceSection details.tg-tree-leaf .tg-subsection-body p,
      #technicalGuidanceSection details.tg-tree-leaf .tg-subsection-body li{line-height:1.6}

      #technicalGuidanceSection .tg-publication>.tg-body,
      #technicalGuidanceSection .tg12-body{box-sizing:border-box;padding:4px 17px 20px}
      #technicalGuidanceSection .tg12-published{margin-top:10px}
      #technicalGuidanceSection .tg12-published>summary{margin:0}

      @media(max-width:600px){
        #technicalGuidanceSection .tg-library-root>summary strong{font-size:1.14rem}
        #technicalGuidanceSection details.tg-tree-root>summary{padding:15px 13px}
        #technicalGuidanceSection details.tg-tree-root>summary strong{font-size:1.08rem}
        #technicalGuidanceSection details.tg-tree-root>summary span{margin-left:24px;font-size:.88rem}
        #technicalGuidanceSection details.tg-tree-leaf>summary{padding:13px 12px;font-size:1.02rem}
        #technicalGuidanceSection details.tg-tree-leaf .tg-subsection-body{padding:4px 12px 15px}
        #technicalGuidanceSection .tg-publication>.tg-body,#technicalGuidanceSection .tg12-body{padding:4px 13px 18px}
      }
    `;
    document.head.appendChild(style);
  }

  function updatePublicationLabels(tg001){
    const library=document.getElementById('technicalGuidanceSection');
    const desc=library?.querySelector('.tg-folder-description');
    if(desc)desc.textContent='Introduction + Sections 1.1 and 1.2 published. Additional reviewed sections will be added inside this guide.';

    const overview=tg001.querySelector('.tg-guide-overview');
    if(overview){
      const status=overview.querySelector('.resource-status');
      if(status)status.textContent='Published · Reviewed August 2026';
      const note=overview.querySelector('.tg-review-note');
      if(note)note.textContent='Published now: Introduction + Sections 1.1 and 1.2. Additional sections will appear here only after completing the same review process.';
    }
  }

  function moveSection12ToRoot(tg001){
    const section12=tg001.querySelector('[data-tg-subsection="1.2"]');
    if(!section12)return null;
    if(section12.parentElement!==tg001)tg001.appendChild(section12);
    section12.classList.add('info-panel','tg-publication','tg-tree-root');
    return section12;
  }

  function buildSection12Leaves(section12){
    if(!section12||section12.dataset.cfrTreeBuilt==='true')return;
    const body=section12.querySelector('.tg12-body');
    if(!body)return;
    const headings=Array.from(body.querySelectorAll(':scope > h4')).filter(h=>/^1\.2\.[1-7]\b/.test(h.textContent.trim()));
    headings.forEach(heading=>{
      const details=document.createElement('details');
      details.className='tg-subsection tg-tree-leaf tg12-leaf';
      const summary=document.createElement('summary');
      summary.textContent=heading.textContent.trim();
      const inner=document.createElement('div');
      inner.className='tg-subsection-body';
      let node=heading.nextSibling;
      while(node){
        const next=node.nextSibling;
        if(node.nodeType===1&&node.tagName==='H4')break;
        inner.appendChild(node);
        node=next;
      }
      heading.replaceWith(details);
      details.append(summary,inner);
    });
    section12.dataset.cfrTreeBuilt='true';
  }

  function classifyExistingTree(tg001){
    Array.from(tg001.children).forEach(child=>{
      if(child.matches&&child.matches('details.tg-publication')){
        child.classList.add('tg-tree-root');
        const label=child.querySelector(':scope > summary')?.textContent||'';
        if(/Introduction/i.test(label))child.classList.add('tg-tree-intro');
      }
    });
    tg001.querySelectorAll('.tg-publication .tg-subsection').forEach(details=>{
      if(details.dataset.tgSubsection==='1.2')return;
      details.classList.add('tg-tree-leaf');
    });
  }

  function nestGuideInLibrary(tg001){
    const library=document.getElementById('technicalGuidanceSection');
    const folder=library?.querySelector('.tg-guide-folder');
    if(!library||!folder)return false;
    if(library.querySelector('.tg-library-root'))return true;

    const root=document.createElement('details');
    root.className='tg-guide-folder tg-library-root';
    const summary=document.createElement('summary');
    summary.innerHTML=folder.innerHTML;
    root.appendChild(summary);

    const inline=document.createElement('div');
    inline.className='tg-inline-guide';
    const hint=document.createElement('div');
    hint.className='tg-reader-hint';
    hint.textContent='Expand a published section, then open only the subsection you need.';
    inline.appendChild(hint);

    Array.from(tg001.children).forEach(child=>{
      if(child.matches&&child.matches('details.tg-tree-root'))inline.appendChild(child);
    });
    root.appendChild(inline);
    folder.replaceWith(root);
    root.open=false;
    tg001.classList.add('hidden');
    tg001.dataset.inlineNested='true';
    return true;
  }

  function closeTree(scope){
    scope.querySelectorAll('details.tg-tree-root, details.tg-tree-leaf').forEach(details=>{details.open=false;});
  }

  function organize(){
    const tg001=document.getElementById('tg001Section');
    const section12=tg001?.querySelector('[data-tg-subsection="1.2"]');
    if(!tg001||!section12)return false;
    addStyles();
    updatePublicationLabels(tg001);
    const moved=moveSection12ToRoot(tg001);
    buildSection12Leaves(moved);
    classifyExistingTree(tg001);
    closeTree(tg001);
    if(!nestGuideInLibrary(tg001))return false;
    const library=document.getElementById('technicalGuidanceSection');
    closeTree(library);
    tg001.dataset.tgReader='cfr-style-inline-v2';
    return true;
  }

  function start(){
    if(organize())return;
    tries+=1;
    if(tries<160)setTimeout(start,75);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();