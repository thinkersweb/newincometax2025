function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    let tax2025 = 0;
    let tax2024 = 0;

    const slabRates2025 = [
        { limit: 400000, rate: 0 },
        { limit: 800000, rate: 0.05 },
        { limit: 1200000, rate: 0.10 },
        { limit: 1600000, rate: 0.15 },
        { limit: 2000000, rate: 0.20 },
        { limit: 2400000, rate: 0.25 },
        { limit: Infinity, rate: 0.30 }
    ];

    tax2025 = slabRates2025.reduce((acc, slab) => {
        const taxableIncome = Math.min(income, slab.limit) - (slab.previousLimit || 0);
        return acc + Math.max(taxableIncome, 0) * slab.rate;
    }, 0);

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

    let calculationDetails = '<table><tr><th>Income Range</th><th>Tax Rate</th><th>Tax Amount</th></tr>';
    slabRates2025.forEach((slab, index) => {
        const taxableIncome = Math.min(income, slab.limit) - (slab.previousLimit || 0);
        const taxAmount = Math.max(taxableIncome, 0) * slab.rate;
        calculationDetails += `<tr><td>₹${slab.previousLimit || 0} - ₹${slab.limit}</td><td>${(slab.rate * 100).toFixed(2)}%</td><td>₹${taxAmount.toFixed(2)}</td></tr>`;
        if (taxableIncome > 0) slab.previousLimit = slab.limit;
    });
    calculationDetails += `</table>`;

    resultElement.innerHTML = `
        <p><strong>FY 25-26 Tax Calculation:</strong></p>
        <p>Annual Income: ₹${income}</p>
        ${calculationDetails}
        <p>Calculated Tax: ₹${tax2025.toFixed(2)}</p>
        ${tax2025 <= 60000 ? `<p>No tax to pay as you will get a rebate for ₹${tax2025.toFixed(2)}</p>` : ''}
    `;

    comparisonElement.innerHTML = `
        <p><strong>Comparison with FY 24-25:</strong></p>
        <p>FY 24-25 Tax: ₹${tax2024.toFixed(2)}</p>
        <p>FY 25-26 Tax: ₹${tax2025.toFixed(2)}</p>
        <p>Difference: ₹${(tax2025 - tax2024).toFixed(2)}</p>
    `;
}
