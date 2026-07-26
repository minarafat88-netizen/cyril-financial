"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronDown, ChevronUp, Search, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      question: "What types of mortgage programs does Cyril Financial offer?",
      answer: "We specialize in bespoke residential and commercial financing solutions across California, including Jumbo Loans, Bank Statement programs for self-employed entrepreneurs, Asset Depletion loans, and customized bridge financing for high-net-worth buyers."
    },
    {
      question: "How do California Jumbo Loans differ from conventional mortgages?",
      answer: "Jumbo loans exceed the conforming loan limits set by the Federal Housing Finance Agency (FHFA). They typically require more rigorous underwriting, higher credit thresholds, and customized asset verification, which our private banking channels are expertly structured to handle."
    },
    {
      question: "What documents are required for Bank Statement loan qualifying?",
      answer: "For self-employed borrowers, we generally review 12 to 24 months of personal or business bank statements to calculate qualifying cash flow, bypassing traditional W-2 tax returns while maintaining competitive rates."
    },
    {
      question: "How long does the pre-approval and underwriting process take?",
      answer: "With our streamlined digital platform and direct institutional partnerships, initial pre-approval can often be issued within 24 to 48 hours, while full loan closing timelines are optimized to meet competitive California escrow deadlines."
    },
    {
      question: "Are there any upfront fees to consult with Cyril Financial advisors?",
      answer: "No. Our initial financial consultations, portfolio structuring assessments, and calculator tools are entirely complimentary for all prospective clients."
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-12 shadow-glass text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider mx-auto">
            <HelpCircle className="w-4 h-4" /> Knowledge Center & FAQ
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-heading">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Find expert answers regarding our luxury mortgage guidelines, qualification criteria, and bespoke financial programs.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate pt-2">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search questions or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
            />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-luxury border border-gray-100 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  >
                    <span className="font-bold text-navy text-base md:text-lg">
                      {faq.question}
                    </span>
                    <span className="p-2 rounded-full bg-gray-50 text-navy flex-shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-slate text-sm md:text-base leading-relaxed border-t border-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center text-slate border border-gray-100">
              No matching questions found. Please contact our advisory team directly.
            </div>
          )}
        </div>

        {/* Contact Support Banner */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-luxury flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg font-bold font-heading text-navy">Still have questions?</h3>
            <p className="text-slate text-sm">Our private banking and mortgage specialists are ready to assist you.</p>
          </div>
          <Link href="/contact">
            <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-2.5 rounded-xl shadow-glass flex items-center gap-2">
              Contact Advisory <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}