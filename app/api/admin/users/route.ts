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

    // Fetch the list of users from the PostgreSQL database using Drizzle and order them descending by creation date
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));

    // Format the data to ensure id compatibility (if it's a number, convert it to a string to match the Frontend interface)
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