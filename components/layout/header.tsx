"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SiteLogo } from "@/components/ui/site-logo";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-navy border-b border-white/10 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching Attachment */}
        <Link href="/" className="flex items-center group py-2">
          <SiteLogo className="w-auto h-full first:on-transform group-hover:scale-105" size={130} priority />
        </Link>

        {/* Navigation Links for Desktop */}
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-silver hover:text-white transition-colors focus:outline-none"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-navy border-b border-white/10 shadow-xl py-6 px-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-silver-light">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              About
            </Link>
            <Link
              href="/loans"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              Loan Programs
            </Link>
            <Link
              href="/purchase"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              Purchase
            </Link>
            <Link
              href="/refinance"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              Refinance
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2"
            >
              Resources
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-white transition-colors py-2 text-xs uppercase tracking-wider text-silver font-semibold sm:hidden"
            >
              Portal
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}