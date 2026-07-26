"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, User, Lock, Bell, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function BorrowerSettingsPage() {
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Mina Raafat",
    email: "mina.raafat@cyrilfinancial.com",
    phone: "+1 (310) 555-0198",
    address: "742 Evergreen Terrace, Los Angeles, CA",
    notificationsEmail: true,
    notificationsSMS: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      // محاكاة الاتصال بالخلفية لحفظ التعديلات
      await new Promise(resolve => setTimeout(resolve, 800));
      setSuccessMsg("Settings and profile details updated successfully.");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Account Preferences
            </div>
            <h1 className="text-3xl font-bold font-heading">Borrower Settings & Profile</h1>
            <p className="text-gray-300 text-sm mt-1">Manage your personal contact details, security credentials, and communication preferences.</p>
          </div>
          <Link href="/portal">
            <Button variant="outline" className="border-gray-600 text-white hover:bg-white/10 text-xs">
              ← Return to Portal Overview
            </Button>
          </Link>
        </div>

        {/* Settings Form Card */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100">
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-3 bg-emerald/10 text-emerald rounded-2xl">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-heading text-navy">Personal Information</h3>
                <p className="text-xs text-slate">Update your verified borrower identity credentials.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald" 
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald" 
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Phone Number</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1.5">Property / Mailing Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm text-navy bg-gray-50 focus:outline-none focus:border-emerald" 
                />
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald/10 text-emerald rounded-2xl">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-heading text-navy">Notification Channels</h3>
                  <p className="text-xs text-slate">Choose how you wish to receive milestone updates.</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="notificationsEmail" 
                    checked={formData.notificationsEmail} 
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald rounded border-gray-300 focus:ring-emerald" 
                  />
                  <span className="text-sm text-navy font-medium">Receive email notifications on loan status changes and document reviews</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    name="notificationsSMS" 
                    checked={formData.notificationsSMS} 
                    onChange={handleChange}
                    className="w-4 h-4 text-emerald rounded border-gray-300 focus:ring-emerald" 
                  />
                  <span className="text-sm text-navy font-medium">Receive SMS text alerts for critical underwriting actions</span>
                </label>
              </div>
            </div>

            {successMsg && (
              <div className="p-4 bg-emerald/10 border border-emerald/20 rounded-2xl text-emerald text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading} className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-8 py-3 rounded-xl shadow-soft">
                {loading ? "Saving Changes..." : "Save Profile Settings"}
              </Button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}