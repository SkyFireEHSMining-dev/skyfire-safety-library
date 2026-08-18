(function(){
  let tries=0;

  function css(){
    const old=document.getElementById('nestedTreeStyle');
    if(old)old.remove();

    const s=document.createElement('style');
    s.id='nestedTreeStyle';
    s.textContent=`
      .ppm-tree-panel{padding:20px;overflow:hidden}
      .nested-tree{display:grid;gap:10px;width:100%;max-width:100%;min-width:0;margin:0}

      /* Structural levels behave like the rebuilt CFR reader: the hierarchy is
         communicated by the summary rail/color, not by progressively nesting
         narrower cards. */
      .nested-tree>.nt-level,
      .nested-tree .nt-body>.nt-level{
        width:100%;max-width:100%;min-width:0;
        margin:9px 0;padding:0;
        border:0;border-radius:0;
        background:transparent;
        overflow:visible;
        box-shadow:none;
      }

      .nested-tree .nt-level>summary{
        display:block;width:100%;box-sizing:border-box;
        cursor:pointer;list-style:none;
        padding:15px 16px;
        border-top:1px solid var(--line-soft,var(--line));
        border-right:1px solid var(--line-soft,var(--line));
        border-bottom:1px solid var(--line-soft,var(--line));
        border-radius:15px;
        line-height:1.3;
        overflow-wrap:anywhere;
      }
      .nested-tree .nt-level>summary::-webkit-details-marker{display:none}
      .nested-tree .nt-level>summary:before{
        content:'▶';display:inline-block;margin-right:9px;
        color:var(--text);transition:transform .15s ease;
      }
      .nested-tree .nt-level[open]>summary:before{transform:rotate(90deg)}

      .nested-tree .nt-volume>summary{
        border-left:6px solid #43389f;
        background:linear-gradient(90deg,rgba(67,56,159,.14),#fff 36%);
      }
      .nested-tree .nt-subpart>summary{
        border-left:6px solid var(--sf-guidance,#6554c0);
        background:linear-gradient(90deg,rgba(101,84,192,.11),#fff 36%);
      }

      .nested-tree .nt-code{
        font-weight:850;font-size:.9rem;letter-spacing:.04em;
      }
      .nested-tree .nt-volume .nt-code{color:#43389f}
      .nested-tree .nt-subpart .nt-code{color:var(--sf-guidance,#6554c0)}
      .nested-tree .nt-title{
        display:block;margin:6px 0 0 25px;
        color:var(--text);font-size:1.08rem;font-weight:800;line-height:1.3;
      }
      .nested-tree .nt-status{
        display:block;margin:8px 0 0 25px;
        color:#65589c;font-size:.79rem;font-weight:700;
      }

      .nested-tree .nt-body{
        width:100%;max-width:100%;min-width:0;
        padding:0;margin:0;
      }

      /* Final PPM entries are the lightest guidance shade, again full width. */
      .nested-tree .nt-body>.ppm-entry{
        width:100%;max-width:100%;min-width:0;
        margin:10px 0 0;padding:0;
        border-top:1px solid var(--line-soft,var(--line));
        border-right:1px solid var(--line-soft,var(--line));
        border-bottom:1px solid var(--line-soft,var(--line));
        border-left:6px solid #9788df;
        border-radius:15px;
        background:#fff;
        box-shadow:none;
        overflow:hidden;
      }
      .nested-tree .nt-body>.ppm-entry>summary{
        width:100%;box-sizing:border-box;
        padding:16px 17px;
        background:linear-gradient(90deg,rgba(151,136,223,.13),#fff 38%);
      }
      .nested-tree .nt-body>.ppm-entry>summary strong{color:#5d50b7}
      .nested-tree .nt-body>.ppm-entry .ppm-entry-body{
        width:100%;max-width:100%;min-width:0;box-sizing:border-box;
        padding:0 17px 20px;
      }
      .nested-tree .nt-body>.ppm-entry .ppm-entry-body p,
      .nested-tree .nt-body>.ppm-entry .ppm-entry-body li{
        overflow-wrap:anywhere;
      }

      @media(max-width:600px){
        .ppm-tree-panel{padding:10px}
        .nested-tree .nt-level>summary{padding:14px 13px;font-size:1.02rem}
        .nested-tree .nt-title{font-size:1.02rem;margin-left:24px}
        .nested-tree .nt-status{margin-left:24px}
        .nested-tree .nt-body>.ppm-entry>summary{padding:15px 13px}
        .nested-tree .nt-body>.ppm-entry .ppm-entry-body{padding:0 13px 18px}
        .nested-tree .nt-body>.ppm-entry .ppm-entry-body p,
        .nested-tree .nt-body>.ppm-entry .ppm-entry-body li{font-size:1.05rem;line-height:1.55}
      }
    `;
    document.head.appendChild(s);
  }

  function parts(button){
    return{
      code:button?.querySelector('.ppm-folder-code')?.textContent.trim()||'',
      title:button?.querySelector('strong')?.textContent.trim()||'',
      status:button?.querySelector('.resource-status')?.textContent.trim()||''
    };
  }

  function level(p,className){
    const d=document.createElement('details');
    d.className=`nt-level ${className}`;
    d.open=false;

    const m=document.createElement('summary');
    m.innerHTML='<span class="nt-code"></span><span class="nt-title"></span><span class="nt-status"></span>';
    m.querySelector('.nt-code').textContent=p.code;
    m.querySelector('.nt-title').textContent=p.title;
    m.querySelector('.nt-status').textContent=p.status;

    const b=document.createElement('div');
    b.className='nt-body';
    d.append(m,b);
    return{details:d,body:b};
  }

  function run(){
    const a=document.getElementById('ppmLibrarySection');
    const b=document.getElementById('ppmVolume4Section');
    const c=document.getElementById('ppmSubpartMSection');
    if(!a||!b||!c)return false;
    if(a.dataset.nestedTree==='3')return true;

    const x=a.querySelector('[data-open-volume]');
    const y=b.querySelector('[data-open-subpart]');
    const entries=Array.from(c.querySelectorAll('.ppm-entry'));
    const h=a.querySelector(':scope > .module-header');
    if(!x||!y||!entries.length||!h)return false;

    const src=a.querySelector('.ppm-source-box');
    const srcCopy=src?src.cloneNode(true):null;

    const l1=level(parts(x),'nt-volume');
    const l2=level(parts(y),'nt-subpart');
    entries.forEach(sourceEntry=>{
      const item=sourceEntry.cloneNode(true);
      item.open=false;
      l2.body.appendChild(item);
    });
    l1.body.appendChild(l2.details);

    Array.from(a.children).forEach(n=>{if(n!==h)n.remove();});

    const panel=document.createElement('div');
    panel.className='info-panel ppm-tree-panel';
    const tree=document.createElement('div');
    tree.className='nested-tree';
    tree.appendChild(l1.details);
    panel.appendChild(tree);
    if(srcCopy)panel.appendChild(srcCopy);
    a.appendChild(panel);

    b.remove();
    c.remove();
    a.dataset.nestedTree='3';
    css();
    return true;
  }

  function init(){
    if(run())return;
    tries++;
    if(tries<80)setTimeout(init,75);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();
})();
