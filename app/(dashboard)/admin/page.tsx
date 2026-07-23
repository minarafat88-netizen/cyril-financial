"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Settings, 
  Bell, 
  Search,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-navy text-white flex flex-col justify-between hidden md:flex border-r border-navy-light">
        <div>
          <div className="p-6 border-b border-navy-light/40">
            <h1 className="text-xl font-bold font-heading tracking-wide text-gold">CYNL ADMIN</h1>
            <p className="text-xs text-gray-400 mt-1">Enterprise Portal v2.4</p>
          </div>
          <nav className="p-4 space-y-1">
            {[
              { id: "overview", label: "Dashboard", icon: BarChart3 },
              { id: "leads", label: "Lead Pipeline", icon: Users },
              { id: "applications", label: "Loan Applications", icon: FileText },
              { id: "rates", label: "Rates & Pricing", icon: TrendingUp },
              { id: "compliance", label: "Audit & Security", icon: ShieldCheck },
              { id: "settings", label: "System Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-emerald text-white shadow-glass" : "text-gray-300 hover:bg-navy-light/50 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-navy-light/40">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              MR
            </div>
            <div>
              <p className="text-sm font-medium text-white">Major M. Rafat</p>
              <p className="text-xs text-gray-400">Super Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4 w-96">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search leads, applications, NMLS IDs..." 
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald rounded-full animate-pulse" />
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <span className="text-xs font-semibold px-3 py-1 bg-emerald/10 text-emerald rounded-full border border-emerald/20">
              Live Systems Nominal
            </span>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-navy font-heading">Executive Performance Overview</h2>
            <p className="text-sm text-slate mt-1">Real-time California market metrics and conversion funnel analytics.</p>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Monthly Loan Volume", value: "$124,500,000", change: "+14.2%", positive: true, icon: DollarSign },
              { title: "Qualified Leads (MTD)", value: "1,482", change: "+8.1%", positive: true, icon: Users },
              { title: "Active Applications", value: "348", change: "-2.4%", positive: false, icon: FileText },
              { title: "Conversion Rate", value: "4.82%", change: "+1.2%", positive: true, icon: TrendingUp },
            ].map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-luxury"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate uppercase tracking-wider">{metric.title}</span>
                    <div className="p-2 rounded-lg bg-emerald/10 text-emerald">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-navy font-heading">{metric.value}</span>
                    <span className={`text-xs font-semibold flex items-center gap-0.5 ${metric.positive ? "text-green-600" : "text-red-600"}`}>
                      {metric.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Recent Lead Pipeline Data Table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-luxury overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-navy font-heading">Recent High-Value Leads</h3>
                <p className="text-xs text-slate mt-0.5">Automated sorting via credit score and loan amount criteria.</p>
              </div>
              <button className="text-xs font-semibold text-emerald hover:underline">View All Leads →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-slate uppercase tracking-wider">
                    <th className="py-3 px-6">Client Name</th>
                    <th className="py-3 px-6">Loan Purpose</th>
                    <th className="py-3 px-6">Property Location</th>
                    <th className="py-3 px-6">Loan Amount</th>
                    <th className="py-3 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {[
                    { name: "Alexander Sterling", purpose: "Jumbo Loan", location: "Beverly Hills, CA 90210", amount: "$2,400,000", status: "Underwriting" },
                    { name: "Victoria Vance", purpose: "Bank Statement", location: "Newport Beach, CA 92660", amount: "$1,850,000", status: "New Lead" },
                    { name: "Marcus Thorne", purpose: "Conventional", location: "San Francisco, CA 94107", amount: "$950,000", status: "Approved" },
                    { name: "Elena Rostova", purpose: "DSCR Investment", location: "San Diego, CA 92101", amount: "$1,200,000", status: "Processing" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-4 px-6 font-medium text-navy">{row.name}</td>
                      <td className="py-4 px-6 text-slate">{row.purpose}</td>
                      <td className="py-4 px-6 text-slate">{row.location}</td>
                      <td className="py-4 px-6 font-semibold text-navy">{row.amount}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          row.status === "Approved" ? "bg-green-100 text-green-800" :
                          row.status === "Underwriting" ? "bg-amber-100 text-amber-800" :
                          row.status === "New Lead" ? "bg-emerald/10 text-emerald" : "bg-blue-100 text-blue-800"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}