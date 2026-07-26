"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم ربط هذا النموذج بقاعدة بيانات Firebase لاحقاً
    console.log("Registering user:", formData);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-navy p-8 text-center flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-4 group">
            <SiteLogo className="w-12 h-12 rounded-xl shadow-icon-emboss" size={48} />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-wide">Create Your Account</h2>
          <p className="text-xs text-silver-dark mt-2">
            Start your digital mortgage journey with top-tier security.
          </p>
        </div>

        {/* Registration Form */}
        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-5">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  required
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="client@example.com"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Create a strong password"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <p className="text-[10px] text-gray-400 mt-2">
                Must be at least 8 characters long and include a number and symbol.
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-navy text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:bg-navy-light active:scale-95 transition-all"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-navy font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}