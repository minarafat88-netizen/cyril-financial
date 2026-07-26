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
  HeartHandshake, 
  ShieldAlert, 
  Info,
  Home
} from "lucide-react";

export default function FHALoanPage() {
  // حالات الحاسبة المخصصة لقرض FHA Loans
  const [homeValue, setHomeValue] = useState<number>(300000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(3.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const annualInterestRate = 5.875; // نسبة الفائدة المتوسطة لقروض FHA

  // حساب مبلغ القرض الأساسي ورسوم التأمين المبدئية (Upfront MIP = 1.75%)
  const baseLoanAmount = homeValue - (homeValue * (downPaymentPercent / 100));
  const upfrontMIP = baseLoanAmount * 0.0175; // 1.75% UFMIP
  const totalLoanAmountWithMIP = baseLoanAmount + upfrontMIP;

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري للأصل والفائدة (P&I) بناءً على المبلغ الشامل لـ UFMIP
  const calculateMonthlyPI = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return totalLoanAmountWithMIP / totalPayments;
    const payment =
      (totalLoanAmountWithMIP * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  };

  // تقدير قيمة التأمين الشهري الفيدرالي (Annual MIP ~0.55% سنوياً)
  const estimateMonthlyMIP = () => {
    return Math.round((baseLoanAmount * 0.0055) / 12);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    alert("Contact details submitted successfully! An FHA mortgage specialist will reach out to you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-emerald-400" /> Government-Backed Flexibility
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              FHA Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Federal Housing Administration loans designed to make homeownership accessible—featuring low down payments starting at 3.5% and flexible credit requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Guidelines</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  An FHA Loan is a government-backed mortgage insured by the Federal Housing Administration (FHA), a branch of the U.S. Department of Housing and Urban Development (HUD). Because the government guarantees a portion of the loan against default, lenders are able to offer significantly more flexible qualification parameters, lower minimum credit score thresholds, and down payment options as low as 3.5%.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  FHA financing is an extremely popular choice for first-time homebuyers and buyers with moderate income or limited savings for a down payment.
                </p>
              </div>

              {/* FHA MIP Explanation Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Understanding FHA Mortgage Insurance (MIP)</h4>
                <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">FHA Dual Insurance Structure:</span>
                      FHA loans require two types of mortgage insurance premiums to protect lenders against default:
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Upfront MIP (UFMIP):</strong> Equal to 1.75% of the base loan amount. This fee is automatically financed into your total loan balance at closing.</li>
                    <li><strong className="text-navy">Annual MIP (Monthly):</strong> A monthly fee calculated at approximately 0.55% per year, added directly to your monthly mortgage statement.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Program Highlights</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Low down payment requirement starting at just 3.5%",
                    "More lenient credit score qualifications (580+ for 3.5% down)",
                    "Higher debt-to-income (DTI) allowance compared to conventional loans",
                    "Down payment funds can be 100% gifted from family or qualified non-profits",
                    "Assumable mortgage option allowing future buyers to take over your interest rate"
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
                  <li><strong className="text-navy">Credit Score:</strong> Minimum 580 FICO score for 3.5% down payment (500–579 accepted with 10% down).</li>
                  <li><strong className="text-navy">Primary Residence Only:</strong> Property must serve as your primary owner-occupied home.</li>
                  <li><strong className="text-navy">Debt-to-Income (DTI):</strong> Standard 31/43 ratio, with flexibility up to 45%–50% for strong profiles.</li>
                  <li><strong className="text-navy">Employment History:</strong> Minimum 2 years of steady employment and verifiable income documentation.</li>
                  <li><strong className="text-navy">FHA Property Appraisal:</strong> Home must pass safety, security, and structural soundness standards set by HUD.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated FHA Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">FHA Payment Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Includes 1.75% Upfront MIP financing and estimated monthly MIP fees.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Home Purchase Price ($)</label>
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
                        <option value={3.5}>3.5% (FHA Minimum)</option>
                        <option value={5}>5%</option>
                        <option value={10}>10%</option>
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
                        <option value={15}>15 Years Fixed</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Loan Amount:</span>
                      <span className="font-bold text-navy">${baseLoanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>+ Financed Upfront MIP (1.75%):</span>
                      <span className="font-semibold text-navy">+${upfrontMIP.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-amber-600 font-medium">
                      <span>Est. Monthly Annual MIP:</span>
                      <span>+${estimateMonthlyMIP()}/mo</span>
                    </div>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Est. P&I + Monthly MIP</span>
                      <span className="text-2xl font-black text-silver-light">${(calculateMonthlyPI() + estimateMonthlyMIP()).toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Calculated at {annualInterestRate}% baseline FHA interest rate.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Find out if you qualify for 3.5% down payment FHA financing.</p>
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
                    Ready to officially submit your FHA loan application? Proceed to our uniform residential loan application.
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