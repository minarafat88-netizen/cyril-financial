import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Metadata } from 'next';
import { db } from '@/lib/db';
import { loanPrograms as loanProgramsSchema } from '@/lib/schema';
import { asc } from 'drizzle-orm';
import { 
  ShieldCheck, 
  TrendingUp, 
  Home, 
  Building2, 
  Award, 
  FileText,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Explore All Loan Programs | Cyril Financial Group";
  const description = "Discover a wide range of mortgage solutions at Cyril Financial, including FHA, VA, Conventional, Jumbo, and ARM loans. Find the perfect financing for your home or investment property today.";
  
  return {
    title: title,
    description: description,
    keywords: ['mortgage programs', 'loan options', 'FHA loans', 'VA loans', 'conventional mortgage', 'Jumbo loans', 'Cyril Financial'],
    openGraph: {
      title: title,
      description: description,
    },
  };
}

interface LoanProgram {
  id: number;
  name: string;
  subtitle: string; // سنستخدم الوصف المختصر هنا
  slug: string;
  icon: string;
}

const iconMap: { [key: string]: React.ReactNode } = {
  "shield-check": <ShieldCheck className="w-6 h-6 text-white drop-shadow-sm" />,
  "trending-up": <TrendingUp className="w-6 h-6 text-white drop-shadow-sm" />,
  "home": <Home className="w-6 h-6 text-white drop-shadow-sm" />,
  "building-2": <Building2 className="w-6 h-6 text-white drop-shadow-sm" />,
  "award": <Award className="w-6 h-6 text-white drop-shadow-sm" />,
  "file-text": <FileText className="w-6 h-6 text-white drop-shadow-sm" />,
  "refresh-cw": <TrendingUp className="w-6 h-6 text-white drop-shadow-sm" />, // أيقونة للـ Refinance
  "default": <ShieldCheck className="w-6 h-6 text-white drop-shadow-sm" />,
};

async function getLoanPrograms(): Promise<LoanProgram[]> {
  try {
    const results = await db
      .select({
        id: loanProgramsSchema.id,
        name: loanProgramsSchema.name,
        subtitle: loanProgramsSchema.subtitle,
        slug: loanProgramsSchema.slug,
        icon: loanProgramsSchema.icon,
      })
      .from(loanProgramsSchema)
      .orderBy(asc(loanProgramsSchema.sortOrder));

    return results as LoanProgram[];
  } catch (error) {
    console.error("Error fetching loan programs from Vercel Postgres:", error);
    return []; 
  }
}

export default async function LoanProgramsPage() {
  const loanProgramsList = await getLoanPrograms();

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Page Header Section */}
        <section className="py-20 px-6 text-center relative overflow-hidden isolate">
          {/* Background image - تم إزالة quality={80} لتجنب خطأ الإعدادات */}
          <Image 
            src="/images/office-background.jpg"
            alt="Modern office background"
            fill
            priority
            className="object-cover -z-10"
          />
          <div className="absolute inset-0 bg-navy/80 -z-10"></div>

          <div className="max-w-4xl mx-auto space-y-4 relative z-10">
            <div className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Tailored Borrowing Suites
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Loan Programs
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Explore our comprehensive suite of financing solutions designed for your residential and investment needs.
            </p>
          </div>
        </section>

        {/* Programs List Grid Section */}
        <section className="py-20 px-6 flex-1">
          <div className="max-w-6xl mx-auto">
            {loanProgramsList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {loanProgramsList.map((program) => (
                  <Link
                    key={program.id}
                    href={`/loans/${program.slug}`}
                    className="bg-white p-8 rounded-3xl shadow-card-soft border border-gray-100 flex items-start justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="flex items-start gap-5">
                      {/* حاوية الأيقونة بالتدرج المعدني اللامع */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#C5C6C8] via-[#88898D] to-[#919296] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.1)] border border-slate-300/80 flex items-center justify-center shrink-0 mt-1">
                        {iconMap[program.icon] || iconMap.default}
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-lg font-bold text-navy group-hover:text-blue-600 transition-colors">
                          {program.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {program.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 flex items-center justify-center transition-colors shrink-0 mt-1">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl shadow-card-soft border border-gray-100">
                <h3 className="text-xl font-bold text-navy">No Loan Programs Available</h3>
                <p className="text-gray-500 mt-2 text-sm">Please check back later, or contact support if you believe this is an error.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}