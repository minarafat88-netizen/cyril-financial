"use client";

import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
}

export function RecentActivityWidget() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        // ملاحظة: يجب إنشاء واجهة API لجلب هذه البيانات
        const response = await fetch('/api/admin/recent-activity');
        const data = await response.json();
        if (data.success) {
          setActivities(data.data);
        } else {
          setError(data.error || "Failed to fetch activity.");
        }
      } catch (error) {
        console.error("Failed to fetch recent activity", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-card-soft border border-gray-100 p-6 font-sans">
      <h3 className="text-sm font-bold text-navy uppercase tracking-wider mb-6 flex items-center justify-between">
        <span>Recent Activity</span>
        <button className="text-blue-600 hover:underline text-xs normal-case">View All</button>
      </h3>
      
      <div className="space-y-6">
        {loading && <div className="text-xs text-center text-gray-500">Loading activity...</div>}
        {error && <div className="text-xs text-center text-red-500">{error}</div>}
        {!loading && activities.length === 0 && <div className="text-xs text-center text-gray-500">No recent activity.</div>}
        {!loading && activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-silver-gradient flex items-center justify-center shadow-sm flex-shrink-0 border border-gray-200">
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-navy truncate">{activity.title}</p>
              <p className="text-xs text-gray-500 truncate mt-0.5" title={activity.desc}>{activity.desc}</p>
            </div>
            <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap">
              {formatDistanceToNow(new Date(activity.time), { addSuffix: true })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}