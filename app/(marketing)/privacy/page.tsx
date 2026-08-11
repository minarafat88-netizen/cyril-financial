import React from "react";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Cyril Financial Group",
  description: "Learn how Cyril Financial Group collects, protects, and handles your personal and financial information with bank-level security.",
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "August 11, 2026";

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Page Header */}
          <div className="text-center space-y-4 border-b border-gray-200 pb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/10 text-emerald-dark rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Shield className="w-3.5 h-3.5" /> Legal & Security
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">Privacy Policy</h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Your trust is our highest asset. This policy outlines how Cyril Financial Group secures, manages, and protects your data.
            </p>
            <p className="text-xs text-gray-400">Last updated: {lastUpdated}</p>
          </div>

          {/* Content Sections */}
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-luxury border border-gray-100 space-y-10 text-sm leading-relaxed text-gray-700">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">01</span>
                Introduction
              </h2>
              <p>
                Welcome to Cyril Financial Group ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal and financial data. This Privacy Policy explains what information we collect when you visit our website, use our digital mortgage calculators, submit loan applications, or interact with our client portal, and how we safeguard that information.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">02</span>
                Information We Collect
              </h2>
              <p>To provide accurate mortgage advisory and financing services, we may collect the following categories of information:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li><strong>Personal Identification Data:</strong> Full name, email address, phone number, and residential address.</li>
                <li><strong>Financial & Credit Information:</strong> Income details, employment history, down payment amounts, credit scores, and asset verification data provided during the pre-approval or loan application process.</li>
                <li><strong>Technical & Usage Data:</strong> IP address, browser type, device info, and interaction logs with our platform to improve user experience and security.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">03</span>
                How We Use Your Information
              </h2>
              <p>The data we collect is utilized strictly for professional and operational purposes, including:</p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Processing your mortgage applications, pre-approvals, and loan program evaluations.</li>
                <li>Communicating updates regarding your loan status, market rates, or advisory appointments.</li>
                <li>Enhancing platform security, preventing fraudulent activities, and complying with federal lending laws and regulations.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">04</span>
                Data Security & Vault Protection
              </h2>
              <p>
                We implement robust administrative, technical, and physical security measures—including advanced encryption protocols (SSL/TLS) and secure database architectures (Neon PostgreSQL)—to protect your sensitive financial records from unauthorized access, disclosure, or alteration.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">05</span>
                Sharing of Information
              </h2>
              <p>
                We do not sell, rent, or trade your personal information to third parties. We share your data only with trusted partners necessary to fulfill your loan transaction (such as underwriters, credit bureaus, and title companies) or when required by law or legal compliance.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs">06</span>
                Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please reach out to our compliance team:
              </p>
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center gap-3 text-xs font-semibold text-navy">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Email: privacy@cyrilfinancial.com | Support Hotline: 1-800-CYRIL-GROUP</span>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
}