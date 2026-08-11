"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Search, Filter, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { updateApplicationStatus } from "./actions";

// Type definition based on your Drizzle schema
type ApplicationRecord = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  loanType: string | null;
  amount: number | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function ApplicationsClient({ initialData }: { initialData: ApplicationRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  // useTransition allows us to update the DB without blocking the UI
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: number, newStatus: string) => {
    startTransition(async () => {
      // Calls the Server Action to update the database
      await updateApplicationStatus(id, newStatus);
    });
  };

  // Filter logic based on REAL database fields
  const filteredLoans = initialData.filter((loan) => {
    const matchesSearch = 
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loan.id.toString().includes(searchTerm);
    const matchesFilter = statusFilter === "ALL" || loan.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  // Helper to format currency
  const formatCurrency = (amount: number | null) => {
    if (!amount) return "$0";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* === Header Section === */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin CRM Portal
            </div>
            <h1 className="text-3xl font-bold font-heading">Loan Applications Management</h1>
            <p className="text-gray-300 text-sm mt-1">Review, filter, and update active borrower mortgage applications across the platform.</p>
          </div>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs">
              ← Return to Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* === Filters and Search Bar === */}
        <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate" />
            <input 
              type="text" 
              placeholder="Search by client name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-slate" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto rounded-xl border border-gray-200 py-2.5 px-4 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted (New)</option>
              <option value="UNDERWRITING">Underwriting Review</option>
              <option value="APPROVED">Approved / CTC</option>
              <option value="PENDING_DOCS">Pending Documents</option>
            </select>
          </div>
        </div>

        {/* === Real Data Loans Table === */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden relative">
          
          {/* Loading overlay during database update */}
          {isPending && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <span className="text-navy font-bold animate-pulse">Updating Database...</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-slate uppercase tracking-wider">
                  <th className="py-4 px-6">ID & Client</th>
                  <th className="py-4 px-6">Property/Loan Type</th>
                  <th className="py-4 px-6">Loan Amount</th>
                  <th className="py-4 px-6">Date Applied</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-500 font-medium">
                      No applications found in the database.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-navy">{loan.name}</div>
                        <div className="text-xs text-slate">APP-00{loan.id} • {loan.email}</div>
                      </td>
                      <td className="py-4 px-6 text-slate font-medium">
                        {loan.loanType || "Not Specified"}
                      </td>
                      <td className="py-4 px-6 font-bold text-emerald">
                        {formatCurrency(loan.amount)}
                      </td>
                      <td className="py-4 px-6 text-slate text-xs font-semibold">
                        {new Date(loan.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          loan.status === "APPROVED" ? "bg-emerald/10 text-emerald" :
                          loan.status === "UNDERWRITING" ? "bg-amber-500/10 text-amber-600" : 
                          loan.status === "SUBMITTED" ? "bg-blue-500/10 text-blue-600" : "bg-gray-500/10 text-gray-600"
                        }`}>
                          {loan.status === "APPROVED" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                          {loan.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <select 
                          value={loan.status}
                          onChange={(e) => handleStatusChange(loan.id, e.target.value)}
                          className="text-xs rounded-lg border border-gray-200 py-1.5 px-2 bg-gray-50 text-navy font-medium focus:outline-none cursor-pointer hover:border-gray-300"
                          disabled={isPending}
                        >
                          <option value="SUBMITTED">Submitted</option>
                          <option value="PENDING_DOCS">Pending Docs</option>
                          <option value="UNDERWRITING">Underwriting</option>
                          <option value="APPROVED">Approved</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}