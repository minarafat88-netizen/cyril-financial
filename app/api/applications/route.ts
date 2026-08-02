export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getCurrentUserSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { applications } from "@/lib/schema";
import { desc } from "drizzle-orm";

const ALLOWED_ROLES = ["SUPER_ADMIN", "LOAN_OFFICER"];

export async function GET() {
  try {
    const session = await getCurrentUserSession();
    // Cast the user object to include the 'role' property to satisfy TypeScript
    const user = session?.user as { role?: string | null };

    if (!user?.role || !ALLOWED_ROLES.includes(user.role)) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const allApplications = await db
      .select()
      .from(applications)
      .orderBy(desc(applications.createdAt));

    return NextResponse.json({ success: true, count: allApplications.length, data: allApplications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}