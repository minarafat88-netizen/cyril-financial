"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, CheckCircle2, FileText, ArrowRight, Building2, UserCheck } from "lucide-react";
import Link from "next/link";

export default function LoanStatusPage() {
  // بيانات افتراضية لمراحل القرض الحالي
  const [loanDetails] = useState({
    loanId: "CYR-2026-8942",
    propertyAddress: "742 Evergreen Terrace, Los Angeles, CA",
    loanAmount: "$2,450,000",
    interestRate: "6.25%",
    loanTerm: "30 Years Fixed",
    assignedOfficer: "Alexander Wright",
    currentStageIndex: 1, // 0: Submitted, 1: Underwriting, 2: Appraisal, 3: Final Approval
  });

  const stages = [
    {
      title: "Application Submitted",
      description: "Initial intake forms and preliminary credit check completed.",
      date: "July 15, 2026",
      status: "completed",
    },
    {
      title: "Underwriting & Financial Audit",
      description: "Risk analysts are reviewing tax returns, bank statements, and debt-to-income ratios.",
      date: "In Progress",
      status: "current",
    },
    {
      title: "Property Appraisal & Valuation",
      description: "Third-party certified property inspection and market valuation.",
      date: "Pending",
      status: "upcoming",
    },
    {
      title: "Final Loan Approval & Closing (CTC)",
      description: "Issuance of final promissory note and fund disbursement coordination.",
      date: "Pending",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Real-Time Tracking
            </div>
            <h1 className="text-3xl font-bold font-heading">Loan Application Status</h1>
            <p className="text-gray-300 text-sm mt-1">Detailed progression breakdown for application ID: {loanDetails.loanId}</p>
          </div>
          <Link href="/portal">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Portal Overview
            </Button>
          </Link>
        </div>

        {/* Loan Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-gray-100 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Loan Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-navy">{loanDetails.loanAmount}</div>
              <p className="text-xs text-emerald mt-1">{loanDetails.loanTerm}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Interest Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-navy">{loanDetails.interestRate}</div>
              <p className="text-xs text-slate mt-1">Locked Rate Tier</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Loan Officer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-base font-bold text-navy truncate">{loanDetails.assignedOfficer}</div>
              <p className="text-xs text-emerald mt-1">Dedicated Advisor</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-100 shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-bold text-navy truncate">{loanDetails.propertyAddress}</div>
              <p className="text-xs text-slate mt-1">Commercial / Residential</p>
            </CardContent>
          </Card>
        </div>

        {/* Milestone Tracker Details */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold font-heading text-navy">Milestone Progression Pipeline</h3>
          
          <div className="relative border-s-2 border-gray-100 ms-4 space-y-8 ps-6">
            {stages.map((stage, idx) => {
              const isCompleted = stage.status === "completed";
              const isCurrent = stage.status === "current";

              return (
                <div key={idx} className="relative">
                  {/* Dot Icon */}
                  <div className={`absolute -start-[35px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted ? "bg-emerald text-white" :
                    isCurrent ? "bg-gold text-navy animate-pulse ring-4 ring-gold/20" : "bg-gray-200 text-slate"
                  }`}>
                    {isCompleted ? "✓" : idx + 1}
                  </div>

                  <div className={`p-5 rounded-2xl border transition-all ${
                    isCurrent ? "bg-emerald/5 border-emerald/20 shadow-sm" : "bg-gray-50 border-gray-100"
                  }`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <h4 className="font-bold text-navy text-base">{stage.title}</h4>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit ${
                        isCompleted ? "bg-emerald/10 text-emerald" :
                        isCurrent ? "bg-gold/20 text-navy" : "bg-gray-200 text-slate"
                      }`}>
                        {stage.date}
                      </span>
                    </div>
                    <p className="text-slate text-xs mt-2">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}