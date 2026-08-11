"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Shield, Mail, Phone, User, Lock } from "lucide-react";
import Link from "next/link";
import { createUser } from "../actions";

export default function NewUserPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "CLIENT" as "SUPER_ADMIN" | "LOAN_OFFICER" | "PROCESSOR" | "CLIENT",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      const result = await createUser(formData);
      if (result.success) {
        router.push("/admin/users");
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <UserPlus className="w-3.5 h-3.5" /> Access Control
            </div>
            <h1 className="text-3xl font-bold font-heading">Add New User</h1>
            <p className="text-gray-300 text-sm mt-1">Create a new team member or client account and assign clearance.</p>
          </div>

          <Link href="/admin/users">
            <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Users
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200">
            {error}
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-navy border-b border-gray-100 pb-4">User Credentials & Role</h2>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="e.g., John Doe"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input 
                  required 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input 
                  required 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Phone className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  value={formData.phone} 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 font-medium"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Role / Clearance Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">System Role / Clearance *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-400">
                  <Shield className="w-4 h-4 text-blue-600" />
                </span>
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 font-semibold cursor-pointer"
                >
                  <option value="CLIENT">CLIENT (Standard User)</option>
                  <option value="LOAN_OFFICER">LOAN_OFFICER (Advisory Role)</option>
                  <option value="PROCESSOR">PROCESSOR (Operations)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full Access)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-navy hover:bg-navy-dark text-white font-bold py-6 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              {isPending ? "Creating User..." : (
                <>
                  <UserPlus className="w-5 h-5" /> Save New User
                </>
              )}
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}