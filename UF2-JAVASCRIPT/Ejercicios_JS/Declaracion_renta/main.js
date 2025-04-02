function calculateTax() {
    let income = parseFloat(document.getElementById("income").value) || 0;
    let deductions = parseFloat(document.getElementById("deductions").value) || 0;
    let taxableIncome = income - deductions;
    
    let taxRate = 0;
    if (taxableIncome > 50000) {
        taxRate = 0.3;
    } else if (taxableIncome > 20000) {
        taxRate = 0.2;
    } else {
        taxRate = 0.1;
    }
    
    let tax = taxableIncome * taxRate;
    tax = tax > 0 ? tax : 0;
    
    document.getElementById("result").innerText = `El impuesto a pagar es: $${tax.toFixed(2)}`;
}
