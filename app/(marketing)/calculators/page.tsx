import { AdvancedMortgageCalculator } from "@/components/calculators/mortgage-calc";
import { ShieldCheck, ArrowRight, Calculator } from "lucide-react";
import Link from "next/link";

export default function CalculatorsHubPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Financial Modeling Hub
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-navy">
            Advanced Mortgage & Financing Calculators
          </h1>
          <p className="text-slate text-base leading-relaxed">
            Model custom amortization schedules, California property tax ratios, and jumbo financing scenarios with institutional precision.
          </p>
        </div>

        {/* Embedded Interactive Mortgage Calculator Component */}
        <AdvancedMortgageCalculator />

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-luxury border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-heading text-navy">Jumbo Loan Stress Test</h3>
            <p className="text-slate text-sm">Evaluate debt-to-income (DTI) requirements for high-net-worth real estate acquisitions across Los Angeles and San Francisco.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-heading text-navy">Bank Statement Program</h3>
            <p className="text-slate text-sm">Calculate qualifying monthly cash flow for self-employed entrepreneurs using 12-to-24 month business deposits.</p>
          </div>
          <div className="space-y-3">
            <h3 className="text-xl font-bold font-heading text-navy">Cash-Out Refinance Analysis</h3>
            <p className="text-slate text-sm">Assess equity leverage thresholds and liquidity optimization for portfolio asset diversification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}