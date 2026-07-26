"use client";

import React, { useState } from "react";
import Link from "next/link";

// بيانات وهمية للتجربة (في الواقع سيتم جلبها عبر GET Request من الـ API)
const mockLeads = [
  { id: "LD-001", name: "Ahmed Hassan", email: "ahmed@example.com", phone: "+1 (949) 555-0198", interest: "Purchase", status: "New", date: "2026-07-25" },
  { id: "LD-002", name: "Sarah Connor", email: "sarah.c@example.com", phone: "+1 (310) 555-8741", interest: "Refinance", status: "Contacted", date: "2026-07-24" },
  { id: "LD-003", name: "Michael Chang", email: "m.chang@example.com", phone: "+1 (415) 555-3392", interest: "Jumbo Loan", status: "In Progress", date: "2026-07-23" },
];

export default function AdminLeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

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
          <button className="bg-navy text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-navy-light transition-all">
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
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-5 font-bold text-navy">{lead.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-navy">{lead.name}</div>
                    <div className="text-xs text-gray-500">{lead.email}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{lead.phone}</div>
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
                  <td className="p-5 text-gray-500 text-xs">{lead.date}</td>
                  <td className="p-5 text-right">
                    <button className="text-navy font-bold text-xs hover:underline">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Showing 1 to 3 of 3 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>

    </div>
  );
}