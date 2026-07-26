"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileText, Search, Filter, CheckCircle2, Clock, AlertCircle, Eye, Edit3 } from "lucide-react";
import Link from "next/link";

export default function AdminLoansManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // بيانات افتراضية لطلبات الرهن العقاري الواردة في النظام
  const [loans, setLoans] = useState([
    {
      id: "CYR-2026-8942",
      clientName: "Mina Raafat",
      email: "mina.raafat@cyrilfinancial.com",
      propertyType: "Commercial Real Estate",
      amount: "$2,450,000",
      status: "UNDERWRITING",
      officer: "Alexander Wright",
      date: "July 15, 2026",
    },
    {
      id: "CYR-2026-8945",
      clientName: "Sarah Jenkins",
      email: "s.jenkins@example.com",
      propertyType: "Residential Multi-Family",
      amount: "$1,150,000",
      status: "APPROVED",
      officer: "Michael Vance",
      date: "July 18, 2026",
    },
    {
      id: "CYR-2026-8950",
      clientName: "David Sterling",
      email: "d.sterling@investments.com",
      propertyType: "Industrial Warehouse",
      amount: "$4,200,000",
      status: "PENDING_DOCS",
      officer: "Alexander Wright",
      date: "July 20, 2026",
    },
  ]);

  const handleStatusChange = (id: string, newStatus: string) => {
    setLoans(prev => prev.map(loan => 
      loan.id === id ? { ...loan, status: newStatus } : loan
    ));
  };

  const filteredLoans = loans.filter(loan => {
    const matchesSearch = loan.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          loan.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === "ALL" || loan.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin CRM Portal
            </div>
            <h1 className="text-3xl font-bold font-heading">Loan Applications Management</h1>
            <p className="text-gray-300 text-sm mt-1">Review, filter, and update active borrower mortgage applications across the platform.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate" />
            <input 
              type="text" 
              placeholder="Search by client name or loan ID..." 
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
              className="w-full md:w-auto rounded-xl border border-gray-200 py-2.5 px-4 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDERWRITING">Underwriting Review</option>
              <option value="APPROVED">Approved / CTC</option>
              <option value="PENDING_DOCS">Pending Documents</option>
            </select>
          </div>
        </div>

        {/* Loans Table */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-slate uppercase tracking-wider">
                  <th className="py-4 px-6">Application ID & Client</th>
                  <th className="py-4 px-6">Property Type</th>
                  <th className="py-4 px-6">Loan Amount</th>
                  <th className="py-4 px-6">Assigned Officer</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredLoans.map((loan) => (
                  <tr key={loan.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-navy">{loan.clientName}</div>
                      <div className="text-xs text-slate">{loan.id} • {loan.date}</div>
                    </td>
                    <td className="py-4 px-6 text-slate font-medium">{loan.propertyType}</td>
                    <td className="py-4 px-6 font-bold text-emerald">{loan.amount}</td>
                    <td className="py-4 px-6 text-slate text-xs font-semibold">{loan.officer}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        loan.status === "APPROVED" ? "bg-emerald/10 text-emerald" :
                        loan.status === "UNDERWRITING" ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"
                      }`}>
                        {loan.status === "APPROVED" ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {loan.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <select 
                        value={loan.status}
                        onChange={(e) => handleStatusChange(loan.id, e.target.value)}
                        className="text-xs rounded-lg border border-gray-200 py-1.5 px-2 bg-gray-50 text-navy font-medium focus:outline-none"
                      >
                        <option value="UNDERWRITING">Underwriting</option>
                        <option value="APPROVED">Approved</option>
                        <option value="PENDING_DOCS">Pending Docs</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}