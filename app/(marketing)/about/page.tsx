import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { AiSupportChat } from "@/components/widgets/ai-support-chat";
import { ShieldCheck, Zap, Handshake, Target, Eye, Sparkles, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-navy relative overflow-hidden">
      <Header />

      {/* Hero Section - Vibrant & Engaging */}
      <section className="relative bg-gradient-to-br from-slate-950 via-navy to-blue-950 py-28 px-6 text-white overflow-hidden">
        {/* Decorative Ambient Glows */}
        <div className="absolute top-0 right-0 w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 text-blue-200 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Where Ambition Meets Financial Stability
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
            Engineering the Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200">Mortgage & Financing</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            At Cyril Financial Group, every home you dream of, and every investment step you take, deserves meticulous financial engineering tailored precisely to your future goals.
          </p>
        </div>
      </section>

      {/* Visual Brand Showcase Section (تخيل صورة تعبيرية مبهرة للشركة) */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 to-slate-900 p-8 md:p-16 text-white shadow-2xl flex flex-col md:flex-row items-center gap-10">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 space-y-6 flex-1">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 px-3 py-1 rounded-md border border-blue-800/50">
                Our Identity
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Redefining Trust Through Innovation
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                We are more than just a traditional financing provider; we are your trusted partner. We combine deep market expertise and cutting-edge technology to deliver a seamless, secure, and personalized financing experience.
              </p>
            </div>

            {/* عنصر بصري تجريدي يرمز لقوة وحيوية الشركة */}
            <div className="relative z-10 w-full md:w-80 h-64 bg-gradient-to-tr from-blue-600/30 to-indigo-500/30 backdrop-blur-xl border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-inner">
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-300">CFG Global Standard</span>
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-black text-white">100% Transparency</div>
                <div className="text-xs text-slate-300">Tailored digital engineering for modern real estate investors.</div>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-400 h-full w-4/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To empower homeowners and investors through absolute transparency, digital innovation, and elite banking advisory, making the mortgage process accessible, fast, and secure.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-md">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              To redefine the future of financial and mortgage engineering by setting new benchmarks in client-centric solutions, reliability, and technological integration.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">Our Core Pillars</h2>
            <p className="text-slate-500 max-w-lg mx-auto text-sm">
              The foundational values that drive every aspect of our service and client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-white via-slate-100 to-slate-300 shadow-sm border border-slate-300 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Absolute Transparency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                No hidden fees, no complications—every detail is laid out clearly before you to ensure fully informed financial decisions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-white via-slate-100 to-slate-300 shadow-sm border border-slate-300 flex items-center justify-center">
                <Zap className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Speed & Efficiency</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A fully integrated digital experience ensuring fast processing, rapid pre-approvals, and seamless loan closing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-white via-slate-100 to-slate-300 shadow-sm border border-slate-300 flex items-center justify-center">
                <Handshake className="w-6 h-6 text-slate-700" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Elite Advisory</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A dedicated team of financial experts always available to engineer the perfect solution tailored to your personal and business goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section (CTA) */}
      <section className="bg-slate-950 py-20 px-6 text-white text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Ready to Start Your Financial Journey?</h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Connect with our experts today or launch your digital loan application now, and let us help you build a secure, prosperous future.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/apply"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-lg flex items-center gap-2"
            >
              Start Application <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all"
            >
              Contact an Advisor
            </Link>
          </div>
        </div>
      </section>

      <AiSupportChat />
    </div>
  );
}