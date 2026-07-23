"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, ExternalLink } from "lucide-react";

interface LeadItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  purchasePrice: number;
  downPayment: number;
  loanPurpose: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/leads")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLeads(data.data);
        }
      })
      .catch((err) => console.error("Failed to load leads pipeline:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Corporate Leads Pipeline</h1>
          <p className="text-slate text-sm mt-1">Manage prospective borrower inquiries, property details, and advisory assignments.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Client Name</th>
                <th className="py-4 px-6">Contact Channels</th>
                <th className="py-4 px-6">Loan Purpose</th>
                <th className="py-4 px-6">Purchase Price</th>
                <th className="py-4 px-6">Down Payment</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate">Loading active leads pipeline...</td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate">No incoming inquiries found in the pipeline.</td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-bold text-navy flex items-center gap-3">
                      <Users className="w-4 h-4 text-emerald" /> {lead.firstName} {lead.lastName}
                    </td>
                    <td className="py-5 px-6 text-slate">
                      <div className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {lead.email}</div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5"><Phone className="w-3.5 h-3.5" /> {lead.phone}</div>
                    </td>
                    <td className="py-5 px-6 font-medium text-navy">{lead.loanPurpose}</td>
                    <td className="py-5 px-6 font-bold text-navy">${lead.purchasePrice?.toLocaleString()}</td>
                    <td className="py-5 px-6 text-slate">${lead.downPayment?.toLocaleString()}</td>
                    <td className="py-5 px-6 text-right">
                      <Button size="sm" variant="outline" className="text-navy border-gray-200 hover:bg-gray-100">
                        Assign Advisor <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}