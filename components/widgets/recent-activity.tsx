import React from "react";

export function RecentActivityWidget() {
  const activities = [
    { id: 1, title: "New Application Submitted", desc: "Refinance - $450k by John Doe", time: "2 hours ago", icon: "🪙" },
    { id: 2, title: "Document Uploaded", desc: "W2 Form uploaded for App #1092", time: "4 hours ago", icon: "📁" },
    { id: 3, title: "Lead Captured", desc: "Sarah C. inquired about Jumbo Loans", time: "1 day ago", icon: "💬" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-card-soft border border-gray-100 p-6 font-sans">
      <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 flex items-center justify-between">
        <span>Recent Activity</span>
        <button className="text-blue-600 hover:underline text-xs normal-case">View All</button>
      </h3>
      
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-silver-gradient flex items-center justify-center shadow-sm flex-shrink-0 border border-gray-200">
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy truncate">{activity.title}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{activity.desc}</p>
            </div>
            <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
              {activity.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}