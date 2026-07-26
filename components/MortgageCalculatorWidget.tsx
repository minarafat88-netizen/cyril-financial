"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function MortgageCalculatorWidget() {
  const [propertyPrice, setPropertyPrice] = useState(1000000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanTerm, setLoanTerm] = useState(30);

  const loanAmount = propertyPrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment = 
    (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1) || 0;

  const estimatedTax = (propertyPrice * 0.012) / 12;
  const totalMonthly = monthlyPayment + estimatedTax + 350;

  return (
    <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald/10 text-emerald rounded-2xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-heading text-navy">Quick Mortgage Estimator</h3>
          <p className="text-xs text-slate">Calculate your monthly financing commitments instantly.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate uppercase tracking-wider mb-1">
              <span>Property Price</span>
              <span className="text-navy">${propertyPrice.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="200000" 
              max="5000000" 
              step="50000"
              value={propertyPrice} 
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-full accent-emerald cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate uppercase tracking-wider mb-1">
              <span>Down Payment</span>
              <span className="text-navy">${downPayment.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={propertyPrice * 0.7} 
              step="25000"
              value={downPayment} 
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-emerald cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate uppercase tracking-wider mb-1">
              <span>Interest Rate (APR)</span>
              <span className="text-navy">{interestRate}%</span>
            </div>
            <input 
              type="range" 
              min="3.0" 
              max="10.0" 
              step="0.1"
              value={interestRate} 
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-emerald cursor-pointer"
            />
          </div>
        </div>

        {/* Output Box */}
        <div className="bg-navy text-white p-6 rounded-2xl flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Estimated Monthly Payment</div>
            <div className="text-3xl font-bold text-gold mt-1">${Math.round(totalMonthly).toLocaleString()}</div>
            <div className="text-[11px] text-gray-400 mt-0.5">Includes principal, interest, taxes & insurance</div>
          </div>

          <div className="space-y-1 text-xs pt-3 border-t border-gray-700">
            <div className="flex justify-between text-gray-300">
              <span>Loan Amount:</span>
              <span className="font-bold text-white">${loanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Term:</span>
              <span className="font-bold text-white">{loanTerm} Years Fixed</span>
            </div>
          </div>

          <Link href="/calculator">
            <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2">
              Advanced Calculator <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}