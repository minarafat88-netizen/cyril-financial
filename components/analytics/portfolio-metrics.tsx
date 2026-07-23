"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, Activity, FileText } from "lucide-react";

export function PortfolioMetricsComponent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-white border-gray-100 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Origination Volume</CardTitle>
          <DollarSign className="w-4 h-4 text-emerald" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-navy">$42.5M</div>
          <p className="text-xs text-emerald mt-1 font-medium">+18.2% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-100 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Active Applications</CardTitle>
          <FileText className="w-4 h-4 text-navy" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-navy">38</div>
          <p className="text-xs text-slate mt-1">Underwriting & Processing</p>
        </CardContent>
      </Card>

      <Card className="bg-white border-gray-100 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-semibold text-slate uppercase tracking-wider">Lead Conversion</CardTitle>
          <TrendingUp className="w-4 h-4 text-emerald" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-navy">24.5%</div>
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
  );
}