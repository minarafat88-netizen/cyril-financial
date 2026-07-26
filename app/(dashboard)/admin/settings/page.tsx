"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, ShieldCheck, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 p-8 bg-surface min-h-screen font-sans text-navy">
      <div>
        <h1 className="text-3xl font-black text-navy tracking-tight">Enterprise System Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure corporate identity, licensing parameters, and security protocols.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-card-soft border border-gray-100 p-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
          <div className="w-12 h-12 bg-silver-gradient text-navy rounded-2xl flex items-center justify-center shadow-sm text-xl border border-gray-200">
            🪙
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy">Corporate Compliance Parameters</h3>
            <p className="text-gray-500 text-xs mt-0.5">Manage institutional registry details displayed across client touchpoints.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">Company Name</label>
              <Input defaultValue="Cyril Financial Group" className="bg-surface border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">Corporate Domain</label>
              <Input defaultValue="https://cyrilfinancial.com" className="bg-surface border-gray-200 rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">CA DRE License Number</label>
              <Input defaultValue="02198421" className="bg-surface border-gray-200 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">NMLS Unique Identifier</label>
              <Input defaultValue="2481023" className="bg-surface border-gray-200 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">Primary Support Email</label>
            <Input defaultValue="advisory@cyrilfinancial.com" type="email" className="bg-surface border-gray-200 rounded-xl" />
          </div>

          {saved && (
            <div className="p-4 bg-blue-50 border border-blue-100 text-blue-800 text-xs font-bold rounded-xl text-center">
              Settings updated successfully across corporate nodes.
            </div>
          )}

          <button type="submit" className="w-full md:w-auto bg-navy hover:bg-navy-light text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm">
            <span>🪙</span> Save System Configuration
          </button>
        </form>
      </div>
    </div>
  );
}