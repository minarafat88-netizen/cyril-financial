export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const session = await getCurrentUserSession();
    // Cast the user object to include the 'role' property to satisfy TypeScript
    const user = session?.user as { role?: string | null };

    if (user?.role !== "SUPER_ADMIN") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // جلب قائمة المستخدمين من قاعدة بيانات PostgreSQL باستخدام Drizzle وترتيبها تنازلياً حسب تاريخ الإنشاء
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    // تنسيق البيانات لضمان توافق الـ id (إذا كان رقمياً يتم تحويله لنص ليتطابق مع واجهة الـ Frontend)
    const formattedUsers = allUsers.map((user) => ({
      ...user,
      id: String(user.id),
    }));

    return NextResponse.json({ success: true, count: formattedUsers.length, data: formattedUsers });
  } catch (error) {
    console.error("Error fetching corporate user roster:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch corporate user roster" }, { status: 500 });
  }
}