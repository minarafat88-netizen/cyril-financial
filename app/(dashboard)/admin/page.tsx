"use client";

import React, { useState, useEffect } from 'react';
import { LoanTypeModal } from '@/components/admin/LoanTypeModal'; // استيراد المكون الجديد
import { PlusCircle, Edit, Trash2, Loader2, AlertTriangle } from 'lucide-react';

// Define the LoanType interface
interface LoanType {
  id: number;
  name: string;
  description: string | null;
  interestRate: string; // decimal is often a string
  isActive: boolean;
}

export default function LoanTypesPage() {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLoanType, setEditingLoanType] = useState<LoanType | null>(null);

  // Function to fetch loan types
  const fetchLoanTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/loan-types');
      if (!response.ok) throw new Error('Failed to fetch data.');
      const data = await response.json();
      if (data.success) {
        setLoanTypes(data.data);
      } else {
        throw new Error(data.error || 'An unknown error occurred.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoanTypes();
  }, []);

  const handleAdd = () => {
    setEditingLoanType(null); // لا يوجد نوع للتعديل، لذا هو إضافة
    setIsModalOpen(true);
  };

  const handleEdit = (loanType: LoanType) => {
    setEditingLoanType(loanType);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this loan type?')) return;

    try {
      const response = await fetch(`/api/admin/loan-types/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        // Refresh the list after deletion
        setLoanTypes(prev => prev.filter(lt => lt.id !== id));
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('An unexpected error occurred.');
    }
  };

  return (
    <div className="p-6 sm:p-10 font-sans">
      <LoanTypeModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        loanTypeToEdit={editingLoanType}
        onSuccess={fetchLoanTypes} // تمرير دالة التحديث
      />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-navy">Manage Loan Types</h1>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-navy text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-sm">
          <PlusCircle size={16} />
          Add New Type
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card-soft border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-500 flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" /> Loading loan types...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500 flex items-center justify-center gap-2">
            <AlertTriangle /> Error: {error}
          </div>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs text-gray-600 uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Interest Rate</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanTypes.map((type) => (
                <tr key={type.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-navy">{type.name}</td>
                  <td className="px-6 py-4 text-gray-700">{type.interestRate}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${type.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {type.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleEdit(type)} className="p-2 text-gray-500 hover:text-blue-600">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(type.id)} className="p-2 text-gray-500 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}