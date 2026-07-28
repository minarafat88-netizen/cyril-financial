"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Send, 
  FileSpreadsheet, 
  Building2, 
  ShieldAlert, 
  Info,
} from "lucide-react";
import { MortgageCalculator } from "@/components/calculators/mortgage-calc";

export default function ConformingConventionalLoanPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Captcha logic can be re-enabled if needed
    setCaptchaError(false);
    alert("Contact details submitted successfully! A conventional mortgage specialist will reach out to you shortly.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">

          {/* Header Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Building2 className="w-4 h-4 text-emerald-400" /> Standard Industry Benchmark
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white">
              Conforming Conventional Loans
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Flexible, highly competitive mortgages that strictly align with Fannie Mae and Freddie Mac guidelines—offering low down payment options starting as low as 3%.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Overview, In-depth Details & Requirements */}
            <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-navy">Program Overview & Guidelines</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Conforming Conventional Mortgages are institutional loans that meet the financing limits and underwriting criteria established by the Federal Housing Finance Agency (FHFA) and backed by Fannie Mae and Freddie Mac. Because they adhere to these standardized secondary market guidelines, they feature some of the most competitive interest rates and terms in the mortgage industry.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Unlike government-backed loans (such as FHA), Private Mortgage Insurance (PMI) on a conventional loan is **not permanent**. Once you reach 20% equity in your property, PMI can be completely canceled, significantly reducing your long-term monthly housing cost.
                </p>
              </div>

              {/* Conforming Limits & PMI Special Box */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">FHFA Limits & Private Mortgage Insurance (PMI)</h4>
                <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 space-y-3 text-xs text-gray-700">
                  <div className="flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-navy block">Baseline Conforming Loan Limits & Key Features:</span>
                      Conforming loans adhere to strict price limits set annually by FHFA ($806,500+ baseline for single-family units, higher in high-cost counties):
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 pl-2 text-gray-600">
                    <li><strong className="text-navy">PMI Cancellation Advantage:</strong> Private Mortgage Insurance automatically terminates when your Loan-to-Value (LTV) reaches 78% (or requestable at 80% LTV).</li>
                    <li><strong className="text-navy">First-Time Homebuyer Perks:</strong> Special programs allow down payments as low as 3% with reduced PMI premiums.</li>
                    <li><strong className="text-navy">Property Flexibility:</strong> Eligible for primary residences, second/vacation homes, and 1-4 unit investment properties.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Benefits & Advantages</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    "Down payments starting as low as 3% for qualifying buyers",
                    "No lifetime mortgage insurance requirement (PMI drop at 20% equity)",
                    "Available in 10, 15, 20, and 30-year fixed or adjustable terms",
                    "Higher loan limits compared to standard FHA caps in many counties",
                    "Usable for primary homes, second homes, and residential investment properties"
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
                  <li><strong className="text-navy">Credit Score:</strong> Minimum 620 FICO score (740+ recommended for optimal interest rates and lower PMI rates).</li>
                  <li><strong className="text-navy">Debt-to-Income (DTI):</strong> Maximum DTI ratio up to 43%–45% (up to 50% with Automated Underwriting System approval).</li>
                  <li><strong className="text-navy">Loan Limit Compliance:</strong> Total loan amount must not exceed current FHFA baseline conforming limits.</li>
                  <li><strong className="text-navy">Income Documentation:</strong> 2 years of verifiable employment history (W-2s, 1099s, tax returns, pay stubs).</li>
                  <li><strong className="text-navy">Property Appraisal:</strong> Standard Fannie Mae / Freddie Mac full appraisal required.</li>
                </ul>
              </div>

            </div>

            {/* Interactive Calculator, Quick Contact & Form 1003 Hub */}
            <div className="lg:col-span-5 space-y-6">

              {/* Refactored Conforming Loan Estimator */}
              <div className="bg-transparent rounded-3xl space-y-5">
                <MortgageCalculator defaultHomePrice={500000} />
              </div>

              {/* 1. Quick Contact Form Card */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Initial Consultation</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Connect With an Advisor</h3>
                  <p className="text-gray-500 text-xs mt-1">Check your eligibility against FHFA conforming limits and low down payment options.</p>
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

                  {captchaError && (
                      <span className="text-[11px] text-red-500 font-bold mt-1 flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5" /> Please complete the verification.
                      </span>
                  )}

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
                    Ready to submit your application? Proceed directly to our secure uniform residential loan application.
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