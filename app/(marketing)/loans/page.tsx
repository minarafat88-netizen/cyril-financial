import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";

// قائمة برامج القروض لعرضها بأسماء فقط وأسلوب متناسق مع الموقع
const loanProgramsList = [
  { name: "Fixed-Rate Mortgages", slug: "fixed-rate" },
  { name: "Adjustable-Rate Mortgages (ARM)", slug: "arm" },
  { name: "Conforming Conventional Loans", slug: "conforming-conventional" }, // تم التصحيح من purchase
  { name: "Jumbo Loans", slug: "jumbo" }, // تم التصحيح من jumbo-loans ليتوافق مع مسار /loans/jumbo
  { name: "FHA Loans", slug: "fha" },
  { name: "VA Loans", slug: "va" },
  { name: "USDA Loans", slug: "usda" },
  { name: "Non-QM Loans", slug: "non-qm" },

];

export default function LoanProgramsPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col">
        {/* Page Header Section */}
        <section className="bg-navy py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white">
              Loan Programs
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              Explore our comprehensive suite of financing solutions designed for your residential and investment needs.
            </p>
          </div>
        </section>

        {/* Programs List Grid Section */}
        <section className="py-20 px-6 flex-1">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loanProgramsList.map((program, index) => (
                <Link
                  key={index}
                  href={`/loans/${program.slug}`}
                  className="bg-white p-6 rounded-2xl shadow-card-soft border border-gray-100 flex items-center justify-between hover:border-navy transition-all group"
                >
                  <span className="font-bold text-navy text-base group-hover:text-blue-900">
                    {program.name}
                  </span>
                  <span className="text-gray-400 group-hover:text-navy transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}