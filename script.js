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

    let previousLimit = 0;
    let calculationRows = '';

    for (let slab of slabRates2025) {
        const taxableIncome = Math.min(income, slab.limit) - previousLimit;
        const taxAmount = Math.max(taxableIncome, 0) * slab.rate;
        tax2025 += taxAmount;

        calculationRows += `
            <tr>
                <td>₹${previousLimit} - ₹${slab.limit}</td>
                <td>${(slab.rate * 100).toFixed(2)}%</td>
                <td>₹${taxAmount.toFixed(2)}</td>
            </tr>
        `;

        previousLimit = slab.limit;
        if (income <= slab.limit) break;
    }

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

    document.getElementById('result').innerHTML = calculationRows;
    document.getElementById('comparison').innerHTML = `
        <tr><th>FY 24-25 Tax</th><td>₹${tax2024.toFixed(2)}</td></tr>
        <tr><th>FY 25-26 Tax</th><td>₹${tax2025.toFixed(2)}</td></tr>
        <tr><th>Difference</th><td>₹${(tax2025 - tax2024).toFixed(2)}</td></tr>
    `;
}