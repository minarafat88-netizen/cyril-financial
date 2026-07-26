"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, FileText, Activity } from "lucide-react";

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState({
    totalVolume: 42500000,
    activeApplications: 38,
    conversionRate: "24.5%",
    monthlyGrowth: "+18.2%",
  });

  return (
    <div className="space-y-8 p-8 bg-surface min-h-screen font-sans text-navy">
      <div>
        <h1 className="text-3xl font-black text-navy tracking-tight">Enterprise Portfolio Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Real-time performance metrics, loan origination volume, and conversion tracking.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <Card className="bg-white border-gray-100 shadow-card-soft rounded-3xl p-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Origination Volume</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-silver-gradient flex items-center justify-center shadow-sm">🪙</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-navy">${(metrics.totalVolume / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-blue-600 mt-1 font-bold">{metrics.monthlyGrowth} from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-card-soft rounded-3xl p-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Applications</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-silver-gradient flex items-center justify-center shadow-sm">📁</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-navy">{metrics.activeApplications}</div>
            <p className="text-xs text-gray-500 mt-1 font-medium">Underwriting & Processing</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-card-soft rounded-3xl p-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">Lead Conversion</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-silver-gradient flex items-center justify-center shadow-sm">📈</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-navy">{metrics.conversionRate}</div>
            <p className="text-xs text-blue-600 mt-1 font-bold">+3.4% high-net-worth tier</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-card-soft rounded-3xl p-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-gray-500 uppercase tracking-wider">System Status</CardTitle>
            <div className="w-8 h-8 rounded-lg bg-silver-gradient flex items-center justify-center shadow-sm">🔒</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-navy">99.99%</div>
            <p className="text-xs text-blue-600 mt-1 font-bold">Secure Vault Online</p>
          </CardContent>
        </Card>

      </div>

      <div className="bg-white p-8 rounded-3xl shadow-card-soft border border-gray-100">
        <h3 className="text-lg font-bold text-navy mb-4">Loan Distribution by Asset Class</h3>
        <div className="h-64 flex items-center justify-center bg-surface rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
          Interactive Portfolio Performance Chart Matrix Ready
        </div>
      </div>
    </div>
  );
}