"use client";

import React, { useState, useEffect, useCallback } from "react";

interface PaymentDetails {
  principal: number;
  monthlyPrincipalAndInterest: number;
  estimatedPropertyTax: number;
  estimatedInsurance: number;
  monthlyMIP: number;
  monthlyPMI: number;
  totalMonthlyPayment: number;
}

interface MortgageCalculatorProps {
  loanType?: string;
  defaultHomePrice?: number;
}

export function MortgageCalculator({ loanType, defaultHomePrice = 500000 }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState<number>(defaultHomePrice);
  const [downPayment, setDownPayment] = useState<number>(homePrice * 0.2);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCalculation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purchasePrice: homePrice,
          downPayment: downPayment,
          interestRate: interestRate,
          loanTermYears: loanTerm,
          loanType: loanType,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Calculation failed.");
      }

      setPaymentDetails(result.data);
    } catch (e: any) {
      setError(e.message);
      setPaymentDetails(null);
    } finally {
      setIsLoading(false);
    }
  }, [homePrice, downPayment, interestRate, loanTerm, loanType]);

  useEffect(() => {
    // Adjust down payment if home price changes
    setDownPayment(prev => Math.min(prev, homePrice));
  }, [homePrice]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (homePrice > 0 && downPayment >= 0 && interestRate > 0 && loanTerm > 0) {
        fetchCalculation();
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [homePrice, downPayment, interestRate, loanTerm, fetchCalculation]);

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
            <span>${downPayment.toLocaleString()} ({homePrice > 0 ? (downPayment / homePrice * 100).toFixed(0) : 0}%)</span>
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
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h4 className="text-sm font-bold text-silver-dark uppercase tracking-wider mb-4">
            Estimated Monthly Payment
          </h4>
          
          {isLoading && <div className="text-2xl font-bold text-silver-light animate-pulse">Calculating...</div>}
          {error && <div className="text-sm font-bold text-red-400">{error}</div>}
          
          {paymentDetails && !isLoading && !error && (
            <div>
              <div className="text-4xl font-black text-silver-light mb-4">
                ${paymentDetails.totalMonthlyPayment.toLocaleString()}
                <span className="text-base font-normal text-silver-dark">/mo</span>
              </div>
              <div className="space-y-2 text-xs text-silver-dark border-t border-white/10 pt-4">
                <div className="flex justify-between"><span>Principal & Interest</span> <span className="font-bold text-silver-light">${paymentDetails.monthlyPrincipalAndInterest.toLocaleString()}</span></div>
                {paymentDetails.monthlyMIP > 0 && (
                  <div className="flex justify-between text-amber-300">
                    <span>Mortgage Insurance (MIP)</span>
                    <span className="font-bold text-amber-200">${paymentDetails.monthlyMIP.toLocaleString()}</span>
                  </div>
                )}
                {paymentDetails.monthlyPMI > 0 && (
                   <div className="flex justify-between text-amber-300">
                    <span>Private Mortgage Insurance (PMI)</span>
                    <span className="font-bold text-amber-200">${paymentDetails.monthlyPMI.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between"><span>Property Tax (Est.)</span> <span className="font-bold text-silver-light">${paymentDetails.estimatedPropertyTax.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Home Insurance (Est.)</span> <span className="font-bold text-silver-light">${paymentDetails.estimatedInsurance.toLocaleString()}</span></div>
              </div>
            </div>
          )}
          
          <button className="w-full bg-silver-button text-navy font-bold py-3 rounded-xl text-sm shadow-md hover:brightness-105 active:scale-95 transition-all mt-8">
            Get Exact Rate
          </button>
        </div>
      </div>

    </div>
  );
}

export const AdvancedMortgageCalculator = MortgageCalculator;