(function(){
  const CHECKED_LABEL='Source checked August 2026';
  const RESOURCES=[
    {
      type:'Regulatory reference',
      title:'30 CFR Part 56, Subpart T — Safety Program for Surface Mobile Equipment',
      description:'MSHA-published Part 56 Subpart T standards covering the written safety program requirement, responsible person, required program elements, recordkeeping, and program updates.',
      href:'https://www.msha.gov/sites/default/files/Regulations/SME-Rule-StandardsforSurfaceMNMMines-Part56.pdf'
    },
    {
      type:'MSHA FAQ',
      title:'Safety Program for Surface Mobile Equipment — Frequently Asked Questions',
      description:'MSHA answers on applicability, compliance dates, independent contractors, program integration, covered equipment, responsible persons, and other implementation questions.',
      href:'https://www.msha.gov/sites/default/files/Regulations/FREQUENTLY-ASKED-QUESTIONS-2024-07-15.pdf'
    },
    {
      type:'MSHA compliance assistance',
      title:'Surface Mobile Equipment Safety Program — Hazards and Risks',
      description:'MSHA hazard-recognition aid for identifying mine-specific mobile-equipment hazards and considering actions to reduce associated risks when developing or updating the written program.',
      href:'https://www.msha.gov/sites/default/files/Compliance_Enforcement/Hazards-and-Risks-Surface-Mobile-Equipment.pdf'
    },
    {
      type:'MSHA compliance assistance',
      title:'Covered Mobile Equipment — Categories and Examples',
      description:'MSHA examples of wheeled, rail-mounted, track-mounted, and skid-mounted equipment covered by the rule, along with examples of equipment the rule does not cover.',
      href:'https://www.msha.gov/sites/default/files/Compliance_Enforcement/Covered-mobile-equipment-examples.pdf'
    }
  ];

  function addStyles(){
    if(document.getElementById('surfaceMobileGuidanceStyles'))return;
    const style=document.createElement('style');
    style.id='surfaceMobileGuidanceStyles';
    style.textContent=`
      .sme-guidance-panel{border-left:5px solid var(--sf-guidance,#6554c0);padding:16px;overflow:hidden}
      .sme-guidance-label{display:block;color:var(--sf-guidance,#6554c0);font-size:.82rem;font-weight:850;letter-spacing:.05em;margin-bottom:6px}
      .sme-guidance-panel h3{margin:0 0 8px;font-size:1.45rem}
      .sme-guidance-intro{margin:0 0 14px;color:var(--muted);line-height:1.5}
      .sme-guidance-status{display:inline-block;margin:0 0 16px;padding:5px 10px;border-radius:999px;background:#eeeafd;color:#584b91;font-weight:750;font-size:.8rem}
      .sme-resource-list{display:grid;gap:12px}
      .sme-resource-card{border:1px solid var(--line-soft,var(--line));border-left:6px solid #9788df;border-radius:14px;padding:15px 16px;background:#fff}
      .sme-resource-type{display:block;color:#6554c0;font-size:.78rem;font-weight:850;letter-spacing:.03em;text-transform:uppercase;margin-bottom:5px}
      .sme-resource-card h4{margin:0 0 7px;font-size:1.08rem;line-height:1.35}
      .sme-resource-card p{margin:0 0 11px;line-height:1.5}
      .sme-resource-card a{display:inline-flex;min-height:42px;align-items:center;font-weight:750;color:var(--sf-guidance,#6554c0);overflow-wrap:anywhere}
      .sme-source-note{margin-top:16px;padding:13px 15px;background:var(--sf-guidance-soft,#f4f1ff);border-left:4px solid var(--sf-guidance,#6554c0);line-height:1.5}
      @media(max-width:600px){.sme-guidance-panel{padding:12px}.sme-guidance-panel h3{font-size:1.3rem}.sme-resource-card{padding:14px 13px}.sme-resource-card p{font-size:1.02rem}}
    `;
    document.head.appendChild(style);
  }

  function render(){
    const guidance=document.getElementById('mshaGuidanceSection');
    if(!guidance)return false;
    if(guidance.querySelector('.sme-guidance-panel'))return true;
    addStyles();
    const panel=document.createElement('div');
    panel.className='info-panel sme-guidance-panel';
    panel.innerHTML=`
      <span class="sme-guidance-label">RULE-SPECIFIC MSHA RESOURCES</span>
      <h3>Surface Mobile Equipment Safety Program Resources</h3>
      <p class="sme-guidance-intro">Authoritative MSHA resources supporting the written safety program requirements in 30 CFR Part 56, Subpart T.</p>
      <span class="sme-guidance-status">4 source-checked resources · ${CHECKED_LABEL}</span>
      <div class="sme-resource-list">
        ${RESOURCES.map(resource=>`<div class="sme-resource-card"><span class="sme-resource-type">${resource.type}</span><h4>${resource.title}</h4><p>${resource.description}</p><a href="${resource.href}" target="_blank" rel="noopener">Open official MSHA resource</a></div>`).join('')}
      </div>
      <div class="sme-source-note"><strong>Source distinction:</strong> This collection includes MSHA-published regulatory and compliance-assistance materials. Industry-authored templates hosted on MSHA's site are not presented here as MSHA-authored guidance.</div>
    `;
    guidance.appendChild(panel);
    return true;
  }

  let tries=0;
  function init(){if(render())return;tries+=1;if(tries<100)setTimeout(init,75);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();