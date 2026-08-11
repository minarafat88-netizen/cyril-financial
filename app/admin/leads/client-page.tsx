"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { FileDown, Search } from "lucide-react";
import { unparse } from "papaparse";
import Link from "next/link";

type LeadRecord = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  createdAt: Date;
};

export default function LeadsClient({ initialData }: { initialData: LeadRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter leads based on name, email, or ID
  const filteredLeads = initialData.filter((lead) => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toString().includes(searchTerm)
  );

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const csvData = filteredLeads.map((lead) => ({
      "Lead ID": lead.id,
      "Full Name": lead.name,
      "Email": lead.email,
      "Phone": lead.phone || "N/A",
      "Source": lead.source || "N/A",
      "Message": lead.message || "N/A",
      "Date": lead.createdAt ? format(new Date(lead.createdAt), "yyyy-MM-dd") : "N/A",
    }));

    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `cyril_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8 bg-surface min-h-screen font-sans text-navy">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight">Leads Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage potential client  from the database.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search leads by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none w-72 shadow-sm"
            />
          </div>
          <button 
            onClick={handleExportCSV} 
            className="bg-navy text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-navy-light transition-all flex items-center gap-2 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <th className="p-5">Lead ID</th>
                <th className="p-5">Client Details</th>
                <th className="p-5">Source / Interest</th>
                <th className="p-5">Message</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 font-medium">
                    No leads found in the database.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="p-5 font-bold text-navy">LEAD-{lead.id}</td>
                    <td className="p-5">
                      <div className="font-bold text-navy">{lead.name}</div>
                      <div className="text-xs text-gray-500">{lead.email}</div>
                      {lead.phone && <div className="text-xs text-gray-400 mt-0.5">{lead.phone}</div>}
                    </td>
                    <td className="p-5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-navy rounded-lg font-bold text-xs border border-gray-200">
                        📌 {lead.source || "Direct Form"}
                      </span>
                    </td>
                    <td className="p-5 text-gray-600 text-xs max-w-xs truncate">
                      {lead.message || "No message provided."}
                    </td>
                    <td className="p-5 text-gray-500 text-xs font-medium">
                      {lead.createdAt ? format(new Date(lead.createdAt), "yyyy-MM-dd") : "N/A"}
                    </td>
                    <td className="p-5 text-right">
                      <Link href={`/admin/leads/${lead.id}`} className="text-blue-600 font-bold text-xs hover:underline">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination info */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredLeads.length} of {initialData.length} entries</span>
        </div>
      </div>

    </div>
  );
}