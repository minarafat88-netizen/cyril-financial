"use client";

import React from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-xl space-y-8 bg-white p-10 rounded-3xl shadow-card-soft border border-gray-100">
        
        {/* Header / Logo */}
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="flex items-center gap-2 group">
            <SiteLogo className="w-10 h-10 rounded-xl border border-silver-dark/30" size={40} />
            <span className="text-xl font-extrabold tracking-wider text-navy">CYRIL</span>
          </Link>
          <h2 className="text-2xl font-bold text-navy">Get Pre-Qualified in Minutes</h2>
          <p className="text-sm text-gray-500">
            Secure, fast, and transparent. Let's start with some basic details.
          </p>
        </div>

        {/* Application Form */}
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="loanType" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">
                Goal
              </label>
              <select id="loanType" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy focus:border-navy outline-none transition-all">
                <option>Purchase a Home</option>
                <option>Refinance Existing Loan</option>
                <option>Cash-Out / Investment</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">First Name</label>
                <input id="firstName" type="text" placeholder="John" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Last Name</label>
                <input id="lastName" type="text" placeholder="Doe" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Email Address</label>
              <input id="email" type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" />
            </div>
          </div>

          <button type="submit" className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-navy hover:bg-navy-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy transition-all active:scale-95">
            Continue to Next Step →
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
            🔒 256-bit Secure Encryption. Your data is safe.
          </p>
        </div>
      </div>
    </div>
  );
}