import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = params;

  // محاكاة بيانات المقال بناءً على الـ slug أو الـ id
  const article = {
    title: slug === "2" 
      ? "Navigating Bank Statement Qualifying for Self-Employed Entrepreneurs" 
      : slug === "3" 
      ? "Understanding Current Rate Fluctuations in the Mortgage Market"
      : "California Jumbo Loan Strategies for High-Net-Worth Buyers in 2026",
    category: "Jumbo Lending",
    date: "July 12, 2026",
    readTime: "5 min read",
    author: "Cyril Financial Advisory Team",
    content: `
      Securing high-value residential financing in California requires a sophisticated approach to liquidity and asset structuring. For high-net-worth buyers targeting luxury properties across Los Angeles and surrounding coastal markets, traditional W-2 qualifying guidelines often fall short.

      ### 1. Advanced Portfolio Structuring
      High-value transactions demand a comprehensive review of liquid assets, restricted stock units (RSUs), and complex partnership distributions. Lenders specializing in bespoke portfolios look beyond standard tax returns to evaluate holistic financial health.

      ### 2. Leveraging Asset Depletion Programs
      For clients with substantial liquid reserves or marketable securities, asset depletion programs allow lenders to calculate qualifying income based on total portfolio value rather than annual cash flow alone, unlocking optimal purchasing power.

      ### 3. Collaborating with Institutional Partners
      Navigating jumbo thresholds requires direct access to private banking channels and portfolio lenders who understand custom underwriting. At Cyril Financial, we coordinate closely with institutional partners to secure competitive terms tailored to your unique financial footprint.
    `,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Back Button & Metadata */}
        <div className="space-y-6">
          <Link href="/blog">
            <Button variant="outline" size="sm" className="text-navy border-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Insights
            </Button>
          </Link>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1 text-emerald bg-emerald/10 px-3 py-1 rounded-full">
                <Tag className="w-3 h-3" /> {article.category}
              </span>
              <span className="text-slate flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {article.date}
              </span>
              <span className="text-slate">•</span>
              <span className="text-slate">{article.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold font-heading text-navy leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm font-semibold text-navy">
                Written by <span className="text-emerald">{article.author}</span>
              </div>
              <Button variant="outline" size="sm" className="text-navy border-gray-200 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share Article
              </Button>
            </div>
          </div>
        </div>

        {/* Article Body Content */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 md:p-12">
          <div className="prose prose-slate max-w-none text-navy leading-relaxed space-y-6 whitespace-pre-line text-base md:text-lg">
            {article.content}
          </div>
        </div>
      </div>
    </div>
  );
}