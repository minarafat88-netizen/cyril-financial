"use client";

import React from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";

export function Header() {
  return (
    <header className="bg-navy border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching Attachment */}
        <Link href="/" className="flex items-center group py-2">
          <SiteLogo className="w-auto h-full first:on-transform group-hover:scale-105" size={130} priority />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-silver-light">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/about" className="hover:text-white transition-colors">
            About
          </Link>
          <Link href="/loans" className="hover:text-white transition-colors">
            Loan Programs
          </Link>
          <Link href="/purchase" className="hover:text-white transition-colors">
            Purchase
          </Link>
          <Link href="/refinance" className="hover:text-white transition-colors">
            Refinance
          </Link>
          <Link href="/resources" className="hover:text-white transition-colors">
            Resources
          </Link>
        </nav>

        {/* Portal & CTA Action Buttons */}
        <div className="flex items-center gap-5">
          <Link
            href="/portal"
            className="hidden sm:block text-xs uppercase tracking-wider text-silver hover:text-white font-semibold transition-colors"
          >
            Portal
          </Link>
          <Link
            href="/apply"
            className="bg-silver-button text-navy font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition-all border border-white/50"
          >
            Get Pre-Qualified
          </Link>
        </div>
      </div>
    </header>
  );
}