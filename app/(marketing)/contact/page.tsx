"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="rounded-[28px] bg-navy text-white p-8 md:p-10 shadow-glass">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">Get in Touch</span>
            <h1 className="text-3xl md:text-5xl font-bold font-heading mt-3">Connect with our Los Angeles Advisory</h1>
            <p className="text-gray-300 text-sm mt-3 leading-relaxed">
              Whether you are acquiring a legacy estate in Beverly Hills or structuring a commercial portfolio, our executive team is at your disposal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "Headquarters",
                  detail: "1901 Avenue of the Stars, Suite 1100 Los Angeles, CA 90067",
                  icon: MapPin,
                },
                {
                  title: "Direct Line",
                  detail: "(800) 555-CYNL / (310) 555-0199",
                  icon: Phone,
                },
                {
                  title: "Electronic Mail",
                  detail: "advisory@cynlfinancial.com",
                  icon: Mail,
                },
                {
                  title: "Business Hours",
                  detail: "Monday – Friday: 8:00 AM – 6:00 PM PST",
                  icon: Clock,
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-luxury">
                    <div className="p-3 bg-emerald/10 text-emerald rounded-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                      <p className="text-slate text-sm mt-1 leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white p-8 rounded-3xl shadow-luxury border border-gray-100">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                <h3 className="text-2xl font-bold text-navy font-heading">Consultation Request Confirmed</h3>
                <p className="text-slate text-sm max-w-md mx-auto">
                  A Senior Managing Director from our Century City office will review your inquiry and contact you within two business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-navy font-heading">Schedule a Private Consultation</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">First Name</label>
                    <Input required placeholder="Alexander" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Last Name</label>
                    <Input required placeholder="Wright" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Email Address</label>
                    <Input type="email" required placeholder="alexander@cynlfinancial.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate mb-1">Phone Number</label>
                    <Input type="tel" required placeholder="(310) 555-0199" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate mb-1">Inquiry Purpose</label>
                  <select className="w-full rounded-lg border border-gray-200 p-3 text-sm text-slate focus:ring-2 focus:ring-emerald bg-white">
                    <option>Jumbo Residential Financing</option>
                    <option>Bank Statement Self-Employed Loan</option>
                    <option>DSCR Investment Property Loan</option>
                    <option>Commercial Real Estate Lending</option>
                    <option>General Advisory Consultation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate mb-1">Message / Portfolio Summary</label>
                  <textarea rows={4} className="w-full rounded-lg border border-gray-200 p-3 text-sm text-slate focus:ring-2 focus:ring-emerald" placeholder="Describe your property objectives or financing goals..."></textarea>
                </div>
                <Button type="submit" className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3">
                  Submit Consultation Request
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}