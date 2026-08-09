const SKYFIRE_FEEDBACK_EMAIL = "skyfire.ehs.mining@gmail.com";
const SKYFIRE_FEEDBACK_VERSION = "v0.11 Beta";

function initializeFeedbackModule() {
  const form = document.getElementById("feedbackForm");
  const typeSelect = document.getElementById("feedbackType");
  const areaSelect = document.getElementById("feedbackArea");
  const messageInput = document.getElementById("feedbackMessage");
  const nameInput = document.getElementById("feedbackName");
  const emailInput = document.getElementById("feedbackEmail");
  const guidance = document.getElementById("feedbackTypeGuidance");
  const clearButton = document.getElementById("feedbackClearBtn");
  const status = document.getElementById("feedbackStatus");

  if (!form || !typeSelect || !areaSelect || !messageInput) return;

  const guidanceByType = {
    "Suggestion": ["What would make SkyFire more useful in the field?", "Tell us what would make SkyFire more useful in the field."],
    "Feature Idea": ["What would you like SkyFire to help you do?", "Describe the feature or capability you would like SkyFire to add."],
    "Problem or Bug": ["What happened, and what did you expect to happen?", "Describe what happened, what you expected, and any steps that help reproduce the problem."],
    "General Feedback": ["Share any observation about usability, content, or the overall SkyFire experience.", "Share your feedback about SkyFire."]
  };

  function updateFeedbackPrompt() {
    const selected = guidanceByType[typeSelect.value] || guidanceByType["Suggestion"];
    if (guidance) guidance.textContent = selected[0];
    messageInput.placeholder = selected[1];
  }

  function clearStatus() {
    if (!status) return;
    status.textContent = "";
    status.classList.remove("feedback-status-error");
  }

  typeSelect.addEventListener("change", () => {
    updateFeedbackPrompt();
    clearStatus();
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    clearStatus();

    const feedbackText = messageInput.value.trim();
    if (!feedbackText) {
      if (status) {
        status.textContent = "Please enter your feedback before preparing the email.";
        status.classList.add("feedback-status-error");
      }
      messageInput.focus();
      return;
    }

    const type = typeSelect.value;
    const area = areaSelect.value;
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";

    if (emailInput && email && !emailInput.checkValidity()) {
      if (status) {
        status.textContent = "Please enter a valid email address or leave the optional email field blank.";
        status.classList.add("feedback-status-error");
      }
      emailInput.focus();
      return;
    }

    const subject = `SkyFire Feedback — ${type} — ${area}`;
    const body = [
      "SkyFire Feedback",
      "",
      `Type: ${type}`,
      `Area: ${area}`,
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      "",
      "Feedback:",
      feedbackText,
      "",
      `SkyFire App Version: ${SKYFIRE_FEEDBACK_VERSION}`,
      "",
      "Sent from the SkyFire Feedback & Suggestions module."
    ].join("\n");

    if (status) status.textContent = "Opening your email app. Review the prepared message, then tap Send.";
    window.location.href = `mailto:${SKYFIRE_FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      form.reset();
      updateFeedbackPrompt();
      clearStatus();
      messageInput.focus();
    });
  }

  updateFeedbackPrompt();
}

function initializeAboutSection() {
  const aboutSection = document.getElementById("aboutSection");
  if (!aboutSection) return;
  const existingPanel = aboutSection.querySelector(".info-panel");
  if (!existingPanel) return;

  existingPanel.outerHTML = `
    <div class="about-card about-purpose-card">
      <h3>What Is SkyFire?</h3>
      <p>SkyFire is an independently developed field-safety resource designed to make practical safety tools, regulatory references, and field resources easier to access and use. The Safety Library brings mine-safety references, risk-assessment tools, printable resources, and other field-focused content together in one mobile-friendly, offline-ready location.</p>
    </div>
    <div class="about-card">
      <h3>Why SkyFire Exists</h3>
      <p>Safety professionals and field teams often work across regulations, company programs, procedures, forms, risk tools, and practical reference material. SkyFire is intended to reduce friction by making useful resources easier to reach when they are needed.</p>
      <p>SkyFire does not replace qualified safety professionals, employer safety programs, site-specific procedures, manufacturer guidance, or regulatory authorities. It is a support resource intended to strengthen hazard awareness, learning, planning, and informed field decisions.</p>
    </div>
    <div class="about-card about-beta-card">
      <div class="about-card-title-row"><h3>Built With Field Feedback</h3><span class="about-beta-badge">${SKYFIRE_FEEDBACK_VERSION}</span></div>
      <p>SkyFire is actively being developed and improved. Feedback from safety professionals, miners, supervisors, trainers, and other users helps identify what is useful, what needs improvement, and what should be built next.</p>
      <p>Beta content and features may continue to change as they are tested, reviewed, and refined.</p>
    </div>
    <div class="about-card about-safety-card">
      <h3>Important Safety &amp; Regulatory Notice</h3>
      <p>SkyFire tools and references are general support resources. Before relying on or implementing any information, verify the current site-specific requirements, applicable MSHA or OSHA regulations, employer policies and procedures, manufacturer instructions, competent-person requirements, and any other regulatory or operational obligations that apply to the work.</p>
      <p>Regulatory text, forms, guidance, and safety practices can change. When a requirement matters to a safety or compliance decision, confirm it against the current authoritative source.</p>
    </div>
    <div class="about-card about-project-card">
      <h3>Project &amp; Creator</h3>
      <dl class="about-project-details">
        <div><dt>Developed by</dt><dd>Nicholas R. Murphy</dd></div>
        <div><dt>Project</dt><dd>SkyFire Safety - Mine Safety Tools</dd></div>
        <div><dt>Current release</dt><dd>${SKYFIRE_FEEDBACK_VERSION}</dd></div>
        <div><dt>License</dt><dd>CC BY-NC 4.0 — Attribution required; non-commercial use only.</dd></div>
      </dl>
    </div>`;
}

function initialize5STool() {
  const grid = document.querySelector("#homeSection .dashboard-grid");
  const home = document.getElementById("homeSection");
  if (!grid || !home) return;

  const oldSection = document.getElementById("fiveSSection");
  if (oldSection) oldSection.remove();
  const oldTile = grid.querySelector(".five-s-home-tile");
  if (oldTile) oldTile.remove();
  const oldStyle = document.getElementById("fiveSStyles");
  if (oldStyle) oldStyle.remove();

  const tile = document.createElement("button");
  tile.className = "dashboard-tile five-s-home-tile";
  tile.type = "button";
  tile.innerHTML = '<span class="tile-title">5S Workplace Organization</span><span class="tile-subtitle">Assess workplace organization, then apply Sort, Set in Order, Shine, Standardize, and Sustain.</span>';
  const feedbackTile = grid.querySelector(".feedback-home-tile");
  grid.insertBefore(tile, feedbackTile || null);

  const section = document.createElement("section");
  section.id = "fiveSSection";
  section.className = "app-section hidden";
  section.innerHTML = `
    <div class="module-header five-s-header">
      <button class="module-home-btn five-s-home" type="button">Back Home</button>
      <div class="module-header-text">
        <h2>5S Workplace Organization</h2>
        <p>Assess the current condition, then use the 5S sequence to improve and maintain the work area.</p>
      </div>
    </div>

    <details class="info-panel five-s-overview" open>
      <summary>What 5S Is &amp; How to Use This Tool</summary>
      <div class="five-s-detail-body">
        <p><strong>5S is a workplace-organization system:</strong> Sort, Set in Order, Shine, Standardize, and Sustain.</p>
        <p>The sequence matters when establishing or improving a workplace. The five elements then work together as a maintained system — 5S is not a one-time checklist that is finished after five steps.</p>
        <ol class="five-s-use-steps">
          <li><strong>Assess:</strong> answer the observable-condition questions below.</li>
          <li><strong>Focus:</strong> SkyFire identifies the earliest 5S stage that needs attention.</li>
          <li><strong>Improve:</strong> open that stage in the 5S guide and work through it.</li>
          <li><strong>Reassess:</strong> repeat the quick check after improvements are made.</li>
        </ol>
        <p class="five-s-note">Use 5S to support workplace organization and efficiency. It does not replace required workplace examinations, inspections, hazard controls, or site procedures.</p>
      </div>
    </details>

    <div class="info-panel five-s-assessment">
      <div class="five-s-section-heading">
        <div><h3>Quick Workplace Assessment</h3><p>Answer what you can directly observe. No 5S knowledge is required.</p></div>
        <span class="five-s-scale-key">Yes / Partially / No</span>
      </div>
      <div id="fiveSQuestions" class="five-s-questions"></div>
      <button class="five-s-reset" type="button">Clear Assessment</button>
    </div>

    <div class="info-panel five-s-result" aria-live="polite">
      <h3>Your Workplace Organization Snapshot</h3>
      <div class="five-s-score-row"><strong class="five-s-percent">—</strong><span>%</span></div>
      <p class="five-s-completion">0 of 8 conditions rated.</p>
      <p class="five-s-status">Complete the assessment to receive a 5S starting point.</p>
      <div class="five-s-next hidden">
        <span>Recommended starting point</span>
        <strong></strong>
        <p></p>
        <button type="button" class="five-s-jump">Open this 5S stage</button>
      </div>
    </div>

    <div class="five-s-guide-wrap">
      <div class="info-panel five-s-guide-intro">
        <h3>Apply 5S in Sequence</h3>
        <p>Open only the stage you need. Each stage explains the intent, field actions, and the condition you are trying to establish before moving forward.</p>
      </div>

      <details class="info-panel five-s-stage" data-stage="Sort">
        <summary><span class="five-s-stage-number">1</span><span><strong>Sort</strong><small>Separate what is needed from what is not.</small></span></summary>
        <div class="five-s-detail-body"><h4>Purpose</h4><p>Remove clutter and unnecessary items so the work area contains what is actually needed for the work.</p><h4>Field actions</h4><ul><li>Identify items that are unnecessary, obsolete, damaged, duplicated, or no longer used.</li><li>Remove, dispose of, return, relocate, or quarantine those items through the appropriate site process.</li><li>Keep only the tools, materials, supplies, and information needed in or near the work area.</li></ul><h4>Ask</h4><p>Does each item here have a current purpose? If it disappeared today, would the work still be performed safely and effectively?</p><div class="five-s-ready"><strong>Ready to move on when:</strong> unnecessary items are removed or controlled and the remaining items have a legitimate purpose.</div></div>
      </details>

      <details class="info-panel five-s-stage" data-stage="Set in Order">
        <summary><span class="five-s-stage-number">2</span><span><strong>Set in Order</strong><small>Give needed items a clear, practical location.</small></span></summary>
        <div class="five-s-detail-body"><h4>Purpose</h4><p>Arrange what remains so people can find, use, and return items with minimal searching, handling, and wasted motion.</p><h4>Field actions</h4><ul><li>Locate frequently used items where they are easy to reach and return.</li><li>Use defined storage locations, labels, outlines, racks, bins, or other visual controls where useful.</li><li>Arrange the area around the actual work flow rather than simply making it look neat.</li><li>Keep access routes, work zones, controls, and emergency equipment clear as required by the site.</li></ul><h4>Ask</h4><p>Can a person unfamiliar with this exact area quickly tell where needed items belong and retrieve them without unnecessary motion or searching?</p><div class="five-s-ready"><strong>Ready to move on when:</strong> needed items have logical locations that support the work and are easy to return correctly.</div></div>
      </details>

      <details class="info-panel five-s-stage" data-stage="Shine">
        <summary><span class="five-s-stage-number">3</span><span><strong>Shine</strong><small>Clean while inspecting the condition of the workplace.</small></span></summary>
        <div class="five-s-detail-body"><h4>Purpose</h4><p>Clean the workplace enough that leaks, damage, wear, contamination, loose material, and other abnormal conditions are easier to recognize.</p><h4>Field actions</h4><ul><li>Clean work surfaces, floors, equipment areas, and storage locations to the condition appropriate for the operation.</li><li>Look for the source of recurring dirt, debris, leakage, or contamination instead of repeatedly cleaning around it.</li><li>Use cleaning as an opportunity to identify abnormal conditions that need correction or escalation.</li></ul><h4>Ask</h4><p>Is the area clean enough that a new leak, damaged component, spill, buildup, or other abnormal condition would stand out?</p><div class="five-s-ready"><strong>Ready to move on when:</strong> the expected clean condition is established and abnormalities are visible rather than hidden by poor housekeeping.</div></div>
      </details>

      <details class="info-panel five-s-stage" data-stage="Standardize">
        <summary><span class="five-s-stage-number">4</span><span><strong>Standardize</strong><small>Make the expected condition clear and repeatable.</small></span></summary>
        <div class="five-s-detail-body"><h4>Purpose</h4><p>Turn the improved condition into a clear, consistent way of working so the first three S's are not dependent on memory or individual preference.</p><h4>Field actions</h4><ul><li>Define what “normal” looks like for the area.</li><li>Use simple visual standards, labels, photographs, markings, checklists, routines, or other controls where they add value.</li><li>Clarify who performs recurring organization and cleaning tasks and when they occur.</li><li>Keep standards as simple as possible while still making the expected condition obvious.</li></ul><h4>Ask</h4><p>Would different people maintain this area in substantially the same condition because the standard is clear?</p><div class="five-s-ready"><strong>Ready to move on when:</strong> the expected condition and routine are clear enough to be repeated consistently.</div></div>
      </details>

      <details class="info-panel five-s-stage" data-stage="Sustain">
        <summary><span class="five-s-stage-number">5</span><span><strong>Sustain</strong><small>Maintain the system and correct drift.</small></span></summary>
        <div class="five-s-detail-body"><h4>Purpose</h4><p>Make 5S part of normal work so the area does not slowly return to its previous condition.</p><h4>Field actions</h4><ul><li>Build ownership into routine work rather than relying on occasional cleanup campaigns.</li><li>Use short checks, coaching, visual confirmation, or periodic review to recognize drift.</li><li>Correct the reason the standard is difficult to maintain instead of repeatedly blaming the user.</li><li>Update the standard when the work, equipment, or process changes.</li></ul><h4>Ask</h4><p>Is the improved condition still present weeks later, and does the team know how to respond when it begins to drift?</p><div class="five-s-ready"><strong>System condition:</strong> 5S is sustained when Sort, Set in Order, Shine, and Standardize are maintained as part of everyday work and continuously improved when conditions change.</div></div>
      </details>
    </div>`;

  home.parentNode.insertBefore(section, home.nextSibling);

  const style = document.createElement("style");
  style.id = "fiveSStyles";
  style.textContent = `
    .five-s-home-tile{border-top-color:#f97316}.five-s-header{border-top-color:#f97316}.five-s-overview{border-left:7px solid #f97316}.five-s-overview summary,.five-s-stage summary{cursor:pointer;list-style:none}.five-s-overview summary::-webkit-details-marker,.five-s-stage summary::-webkit-details-marker{display:none}.five-s-overview>summary{font-size:1.35rem;font-weight:800;display:flex;align-items:center;justify-content:space-between;gap:12px}.five-s-overview>summary:after{content:"+";font-size:1.5rem;color:#0b84ff}.five-s-overview[open]>summary:after{content:"−"}.five-s-detail-body{padding-top:16px}.five-s-detail-body p{line-height:1.55}.five-s-use-steps{padding-left:22px;line-height:1.55}.five-s-use-steps li{margin:8px 0}.five-s-note{background:#fff7ed;border:1px solid #fdba74;border-radius:14px;padding:14px;color:#7c2d12}.five-s-section-heading{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:16px}.five-s-section-heading h3,.five-s-guide-intro h3{margin:0 0 6px}.five-s-section-heading p,.five-s-guide-intro p{margin:0;color:var(--muted)}.five-s-scale-key{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#9a3412;background:#fff7ed;border:1px solid #fdba74;border-radius:999px;padding:7px 10px;white-space:nowrap}.five-s-question{padding:18px 0;border-top:1px solid var(--line-soft)}.five-s-question:first-child{border-top:0}.five-s-question h4{font-size:1.08rem;line-height:1.4;margin:0 0 12px}.five-s-question small{display:block;color:var(--muted);margin-top:5px;font-weight:600}.five-s-answer-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.five-s-answer-row button{min-height:50px;border:1px solid #b8c6d4;border-radius:12px;background:#fff;color:var(--text);font-weight:800;font-size:.95rem}.five-s-answer-row button.selected{background:#0b84ff;color:#fff;border-color:#0b84ff;box-shadow:0 0 0 3px rgba(11,132,255,.15)}.five-s-reset{margin-top:18px;min-height:48px;padding:10px 18px;border:1px solid #b8c6d4;border-radius:14px;background:#fff;color:#0b84ff;font-weight:800}.five-s-result{border-top:6px solid #f97316}.five-s-score-row{display:flex;align-items:baseline;gap:5px;margin:6px 0}.five-s-percent{font-size:3.4rem;line-height:1;color:#0b84ff}.five-s-score-row span{font-size:1.4rem;color:var(--muted);font-weight:800}.five-s-completion{color:var(--muted);font-weight:700;margin:4px 0}.five-s-status{font-weight:800;font-size:1.08rem}.five-s-next{background:#fff7ed;border:1px solid #fdba74;border-radius:16px;padding:16px;margin-top:18px}.five-s-next>span{display:block;color:#9a3412;text-transform:uppercase;letter-spacing:.06em;font-size:.78rem;font-weight:800;margin-bottom:5px}.five-s-next>strong{display:block;font-size:1.35rem;margin-bottom:7px}.five-s-next p{margin:0 0 14px;line-height:1.45}.five-s-jump{min-height:44px;border:1px solid #f97316;border-radius:12px;background:#f97316;color:#fff;font-weight:800;padding:8px 14px}.five-s-guide-intro{border-left:7px solid #f97316}.five-s-stage{padding:0;overflow:hidden}.five-s-stage summary{display:flex;align-items:center;gap:13px;padding:20px}.five-s-stage summary:after{content:"+";margin-left:auto;color:#0b84ff;font-size:1.5rem;font-weight:800}.five-s-stage[open] summary:after{content:"−"}.five-s-stage-number{display:flex;align-items:center;justify-content:center;flex:0 0 42px;height:42px;border-radius:12px;background:#0b84ff;color:#fff;font-size:1.25rem;font-weight:900}.five-s-stage summary strong{display:block;font-size:1.2rem}.five-s-stage summary small{display:block;color:var(--muted);font-size:.88rem;line-height:1.3;margin-top:3px}.five-s-stage .five-s-detail-body{padding:0 20px 20px}.five-s-stage h4{margin:17px 0 6px;color:#0f172a}.five-s-stage ul{padding-left:22px;line-height:1.5}.five-s-stage li{margin:7px 0}.five-s-ready{margin-top:16px;border-left:4px solid #0b84ff;background:#f5f9ff;border-radius:10px;padding:13px;line-height:1.45}.five-s-stage.recommended{box-shadow:0 0 0 3px rgba(249,115,22,.22);border-color:#fb923c}@media(max-width:600px){.five-s-section-heading{display:block}.five-s-scale-key{display:inline-block;margin-top:10px}.five-s-answer-row button{font-size:.9rem;padding:7px 3px}.five-s-stage summary{padding:17px 15px}.five-s-stage .five-s-detail-body{padding:0 15px 18px}}
  `;
  document.head.appendChild(style);

  const questions = [
    { id:"q1", stage:"Sort", text:"Are unnecessary, obsolete, damaged, duplicated, or unused items removed from the work area?", hint:"Look for clutter and items without a current purpose." },
    { id:"q2", stage:"Set in Order", text:"Do the items needed for the work have clear, practical storage or use locations?", hint:"A person should be able to tell where needed items belong." },
    { id:"q3", stage:"Set in Order", text:"Can needed tools, materials, and supplies be found, used, and returned without unnecessary searching or motion?", hint:"Consider flow and ease of retrieval, not appearance alone." },
    { id:"q4", stage:"Shine", text:"Is the area clean enough that leaks, damage, spills, buildup, or other abnormal conditions would be easy to recognize?", hint:"Cleaning should help expose abnormalities rather than hide them." },
    { id:"q5", stage:"Shine", text:"Are recurring sources of dirt, debris, leakage, or contamination being addressed rather than repeatedly cleaned around?", hint:"Look for causes that keep recreating the same condition." },
    { id:"q6", stage:"Standardize", text:"Is the expected condition of the work area clear enough that different people would organize and maintain it similarly?", hint:"Think labels, visual standards, locations, routines, or other simple controls." },
    { id:"q7", stage:"Sustain", text:"Are responsibilities and routines clear for keeping the area organized and returning it to the expected condition?", hint:"Good conditions should not depend on one person remembering to fix them." },
    { id:"q8", stage:"Sustain", text:"Does the area generally stay in its expected condition over time, with drift recognized and corrected?", hint:"Sustain is demonstrated by maintained behavior and condition, not a one-time cleanup." }
  ];

  const stageOrder = ["Sort", "Set in Order", "Shine", "Standardize", "Sustain"];
  const stagePurpose = {
    "Sort":"Remove what is not needed before trying to organize what remains.",
    "Set in Order":"Create clear locations and flow for the items the work actually needs.",
    "Shine":"Establish a clean condition that makes abnormal conditions easier to see.",
    "Standardize":"Make the expected condition and routine clear and repeatable.",
    "Sustain":"Build ownership and follow-through so the system continues to work over time."
  };
  const answers = {};
  const questionWrap = section.querySelector("#fiveSQuestions");

  questions.forEach((question, index) => {
    const item = document.createElement("div");
    item.className = "five-s-question";
    item.dataset.question = question.id;
    item.innerHTML = `<h4>${index + 1}. ${question.text}<small>${question.hint}</small></h4><div class="five-s-answer-row" role="group" aria-label="Question ${index + 1}"></div>`;
    const row = item.querySelector(".five-s-answer-row");

    [{label:"Yes",value:2},{label:"Partially",value:1},{label:"No",value:0}].forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        answers[question.id] = option.value;
        row.querySelectorAll("button").forEach(candidate => candidate.classList.toggle("selected", candidate === button));
        update5SResult();
      });
      row.appendChild(button);
    });

    questionWrap.appendChild(item);
  });

  function clearRecommendedStage() {
    section.querySelectorAll(".five-s-stage").forEach(stage => stage.classList.remove("recommended"));
  }

  function findRecommendedStage() {
    for (const stage of stageOrder) {
      const stageQuestions = questions.filter(question => question.stage === stage);
      if (stageQuestions.some(question => answers[question.id] < 2)) return stage;
    }
    return null;
  }

  function update5SResult() {
    const completed = questions.filter(question => Object.prototype.hasOwnProperty.call(answers, question.id));
    const percentEl = section.querySelector(".five-s-percent");
    const completionEl = section.querySelector(".five-s-completion");
    const statusEl = section.querySelector(".five-s-status");
    const next = section.querySelector(".five-s-next");
    clearRecommendedStage();

    completionEl.textContent = `${completed.length} of ${questions.length} conditions rated.`;
    if (completed.length < questions.length) {
      percentEl.textContent = "—";
      statusEl.textContent = completed.length ? "Keep going — complete all eight conditions for a meaningful starting point." : "Complete the assessment to receive a 5S starting point.";
      next.classList.add("hidden");
      return;
    }

    const total = questions.reduce((sum, question) => sum + answers[question.id], 0);
    const percent = Math.round((total / (questions.length * 2)) * 100);
    percentEl.textContent = percent;

    if (percent >= 88) statusEl.textContent = "Strong workplace-organization condition — protect the system and watch for drift.";
    else if (percent >= 69) statusEl.textContent = "Good foundation — targeted 5S work can improve consistency and flow.";
    else if (percent >= 44) statusEl.textContent = "Improvement opportunity — use the 5S sequence to strengthen the work area.";
    else statusEl.textContent = "Needs focused attention — establish the basic 5S conditions in sequence.";

    const recommended = findRecommendedStage();
    const nextStrong = next.querySelector("strong");
    const nextText = next.querySelector("p");
    const jump = next.querySelector(".five-s-jump");
    next.classList.remove("hidden");

    if (recommended) {
      nextStrong.textContent = recommended;
      nextText.textContent = stagePurpose[recommended];
      jump.dataset.stage = recommended;
    } else {
      nextStrong.textContent = "Sustain the system";
      nextText.textContent = "All observed conditions were rated Yes. Continue maintaining the standard and periodically reassess for drift or changing work conditions.";
      jump.dataset.stage = "Sustain";
    }
    jump.hidden = false;
  }

  tile.addEventListener("click", () => openDynamicSection(section));

  section.querySelector(".five-s-home").addEventListener("click", () => {
    hideAllSections();
    home.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  section.querySelector(".five-s-reset").addEventListener("click", () => {
    Object.keys(answers).forEach(key => delete answers[key]);
    section.querySelectorAll(".five-s-answer-row button").forEach(button => button.classList.remove("selected"));
    update5SResult();
  });

  section.querySelector(".five-s-jump").addEventListener("click", event => {
    const stageName = event.currentTarget.dataset.stage;
    const target = section.querySelector(`.five-s-stage[data-stage="${stageName}"]`);
    if (!target) return;
    clearRecommendedStage();
    target.open = true;
    target.classList.add("recommended");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  update5SResult();
}

function hideAllSections() {
  document.querySelectorAll(".app-section").forEach(section => section.classList.add("hidden"));
}

function openDynamicSection(section) {
  if (!section) return;
  hideAllSections();
  section.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initializeHomeArchitecture() {
  const home = document.getElementById("homeSection");
  const grid = home ? home.querySelector(".dashboard-grid") : null;
  if (!home || !grid) return;

  const toolboxTile = grid.querySelector('[data-open-section="toolboxTalksSection"]');
  if (toolboxTile) toolboxTile.remove();

  const groupedTiles = [
    '[data-open-section="riskMatrixSection"]',
    '[data-open-section="roiCalculatorSection"]',
    '[data-open-section="cfrSection"]',
    '[data-open-section="oshaSection"]',
    '[data-open-section="docsSection"]',
    '[data-open-section="safetyDocsSection"]',
    '.five-s-home-tile'
  ];
  groupedTiles.forEach(selector => {
    const tile = grid.querySelector(selector);
    if (tile) tile.remove();
  });

  document.querySelectorAll(".skyfire-hub-section").forEach(section => section.remove());
  grid.querySelectorAll(".skyfire-hub-home-tile").forEach(tile => tile.remove());

  const hubStyle = document.createElement("style");
  hubStyle.id = "skyfireArchitectureStyles";
  hubStyle.textContent = `
    .main-header{position:relative;top:auto;backdrop-filter:none}
    .skyfire-hub-home-tile{border-top-color:#7898bd}
    .skyfire-hub-home-tile.regulatory-hub{border-top-color:#4f83ff}
    .skyfire-hub-home-tile.field-hub{border-top-color:#f97316}
    .skyfire-hub-list{display:grid;grid-template-columns:1fr;gap:16px;margin-top:20px}
    .skyfire-hub-item{width:100%;text-align:left;background:linear-gradient(180deg,#fff,#f3f8fd);border:1px solid var(--line);border-radius:20px;padding:22px;box-shadow:var(--shadow)}
    .skyfire-hub-item strong{display:block;color:var(--accent);font-size:1.35rem;line-height:1.1}
    .skyfire-hub-item span{display:block;color:var(--muted);margin-top:10px;font-size:1rem;line-height:1.45}
    .skyfire-hub-note{margin-top:18px;color:var(--muted);font-size:.95rem}
    @media(min-width:760px){.skyfire-hub-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
  `;
  const oldArchitectureStyle = document.getElementById("skyfireArchitectureStyles");
  if (oldArchitectureStyle) oldArchitectureStyle.remove();
  document.head.appendChild(hubStyle);

  const hubs = [
    {
      id: "safetyToolsHubSection",
      className: "",
      title: "Safety Tools",
      subtitle: "Interactive tools for field assessment, planning, and decision support.",
      items: [
        ["Risk Assessment Matrix", "Evaluate severity, occurrence, detection, and post-control risk.", "riskMatrixSection"],
        ["Safety ROI Calculator", "Estimate the operational and financial impact of safety decisions.", "roiCalculatorSection"],
        ["5S Workplace Organization", "Assess workplace organization, then apply Sort, Set in Order, Shine, Standardize, and Sustain.", "fiveSSection"]
      ]
    },
    {
      id: "regulatoryResourcesHubSection",
      className: "regulatory-hub",
      title: "Regulatory Resources",
      subtitle: "MSHA and OSHA references, forms, and compliance resources.",
      items: [
        ["MSHA / 30 CFR", "Browse the offline MSHA field reference.", "cfrSection"],
        ["OSHA / 29 CFR", "Browse the offline OSHA field reference.", "oshaSection"],
        ["MSHA Forms Library", "Common MSHA forms organized by use and file name.", "docsSection"]
      ]
    },
    {
      id: "fieldResourcesHubSection",
      className: "field-hub",
      title: "Field Resources",
      subtitle: "Practical printable and reference materials for field use.",
      items: [
        ["Safety Docs", "Printable SkyFire safety resources and field documents.", "safetyDocsSection"]
      ]
    }
  ];

  const feedbackTile = grid.querySelector(".feedback-home-tile");

  hubs.forEach(hub => {
    const homeTile = document.createElement("button");
    homeTile.type = "button";
    homeTile.className = `dashboard-tile skyfire-hub-home-tile ${hub.className}`.trim();
    homeTile.innerHTML = `<span class="tile-title">${hub.title}</span><span class="tile-subtitle">${hub.subtitle}</span>`;
    grid.insertBefore(homeTile, feedbackTile || null);

    const hubSection = document.createElement("section");
    hubSection.id = hub.id;
    hubSection.className = "app-section hidden skyfire-hub-section";
    hubSection.innerHTML = `
      <div class="module-header">
        <button class="module-home-btn skyfire-hub-home" type="button">Back Home</button>
        <div class="module-header-text"><h2>${hub.title}</h2><p>${hub.subtitle}</p></div>
      </div>
      <div class="info-panel">
        <div class="skyfire-hub-list"></div>
        ${hub.title === "Field Resources" ? '<p class="skyfire-hub-note">Toolbox Talks will appear here when usable content is ready; SkyFire does not show empty feature placeholders.</p>' : ""}
      </div>`;

    const list = hubSection.querySelector(".skyfire-hub-list");
    hub.items.forEach(([title, subtitle, targetId]) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "skyfire-hub-item";
      item.innerHTML = `<strong>${title}</strong><span>${subtitle}</span>`;
      item.addEventListener("click", () => {
        hubSection.classList.add("hidden");
        if (typeof showSection === "function") showSection(targetId);
        else {
          hideAllSections();
          const target = document.getElementById(targetId);
          if (target) target.classList.remove("hidden");
        }
      });
      list.appendChild(item);
    });

    homeTile.addEventListener("click", () => openDynamicSection(hubSection));
    hubSection.querySelector(".skyfire-hub-home").addEventListener("click", () => {
      hideAllSections();
      home.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    home.parentNode.insertBefore(hubSection, home.nextSibling);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFeedbackModule();
  initializeAboutSection();
  initialize5STool();
  initializeHomeArchitecture();
});