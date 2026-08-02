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
  TrendingUp, 
  ShieldAlert, 
  Info 
} from "lucide-react";

export default function AdjustableRateLoanPage() {
  // حالات الحاسبة المخصصة لقرض Adjustable-Rate Mortgage (ARM)
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [armStructure, setArmStructure] = useState<string>("5/1");
  
  // نسب الفائدة الابتدائية لبرامج ARM المختلفة (أقل عادة من Fixed-Rate)
  const getInitialRate = () => {
    switch(armStructure) {
      case "5/1": return 5.375;
      case "7/1": return 5.625;
      case "10/1": return 5.875;
      default: return 5.375;
    }
  };

  const initialInterestRate = getInitialRate();

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري الأولي للفائدة الثابتة
  const calculateInitialMonthlyPayment = () => {
    const monthlyRate = initialInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    alert("Contact details submitted successfully! An ARM loan specialist will contact you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Dynamic Rate Program
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              Adjustable-Rate Mortgages (ARM)
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Enjoy lower initial monthly payments for the first 5, 7, or 10 years, starting as low as {initialInterestRate}%, followed by periodic interest rate adjustments aligned with market indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Detailed Structure</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  An Adjustable-Rate Mortgage (ARM) offers a fixed interest rate for an initial introductory period (such as 5, 7, or 10 years). After this initial period expires, the interest rate resets periodically (typically once per year or every 6 months) based on a benchmark market index (e.g., SOFR) plus a predetermined margin set by the lender.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ARMs are highly ideal for homebuyers who plan to move, refinance, or pay off their mortgage before the initial fixed-rate term ends, allowing them to capitalize on significantly lower starting interest rates compared to traditional fixed-rate loans.
                </p>
              </div>

              {/* In-Depth Anatomy of ARM Loans */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Understanding ARM Rate Caps & Limits</h4>
                <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Built-in Cap Protection (e.g., 2/2/5 Cap Structure):</span>
                      ARMs include strict caps to protect borrowers from drastic rate increases:
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Initial Adjustment Cap:</strong> Limits how much the interest rate can change on the first adjustment date (e.g., max 2%).</li>
                    <li><strong className="text-navy">Subsequent Adjustment Cap:</strong> Limits how much the rate can change in each subsequent adjustment period (e.g., max 2%).</li>
                    <li><strong className="text-navy">Lifetime Adjustment Cap:</strong> Sets a maximum ceiling on how high the interest rate can rise over the entire life of the loan (e.g., max 5% above the initial rate).</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Highlights & Advantages</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Lower introductory interest rates & smaller initial monthly payments",
                    "Popular options: 5/1 ARM, 7/1 ARM, and 10/1 ARM programs",
                    "Strict built-in rate caps to protect against runaway market increases",
                    "Opportunity to benefit automatically if broader market interest rates drop",
                    "Ideal strategic fit for buyers staying in the home for under 10 years"
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Eligibility & Qualification Requirements</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li><strong className="text-navy">Credit Score:</strong> Minimum FICO score starting at 620–640+ (680+ recommended for best margins).</li>
                  <li><strong className="text-navy">Qualifying DTI Ratio:</strong> Maximum Debt-to-Income ratio around 43%–45% (underwritten at the maximum potential adjusted rate).</li>
                  <li><strong className="text-navy">Down Payment:</strong> Minimum down payment starting at 3% to 5% for conventional ARMs.</li>
                  <li><strong className="text-navy">Financial Reserves:</strong> Demonstrated liquid reserves (typically 2 to 6 months of mortgage payments) to buffer against future adjustment cycles.</li>
                  <li><strong className="text-navy">Income Verification:</strong> Full standard documentation (W-2s, recent pay stubs, 2 years tax returns).</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated ARM Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">ARM Payment Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Estimates initial fixed-period monthly payment before rate resets.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">ARM Program Structure</label>
                    <select 
                      value={armStructure} 
                      onChange={(e) => setArmStructure(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                    >
                      <option value="5/1">5/1 ARM (5 Yrs Fixed @ 5.375%)</option>
                      <option value="7/1">7/1 ARM (7 Yrs Fixed @ 5.625%)</option>
                      <option value="10/1">10/1 ARM (10 Yrs Fixed @ 5.875%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Loan Amount ($)</label>
                    <input 
                      type="number" 
                      value={loanAmount} 
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Total Loan Term</label>
                    <select 
                      value={loanTermYears} 
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                    >
                      <option value={30}>30 Years Amortization</option>
                      <option value={15}>15 Years Amortization</option>
                    </select>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Initial Monthly Payment</span>
                      <span className="text-2xl font-black text-silver-light">${calculateInitialMonthlyPayment().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Payment reflects the initial fixed period based on {initialInterestRate}% interest rate.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Send your details to discuss ARM rate caps and see if an adjustable mortgage fits your financial timeline.</p>
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
                    <label className="block text-xs font-bold text-navy mb-1">Home Address / Location</label>
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
                    Have you chosen your ARM term? Proceed directly to our official uniform residential loan application.
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