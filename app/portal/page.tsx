"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileText, Upload, CheckCircle2, Clock } from "lucide-react";

export default function ClientPortalDashboard() {
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

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
      if (data.success) {
        setSuccessMsg("Document securely uploaded and encrypted.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure Client Vault
            </div>
            <h1 className="text-3xl font-bold font-heading">Borrower Portal & Document Center</h1>
            <p className="text-gray-300 text-sm mt-1">Manage your active loan applications and upload verification documents.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Status Card */}
          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
            <h3 className="text-xl font-bold font-heading text-navy">Upload Financial Documents</h3>
            <form onSubmit={handleFileUpload} className="space-y-4">
              <input type="hidden" name="applicationId" value="default-app-id" />
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Document Category</label>
                <select name="documentType" className="w-full rounded-xl border border-gray-200 p-3 text-sm text-slate">
                  <option value="BANK_STATEMENT">Bank Statement (12-24 Months)</option>
                  <option value="TAX_RETURN">Tax Return (W-2 / 1099)</option>
                  <option value="PAY_STUB">Recent Pay Stub</option>
                  <option value="IDENTITY">Government Issued ID / Passport</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Select File (PDF / Encrypted)</label>
                <input type="file" name="file" required className="w-full text-sm text-slate file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald/10 file:text-emerald hover:file:bg-emerald/20 cursor-pointer" />
              </div>
              {successMsg && <p className="text-xs text-green-600 font-semibold">{successMsg}</p>}
              <Button type="submit" disabled={uploading} className="w-full bg-emerald hover:bg-emerald-dark text-white font-semibold py-3 rounded-xl">
                {uploading ? "Encrypting & Uploading..." : "Upload to Secure Vault"}
              </Button>
            </form>
          </div>

          {/* Active Application Milestone Tracker */}
          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
            <h3 className="text-xl font-bold font-heading text-navy">Loan Milestone Tracker</h3>
            <div className="space-y-4">
              {[
                { title: "Application Received", status: "completed", desc: "Encrypted file registered in CRM" },
                { title: "Initial Underwriting Review", status: "current", desc: "Evaluating financial profile & ratios" },
                { title: "Conditional Loan Approval", status: "pending", desc: "Awaiting final appraisal & conditions" },
                { title: "Clear to Close (CTC)", status: "pending", desc: "Final signing coordination" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.status === "completed" ? "bg-emerald text-white" :
                    step.status === "current" ? "bg-gold text-navy" : "bg-gray-200 text-slate"
                  }`}>
                    {step.status === "completed" ? "✓" : idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-navy text-sm">{step.title}</h4>
                    <p className="text-slate text-xs">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}