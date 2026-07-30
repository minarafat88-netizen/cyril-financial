import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteLogo } from "@/components/ui/site-logo";
import { Header } from "@/components/layout/header";
import { notFound } from "next/navigation";
import { db } from "@/lib/firebase-admin";
import { Metadata } from 'next';
// Interface for loan program data for type safety
interface LoanProgram {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  slug: string;
  icon: string;
  benefits: string[];
  imageUrl?: string; // حقل اختياري للصورة
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getLoanProgram(params.slug);
  return {
    title: data ? `${data.name} | Cyril Financial Group` : 'Loan Program Details | Cyril Financial Group',
    description: data ? data.subtitle : 'Detailed information about our loan programs.',
    keywords: data ? [data.name, data.slug, 'loan', 'mortgage', 'Cyril Financial'] : ['loan program', 'mortgage', 'financial services'],
  };
}

async function getLoanProgram(slug: string) {
  try {
    const programsRef = db.collection('loanPrograms');
    const snapshot = await programsRef.where('slug', '==', slug).limit(1).get();

    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching loan program:", error);
    return null;
  }
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
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            {(data as LoanProgram).imageUrl && ( // Conditional rendering if imageUrl exists
              <div className="order-last md:order-first">
                <Image
                  src={(data as LoanProgram).imageUrl!}
                  alt={`Image for ${(data as LoanProgram).name}`}
                  width={500}
                  height={500}
                  className="rounded-3xl shadow-xl object-cover w-full h-full"
                />
              </div>
            )}
            
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-navy">Why Choose the {(data as LoanProgram).name} Program?</h2>
              <ul className="space-y-4">
                {((data as any).benefits || []).map((benefit: string, index: number) => (
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