import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShieldCheck, Calendar, User, ArrowLeft } from "lucide-react";

interface ResourceArticlePageProps {
  params: {
    slug: string;
  };
}

const articlesData: Record<string, { title: string; category: string; date: string; author: string; content: string[] }> = {
  "california-jumbo-loan-strategies-2026": {
    title: "California Jumbo Loan Strategies for High-Net-Worth Buyers in 2026",
    category: "Jumbo Lending",
    date: "July 12, 2026",
    author: "Cynl Advisory Team",
    content: [
      "Navigating the California luxury real estate market requires sophisticated financing structures that go beyond traditional conforming loans. As interest rate environments evolve in 2026, high-net-worth borrowers are increasingly leveraging asset-depletion and portfolio lending strategies to secure premier properties across Los Angeles, Orange County, and San Francisco.",
      "One of the primary advantages of bespoke jumbo financing is the flexibility to utilize diversified liquid and semi-liquid assets—such as equities, bonds, and business capital—to qualify without disrupting long-term investment portfolios. Interest-only structures and customized amortization schedules further enable sophisticated buyers to optimize short-term cash flow while maintaining maximum liquidity.",
      "Working with a boutique private banking advisor ensures that your mortgage structure aligns seamlessly with your broader wealth management and tax minimization objectives. Contact our advisory group to evaluate custom scenarios tailored to your portfolio."
    ]
  },
  "navigating-bank-statement-qualifying": {
    title: "Navigating Bank Statement Qualifying for Self-Employed Entrepreneurs",
    category: "Bespoke Financing",
    date: "July 5, 2026",
    author: "Managing Director",
    content: [
      "Traditional mortgage underwriting often presents hurdles for founders, business owners, and 1099 professionals whose tax returns reflect strategic deductions rather than true gross cash flow. Alternative bank statement programs bridge this gap by evaluating actual revenue deposited over a 12-to-24 month period.",
      "By analyzing business or personal bank statements directly, institutional underwriters can establish accurate qualifying income. This empowers self-employed entrepreneurs to secure competitive mortgage terms for primary residences or real estate investments without altering their corporate tax planning.",
      "To maximize qualification potential, borrowers should maintain clean separation between personal and business finances, ensuring consistent monthly deposits and avoiding non-sufficient funds (NSF) occurrences."
    ]
  }
};

export default function ResourceArticlePage({ params }: ResourceArticlePageProps) {
  const article = articlesData[params.slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/resources/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-slate hover:text-emerald transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Insights Hub
        </Link>

        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-luxury border border-gray-100 space-y-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate">
            <span className="px-3 py-1 bg-emerald/10 text-emerald rounded-full uppercase tracking-wider">{article.category}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {article.author}</span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-extrabold font-heading text-navy leading-tight">
            {article.title}
          </h1>

          <div className="space-y-6 pt-6 border-t border-gray-100 text-slate text-base leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold font-heading">Ready to discuss your financing strategy?</h3>
            <p className="text-gray-300 text-sm mt-1">Connect with our private banking advisors for a confidential consultation.</p>
          </div>
          <Link href="/apply">
            <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-xl shadow-glass">
              Start Secure Application
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}