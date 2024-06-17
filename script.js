const elements = {
  carType: document.getElementById("car-type"),
  carValueInput: document.getElementById("car-value"),
  carValueRange: document.getElementById("car-value-range"),
  leasePeriod: document.getElementById("lease-period"),
  downPaymentDisplay: document.getElementById("down-payment-display"),
  downPaymentRange: document.getElementById("down-payment"),
  leasingCost: document.getElementById("leasing-cost"),
  downPaymentAmount: document.getElementById("down-payment-amount"),
  monthlyInstalment: document.getElementById("monthly-instalment"),
  interestRate: document.getElementById("interest-rate"),
};

// Initialize default values
elements.carValueRange.value = "10000";
elements.carValueInput.value = "10000";
elements.leasePeriod.value = "12";
elements.downPaymentDisplay.value = "10";
elements.downPaymentRange.value = "10";

const annualInterestRates = {
  new: 2.99,
  used: 3.7,
};

function calculate() {
  // Parse input values
  const carTypeValue = elements.carType.value;
  const carValue = parseFloat(elements.carValueInput.value);
  const leasePeriodValue = parseInt(elements.leasePeriod.value);
  const downPaymentPercentValue = parseFloat(elements.downPaymentRange.value);

  /**
   * Amortization formula:
   * @monthlyPayment = (P * r) / (1 - (1 + r)^-n)
   * P = amount to finance (principal balance)
   * r = monthly interest rate
   * n = number of payments (lease period)
   */

  // Calculate down payment, amount to finance, and monthly interest rate
  const downPayment = (downPaymentPercentValue / 100) * carValue;
  const amountToFinance = carValue - downPayment;
  const annualInterestRate = annualInterestRates[carTypeValue] / 100;
  const monthlyInterestRate = annualInterestRate / 12;

  // Calculate monthly payment
  const monthlyPayment = (amountToFinance * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriodValue));

  // Calculate total leasing cost
  const totalLeasingCost = downPayment + monthlyPayment * leasePeriodValue;

  // Update results display with calculated values
  elements.leasingCost.textContent = totalLeasingCost.toFixed(2);
  elements.downPaymentAmount.textContent = downPayment.toFixed(2);
  elements.monthlyInstalment.textContent = monthlyPayment.toFixed(2);
  elements.interestRate.textContent = annualInterestRates[carTypeValue].toFixed(2);
}

// Sync car-value inputs, validate number input values, and trigger calculation
function syncInputs(event) {
  const { target } = event;
  if (target === elements.carValueRange) {
    elements.carValueInput.value = target.value;
  } else if (target === elements.carValueInput) {
    if (target.value < 10000) {
      target.value = 10000;
    } else if (target.value > 200000) {
      target.value = 200000;
    }
    elements.carValueRange.value = target.value;
  }
  calculate();
}

elements.carType.addEventListener("change", calculate);
elements.leasePeriod.addEventListener("change", calculate);
elements.carValueRange.addEventListener("input", syncInputs);
elements.carValueInput.addEventListener("input", syncInputs);
elements.downPaymentRange.addEventListener("input", () => {
  elements.downPaymentDisplay.value = elements.downPaymentRange.value;
  calculate();
});

// Initial calculation
calculate();
