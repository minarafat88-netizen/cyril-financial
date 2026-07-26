"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  RefreshCw, 
  DollarSign, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet, 
  ShieldAlert, 
  TrendingDown, 
  Percent, 
  Send 
} from "lucide-react";

export default function RefinancePage() {
  // حالات حاسبة إعادة التمويل
  const [currentBalance, setCurrentBalance] = useState<number>(350000);
  const [currentRate, setCurrentRate] = useState<number>(7.25);
  const [newRate, setNewRate] = useState<number>(6.125);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري الحالية والقسط الجديد
  const calculatePayment = (balance: number, rate: number, years: number) => {
    const monthlyRate = rate / 100 / 12;
    const totalPayments = years * 12;
    if (monthlyRate === 0) return balance / totalPayments;
    const payment =
      (balance * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  };

  const currentMonthlyPayment = calculatePayment(currentBalance, currentRate, loanTermYears);
  const newMonthlyPayment = calculatePayment(currentBalance, newRate, loanTermYears);
  const monthlySavings = Math.max(0, currentMonthlyPayment - newMonthlyPayment);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }
    setCaptchaError(false);
    alert("Refinance consultation request submitted successfully! An advisor will analyze your rate options and call you.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <RefreshCw className="w-4 h-4 text-emerald-400" /> Mortgage Refinancing
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Lower Your Rate or Access Home Equity
            </h1>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl leading-relaxed">
              Optimize your current mortgage. Lower your monthly payments, shorten your loan term, or convert your home equity into cash with our tailored refinance programs.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/apply/form-1003">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-xs shadow-lg flex items-center gap-2">
                  Apply for Refinance <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content: Refinance Options & Process */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Refinance Strategies */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-navy">Refinance Options Tailored to Your Goals</h2>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Choose the refinancing strategy that best fits your current financial objectives.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-navy">Rate-and-Term Refinance</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Lower your interest rate, switch from an adjustable to a fixed rate, or shorten your term (e.g., 30-year to 15-year) to build equity faster.
                    </p>
                  </div>

                  <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-navy">Cash-Out Refinance</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Tap into your accumulated home equity to receive a lump sum of tax-free cash for home improvements, debt consolidation, or major investments.
                    </p>
                  </div>

                  <div className="p-5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                      <Percent className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-navy">FHA / VA Streamline Refi</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      Fast-track refinancing for existing FHA or VA borrowers with minimal income verification, no home appraisal, and reduced paperwork.
                    </p>
                  </div>

                  <div className="p-5 bg-amber-50/60 rounded-2xl border border-amber-100 space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                      <RefreshCw className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-navy">PMI Removal Refinance</h4>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      If your home's market value has increased, refinance to eliminate costly Private Mortgage Insurance (PMI) payments permanently.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Refinance Process */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-navy">How Refinancing Works</h2>
                
                <div className="space-y-4">
                  {[
                    { step: "01", title: "Analyze Your Current Rate & Goals", desc: "Determine whether your main goal is reducing monthly payment or tapping equity." },
                    { step: "02", title: "Check Home Equity", desc: "Evaluate your current home valuation to see how much equity is available." },
                    { step: "03", title: "Submit Form 1003 Application", desc: "Provide basic property and income information to review locked rate options." },
                    { step: "04", title: "Close & Enjoy Savings", desc: "Finalize your loan paperwork and begin benefiting from lower payments or cash out." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 items-start">
                      <span className="text-lg font-black text-emerald-600 bg-emerald-100 px-3 py-1 rounded-xl shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-navy">{item.title}</h4>
                        <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar: Savings Estimator & Consultation */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Refinance Savings Calculator */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Savings Estimator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Refinance Savings Calculator</h3>
                  <p className="text-gray-500 text-xs mt-1">Compare your current interest rate vs new potential rate.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Current Loan Balance ($)</label>
                    <input 
                      type="number" 
                      value={currentBalance} 
                      onChange={(e) => setCurrentBalance(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Current Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.125"
                        value={currentRate} 
                        onChange={(e) => setCurrentRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">New Target Rate (%)</label>
                      <input 
                        type="number" 
                        step="0.125"
                        value={newRate} 
                        onChange={(e) => setNewRate(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Current Monthly P&I:</span>
                      <span className="font-bold text-navy">${currentMonthlyPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>New Monthly P&I:</span>
                      <span>${newMonthlyPayment.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-navy text-white p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Estimated Monthly Savings</span>
                      <span className="text-2xl font-black text-emerald-400">${monthlySavings.toLocaleString()}/mo</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Consultation Form with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Free Rate Analysis</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Request a Refinance Quote</h3>
                  <p className="text-gray-500 text-xs mt-1">Speak with an advisor to review your rate lock options.</p>
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
                    <Send className="w-4 h-4" /> Request Quote <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              </div>

              {/* Form 1003 Refinance Hub */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Official Application</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Start Refinance Application</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Ready to proceed? Submit Form 1003 directly to lock in your refinanced mortgage rate.
                  </p>
                </div>

                <Link href="/apply/form-1003" className="block">
                  <Button className="w-full bg-navy hover:bg-navy-light text-white font-semibold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 text-xs">
                    <FileSpreadsheet className="w-4 h-4" /> Open Form 1003 Application <ArrowRight className="w-4 h-4" />
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