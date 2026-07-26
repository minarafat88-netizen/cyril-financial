"use client";

import React, { useState, useEffect } from "react";

export function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(500000);
  const [downPayment, setDownPayment] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    // حساب القسط الشهري للرهن العقاري
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (principal > 0 && monthlyRate > 0) {
      const payment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    } else {
      setMonthlyPayment(0);
    }
  }, [homePrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col md:flex-row gap-8 items-start">
      
      {/* Inputs Section */}
      <div className="w-full md:w-3/5 space-y-6">
        <h3 className="text-xl font-bold text-navy mb-4">Calculate Your Payment</h3>
        
        <div>
          <label className="flex justify-between text-xs font-bold text-navy uppercase tracking-wider mb-2">
            <span>Home Price</span>
            <span>${homePrice.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min="100000"
            max="3000000"
            step="10000"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy"
          />
        </div>

        <div>
          <label className="flex justify-between text-xs font-bold text-navy uppercase tracking-wider mb-2">
            <span>Down Payment</span>
            <span>${downPayment.toLocaleString()} ({(downPayment / homePrice * 100).toFixed(0)}%)</span>
          </label>
          <input
            type="range"
            min="0"
            max={homePrice}
            step="5000"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-navy"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-sm font-bold text-navy focus:ring-2 focus:ring-navy outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">Loan Term (Years)</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-2.5 bg-surface border border-gray-200 rounded-xl text-sm font-bold text-navy focus:ring-2 focus:ring-navy outline-none"
            >
              <option value={15}>15 Years</option>
              <option value={20}>20 Years</option>
              <option value={30}>30 Years</option>
            </select>
          </div>
        </div>
      </div>

      {/* Output / Result Section */}
      <div className="w-full md:w-2/5 bg-navy p-6 rounded-2xl text-white shadow-icon-emboss relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-silver-dark uppercase tracking-wider mb-6">
            Estimated Monthly Payment
          </h4>
          <div className="text-4xl font-black text-silver-light mb-2">
            ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-xs text-silver-dark mb-8">
            Principal & Interest only. Does not include taxes, insurance, or HOA fees.
          </p>
          
          <button className="w-full bg-silver-button text-navy font-bold py-3 rounded-xl text-sm shadow-md hover:brightness-105 active:scale-95 transition-all">
            Get Exact Rate
          </button>
        </div>
      </div>

    </div>
  );
}

export const AdvancedMortgageCalculator = MortgageCalculator;