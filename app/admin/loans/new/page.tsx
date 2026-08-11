"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, Trash2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { createLoanProgram } from "../actions";

export default function CreateLoanPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    subtitle: "",
    description: "",
    loanType: "",
    defaultInterestRate: "",
    icon: "",
    imageUrl: "",
    sortOrder: "0",
  });

  // Dynamic Array for Benefits
  const [benefits, setBenefits] = useState<string[]>([""]);

  // Auto-generate slug from name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    const autoSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setFormData({ ...formData, name: newName, slug: autoSlug });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefitField = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefitField = (index: number) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Filter out empty benefits
    const cleanedBenefits = benefits.filter(b => b.trim() !== "");

    startTransition(async () => {
      const result = await createLoanProgram({
        ...formData,
        benefits: cleanedBenefits,
      });

      if (result.success) {
        router.push("/admin/loans");
      } else {
        setError(result.error || "Something went wrong.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* === Header Section === */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" /> Program Creator
            </div>
            <h1 className="text-3xl font-bold font-heading">Add New Loan Program</h1>
            <p className="text-gray-300 text-sm mt-1">Configure the details, rates, and benefits for the new mortgage product.</p>
          </div>
          <Link href="/admin/loans">
            <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Cancel
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200">
            {error}
          </div>
        )}

        {/* === The Form === */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: General Information */}
            <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-3xl shadow-luxury border border-gray-100">
              <h2 className="text-xl font-bold text-navy border-b border-gray-100 pb-4">General Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Program Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name} 
                    onChange={handleNameChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                    placeholder="e.g., 30-Year Fixed FHA" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug *</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.slug} 
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 bg-gray-100 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subtitle</label>
                <input 
                  type="text" 
                  value={formData.subtitle} 
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                  placeholder="A short catchy phrase for the program card" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description</label>
                <textarea 
                  rows={4}
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                  placeholder="Explain the full details and requirements of this loan program..." 
                />
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy">Program Benefits (List)</h3>
                  <button type="button" onClick={addBenefitField} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Benefit
                  </button>
                </div>
                
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <input 
                        type="text" 
                        value={benefit} 
                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                        placeholder="e.g., Low down payment options available" 
                      />
                      {benefits.length > 1 && (
                        <button type="button" onClick={() => removeBenefitField(index)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Settings & Meta */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <h2 className="text-lg font-bold text-navy border-b border-gray-100 pb-3">Settings</h2>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Loan Category Type</label>
                  <select 
                    value={formData.loanType} 
                    onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="">Select Type...</option>
                    <option value="PURCHASE">Home Purchase</option>
                    <option value="REFINANCE">Refinance</option>
                    <option value="COMMERCIAL">Commercial</option>
                    <option value="INVESTMENT">Investment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Default Interest Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.defaultInterestRate} 
                    onChange={(e) => setFormData({ ...formData, defaultInterestRate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                    placeholder="e.g., 5.75" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Sort Order</label>
                  <input 
                    type="number" 
                    value={formData.sortOrder} 
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                    placeholder="0" 
                  />
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <h2 className="text-lg font-bold text-navy border-b border-gray-100 pb-3">Media</h2>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Icon Name (Lucide)</label>
                  <input 
                    type="text" 
                    value={formData.icon} 
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                    placeholder="e.g., Home, Building..." 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image URL</label>
                  <input 
                    type="text" 
                    value={formData.imageUrl} 
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500" 
                    placeholder="/images/loans/fha.jpg" 
                  />
                </div>
              </div>
            </div>
            
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-navy hover:bg-navy-dark text-white font-bold py-6 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm cursor-pointer"
            >
              {isPending ? "Saving to Database..." : (
                <>
                  <Save className="w-5 h-5" /> Publish Loan Program
                </>
              )}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
}