"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

const leadFormSchema = z.object({
  loanPurpose: z.string().min(1, "Please select a loan purpose"),
  purchasePrice: z.coerce.number().min(50000, "Minimum purchase price is $50,000"),
  downPayment: z.coerce.number().min(0, "Down payment cannot be negative"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  propertyZip: z.string().length(5, "ZIP code must be 5 digits"),
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
      } else {
        console.error("Failed to submit lead");
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
              <select {...form.register("loanPurpose")} className="w-full rounded-xl border border-gray-200 p-3 text-sm text-slate bg-white font-medium">
                <option value="Purchase">Purchase Home</option>
                <option value="Refinance">Refinance / Cash-Out</option>
                <option value="Jumbo">Jumbo Financing</option>
              </select>
              {form.formState.errors.loanPurpose && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.loanPurpose.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Purchase Price ($)</label>
                <Input type="number" {...form.register("purchasePrice")} className="font-semibold text-navy" />
                {form.formState.errors.purchasePrice && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.purchasePrice.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Down Payment ($)</label>
                <Input type="number" {...form.register("downPayment")} className="font-semibold text-navy" />
                {form.formState.errors.downPayment && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.downPayment.message}</p>
                )}
              </div>
            </div>
            <Button 
              type="button" 
              onClick={() => {
                // Trigger validation for step 1 fields before moving to step 2
                form.trigger(["loanPurpose", "purchasePrice", "downPayment"]).then((isValid) => {
                  if (isValid) setStep(2);
                });
              }} 
              className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3.5 rounded-xl mt-2"
            >
              Continue to Contact Info <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 animate-in fade-in-50">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">First Name</label>
                <Input {...form.register("firstName")} placeholder="Jonathan" className="font-semibold text-navy" />
                {form.formState.errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Last Name</label>
                <Input {...form.register("lastName")} placeholder="Vanderbilt" className="font-semibold text-navy" />
                {form.formState.errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Email Address</label>
              <Input type="email" {...form.register("email")} placeholder="jonathan@vanderbilt.com" className="font-semibold text-navy" />
              {form.formState.errors.email && (
                <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-validation mb-1">Phone Number</label>
                <Input type="tel" {...form.register("phone")} placeholder="(310) 555-0144" className="font-semibold text-navy" />
                {form.formState.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Property ZIP</label>
                <Input {...form.register("propertyZip")} placeholder="90210" className="font-semibold text-navy" />
                {form.formState.errors.propertyZip && (
                  <p className="text-red-500 text-xs mt-1">{form.formState.errors.propertyZip.message}</p>
                )}
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/3 py-3 border-gray-200">Back</Button>
              <Button type="submit" disabled={loading} className="w-2/3 bg-emerald hover:bg-emerald-dark text-white font-semibold py-3 rounded-xl shadow-glass">
                {loading ? "Processing..." : "Get My Free Quote"}
              </Button>
            </div>
          </div>
        )}
      </form>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs text-slate">
        <ShieldCheck className="w-4 h-4 text-emerald shrink-0" />
        <span>Bank-grade 256-bit SSL encryption. Your information is strictly confidential.</span>
      </div>
    </div>
  );
}