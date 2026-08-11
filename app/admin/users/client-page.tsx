"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Mail, Trash2, Plus, UserPlus } from "lucide-react";
import Link from "next/link";
import { updateUserRole, deleteUser } from "./actions";

type UserRecord = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: "SUPER_ADMIN" | "LOAN_OFFICER" | "PROCESSOR" | "CLIENT" | null;
  createdAt: Date;
};

export default function UsersClient({ initialData }: { initialData: UserRecord[] }) {
  const [isPending, startTransition] = useTransition();

  // Handle changing user role/status
  const handleRoleChange = (userId: string, newRole: string) => {
    startTransition(async () => {
      await updateUserRole(userId, newRole);
    });
  };

  // Handle user deletion
  const handleDelete = (userId: string, name: string | null) => {
    if (window.confirm(`Are you sure you want to delete user "${name || userId}"? This action cannot be undone.`)) {
      startTransition(async () => {
        await deleteUser(userId);
      });
    }
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen relative">
      
      {/* Loading overlay during database updates */}
      {isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center">
          <span className="text-navy font-bold animate-pulse">Updating Database...</span>
        </div>
      )}

      {/* Header Section with Add New User Button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Team & Access Management</h1>
          <p className="text-slate text-sm mt-1">Manage administrative permissions, advisory roles, and secure system access from database.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/admin/users/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-2 cursor-pointer">
              <UserPlus className="w-4 h-4" /> Add New User
            </Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="outline" className="border-gray-200 text-navy bg-white text-xs hover:bg-gray-100">
              ← Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-slate uppercase tracking-wider">
                <th className="p-6">Member Name</th>
                <th className="p-6">Email Address</th>
                <th className="p-6">Role / Clearance</th>
                <th className="p-6">Joined Date</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {initialData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-gray-500 font-medium">
                    No users found in the database. Click "Add New User" to create one.
                  </td>
                </tr>
              ) : (
                initialData.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50/55 transition-colors">
                    <td className="p-6 align-middle">
                      <div className="font-bold text-navy">{member.name || "Unnamed User"}</div>
                      <div className="text-xs text-slate font-mono">{member.id}</div>
                    </td>
                    <td className="p-6 text-slate text-xs align-middle">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> {member.email}
                      </div>
                    </td>
                    <td className="p-6 align-middle">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-navy/5 text-navy">
                        <Shield className="w-3 h-3 text-blue-600" /> {member.role || "CLIENT"}
                      </span>
                    </td>
                    <td className="p-6 text-slate text-xs align-middle">
                      {new Date(member.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-6 text-right space-x-2 align-middle">
                      {/* Role/Status Change Select Dropdown */}
                      <select
                        value={member.role || "CLIENT"}
                        onChange={(e) => handleRoleChange(member.id, e.target.value)}
                        className="text-xs rounded-lg border border-gray-200 py-1.5 px-2.5 bg-gray-50 text-navy font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
                        disabled={isPending}
                      >
                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        <option value="LOAN_OFFICER">LOAN_OFFICER</option>
                        <option value="PROCESSOR">PROCESSOR</option>
                        <option value="CLIENT">CLIENT</option>
                      </select>

                      {/* Delete User Button */}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDelete(member.id, member.name)}
                        className="text-red-600 border-gray-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                        disabled={isPending}
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
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