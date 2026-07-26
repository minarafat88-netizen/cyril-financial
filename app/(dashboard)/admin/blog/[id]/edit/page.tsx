"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Jumbo Lending");
  const [status, setStatus] = useState("Published");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // محاكاة جلب بيانات المقال بناءً على الـ ID
  useEffect(() => {
    // في الواقع الحقيقي، هنا يتم جلب البيانات من الـ Backend أو Firebase باستخدام الـ id
    if (id === "1") {
      setTitle("California Jumbo Loan Strategies for High-Net-Worth Buyers in 2026");
      setCategory("Jumbo Lending");
      setStatus("Published");
      setContent("Detailed content about California jumbo loan strategies...");
    } else if (id === "2") {
      setTitle("Navigating Bank Statement Qualifying for Self-Employed Entrepreneurs");
      setCategory("Bespoke Financing");
      setStatus("Draft");
      setContent("Detailed content about self-employed bank statement programs...");
    } else {
      setTitle("Sample Article Title");
      setCategory("Market Commentary");
      setStatus("Draft");
      setContent("Sample content here...");
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // محاكاة عملية تحديث البيانات وحفظها
    setTimeout(() => {
      setLoading(false);
      router.push("/admin/blog");
    }, 800);
  };

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="outline" size="sm" className="text-navy border-gray-200">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy">Edit Article (ID: {id})</h1>
            <p className="text-slate text-sm">Update existing market insights or financial guides.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Article Title
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate">
                <FileText className="w-4 h-4" />
              </span>
              <Input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pl-9 font-semibold text-navy"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-2.5 text-sm font-semibold text-navy bg-white"
            >
              <option value="Jumbo Lending">Jumbo Lending</option>
              <option value="Bespoke Financing">Bespoke Financing</option>
              <option value="Market Commentary">Market Commentary</option>
              <option value="Mortgage Guidelines">Mortgage Guidelines</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Publication Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-2.5 text-sm font-semibold text-navy bg-white"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate uppercase tracking-wider mb-2">
              Article Content (Markdown / HTML)
            </label>
            <textarea
              required
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-gray-200 p-4 text-sm font-normal text-navy bg-white focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Link href="/admin/blog">
            <Button type="button" variant="outline" className="border-gray-200 text-slate">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={loading}
            className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-6 py-2.5 rounded-xl shadow-glass flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> {loading ? "Updating..." : "Update Article"}
          </Button>
        </div>
      </form>
    </div>
  );
}