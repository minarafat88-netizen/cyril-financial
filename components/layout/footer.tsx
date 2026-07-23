import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-12 border-t border-navy-light">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold font-heading tracking-wide text-gold">CYNL FINANCIAL</h2>
          <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
            Institutional private banking standards combined with bespoke residential and commercial mortgage advisory across California.
          </p>
          <div className="text-xs text-gray-400 space-y-1 pt-2">
            <p>CA DRE License #02198421</p>
            <p>NMLS Unique Identifier #2481023</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">Loan Programs</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/loans/jumbo" className="hover:text-white transition-colors">Jumbo Financing</Link></li>
            <li><Link href="/loans/bank-statement" className="hover:text-white transition-colors">Bank Statement Loans</Link></li>
            <li><Link href="/loans/dscr" className="hover:text-white transition-colors">DSCR Investment Loans</Link></li>
            <li><Link href="/loans/conventional" className="hover:text-white transition-colors">Conventional Loans</Link></li>
            <li><Link href="/loans/va" className="hover:text-white transition-colors">VA Loans</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">Calculators</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/calculators/mortgage-calculator" className="hover:text-white transition-colors">Mortgage Calculator</Link></li>
            <li><Link href="/calculators/affordability-calculator" className="hover:text-white transition-colors">Affordability Calculator</Link></li>
            <li><Link href="/rates" className="hover:text-white transition-colors">Live Mortgage Rates</Link></li>
            <li><Link href="/process" className="hover:text-white transition-colors">Loan Process Timeline</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold mb-4">Institutional</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/about/team" className="hover:text-white transition-colors">Meet Our Team</Link></li>
            <li><Link href="/about/reviews" className="hover:text-white transition-colors">Client Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Advisory</Link></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-navy-light/60 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400 space-y-4 md:space-y-0">
        <p>© 2026 Cynl Financial Group, Inc. All rights reserved. Equal Housing Opportunity.</p>
        <div className="flex space-x-6">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/accessibility" className="hover:text-white transition-colors">Accessibility (WCAG 2.2 AA)</Link>
          <Link href="/licensing" className="hover:text-white transition-colors">Licensing Disclosures</Link>
        </div>
      </div>
    </footer>
  );
}