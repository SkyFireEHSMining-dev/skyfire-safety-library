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

document.addEventListener("DOMContentLoaded", initializeFeedbackModule);
