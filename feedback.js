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

function initializeAboutSection() {
  const aboutSection = document.getElementById("aboutSection");
  if (!aboutSection) return;

  const existingPanel = aboutSection.querySelector(".info-panel");
  if (!existingPanel) return;

  existingPanel.outerHTML = `
    <div class="about-card about-purpose-card">
      <h3>What Is SkyFire?</h3>
      <p>
        SkyFire is an independently developed field-safety resource designed to make practical
        safety tools, regulatory references, and field resources easier to access and use.
        The Safety Library brings mine-safety references, risk-assessment tools, printable resources,
        and other field-focused content together in one mobile-friendly, offline-ready location.
      </p>
    </div>

    <div class="about-card">
      <h3>Why SkyFire Exists</h3>
      <p>
        Safety professionals and field teams often work across regulations, company programs,
        procedures, forms, risk tools, and practical reference material. SkyFire is intended to
        reduce friction by making useful resources easier to reach when they are needed.
      </p>
      <p>
        SkyFire does not replace qualified safety professionals, employer safety programs,
        site-specific procedures, manufacturer guidance, or regulatory authorities. It is a support
        resource intended to strengthen hazard awareness, learning, planning, and informed field decisions.
      </p>
    </div>

    <div class="about-card about-beta-card">
      <div class="about-card-title-row">
        <h3>Built With Field Feedback</h3>
        <span class="about-beta-badge">${SKYFIRE_FEEDBACK_VERSION}</span>
      </div>
      <p>
        SkyFire is actively being developed and improved. Feedback from safety professionals,
        miners, supervisors, trainers, and other users helps identify what is useful, what needs
        improvement, and what should be built next.
      </p>
      <p>
        Beta content and features may continue to change as they are tested, reviewed, and refined.
      </p>
    </div>

    <div class="about-card about-safety-card">
      <h3>Important Safety &amp; Regulatory Notice</h3>
      <p>
        SkyFire tools and references are general support resources. Before relying on or implementing
        any information, verify the current site-specific requirements, applicable MSHA or OSHA
        regulations, employer policies and procedures, manufacturer instructions, competent-person
        requirements, and any other regulatory or operational obligations that apply to the work.
      </p>
      <p>
        Regulatory text, forms, guidance, and safety practices can change. When a requirement matters
        to a safety or compliance decision, confirm it against the current authoritative source.
      </p>
    </div>

    <div class="about-card about-project-card">
      <h3>Project &amp; Creator</h3>
      <dl class="about-project-details">
        <div>
          <dt>Developed by</dt>
          <dd>Nicholas R. Murphy</dd>
        </div>
        <div>
          <dt>Project</dt>
          <dd>SkyFire Safety - Mine Safety Tools</dd>
        </div>
        <div>
          <dt>Current release</dt>
          <dd>${SKYFIRE_FEEDBACK_VERSION}</dd>
        </div>
        <div>
          <dt>License</dt>
          <dd>CC BY-NC 4.0 — Attribution required; non-commercial use only.</dd>
        </div>
      </dl>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  initializeFeedbackModule();
  initializeAboutSection();
});