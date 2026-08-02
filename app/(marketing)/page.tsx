import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
// استيراد مساعد الذكاء الاصطناعي للرد على العملاء
import { AiSupportChat } from "@/components/widgets/ai-support-chat";
// استيراد أيقونات احترافية تعبر عن كل كارت بدقة
import { Building2, Calculator, RefreshCw, Home, Layers } from "lucide-react";

const loanPrograms = [
  {
    title: "About Us",
    description: "Discover our elite standards, executive leadership, and boutique mortgage advisory.",
    icon: <Building2 className="w-6 h-6 text-white drop-shadow-sm" />,
    href: "/about",
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate your monthly payments, interest rates, and loan amortization instantly.",
    icon: <Calculator className="w-6 h-6 text-white drop-shadow-sm" />,
    href: "/calculators/mortgage-calculator",
  },
  {
    title: "Refinance",
    description: "Lower your monthly payments or access custom cash-out equity options.",
    icon: <RefreshCw className="w-6 h-6 text-white drop-shadow-sm" />,
    href: "/loans/refinance",
  },
  {
    title: "Purchase",
    description: "Conventional rates tailored for first-time and seasoned property buyers.",
    icon: <Home className="w-6 h-6 text-white drop-shadow-sm" />,
    href: "/loans/purchase",
  },
  {
    title: "Loan Programs",
    description: "Explore comprehensive financing solutions including Jumbo, FHA, VA & Non-QM.",
    icon: <Layers className="w-6 h-6 text-white drop-shadow-sm" />,
    href: "/loans",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface text-navy font-sans antialiased relative">
      <Header />

      {/* Main Section */}
      {/* Hero Section with background image */}
      <section className="relative py-24 px-6 text-white isolate">
        <Image
          src="/images/hero-background.jpg"
          alt="Abstract financial background"
          fill
          className="-z-10 object-cover"
          priority // Important: Load the main hero image first
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-navy opacity-60 -z-10"></div>
        <div className="relative max-w-7xl mx-auto space-y-12 z-10"> {/* Ensure content is above overlay */}
          
          {/* Header Title Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block px-5 py-1.5 bg-white/10 border border-white/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Tailored Financing & Advisory
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Comprehensive Financial Solutions
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Institutional private banking standards and high-net-worth borrowing, tailored every aspect to your goals.
            </p>
          </div>

          {/* Loan Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {loanPrograms.map((program) => (
              <Link
                key={program.href} // استخدام href كمفتاح فريد وهو أفضل من index
                href={program.href}
                className="group bg-white p-8 rounded-3xl border border-gray-100 shadow-card-soft hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* حاوية الأيقونة ذات التدرج المعدني اللامع المطلوب */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-[#C5C6C8] via-[#88898D] to-[#919296] shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_8px_rgba(0,0,0,0.12)] border border-slate-300/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    {program.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-navy tracking-tight transition-colors duration-300 group-hover:text-blue-600">
                      {program.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>

                {/* تحسين شكل الرابط السفلي */}
                <div className="pt-6 mt-auto">
                  <div className="text-xs font-bold text-navy transition-colors duration-300 group-hover:text-blue-600 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span>Explore</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* AI Customer Support Chatbot Widget */}
      <AiSupportChat />
    </div>
  );
}