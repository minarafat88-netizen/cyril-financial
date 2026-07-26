import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

export default function RatesPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-20 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-black text-navy tracking-tight">Today's Mortgage Rates</h1>
            <p className="text-sm text-gray-500">
              Rates updated as of {currentDate}. Rates are subject to change without notice.
            </p>
          </div>

          {/* Rates Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 30-Year Fixed */}
            <div className="bg-white p-6 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider">30-Year Fixed</h3>
                  <span className="text-xs text-gray-400">Conventional</span>
                </div>
                <div className="text-xl">🪙</div>
              </div>
              <div className="space-y-1 mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-navy">6.125%</span>
                  <span className="text-xs font-bold text-gray-500 mb-1">Rate</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-600">6.241%</span>
                  <span className="text-xs text-gray-400">APR</span>
                </div>
              </div>
              <Link href="/apply" className="mt-auto text-center bg-silver-button text-navy border border-gray-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-105 transition-all">
                Lock this Rate
              </Link>
            </div>

            {/* 15-Year Fixed */}
            <div className="bg-white p-6 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#059669] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                Popular
              </div>
              <div className="flex justify-between items-start mb-6 mt-2">
                <div>
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider">15-Year Fixed</h3>
                  <span className="text-xs text-gray-400">Conventional</span>
                </div>
                <div className="text-xl">🪙</div>
              </div>
              <div className="space-y-1 mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-navy">5.500%</span>
                  <span className="text-xs font-bold text-gray-500 mb-1">Rate</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-600">5.612%</span>
                  <span className="text-xs text-gray-400">APR</span>
                </div>
              </div>
              <Link href="/apply" className="mt-auto text-center bg-navy text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:bg-navy-light transition-all shadow-md">
                Lock this Rate
              </Link>
            </div>

            {/* 5/1 ARM */}
            <div className="bg-white p-6 rounded-3xl shadow-card-soft border border-gray-100 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-sm font-bold text-navy uppercase tracking-wider">5/1 ARM</h3>
                  <span className="text-xs text-gray-400">Adjustable Rate</span>
                </div>
                <div className="text-xl">🪙</div>
              </div>
              <div className="space-y-1 mb-6">
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-navy">5.875%</span>
                  <span className="text-xs font-bold text-gray-500 mb-1">Rate</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-gray-600">6.015%</span>
                  <span className="text-xs text-gray-400">APR</span>
                </div>
              </div>
              <Link href="/apply" className="mt-auto text-center bg-silver-button text-navy border border-gray-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider hover:brightness-105 transition-all">
                Lock this Rate
              </Link>
            </div>

          </div>

          <div className="bg-surface p-6 rounded-2xl border border-gray-200 text-xs text-gray-500 leading-relaxed text-justify">
            <strong>Disclaimer:</strong> The interest rates, annual percentage rates (APRs), and discount points shown are subject to change without notice. Your actual rate, payment, and costs could be higher. Get an official Loan Estimate before choosing a loan. The rates shown are based on a purchase of a primary residence with a loan amount of $500,000, a down payment of 20%, and a credit score of 740 or higher.
          </div>
        </div>
      </main>

    </div>
  );
}