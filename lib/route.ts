export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { activities } from "@/lib/schema";
import { cookies } from "next/headers";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cyril_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    // جلب أحدث 5 أنشطة من قاعدة البيانات
    const recentActivities = await db
      .select()
      .from(activities)
      .orderBy(desc(activities.createdAt))
      .limit(5);

    return NextResponse.json({ success: true, data: recentActivities });
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recent activities" }, { status: 500 });
  }
}