import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-navy text-white py-16 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Image
              src="/images/Logo2.png"
              alt="Cyril Financial Group Logo"
              width={120}
              height={40}
              style={{ width: "auto", height: "auto" }}
              className="object-contain max-h-16"
            />
          </div>
          <p className="text-xs text-silver-dark leading-relaxed">
            Empowering buyers, homeowners, and investors with transparent, fast, and secure digital mortgage solutions.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-4">
            Loan Programs
          </h4>
          <ul className="space-y-2.5 text-xs text-silver-dark">
            <li><Link href="/loans/purchase" className="hover:text-white transition">Home Purchase</Link></li>
            <li><Link href="/loans/refinance" className="hover:text-white transition">Refinance & Cash-Out</Link></li>
            <li><Link href="/loans/jumbo" className="hover:text-white transition">Jumbo Loans</Link></li>
            <li><Link href="/loans/non-qm" className="hover:text-white transition">Non-QM Programs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-4">
            Tools & Portals
          </h4>
          <ul className="space-y-2.5 text-xs text-silver-dark">
            <li><Link href="/calculators/mortgage-calculator" className="hover:text-white transition">Mortgage Calculator</Link></li>
            <li><Link href="/rates" className="hover:text-white transition">Live Market Rates</Link></li>
            <li><Link href="/portal" className="hover:text-white transition">Secure Client Vault</Link></li>
            <li><Link href="/apply" className="hover:text-white transition">Pre-Approval Funnel</Link></li>
            {/* إضافة رابط صفحة الاتصال هنا */}
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-silver mb-4">
            Legal & Compliance
          </h4>
          <p className="text-xs text-silver-dark leading-relaxed">
            Equal Housing Lender. All loans subject to credit approval and underwriting guidelines.
          </p>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs text-silver-dark">
        © {new Date().getFullYear()} Cyril Financial Group. All rights reserved.
      </div>
    </footer>
  );
}