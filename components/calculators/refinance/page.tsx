"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, DollarSign, Percent, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RefinanceCalculatorPage() {
  const [currentLoanBalance, setCurrentLoanBalance] = useState<number>(650000);
  const [currentInterestRate, setCurrentInterestRate] = useState<number>(7.25);
  const [remainingTerm, setRemainingTerm] = useState<number>(26);
  const [newInterestRate, setNewInterestRate] = useState<number>(5.75);
  const [newTerm, setNewTerm] = useState<number>(30);
  const [refinanceCost, setRefinanceCost] = useState<number>(8500);

  // حساب القسط الحالي
  const monthlyRateCurrent = currentInterestRate / 100 / 12;
  const numPaymentsCurrent = remainingTerm * 12;
  const currentMonthlyPayment =
    (currentLoanBalance *
      (monthlyRateCurrent * Math.pow(1 + monthlyRateCurrent, numPaymentsCurrent))) /
    (Math.pow(1 + monthlyRateCurrent, numPaymentsCurrent) - 1 || 1);

  // حساب القسط الجديد
  const newLoanBalance = currentLoanBalance + refinanceCost;
  const monthlyRateNew = newInterestRate / 100 / 12;
  const numPaymentsNew = newTerm * 12;
  const newMonthlyPayment =
    (newLoanBalance *
      (monthlyRateNew * Math.pow(1 + monthlyRateNew, numPaymentsNew))) /
    (Math.pow(1 + monthlyRateNew, numPaymentsNew) - 1 || 1);

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const breakEvenMonths = monthlySavings > 0 ? Math.round(refinanceCost / monthlySavings) : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-10 shadow-glass">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <RefreshCw className="w-4 h-4" /> Refinance Analysis
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading">
              Mortgage Refinance Calculator
            </h1>
            <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed">
              Evaluate your potential monthly savings, break-even timeline, and long-term interest optimization with institutional precision.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl font-bold font-heading text-navy">Refinance Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  Current Loan Balance ($)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><DollarSign className="w-4 h-4" /></span>
                  <Input
                    type="number"
                    value={currentLoanBalance}
                    onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
                    className="pl-9 font-semibold text-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  Current Interest Rate (%)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><Percent className="w-4 h-4" /></span>
                  <Input
                    type="number"
                    step="0.01"
                    value={currentInterestRate}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                    className="pl-9 font-semibold text-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  Remaining Term (Years)
                </label>
                <Input
                  type="number"
                  value={remainingTerm}
                  onChange={(e) => setRemainingTerm(Number(e.target.value))}
                  className="font-semibold text-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  New Interest Rate (%)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><Percent className="w-4 h-4" /></span>
                  <Input
                    type="number"
                    step="0.01"
                    value={newInterestRate}
                    onChange={(e) => setNewInterestRate(Number(e.target.value))}
                    className="pl-9 font-semibold text-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  New Loan Term (Years)
                </label>
                <select
                  value={newTerm}
                  onChange={(e) => setNewTerm(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm font-semibold text-navy bg-white"
                >
                  <option value={30}>30-Year Fixed</option>
                  <option value={15}>15-Year Fixed</option>
                  <option value={20}>20-Year Fixed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
                  Estimated Closing Costs ($)
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><DollarSign className="w-4 h-4" /></span>
                  <Input
                    type="number"
                    value={refinanceCost}
                    onChange={(e) => setRefinanceCost(Number(e.target.value))}
                    className="pl-9 font-semibold text-navy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Card */}
          <div className="lg:col-span-5 bg-navy text-white p-8 rounded-2xl shadow-glass flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">Estimated Monthly Savings</span>
              <div className="text-4xl lg:text-5xl font-extrabold font-heading text-white mt-2">
                ${Math.round(monthlySavings).toLocaleString()} <span className="text-xs text-gray-400 font-normal">/mo</span>
              </div>
            </div>

            <div className="space-y-3 border-t border-navy-light pt-6 text-sm text-gray-300">
              <div className="flex justify-between">
                <span>Current Monthly Payment</span>
                <span className="font-bold text-white">${Math.round(currentMonthlyPayment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>New Monthly Payment</span>
                <span className="font-bold text-white">${Math.round(newMonthlyPayment).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Break-Even Timeline</span>
                <span className="font-bold text-emerald">{breakEvenMonths} Months</span>
              </div>
            </div>

            <Link href="/apply" className="block pt-2">
              <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3.5 rounded-xl shadow-glass">
                Lock In New Rate <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}