/**
 * Represents a collection of HTML elements used in a car leasing calculator.
 */
type Elements = {
  carType: HTMLSelectElement;
  carValueRange: HTMLInputElement;
  carValueInput: HTMLInputElement;
  leasePeriod: HTMLSelectElement;
  downPaymentRange: HTMLInputElement;
  downPaymentDisplay: HTMLInputElement;
  // results display
  leasingCost: HTMLSpanElement;
  downPaymentAmount: HTMLSpanElement;
  downPaymentPercent: HTMLSpanElement;
  monthlyInstalment: HTMLSpanElement;
  interestRate: HTMLSpanElement;
};

/**
 * Represents a collection of HTML elements used in the application.
 */
const elements: Elements = {
  carType: document.getElementById("car-type") as HTMLSelectElement,
  carValueRange: document.getElementById("car-value-range") as HTMLInputElement,
  carValueInput: document.getElementById("car-value") as HTMLInputElement,
  leasePeriod: document.getElementById("lease-period") as HTMLSelectElement,
  downPaymentRange: document.getElementById("down-payment") as HTMLInputElement,
  downPaymentDisplay: document.getElementById("down-payment-display") as HTMLInputElement,
  leasingCost: document.getElementById("leasing-cost") as HTMLSpanElement,
  downPaymentAmount: document.getElementById("down-payment-amount") as HTMLSpanElement,
  downPaymentPercent: document.getElementById("down-payment-percent") as HTMLSpanElement,
  monthlyInstalment: document.getElementById("monthly-instalment") as HTMLSpanElement,
  interestRate: document.getElementById("interest-rate") as HTMLSpanElement,
};

/**
 * Object representing the annual interest rates.
 */
interface AnnualInterestRates {
  new: number;
  used: number;
}
/**
 * The annual interest rates for new and used items.
 * @type {AnnualInterestRates}
 */
const annualInterestRates: AnnualInterestRates = {
  new: 2.99,
  used: 3.7,
};

/**
 * Calculates the total leasing cost and updates the DOM elements with the calculated values.
 */
function calculate() {
  // Parse input values
  const carTypeValue: keyof AnnualInterestRates = elements.carType.value as keyof AnnualInterestRates;
  const carValue: number = parseFloat(elements.carValueInput.value);
  const leasePeriodValue: number = parseInt(elements.leasePeriod.value);
  const downPaymentPercentValue: number = parseFloat(elements.downPaymentRange.value);

  // Calculate down payment, amount to finance, and monthly interest rate
  const downPayment: number = (downPaymentPercentValue / 100) * carValue;
  const amountToFinance: number = carValue - downPayment;
  const annualInterestRate: number = annualInterestRates[carTypeValue] / 100;
  const monthlyInterestRate: number = annualInterestRate / 12;

  // Calculate monthly payment formula
  const monthlyPayment: number = (amountToFinance * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriodValue));

  // Calculate total leasing cost
  const totalLeasingCost: number = downPayment + monthlyPayment * leasePeriodValue;

  // Update DOM elements with calculated values
  elements.leasingCost.textContent = totalLeasingCost.toFixed(2);
  elements.downPaymentAmount.textContent = downPayment.toFixed(2);
  elements.downPaymentPercent.textContent = downPaymentPercentValue.toFixed(2);
  elements.monthlyInstalment.textContent = monthlyPayment.toFixed(2);
  elements.interestRate.textContent = annualInterestRates[carTypeValue].toFixed(2);
}

// Sync range and number inputs and trigger calculation
function syncInputs(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target === elements.carValueRange) {
    elements.carValueInput.value = target.value;
  } else if (target === elements.carValueInput) {
    elements.carValueRange.value = target.value;
  }
  calculate();
}

// Add event listeners to input elements
elements.carValueRange.addEventListener("input", syncInputs);
elements.carValueInput.addEventListener("input", syncInputs);
elements.downPaymentRange.addEventListener("input", () => {
  elements.downPaymentDisplay.value = elements.downPaymentRange.value;
  calculate();
});

elements.carType.addEventListener("change", calculate);
elements.leasePeriod.addEventListener("change", calculate);

// Initialize default values
elements.carValueRange.value = "10000";
elements.carValueInput.value = "10000";
elements.leasePeriod.value = "12";
elements.downPaymentRange.value = "10";
elements.downPaymentDisplay.value = "10";

// perform initial calculation
calculate();
