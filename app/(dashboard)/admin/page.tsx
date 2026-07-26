"use client";

import React from "react";
import Link from "next/link";
// 1. قمنا باستيراد مكون الأنشطة الحديثة هنا
import { RecentActivityWidget } from "@/components/widgets/recent-activity";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-navy text-white min-h-screen flex flex-col border-r border-navy-light">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-silver-gradient rounded-lg flex items-center justify-center font-black text-navy text-xs">
              CFG
            </div>
            <span className="text-sm font-extrabold tracking-widest text-silver">ADMIN</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="block px-4 py-3 bg-white/10 rounded-xl text-sm font-bold text-white border border-white/5">Overview</Link>
          <Link href="/admin/applications" className="block px-4 py-3 rounded-xl text-sm font-medium text-silver-dark hover:bg-white/5 transition-colors">Applications</Link>
          <Link href="/admin/leads" className="block px-4 py-3 rounded-xl text-sm font-medium text-silver-dark hover:bg-white/5 transition-colors">Leads</Link>
          <Link href="/admin/analytics" className="block px-4 py-3 rounded-xl text-sm font-medium text-silver-dark hover:bg-white/5 transition-colors">Analytics</Link>
          <Link href="/admin/settings" className="block px-4 py-3 rounded-xl text-sm font-medium text-silver-dark hover:bg-white/5 transition-colors">Settings</Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-navy">Dashboard Overview</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          
          {/* KPI Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Total Active Applications</span>
              <span className="text-3xl font-black text-navy">124</span>
              <span className="text-xs font-bold text-[#059669] mt-2">+12% from last month</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">New Leads</span>
              <span className="text-3xl font-black text-navy">38</span>
              <span className="text-xs font-bold text-[#059669] mt-2">+5% from last week</span>
            </div>
            <div className="bg-navy p-6 rounded-2xl shadow-lg border border-navy-light flex flex-col justify-center text-white">
              <span className="text-xs font-bold text-silver-dark uppercase tracking-wider mb-2">Total Funded Volume</span>
              <span className="text-3xl font-black text-silver-light">$12.4M</span>
              <span className="text-xs text-silver mt-2">YTD 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 2. استدعاء المكون الجديد هنا ليأخذ مساحة مناسبة بجوار المحتوى الآخر */}
            <div className="lg:col-span-1">
              <RecentActivityWidget />
            </div>

            {/* مساحة إضافية للرسوم البيانية أو الطلبات السريعة (اختياري مستقبلاً) */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center justify-center text-gray-400 text-sm">
              Chart / Graph Area Placeholder
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}