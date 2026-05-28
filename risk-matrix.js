(function () {
  function getSelectNumber(id) {
    const element = document.getElementById(id);
    if (!element) return 1;

    const value = Number(element.value);
    return Number.isFinite(value) ? value : 1;
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
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

  function updateRiskRatingCalculator() {
    const severity = getSelectNumber("riskSeverity");
    const occurrence = getSelectNumber("riskOccurrence");
    const detection = getSelectNumber("riskDetection");

    const rpn = calculateRpn(severity, occurrence, detection);
    const risk = getRiskLevel(rpn);

    setText("riskRpnResult", formatRpn(rpn));
    setText("riskLevelResult", risk.level);
    setText("riskInterpretationResult", risk.interpretation);
  }

  function updatePostControlRiskCalculator() {
    const severity = getSelectNumber("postRiskSeverity");
    const occurrence = getSelectNumber("postRiskOccurrence");
    const detection = getSelectNumber("postRiskDetection");

    const rpn = calculateRpn(severity, occurrence, detection);
    const risk = getRiskLevel(rpn);

    setText("postRiskRpnResult", formatRpn(rpn));
    setText("postRiskLevelResult", risk.level);
    setText("postRiskActionStatus", risk.action);
  }

  function bindSelects(ids, callback) {
    ids.forEach(id => {
      const element = document.getElementById(id);
      if (!element) return;

      element.addEventListener("change", callback);
      element.addEventListener("input", callback);
    });
  }

  function initializeRiskMatrixCalculators() {
    bindSelects(
      ["riskSeverity", "riskOccurrence", "riskDetection"],
      updateRiskRatingCalculator
    );

    bindSelects(
      ["postRiskSeverity", "postRiskOccurrence", "postRiskDetection"],
      updatePostControlRiskCalculator
    );

    updateRiskRatingCalculator();
    updatePostControlRiskCalculator();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeRiskMatrixCalculators);
  } else {
    initializeRiskMatrixCalculators();
  }
})();
