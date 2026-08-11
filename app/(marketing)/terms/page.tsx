import React from "react";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { FileText, Shield, CheckCircle, AlertTriangle, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | Cyril Financial Group",
  description: "Read the terms and conditions governing the use of Cyril Financial Group's digital mortgage platforms and financial services.",
};

export default function TermsOfServicePage() {
  const lastUpdated = "August 11, 2026";

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Page Header */}
          <div className="text-center space-y-4 border-b border-gray-200 pb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" /> Legal Agreement
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">Terms of Service</h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Please read these terms carefully before using Cyril Financial Group's website, digital portals, or mortgage services.
            </p>
            <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          {/* Content Sections */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-luxury border border-gray-100 space-y-10 text-sm leading-relaxed text-gray-700">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">01</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website, client vault, pre-approval funnels, or any digital services provided by Cyril Financial Group ("we," "our," or "us"), you agree to be bound by these Terms of Service and all applicable federal and state lending laws. If you do not agree with any part of these terms, you must discontinue use of our platform immediately.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">02</span>
                Mortgage & Financial Services Scope
              </h2>
              <p>
                Cyril Financial Group operates as a digital mortgage and financial advisory platform. The rates, monthly payment estimates (PITI), and loan program details displayed on our site are for illustrative and pre-qualification estimation purposes only. They do not constitute a binding loan offer, interest rate lock, or official Loan Estimate until a formal application is submitted and approved by underwriting.
              </p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">03</span>
                User Accounts & Security
              </h2>
              <p>
                If you create an account or use our Secure Client Portal, you are responsible for maintaining the confidentiality of your login credentials and password. You agree to notify us immediately of any unauthorized access or security breaches. Cyril Financial Group holds no liability for losses resulting from compromised user accounts due to negligence.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">04</span>
                Intellectual Property Rights
              </h2>
              <p>
                All content, trademarks, logos, software architectures, UI components, and proprietary code featured on this platform are the intellectual property of Cyril Financial Group. Unauthorized copying, redistribution, modification, or commercial exploitation of any site assets without prior written consent is strictly prohibited.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">05</span>
                Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, Cyril Financial Group shall not be held liable for any direct, indirect, incidental, or consequential damages arising from system downtime, inaccurate market rate fluctuations, or reliance on information provided through our digital tools.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">06</span>
                Modifications & Updates
              </h2>
              <p>
                We reserve the right to modify, amend, or update these Terms of Service at any time. Changes will take effect immediately upon posting to the website. Continued use of the platform following any modifications constitutes your acceptance of the revised terms.
              </p>
            </section>

            {/* Section 7 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">07</span>
                Contact & Legal Inquiries
              </h2>
              <p>
                For questions or formal inquiries regarding these Terms of Service, please contact our legal department:
              </p>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3 text-xs font-semibold text-navy">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email: legal@cyrilfinancial.com | Office: 1-800-CYRIL-GROUP</span>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}