export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications as applicationsTable } from "@/lib/schema";
import { cookies } from "next/headers";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("cyril_auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    // جلب البيانات من Vercel Postgres باستخدام Drizzle ORM
    const allApplications = await db
      .select()
      .from(applicationsTable)
      .orderBy(desc(applicationsTable.createdAt));

    return NextResponse.json({ success: true, count: allApplications.length, data: allApplications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch loan applications" }, { status: 500 });
  }
}