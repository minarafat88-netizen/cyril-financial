"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, UserPlus, Mail, Lock, CheckCircle2, Trash2, Edit } from "lucide-react";

export default function AdminUsersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("Senior Loan Advisor");

  // محاكاة قائمة أعضاء الفريق
  const [teamMembers, setTeamMembers] = useState([
    {
      id: "USR-01",
      name: "Cyril Montgomery",
      email: "cyril@cyrilfinancial.com",
      role: "Managing Director",
      status: "Active",
      lastLogin: "Today, 09:42 AM",
    },
    {
      id: "USR-02",
      name: "Alexander Wright",
      email: "a.wright@cyrilfinancial.com",
      role: "Senior Loan Advisor",
      status: "Active",
      lastLogin: "Yesterday, 04:15 PM",
    },
    {
      id: "USR-03",
      name: "Elena Rostova",
      email: "e.rostova@cyrilfinancial.com",
      role: "Underwriting & Risk Analyst",
      status: "Active",
      lastLogin: "July 22, 2026",
    },
  ]);

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: `USR-0${teamMembers.length + 1}`,
      name: userName,
      email: userEmail,
      role: userRole,
      status: "Active",
      lastLogin: "Never",
    };
    setTeamMembers([...teamMembers, newMember]);
    setUserName("");
    setUserEmail("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Team & Access Management</h1>
          <p className="text-slate text-sm mt-1">Manage administrative permissions, advisory roles, and secure system access.</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-2.5 rounded-xl shadow-glass flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> Add Team Member
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold text-slate uppercase tracking-wider">
                <th className="p-6">Member Name</th>
                <th className="p-6">Email Address</th>
                <th className="p-6">Role / Clearance</th>
                <th className="p-6">Status</th>
                <th className="p-6">Last Activity</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/55 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-navy">{member.name}</div>
                    <div className="text-xs text-slate">{member.id}</div>
                  </td>
                  <td className="p-6 text-slate text-xs flex items-center gap-1.5 pt-8">
                    <Mail className="w-3.5 h-3.5" /> {member.email}
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-navy/5 text-navy">
                      <Shield className="w-3 h-3 text-emerald" /> {member.role}
                    </span>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-600">
                      <CheckCircle2 className="w-3 h-3" /> {member.status}
                    </span>
                  </td>
                  <td className="p-6 text-slate text-xs">{member.lastLogin}</td>
                  <td className="p-6 text-right space-x-2">
                    <Button variant="outline" size="sm" className="text-navy border-gray-200">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 border-gray-200 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-navy/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold font-heading text-navy">Add New Team Member</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate hover:text-navy text-sm font-bold p-2"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Full Name</label>
                <Input
                  required
                  placeholder="e.g., Jonathan Vance"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="font-semibold text-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Corporate Email</label>
                <Input
                  type="email"
                  required
                  placeholder="name@cyrilfinancial.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="font-semibold text-navy"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-1">Role & Clearance</label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-2.5 text-sm font-semibold text-navy bg-white"
                >
                  <option value="Managing Director">Managing Director</option>
                  <option value="Senior Loan Advisor">Senior Loan Advisor</option>
                  <option value="Underwriting & Risk Analyst">Underwriting & Risk Analyst</option>
                  <option value="Compliance Officer">Compliance Officer</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="border-gray-200 text-slate"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 rounded-xl"
                >
                  Save & Grant Access
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}