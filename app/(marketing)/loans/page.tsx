import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
// استيراد أيقونات احترافية تعبر عن كل نوع قرض بدقة
import { 
  ShieldCheck, 
  TrendingUp, 
  Home, 
  Building2, 
  Award, 
  FileText 
} from "lucide-react";

// قائمة برامج القروض مع تخصيص أيقونة فريدة لكل نوع
const loanProgramsList = [
  { 
    name: "Fixed-Rate Mortgages", 
    slug: "fixed-rate",
    description: "Stable and predictable monthly payments over the life of your loan.",
    icon: <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "Adjustable-Rate Mortgages (ARM)", 
    slug: "arm",
    description: "Initial lower rates that adjust periodically based on market indexes.",
    icon: <TrendingUp className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "Conforming Conventional Loans", 
    slug: "conforming-conventional",
    description: "Traditional financing meeting standard government-sponsored guidelines.",
    icon: <Home className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "Jumbo Loans", 
    slug: "jumbo",
    description: "High-value property financing designed for luxury and high-net-worth borrowers.",
    icon: <Building2 className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "FHA Loans", 
    slug: "fha",
    description: "Government-backed loans offering lower down payments and flexible credit.",
    icon: <ShieldCheck className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "VA Loans", 
    slug: "va",
    description: "Exclusive zero-down payment financing for eligible military members and veterans.",
    icon: <Award className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "USDA Loans", 
    slug: "usda",
    description: "Zero-down payment options tailored for rural and suburban homebuyers.",
    icon: <Home className="w-5 h-5 text-white drop-shadow-sm" />
  },
  { 
    name: "Non-QM Loans", 
    slug: "non-qm",
    description: "Alternative qualification solutions using bank statements for self-employed buyers.",
    icon: <FileText className="w-5 h-5 text-white drop-shadow-sm" />
  },
];

export default function LoanProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Page Header Section */}
        <section className="bg-navy py-20 px-6 text-center relative overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {loanProgramsList.map((program, index) => (
                <Link
                  key={index}
                  href={`/loans/${program.slug}`}
                  className="bg-white p-8 rounded-3xl shadow-card-soft border border-gray-100 flex items-start justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-5">
                    {/* حاوية الأيقونة بالتدرج المعدني اللامع */}
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-[#C5C6C8] via-[#88898D] to-[#919296] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.1)] border border-slate-300/80 flex items-center justify-center shrink-0 mt-1">
                      {program.icon}
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="text-lg font-bold text-navy group-hover:text-blue-600 transition-colors">
                        {program.name}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                        {program.description}
                      </p>
                    </div>
                  </div>

                  <span className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 flex items-center justify-center transition-colors shrink-0 mt-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}