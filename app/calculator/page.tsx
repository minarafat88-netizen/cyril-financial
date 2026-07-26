"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Calculator, DollarSign, Percent, Calendar, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function AdvancedCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(1250000);
  const [downPayment, setDownPayment] = useState(250000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);

  // حساب مبلغ القرض
  const loanAmount = propertyPrice - downPayment;

  // حساب القسط الشهري (Principal & Interest)
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPayment = 
    (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) || 0;

  // تقدير الضرائب والتأمين الشهري
  const estimatedPropertyTax = (propertyPrice * 0.012) / 12;
  const estimatedInsurance = 350;
  const totalMonthlyPayment = monthlyPayment + estimatedPropertyTax + estimatedInsurance;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Calculator className="w-3.5 h-3.5" /> Financial Modeling Tool
            </div>
            <h1 className="text-3xl font-bold font-heading">Advanced Mortgage Calculator</h1>
            <p className="text-gray-300 text-sm mt-1">Estimate your commercial or residential monthly payments with custom financial parameters.</p>
          </div>
          <Link href="/">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Home
            </Button>
          </Link>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls Form (2 Columns) */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
            <h3 className="text-xl font-bold font-heading text-navy">Loan Parameters</h3>

            {/* Property Price */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate uppercase tracking-wider">Property Purchase Price</label>
                <span className="text-lg font-bold text-navy">${propertyPrice.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="100000" 
                max="10000000" 
                step="50000"
                value={propertyPrice} 
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full accent-emerald cursor-pointer"
              />
            </div>

            {/* Down Payment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate uppercase tracking-wider">Down Payment (${Math.round((downPayment/propertyPrice)*100)}%)</label>
                <span className="text-lg font-bold text-navy">${downPayment.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max={propertyPrice * 0.8} 
                step="25000"
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald cursor-pointer"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate uppercase tracking-wider">Interest Rate (APR)</label>
                <span className="text-lg font-bold text-navy">{interestRate}%</span>
              </div>
              <input 
                type="range" 
                min="3.0" 
                max="12.0" 
                step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-emerald cursor-pointer"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-2">
              <label className="text-block text-xs font-semibold text-slate uppercase tracking-wider mb-2 block">Loan Term Duration</label>
              <div className="grid grid-cols-3 gap-4">
                {[15, 20, 30].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setLoanTerm(term)}
                    className={`py-3 rounded-xl border text-sm font-bold transition-all ${
                      loanTerm === term 
                        ? "bg-navy text-white border-navy shadow-soft" 
                        : "bg-gray-50 text-slate border-gray-200 hover:border-emerald"
                    }`}
                  >
                    {term} Years Fixed
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Summary Card (1 Column) */}
          <div className="bg-navy text-white p-8 rounded-3xl shadow-luxury space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" /> Estimated Breakdown
              </div>

              <div>
                <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Total Monthly Payment</div>
                <div className="text-4xl font-bold text-gold mt-1">${Math.round(totalMonthlyPayment).toLocaleString()}</div>
                <div className="text-xs text-gray-400 mt-1">Includes P&I, taxes, and insurance</div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-700 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Principal & Interest:</span>
                  <span className="font-bold">${Math.round(monthlyPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Estimated Property Tax:</span>
                  <span className="font-bold">${Math.round(estimatedPropertyTax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Insurance & Escrow:</span>
                  <span className="font-bold">${estimatedInsurance}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-700">
                  <span className="text-gray-300">Net Loan Amount:</span>
                  <span className="font-bold text-emerald">${loanAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <Link href="/portal">
              <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-4 rounded-xl shadow-glass mt-6">
                Apply for This Loan Tier →
              </Button>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}