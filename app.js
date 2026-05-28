function getNumber(id) {
    return parseFloat(document.getElementById(id).value) || 0;
}

function formatCurrency(value) {
    return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    });
}

function calculateROI() {

    // =========================
    // SECTION 1 — HAZARD PROFILE
    // =========================

    const incidentEvents = getNumber("incidentEvents");
    const incidentCost = getNumber("incidentCost");

    const nearMissEvents = getNumber("nearMissEvents");
    const nearMissCost = getNumber("nearMissCost");

    const propertyEvents = getNumber("propertyEvents");
    const propertyCost = getNumber("propertyCost");

    const downtimeEvents = getNumber("downtimeEvents");
    const downtimeHours = getNumber("downtimeHours");
    const downtimeHourCost = getNumber("downtimeHourCost");

    const adminHours = getNumber("adminHours");
    const adminRate = getNumber("adminRate");

    // Baseline calculations
    const incidentLosses = incidentEvents * incidentCost;

    const nearMissLosses =
        nearMissEvents * nearMissCost;

    const propertyLosses =
        propertyEvents * propertyCost;

    const downtimeLosses =
        downtimeEvents *
        downtimeHours *
        downtimeHourCost;

    const adminLosses =
        adminHours * adminRate;

    const baselineAnnualLosses =
        incidentLosses +
        nearMissLosses +
        propertyLosses +
        downtimeLosses +
        adminLosses;

    // =========================
    // SECTION 2 — CONTROL COST
    // =========================

    const materialCost =
        getNumber("materialCost");

    const installHours =
        getNumber("installHours");

    const installRate =
        getNumber("installRate");

    const trainingHours =
        getNumber("trainingHours");

    const trainingRate =
        getNumber("trainingRate");

    const implementationDowntimeHours =
        getNumber("implementationDowntimeHours");

    const implementationDowntimeCost =
        getNumber("implementationDowntimeCost");

    const otherOneTimeCosts =
        getNumber("otherOneTimeCosts");

    const recurringCost =
        getNumber("recurringCost");

    // Control cost calculations
    const installationLaborCost =
        installHours * installRate;

    const trainingCost =
        trainingHours * trainingRate;

    const implementationDowntimeTotal =
        implementationDowntimeHours *
        implementationDowntimeCost;

    const totalOneTimeControlCost =
        materialCost +
        installationLaborCost +
        trainingCost +
        implementationDowntimeTotal +
        otherOneTimeCosts;

    const totalFirstYearControlCost =
        totalOneTimeControlCost +
        recurringCost;

    // =========================
    // SECTION 3 — POST-CONTROL OUTCOME
    // =========================

    const expectedIncidentEvents =
        getNumber("expectedIncidentEvents");

    const expectedNearMissEvents =
        getNumber("expectedNearMissEvents");

    const expectedPropertyEvents =
        getNumber("expectedPropertyEvents");

    const expectedDowntimeEvents =
        getNumber("expectedDowntimeEvents");

    const expectedAdminHours =
        getNumber("expectedAdminHours");

    // Projected losses after control
    const projectedIncidentLosses =
        expectedIncidentEvents * incidentCost;

    const projectedNearMissLosses =
        expectedNearMissEvents * nearMissCost;

    const projectedPropertyLosses =
        expectedPropertyEvents * propertyCost;

    const projectedDowntimeLosses =
        expectedDowntimeEvents *
        downtimeHours *
        downtimeHourCost;

    const projectedAdminLosses =
        expectedAdminHours * adminRate;

    const projectedAnnualLossesAfterControl =
        projectedIncidentLosses +
        projectedNearMissLosses +
        projectedPropertyLosses +
        projectedDowntimeLosses +
        projectedAdminLosses;

    // Reduction %
    let reductionPercent = 0;

    if (baselineAnnualLosses > 0) {
        reductionPercent =
            (
                (
                    baselineAnnualLosses -
                    projectedAnnualLossesAfterControl
                ) /
                baselineAnnualLosses
            ) * 100;
    }

    // Savings
    const grossAnnualSavings =
        baselineAnnualLosses -
        projectedAnnualLossesAfterControl;

    const netAnnualSavings =
        grossAnnualSavings -
        recurringCost;

    // ROI
    let roi = 0;

    if (totalOneTimeControlCost > 0) {
        roi =
            (
                netAnnualSavings /
                totalOneTimeControlCost
            ) * 100;
    }

    // Payback Period
    let paybackPeriod = "Not available";

    if (netAnnualSavings > 0) {

        const paybackYears =
            totalOneTimeControlCost /
            netAnnualSavings;

        const paybackMonths =
            paybackYears * 12;

        paybackPeriod =
            `${paybackMonths.toFixed(1)} months`;
    }

    // 3-Year Net Benefit
    const threeYearNetBenefit =
        (
            netAnnualSavings * 3
        ) - totalOneTimeControlCost;

    // =========================
    // OUTPUT RESULTS
    // =========================

    document.getElementById(
        "totalOneTimeControlCost"
    ).textContent =
        formatCurrency(totalOneTimeControlCost);

    document.getElementById(
        "totalFirstYearControlCost"
    ).textContent =
        formatCurrency(totalFirstYearControlCost);

    document.getElementById(
        "baselineAnnualLosses"
    ).textContent =
        formatCurrency(baselineAnnualLosses);

    document.getElementById(
        "projectedAnnualLossesAfterControl"
    ).textContent =
        formatCurrency(projectedAnnualLossesAfterControl);

    document.getElementById(
        "reductionPercent"
    ).textContent =
        `${reductionPercent.toFixed(1)}%`;

    document.getElementById(
        "grossAnnualSavings"
    ).textContent =
        formatCurrency(grossAnnualSavings);

    document.getElementById(
        "netAnnualSavings"
    ).textContent =
        formatCurrency(netAnnualSavings);

    document.getElementById(
        "roi"
    ).textContent =
        `${roi.toFixed(1)}%`;

    document.getElementById(
        "paybackPeriod"
    ).textContent =
        paybackPeriod;

    document.getElementById(
        "threeYearNetBenefit"
    ).textContent =
        formatCurrency(threeYearNetBenefit);
}

// Auto-update calculator
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculateROI);
});

// Initial calculation
calculateROI();