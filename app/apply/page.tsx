"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitLead } from "./actions";

export default function ApplyPage() {
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Purchase a Home",
    message: "",
    source: "Loan Application Funnel",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      const result = await submitLead(formData);
      if (result.success) {
        setSuccessMessage(true);
      } else {
        setErrorMessage(result.error || "Something went wrong.");
      }
    });
  };

  if (successMessage) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-12 px-4 font-sans">
        <div className="w-full max-w-xl space-y-6 bg-white p-10 rounded-3xl shadow-card-soft border border-gray-100 text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-navy">Application Received!</h2>
          <p className="text-sm text-gray-500">
            Thank you, {formData.name}. Our advisory team has received your details and will contact you shortly.
          </p>
          <Link href="/" className="inline-block bg-navy text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-xl space-y-8 bg-white p-10 rounded-3xl shadow-card-soft border border-gray-100">
        
        <div className="flex flex-col items-center text-center space-y-4">
          <Link href="/" className="flex items-center justify-center">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center bg-white">
              <Image src="/images/Logo5.png" alt="Cyril Financial Logo" width={56} height={56} className="w-full h-full object-cover" />
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-navy">Get Pre-Qualified in Minutes</h2>
          <p className="text-sm text-gray-500">Secure, fast, and transparent. Let's start with some basic details.</p>
        </div>

        {errorMessage && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-200 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Goal / Loan Type</label>
              <select 
                value={formData.loanType}
                onChange={(e) => setFormData({...formData, loanType: e.target.value})}
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all cursor-pointer font-semibold text-navy"
              >
                <option value="Purchase a Home">Purchase a Home</option>
                <option value="Refinance Existing Loan">Refinance Existing Loan</option>
                <option value="Cash-Out / Investment">Cash-Out / Investment</option>
                <option value="Jumbo Loan">Jumbo Loan</option>
                <option value="FHA Loan">FHA Loan</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Full Name</label>
              <input 
                required 
                type="text" 
                placeholder="John Doe" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  placeholder="john@example.com" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Phone Number</label>
                <input 
                  type="text" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1">Additional Notes / Message</label>
              <textarea 
                rows={3}
                placeholder="Tell us about your financial goals..." 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-navy hover:bg-navy-light focus:outline-none transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Application →"}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1">🔒 256-bit Secure Encryption. Your data is safe.</p>
        </div>
      </div>
    </div>
  );
}