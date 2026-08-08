"use client";

import React, { useState, useMemo } from 'react';
import { Calculator, Info, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface LoanCalculatorProps {
  loanType: string;
  defaultInterestRate: number;
  loanName: string;
}

export function LoanCalculator({ loanType, defaultInterestRate, loanName }: LoanCalculatorProps) {
  const [homeValue, setHomeValue] = useState<number>(350000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(loanType === 'FHA' ? 3.5 : (loanType === 'VA' ? 0 : 10));
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2); // Default annual property tax rate
  const [homeInsurance, setHomeInsurance] = useState<number>(1500); // Default annual home insurance

  const {
    baseLoanAmount,
    upfrontMIP,
    totalLoanAmount,
    monthlyPI,
    monthlyTaxes,
    monthlyInsurance,
    monthlyMIP,
    amortizationData,
    totalMonthlyPayment,
  } = useMemo(() => {
    const downPaymentAmount = homeValue * (downPaymentPercent / 100);
    const baseLoanAmount = homeValue - downPaymentAmount;

    let upfrontMIP = 0;
    let monthlyMIP = 0;
    let totalLoanAmount = baseLoanAmount;

    // FHA loan specific calculations
    if (loanType === 'FHA') {
      upfrontMIP = baseLoanAmount * 0.0175; // 1.75% UFMIP
      totalLoanAmount = baseLoanAmount + upfrontMIP;
      monthlyMIP = Math.round((baseLoanAmount * 0.0055) / 12); // ~0.55% annual MIP
    }

    // Calculate monthly principal & interest (P&I)
    const monthlyRate = defaultInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    let monthlyPI = 0;
    if (totalLoanAmount > 0 && totalPayments > 0) {
      if (monthlyRate === 0) {
        monthlyPI = totalLoanAmount / totalPayments;
      } else {
        monthlyPI =
          (totalLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
          (Math.pow(1 + monthlyRate, totalPayments) - 1);
      }
    }

    const monthlyTaxes = (homeValue * (propertyTaxRate / 100)) / 12;
    const monthlyInsurance = homeInsurance / 12;

    const totalMonthlyPayment = monthlyPI + monthlyMIP + monthlyTaxes + monthlyInsurance;

    // Calculate amortization schedule for the chart
    const amortizationData = [];
    let remainingBalance = totalLoanAmount;
    for (let i = 1; i <= totalPayments; i++) {
      const interestForMonth = remainingBalance * monthlyRate;
      const principalForMonth = monthlyPI - interestForMonth;
      remainingBalance -= principalForMonth;

      // Add a data point every 12 months (annually) to simplify the chart
      if (i % 12 === 0 || i === 1) {
        amortizationData.push({
          year: Math.floor(i / 12),
          interest: Math.round(interestForMonth * 12), // Annual interest
          principal: Math.round(principalForMonth * 12), // Annual principal
          balance: remainingBalance > 0 ? Math.round(remainingBalance) : 0,
        });
      }
    }

    return {
      baseLoanAmount,
      upfrontMIP,
      totalLoanAmount,
      monthlyPI: Math.round(monthlyPI),
      monthlyTaxes: Math.round(monthlyTaxes),
      monthlyInsurance: Math.round(monthlyInsurance),
      monthlyMIP,
      amortizationData,
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
    };
  }, [homeValue, downPaymentPercent, loanTermYears, defaultInterestRate, loanType, propertyTaxRate, homeInsurance]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-5">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">Payment Estimator</span>
        <h3 className="text-xl font-bold text-navy mt-1">{loanName} Calculator</h3>
        <p className="text-gray-500 text-xs mt-1">Estimate your monthly payments.</p>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-bold text-navy mb-1">Home Purchase Price ($)</label>
          <input type="number" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-navy mb-1">Down Payment (%)</label>
            <input type="number" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy mb-1">Loan Term</label>
            <select value={loanTermYears} onChange={(e) => setLoanTermYears(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy">
              <option value={30}>30 Years Fixed</option>
              <option value={15}>15 Years Fixed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-navy mb-1">Property Tax (%)</label>
            <input type="number" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" />
          </div>
          <div>
            <label className="block text-xs font-bold text-navy mb-1">Home Insurance ($)</label>
            <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-navy font-bold text-navy" />
          </div>
        </div>

        {loanType === 'FHA' && (
          <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Base Loan Amount:</span>
              <span className="font-bold text-navy">${baseLoanAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-[11px]">
              <span>+ Financed Upfront MIP (1.75%):</span>
              <span className="font-semibold text-navy">+${upfrontMIP.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-amber-600 font-medium">
              <span>Est. Monthly MIP:</span>
              <span>+${monthlyMIP}/mo</span>
            </div>
          </div>
        )}

        {/* Monthly payment details */}
        <div className="space-y-1.5 text-xs border-t border-b border-gray-100 py-3">
          <div className="flex justify-between text-gray-500"><span>Principal & Interest</span><span className="font-bold text-navy">${monthlyPI.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-500"><span>Property Taxes</span><span className="font-bold text-navy">${monthlyTaxes.toLocaleString()}</span></div>
          <div className="flex justify-between text-gray-500"><span>Home Insurance</span><span className="font-bold text-navy">${monthlyInsurance.toLocaleString()}</span></div>
          {monthlyMIP > 0 && (
            <div className="flex justify-between text-amber-600">
              <span>Mortgage Insurance (MIP)</span>
              <span className="font-bold">${monthlyMIP.toLocaleString()}</span>
            </div>
          )}
        </div>

        <div className="bg-navy text-white p-4 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-gray-300 uppercase tracking-wider block">
              Est. Total Monthly Payment (PITI)
            </span>
            <span className="text-2xl font-black text-silver-light">${totalMonthlyPayment.toLocaleString()}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-silver" />
          </div>
        </div>
        <p className="text-[10px] text-gray-400 text-center italic">
          * Estimated at {defaultInterestRate}% interest rate. For illustrative purposes only.
        </p>

        {/* New chart section */}
        <div className="pt-4">
           <h4 className="text-xs font-bold text-navy mb-2">Loan Balance Over Time</h4>
           <div style={{ width: '100%', height: 200 }}>
            <ResponsiveContainer>
              <AreaChart
                data={amortizationData}
                margin={{ top: 5, right: 20, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 10 }} unit="y" />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(value) => `$${(Number(value) / 1000)}k`} />
                <Tooltip
                  contentStyle={{ fontSize: '10px', padding: '5px', borderRadius: '8px', border: '1px solid #eee' }}
                  formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === 'balance' ? 'Remaining Balance' : '']}
                />
                <Legend 
                  iconType="circle" 
                  iconSize={8}
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  name="Balance"
                  stroke="#0D244F" 
                  fill="#0D244F" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}