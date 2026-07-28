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
  Trees, 
  ShieldAlert, 
  Info,
  Sprout
} from "lucide-react";
import { MortgageCalculator } from "@/components/calculators/mortgage-calc";

export default function USDALoanPage() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaError, setCaptchaError] = useState<boolean>(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Captcha logic can be re-enabled if needed
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

              {/* Refactored USDA Payment Estimator Card */}
              <div className="bg-transparent rounded-3xl space-y-5">
                <MortgageCalculator loanType="usda" defaultHomePrice={250000} />
              </div>

              {/* 1. Quick Contact Form Card */}
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