import { AdvancedMortgageCalculator } from "@/components/calculators/mortgage-calc";
import { Calculator } from "lucide-react";

export default function MortgageCalculatorPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-10 shadow-glass">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <Calculator className="w-4 h-4" /> Financial Modeling Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading">
              Advanced Mortgage & Financing Calculators
            </h1>
            <p className="text-gray-300 text-sm md:text-base mt-3 leading-relaxed">
              Model custom amortization schedules, California property tax ratios, and jumbo financing scenarios with institutional precision.
            </p>
          </div>
        </div>

        <AdvancedMortgageCalculator />
      </div>
    </div>
  );
}