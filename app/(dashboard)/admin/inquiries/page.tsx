"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users, Mail, Phone, Calendar, CheckCircle2, Clock, Search, Eye } from "lucide-react";

export default function AdminInquiriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);

  // محاكاة لبيانات طلبات الاستشارات الواردة
  const inquiries = [
    {
      id: "REQ-9021",
      name: "Alexander Wright",
      email: "alexander@example.com",
      phone: "+1 (310) 555-0199",
      loanType: "Jumbo Lending",
      status: "New",
      date: "July 24, 2026",
      message: "Looking to structure a jumbo mortgage for a luxury estate in Beverly Hills. Timeline is 30 days.",
    },
    {
      id: "REQ-9020",
      name: "Victoria Sterling",
      email: "victoria@sterlingholdings.com",
      phone: "+1 (415) 555-0144",
      loanType: "Bespoke Financing",
      status: "In Review",
      date: "July 23, 2026",
      message: "Need assistance with self-employed bank statement qualifying programs (12-month statements).",
    },
    {
      id: "REQ-9019",
      name: "Jonathan Vance",
      email: "jvance@vancescapital.com",
      phone: "+1 (949) 555-0188",
      loanType: "Asset Depletion",
      status: "Completed",
      date: "July 21, 2026",
      message: "Inquiring about asset depletion calculations for high-net-worth portfolio acquisition.",
    },
  ];

  const filteredInquiries = inquiries.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.loanType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Client Inquiries & Leads</h1>
          <p className="text-slate text-sm mt-1">Manage consultation requests and advisory submissions from prospective clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm bg-white text-navy focus:outline-none focus:ring-2 focus:ring-emerald"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-slate uppercase tracking-wider">
                <th className="p-6">Request ID & Client</th>
                <th className="p-6">Contact Info</th>
                <th className="p-6">Program</th>
                <th className="p-6">Status</th>
                <th className="p-6">Date</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredInquiries.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/55 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-navy">{item.name}</div>
                    <div className="text-xs text-slate">{item.id}</div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-1.5 text-navy text-xs font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate" /> {item.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate text-xs mt-1">
                      <Phone className="w-3.5 h-3.5" /> {item.phone}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald/10 text-emerald">
                      {item.loanType}
                    </span>
                  </td>
                  <td className="p-6">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "New"
                          ? "bg-blue-50 text-blue-600"
                          : item.status === "In Review"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-green-50 text-green-600"
                      }`}
                    >
                      {item.status === "New" && <Clock className="w-3 h-3" />}
                      {item.status === "Completed" && <CheckCircle2 className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="p-6 text-slate text-xs flex items-center gap-1.5 pt-8">
                    <Calendar className="w-3.5 h-3.5" /> {item.date}
                  </td>
                  <td className="p-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedInquiry(item)}
                      className="text-navy border-gray-200 hover:bg-emerald hover:text-white"
                    >
                      <Eye className="w-4 h-4 mr-1" /> View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal Drawer Simulation */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-emerald uppercase tracking-wider">{selectedInquiry.id}</span>
                <h3 className="text-xl font-bold font-heading text-navy">{selectedInquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-slate hover:text-navy text-sm font-bold p-2"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl">
                <div>
                  <span className="block text-xs font-semibold text-slate uppercase">Email</span>
                  <span className="font-medium text-navy">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate uppercase">Phone</span>
                  <span className="font-medium text-navy">{selectedInquiry.phone}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate uppercase mb-1">Requested Program</span>
                <span className="font-semibold text-navy bg-emerald/10 px-3 py-1 rounded-lg inline-block text-xs text-emerald">
                  {selectedInquiry.loanType}
                </span>
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate uppercase mb-1">Client Message / Scenario</span>
                <p className="text-slate bg-gray-50 p-4 rounded-2xl leading-relaxed">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setSelectedInquiry(null)}
                className="border-gray-200 text-slate"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  alert(`Lead ${selectedInquiry.id} marked as contacted.`);
                  setSelectedInquiry(null);
                }}
                className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 rounded-xl"
              >
                Mark as Contacted
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}