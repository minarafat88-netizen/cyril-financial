"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, FileText, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ leadsCount: 24, appsCount: 12, volume: "$38,400,000" });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Executive Control Center
            </div>
            <h1 className="text-3xl font-bold font-heading">Cynl Financial Enterprise Command</h1>
            <p className="text-gray-300 text-sm mt-1">Real-time pipeline analytics, lead routing, and portfolio loan management.</p>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Active Leads</p>
              <h3 className="text-3xl font-extrabold font-heading text-navy mt-1">{stats.leadsCount}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Loan Applications</p>
              <h3 className="text-3xl font-extrabold font-heading text-navy mt-1">{stats.appsCount}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Pipeline Volume</p>
              <h3 className="text-3xl font-extrabold font-heading text-gold mt-1">{stats.volume}</h3>
            </div>
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold font-heading text-navy">Quick Administrative Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a href="/api/admin/leads" target="_blank" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between">
              <span className="font-semibold text-navy text-sm">Export Leads JSON Feed</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </a>
            <a href="/api/admin/applications" target="_blank" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between">
              <span className="font-semibold text-navy text-sm">Review Active Applications</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </a>
            <a href="/rates" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between">
              <span className="font-semibold text-navy text-sm">Update Live Mortgage Rates</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}