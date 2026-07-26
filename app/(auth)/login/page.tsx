"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // سيتم هنا ربط دالة المصادقة مع Firebase لاحقاً
    console.log("Logging in with:", email, password);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
        
        {/* Header / Brand */}
        <div className="bg-navy p-8 text-center flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 group mb-4">
            <SiteLogo className="w-12 h-12 rounded-xl shadow-icon-emboss" size={48} />
          </Link>
          <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h2>
          <p className="text-xs text-silver-dark mt-2">
            Sign in to access your secure client portal.
          </p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@example.com"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-blue-600 font-bold hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-surface border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-navy text-white font-bold py-3.5 rounded-xl text-sm shadow-md hover:bg-navy-light active:scale-95 transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Don't have an account?{" "}
              <Link href="/register" className="text-navy font-bold hover:underline">
                Start your application
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}