"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const leadFormSchema = z.object({
  loanPurpose: z.string().min(1),
  purchasePrice: z.coerce.number().min(50000),
  downPayment: z.coerce.number().min(0),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  propertyZip: z.string().length(5),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function EnterpriseLeadForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      loanPurpose: "Purchase",
      purchasePrice: 1250000,
      downPayment: 250000,
      propertyZip: "90210",
    },
  });

  const onSubmit = async (data: LeadFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Lead submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-luxury text-center space-y-4 text-navy">
        <div className="w-16 h-16 bg-emerald/10 text-emerald rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-heading">Consultation Requested</h3>
        <p className="text-slate text-sm leading-relaxed">
          Your details have been received by our Los Angeles advisory team. A Senior Managing Director will contact you within two business hours.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-8 shadow-luxury border border-gray-100 text-navy">
      <div className="mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-emerald">Instant Quote Qualification</span>
        <h3 className="text-2xl font-bold font-heading mt-1">Check Your Eligibility</h3>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in-50">
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Loan Purpose</label>
              <select {...form.register("loanPurpose")} className="w-full rounded-xl border border-gray-200 p-3 text-sm text-slate">
                <option value="Purchase">Purchase Home</option>
                <option value="Refinance">Refinance / Cash-Out</option>
                <option value="Jumbo">Jumbo Financing</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Purchase Price ($)</label>
                <Input type="number" {...form.register("purchasePrice")} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Down Payment ($)</label>
                <Input type="number" {...form.register("downPayment")} />
              </div>
            </div>
            <Button type="button" onClick={() => setStep(2)} className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3.5 rounded-xl mt-2">
              Continue to Contact Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">First Name</label>
                <Input {...form.register("firstName")} placeholder="Jonathan" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Last Name</label>
                <Input {...form.register("lastName")} placeholder="Vanderbilt" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Email Address</label>
              <Input type="email" {...form.register("email")} placeholder="jonathan@vanderbilt.com" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Phone Number</label>
                <Input type="tel" {...form.register("phone")} placeholder="(310) 555-0144" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Property ZIP</label>
                <Input {...form.register("propertyZip")} placeholder="90210" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3 py-3">Back</Button>
              <Button type="submit" disabled={loading} className="w-2/3 bg-emerald hover:bg-emerald-dark text-white font-semibold py-3 rounded-xl">
                {loading ? "Processing..." : "Get My Free Quote"}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}