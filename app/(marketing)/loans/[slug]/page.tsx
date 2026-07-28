import React from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";
import { Header } from "@/components/layout/header";
import { notFound } from "next/navigation";

// قاعدة بيانات وهمية للمحتوى (في الواقع سيتم جلبها من CMS أو قاعدة البيانات)
const loanData: Record<string, any> = {
  purchase: {
    title: "Home Purchase Loans",
    subtitle: "Make your dream home a reality with our flexible purchase programs.",
    benefits: ["Low down payment options", "Competitive fixed & adjustable rates", "Fast pre-approval process"],
  },
  refinance: {
    title: "Refinance & Cash-Out",
    subtitle: "Lower your rate or tap into your home's equity.",
    benefits: ["Reduce your monthly payments", "Consolidate high-interest debt", "Fund home renovations"],
  },
  jumbo: {
    title: "Jumbo Loan Programs",
    subtitle: "Financing for luxury properties and high-net-worth individuals.",
    benefits: ["Loan amounts up to $3M+", "Flexible underwriting for complex incomes", "Competitive pricing"],
  },
  fha: {
    title: "FHA, VA & Government Loans",
    subtitle: "Government-backed zero or low down payment programs.",
    benefits: ["Low down payment options starting at 3.5%", "Flexible credit score requirements", "Assistance programs available"],
  },
  "non-qm": {
    title: "Non-QM & Investor Loans",
    subtitle: "Alternative qualification for self-employed and real estate investors.",
    benefits: ["Bank statement income qualification", "DSCR loans (no personal income needed)", "Asset depletion models"],
  }
};

// 1. تحويل المكون إلى async وجعل الـ params من نوع Promise
export default async function LoanProgramPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 2. فك الـ Promise لاستخراج الـ slug
  const resolvedParams = await params;
  const data = loanData[resolvedParams.slug];

  if (!data) {
    notFound(); // توجيه لصفحة 404 إذا كان الرابط غير صحيح
  }

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Page Header */}
        <section className="bg-navy py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-white">{data.title}</h1>
            <p className="text-silver text-sm md:text-base">{data.subtitle}</p>
          </div>
        </section>

        {/* Content & Benefits */}
        <section className="py-20 px-6 flex-1">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-navy">Why Choose This Program?</h2>
              <ul className="space-y-4">
                {data.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-silver-gradient flex items-center justify-center shadow-sm">
                      🪙
                    </div>
                    <span className="text-sm font-medium text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6">
                <Link href="/apply" className="inline-block bg-navy text-white font-bold px-8 py-4 rounded-xl text-sm shadow-md hover:bg-navy-light transition-all">
                  Start Your Application
                </Link>
              </div>
            </div>

            {/* Decorative Card matching the brand */}
            <div className="bg-white p-10 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-silver-light rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <SiteLogo className="w-20 h-20 rounded-2xl shadow-icon-emboss mb-6 relative z-10" size={80} />
               <h3 className="text-xl font-bold text-navy relative z-10">Need Expert Advice?</h3>
               <p className="text-xs text-gray-500 mt-3 mb-6 relative z-10">
                 Our loan advisors are ready to help you structure the perfect {data.title.toLowerCase()} tailored to your goals.
               </p>
               <Link href="/contact" className="w-full bg-silver-button text-navy font-bold py-3 rounded-xl text-sm shadow-sm border border-gray-200 hover:brightness-105 transition-all relative z-10">
                 Contact an Advisor
               </Link>
            </div>

          </div>
        </section>
      </main>

    </div>
  );
}