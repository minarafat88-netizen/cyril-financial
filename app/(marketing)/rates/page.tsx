"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingDown, ShieldCheck, ArrowRight } from "lucide-react";

interface RateItem {
  id: string;
  programName: string;
  rate: number;
  apr: number;
  lockDays: number;
}

export default function LiveRatesPage() {
  const [rates] = useState<RateItem[]>([
    { id: "1", programName: "30-Year Fixed Conforming", rate: 6.375, apr: 6.452, lockDays: 30 },
    { id: "2", programName: "15-Year Fixed Conforming", rate: 5.750, apr: 5.841, lockDays: 30 },
    { id: "3", programName: "7/1 ARM Jumbo Luxury", rate: 5.875, apr: 6.012, lockDays: 45 },
    { id: "4", programName: "12-Month Bank Statement", rate: 7.125, apr: 7.240, lockDays: 30 },
    { id: "5", programName: "DSCR Investment Property", rate: 7.375, apr: 7.510, lockDays: 30 },
    { id: "6", programName: "VA 30-Year Fixed Zero Down", rate: 6.125, apr: 6.198, lockDays: 30 },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-10 shadow-glass text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <TrendingDown className="w-3.5 h-3.5" /> Updated Real-Time Market Pricing
          </div>
          <h1 className="text-4xl font-bold font-heading">California Daily Mortgage Rates</h1>
          <p className="text-gray-300 text-sm mt-3 leading-relaxed max-w-3xl mx-auto">
            Institutional wholesale pricing secured through direct capital market partnerships. Rates reflect primary residence transactions with specified down payments in Los Angeles and California.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "Live Pricing", value: "Wholesale Access" },
            { label: "Secured Terms", value: "Same-Day Guidance" },
            { label: "Client Protection", value: "Protected Advising" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-gray-100 shadow-luxury p-5 text-center">
              <div className="text-xs uppercase tracking-wider text-slate mb-2">{item.label}</div>
              <div className="text-lg font-bold font-heading text-navy">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-luxury border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-navy text-white text-xs font-semibold uppercase tracking-wider">
                  <th className="py-4 px-6">Loan Program</th>
                  <th className="py-4 px-6">Interest Rate</th>
                  <th className="py-4 px-6">APR</th>
                  <th className="py-4 px-6">Lock Period</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {rates.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-bold text-navy">{item.programName}</td>
                    <td className="py-5 px-6 font-extrabold text-emerald text-lg">{item.rate}%</td>
                    <td className="py-5 px-6 text-slate font-medium">{item.apr}%</td>
                    <td className="py-5 px-6 text-slate">{item.lockDays} Days</td>
                    <td className="py-5 px-6 text-right">
                      <Link href="/apply">
                        <Button size="sm" className="bg-emerald hover:bg-emerald-dark text-white font-semibold">
                          Lock Rate
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald/20 text-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-gold">Ready to secure your rate?</h3>
              <p className="text-gray-300 text-sm mt-1">Lock in today&apos;s wholesale pricing with zero obligation.</p>
            </div>
          </div>
          <Link href="/apply">
            <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3 rounded-xl">
              Get Custom Quote <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}