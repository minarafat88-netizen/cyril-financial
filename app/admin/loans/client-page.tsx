"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Landmark, Search, Plus, Edit3, Trash2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { deleteLoanProgram } from "./actions";

// Type definition updated with 'rate'
type LoanProgramRecord = {
  id: number;
  name: string;
  slug: string;
  loanType: string | null;
  rate: string | number | null; // تم التعديل لاستخدام عمود rate الجديد
  sortOrder: number | null;
  createdAt: Date;
};

export default function LoansClient({ initialData }: { initialData: LoanProgramRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // Handle deletion of a loan program
  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the "${name}" program? This action cannot be undone.`)) {
      startTransition(async () => {
        await deleteLoanProgram(id);
      });
    }
  };

  // Filter logic based on the real database fields
  const filteredLoans = initialData.filter((loan) => {
    return loan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           (loan.loanType && loan.loanType.toLowerCase().includes(searchTerm.toLowerCase()));
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
            <p className="text-gray-300 text-sm mt-1">Add, edit, or remove mortgage and loan programs available to your clients.</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/admin/dashboard">
              <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs">
                ← Back
              </Button>
            </Link>
            
            {/* Added link to Add New Program page */}
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
              placeholder="Search by program name or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* === Real Data Loans Table === */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden relative">
          
          {/* Loading overlay during database updates */}
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
                  <th className="py-4 px-6">Loan Type</th>
                  <th className="py-4 px-6">Base Interest Rate</th>
                  <th className="py-4 px-6">Sort Order</th>
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
                      <td className="py-4 px-6">
                        <div className="font-bold text-navy">{loan.name}</div>
                        <div className="text-xs text-slate">Slug: /{loan.slug}</div>
                      </td>
                      <td className="py-4 px-6 text-slate font-medium">
                        {loan.loanType || "N/A"}
                      </td>
                      <td className="py-4 px-6 font-bold text-blue-600">
                        {loan.rate ? `${loan.rate}%` : "Not Set"}
                      </td>
                      <td className="py-4 px-6 text-slate font-semibold">
                        {loan.sortOrder ?? 0}
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {/* Edit Button linked to edit page */}
                        <Link 
                          href={`/admin/loans/${loan.id}/edit`}
                          className="inline-block p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Program"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(loan.id, loan.name)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Program"
                          disabled={isPending}
                        >
                          <Trash2 className="w-4 h-4" />
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