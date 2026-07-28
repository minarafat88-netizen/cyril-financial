"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Key, 
  Calculator, 
  ArrowRight, 
  CheckCircle2, 
  FileSpreadsheet, 
  ShieldCheck, 
  Search, 
  FileCheck, 
  BadgeCheck 
} from "lucide-react";

export default function PurchasePage() {
  // حاسبة القدرة الشرائية المعتمدة على الدخل
  const [monthlyIncome, setMonthlyIncome] = useState<number>(8500);
  const [monthlyDebts, setMonthlyDebts] = useState<number>(500);
  const [downPayment, setDownPayment] = useState<number>(25000);

  // تقدير الحد الأقصى لسعر المنزل بناءً على DTI بنسبة 36%
  const calculateAffordability = () => {
    const maxMonthlyHousing = (monthlyIncome * 0.36) - monthlyDebts;
    if (maxMonthlyHousing <= 0) return 0;
    // تقدير تقريبي للمبلغ الذي يمكن اقتراضه بفائدة 6.5% لمده 30 سنة + الدفعة الأولى
    const estimatedLoan = maxMonthlyHousing * 155; 
    return Math.round(estimatedLoan + downPayment);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <Key className="w-4 h-4 text-emerald-400" /> Home Purchase Financing
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Buy Your Dream Home with Confidence
            </h1>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl leading-relaxed">
              Get verified Pre-Approval in minutes, make competitive offers, and secure the ideal mortgage rates tailored for your home purchase.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link href="/apply/form-1003">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-xs shadow-lg flex items-center gap-2">
                  Get Pre-Approved Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Content: Steps & Best Loan Options */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Process Section */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-navy">The Home Buying Process</h2>
                <p className="text-gray-500 text-xs leading-relaxed">
                  Navigating your home purchase is simple when you have Cyril Financial backing your offer from pre-approval to closing.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    { step: "01", title: "Get Pre-Approved", desc: "Submit your basic financial profile via Form 1003 to receive an official Pre-Approval Letter." },
                    { step: "02", title: "Find Your Home", desc: "Shop with confidence knowing your exact purchasing power and budget boundaries." },
                    { step: "03", title: "Lock Your Rate", desc: "Select your preferred mortgage program and lock in a competitive interest rate." },
                    { step: "04", title: "Underwrite & Close", desc: "Our underwriting team finalizes your verification for a smooth on-time closing." }
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

              {/* Best Purchase Programs */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
                <h2 className="text-2xl font-bold text-navy">Top Purchase Mortgage Programs</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">3% Down Payment</span>
                    <h4 className="text-base font-bold text-navy">Conventional Loan</h4>
                    <p className="text-gray-500 text-xs">Ideal for buyers with strong credit looking for low down payment options.</p>
                  </div>

                  <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-2">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">3.5% Down Payment</span>
                    <h4 className="text-base font-bold text-navy">FHA Loan</h4>
                    <p className="text-gray-500 text-xs">Flexible credit guidelines for first-time buyers with moderate savings.</p>
                  </div>

                  <div className="p-5 bg-purple-50/50 rounded-2xl border border-purple-100 space-y-2">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">0% Down Payment</span>
                    <h4 className="text-base font-bold text-navy">VA Loan</h4>
                    <p className="text-gray-500 text-xs">Exclusive 100% financing benefits for active duty military & veterans.</p>
                  </div>

                  <div className="p-5 bg-amber-50/50 rounded-2xl border border-amber-100 space-y-2">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Luxury Properties</span>
                    <h4 className="text-base font-bold text-navy">Jumbo Loan</h4>
                    <p className="text-gray-500 text-xs">Custom high-value financing for home amounts exceeding standard limits.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Sidebar: Affordability Calculator & Quick Application */}
            <div className="lg:col-span-5 space-y-6">
             
              {/* Home Affordability Calculator */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Purchase Power</span>
                  <h3 className="text-xl font-bold text-navy mt-1">How Much Home Can You Afford?</h3>
                  <p className="text-gray-500 text-xs mt-1">Estimate your maximum purchasing power based on gross income.</p>
                </div>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Gross Monthly Income ($)</label>
                    <input 
                      type="number" 
                      value={monthlyIncome} 
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Monthly Existing Debts ($)</label>
                    <input 
                      type="number" 
                      value={monthlyDebts} 
                      onChange={(e) => setMonthlyDebts(Number(e.target.value))}
                      placeholder="Car loans, credit cards, etc."
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1">Saved Down Payment ($)</label>
                    <input 
                      type="number" 
                      value={downPayment} 
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-navy outline-none" 
                    />
                  </div>
                  <div className="bg-navy text-white p-5 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-300 uppercase tracking-wider block">Estimated Home Budget</span>
                      <span className="text-2xl font-black text-silver-light">${calculateAffordability().toLocaleString()}</span>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-silver" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Form 1003 Purchase Hub */}
              <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Official Pre-Approval</span>
                  <h3 className="text-xl font-bold text-navy mt-1">Start Your Application</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Ready to make an offer? Submit Form 1003 to receive your official Pre-Approval letter.
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