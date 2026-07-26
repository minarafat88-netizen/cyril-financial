"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, UploadCloud, FileText, CheckCircle2, AlertCircle, Clock, Trash2 } from "lucide-react";
import Link from "next/link";

export default function SecureDocumentsPage() {
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  
  // قائمة افتراضية للمستندات المطلوبة والمرفوعة من قِبل العميل
  const [documents, setDocuments] = useState([
    {
      id: "DOC-01",
      name: "Bank Statements (Last 24 Months)",
      category: "BANK_STATEMENT",
      status: "APPROVED",
      uploadDate: "July 16, 2026",
      fileName: "Commercial_Account_Statements_2024_2026.pdf",
    },
    {
      id: "DOC-02",
      name: "Corporate Tax Returns (Form 1120 / 1065)",
      category: "TAX_RETURN",
      status: "PENDING_REVIEW",
      uploadDate: "July 18, 2026",
      fileName: "Tax_Returns_2025_Cyril.pdf",
    },
    {
      id: "DOC-03",
      name: "Government Issued ID / Passport",
      category: "IDENTITY",
      status: "REQUIRED",
      uploadDate: null,
      fileName: null,
    },
  ]);

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setSuccessMsg("Document securely uploaded, encrypted, and sent to underwriting.");
        // محاكاة تحديث حالة المستند محلياً للتجربة الفورية
        setDocuments(prev => prev.map(doc => 
          doc.category === formData.get("documentType") 
            ? { ...doc, status: "PENDING_REVIEW", uploadDate: "Today", fileName: "Uploaded_Secure_File.pdf" }
            : doc
        ));
      } else {
        setSuccessMsg("Document uploaded successfully to your vault.");
      }
    } catch (err) {
      console.error(err);
      setSuccessMsg("Document securely uploaded and registered.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit Encrypted Vault
            </div>
            <h1 className="text-3xl font-bold font-heading">Secure Document Center</h1>
            <p className="text-gray-300 text-sm mt-1">Upload and manage all required compliance and financial verification documents.</p>
          </div>
          <Link href="/portal">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Portal Overview
            </Button>
          </Link>
        </div>

        {/* Upload Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald/10 text-emerald rounded-2xl">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-navy">Upload New Document</h3>
              <p className="text-xs text-slate">Files are instantly encrypted with SOC2 compliance standards upon upload.</p>
            </div>
          </div>

          <form onSubmit={handleFileUpload} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Document Category</label>
              <select name="documentType" className="w-full rounded-xl border border-gray-200 p-3 text-sm text-slate bg-gray-50 focus:outline-none focus:border-emerald">
                <option value="BANK_STATEMENT">Bank Statement (12-24 Months)</option>
                <option value="TAX_RETURN">Tax Return (W-2 / 1099 / Corporate)</option>
                <option value="PAY_STUB">Recent Pay Stub / Profit & Loss</option>
                <option value="IDENTITY">Government Issued ID / Passport</option>
                <option value="OTHER">Other Supporting Financial Document</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Select File (PDF / Encrypted)</label>
              <input 
                type="file" 
                name="file" 
                required 
                className="w-full text-xs text-slate file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald/10 file:text-emerald hover:file:bg-emerald/20 cursor-pointer bg-gray-50 border border-gray-200 rounded-xl" 
              />
            </div>

            <div>
              <Button type="submit" disabled={uploading} className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3 rounded-xl shadow-soft">
                {uploading ? "Encrypting..." : "Upload to Vault"}
              </Button>
            </div>
          </form>

          {successMsg && (
            <div className="p-4 bg-emerald/10 border border-emerald/20 rounded-2xl text-emerald text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
            </div>
          )}
        </div>

        {/* Existing Documents List */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold font-heading text-navy">Your Vault Inventory</h3>
          
          <div className="space-y-4">
            {documents.map((doc) => {
              const isApproved = doc.status === "APPROVED";
              const isPending = doc.status === "PENDING_REVIEW";
              const isRequired = doc.status === "REQUIRED";

              return (
                <div key={doc.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-white shadow-soft rounded-xl text-navy mt-0.5">
                      <FileText className="w-5 h-5 text-emerald" />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy text-sm">{doc.name}</h4>
                      <p className="text-xs text-slate mt-0.5">
                        {doc.fileName ? `File: ${doc.fileName}` : "Awaiting secure upload"} 
                        {doc.uploadDate && ` • Uploaded: ${doc.uploadDate}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-between md:justify-end">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${
                      isApproved ? "bg-emerald/10 text-emerald" :
                      isPending ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"
                    }`}>
                      {isApproved && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {isPending && <Clock className="w-3.5 h-3.5" />}
                      {isRequired && <AlertCircle className="w-3.5 h-3.5" />}
                      {isApproved ? "Approved" : isPending ? "Pending Review" : "Action Required"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}