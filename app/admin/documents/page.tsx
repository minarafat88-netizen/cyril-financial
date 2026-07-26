"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileText, CheckCircle2, XCircle, Clock, Search, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AdminDocumentsReviewPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // بيانات افتراضية للمستندات المرفوعة من العملاء للمراجعة والإقرار
  const [documents, setDocuments] = useState([
    {
      id: "DOC-101",
      clientName: "Mina Raafat",
      loanId: "CYR-2026-8942",
      documentName: "Bank Statements (24 Months)",
      category: "BANK_STATEMENT",
      status: "PENDING_REVIEW",
      uploadDate: "July 22, 2026",
      fileSize: "4.2 MB",
    },
    {
      id: "DOC-102",
      clientName: "Sarah Jenkins",
      loanId: "CYR-2026-8945",
      documentName: "Corporate Tax Returns 2025",
      category: "TAX_RETURN",
      status: "APPROVED",
      uploadDate: "July 20, 2026",
      fileSize: "8.5 MB",
    },
    {
      id: "DOC-103",
      clientName: "David Sterling",
      loanId: "CYR-2026-8950",
      documentName: "Government Issued Passport",
      category: "IDENTITY",
      status: "REJECTED",
      uploadDate: "July 19, 2026",
      fileSize: "2.1 MB",
    },
  ]);

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, status: newStatus } : doc
    ));
  };

  const filteredDocs = documents.filter(doc => 
    doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.loanId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.documentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Compliance & Underwriting Vault
            </div>
            <h1 className="text-3xl font-bold font-heading">Borrower Document Review</h1>
            <p className="text-gray-300 text-sm mt-1">Verify, approve, or reject encrypted financial disclosures submitted by borrowers.</p>
          </div>
          <Link href="/admin">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 flex items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate" />
            <input 
              type="text" 
              placeholder="Search by client name, loan ID, or document title..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald"
            />
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-[11px] font-semibold text-slate uppercase tracking-wider">
                  <th className="py-4 px-6">Client & Loan ID</th>
                  <th className="py-4 px-6">Document Details</th>
                  <th className="py-4 px-6">Size & Date</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Verification Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filteredDocs.map((doc) => {
                  const isApproved = doc.status === "APPROVED";
                  const isPending = doc.status === "PENDING_REVIEW";
                  const isRejected = doc.status === "REJECTED";

                  return (
                    <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-navy">{doc.clientName}</div>
                        <div className="text-xs text-slate">{doc.loanId}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-navy flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald" /> {doc.documentName}
                        </div>
                        <div className="text-xs text-slate uppercase tracking-wider font-semibold mt-0.5">{doc.category}</div>
                      </td>
                      <td className="py-4 px-6 text-slate text-xs">
                        <div>{doc.fileSize}</div>
                        <div className="mt-0.5">{doc.uploadDate}</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                          isApproved ? "bg-emerald/10 text-emerald" :
                          isPending ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"
                        }`}>
                          {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                          {isPending && <Clock className="w-3.5 h-3.5" />}
                          {isRejected && <XCircle className="w-3.5 h-3.5" />}
                          {isApproved ? "Approved" : isPending ? "Pending Review" : "Rejected"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateStatus(doc.id, "APPROVED")}
                          className="bg-emerald/10 hover:bg-emerald hover:text-white text-emerald text-xs font-semibold h-8 px-3"
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdateStatus(doc.id, "REJECTED")}
                          className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-600 text-xs font-semibold h-8 px-3"
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}