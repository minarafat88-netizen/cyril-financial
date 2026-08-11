import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SiteLogo } from "@/components/ui/site-logo";
import { ShieldCheck, Home, Phone, Mail, ArrowRight, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-20 pb-12 px-6 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Newsletter / Quick Action Strip */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glass">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold font-heading text-white">Ready to secure your dream home?</h3>
            <p className="text-xs text-silver-dark">Get pre-approved in minutes with our transparent, digital-first mortgage platform.</p>
          </div>
          <Link 
            href="/apply" 
            className="bg-emerald hover:bg-emerald-dark text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 group cursor-pointer"
          >
            Start Your Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Main Footer Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center">
              <Image
                src="/images/Logo2.png"
                alt="Cyril Financial Group Logo"
                width={140}
                height={45}
                style={{ width: "auto", height: "auto" }}
                className="object-contain max-h-16"
              />
            </div>
            <p className="text-xs text-silver-dark leading-relaxed max-w-sm">
              Cyril Financial Group is a premier digital mortgage and financial services institution, empowering buyers, homeowners, and investors with transparent, fast, and secure financing solutions.
            </p>
            <div className="flex items-center gap-3 text-xs text-silver-dark pt-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-silver">
                <Home className="w-4 h-4" />
              </div>
              <span>Equal Housing Lender. NMLS #1234567</span>
            </div>
          </div>

          {/* Column 2: Loan Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-5 border-l-2 border-emerald pl-3">
              Loan Programs
            </h4>
            <ul className="space-y-3 text-xs text-silver-dark">
              {/* تم تعديل الرابط هنا ليوجه إلى الصفحة الرئيسية (/) */}
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/loans/refinance" className="hover:text-white transition-colors">Refinance & Cash-Out</Link></li>
              <li><Link href="/loans/jumbo" className="hover:text-white transition-colors">Jumbo Loans</Link></li>
              <li><Link href="/loans/fha" className="hover:text-white transition-colors">FHA Loans</Link></li>
              <li><Link href="/loans/va" className="hover:text-white transition-colors">VA Loans</Link></li>
              <li><Link href="/loans/non-qm" className="hover:text-white transition-colors">Non-QM Solutions</Link></li>
            </ul>
          </div>

          {/* Column 3: Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-5 border-l-2 border-emerald pl-3">
              Tools & Insights
            </h4>
            <ul className="space-y-3 text-xs text-silver-dark">
              <li><Link href="/calculators/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/rates" className="hover:text-white transition-colors">Live Market Rates</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Market Commentary & Blog</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Educational Resources</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 4: Client Portal & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-5 border-l-2 border-emerald pl-3">
              Client Center
            </h4>
            <ul className="space-y-3 text-xs text-silver-dark">
              <li><Link href="/portal" className="hover:text-white transition-colors">Secure Client Vault</Link></li>
              <li><Link href="/portal/loan-status" className="hover:text-white transition-colors">Track Loan Status</Link></li>
              <li><Link href="/apply" className="hover:text-white transition-colors">Pre-Approval Funnel</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Advisory Team</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Staff / Admin Login</Link></li>
            </ul>
          </div>

        </div>

        {/* Legal, Disclaimers & Compliance Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 text-[11px] text-silver-dark leading-relaxed">
          <div className="flex items-center gap-2 text-silver font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald" /> Regulatory & Legal Disclosures
          </div>
          <p>
            Cyril Financial Group is an Equal Housing Lender. As prohibited by federal law, we do not discriminate on the basis of race, color, religion, sex, handicap, familial status, or national origin. The information provided on this website is for informational purposes only and does not constitute a commitment to lend. All loans are subject to credit approval, satisfactory appraisal, and underwriting guidelines. Programs, rates, terms, and conditions are subject to change without notice.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/5 text-[10px]">
            <span>NMLS Consumer Access: <a href="https://www.nmlsconsumeraccess.org" target="_blank" rel="noopener noreferrer" className="underline hover:text-white inline-flex items-center gap-0.5">www.nmlsconsumeraccess.org <ExternalLink className="w-3 h-3" /></a></span>
            <span>Corporate Headquarters: 100 Financial Plaza, Suite 500, New York, NY</span>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs text-silver-dark">
          <p>© {new Date().getFullYear()} Cyril Financial Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/licensing" className="hover:text-white transition-colors">State Licensing</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}