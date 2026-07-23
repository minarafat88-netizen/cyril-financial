import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

interface LoanProductPageProps {
  params: {
    slug: string;
  };
}

const loanProductsData: Record<string, { title: string; subtitle: string; description: string; highlights: string[] }> = {
  "jumbo-loans": {
    title: "High-Net-Worth Jumbo Financing",
    subtitle: "Customized liquidity and competitive rates for luxury California real estate.",
    description: "Designed for high-value residential and investment properties exceeding conventional conforming loan limits, offering tailored asset-depletion and portfolio lending solutions.",
    highlights: [
      "Loan amounts up to $25,000,000+",
      "Flexible asset-based qualification options",
      "Interest-only payment structures available",
      "Dedicated Senior Managing Director advisory"
    ]
  },
  "bank-statement": {
    title: "Self-Employed Bank Statement Program",
    subtitle: "Qualify using business or personal bank deposits instead of traditional tax returns.",
    description: "Perfect for entrepreneurs, founders, and 1099 professionals. We analyze 12 to 24 months of bank statements to establish true qualifying cash flow.",
    highlights: [
      "No personal or corporate tax returns required",
      "Up to 90% LTV options for qualified buyers",
      "12 or 24-month deposit averaging",
      "Fast-track institutional underwriting"
    ]
  },
  "refinance": {
    title: "Portfolio Refinance & Cash-Out Solutions",
    subtitle: "Optimize your capital structure and leverage accumulated real estate equity.",
    description: "Secure lower interest rates, consolidate high-interest debt, or unlock liquidity for new venture capital and portfolio diversification.",
    highlights: [
      "Rate-and-term or cash-out refinancing",
      "Streamlined appraisal waivers where eligible",
      "Customized amortization adjustments",
      "Zero hidden fees with transparent advisory"
    ]
  }
};

export default function LoanProductPage({ params }: LoanProductPageProps) {
  const product = loanProductsData[params.slug];

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> Bespoke Financing Product
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold font-heading text-white">
            {product.title}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
            {product.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
            <h3 className="text-2xl font-bold font-heading text-navy">Program Overview</h3>
            <p className="text-slate text-base leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-slate uppercase tracking-wider">Key Program Benefits</h4>
              <div className="grid grid-cols-1 gap-3">
                {product.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald/10 text-emerald flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-navy font-medium text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-emerald">Ready to Proceed?</span>
              <h3 className="text-2xl font-bold font-heading text-navy mt-1">Pre-Qualify For This Loan</h3>
              <p className="text-slate text-sm mt-2">Connect with our Los Angeles advisory team for a confidential scenario review.</p>
            </div>

            <Link href="/apply" className="block">
              <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-4 rounded-xl shadow-glass flex items-center justify-center gap-2">
                Start Secure Application <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}