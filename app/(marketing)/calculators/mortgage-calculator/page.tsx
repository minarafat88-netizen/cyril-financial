import { AdvancedMortgageCalculator } from "@/components/calculators/mortgage-calc";
import { Calculator } from "lucide-react";

export default function MortgageCalculatorPage() {
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

        <AdvancedMortgageCalculator />
      </div>
    </div>
  );
}
