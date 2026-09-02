(function () {
  const CHECKED = 'Source checked September 2026';
  const AUDITED_CODES = [
    'I.4-3',
    '18.20',
    '48.5/48.25',
    '56/57.14100',
    '56/57.14101(a)',
    '56/57.14107',
    '56/57.14109',
    '77.410'
  ];
  let tries = 0;

  const COMPLETE_18_20 = `
    <p>Paragraph 18.20(a) of Part 18, 30 CFR, requires equipment to be designed to facilitate inspection and maintenance.</p>
    <p>Paragraph 18.20(b) of 30 CFR Part 18 requires equipment to be safe for its intended use.</p>

    <h4 class="ppm-source-subhead">Acceptance of Fiber Optic Cables and Cables Smaller than #14 AWG</h4>
    <p>The Mine Safety and Health Administration Approval and Certification Center has established a program for the evaluation of fiber optic cables and will include electrical signaling cables smaller than #14 AWG. This program establishes a mechanism that manufacturers may use to obtain acceptance of the subject cables for mine use.</p>
    <p>The program affords MSHA an opportunity to evaluate the application of new technology as applied to the mining industry while providing manufacturers with a means to obtain MSHA evaluation of these products.</p>
    <p>A fee will be charged for the evaluation and testing of these products as prescribed under Part 5, 30 CFR. This fee will be determined on an hourly basis similar to the present cable program. The major difference in the new program is that the test procedure has been modified by eliminating the electrical current requirements, changing the ignition time, and changing the pass/fail criteria.</p>

    <h4 class="ppm-source-subhead">Fiber Optic Cables Used on Approved Equipment</h4>
    <p>Fiber optic cable that does not contain current-carrying conductors will be acceptable for use on approved equipment, provided it:</p>
    <p>1. is accepted by MSHA as flame-resistant unless totally enclosed within an MSHA flame-resistant hose conduit or other MSHA flame-resistant material, or is totally contained within an explosion-proof enclosure;</p>
    <p>2. is provided with strain relief where it enters any explosion-proof enclosure when the fiber optic cable extends between enclosures not on a common frame;</p>
    <p>3. has all conductive components, such as metallic strength members or metallic vapor barriers, grounded;</p>
    <p>4. has the manufacturer, type, and outside diameter (including tolerances) for the fiber optic cable specified on the drawings submitted for approval; and</p>
    <p>5. is installed in a gland arrangement when existing or entering a explosion-proof enclosure. The gland arrangement or a similar one must have been explosion tested in an MSHA test enclosure at approximately 150 psig.</p>
    <p>Cables that contain both optical fibers and current-carrying conductors are considered electric cables and will be required to meet the existing requirements of 30 CFR Part 18.</p>
    <p>Any manufacturer's request to use a fiber optic cable in an application that does not specifically meet these requirements will be evaluated on the merit of the request.</p>

    <h4 class="ppm-source-subhead">Longwall Motor and Shearer Cables</h4>
    <p>This policy addresses specific longwall cables, namely, motor cables that supply power to all longwall motors, except those on-board the shearer, and shearer cables that supply power to longwall shearers. This policy takes into account that these cables have characteristics of both trailing and intra-machine cables as follows.</p>
    <p>1. Longwall motor cables and shearer cables shall be accepted by MSHA as flame-resistant or be totally enclosed in MSHA accepted flame-resistant hose conduit or other flame-resistant material, have adequate current carrying capacity and short circuit protection for the loads involved, have insulation compatible with the impressed voltage, and be protected from abrasive sharp edges. These requirements currently apply to all cables on permissible face equipment. The application to longwall motor cables and shearer cables is stated here for clarification.</p>
    <p>2. The 30 CFR 18, Table 9 length restrictions do not apply to longwall motor and shearer cables. These cables are evaluated individually at each longwall installation to ensure there is sufficient available fault current to provide adequate protection for the length of the cable used.</p>
    <p>3. Longwall motor and shearer cables with nominal voltages greater than 660 volts shall be of a shielded construction with a grounded metallic shield around each power conductor. Shielding in these longwall cables provides enhanced safety to miners whose normal work tasks place them in close proximity to the energized cables. Should these cables be physically damaged, the shielding would greatly reduce the possibility of exposure to severe phase-to-phase faults or any other type of electrical faults on the circuit.</p>
    <p>4. Longwall motor and shearer cables, like trailing cables once in service may be spliced, provided the splices are properly constructed. Shearer cables, like trailing cables, are constantly moving during mining operations. This movement may bring the cable into contact with surfaces of the mine terrain, mining equipment, and other cables, that occasionally results in a damaged cable that requires repair. Similarly, motor cables, like trailing cables, can be subject to damage requiring repair as a result of falling material at or near the longwall installation.</p>
    <p>5. Energized high voltage shearer cables may be held in place (trained) provided that the miners wear properly rated insulating gloves or use hot sticks. Use of properly rated insulating gloves or hot sticks is encouraged for low and medium voltage shearer cables. However, energized motor cables shall not be handled. The policy does not permit the handling of either shearer or motor cables, except that shearer cables may be trained with electrical gloves or hot sticks. Unlike trailing cables that require extensive handling in normal mining operations, the configuration of longwall installations is such that there is no need to handle these cables except to return the cable to the coursing trough where the cable occasionally has a tendency to slip out.</p>

    <h4 class="ppm-source-subhead">Pump Motor Cables</h4>
    <p>MSHA has determined that the length of cable between a starter/controller of an MSHA-approved pump assembly and the pump motor cable fits into the same category for splicing purposes as longwall motor and shearer cables. These pump motor cables can vary from less than 100 feet to more than 1,000 feet and, like trailing cables; they can be exposed to damage from contact with surfaces of the mine terrain and mining equipment.</p>

    <h4 class="ppm-source-subhead">Disconnecting Devices Installed On-Board Mine Equipment</h4>
    <p>Disconnecting devices installed on machines submitted for approval under 30 CFR Part 18 must meet Part 75 requirements in order to comply with the requirements of 30 CFR 18.4 and 18.20(b) so that the device is safe for its intended use. In addition, field modifications will be necessary if mine operators seek to install such devices on equipment with approvals that do not include these disconnecting devices.</p>

    <h4 class="ppm-source-subhead">Load Locking Valves</h4>
    <p>All hydraulic cylinders used to elevate cutting heads on conveyor booms of loading machines and continuous miners must have hydraulic load locking valves that meet the applicable MSHA criteria in order to be considered as approved under 30 CFR Part 18.</p>

    <h4 class="ppm-source-subhead">Enclosures Housing Energy Storage Devices</h4>
    <p>Therefore, to preclude a potential electrical shock hazard, energy storage devices (not including batteries) housed in explosion-proof enclosures are required to be provided with a means of being discharged before they are accessible to maintenance personnel. The maximum discharge time for such energy storage devices must be specified on the drawings on which they appear. The circuit design, a bleeding resistor, or a discharge switch are acceptable methods of satisfying this requirement. The circuit design or bleeding resistor is the preferred form of discharging the energy storage device.</p>
    <p>If discharge switches are used, a caution tag shall be on the enclosure cover warning that the discharge switch must be activated before the cover or cover mounting bolts are loosened.</p>

    <h4 class="ppm-source-subhead">Potential Hazard on Machines Designed with Multiple Functions</h4>
    <p>Machines that are designed to perform multiple functions from a single drive unit, simultaneously or individually, are required to be of a design that automatically disengages any engaging mechanism drive when the mechanism is shut down.</p>

    <h4 class="ppm-source-subhead">Circuit Breakers Handle Position</h4>
    <p>Manufacturers of equipment incorporating circuit breakers are required to provide a means that will make it easily discernible to ascertain the "on-off" position of vertically mounted circuit breakers. The "on-off" position shall be identified both externally, i.e., with the cover of the enclosure that houses the breaker in place, and internally, i.e., with the cover removed.</p>

    <h4 class="ppm-source-subhead">Flame Resistant Conveyor Belting on Equipment</h4>
    <p>The subject paragraph requires electrical equipment to be constructed of suitable materials. Section 18.65 of Part 18, 30 CFR, specifies the test procedures and criteria for the acceptance of conveyor belting as flame-resistant (fire-resistant).</p>
    <p>Therefore, conveyor belting used on equipment approved under Part 18, 30 CFR, shall be flame resistant (fire-resistant) in accordance with Section 18.65 Part 18, 30 CFR.</p>

    <h4 class="ppm-source-subhead">Use of Metal Halide or Mercury Vapor Bulbs with Polycarbonate Lenses</h4>
    <p>Polycarbonate has been accepted as a suitable material with physical characteristics equivalent to 1/2-inch thick tempered glass to be used for luminaire lenses (reference Paragraph 18.46(c) of Part 18, 30 CFR). However, the high levels of ultraviolet radiation and heat generation produced by a metal halide or mercury vapor bulb cause a degradation of the polycarbonate. The change in physical characteristics results in a weakened polycarbonate exhibiting cracking and crazing.</p>
    <p>Therefore, the use of metal halide bulbs or mercury vapor bulbs in explosion-proof enclosures with polycarbonate lenses is not acceptable.</p>

    <h4 class="ppm-source-subhead">Electric Equipment Incorporating Methane Monitors</h4>
    <p>When methane monitors are incorporated in designs of electric equipment, the following conditions shall be met.</p>
    <p>1. The methane monitor power shut-off relay shall be installed so that all electric motors (including auxiliary fan motors), all lighting circuits, and all electrical power takeoff receptacles (except intrinsically safe receptacles) on the equipment are automatically deenergized when the relay is activated. The methane monitor may remain energized and intrinsically safe lights may remain operational. Operation of these lights shall not require energization of any additional explosion-proof enclosures. On longwall mining systems, approved permissible telephones may also remain energized.</p>
    <p>2. On longwall mining systems, if an additional methane monitor is installed on the shearer, it shall be installed so that all electric motors and all electrical power takeoff receptacles (except intrinsically safe receptacles) on the shearer are automatically deenergized when the relay is activated. The methane monitor may remain energized.</p>
    <p>3. The methane monitor power shut-off relay shall be connected into the control circuitry so that it is not possible to override the methane monitor by holding down or blocking any reset (start) switch in the start position.</p>
    <p>4. The control circuitry shall be connected so that the electric motors will not restart automatically when the methane monitor power shut-off relay is deactivated.</p>

    <h4 class="ppm-source-subhead">Parking Brakes</h4>
    <p>Paragraph 18.20(f) of 30 CFR Part 18 requires that brakes be provided for each wheel-mounted machine, unless design of the driving mechanism will preclude movement of the machine when parked. Several fatal accidents have occurred involving electric face equipment when devices designed to trap hydraulic fluid in wheel cylinders were used as parking brakes. This design is deemed inadequate for use as a parking brake because the device might inadvertently cause the brake to release due to a number of factors such as fluid leakage, thermal contraction of brake fluid, or damage to hydraulic parts or brake lines.</p>
    <p>To correct this problem, MSHA will not approve equipment with parking brake systems that depend upon locking a column of fluid within the braking system to maintain contact between the friction material and the braking surface. Pursuant to 30 CFR 18.20(b) and (f), the parking brake, when applied, shall hold the mining equipment stationary up to its maximum rated gradeability, despite any contraction of the brake parts, exhaustion of any nonmechanical source of energy, or leakage of any kind.</p>
    <p>The majority of rubber-tired Part 18 equipment can comply with the policy. Approval and Certification Center engineers can provide technical assistance on the design of braking systems that need to be brought into compliance.</p>

    <h4 class="ppm-source-subhead">Red Light Reflecting Material</h4>
    <p>Paragraph 18.20(g) of 30 CFR Part 18 requires red light-reflecting material on both the front and rear of each mobile transportation unit that travels at a speed greater than 2.5 mph and recommends its use on each end of other mobile machines.</p>
    <p>Reflectors or reflecting tape is an acceptable means of satisfying this requirement. However, reflecting paint is not acceptable to satisfy this requirement.</p>
    <p>To be consistent with the requirements for Part 75.1719-4, 30 CFR, the reflecting material shall have a minimum area of 10 square inches.</p>

    <h4 class="ppm-source-subhead">Separate Terminations for Ground and Ground-Check Conductors</h4>
    <p>When a ground monitoring circuit employs a ground-check conductor to verify the continuity of the grounding conductor to the equipment frame(s), the ground-check and the equipment grounding conductors shall be separately terminated to the metallic frame(s) inside the enclosure(s) of the electrical equipment.</p>
  `;

  function findEntry(match) {
    return Array.from(document.querySelectorAll('#mshaGuidanceSection details.ppm-entry'))
      .find(function (entry) {
        return (entry.querySelector(':scope > summary strong')?.textContent || '').includes(match);
      });
  }

  function updateVolumeOneTitle() {
    const volume = Array.from(document.querySelectorAll('#mshaGuidanceSection details.ppm-tree-volume'))
      .find(function (node) {
        return (node.querySelector(':scope > summary .ppm-tree-code')?.textContent || '').trim() === 'VOLUME I';
      });
    const title = volume?.querySelector(':scope > summary .ppm-tree-title');
    if (title) title.textContent = 'The 1977 Act';
  }

  function replace18_20() {
    const entry = findEntry('18.20(a)-(b)') || findEntry('18.20');
    if (!entry) return false;

    const strong = entry.querySelector(':scope > summary strong');
    if (strong) strong.textContent = '18.20 · Quality of Material, Workmanship, and Design';

    const official = entry.querySelector('.ppm-official-text');
    if (!official) return false;
    official.innerHTML = COMPLETE_18_20;
    entry.dataset.ppmSourceFidelity = 'complete';
    entry.dataset.ppmAudit = 'september-2026';
    return true;
  }

  function refreshAuditDates() {
    const guidance = document.getElementById('mshaGuidanceSection');
    if (!guidance) return;

    guidance.querySelectorAll('.ppm-chip').forEach(function (chip) {
      if (/^Source checked /i.test(chip.textContent || '')) chip.textContent = CHECKED;
    });

    const status = guidance.querySelector('.ppm-program-status');
    if (status) {
      const count = guidance.querySelectorAll('details.ppm-entry').length;
      status.textContent = `${count} source-checked ${count === 1 ? 'entry' : 'entries'} · ${CHECKED}`;
    }
  }

  function markAuditedEntries() {
    const results = AUDITED_CODES.map(function (code) {
      const entry = findEntry(code === '18.20' ? '18.20' : code);
      if (!entry) return false;
      entry.dataset.ppmAudit = 'september-2026';
      return true;
    });
    return results.every(Boolean);
  }

  function addStyles() {
    if (document.getElementById('ppmAuditV14Styles')) return;
    const style = document.createElement('style');
    style.id = 'ppmAuditV14Styles';
    style.textContent = `
      .ppm-official-text .ppm-source-subhead{margin:24px 0 8px;font-size:1.04rem;line-height:1.35;color:var(--text);font-weight:850}
    `;
    document.head.appendChild(style);
  }

  function start() {
    addStyles();
    const guidance = document.getElementById('mshaGuidanceSection');
    const hasStretch = !!findEntry('56/57.14109');
    const hasPart48Correction = !!document.querySelector('#mshaGuidanceSection [data-ppm-source-fidelity="complete"]');

    if (!guidance || !hasStretch || !hasPart48Correction) {
      tries += 1;
      if (tries < 200) setTimeout(start, 75);
      return;
    }

    updateVolumeOneTitle();
    if (!replace18_20()) {
      tries += 1;
      if (tries < 200) setTimeout(start, 75);
      return;
    }

    refreshAuditDates();
    if (!markAuditedEntries()) {
      tries += 1;
      if (tries < 200) setTimeout(start, 75);
      return;
    }

    window.SkyFirePPMAuditV14 = {
      checked: CHECKED,
      auditedEntries: AUDITED_CODES.slice(),
      correctedDuringAudit: ['18.20'],
      confirmedEarlierCorrections: ['I.4-3', '48.5/48.25']
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();