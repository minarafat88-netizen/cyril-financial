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
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold font-heading text-navy">Enterprise System Settings</h1>
        <p className="text-slate text-sm mt-1">Configure corporate identity, licensing parameters, and security protocols.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 max-w-3xl space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <div className="w-10 h-10 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-heading text-navy">Corporate Compliance Parameters</h3>
            <p className="text-slate text-xs">Manage institutional registry details displayed across client touchpoints.</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Company Name</label>
              <Input defaultValue="Cynl Financial Group" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Corporate Domain</label>
              <Input defaultValue="https://cynlfinancial.com" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">CA DRE License Number</label>
              <Input defaultValue="02198421" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">NMLS Unique Identifier</label>
              <Input defaultValue="2481023" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Primary Support Email</label>
            <Input defaultValue="advisory@cynlfinancial.com" type="email" />
          </div>

          {saved && (
            <div className="p-3 bg-emerald/10 text-emerald text-xs font-semibold rounded-xl text-center">
              Settings updated successfully across corporate nodes.
            </div>
          )}

          <Button type="submit" className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-3 rounded-xl shadow-glass flex items-center gap-2">
            <Save className="w-4 h-4" /> Save System Configuration
          </Button>
        </form>
      </div>
    </div>
  );
}