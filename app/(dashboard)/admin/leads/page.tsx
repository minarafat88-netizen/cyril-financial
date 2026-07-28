"use client";

import React, { useState, useEffect } from "react";
import { format } from 'date-fns';
import Link from "next/link";
import { FileDown } from "lucide-react";
import { unparse } from "papaparse";

type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Qualified' | 'Unqualified' | 'Closed';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  status: LeadStatus;
  createdAt: { toDate: () => Date }; // Firebase Timestamp
}

export default function AdminLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/leads');
        const data = await response.json();

        if (data.success) {
          setLeads(data.data);
        } else {
          setError(data.error || "Failed to fetch leads.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => 
    `${lead.firstName} ${lead.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No leads to export.");
      return;
    }

    const csvData = filteredLeads.map(lead => ({
      "Lead ID": lead.id,
      "First Name": lead.firstName,
      "Last Name": lead.lastName,
      "Email": lead.email,
      "Phone": lead.phone || 'N/A',
      "Interest": lead.interest,
      "Status": lead.status,
      "Date": lead.createdAt?.toDate ? format(lead.createdAt.toDate(), 'yyyy-MM-dd') : 'N/A',
    }));

    const csv = unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `cyril_leads_${new Date().toISOString().split('T')[0]}.csv`);
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
          <p className="text-sm text-gray-500 mt-1">Track and manage potential client inquiries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            placeholder="Search leads by name or ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-navy outline-none w-64 shadow-sm"
          />
          <button onClick={handleExportCSV} className="bg-navy text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-navy-light transition-all flex items-center gap-2">
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
                <th className="p-5">Interest</th>
                <th className="p-5">Status</th>
                <th className="p-5">Date</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={6} className="p-5 text-center text-gray-500">Loading leads...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} className="p-5 text-center text-red-500">{error}</td></tr>
              ) : filteredLeads.length === 0 ? (
                <tr><td colSpan={6} className="p-5 text-center text-gray-500">No leads found.</td></tr>
              ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-navy">{lead.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-navy">{lead.firstName} {lead.lastName}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                    {lead.phone && <div className="text-xs text-gray-400 mt-0.5">{lead.phone}</div>}
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-silver-light text-navy rounded-lg font-bold text-xs border border-gray-200">
                      🪙 {lead.interest}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                      lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      lead.status === 'Contacted' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                      'bg-green-50 text-green-700 border-green-100'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-5 text-gray-500 text-xs">
                    {lead.createdAt?.toDate ? format(lead.createdAt.toDate(), 'yyyy-MM-dd') : 'N/A'}
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/admin/leads/${lead.id}`} className="text-navy font-bold text-xs hover:underline">
                      View Details
                    </Link>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredLeads.length} of {leads.length} entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}