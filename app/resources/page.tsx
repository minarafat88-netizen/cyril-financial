"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calculator, 
  FileText, 
  HelpCircle, 
  ArrowRight, 
  Search, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  FileSpreadsheet,
  Building,
  TrendingUp,
  Key,
  RefreshCw
} from "lucide-react";

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // أدلة ومقالات الموارد المعرفية المحدثة حسب القروض
  const articles = [
    {
      id: 1,
      title: "Fixed-Rate vs. Adjustable-Rate (ARM): Which is Right for You?",
      category: "Loan Guides",
      description: "Compare long-term payment predictability against initial interest rate savings to choose the optimal mortgage structure.",
      link: "/loans/fixed-rate",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Understanding Jumbo Loan Reserve & Appraisal Requirements",
      category: "Jumbo Loans",
      description: "Learn how post-closing liquid reserves and dual property appraisals work when financing high-value luxury homes.",
      link: "/loans/jumbo",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "How to Cancel Private Mortgage Insurance (PMI) on Conventional Loans",
      category: "Conventional",
      description: "Discover the rules for dropping PMI once your home equity reaches 20% on Fannie Mae and Freddie Mac loans.",
      link: "/loans/conforming-conventional",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "The Ultimate Form 1003 Application Preparation Checklist",
      category: "Application Guides",
      description: "Gather all necessary W-2s, bank statements, asset proofs, and tax filings needed for a fast mortgage underwriting.",
      link: "/apply/form-1003",
      readTime: "6 min read"
    },
    {
      id: 5,
      title: "How Much Home Can You Afford? A Purchase Budgeting Guide",
      category: "Home Purchase",
      description: "Calculate your Debt-to-Income (DTI) ratio and determine your maximum purchasing power before making home offers.",
      link: "/purchase",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "When is the Right Time to Refinance Your Mortgage?",
      category: "Refinancing",
      description: "Evaluate breakeven points, rate reductions, and cash-out equity strategies to see if refinancing saves you money.",
      link: "/refinance",
      readTime: "5 min read"
    }
  ];

  // الأسئلة الشائعة
  const faqs = [
    {
      q: "What documents do I need to complete Form 1003?",
      a: "You will typically need 2 years of W-2s/1099s, 30 days of recent pay stubs, 2 months of bank statements, government ID, and debt/asset details."
    },
    {
      q: "What is the baseline FHFA conforming loan limit?",
      a: "The baseline conforming loan limit for single-family homes is set annually by FHFA ($806,500+). Amounts above this limit require a Jumbo Loan."
    },
    {
      q: "How does an Adjustable-Rate Mortgage (ARM) cap structure work?",
      a: "ARM caps (e.g., 2/2/5) limit how much your interest rate can adjust on the first reset, subsequent resets, and over the entire lifetime of the loan."
    },
    {
      q: "Can I get pre-approved before finding a specific house?",
      a: "Yes! Obtaining an official Pre-Approval letter via Form 1003 shows sellers and real estate agents that you are a verified, serious buyer."
    }
  ];

  // تصفية المقالات بناءً على البحث والفئة
  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || art.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Hero Banner */}
          <div className="bg-navy text-white p-10 lg:p-14 rounded-3xl shadow-glass space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 text-silver rounded-full text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-400" /> Education & Guidance Hub
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
              Mortgage Resources & Knowledge Center
            </h1>
            <p className="text-gray-300 text-base lg:text-lg max-w-2xl leading-relaxed">
              Explore expert guides, qualification checklists, and interactive tools for Fixed-Rate, ARM, Conventional, and Jumbo mortgage programs.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl pt-2">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-6" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search guides, loan terms, or Form 1003 rules..." 
                className="w-full pl-12 pr-4 py-3.5 bg-white text-navy rounded-2xl text-xs font-medium outline-none shadow-md placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/purchase" className="p-5 bg-white rounded-2xl shadow-luxury border border-gray-100 hover:border-emerald-500 transition-all space-y-2 block">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy">Purchase Hub</h4>
              <p className="text-gray-500 text-xs">Affordability calculator & Pre-Approval steps.</p>
            </Link>

            <Link href="/refinance" className="p-5 bg-white rounded-2xl shadow-luxury border border-gray-100 hover:border-blue-500 transition-all space-y-2 block">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy">Refinance Hub</h4>
              <p className="text-gray-500 text-xs">Rate reduction & cash-out equity tools.</p>
            </Link>

            <Link href="/apply/form-1003" className="p-5 bg-white rounded-2xl shadow-luxury border border-gray-100 hover:border-purple-500 transition-all space-y-2 block">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy">Form 1003 Portal</h4>
              <p className="text-gray-500 text-xs">Complete uniform loan application online.</p>
            </Link>

            <Link href="/loans/jumbo" className="p-5 bg-white rounded-2xl shadow-luxury border border-gray-100 hover:border-amber-500 transition-all space-y-2 block">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <Building className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-navy">Jumbo & Luxury</h4>
              <p className="text-gray-500 text-xs">Guides for high-value non-conforming loans.</p>
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {["All", "Loan Guides", "Jumbo Loans", "Conventional", "Application Guides", "Home Purchase", "Refinancing"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat 
                    ? "bg-navy text-white shadow-md" 
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles & Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-blue-600 uppercase tracking-wider">{article.category}</span>
                    <span className="text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-navy leading-snug">{article.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{article.description}</p>
                </div>

                <Link href={article.link} className="pt-2 block">
                  <Button className="w-full bg-gray-50 hover:bg-navy hover:text-white text-navy font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
                <p className="text-gray-500 text-xs mt-0.5">Quick answers to common questions about loans, rates, and qualification.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <h4 className="text-sm font-bold text-navy flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 text-xs leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action Card */}
          <div className="bg-navy text-white p-8 lg:p-10 rounded-3xl shadow-glass flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">Ready to Start Your Loan Application?</h3>
              <p className="text-gray-300 text-xs max-w-xl">
                Submit your details directly through our secure Fannie Mae Form 1003 online portal.
              </p>
            </div>
            <Link href="/apply/form-1003" className="shrink-0">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-xl text-xs shadow-lg flex items-center gap-2">
                Open Form 1003 <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}