(function(){
  const CODE='56/57.14109';
  const TITLE='Unguarded Conveyors With Adjacent Travelways';
  const CHECKED='Source checked August 2026';
  let tries=0;

  const paragraphs=[
    'Sections 56/57.14109 require unguarded conveyors next to travelways to be equipped with emergency stop devices or railings. A travelway is defined in 30 CFR §§ 56/57.2 as a passage, walk or way regularly used and designated for persons to go from one place to another. If an unguarded conveyor has travelways on each side of it, both unguarded sides must be equipped with emergency stop devices or railings.',
    'Under Sections 56/57.14109(a), emergency stop devices must be located so that a person falling on or against the conveyor can readily deactivate the conveyor drive motor. MSHA expects that a miner would be able to readily reach the emergency stop device to activate it and that the device would be located along the portion of the unguarded conveyor that is adjacent to a travelway.',
    'Under Sections 56/57.14109(b), railings must: (1) be positioned to prevent persons from falling on or against the conveyor; (2) withstand the vibration, shock, and wear to which it will be subjected during normal operation; and (3) be constructed and maintained so that it will not create a hazard. MSHA expects that railings would be located along the portion of the unguarded conveyor that is adjacent to a travelway.',
    'Neither the conveyor installation nor its framework is considered a railing for the purpose of these standards irrespective of its height or conformance with standard railing heights.',
    'Sections 56/57.14109 do not apply to unguarded conveyors which are not next to travelways, including overhead conveyors, where there is no reasonable possibility that miners will come into contact with system components (e.g., idlers, conveyor belt) of the conveyor.'
  ];

  function findSubpartM(){
    const guidance=document.getElementById('mshaGuidanceSection');
    if(!guidance)return null;
    const volumes=Array.from(guidance.querySelectorAll('details.ppm-tree-volume'));
    const volumeIV=volumes.find(v=>/VOLUME IV/i.test(v.querySelector(':scope > summary')?.textContent||''));
    if(!volumeIV)return null;
    const groups=Array.from(volumeIV.querySelectorAll(':scope > .ppm-tree-body > details.ppm-tree-group'));
    return groups.find(g=>/SUBPART M/i.test(g.querySelector(':scope > summary')?.textContent||''))||null;
  }

  function updateCount(scope){
    const label=scope?.querySelector(':scope > summary .ppm-tree-status');
    if(!label)return;
    const count=scope.querySelectorAll(':scope > .ppm-tree-body > details.ppm-entry').length;
    label.textContent=`${count} source-checked ${count===1?'entry':'entries'}`;
  }

  function publish(){
    const group=findSubpartM();
    if(!group)return false;
    if(group.querySelector('[data-ppm-code="56-57-14109"]'))return true;
    const body=group.querySelector(':scope > .ppm-tree-body');
    if(!body)return false;

    const details=document.createElement('details');
    details.className='ppm-entry';
    details.dataset.ppmCode='56-57-14109';
    details.innerHTML=`
      <summary>
        <strong>${CODE} · ${TITLE}</strong>
        <span>Official MSHA Program Policy Manual text</span>
      </summary>
      <div class="ppm-entry-body">
        <div class="ppm-meta">
          <span class="ppm-chip">Source type · PPM</span>
          <span class="ppm-chip">VOLUME IV</span>
          <span class="ppm-chip">SUBPART M</span>
          <span class="ppm-chip">${CHECKED}</span>
        </div>
        <h4>Official MSHA PPM text</h4>
        <div class="ppm-official-text">${paragraphs.map(p=>`<p>${p}</p>`).join('')}</div>
      </div>`;

    body.appendChild(details);
    updateCount(group);
    const volume=group.closest('details.ppm-tree-volume');
    if(volume){
      const status=volume.querySelector(':scope > summary .ppm-tree-status');
      if(status){
        const count=volume.querySelectorAll('.ppm-entry').length;
        status.textContent=`${count} source-checked ${count===1?'entry':'entries'}`;
      }
    }
    const program=document.querySelector('#mshaGuidanceSection .ppm-program-status');
    if(program){
      const count=document.querySelectorAll('#mshaGuidanceSection .ppm-entry').length;
      program.textContent=`${count} source-checked entries · ${CHECKED}`;
    }
    return true;
  }

  function start(){if(publish())return;tries+=1;if(tries<160)setTimeout(start,75);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();