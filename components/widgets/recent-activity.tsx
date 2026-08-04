"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
// استيراد أيقونات لتحسين الواجهة
import { AlertTriangle, Archive } from "lucide-react";

interface Activity {
  id: number;
  title: string;
  // تم تحديث اسم الحقل ليتوافق مع مخطط قاعدة البيانات
  description: string | null;
  createdAt: string;
  icon: string;
}

// مكون الهيكل العظمي لتحسين تجربة التحميل
const ActivitySkeleton = () => (
  <div className="flex items-start gap-4 animate-pulse">
    <div className="w-10 h-10 rounded-xl bg-gray-200 flex-shrink-0"></div>
    <div className="flex-1 min-w-0 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="h-3 bg-gray-200 rounded w-16"></div>
  </div>
);

const EmptyState = ({ icon, message }: { icon: React.ReactNode, message: string }) => (
  <div className="text-center py-8 text-gray-500 flex flex-col items-center gap-3">
    {icon}
    <span className="text-xs">{message}</span>
  </div>
);

export function RecentActivityWidget() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/recent-activity');

        const contentType = response.headers.get("content-type");

        // This is the most robust check. It covers both HTTP errors (like 401 Unauthorized)
        // and successful responses that don't contain JSON (like a redirect to an HTML login page).
        if (!response.ok || !contentType || !contentType.includes("application/json")) {
          throw new Error("Session expired or unauthorized access.");
        }

        const data = await response.json();
        if (data.success) {
          setActivities(data.data);
        } else {
          throw new Error(data.error || "API returned an error but was not successful.");
        }
      } catch (error: any) {
        console.error("Failed to fetch recent activity", error);
        setError(error.message);
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
        <Link href="/admin/activity" className="text-blue-600 hover:underline text-xs normal-case font-semibold">
          View All
        </Link>
      </h3>
      
      <div className="space-y-6">
        {loading ? (
          // عرض 3 عناصر هيكلية أثناء التحميل
          <>
            <ActivitySkeleton />
            <ActivitySkeleton />
            <ActivitySkeleton />
          </>
        ) : error ? (
          <EmptyState 
            icon={<AlertTriangle className="w-6 h-6 text-red-400" />}
            message={error}
          />
        ) : activities.length === 0 ? (
          <EmptyState 
            icon={<Archive className="w-6 h-6 text-gray-400" />}
            message="No recent activity to display."
          />
        ) : (
          activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-silver-gradient flex items-center justify-center shadow-sm flex-shrink-0 border border-gray-200">
                <span className="text-lg">{activity.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-navy truncate" title={activity.title}>{activity.title}</p>
                <p className="text-xs text-gray-500 truncate mt-0.5" title={activity.description || ''}>{activity.description}</p>
              </div>
              <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap" title={new Date(activity.createdAt).toLocaleString()}>
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}