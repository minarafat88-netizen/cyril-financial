import React from "react";
import { Header } from "@/components/layout/header";
import { Metadata } from "next";
import { Building2, ShieldCheck, MapPin, ExternalLink, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "State Licensing & Disclosures | Cyril Financial Group",
  description: "View state-by-state licensing information, NMLS numbers, and regulatory disclosures for Cyril Financial Group.",
};

export default function StateLicensingPage() {
  const nmlsNumber = "NMLS #1234567";

  // قائمة تجريبية للولايات التي تعمل بها الشركة (يمكنك تعديلها لاحقاً أو ربطها بالداتابيز)
  const licensedStates = [
    { state: "New York", licenseType: "Mortgage Banker License", licenseNumber: "NY-MB-987654" },
    { state: "California", type: "DFPI Residential Mortgage Lending Act", licenseNumber: "CA-DFPI-456789" },
    { state: "Florida", licenseType: "Mortgage Lender License", licenseNumber: "FL-MLD-123789" },
    { state: "Texas", type: "SML Mortgage Banker Registration", licenseNumber: "TX-SML-654321" },
    { state: "Illinois", licenseType: "Residential Mortgage License", licenseNumber: "IL-MBR-321654" },
    { state: "New Jersey", type: "Department of Banking & Insurance", licenseNumber: "NJ-RMLA-789123" },
  ];

  return (
    <div className="min-h-screen bg-surface font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Page Header */}
          <div className="text-center space-y-4 border-b border-gray-200 pb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/10 text-blue-600 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" /> Regulatory Compliance
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-navy tracking-tight">State Licensing & Disclosures</h1>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              Cyril Financial Group maintains strict adherence to state and federal lending regulations. View our official licensing credentials below.
            </p>
            <div className="inline-block px-4 py-2 bg-navy text-white rounded-xl text-xs font-bold tracking-widest shadow-sm">
              Corporate NMLS ID: <span className="text-emerald font-mono">1234567</span>
            </div>
          </div>

          {/* NMLS Consumer Access Banner */}
          <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-lg font-bold text-navy flex items-center justify-center md:justify-start gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald" /> NMLS Consumer Access Portal
              </h3>
              <p className="text-xs text-gray-600 max-w-xl">
                You can independently verify our company licenses and professional backgrounds directly through the Nationwide Multistate Licensing System (NMLS) consumer database.
              </p>
            </div>
            <a 
              href="https://www.nmlsconsumeraccess.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-navy hover:bg-navy-dark text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
            >
              Verify on NMLS <ExternalLink className="w-4 h-4 text-silver" />
            </a>
          </div>

          {/* States Grid Table */}
          <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" /> Licensed Operating Jurisdictions
              </h3>
              <span className="text-xs text-gray-500 font-medium">Showing active state approvals</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-[11px] font-semibold text-slate uppercase tracking-wider bg-gray-50/50">
                    <th className="py-4 px-6">State / Jurisdiction</th>
                    <th className="py-4 px-6">License Type / Description</th>
                    <th className="py-4 px-6">License / Registration #</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                  {licensedStates.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-navy flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald"></span>
                        {item.state}
                      </td>
                      <td className="py-4 px-6 text-gray-600">{item.licenseType || item.type}</td>
                      <td className="py-4 px-6 font-mono font-bold text-blue-600">{item.licenseNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Equal Housing Lender Notice */}
          <div className="bg-surface p-8 rounded-3xl border border-gray-200 text-xs text-gray-500 leading-relaxed text-center space-y-3">
            <div className="flex justify-center items-center gap-2 text-navy font-bold uppercase tracking-wider">
              <FileCheck className="w-4 h-4 text-emerald" /> Equal Housing Opportunity
            </div>
            <p className="max-w-2xl mx-auto">
              We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}