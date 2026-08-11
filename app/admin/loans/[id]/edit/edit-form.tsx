"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, Trash2, ArrowLeft, Save, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { updateLoanProgram } from "../../actions";

export default function EditLoanForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  // Form State (مع الاحتفاظ بالـ slug في الخلفية ليتم إرساله للداتابيز تلقائياً)
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    slug: initialData.slug || "",
    subtitle: initialData.subtitle || "",
    description: initialData.description || "",
    loanType: initialData.loanType || "",
    rate: initialData.rate ? initialData.rate.toString() : "",
    icon: initialData.icon || "Home",
    imageUrl: initialData.imageUrl || "",
    sortOrder: initialData.sortOrder !== null && initialData.sortOrder !== undefined ? initialData.sortOrder.toString() : "0",
  });

  // Dynamic Array for Benefits initialized safely
  const [benefits, setBenefits] = useState<string[]>(
    Array.isArray(initialData.benefits) && initialData.benefits.length > 0
      ? initialData.benefits
      : [""]
  );

  // توليد الـ slug تلقائياً في الخلفية عند تغيير الاسم
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const simulatedPath = `/images/loans/${file.name}`;
      setFormData({ ...formData, imageUrl: simulatedPath });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedBenefits = benefits.filter((b) => b.trim() !== "");

    startTransition(async () => {
      const result = await updateLoanProgram(initialData.id, {
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
        {/* Header */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <Landmark className="w-3.5 h-3.5" /> Program Editor
            </div>
            <h1 className="text-3xl font-bold font-heading">Edit Loan Program</h1>
            <p className="text-gray-300 text-sm mt-1">Modify details, rates, and benefits for this mortgage product.</p>
          </div>

          <Link href="/admin/loans">
            <Button variant="outline" className="border-gray-600 text-navy bg-white hover:bg-gray-100 text-xs flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Cancel
            </Button>
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-200">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-3xl shadow-luxury border border-gray-100">
              <h2 className="text-xl font-bold text-navy border-b border-gray-100 pb-4">General Information</h2>

              {/* Program Name (تم جعل الحقل يأخذ العرض كاملًا بعد إزالة الـ Slug) */}
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
                  placeholder="Explain the full details and requirements..."
                />
              </div>

              <div className="border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-navy">Program Benefits (List)</h3>
                  <button type="button" onClick={addBenefitField} className="text-xs text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer">
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
                        <button type="button" onClick={() => removeBenefitField(index)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">Interest Rate (%) - Rate</label>
                  <input 
                    type="number" 
                    step="0.001"
                    value={formData.rate} 
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500"
                    placeholder="e.g., 6.125" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Sort Order</label>
                  <input 
                    type="number" 
                    value={formData.sortOrder} 
                    onChange={(e) => setFormData({ ...formData, sortOrder: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Media & Icons Section */}
              <div className="bg-white p-6 rounded-3xl shadow-luxury border border-gray-100 space-y-4">
                <h2 className="text-lg font-bold text-navy border-b border-gray-100 pb-3">Media & Icons</h2>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Program Icon</label>
                  <select 
                    value={formData.icon} 
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy bg-gray-50 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Home">Home (House)</option>
                    <option value="Building">Building (Commercial)</option>
                    <option value="Landmark">Landmark (Government/FHA)</option>
                    <option value="Shield">Shield (Security)</option>
                    <option value="Percent">Percent (Rate Special)</option>
                    <option value="DollarSign">DollarSign (Jumbo/Cash)</option>
                    <option value="CreditCard">CreditCard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Cover Image File</label>
                  <div className="space-y-3">
                    {formData.imageUrl && (
                      <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-navy truncate">Current Image</p>
                          <p className="text-[11px] text-gray-500 truncate">{formData.imageUrl}</p>
                        </div>
                      </div>
                    )}
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50/50 transition-all">
                      <Upload className="w-6 h-6 text-blue-600 mb-1" />
                      <span className="text-xs font-bold text-navy">Click to upload new image</span>
                      <span className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, WEBP up to 5MB</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
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
              {isPending ? "Updating Database..." : (
                <>
                  <Save className="w-5 h-5" /> Update Loan Program
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}