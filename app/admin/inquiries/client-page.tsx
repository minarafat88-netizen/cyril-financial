"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Trash2, Mail, Phone, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { updateInquiryStatus, deleteInquiry } from "./actions";

type InquiryRecord = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: Date;
};

export default function InquiriesClient({ initialData }: { initialData: InquiryRecord[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: number, newStatus: string) => {
    startTransition(async () => {
      await updateInquiryStatus(id, newStatus);
    });
  };

  const handleDelete = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the message from "${name}"?`)) {
      startTransition(async () => {
        await deleteInquiry(id);
      });
    }
  };

  const filteredInquiries = initialData.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.subject && item.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen relative">
      
      {isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
          <span className="text-navy font-bold animate-pulse">Updating Database...</span>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5" /> Visitor Inquiries
          </div>
          <h1 className="text-3xl font-bold font-heading text-navy">Contact Messages Management</h1>
          <p className="text-slate text-sm mt-1">Review and manage questions sent by visitors through the contact form.</p>
        </div>
        <Link href="/admin/dashboard">
          <Button variant="outline" className="border-gray-200 text-navy bg-white text-xs">
            ← Return to Dashboard
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate" />
          <input 
            type="text" 
            placeholder="Search by sender name, email, or subject..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-slate uppercase tracking-wider">
                <th className="p-6">Sender Details</th>
                <th className="p-6">Subject / Message</th>
                <th className="p-6">Date Received</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">
                    No inquiries found in the database.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/55 transition-colors">
                    <td className="p-6 align-top">
                      <div className="font-bold text-navy">{item.name}</div>
                      <div className="text-xs text-slate flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {item.email}
                      </div>
                      {item.phone && (
                        <div className="text-xs text-slate flex items-center gap-1 mt-0.5">
                          <Phone className="w-3 h-3" /> {item.phone}
                        </div>
                      )}
                    </td>
                    <td className="p-6 align-top max-w-md">
                      <div className="font-bold text-navy text-xs uppercase tracking-wide text-blue-600 mb-1">
                        {item.subject || "General Inquiry"}
                      </div>
                      <p className="text-gray-600 text-xs whitespace-pre-line bg-gray-50 p-3 rounded-xl border border-gray-100">
                        {item.message}
                      </p>
                    </td>
                    <td className="p-6 align-top text-slate text-xs">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-6 align-top">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === 'RESOLVED' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status === 'RESOLVED' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="p-6 align-top text-right space-x-2">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="text-xs rounded-lg border border-gray-200 py-1.5 px-2 bg-gray-50 text-navy font-medium focus:outline-none cursor-pointer"
                        disabled={isPending}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="RESOLVED">Resolved</option>
                      </select>

                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(item.id, item.name)}
                        className="text-red-600 border-gray-200 hover:bg-red-50"
                        disabled={isPending}
                      >
                        <Trash2 className="w-4 h-4" />
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