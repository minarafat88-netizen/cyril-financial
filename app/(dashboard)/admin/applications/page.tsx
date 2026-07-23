"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, ExternalLink, Clock } from "lucide-react";

interface ApplicationItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  purchasePrice: number;
  downPayment: number;
  status: string;
  createdAt: string;
}

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/applications")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setApplications(data.data);
        }
      })
      .catch((err) => console.error("Failed to load applications:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Loan Applications Pipeline</h1>
          <p className="text-slate text-sm mt-1">Review, evaluate, and manage active encrypted mortgage applications.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Applicant Name</th>
                <th className="py-4 px-6">Contact Details</th>
                <th className="py-4 px-6">Purchase Price</th>
                <th className="py-4 px-6">Down Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate">Loading encrypted loan applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate">No active mortgage applications found in pipeline.</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-bold text-navy">{app.firstName} {app.lastName}</td>
                    <td className="py-5 px-6 text-slate">
                      <div>{app.email}</div>
                      <div className="text-xs text-gray-400">{app.phone}</div>
                    </td>
                    <td className="py-5 px-6 font-bold text-navy">${app.purchasePrice?.toLocaleString()}</td>
                    <td className="py-5 px-6 text-slate">${app.downPayment?.toLocaleString()}</td>
                    <td className="py-5 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald/10 text-emerald">
                        {app.status}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right">
                      <Button size="sm" variant="outline" className="text-navy border-gray-200 hover:bg-gray-100">
                        Review File <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
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