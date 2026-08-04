"use client";

import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

// Temporary local module declaration to avoid TS error when the
// '@radix-ui/react-dialog' types are not installed in the project.
declare module '@radix-ui/react-dialog' {
  import * as React from 'react';
  export const Root: any;
  export const Portal: any;
  export const Overlay: any;
  export const Content: any;
  export const Title: any;
  export const Close: any;
}
import { X, Loader2 } from 'lucide-react';

interface LoanType {
  id: number;
  name: string;
  description: string | null;
  interestRate: string;
  isActive: boolean;
}

interface LoanTypeModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  loanTypeToEdit: LoanType | null;
  onSuccess: () => void; // دالة لتحديث البيانات في الصفحة الرئيسية
}

export function LoanTypeModal({ isOpen, setIsOpen, loanTypeToEdit, onSuccess }: LoanTypeModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    interestRate: '',
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = loanTypeToEdit !== null;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        setFormData({
          name: loanTypeToEdit.name,
          description: loanTypeToEdit.description || '',
          interestRate: loanTypeToEdit.interestRate,
          isActive: loanTypeToEdit.isActive,
        });
      } else {
        // إعادة تعيين النموذج عند الإضافة
        setFormData({ name: '', description: '', interestRate: '', isActive: true });
      }
      setError(null);
    }
  }, [loanTypeToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = isEditing ? `/api/admin/loan-types/${loanTypeToEdit.id}` : '/api/admin/loan-types';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'An error occurred.');
      }

      onSuccess(); // تحديث القائمة في الصفحة الرئيسية
      setIsOpen(false); // إغلاق النافذة
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-50" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md bg-white p-6 rounded-2xl shadow-lg z-50 focus:outline-none">
          <Dialog.Title className="text-lg font-bold text-navy mb-4">
            {isEditing ? 'Edit Loan Type' : 'Add New Loan Type'}
          </Dialog.Title>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-navy focus:border-navy" />
            </div>
            <div>
              <label htmlFor="interestRate" className="block text-xs font-medium text-gray-700 mb-1">Interest Rate (%)</label>
              <input type="number" name="interestRate" id="interestRate" value={formData.interestRate} onChange={handleChange} required step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-navy focus:border-navy" />
            </div>
            <div>
              <label htmlFor="description" className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-navy focus:border-navy" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 text-navy border-gray-300 rounded focus:ring-navy" />
              <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
            </div>

            {error && <p className="text-xs text-red-500">{error}</p>}

            <div className="flex justify-end gap-4 pt-4">
              <Dialog.Close asChild><button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">Cancel</button></Dialog.Close>
              <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-navy rounded-md hover:bg-opacity-90 flex items-center gap-2 disabled:bg-gray-400">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Create Type'}
              </button>
            </div>
          </form>

          <Dialog.Close asChild><button className="absolute top-4 right-4 p-1 rounded-full text-gray-500 hover:bg-gray-100" aria-label="Close"><X className="w-4 h-4" /></button></Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
