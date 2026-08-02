export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { getCurrentUserSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getCurrentUserSession();
    // Cast the user object to include the 'role' property to satisfy TypeScript
    const user = session?.user as { role?: string | null };

    if (user?.role !== "SUPER_ADMIN" && user?.role !== "LOAN_OFFICER") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // جلب العملاء المحتملين (leads) من قاعدة البيانات وترتيبهم تنازلياً حسب تاريخ الإنشاء باستخدام Drizzle
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

    return NextResponse.json({ success: true, count: allLeads.length, data: allLeads });
  } catch (error) {
    console.error("Error fetching admin lead pipeline:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch admin lead pipeline" }, { status: 500 });
  }
}