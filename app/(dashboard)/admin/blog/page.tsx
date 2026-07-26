"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, FileText, Edit3, Trash2 } from "lucide-react";

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
    <div className="space-y-8 p-8 bg-surface min-h-screen font-sans text-navy">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight">Content & Insights Management</h1>
          <p className="text-gray-500 text-sm mt-1">Publish market commentary, mortgage guidelines, and real estate insights.</p>
        </div>
        <button className="bg-silver-button text-navy border border-gray-200 font-bold px-5 py-2.5 rounded-xl shadow-sm hover:brightness-105 transition-all flex items-center gap-2 text-sm">
          <span>🪙</span> Create New Article
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-card-soft border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-navy text-white text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Article Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Last Updated</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-5 px-6 font-bold text-navy flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-silver-gradient flex items-center justify-center shadow-sm flex-shrink-0 text-xs">🪙</div>
                    {post.title}
                  </td>
                  <td className="py-5 px-6 text-gray-600 font-medium">{post.category}</td>
                  <td className="py-5 px-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                      post.status === "Published" 
                        ? "bg-blue-50 text-blue-700 border-blue-100" 
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="py-5 px-6 text-gray-500 text-xs font-medium">{post.date}</td>
                  <td className="py-5 px-6 text-right space-x-2">
                    <Button size="sm" variant="outline" className="text-navy border-gray-200 hover:bg-surface">
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