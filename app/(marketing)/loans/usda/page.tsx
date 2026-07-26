"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calculator, 
  Send, 
  FileSpreadsheet, 
  Trees, 
  ShieldAlert, 
  Info,
  MapPin,
  Sprout
} from "lucide-react";

export default function USDALoanPage() {
  // حالات الحاسبة المخصصة لقرض USDA Loans
  const [homeValue, setHomeValue] = useState<number>(250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0); // افتراضياً 0%
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const annualInterestRate = 5.625; // نسبة الفائدة المتوسطة لقروض USDA

  // حساب رسم الضمان المبدئي (Upfront Guarantee Fee = 1.00%)
  const baseLoanAmount = homeValue - (homeValue * (downPaymentPercent / 100));
  const upfrontGuaranteeFee = baseLoanAmount * 0.01; // 1.00%
  const totalLoanAmountWithFee = baseLoanAmount + upfrontGuaranteeFee;

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري للأصل والفائدة (P&I) بعد إضافة رسم الضمان المبدئي
  const calculateMonthlyPI = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return totalLoanAmountWithFee / totalPayments;
    const payment =
      (totalLoanAmountWithFee * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  };

  // تقدير قيمة رسم الضمان الشهري السنوي (Annual Fee = 0.35% سنوياً)
  const estimateMonthlyAnnualFee = () => {
    return Math.round((baseLoanAmount * 0.0035) / 12);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    alert("Contact details submitted successfully! A USDA loan specialist will reach out to check property & income eligibility.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Sprout className="w-4 h-4 text-emerald-400" /> Rural Development Home Financing
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              USDA Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Zero-down-payment mortgages backed by the U.S. Department of Agriculture, designed to promote homeownership in designated rural and suburban communities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Guidelines</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A USDA Loan (USDA Rural Development Guaranteed Housing Loan) is a government-backed mortgage designed to help moderate-to-low-income households purchase homes in eligible suburban and rural areas. Because the USDA guarantees a portion of the mortgage against default, lenders can offer 100% financing with zero down payment and reduced mortgage insurance premiums compared to FHA loans.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Many suburban areas outside major city centers qualify as USDA-eligible zones, making this one of the most cost-effective financing options available.
                </p>
              </div>

              {/* USDA Fees & Qualification Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Understanding USDA Guarantee Fees</h4>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Dual Guarantee Fee Structure:</span>
                      To maintain program funding, the USDA charges two modest guarantee fees:
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Upfront Guarantee Fee:</strong> 1.00% of the loan balance, financed directly into your total mortgage amount at closing.</li>
                    <li><strong className="text-navy">Annual Guarantee Fee:</strong> 0.35% per year (significantly lower than FHA’s 0.55%), paid monthly as part of your mortgage statement.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Program Highlights</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "0% down payment required (100% home purchase financing)",
                    "Lower monthly mortgage insurance costs compared to FHA loans",
                    "Closing costs can be gifted or paid by seller (up to 6%)",
                    "Below-average competitive fixed interest rates",
                    "Financing of the 1% upfront guarantee fee directly into the loan balance"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-navy font-medium text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Eligibility & Underwriting Criteria</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li><strong className="text-navy">Geographic Location:</strong> Property must be located in a USDA-designated rural area (suburban communities qualify).</li>
                  <li><strong className="text-navy">Income Limits:</strong> Total household income must not exceed 115% of the area median income (AMI).</li>
                  <li><strong className="text-navy">Credit Score:</strong> Minimum FICO credit score of 640 for automated underwriting approval.</li>
                  <li><strong className="text-navy">Primary Residence Only:</strong> Property must be owner-occupied as your primary residence.</li>
                  <li><strong className="text-navy">Debt-to-Income (DTI):</strong> Standard guidelines look for 29/41 DTI ratios (flexible with strong credit).</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated USDA Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">USDA Loan Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Includes 1.00% Upfront Guarantee Fee and estimated 0.35% Annual Fee.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Target Home Price ($)</label>
                    <input 
                      type="number" 
                      value={homeValue} 
                      onChange={(e) => setHomeValue(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Down Payment (%)</label>
                      <select 
                        value={downPaymentPercent} 
                        onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                      >
                        <option value={0}>0% (USDA Standard)</option>
                        <option value={3}>3% Down</option>
                        <option value={5}>5% Down</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Loan Term</label>
                      <select 
                        value={loanTermYears} 
                        onChange={(e) => setLoanTermYears(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                      >
                        <option value={30}>30 Years Fixed</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Loan Amount:</span>
                      <span className="font-bold text-navy">${baseLoanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>+ Financed Upfront Guarantee Fee (1.00%):</span>
                      <span className="font-semibold text-navy">+${upfrontGuaranteeFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Est. Monthly Annual Fee (0.35%):</span>
                      <span>+${estimateMonthlyAnnualFee()}/mo</span>
                    </div>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Est. P&I + Monthly Annual Fee</span>
                      <span className="text-2xl font-black text-silver-light">${(calculateMonthlyPI() + estimateMonthlyAnnualFee()).toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Calculated at {annualInterestRate}% baseline USDA interest rate.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Check if your target home address and household income qualify for USDA 0% down financing.</p>
                </div>

                <form onSubmit={handleContactSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Full Name</label>
                    <input type="text" placeholder="Enter your full name" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Email Address</label>
                    <input type="email" placeholder="name@example.com" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Phone Number</label>
                    <input type="tel" placeholder="+1 (949) 000-0000" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Target Property Address / City</label>
                    <input type="text" placeholder="City, State, Zip" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy" />
                  </div>

                  {/* reCAPTCHA Verification Widget */}
                  <div className="pt-2 flex flex-col items-center justify-center">
                    <ReCAPTCHA
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Ld_YourPlaceholderSiteKeyHere_x"}
                      onChange={(token) => {
                        setCaptchaToken(token);
                        setCaptchaError(false);
                      }}
                    />
                    {captchaError && (
                      <span className="text-[11px] text-red-500 font-bold mt-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Please complete the reCAPTCHA verification.
                      </span>
                    )}
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs">
                    <Send className="w-4 h-4" /> Request Consultation <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* 2. Form 1003 Navigation Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Ready to Proceed</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Apply via Form 1003</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Ready to proceed with your USDA loan application? Open our official uniform residential loan application.
                  </p>
                </div>

                <Link href="/apply/form-1003" className="block">
                  <Button className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs">
                    <FileSpreadsheet className="w-4 h-4" /> Open Official Form 1003 <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </main>
    </div>
  );
}