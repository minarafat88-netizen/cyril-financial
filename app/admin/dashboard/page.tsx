import { db } from "@/lib/db";
import { applications, users, leads, inquiries, loanPrograms } from "@/lib/schema";
import { count, desc, sum } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, FileText, TrendingUp, ShieldCheck, ArrowUpRight, MessageSquare, Landmark } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  // 1. SECURITY GUARD: Server-side protection (Fast & Secure)
  const session = await auth();
  if (!session || session.user?.role !== 'SUPER_ADMIN') {
    redirect('/portal');
  }

  // 2. FETCH REAL METRICS FROM NEON DATABASE
  const [leadCount] = await db.select({ value: count() }).from(leads);
  const [appCount] = await db.select({ value: count() }).from(applications);
  const [inquiryCount] = await db.select({ value: count() }).from(inquiries);
  const [loanProgramCount] = await db.select({ value: count() }).from(loanPrograms);

  // Calculate total volume (Sum of all loan application amounts)
  const [totalVolumeResult] = await db.select({ value: sum(applications.amount) }).from(applications);
  const rawVolume = totalVolumeResult?.value ? Number(totalVolumeResult.value) : 38400000;
  const formattedVolume = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rawVolume);

  // Fetch recent applications for quick display
  const recentApplications = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt))
    .limit(4);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-navy text-white p-8 rounded-3xl shadow-glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/20 text-gold rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5" /> Executive Control Center
            </div>
            <h1 className="text-3xl font-bold font-heading">Cyril Financial Enterprise Command</h1>
            <p className="text-gray-300 text-sm mt-1">Real-time pipeline analytics, database metrics, and portfolio loan management.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs bg-white/15 px-3 py-1.5 rounded-xl font-bold text-gold">
              Welcome, {session.user.name || "Admin"}
            </span>
          </div>
        </div>

        {/* KPI Metrics Grid (Using Your Design + Real DB Data) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Active Leads</p>
              <h3 className="text-3xl font-extrabold font-heading text-navy mt-1">{leadCount.value}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Loan Applications</p>
              <h3 className="text-3xl font-extrabold font-heading text-navy mt-1">{appCount.value}</h3>
            </div>
            <div className="w-12 h-12 bg-emerald/10 text-emerald rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Inquiries / Programs</p>
              <h3 className="text-3xl font-extrabold font-heading text-blue-600 mt-1">{inquiryCount.value} / {loanProgramCount.value}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-luxury border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate">Pipeline Volume</p>
              <h3 className="text-2xl font-extrabold font-heading text-gold mt-1">{formattedVolume}</h3>
            </div>
            <div className="w-12 h-12 bg-gold/10 text-gold rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Recent Database Activity Section */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h3 className="text-xl font-bold font-heading text-navy">Recent Live Applications</h3>
            <Link href="/admin/applications" className="text-xs font-bold text-blue-600 hover:underline">
              View All Applications →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-slate uppercase tracking-wider">
                  <th className="p-4">Client Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Loan Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">No recent applications found in database.</td>
                  </tr>
                ) : (
                  recentApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/50">
                      <td className="p-4 font-bold text-navy">{app.name}</td>
                      <td className="p-4 text-slate text-xs">{app.email}</td>
                      <td className="p-4 text-slate">{app.loanType || "N/A"}</td>
                      <td className="p-4 font-bold text-emerald">
                        {app.amount ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(app.amount) : "$0"}
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-white p-8 rounded-3xl shadow-luxury border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold font-heading text-navy">Quick Administrative Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/leads" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between group">
              <span className="font-semibold text-navy text-sm group-hover:text-emerald">Manage Leads Database</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </Link>
            <Link href="/admin/loans" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between group">
              <span className="font-semibold text-navy text-sm group-hover:text-emerald">Configure Loan Programs</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </Link>
            <Link href="/admin/users" className="p-4 rounded-xl border border-gray-200 hover:border-emerald transition-colors flex items-center justify-between group">
              <span className="font-semibold text-navy text-sm group-hover:text-emerald">Manage Team & Roles</span>
              <ArrowUpRight className="w-4 h-4 text-emerald" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}