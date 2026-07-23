"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { EnterpriseLeadForm } from "@/components/forms/lead-form";
import { AdvancedMortgageCalculator } from "@/components/calculators/mortgage-calc";
import { ShieldCheck, Award, TrendingUp, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-navy text-white py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald/20 border border-emerald/30 text-gold text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-4 h-4" /> California DRE #02198421 | NMLS #2481023
            </div>
            
            <h1 className="text-4xl md:text-6xl font-extrabold font-heading tracking-tight leading-tight">
              Engineered Luxury Financing for California’s Most Discerning Homebuyers.
            </h1>
            
            <p className="text-gray-300 text-lg max-w-2xl leading-relaxed">
              Cynl Financial Group combines institutional private banking strength with boutique white-glove advisory. Securing premier residential and commercial properties throughout Los Angeles and across California with absolute precision.
            </p>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass mt-4">
              <Image
                src="/images/hero-luxury-estate.png"
                alt="Luxury California estate"
                width={1200}
                height={700}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/apply">
                <Button className="w-full sm:w-auto bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-4 rounded-xl shadow-glass flex items-center justify-center gap-2 text-base">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/calculators/mortgage-calculator">
                <Button className="w-full sm:w-auto border border-white/70 bg-transparent text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl text-base">
                  Calculate Payments
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-navy-light/60">
              <div>
                <p className="text-2xl md:text-3xl font-bold font-heading text-gold">$2.4B+</p>
                <p className="text-xs text-gray-400 mt-1">California Loans Funded</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-heading text-gold">14 Days</p>
                <p className="text-xs text-gray-400 mt-1">Average Closing Speed</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold font-heading text-gold">4.9/5.0</p>
                <p className="text-xs text-gray-400 mt-1">Client Satisfaction Rating</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <EnterpriseLeadForm />
          </div>
        </div>
      </section>

      {/* Trust Badges & Institutional Authority */}
      <section className="bg-gray-50 py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-6">
            Recognized Excellence & Institutional Partners Across California
          </p>
          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-luxury">
            <Image
              src="/images/century-city-office.png"
              alt="Century City office"
              width={1600}
              height={900}
              className="w-full h-[280px] md:h-[380px] object-cover"
            />
          </div>
          <div className="flex flex-wrap justify-center items-center gap-10 opacity-70 grayscale hover:grayscale-0 transition-all">
            <span className="font-heading font-bold text-xl text-navy tracking-wider">CHASE PRIVATE CLIENT</span>
            <span className="font-heading font-bold text-xl text-navy tracking-wider">GOLDMAN SACHS DIGITAL</span>
            <span className="font-heading font-bold text-xl text-navy tracking-wider">ROCKET MORTGAGE PARTNER</span>
            <span className="font-heading font-bold text-xl text-navy tracking-wider">BEVERLY HILLS BOARD</span>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center mb-12">
          <div className="overflow-hidden rounded-3xl border border-gray-100 shadow-luxury">
            <Image
              src="/images/executive-team.png"
              alt="Executive team"
              width={1200}
              height={900}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="bg-navy text-white p-8 rounded-3xl shadow-glass">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Advisory Leadership</span>
            <h3 className="text-2xl font-bold font-heading mt-3">A senior team with institutional precision.</h3>
            <p className="text-gray-300 mt-3 leading-relaxed">
              Our executive advisory group structures financing for luxury buyers, founders, and portfolio investors across California with discretion and speed.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Institutional Authority",
              desc: "Direct access to wholesale capital markets and exclusive portfolio lending products tailored for complex, high-net-worth transactions.",
              icon: ShieldCheck,
            },
            {
              title: "Bespoke Advisory",
              desc: "Dedicated senior mortgage strategists supporting self-employed borrowers, complex tax profiles, and multi-property acquisitions.",
              icon: Users,
            },
            {
              title: "Speed & Precision",
              desc: "A refined digital workflow designed to accelerate qualification, documentation, and closings without sacrificing control.",
              icon: TrendingUp,
            },
          ].map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-luxury"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-navy mb-3">{pillar.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Interactive Mortgage Calculator Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald">Financial Precision</span>
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2">
            Calculate Your California Mortgage
          </h2>
          <p className="text-slate text-sm mt-3">
            Analyze exact monthly obligations incorporating California property tax rates, homeowners insurance, and jumbo loan terms.
          </p>
        </div>
        <AdvancedMortgageCalculator />
      </section>

      {/* Specialized Loan Programs Hub */}
      <section className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-emerald">Bespoke Lending</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-navy mt-2">
              Specialized Mortgage Programs
            </h2>
            <p className="text-slate text-sm mt-3">
              Tailored liquidity solutions for W-2 earners, self-employed entrepreneurs, and real estate portfolio investors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Jumbo & Ultra-Jumbo Loans",
                desc: "Financing up to $15M+ for luxury estates throughout Beverly Hills, Bel Air, Newport Beach, and San Francisco.",
                link: "/loans/jumbo",
              },
              {
                title: "Bank Statement Loans",
                desc: "Skip traditional tax returns. Qualify using 12 to 24 months of personal or business bank deposit statements.",
                link: "/loans/bank-statement",
              },
              {
                title: "DSCR Investment Loans",
                desc: "Scale your real estate rental portfolio without personal income verification. Qualified solely on property cash flow.",
                link: "/loans/dscr",
              },
            ].map((loan, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-luxury border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold font-heading text-navy mb-3">{loan.title}</h3>
                  <p className="text-slate text-sm leading-relaxed mb-6">{loan.desc}</p>
                </div>
                <Link href={loan.link} className="inline-flex items-center gap-2 text-xs font-bold text-emerald hover:underline">
                  Explore Program Guidelines <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}