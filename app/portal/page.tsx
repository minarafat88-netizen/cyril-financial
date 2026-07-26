import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';

export default function ClientPortalPage() {
  // Mock data for UI demonstration purposes
  const clientName = "Alex";
  const loanStatus = "Underwriting Review"; 
  const progressPercentage = 65;

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Welcome Dashboard Header */}
          <div className="bg-navy rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-black">Welcome back, {clientName}!</h1>
              <p className="text-silver mt-2">Here is the latest update on your mortgage application.</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl border border-white/20 shadow-inner">
              <span className="text-3xl">🪙</span>
              <div>
                <div className="text-xs text-silver uppercase tracking-wider font-bold">Estimated Loan Amount</div>
                <div className="text-xl font-black text-white">$450,000</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Loan Application Status Tracker */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-card-soft border border-gray-100">
              <h2 className="text-xl font-bold text-navy mb-6 border-b border-gray-100 pb-4">Application Status</h2>
              
              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between text-sm font-bold text-navy mb-3">
                  <span>Current Phase: {loanStatus}</span>
                  <span>{progressPercentage}% Completed</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-navy h-3 rounded-full transition-all duration-1000 ease-out relative" 
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Status Milestones */}
              <div className="space-y-8">
                <div className="flex gap-4 items-start relative">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center font-bold flex-shrink-0 border border-green-200 z-10">
                    ✓
                  </div>
                  <div className="absolute top-10 left-5 w-px h-12 bg-green-200 -z-0"></div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">Application Submitted</h3>
                    <p className="text-xs text-gray-500 mt-1">Your initial application and credit authorization were successfully processed.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start relative">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold flex-shrink-0 border border-blue-200 z-10 animate-pulse">
                    ↻
                  </div>
                  <div className="absolute top-10 left-5 w-px h-12 bg-gray-100 -z-0"></div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">Underwriting Review</h3>
                    <p className="text-xs text-gray-500 mt-1">Our underwriting team is actively verifying your financial documents and income history.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start opacity-40">
                  <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-400 flex items-center justify-center font-bold flex-shrink-0 border border-gray-200 z-10">
                    🔒
                  </div>
                  <div>
                    <h3 className="font-bold text-navy text-sm">Clear to Close</h3>
                    <p className="text-xs text-gray-500 mt-1">Final approval is pending. We will notify you to schedule your closing date.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Items & Secure Uploads */}
            <div className="bg-white rounded-3xl p-8 shadow-card-soft border border-gray-100 flex flex-col">
              <h2 className="text-xl font-bold text-navy mb-6 border-b border-gray-100 pb-4">Action Items</h2>
              
              <div className="flex-1 space-y-4">
                {/* Pending Document Card */}
                <div className="p-5 border border-red-100 bg-red-50/50 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-red-900 text-sm">W-2 Form (2025)</h3>
                    <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">Required</span>
                  </div>
                  <p className="text-xs text-red-700 mb-4 leading-relaxed">Please upload your most recent W-2 form to keep your application moving forward.</p>
                  <button className="w-full bg-red-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-red-700 transition-colors shadow-sm">
                    Upload Securely
                  </button>
                </div>

                {/* Verified Document Card */}
                <div className="p-5 border border-gray-200 bg-gray-50 rounded-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-navy text-sm">Bank Statements</h3>
                    <span className="bg-green-100 text-green-800 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider">Verified</span>
                  </div>
                  <p className="text-xs text-gray-500">2 months of statements received and approved by underwriting.</p>
                </div>
              </div>
              {/* Support Contact */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-xs text-gray-500 text-center mb-4">Need help with your documents?</p>
                <Link href="/contact" className="w-full bg-silver-button text-navy border border-gray-200 font-bold py-3 rounded-xl text-sm hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-sm">
                  <span>💬</span> Contact Loan Officer
                </Link>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}