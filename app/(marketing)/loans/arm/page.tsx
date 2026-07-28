"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, User, Mail, Phone, MessageSquare, Tag, Calendar, Edit, CheckCircle, RefreshCw, Save, X } from "lucide-react";

type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Qualified' | 'Unqualified' | 'Closed';
const leadStatuses: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Qualified', 'Unqualified', 'Closed'];

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  interest: string;
  message?: string;
  status: LeadStatus;
  createdAt: any;
}

const EditLeadModal = ({ lead, onSave, onCancel }: { lead: Lead, onSave: (updatedData: Partial<Lead>) => Promise<void>, onCancel: () => void }) => {
  const [formData, setFormData] = useState({
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await onSave(formData);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <div className="p-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-navy">Edit Client Information</h2>
            <p className="text-sm text-gray-500">Update the core details for this lead.</p>
          </div>
          <div className="p-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500">First Name</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500">Last Name</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500">Email Address</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500">Phone Number</label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-b-3xl flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel}><X className="w-4 h-4 mr-2" /> Cancel</Button>
            <Button type="submit" disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700"><Save className="w-4 h-4 mr-2" /> {isSaving ? 'Saving...' : 'Save Changes'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [statusUpdateMessage, setStatusUpdateMessage] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchLeadDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/leads/${id}`);
        const data = await response.json();

        if (data.success) {
          setLead(data.data);
        } else {
          setError(data.error || "Failed to fetch lead details.");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetails();
  }, [id]);

  const handleStatusChange = async (newStatus: LeadStatus) => {
    if (!lead || newStatus === lead.status) return;

    setIsUpdatingStatus(true);
    setStatusUpdateMessage(null);

    try {
      await handleUpdate({ status: newStatus });
      setStatusUpdateMessage("Status updated!");
      setTimeout(() => setStatusUpdateMessage(null), 2000);
    } catch (err: any) {
      // يتم عرض الخطأ من خلال handleUpdate
      // يمكن إضافة منطق إضافي هنا إذا لزم الأمر
    }

    setIsUpdatingStatus(false);
  };

  const handleUpdate = async (updatedData: Partial<Lead>) => {
    if (!lead) return;

    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || "Failed to update.");
      
      // تحديث الحالة المحلية بنجاح
      setLead(prev => prev ? { ...prev, ...updatedData } : null);
      setIsEditModalOpen(false);

    } catch (err: any) {
      alert(`Error: ${err.message}`);
      throw err; // إعادة إرسال الخطأ ليتم التعامل معه في الدالة المستدعية
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading lead details...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!lead) {
    return <div className="p-8 text-center">Lead not found.</div>;
  }

  const leadDetails = [
    { icon: User, label: "Full Name", value: `${lead.firstName} ${lead.lastName}` },
    { icon: Mail, label: "Email Address", value: lead.email },
    { icon: Phone, label: "Phone Number", value: lead.phone || "Not provided" },
    { icon: Tag, label: "Area of Interest", value: lead.interest },
    { icon: Calendar, label: "Submission Date", value: lead.createdAt?.toDate ? format(lead.createdAt.toDate(), 'MMMM dd, yyyy @ hh:mm a') : 'N/A' },
  ];

  return (
    <div className="p-8 space-y-8 bg-surface min-h-screen font-sans text-navy">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/leads">
            <Button variant="outline" size="icon" className="border-gray-200">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Lead Details</h1>
            <p className="text-sm text-gray-500 mt-1">Viewing inquiry from {lead.firstName} {lead.lastName}</p>
          </div>
        </div>
        <Button onClick={() => setIsEditModalOpen(true)} className="bg-navy text-white"><Edit className="w-4 h-4 mr-2" /> Edit Lead</Button>
      </div>

      {/* Details Grid */}
      {isEditModalOpen && (
        <EditLeadModal lead={lead} onSave={handleUpdate} onCancel={() => setIsEditModalOpen(false)} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-card-soft border border-gray-100 p-8 space-y-6">
          <h2 className="text-lg font-bold text-navy border-b border-gray-100 pb-4">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {leadDetails.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500 mt-1">
                  <item.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                  <p className="text-sm font-semibold text-navy">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          {lead.message && (
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gray-50 rounded-lg text-gray-500 mt-1">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Initial Message</p>
                  <p className="text-sm text-navy bg-gray-50 p-3 rounded-lg mt-1">{lead.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Status & Actions */}
        <div className="bg-white rounded-3xl shadow-card-soft border border-gray-100 p-8 space-y-6 h-fit">
          <h2 className="text-lg font-bold text-navy border-b border-gray-100 pb-4">Lead Status</h2>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Update Status
            </label>
            <div className="flex items-center gap-2">
              <select
                value={lead.status}
                onChange={(e) => handleStatusChange(e.target.value as LeadStatus)}
                disabled={isUpdatingStatus}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-navy font-bold text-navy disabled:opacity-70"
              >
                {leadStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {isUpdatingStatus && <RefreshCw className="w-4 h-4 text-gray-500 animate-spin" />}
            </div>
            {statusUpdateMessage && (
              <div className="text-xs font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                {statusUpdateMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}