"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, PhoneCall, ShieldCheck } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loansDropdownOpen, setLoansDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold font-heading text-navy tracking-tight">
            CYNL <span className="text-emerald">FINANCIAL</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate">
          <div className="relative" onMouseLeave={() => setLoansDropdownOpen(false)}>
            <button 
              onMouseEnter={() => setLoansDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-emerald transition-colors py-2"
            >
              Loan Programs <ChevronDown className="w-4 h-4" />
            </button>
            {loansDropdownOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-xl shadow-luxury border border-gray-100 p-4 grid gap-2 animate-in fade-in-50">
                <Link href="/loans/jumbo" className="p-2 hover:bg-gray-50 rounded-lg block">
                  <div className="font-bold text-navy text-xs">Jumbo Financing</div>
                  <div className="text-gray-500 text-[11px]">High-balance luxury estates in LA & SF</div>
                </Link>
                <Link href="/loans/bank-statement" className="p-2 hover:bg-gray-50 rounded-lg block">
                  <div className="font-bold text-navy text-xs">Bank Statement Loans</div>
                  <div className="text-gray-500 text-[11px]">Designed for self-employed entrepreneurs</div>
                </Link>
                <Link href="/loans/dscr" className="p-2 hover:bg-gray-50 rounded-lg block">
                  <div className="font-bold text-navy text-xs">DSCR Investment Loans</div>
                  <div className="text-gray-500 text-[11px]">Qualify via property cash flow, not tax returns</div>
                </Link>
                <Link href="/loans/conventional" className="p-2 hover:bg-gray-50 rounded-lg block">
                  <div className="font-bold text-navy text-xs">Conventional & FHA</div>
                  <div className="text-gray-500 text-[11px]">Competitive market rates for primary residences</div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/rates" className="hover:text-emerald transition-colors">Rates</Link>
          <Link href="/calculators/mortgage-calculator" className="hover:text-emerald transition-colors">Calculators</Link>
          <Link href="/process" className="hover:text-emerald transition-colors">Our Process</Link>
          <Link href="/about" className="hover:text-emerald transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-emerald transition-colors">Contact</Link>
        </nav>

        {/* Actions CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:8005552965" className="flex items-center gap-2 text-xs font-semibold text-navy bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <PhoneCall className="w-3.5 h-3.5 text-emerald" />
            (800) 555-CYNL
          </a>
          <Link href="/apply">
            <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-5 py-2.5 rounded-lg shadow-glass">
              Apply Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate hover:text-navy"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4">
          <Link href="/loans/jumbo" className="block text-sm font-medium text-slate py-2">Loan Programs</Link>
          <Link href="/rates" className="block text-sm font-medium text-slate py-2">Live Mortgage Rates</Link>
          <Link href="/calculators/mortgage-calculator" className="block text-sm font-medium text-slate py-2">Mortgage Calculator</Link>
          <Link href="/about" className="block text-sm font-medium text-slate py-2">About Us</Link>
          <Link href="/contact" className="block text-sm font-medium text-slate py-2">Contact Advisory</Link>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <Link href="/apply">
              <Button className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3">
                Apply Now Securely
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}