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
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold font-heading text-navy">Enterprise Portfolio Analytics</h1>
        <p className="text-slate text-sm mt-1">Real-time performance metrics, loan origination volume, and conversion tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-gray-100 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Origination Volume</CardTitle>
            <DollarSign className="w-4 h-4 text-emerald" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">${(metrics.totalVolume / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-emerald mt-1 font-medium">{metrics.monthlyGrowth} from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Active Applications</CardTitle>
            <FileText className="w-4 h-4 text-navy" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{metrics.activeApplications}</div>
            <p className="text-xs text-slate mt-1">Underwriting & Processing</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Lead Conversion</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">{metrics.conversionRate}</div>
            <p className="text-xs text-emerald mt-1 font-medium">+3.4% high-net-worth tier</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-gray-100 shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">System Status</CardTitle>
            <Activity className="w-4 h-4 text-emerald" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy">99.99%</div>
            <p className="text-xs text-emerald mt-1">Secure Vault Online</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
        <h3 className="text-lg font-bold text-navy mb-4">Loan Distribution by Asset Class</h3>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 text-slate text-sm">
          Interactive Portfolio Performance Chart Matrix Ready
        </div>
      </div>
    </div>
  );
}