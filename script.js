function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    let tax2025 = 0;
    let tax2024 = 0;

    // FY 25-26 tax calculation
    if (income <= 400000) {
        tax2025 = 0;
    } else if (income <= 800000) {
        tax2025 = (income - 400000) * 0.05;
    } else if (income <= 1200000) {
        tax2025 = 20000 + (income - 800000) * 0.10;
    } else if (income <= 1600000) {
        tax2025 = 60000 + (income - 1200000) * 0.15;
    } else if (income <= 2000000) {
        tax2025 = 120000 + (income - 1600000) * 0.20;
    } else if (income <= 2400000) {
        tax2025 = 200000 + (income - 2000000) * 0.25;
    } else {
        tax2025 = 300000 + (income - 2400000) * 0.30;
    }

    // FY 24-25 tax calculation
    if (income <= 300000) {
        tax2024 = 0;
    } else if (income <= 600000) {
        tax2024 = (income - 300000) * 0.05;
    } else if (income <= 900000) {
        tax2024 = 15000 + (income - 600000) * 0.10;
    } else if (income <= 1200000) {
        tax2024 = 45000 + (income - 900000) * 0.15;
    } else if (income <= 1500000) {
        tax2024 = 90000 + (income - 1200000) * 0.20;
    } else if (income <= 1800000) {
        tax2024 = 150000 + (income - 1500000) * 0.25;
    } else {
        tax2024 = 225000 + (income - 1800000) * 0.30;
    }

    const resultElement = document.getElementById('result');
    const comparisonElement = document.getElementById('comparison');

    resultElement.innerHTML = `
        <p><strong>FY 25-26 Tax Calculation:</strong></p>
        <p>Annual Income: ₹${income}</p>
        <p>Calculated Tax: ₹${tax2025.toFixed(2)}</p>
    `;

    comparisonElement.innerHTML = `
        <p><strong>Comparison with FY 24-25:</strong></p>
        <p>FY 24-25 Tax: ₹${tax2024.toFixed(2)}</p>
        <p>FY 25-26 Tax: ₹${tax2025.toFixed(2)}</p>
        <p>Difference: ₹${(tax2025 - tax2024).toFixed(2)}</p>
    `;
}
