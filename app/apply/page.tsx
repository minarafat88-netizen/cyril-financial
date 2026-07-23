"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

const fullAppSchema = z.object({
  loanPurpose: z.string().min(1),
  propertyType: z.string().min(1),
  purchasePrice: z.coerce.number().min(50000),
  downPayment: z.coerce.number().min(0),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  propertyAddress: z.string().min(5),
  propertyCity: z.string().min(2),
  propertyState: z.string().length(2),
  propertyZip: z.string().length(5),
  estimatedCreditScore: z.string().min(1),
  annualIncome: z.coerce.number().min(10000),
});

export type FullAppValues = z.infer<typeof fullAppSchema>;

export default function SecureLoanApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [completed, setCompleted] = useState(false);

  const form = useForm<FullAppValues>({
    resolver: zodResolver(fullAppSchema),
    defaultValues: {
      loanPurpose: "Purchase",
      propertyType: "Single Family",
      purchasePrice: 1200000,
      downPayment: 240000,
      propertyState: "CA",
      estimatedCreditScore: "740+",
      annualIncome: 350000,
    },
  });

  // دالة للانتقال للخطوة التالية بعد التأكد من صحة حقول الخطوة الأولى
  const handleNextStep = async () => {
    const valid = await form.trigger(["loanPurpose", "propertyType", "purchasePrice", "downPayment"]);
    if (valid) {
      setStep(2);
    }
  };

  const onSubmit = async (data: FullAppValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setCompleted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-luxury max-w-lg w-full text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-navy">Secure Application Submitted</h1>
          <p className="text-slate text-sm leading-relaxed">
            Your encrypted loan application has been received by Cynl Financial Group underwriting. A Senior Managing Director has been assigned to your file.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/10 text-emerald rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Secure Portal
          </div>
          <h1 className="text-3xl font-bold font-heading text-navy">Secure Loan Application</h1>
          <p className="text-slate text-sm mt-1">Complete your qualification details for instant institutional lender matching.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-luxury p-8 border border-gray-100">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-bold text-navy font-heading">1. Property & Loan Objectives</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Loan Purpose</label>
                    <select {...form.register("loanPurpose")} className="w-full rounded-lg border border-gray-200 p-3 text-sm text-slate">
                      <option value="Purchase">Purchase</option>
                      <option value="Refinance">Refinance</option>
                      <option value="Jumbo">Jumbo Financing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Property Type</label>
                    <select {...form.register("propertyType")} className="w-full rounded-lg border border-gray-200 p-3 text-sm text-slate">
                      <option value="Single Family">Single Family Residence</option>
                      <option value="Condo">Condominium</option>
                      <option value="Multi-Family">Multi-Family / Investment</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Purchase Price ($)</label>
                    <Input type="number" {...form.register("purchasePrice")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Down Payment ($)</label>
                    <Input type="number" {...form.register("downPayment")} />
                  </div>
                </div>
                <Button type="button" onClick={handleNextStep} className="w-full bg-emerald hover:bg-emerald-dark text-white py-3 mt-4">
                  Continue to Personal & Property Location
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in-50">
                <h3 className="text-lg font-bold text-navy font-heading">2. Borrower Identity & Location</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">First Name</label>
                    <Input {...form.register("firstName")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Last Name</label>
                    <Input {...form.register("lastName")} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Email Address</label>
                    <Input type="email" {...form.register("email")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Phone Number</label>
                    <Input type="tel" {...form.register("phone")} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate mb-1">Subject Property Street Address</label>
                  <Input {...form.register("propertyAddress")} placeholder="1004 Wilshire Blvd" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">City</label>
                    <Input {...form.register("propertyCity")} placeholder="Beverly Hills" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">State</label>
                    <Input {...form.register("propertyState")} defaultValue="CA" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">ZIP Code</label>
                    <Input {...form.register("propertyZip")} placeholder="90210" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2">Back</Button>
                  <Button type="submit" disabled={submitting} className="w-1/2 bg-emerald hover:bg-emerald-dark text-white">
                    {submitting ? "Encrypting & Submitting..." : "Submit Secure Application"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}