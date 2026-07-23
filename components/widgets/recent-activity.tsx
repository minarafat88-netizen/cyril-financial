"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, FileText, ArrowUpRight, Clock } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: string;
}

export function RecentActivityWidget() {
  const activities: ActivityItem[] = [
    {
      id: "1",
      title: "Jumbo Mortgage Application submitted by J. Doe ($2.4M)",
      timestamp: "12 mins ago",
      type: "APPLICATION",
    },
    {
      id: "2",
      title: "Encrypted Vault documents verified for Brentwood Property",
      timestamp: "45 mins ago",
      type: "VAULT",
    },
    {
      id: "3",
      title: "Bank Statement underwriting review completed",
      timestamp: "2 hours ago",
      type: "UNDERWRITING",
    },
  ];

  return (
    <Card className="bg-white rounded-3xl shadow-luxury border border-gray-100 p-6 space-y-6">
      <CardHeader className="flex flex-row items-center justify-between p-0">
        <div>
          <CardTitle className="text-xl font-bold font-heading text-navy">Recent Institutional Activity</CardTitle>
          <p className="text-slate text-xs mt-1">Live audit trail across loan origination nodes and secure vaults.</p>
        </div>
        <div className="w-10 h-10 bg-emerald/10 text-emerald rounded-2xl flex items-center justify-center">
          <Clock className="w-5 h-5" />
        </div>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-navy/5 text-navy flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-emerald" />
              </div>
              <div>
                <p className="text-sm font-bold text-navy">{item.title}</p>
                <p className="text-xs text-slate mt-0.5">{item.timestamp}</p>
              </div>
            </div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald/10 text-emerald">
              {item.type}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}