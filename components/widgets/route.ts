export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { db } from "@/lib/db"; // عميل Drizzle ORM الخاص بك
import { leads, applications } from "@/lib/schema"; // مخططات الجداول
import { desc } from "drizzle-orm"; // لترتيب النتائج

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cyril_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const sessionData = await verifyAuthToken(token); // await the session data
    const role = (sessionData as any)?.role ?? (sessionData as any)?.user?.role;

    if (!sessionData || (role !== "SUPER_ADMIN" && role !== "LOAN_OFFICER")) {
      return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
    }

    // جلب أحدث 3 عملاء محتملين (leads) باستخدام Drizzle
    const recentLeads = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(3);

    // جلب أحدث 3 طلبات تقديم (applications) باستخدام Drizzle
    const recentApplications = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt))
      .limit(3);

    const activities: any[] = [];

    recentLeads.forEach((data) => {
      activities.push({
        id: `lead-${data.id}`,
        title: "Lead Captured",
        desc: `${data.name} inquired about a loan`, // Assuming 'name' is available in leads
        time: data.createdAt.toISOString(),
        icon: "💬",
      });
    });

    recentApplications.forEach((data) => {
      activities.push({
        id: `app-${data.id}`,
        title: "New Application Submitted",
        desc: `Loan Type: ${data.loanType || "N/A"} by ${data.name}`,
        time: data.createdAt.toISOString(),
        icon: "🪙",
      });
    });

    const sortedActivities = activities
      .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);

    return NextResponse.json({ success: true, data: sortedActivities });
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recent activity" }, { status: 500 });
  }
}
