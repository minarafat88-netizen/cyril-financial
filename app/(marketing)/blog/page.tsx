import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, Calendar, Tag } from "lucide-react";
import Link from "next/link";

export default function PublicBlogPage() {
  const articles = [
    {
      id: "1",
      title: "California Jumbo Loan Strategies for High-Net-Worth Buyers in 2026",
      category: "Jumbo Lending",
      date: "July 12, 2026",
      excerpt: "Explore advanced liquidity management and structuring approaches for high-value residential properties across Los Angeles and Southern California.",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Navigating Bank Statement Qualifying for Self-Employed Entrepreneurs",
      category: "Bespoke Financing",
      date: "July 5, 2026",
      excerpt: "A comprehensive guide on leveraging 12-to-24 month personal or business bank statements to secure primary residence or investment property financing.",
      readTime: "4 min read",
    },
    {
      id: "3",
      title: "Understanding Current Rate Fluctuations in the Mortgage Market",
      category: "Market Commentary",
      date: "June 28, 2026",
      excerpt: "Institutional analysis on recent federal rate adjustments and how luxury homebuyers can lock in optimal long-term positioning.",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header Section */}
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-12 shadow-glass">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider">
              <FileText className="w-4 h-4" /> Market Insights & Guides
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading">
              Expert Perspectives on Luxury Real Estate Finance
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Institutional-grade analysis, mortgage guidelines, and bespoke financing strategies tailored for the California market.
            </p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 flex flex-col justify-between hover:shadow-xl transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="inline-flex items-center gap-1 text-emerald bg-emerald/10 px-3 py-1 rounded-full">
                    <Tag className="w-3 h-3" /> {article.category}
                  </span>
                  <span className="text-slate flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-heading text-navy leading-snug">
                  {article.title}
                </h3>

                <p className="text-slate text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-slate font-medium">{article.readTime}</span>
                <Link href={`/blog/${article.id}`}>
                  <Button variant="ghost" className="text-navy hover:text-emerald p-0 font-semibold flex items-center gap-1">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}