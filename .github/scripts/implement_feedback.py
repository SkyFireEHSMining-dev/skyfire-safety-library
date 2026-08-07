from pathlib import Path

index_path = Path("index.html")
index = index_path.read_text(encoding="utf-8")

index = index.replace(
    "SkyFire Safety Library v0.10 Beta — MSHA forms library expanded and cache refreshed.",
    "SkyFire Safety Library v0.11 Beta — Feedback & Suggestions added."
)
index = index.replace("styles.css?v=msha-forms-cache-v4", "styles.css?v=feedback-v1")
index = index.replace("app.js?v=msha-forms-cache-v4", "app.js?v=feedback-v1")
index = index.replace("risk-matrix.js?v=msha-forms-cache-v4", "risk-matrix.js?v=feedback-v1")

if "feedback.css?v=feedback-v1" not in index:
    index = index.replace(
        '<link rel="stylesheet" href="styles.css?v=feedback-v1">',
        '<link rel="stylesheet" href="styles.css?v=feedback-v1">\n  <link rel="stylesheet" href="feedback.css?v=feedback-v1">'
    )

if "feedback.js?v=feedback-v1" not in index:
    index = index.replace(
        '<script src="risk-matrix.js?v=feedback-v1" defer></script>',
        '<script src="risk-matrix.js?v=feedback-v1" defer></script>\n  <script src="feedback.js?v=feedback-v1" defer></script>'
    )

feedback_tile = '''
        <button class="dashboard-tile feedback-home-tile" data-open-section="feedbackSection">
          <span class="tile-title">Feedback &amp; Suggestions</span>
          <span class="tile-subtitle">Help improve SkyFire by sharing an idea, reporting a problem, or providing feedback.</span>
        </button>

'''
about_tile = '        <button class="dashboard-tile" data-open-section="aboutSection">\n'
if 'data-open-section="feedbackSection"' not in index:
    index = index.replace(about_tile, feedback_tile + about_tile, 1)

feedback_section = '''
    <section id="feedbackSection" class="app-section hidden">
      <div class="module-header feedback-module-header">
        <button class="module-home-btn" data-open-section="homeSection">Back Home</button>
        <div class="module-header-text">
          <h2>Feedback &amp; Suggestions</h2>
          <p>Help shape SkyFire by sharing field feedback, ideas, and problems you encounter.</p>
        </div>
      </div>

      <div class="info-panel feedback-intro-panel">
        <h3>Your Input Helps Guide Development</h3>
        <p>
          SkyFire is being developed with input from the people who use it. Ideas, field observations,
          usability feedback, and problem reports are welcome.
        </p>
        <p class="feedback-privacy-note">
          Please do not include confidential, personal, medical, security-sensitive, or proprietary company information.
        </p>
      </div>

      <form id="feedbackForm" class="info-panel feedback-form" novalidate>
        <h3>Share Feedback</h3>

        <label for="feedbackType">Feedback Type</label>
        <select id="feedbackType" name="feedbackType">
          <option value="Suggestion">Suggestion</option>
          <option value="Feature Idea">Feature Idea</option>
          <option value="Problem or Bug">Problem or Bug</option>
          <option value="General Feedback">General Feedback</option>
        </select>
        <p id="feedbackTypeGuidance" class="feedback-field-help">What would make SkyFire more useful in the field?</p>

        <label for="feedbackArea">Area of SkyFire</label>
        <select id="feedbackArea" name="feedbackArea">
          <option value="Whole App">Whole App</option>
          <option value="Risk Assessment Matrix">Risk Assessment Matrix</option>
          <option value="Safety ROI Calculator">Safety ROI Calculator</option>
          <option value="MSHA / 30 CFR">MSHA / 30 CFR</option>
          <option value="OSHA / 29 CFR">OSHA / 29 CFR</option>
          <option value="MSHA Forms Library">MSHA Forms Library</option>
          <option value="Safety Docs">Safety Docs</option>
          <option value="Toolbox Talks">Toolbox Talks</option>
          <option value="Other">Other</option>
        </select>

        <label for="feedbackMessage">Your Feedback <span class="feedback-required">Required</span></label>
        <textarea id="feedbackMessage" name="feedbackMessage" rows="7" required placeholder="Tell us what would make SkyFire more useful in the field."></textarea>

        <div class="feedback-optional-grid">
          <label for="feedbackName">
            Name <span class="feedback-optional">Optional</span>
            <input type="text" id="feedbackName" name="feedbackName" autocomplete="name" placeholder="Your name">
          </label>

          <label for="feedbackEmail">
            Email <span class="feedback-optional">Optional</span>
            <input type="email" id="feedbackEmail" name="feedbackEmail" autocomplete="email" placeholder="you@example.com">
          </label>
        </div>

        <div class="feedback-actions">
          <button type="submit" class="feedback-primary-btn">Prepare Feedback Email</button>
          <button type="button" id="feedbackClearBtn" class="feedback-secondary-btn">Clear Form</button>
        </div>

        <p class="feedback-submit-note">
          SkyFire will open your email app with a structured message prepared for you. Review it, then tap Send.
          Nothing is transmitted until you choose to send the email.
        </p>
        <p id="feedbackStatus" class="feedback-status" role="status" aria-live="polite"></p>
      </form>
    </section>

'''
about_section = '    <section id="aboutSection" class="app-section hidden">\n'
if 'id="feedbackSection"' not in index:
    index = index.replace(about_section, feedback_section + about_section, 1)

nested_paragraph = '''        <p>
          <p>
  SkyFire tools and references are intended to support hazard awareness, training,
  and operational planning. Always verify site-specific requirements, applicable
  MSHA/OSHA regulations, manufacturer guidance, competent-person review, employer
  requirements, and applicable regulatory obligations before implementation.
</p>
        </p>'''
corrected_paragraph = '''        <p>
          SkyFire tools and references are intended to support hazard awareness, training,
          and operational planning. Always verify site-specific requirements, applicable
          MSHA/OSHA regulations, manufacturer guidance, competent-person review, employer
          requirements, and applicable regulatory obligations before implementation.
        </p>'''
index = index.replace(nested_paragraph, corrected_paragraph)
index_path.write_text(index, encoding="utf-8")

Path("feedback.js").write_text(r'''const SKYFIRE_FEEDBACK_EMAIL = "skyfire.ehs.mining@gmail.com";
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

    const mailto = `mailto:${SKYFIRE_FEEDBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    if (status) status.textContent = "Opening your email app. Review the prepared message, then tap Send.";
    window.location.href = mailto;
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

document.addEventListener("DOMContentLoaded", initializeFeedbackModule);
''', encoding="utf-8")

Path("feedback.css").write_text(r'''.feedback-home-tile { border-top-color: #f97316; }
.feedback-module-header { border-top-color: #f97316; }
.feedback-intro-panel { border-left: 6px solid #f97316; }
.feedback-privacy-note { padding: 14px 16px; border: 1px solid #fed7aa; border-radius: 14px; background: #fff7ed; color: #7c2d12; }
.feedback-form > label, .feedback-optional-grid label { display: block; margin-top: 20px; font-weight: 750; font-size: clamp(1.05rem, 4vw, 1.25rem); }
.feedback-form select, .feedback-form textarea, .feedback-form input { display: block; width: 100%; margin-top: 8px; border: 1px solid #c7d2df; border-radius: 12px; background: #fff; color: var(--text); padding: 12px 14px; font-size: 1.05rem; }
.feedback-form textarea { min-height: 160px; resize: vertical; }
.feedback-field-help, .feedback-submit-note { margin-top: 8px !important; color: var(--muted); font-size: .98rem !important; }
.feedback-required { margin-left: 6px; color: #b91c1c; font-size: .82rem; text-transform: uppercase; letter-spacing: .05em; }
.feedback-optional { color: #64748b; font-size: .86rem; font-weight: 600; }
.feedback-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
.feedback-primary-btn, .feedback-secondary-btn { min-height: 48px; padding: 12px 18px; border-radius: 14px; font-weight: 750; }
.feedback-primary-btn { border: 1px solid #c2410c; background: #f97316; color: #fff; }
.feedback-secondary-btn { border: 1px solid #b8c6d4; background: #fff; color: var(--text); }
.feedback-primary-btn:focus-visible, .feedback-secondary-btn:focus-visible, .feedback-form input:focus-visible, .feedback-form select:focus-visible, .feedback-form textarea:focus-visible { outline: 3px solid rgba(11,132,255,.25); outline-offset: 2px; }
.feedback-status { min-height: 1.5em; margin-top: 16px !important; font-weight: 700; color: #166534; }
.feedback-status-error { color: #b91c1c; }
@media (min-width: 760px) { .feedback-optional-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px; } }
''', encoding="utf-8")

sw_path = Path("service-worker.js")
sw = sw_path.read_text(encoding="utf-8")
sw = sw.replace('const CACHE_NAME = "skyfire-msha-forms-cache-v4";', 'const CACHE_NAME = "skyfire-feedback-cache-v1";')
sw = sw.replace('const CACHE_VERSION = "msha-forms-cache-v4";', 'const CACHE_VERSION = "feedback-v1";')
if '"./feedback.css"' not in sw:
    sw = sw.replace('  `./styles.css?v=${CACHE_VERSION}`,', '  `./styles.css?v=${CACHE_VERSION}`,\n  "./feedback.css",')
if '"./feedback.js"' not in sw:
    sw = sw.replace('  `./risk-matrix.js?v=${CACHE_VERSION}`,', '  `./risk-matrix.js?v=${CACHE_VERSION}`,\n  "./feedback.js",')
sw_path.write_text(sw, encoding="utf-8")
