import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { purchasePrice, downPayment, interestRate, loanTermYears } = body;

    if (!purchasePrice || !downPayment || !interestRate || !loanTermYears) {
      return NextResponse.json(
        { success: false, error: "Missing required calculation parameters" },
        { status: 400 }
      );
    }

    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPrincipalAndInterest = 0;
    if (monthlyInterestRate === 0) {
      monthlyPrincipalAndInterest = principal / totalPayments;
    } else {
      monthlyPrincipalAndInterest =
        (principal *
          (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments))) /
        (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }

    // Estimated monthly property tax (approx 1.25% annually) and insurance
    const estimatedPropertyTax = (purchasePrice * 0.0125) / 12;
    const estimatedInsurance = (purchasePrice * 0.0035) / 12;
    const totalMonthlyPayment =
      monthlyPrincipalAndInterest + estimatedPropertyTax + estimatedInsurance;

    return NextResponse.json({
      success: true,
      data: {
        principal,
        monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
        estimatedPropertyTax: Math.round(estimatedPropertyTax),
        estimatedInsurance: Math.round(estimatedInsurance),
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