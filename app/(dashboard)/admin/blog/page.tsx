"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Edit3, Trash2, ArrowUpRight } from "lucide-react";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([
    {
      id: "1",
      title: "California Jumbo Loan Strategies for High-Net-Worth Buyers in 2026",
      category: "Jumbo Lending",
      status: "Published",
      date: "July 12, 2026",
    },
    {
      id: "2",
      title: "Navigating Bank Statement Qualifying for Self-Employed Entrepreneurs",
      category: "Bespoke Financing",
      status: "Draft",
      date: "Pending Review",
    },
  ]);

  return (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-heading text-navy">Content & Insights Management</h1>
          <p className="text-slate text-sm mt-1">Publish market commentary, mortgage guidelines, and real estate insights.</p>
        </div>
        <Button className="bg-emerald hover:bg-emerald-dark text-white font-semibold px-5 py-2.5 rounded-xl shadow-glass flex items-center gap-2">
          <PlusCircle className="w-4 h-4" /> Create New Article
        </Button>
      </div>

      <div className="bg-white rounded-3xl shadow-luxury border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">Article Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-5 px-6 font-bold text-navy flex items-center gap-3">
                    <FileText className="w-4 h-4 text-emerald" /> {post.title}
                  </td>
                  <td className="py-5 px-6 text-slate">{post.category}</td>
                  <td className="py-5 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                      post.status === "Published" ? "bg-emerald/10 text-emerald" : "bg-gold/10 text-gold"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-slate text-xs">{post.date}</td>
                  <td className="py-5 px-6 text-right space-x-2">
                    <Button size="sm" variant="outline" className="text-navy border-gray-200">
                      <Edit3 className="w-3.5 h-3.5" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 border-gray-200 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}