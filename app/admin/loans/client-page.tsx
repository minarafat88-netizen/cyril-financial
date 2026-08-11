"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Landmark, Search, Plus, Edit3, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { deleteLoanProgram } from "./actions";

// Type definition (تم إزالة slug لعدم الحاجة إليه هنا)
type LoanProgramRecord = {
  id: number;
  name: string;
  subtitle: string | null;
  description: string | null;
  loanType: string | null;
  rate: string | number | null;
  icon: string | null;
  sortOrder: number | null;
  createdAt: Date;
};

export default function LoansClient({ initialData }: { initialData: LoanProgramRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" program? This action cannot be undone.`)) {
      startTransition(async () => {
        await deleteLoanProgram(id);
      });
    }
  };

  const filteredLoans = initialData.filter((loan) => {
    return (
      loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (loan.subtitle && loan.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (loan.loanType && loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* === Header Section === */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" /> Loan Products
            </div>
            <h1 className="text-3xl font-bold font-heading">Loan Programs Management</h1>
            <p className="text-gray-300 text-sm mt-1">Manage name, subtitle, description, icon, and rates for your loan products.</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs">
                ← Back
              </Button>
            </Link>
            
            <Link href="/admin/loans/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-2 cursor-pointer">
                <Plus className="w-4 h-4" /> Add New Program
              </Button>
            </Link>
          </div>
        </div>

        {/* === Search Bar === */}
        <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate" />
            <input 
              type="text" 
              placeholder="Search by name, subtitle, or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* === Loans Table === */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden relative">
          
          {isPending && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
              <span className="text-navy font-bold animate-pulse">Updating Database...</span>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-slate uppercase tracking-wider">
                  <th className="py-4 px-6">Program Name</th>
                  <th className="py-4 px-6">Subtitle & Description</th>
                  <th className="py-4 px-6">Icon & Type</th>
                  <th className="py-4 px-6">Rate</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                
                {filteredLoans.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500 font-medium">
                      <AlertCircle className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                      No loan programs found. Click "Add New Program" to create one.
                    </td>
                  </tr>
                ) : (
                  filteredLoans.map((loan) => (
                    <tr key={loan.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Name Only */}
                      <td className="py-4 px-6 align-top">
                        <div className="font-bold text-navy">{loan.name}</div>
                      </td>

                      {/* Subtitle & Description */}
                      <td className="py-4 px-6 align-top max-w-xs">
                        <div className="text-xs font-semibold text-gray-700">{loan.subtitle || "No subtitle"}</div>
                        <div className="text-xs text-gray-500 truncate mt-0.5">{loan.description || "No description provided"}</div>
                      </td>

                      {/* Icon & Type */}
                      <td className="py-4 px-6 align-top">
                        <div className="text-xs font-bold text-navy bg-gray-100 px-2 py-1 rounded-md inline-block mb-1">
                          Icon: {loan.icon || "Default"}
                        </div>
                        <div className="text-xs text-slate font-medium">{loan.loanType || "N/A"}</div>
                      </td>

                      {/* Rate */}
                      <td className="py-4 px-6 align-top font-bold text-blue-600">
                        {loan.rate ? `${loan.rate}%` : "Not Set"}
                      </td>

                      {/* Actions (Edit & Delete) */}
                      <td className="py-4 px-6 align-top text-right space-x-2">
                        <Link 
                          href={`/admin/loans/${loan.id}/edit`}
                          className="inline-flex items-center gap-1 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-xs font-bold"
                          title="Edit Program Details"
                        >
                          <Edit3 className="w-4 h-4" /> Edit
                        </Link>
                        
                        <button 
                          onClick={() => handleDelete(loan.id, loan.name)}
                          className="inline-flex items-center gap-1 p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer text-xs font-bold"
                          title="Delete Program"
                          disabled={isPending}
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
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