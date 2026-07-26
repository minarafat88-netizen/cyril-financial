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
  Award, 
  ShieldAlert, 
  Info,
  Medal,
  Check
} from "lucide-react";

export default function VALoanPage() {
  // حالات الحاسبة المخصصة لقرض VA Loans
  const [homeValue, setHomeValue] = useState<number>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(0); // افتراضياً 0%
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const annualInterestRate = 5.75; // نسبة الفائدة المتوسطة لقروض VA (عادة من الأقل في السوق)

  // حساب رسم التمويل الفيدرالي (VA Funding Fee Rate) بناءً على الدفعة الأولى (الاستخدام الأول)
  const getFundingFeeRate = () => {
    if (downPaymentPercent >= 10) return 0.0125; // 1.25%
    if (downPaymentPercent >= 5) return 0.015;   // 1.50%
    return 0.0215;                               // 2.15% (0% down payment)
  };

  const baseLoanAmount = homeValue - (homeValue * (downPaymentPercent / 100));
  const vaFundingFeeAmount = baseLoanAmount * getFundingFeeRate();
  const totalLoanAmountWithFee = baseLoanAmount + vaFundingFeeAmount;

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري للأصل والفائدة (P&I) بعد إضافة رسم التمويل
  const calculateMonthlyPI = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return totalLoanAmountWithFee / totalPayments;
    const payment =
      (totalLoanAmountWithFee * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
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
    alert("Contact details submitted successfully! A VA loan specialist will reach out to verify your COE and options.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-emerald-400" /> Exclusive Military Benefit
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              VA Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Honoring active-duty service members, veterans, and eligible surviving spouses with 0% down payment financing and zero monthly private mortgage insurance (PMI).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Military Benefits</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A VA Loan is a home mortgage guaranteed by the U.S. Department of Veterans Affairs (VA). Designed specifically to serve those who have served their country, VA loans represent one of the most powerful home buying programs in America, allowing qualified military personnel and veterans to purchase a home with zero down payment and highly flexible credit terms.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Unlike conventional and FHA mortgages, VA loans do **not** require monthly private mortgage insurance (PMI), resulting in significantly lower monthly payments for borrowers.
                </p>
              </div>

              {/* VA Funding Fee Explanation Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Understanding the One-Time VA Funding Fee</h4>
                <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">One-Time Fee to Protect Taxpayers & Support Program:</span>
                      Instead of monthly insurance, the VA assesses a one-time funding fee (typically 1.25% to 2.15% for first-time use):
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Financed into Loan:</strong> The fee is rolled directly into your loan balance at closing so you do not need cash out of pocket.</li>
                    <li><strong className="text-navy">Exemption Eligibility:</strong> Veterans with service-connected disabilities or purple heart recipients are completely exempt from this fee.</li>
                    <li><strong className="text-navy">Lower Fees with Down Payment:</strong> Putting down 5% or 10% further reduces the funding fee percentage.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Standout Features</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "0% down payment required on primary home purchases",
                    "NO monthly Private Mortgage Insurance (PMI) premiums ever",
                    "Consistently lower interest rates compared to standard conventional loans",
                    "Capped closing costs and strict limit on allowable fee charges",
                    "No prepayment penalties for paying off or refinancing early"
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Eligibility & Service Requirements</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li><strong className="text-navy">Certificate of Eligibility (COE):</strong> Must possess or qualify for an official VA Certificate of Eligibility.</li>
                  <li><strong className="text-navy">Service Duration:</strong> 90 consecutive days of active duty during wartime, or 181 days during peacetime, or 6+ years in National Guard/Reserves.</li>
                  <li><strong className="text-navy">Credit Guidelines:</strong> No strict statutory minimum credit score, though lenders typically look for 580–620+.</li>
                  <li><strong className="text-navy">Primary Residence Only:</strong> Property must be owner-occupied as your main home.</li>
                  <li><strong className="text-navy">VA Minimum Property Requirements (MPRs):</strong> Property must pass standard VA appraisal safety & structural criteria.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated VA Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">VA Loan Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Calculates monthly payments with 0% down and financed VA Funding Fee.</p>
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
                        <option value={0}>0% (VA Standard)</option>
                        <option value={5}>5% Down</option>
                        <option value={10}>10% Down</option>
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
                      <span>+ Financed VA Funding Fee ({(getFundingFeeRate() * 100).toFixed(2)}%):</span>
                      <span className="font-semibold text-navy">+${Math.round(vaFundingFeeAmount).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold border-t pt-1">
                      <span>Monthly PMI Cost:</span>
                      <span>$0.00 (NO PMI)</span>
                    </div>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Estimated Monthly P&I Payment</span>
                      <span className="text-2xl font-black text-silver-light">${calculateMonthlyPI().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Calculated at {annualInterestRate}% baseline VA interest rate.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Send your details to obtain or verify your VA Certificate of Eligibility (COE).</p>
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
                    Ready to initiate your official military loan application? Proceed directly to our uniform application.
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