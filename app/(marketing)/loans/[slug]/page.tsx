import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteLogo } from "@/components/ui/site-logo";
import { Header } from "@/components/layout/header";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { LoanCalculator } from '@/components/loan-calculator'; // استيراد الآلة الحاسبة
import { db } from "@/lib/db"; // 1. استيراد اتصال قاعدة البيانات
import { loanPrograms } from "@/lib/schema"; // 2. استيراد مخطط الجدول
import { eq } from "drizzle-orm";
import { NumberDomain } from "recharts";

// Interface for loan program data for type safety
interface LoanProgram {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  slug: string;
  icon: string;
  benefits: string[];
  loanType: string;
  details?: { title: string; content: string }[]; // إضافة الحقل الجديد
  defaultInterestRate: number;
  imageUrl?: string;
}

// 3. تحديث دالة جلب البيانات لاستخدام Drizzle و Vercel Postgres
async function getLoanProgram(slug: string): Promise<LoanProgram | null> {
  try {
    const results = await db
      .select()
      .from(loanPrograms)
      .where(eq(loanPrograms.slug, slug))
      .limit(1);

    return (results[0] as LoanProgram) || null;
  } catch (error) {
    console.error("Error fetching loan program:", error);
    return null;
  }
}
// تصحيح generateMetadata لتقبل params ككائن عادي
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string };
}): Promise<Metadata> {
  const data = await getLoanProgram(params.slug);
  return {
    title: data ? `${data.name} | Cyril Financial Group` : 'Loan Program Details | Cyril Financial Group',
    description: data ? data.subtitle : 'Detailed information about our loan programs.',
    keywords: data ? [data.name, data.slug, 'loan', 'mortgage', 'Cyril Financial'] : ['loan program', 'mortgage', 'financial services'],
  };
}

export default async function LoanProgramPage({ 
  params,
}: {
  params: { slug: string };
}) {
  const data = await getLoanProgram(params.slug);
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
            <h1 className="text-4xl md:text-5xl font-black text-white">{(data as LoanProgram).name}</h1>
            <p className="text-silver text-sm md:text-base">{(data as any).subtitle}</p>
          </div>
        </section>

        {/* Content & Benefits */}
        <section className="py-20 px-6 flex-1">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Image Section */}
            {(data as LoanProgram).imageUrl && (
              <div className="order-last md:order-first relative aspect-square">
                <Image
                  src={(data as LoanProgram).imageUrl!}
                  alt={`Image for ${(data as LoanProgram).name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="rounded-3xl shadow-xl object-cover"
                />
              </div>
            )}
            
            <div className="space-y-8 lg:col-span-7">
              <div>
                <h2 className="text-2xl font-bold text-navy">Program Details & Benefits</h2>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">{(data as LoanProgram).description}</p>
              </div>
              <ul className="space-y-4">
                {((data as any).benefits || []).map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    </div>
                    <span className="text-sm font-medium text-gray-700 leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4">
                <Link
                  href="/apply/form-1003"
                  className="inline-block bg-navy text-white font-bold px-8 py-4 rounded-xl text-sm shadow-md hover:bg-navy-light transition-all"
                >
                  Apply for a {(data as LoanProgram).name}
                </Link>
              </div>
            </div>

            {/* Right Column with Calculator */}
            <div className="lg:col-span-5 space-y-8">
              <LoanCalculator 
                loanType={data.loanType}
                defaultInterestRate={data.defaultInterestRate}
                loanName={data.name}
              />
            </div>

            {/* قسم التفاصيل الإضافية الجديد */}
            {data.details && data.details.length > 0 && (
              <div className="lg:col-span-12 pt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.details.map((detail, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-navy text-sm mb-2">{detail.title}</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">{detail.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}


            <div className="lg:col-span-12 bg-white p-10 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col items-center text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-silver-light rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <SiteLogo className="w-20 h-20 rounded-2xl shadow-icon-emboss mb-6 relative z-10" size={80} />
               <h3 className="text-xl font-bold text-navy relative z-10">Need Expert Advice?</h3>
               <p className="text-xs text-gray-500 mt-3 mb-6 relative z-10">
                 Our loan advisors are ready to help you structure the perfect {((data as LoanProgram).name || '').toLowerCase()} tailored to your goals.
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