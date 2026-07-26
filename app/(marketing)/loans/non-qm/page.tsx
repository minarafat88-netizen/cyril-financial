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
  Briefcase, 
  ShieldAlert, 
  Info,
  BadgePercent,
  FileText
} from "lucide-react";

export default function NonQMLoanPage() {
  // حالات الحاسبة المخصصة لقرض Non-QM Loans
  const [loanAmount, setLoanAmount] = useState<number>(600000);
  const [docType, setDocType] = useState<string>("bank-statement");
  const [isInterestOnly, setIsInterestOnly] = useState<boolean>(false);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);

  // تحديد نسبة الفائدة المرجعية بناءً على نوع التوثيق البديل
  const getInterestRate = () => {
    switch(docType) {
      case "bank-statement": return 7.125;
      case "dscr": return 7.375;
      case "asset-depletion": return 6.875;
      default: return 7.125;
    }
  };

  const annualInterestRate = getInterestRate();

  // حالة reCAPTCHA
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  // حساب القسط الشهري (سواء كان Interest-Only أو أصل وفائدة)
  const calculateMonthlyPayment = () => {
    if (isInterestOnly) {
      // حساب الفائدة الشهرية فقط
      return Math.round((loanAmount * (annualInterestRate / 100)) / 12);
    }

    const monthlyRate = annualInterestRate / 100 / 12;
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
    alert("Contact details submitted successfully! A Non-QM specialist will review your financial profile shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Briefcase className="w-4 h-4 text-emerald-400" /> Alternative Qualification Solutions
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              Non-QM Mortgages
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Flexible non-qualified mortgages tailored for self-employed entrepreneurs, real estate investors, and borrowers requiring alternative income documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Alternative Underwriting</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A Non-Qualified Mortgage (Non-QM) is a home loan that falls outside the rigid underwriting criteria set by the Consumer Financial Protection Bureau (CFPB) for government-backed and conventional loans. Rather than relying solely on traditional tax returns and W-2 statements, Non-QM programs evaluate borrower solvency using alternative financial metrics such as bank statements, asset depletion, or property rental cash flows (DSCR).
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Non-QM loans empower business owners and real estate portfolio holders to secure premier residential financing based on their true economic strength.
                </p>
              </div>

              {/* Documentation Pathways Special Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Non-QM Alternative Documentation Pathways</h4>
                <div className="bg-blue-50/60 p-5 rounded-2xl border border-blue-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Three Popular Non-QM Income Verification Models:</span>
                      Select the qualification model that best matches your financial structure:
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">Bank Statement Program:</strong> Qualify using 12 or 24 months of personal or business bank statements (no tax returns required).</li>
                    <li><strong className="text-navy">DSCR Investor Loans:</strong> Qualify purely on the property's rental income coverage ratio (Rental Income ÷ PITI Debt Payment).</li>
                    <li><strong className="text-navy">Asset Depletion:</strong> Convert liquid investment, stock, or cash assets into amortized qualifying monthly income.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Strategic Advantages</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "No tax returns or W-2s required for bank statement qualification",
                    "Interest-Only payment options available to minimize initial cash outflows",
                    "Shortened seasoning periods following prior credit events (bankruptcy/foreclosure)",
                    "DTI flexibility exceeding standard 43%–50% limits",
                    "Financing available for foreign nationals and non-resident real estate buyers"
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Eligibility & Qualification Criteria</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                  <li><strong className="text-navy">Credit Score:</strong> Minimum FICO credit score starting at 620 to 660+ depending on documentation type.</li>
                  <li><strong className="text-navy">Down Payment:</strong> Minimum down payment generally ranges from 10% to 20%.</li>
                  <li><strong className="text-navy">Business Ownership:</strong> Self-employed borrowers must verify 2+ years of business operation.</li>
                  <li><strong className="text-navy">Post-Closing Reserves:</strong> 3 to 12 months of liquid post-closing reserves required based on loan size.</li>
                  <li><strong className="text-navy">Property Eligibility:</strong> Primary homes, second homes, and 1-4 unit investment properties.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dedicated Non-QM Payment Estimator Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Custom Calculator</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Non-QM Payment Estimator</h3>
                  <p className="text-gray-500 text-xs mt-1">Includes Interest-Only toggles and alternative documentation rate adjustments.</p>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Documentation Pathway</label>
                    <select 
                      value={docType} 
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                    >
                      <option value="bank-statement">12-24 Mo Bank Statements (@ 7.125%)</option>
                      <option value="dscr">DSCR Investor Loan (@ 7.375%)</option>
                      <option value="asset-depletion">Asset Depletion Program (@ 6.875%)</option>
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

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Payment Structure</label>
                      <select 
                        value={isInterestOnly ? "io" : "amortized"} 
                        onChange={(e) => setIsInterestOnly(e.target.value === "io")}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy"
                      >
                        <option value="amortized">Principal & Interest</option>
                        <option value="io">Interest-Only Option</option>
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

                  <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">
                        {isInterestOnly ? "Interest-Only Monthly Payment" : "Estimated Amortized Payment"}
                      </span>
                      <span className="text-2xl font-black text-silver-light">${calculateMonthlyPayment().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-400 text-center italic">* Rate estimated at {annualInterestRate}% for selected documentation program.</p>
                </div>
              </div>

              {/* 1. Quick Contact Form Card with reCAPTCHA */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Discuss bank statement income calculations or DSCR coverage ratios with a specialist.</p>
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
                    <label className="block text-xs font-bold text-navy mb-1">Employment / Investor Status</label>
                    <input type="text" placeholder="Self-Employed / Business Owner / Investor" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy" />
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
                    Ready to initiate your Non-QM underwriting? Proceed directly to our uniform residential loan application.
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