import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
// استيراد مساعد الذكاء الاصطناعي للرد على العملاء
import { AiSupportChat } from "@/components/widgets/ai-support-chat";

const loanPrograms = [
  {
    title: "Home Purchase",
    description: "Conventional rates for first-time and seasoned buyers.",
    icon: "🏠",
    href: "/loans/purchase",
  },
  {
    title: "Refinance",
    description: "Lower monthly payments or cash-out options.",
    icon: "🔄",
    href: "/loans/refinance",
  },
  {
    title: "Jumbo Loans",
    description: "High-value property financing for high-net-worth borrowers.",
    icon: "💎",
    href: "/loans/jumbo",
  },
  {
    title: "FHA, VA & More",
    description: "Government-backed zero or low down payment programs.",
    icon: "🛡️",
    href: "/loans/fha-va",
  },
  {
    title: "Non-QM Loans",
    description: "Flexible bank statement solutions for self-employed investors.",
    icon: "📊",
    href: "/loans/non-qm",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface text-navy font-sans antialiased relative">
      <Header />

      {/* Main Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Header Title Section */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-block px-5 py-1.5 bg-silver-button border border-gray-300 text-navy rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
              Tailored Financing
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">
              Comprehensive Loan Programs
            </h1>
            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              Comprehensive Loan Programs and high-net-worth borrowing, tailored every aspect mortgaged to your goals.
            </p>
          </div>

          {/* Loan Programs Grid (Matching Attached Layout) */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {loanPrograms.map((program, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-card-soft hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Embossed Metallic Icon Container */}
                  <div className="w-14 h-14 bg-silver-gradient border border-white rounded-2xl flex items-center justify-center text-xl shadow-icon-emboss">
                    {program.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-navy tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-50">
                  <Link
                    href={program.href}
                    className="text-xs font-bold text-navy hover:text-navy-light transition-colors flex items-center gap-1.5"
                  >
                    Explore {program.title.split(" ")[0]} →
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
      {/* AI Customer Support Chatbot Widget */}
      <AiSupportChat />
    </div>
  );
}