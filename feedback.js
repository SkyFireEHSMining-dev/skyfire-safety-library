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
    if (status) {
      status.textContent = "";
      status.classList.remove("feedback-status-error");
    }
  }

  typeSelect.addEventListener("change", () => { updateFeedbackPrompt(); clearStatus(); });

  form.addEventListener("submit", event => {
    event.preventDefault();
    clearStatus();
    const feedbackText = messageInput.value.trim();
    if (!feedbackText) {
      if (status) { status.textContent = "Please enter your feedback before preparing the email."; status.classList.add("feedback-status-error"); }
      messageInput.focus();
      return;
    }
    const type = typeSelect.value;
    const area = areaSelect.value;
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    if (emailInput && email && !emailInput.checkValidity()) {
      if (status) { status.textContent = "Please enter a valid email address or leave the optional email field blank."; status.classList.add("feedback-status-error"); }
      emailInput.focus();
      return;
    }
    const subject = `SkyFire Feedback — ${type} — ${area}`;
    const body = ["SkyFire Feedback", "", `Type: ${type}`, `Area: ${area}`, `Name: ${name || "Not provided"}`, `Email: ${email || "Not provided"}`, "", "Feedback:", feedbackText, "", `SkyFire App Version: ${SKYFIRE_FEEDBACK_VERSION}`, "", "Sent from the SkyFire Feedback & Suggestions module."].join("\n");
    const mailto = `mailto:${SKYFIRE_FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Opening your email app. Review the prepared message, then tap Send.";
    window.location.href = mailto;
  });

  if (clearButton) clearButton.addEventListener("click", () => { form.reset(); updateFeedbackPrompt(); clearStatus(); messageInput.focus(); });
  updateFeedbackPrompt();
}

function initializeAboutSection() {
  const aboutSection = document.getElementById("aboutSection");
  if (!aboutSection) return;
  const existingPanel = aboutSection.querySelector(".info-panel");
  if (!existingPanel) return;
  existingPanel.outerHTML = `
    <div class="about-card about-purpose-card"><h3>What Is SkyFire?</h3><p>SkyFire is an independently developed field-safety resource designed to make practical safety tools, regulatory references, and field resources easier to access and use. The Safety Library brings mine-safety references, risk-assessment tools, printable resources, and other field-focused content together in one mobile-friendly, offline-ready location.</p></div>
    <div class="about-card"><h3>Why SkyFire Exists</h3><p>Safety professionals and field teams often work across regulations, company programs, procedures, forms, risk tools, and practical reference material. SkyFire is intended to reduce friction by making useful resources easier to reach when they are needed.</p><p>SkyFire does not replace qualified safety professionals, employer safety programs, site-specific procedures, manufacturer guidance, or regulatory authorities. It is a support resource intended to strengthen hazard awareness, learning, planning, and informed field decisions.</p></div>
    <div class="about-card about-beta-card"><div class="about-card-title-row"><h3>Built With Field Feedback</h3><span class="about-beta-badge">${SKYFIRE_FEEDBACK_VERSION}</span></div><p>SkyFire is actively being developed and improved. Feedback from safety professionals, miners, supervisors, trainers, and other users helps identify what is useful, what needs improvement, and what should be built next.</p><p>Beta content and features may continue to change as they are tested, reviewed, and refined.</p></div>
    <div class="about-card about-safety-card"><h3>Important Safety &amp; Regulatory Notice</h3><p>SkyFire tools and references are general support resources. Before relying on or implementing any information, verify the current site-specific requirements, applicable MSHA or OSHA regulations, employer policies and procedures, manufacturer instructions, competent-person requirements, and any other regulatory or operational obligations that apply to the work.</p><p>Regulatory text, forms, guidance, and safety practices can change. When a requirement matters to a safety or compliance decision, confirm it against the current authoritative source.</p></div>
    <div class="about-card about-project-card"><h3>Project &amp; Creator</h3><dl class="about-project-details"><div><dt>Developed by</dt><dd>Nicholas R. Murphy</dd></div><div><dt>Project</dt><dd>SkyFire Safety - Mine Safety Tools</dd></div><div><dt>Current release</dt><dd>${SKYFIRE_FEEDBACK_VERSION}</dd></div><div><dt>License</dt><dd>CC BY-NC 4.0 — Attribution required; non-commercial use only.</dd></div></dl></div>`;
}

function initialize5STool() {
  const grid = document.querySelector("#homeSection .dashboard-grid");
  const home = document.getElementById("homeSection");
  if (!grid || !home || document.getElementById("fiveSSection")) return;

  const tile = document.createElement("button");
  tile.className = "dashboard-tile five-s-home-tile";
  tile.type = "button";
  tile.innerHTML = '<span class="tile-title">5S Field Check</span><span class="tile-subtitle">Quickly assess workplace organization and identify the next improvement priority.</span>';
  const feedbackTile = grid.querySelector(".feedback-home-tile");
  grid.insertBefore(tile, feedbackTile || null);

  const section = document.createElement("section");
  section.id = "fiveSSection";
  section.className = "app-section hidden";
  section.innerHTML = `
    <div class="module-header five-s-header"><button class="module-home-btn five-s-home" type="button">Back Home</button><div class="module-header-text"><h2>5S Field Check</h2><p>A lean, quick check of workplace organization. Rate what you see and get an immediate result.</p></div></div>
    <div class="info-panel five-s-intro"><h3>Quick Field Assessment</h3><p>Score each area from <strong>1 (needs attention)</strong> to <strong>5 (strong condition)</strong>. Use the result to focus improvement — not as a substitute for a required workplace examination, inspection, or site procedure.</p></div>
    <div class="info-panel five-s-form">
      <div class="five-s-item" data-s="Sort"><div><h3>1. Sort</h3><p>Unneeded items are removed; necessary items remain.</p></div><div class="five-s-buttons" role="group" aria-label="Sort score"></div></div>
      <div class="five-s-item" data-s="Set in Order"><div><h3>2. Set in Order</h3><p>Tools, materials, and equipment have clear, practical locations.</p></div><div class="five-s-buttons" role="group" aria-label="Set in Order score"></div></div>
      <div class="five-s-item" data-s="Shine"><div><h3>3. Shine</h3><p>The area is clean enough to expose leaks, damage, and abnormal conditions.</p></div><div class="five-s-buttons" role="group" aria-label="Shine score"></div></div>
      <div class="five-s-item" data-s="Standardize"><div><h3>4. Standardize</h3><p>Expected conditions are clear, consistent, and easy to recognize.</p></div><div class="five-s-buttons" role="group" aria-label="Standardize score"></div></div>
      <div class="five-s-item" data-s="Sustain"><div><h3>5. Sustain</h3><p>Good conditions are maintained through routine ownership and follow-through.</p></div><div class="five-s-buttons" role="group" aria-label="Sustain score"></div></div>
      <button class="five-s-reset" type="button">Clear Check</button>
    </div>
    <div class="info-panel five-s-result" aria-live="polite"><h3>Your 5S Snapshot</h3><div class="five-s-score"><strong>—</strong><span>/ 25</span></div><p class="five-s-status">Rate all five areas to see your result.</p><div class="five-s-priority hidden"><span>First improvement priority</span><strong></strong></div><p class="five-s-guidance">Keep the conversation practical: address the weakest condition first, then reassess.</p></div>`;
  home.parentNode.insertBefore(section, home.nextSibling);

  const style = document.createElement("style");
  style.textContent = `
    .five-s-home-tile{border-top-color:#f97316}.five-s-header{border-top-color:#f97316}.five-s-intro{border-left:7px solid #f97316}.five-s-item{padding:20px 0;border-top:1px solid var(--line-soft)}.five-s-item:first-child{border-top:0;padding-top:0}.five-s-item h3{margin:0 0 6px}.five-s-item p{color:var(--muted);margin:0 0 14px;font-size:1.05rem}.five-s-buttons{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.five-s-buttons button{min-height:52px;border:1px solid #b8c6d4;border-radius:12px;background:#fff;color:var(--text);font-weight:800;font-size:1.1rem}.five-s-buttons button.selected{background:#0b84ff;color:#fff;border-color:#0b84ff;box-shadow:0 0 0 3px rgba(11,132,255,.15)}.five-s-reset{margin-top:20px;min-height:48px;padding:10px 18px;border:1px solid #b8c6d4;border-radius:14px;background:#fff;font-weight:700}.five-s-result{border-top:6px solid #f97316}.five-s-score{display:flex;align-items:baseline;gap:8px;margin:4px 0 8px}.five-s-score strong{font-size:3.3rem;line-height:1;color:#0b84ff}.five-s-score span{font-size:1.25rem;color:var(--muted);font-weight:700}.five-s-status{font-weight:750}.five-s-priority{background:#fff7ed;border:1px solid #fdba74;border-radius:16px;padding:16px;margin:18px 0}.five-s-priority span{display:block;color:#9a3412;text-transform:uppercase;letter-spacing:.06em;font-size:.8rem;font-weight:800;margin-bottom:5px}.five-s-priority strong{font-size:1.25rem}.five-s-guidance{color:var(--muted)}@media(max-width:430px){.five-s-buttons button{min-height:48px;padding:8px 4px}}
  `;
  document.head.appendChild(style);

  const scores = {};
  section.querySelectorAll(".five-s-item").forEach(item => {
    const name = item.dataset.s;
    const buttons = item.querySelector(".five-s-buttons");
    for (let i = 1; i <= 5; i++) {
      const b = document.createElement("button"); b.type = "button"; b.textContent = i; b.setAttribute("aria-label", `${name}: ${i} out of 5`);
      b.addEventListener("click", () => { scores[name] = i; buttons.querySelectorAll("button").forEach(x => x.classList.toggle("selected", x === b)); update5SResult(); });
      buttons.appendChild(b);
    }
  });

  function update5SResult() {
    const names = ["Sort", "Set in Order", "Shine", "Standardize", "Sustain"];
    const completed = names.filter(n => scores[n]);
    const scoreEl = section.querySelector(".five-s-score strong");
    const statusEl = section.querySelector(".five-s-status");
    const priority = section.querySelector(".five-s-priority");
    if (completed.length < 5) { scoreEl.textContent = completed.length ? completed.reduce((a,n)=>a+scores[n],0) : "—"; statusEl.textContent = `${completed.length} of 5 areas rated.`; priority.classList.add("hidden"); return; }
    const total = names.reduce((a,n)=>a+scores[n],0); scoreEl.textContent = total;
    statusEl.textContent = total >= 22 ? "Strong 5S condition — protect what is working." : total >= 18 ? "Good foundation — targeted improvement can strengthen consistency." : total >= 13 ? "Improvement opportunity — focus on the weakest conditions first." : "Needs attention — several basic workplace-organization conditions can be strengthened.";
    const min = Math.min(...names.map(n=>scores[n])); const weak = names.filter(n=>scores[n]===min);
    priority.querySelector("strong").textContent = `${weak.join(" / ")} (${min}/5)`; priority.classList.remove("hidden");
  }

  tile.addEventListener("click", () => { document.querySelectorAll(".app-section").forEach(s=>s.classList.add("hidden")); section.classList.remove("hidden"); window.scrollTo({top:0,behavior:"smooth"}); });
  section.querySelector(".five-s-home").addEventListener("click", () => { document.querySelectorAll(".app-section").forEach(s=>s.classList.add("hidden")); home.classList.remove("hidden"); window.scrollTo({top:0,behavior:"smooth"}); });
  section.querySelector(".five-s-reset").addEventListener("click", () => { Object.keys(scores).forEach(k=>delete scores[k]); section.querySelectorAll(".five-s-buttons button").forEach(b=>b.classList.remove("selected")); update5SResult(); });
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFeedbackModule();
  initializeAboutSection();
  initialize5STool();
});