(function () {
  function readNumber(id, fallback) {
    var element = document.getElementById(id);
    if (!element) return fallback;

    var rawValue = element.value;
    var value = Number(rawValue);

    if (!Number.isFinite(value)) return fallback;
    return value;
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (!element) return;
    element.textContent = value;
  }

  function calculateRpn(severity, occurrence, detection) {
    return (severity * severity * occurrence * detection) / 100;
  }

  function getRiskLevel(rpn) {
    if (rpn <= 1.24) {
      return {
        level: "Low Risk",
        interpretation: "Tolerable with monitoring",
        action: "Acceptable / Monitor"
      };
    }

    if (rpn <= 5.49) {
      return {
        level: "Moderate Risk",
        interpretation: "Action required in a timely manner",
        action: "Improve Further"
      };
    }

    return {
      level: "High Risk",
      interpretation: "Immediate action required",
      action: "Unacceptable / Immediate Action Required"
    };
  }

  function formatRpn(value) {
    if (!Number.isFinite(value)) return "0.00";
    return value.toFixed(2);
  }

  function updateMainRiskCalculator() {
    var severity = readNumber("riskSeverity", 1);
    var occurrence = readNumber("riskOccurrence", 1);
    var detection = readNumber("riskDetection", 1);

    var rpn = calculateRpn(severity, occurrence, detection);
    var risk = getRiskLevel(rpn);

    setText("riskRpnResult", formatRpn(rpn));
    setText("riskLevelResult", risk.level);
    setText("riskInterpretationResult", risk.interpretation);
  }

  function updatePostControlRiskCalculator() {
    var severity = readNumber("postRiskSeverity", 1);
    var occurrence = readNumber("postRiskOccurrence", 1);
    var detection = readNumber("postRiskDetection", 1);

    var rpn = calculateRpn(severity, occurrence, detection);
    var risk = getRiskLevel(rpn);

    setText("postRiskRpnResult", formatRpn(rpn));
    setText("postRiskLevelResult", risk.level);
    setText("postRiskActionStatus", risk.action);
  }

  function updateAllRiskMatrixCalculators() {
    updateMainRiskCalculator();
    updatePostControlRiskCalculator();
  }

  function isRiskSelect(element) {
    if (!element || !element.id) return false;

    return [
      "riskSeverity",
      "riskOccurrence",
      "riskDetection",
      "postRiskSeverity",
      "postRiskOccurrence",
      "postRiskDetection"
    ].indexOf(element.id) !== -1;
  }

  function bindRiskMatrixCalculatorEvents() {
    document.addEventListener("change", function (event) {
      if (isRiskSelect(event.target)) {
        updateAllRiskMatrixCalculators();
      }
    });

    document.addEventListener("input", function (event) {
      if (isRiskSelect(event.target)) {
        updateAllRiskMatrixCalculators();
      }
    });

    updateAllRiskMatrixCalculators();

    // This small delayed refresh helps mobile browsers after hidden sections become visible.
    window.setTimeout(updateAllRiskMatrixCalculators, 250);
    window.setTimeout(updateAllRiskMatrixCalculators, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindRiskMatrixCalculatorEvents);
  } else {
    bindRiskMatrixCalculatorEvents();
  }

  window.SkyFireRiskMatrix = {
    update: updateAllRiskMatrixCalculators,
    calculateRpn: calculateRpn
  };
})();
