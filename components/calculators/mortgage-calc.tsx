"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { DollarSign, Percent, Calendar, ShieldCheck, ArrowRight } from "lucide-react";

export function AdvancedMortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(1200000);
  const [downPayment, setDownPayment] = useState<number>(240000);
  const [interestRate, setInterestRate] = useState<number>(6.375);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.25);
  const [homeInsurance, setHomeInsurance] = useState<number>(3600);

  const loanAmount = homePrice - downPayment;
  const monthlyInterestRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPrincipalAndInterest =
    (loanAmount *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1 || 1);

  const monthlyPropertyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyHomeInsurance = homeInsurance / 12;

  const totalMonthlyPayment =
    (isFinite(monthlyPrincipalAndInterest) ? monthlyPrincipalAndInterest : 0) +
    monthlyPropertyTax +
    monthlyHomeInsurance;

  return (
    <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* Input Controls */}
      <div className="lg:col-span-7 space-y-6">
        <h3 className="text-xl font-bold font-heading text-navy">Interactive Payment Breakdown</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Purchase Price ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><DollarSign className="w-4 h-4" /></span>
              <Input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="pl-9 font-semibold text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Down Payment ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><DollarSign className="w-4 h-4" /></span>
              <Input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="pl-9 font-semibold text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Interest Rate (%)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate"><Percent className="w-4 h-4" /></span>
              <Input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="pl-9 font-semibold text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Loan Term (Years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 p-2.5 text-sm font-semibold text-navy bg-white"
            >
              <option value={30}>30-Year Fixed</option>
              <option value={15}>15-Year Fixed</option>
              <option value={7}>7/1 ARM Jumbo</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min={200000}
            max={5000000}
            step={50000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full accent-emerald cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate mt-1">
            <span>$200,000</span>
            <span>$2,500,000</span>
            <span>$5,000,000+</span>
          </div>
        </div>
      </div>

      {/* Output Summary Card */}
      <div className="lg:col-span-5 bg-navy text-white p-8 rounded-2xl shadow-glass flex flex-col justify-between space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Estimated Total Payment</span>
          <div className="text-4xl lg:text-5xl font-extrabold font-heading text-white mt-2">
            ${Math.round(totalMonthlyPayment).toLocaleString()} <span className="text-xs text-gray-400 font-normal">/mo</span>
          </div>
        </div>

        <div className="space-y-3 border-t border-navy-light pt-6 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Principal & Interest</span>
            <span className="font-bold text-white">${Math.round(monthlyPrincipalAndInterest || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>California Property Tax ({propertyTaxRate}%)</span>
            <span className="font-bold text-white">${Math.round(monthlyPropertyTax).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Homeowners Insurance</span>
            <span className="font-bold text-white">${Math.round(monthlyHomeInsurance).toLocaleString()}</span>
          </div>
        </div>

        <Link href="/apply" className="block pt-2">
          <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3.5 rounded-xl shadow-glass">
            Pre-Qualify With This Scenario <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}