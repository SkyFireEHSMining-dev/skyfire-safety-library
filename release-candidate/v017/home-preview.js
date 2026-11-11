(function(){
  let tries=0;

  function addStyles(){
    const old=document.getElementById('homeHubPreviewStyles');
    if(old)old.remove();

    const style=document.createElement('style');
    style.id='homeHubPreviewStyles';
    style.textContent=`
      .skyfire-hub-home-tile .tile-subtitle{
        margin-bottom:14px;
      }
      .home-hub-preview{
        width:100%;
        margin-top:2px;
        padding-top:12px;
        border-top:1px solid var(--line-soft,var(--line));
        text-align:left;
      }
      .home-hub-preview-label{
        display:block;
        margin-bottom:8px;
        color:var(--muted);
        font-size:.74rem;
        font-weight:800;
        letter-spacing:.06em;
        text-transform:uppercase;
      }
      .home-hub-preview-grid{
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:7px 14px;
      }
      .home-hub-preview-item{
        position:relative;
        display:block;
        min-width:0;
        padding-left:12px;
        color:var(--text);
        font-size:.80rem;
        font-weight:700;
        line-height:1.28;
        overflow-wrap:anywhere;
      }
      .home-hub-preview-item:before{
        content:'';
        position:absolute;
        left:0;
        top:.48em;
        width:5px;
        height:5px;
        border-radius:50%;
        background:currentColor;
        opacity:.7;
      }
      .skyfire-hub-home-tile:not(.regulatory-hub):not(.field-hub) .home-hub-preview-item{color:#0b746b}
      .skyfire-hub-home-tile.regulatory-hub .home-hub-preview-item{color:#276baf}
      .skyfire-hub-home-tile.field-hub .home-hub-preview-item{color:#5f6f82}

      @media(min-width:700px){
        .home-hub-preview-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
      }
      @media(max-width:380px){
        .home-hub-preview-grid{gap:7px 10px}
        .home-hub-preview-item{font-size:.76rem}
      }
    `;
    document.head.appendChild(style);
  }

  function preview(tile,section){
    if(!tile||!section||tile.querySelector('.home-hub-preview'))return;
    const names=Array.from(section.querySelectorAll('.skyfire-hub-item strong'))
      .map(node=>node.textContent.trim())
      .filter(Boolean);
    if(!names.length)return;

    const wrap=document.createElement('span');
    wrap.className='home-hub-preview';
    wrap.setAttribute('aria-label','Resources inside this section');

    const label=document.createElement('span');
    label.className='home-hub-preview-label';
    label.textContent='Inside';

    const grid=document.createElement('span');
    grid.className='home-hub-preview-grid';
    names.forEach(name=>{
      const item=document.createElement('span');
      item.className='home-hub-preview-item';
      item.textContent=name;
      grid.appendChild(item);
    });

    wrap.append(label,grid);
    tile.appendChild(wrap);
  }

  function run(){
    const home=document.getElementById('homeSection');
    const safety=document.getElementById('safetyToolsHubSection');
    const regulatory=document.getElementById('regulatoryResourcesHubSection');
    const field=document.getElementById('fieldResourcesHubSection');
    if(!home||!safety||!regulatory||!field)return false;

    const tiles=Array.from(home.querySelectorAll('.skyfire-hub-home-tile'));
    const safetyTile=tiles.find(tile=>tile.querySelector('.tile-title')?.textContent.trim()==='Safety Tools');
    const regulatoryTile=tiles.find(tile=>tile.classList.contains('regulatory-hub'));
    const fieldTile=tiles.find(tile=>tile.classList.contains('field-hub'));
    if(!safetyTile||!regulatoryTile||!fieldTile)return false;

    addStyles();
    preview(safetyTile,safety);
    preview(regulatoryTile,regulatory);
    preview(fieldTile,field);
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