"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight, CheckCircle2, Calculator, Send, FileSpreadsheet, ShieldAlert } from "lucide-react";

export default function FixedRateLoanPage() {
  // حالات الحاسبة المخصصة لقرض Fixed-Rate
  const [loanAmount, setLoanAmount] = useState<number>(400000);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const annualInterestRate = 6.125; // نسبة الفائدة الثابتة لهذا البرنامج

  // حالة الـ reCAPTCHA للتحقق من أن المستخدم ليس بوت
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري للـ Fixed-Rate
  const calculateMonthlyPayment = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return loanAmount / totalPayments;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return Math.round(payment);
  };

  // معالجة إرسال نموذج التواصل السريع مع التحقق من reCAPTCHA
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!captchaToken) {
      setCaptchaError(true);
      return;
    }

    setCaptchaError(false);
    alert("Contact details submitted successfully! Our advisory team will reach out soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Traditional Mortgage Program
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              Fixed-Rate Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Traditional stability with consistent monthly principal and interest payments for the entire life of your loan at a locked-in rate of {annualInterestRate}%.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Details</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lock in your interest rate for 15, 20, or 30 years. Perfect for long-term homeowners seeking predictable monthly budgeting, absolute protection against market interest rate hikes, and steady equity buildup.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Highlights & Terms</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "15, 20, and 30-year fixed terms available",
                    "Consistent principal and interest monthly payments",
                    "Absolute protection against market rate increases",
                    `Locked interest rate starting at ${annualInterestRate}%`
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
                  <li>Minimum credit score requirement starting around 620–640.</li>
                  <li>Debt-to-Income (DTI) ratio typically below 43% to 45%.</li>
                  <li>Stable employment history and verifiable income documentation (W-2s, tax returns).</li>
                  <li>Down payment capacity ranging from 3% to 20% based on tier.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated Fixed-Rate Calculator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Fixed-Rate Payment Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Calculated specifically using the {annualInterestRate}% fixed interest rate.</p>
                </div>

                <div className="space-y-4 pt-2">
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
                    <label className="block text-xs font-bold text-navy mb-1">Loan Term</label>
                    <select 
                      value={loanTermYears} 
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                    >
                      <option value={30}>30 Years Fixed</option>
                      <option value={20}>20 Years Fixed</option>
                      <option value={15}>15 Years Fixed</option>
                    </select>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Estimated Monthly Payment</span>
                      <span className="text-2xl font-black text-silver-light">${calculateMonthlyPayment().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. Quick Contact Form Card (نموذج التواصل السريع مع reCAPTCHA) */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Send your basic contact details if you want our advisory team to call you back.</p>
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

              {/* 2. Form 1003 Navigation Card (نموذج التقدم الرسمي لمن اتخذ قراره) */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Ready to Proceed</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Apply via Form 1003</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Have you made your decision? Proceed directly to our official uniform residential loan application.
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