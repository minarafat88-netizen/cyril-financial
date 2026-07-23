"use client";

import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-navy text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">Institutional Excellence</span>
          <h1 className="text-4xl md:text-6xl font-bold font-heading mt-4 mb-6 leading-tight">
            Redefining Luxury Mortgage Lending in California
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Cynl Financial Group delivers private banking sophistication, bespoke loan structuring, and uncompromised white-glove advisory to California&apos;s premier homeowners and real estate investors.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Institutional Authority",
              desc: "Direct access to wholesale capital markets and exclusive portfolio lending products tailored for high-net-worth portfolios.",
              icon: Shield,
            },
            {
              title: "Bespoke Advisory",
              desc: "Dedicated senior mortgage strategists managing complex tax structures, self-employed documentation, and multi-property acquisitions.",
              icon: Users,
            },
            {
              title: "Absolute Speed & Precision",
              desc: "Proprietary automated underwriting workflows and streamlined digital document vaults ensuring 14-day California closings.",
              icon: TrendingUp,
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-luxury"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald/10 text-emerald flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-navy font-heading mb-3">{pillar.title}</h3>
                <p className="text-slate text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl bg-navy text-white p-8 md:p-10 shadow-glass flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Luxury Mortgage Advisory</p>
            <h2 className="text-2xl md:text-3xl font-bold font-heading mt-3">A more confident path to your next California property.</h2>
            <p className="text-gray-300 mt-2 max-w-2xl text-sm leading-relaxed">
              We coordinate underwriting, product selection, and closing strategy with the discretion expected by high-performing buyers and investors.
            </p>
          </div>
          <Link href="/apply">
            <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3 rounded-xl flex items-center gap-2">
              Start Your Application <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}