import { NextResponse } from "next/server";

// FHA MIP Rates
const FHA_UPFRONT_MIP_RATE = 0.0175; // 1.75%
const FHA_ANNUAL_MIP_RATE = 0.0055;   // 0.55%

// VA Funding Fee Rate
const VA_FUNDING_FEE_RATE = 0.023; // 2.3%

// USDA Guarantee Fee Rates
const USDA_UPFRONT_GUARANTEE_FEE_RATE = 0.01; // 1.0%
const USDA_ANNUAL_GUARANTEE_FEE_RATE = 0.0035; // 0.35%

// Conventional PMI Rate
const CONVENTIONAL_PMI_RATE = 0.0058; // 0.58%

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { purchasePrice, downPayment, interestRate, loanTermYears, loanType } = body;

    if (purchasePrice === undefined || downPayment === undefined || interestRate === undefined || loanTermYears === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required calculation parameters" },
        { status: 400 }
      );
    }

    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    const loanToValue = principal > 0 ? (principal / purchasePrice) * 100 : 0;

    let monthlyPrincipalAndInterest = 0;
    let totalMonthlyPayment = 0;
    let monthlyMIP = 0; // Used for FHA & USDA annual fees
    let monthlyPMI = 0;
    let totalLoanAmount = principal;

    if (loanType === 'fha') {
      const upfrontMIP = principal * FHA_UPFRONT_MIP_RATE;
      totalLoanAmount = principal + upfrontMIP;
      monthlyMIP = (principal * FHA_ANNUAL_MIP_RATE) / 12;

    } else if (loanType === 'va') {
      const fundingFee = principal * VA_FUNDING_FEE_RATE;
      totalLoanAmount = principal + fundingFee;

    } else if (loanType === 'usda') {
      const upfrontFee = principal * USDA_UPFRONT_GUARANTEE_FEE_RATE;
      totalLoanAmount = principal + upfrontFee;
      monthlyMIP = (principal * USDA_ANNUAL_GUARANTEE_FEE_RATE) / 12;

    } else { // Conventional Loan
      if (loanToValue > 80) {
        monthlyPMI = (principal * CONVENTIONAL_PMI_RATE) / 12;
      }
    }

    if (monthlyInterestRate === 0) {
      monthlyPrincipalAndInterest = totalLoanAmount > 0 ? totalLoanAmount / totalPayments : 0;
    } else {
      monthlyPrincipalAndInterest =
        totalLoanAmount > 0 ? (totalLoanAmount *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1) : 0;
    }

    const estimatedPropertyTax = (purchasePrice * 0.0125) / 12;
    const estimatedInsurance = (purchasePrice * 0.0035) / 12;

    totalMonthlyPayment =
      monthlyPrincipalAndInterest +
      estimatedPropertyTax +
      estimatedInsurance +
      monthlyMIP +
      monthlyPMI;

    return NextResponse.json({
      success: true,
      data: {
        principal,
        monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
        estimatedPropertyTax: Math.round(estimatedPropertyTax),
        estimatedInsurance: Math.round(estimatedInsurance),
        monthlyMIP: Math.round(monthlyMIP),
        monthlyPMI: Math.round(monthlyPMI),
        totalMonthlyPayment: Math.round(totalMonthlyPayment),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server calculation error" },
      { status: 500 }
    );
  }
}