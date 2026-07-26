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
  Gem, 
  ShieldAlert, 
  Info,
  Building
} from "lucide-react";

export default function JumboLoanPage() {
  // حالات الحاسبة المخصصة لقرض Jumbo Loans (أحجام مبالغ مرتفعة)
  const [homeValue, setHomeValue] = useState<number>(1250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const annualInterestRate = 6.625; // نسبة الفائدة المتوسطة لقروض الجامبو

  // حساب مبلغ القرض الفعلي
  const calculatedLoanAmount = homeValue - (homeValue * (downPaymentPercent / 100));

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري للأصل والفائدة (Principal & Interest)
  const calculateMonthlyPayment = () => {
    const monthlyRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    if (monthlyRate === 0) return calculatedLoanAmount / totalPayments;
    const payment =
      (calculatedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
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
    alert("Contact details submitted successfully! A Jumbo mortgage specialist will reach out to you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Gem className="w-4 h-4 text-emerald-400" /> High-Value Premier Financing
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              Jumbo Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Customized luxury financing designed for high-value properties that exceed FHFA conforming limits—offering competitive fixed and adjustable interest rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Luxury Guidelines</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A Jumbo Loan is a non-conforming mortgage that exceeds the baseline loan purchasing limits set annually by the Federal Housing Finance Agency (FHFA) for Fannie Mae and Freddie Mac. Because these loans cannot be purchased or guaranteed by government-sponsored enterprises, they carry specialized underwriting requirements tailored for high-net-worth borrowers acquiring premium primary homes, secondary residences, or luxury investment properties.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  At Cyril Financial, our Jumbo mortgage programs provide competitive interest rates paired with flexible structural choices (15-year fixed, 30-year fixed, or ARM products), enabling high-tier financing with clarity and precision.
                </p>
              </div>

              {/* Reserves & Appraisal Rules Special Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Post-Closing Reserves & Appraisal Policies</h4>
                <div className="bg-purple-50/60 p-5 rounded-2xl border border-purple-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Key Jumbo Risk & Underwriting Standards:</span>
                      Because Jumbo loans represent higher financial exposure for lenders, qualification focuses heavily on liquidity and verified property valuation:
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Post-Closing Reserves Requirement:</strong> Borrowers must demonstrate liquid asset reserves covering 6 to 12 months of Principal, Interest, Taxes, and Insurance (PITI).</li>
                    <li><strong className="text-navy">Dual Appraisal Threshold:</strong> High-value transactions (typically over $1.5M - $2M) may require two independent property appraisals to verify market value.</li>
                    <li><strong className="text-navy">Asset Documentation:</strong> Full verification of liquid assets, investment portfolios, retirement accounts, and personal financial statements.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Program Features</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Financing available for high-value loans exceeding standard FHFA caps ($806,500+)",
                    "Competitive interest rates closely aligned with conventional benchmarks",
                    "Down payment options starting as low as 10% to 15% for qualified borrowers",
                    "Available for primary luxury homes, vacation homes, and high-end investments",
                    "Choice between Fixed-Rate and Adjustable-Rate Mortgage (ARM) options"
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
                  <li><strong className="text-navy">Credit Score:</strong> Minimum FICO credit score of 700 to 720+ (740+ recommended for best rates).</li>
                  <li><strong className="text-navy">Debt-to-Income (DTI):</strong> Strict DTI limits, generally capped between 38% and 43%.</li>
                  <li><strong className="text-navy">Down Payment:</strong> Minimum 10% to 20% down payment depending on total loan amount tier.</li>
                  <li><strong className="text-navy">Liquid Asset Reserves:</strong> Verified liquid funds covering 6–12 months of PITI payments after closing costs.</li>
                  <li><strong className="text-navy">Tax & Income Verification:</strong> 2 complete years of personal and business tax returns, W-2s, and recent statements.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated Jumbo Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-purple-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Jumbo Loan Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Estimates monthly payments for high-value non-conforming properties.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Luxury Property Price ($)</label>
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
                        <option value={10}>10% Down</option>
                        <option value={15}>15% Down</option>
                        <option value={20}>20% Down (Standard)</option>
                        <option value={25}>25% Down</option>
                        <option value={30}>30% Down</option>
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
                      <span>Calculated Jumbo Loan:</span>
                      <span className="font-bold text-navy">${calculatedLoanAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>Required Down Payment:</span>
                      <span className="font-semibold text-navy">${(homeValue * (downPaymentPercent / 100)).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Estimated P&I Payment</span>
                      <span className="text-2xl font-black text-silver-light">${calculateMonthlyPayment().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Calculated at {annualInterestRate}% baseline Jumbo interest rate.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Speak with a dedicated Jumbo mortgage specialist regarding reserve planning and rates.</p>
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
                    Ready to initiate your luxury mortgage underwriting? Proceed directly to our secure uniform application.
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