export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads as leadsTable } from "@/lib/schema";
import { desc, InferInsertModel } from "drizzle-orm";
import { getCurrentUserSession } from "@/lib/auth";

// Define a type for inserting a new lead to ensure type safety
type InsertLead = InferInsertModel<typeof leadsTable>;

/**
 * GET /api/leads
 * Fetches all leads, intended for admin use.
 */
export async function GET() {
  try {
    // Use the centralized session helper for authentication
    const session = await getCurrentUserSession();
    const user = session?.user as { role?: string | null };

    // Ensure only authorized roles can access this endpoint
    if (user?.role !== "SUPER_ADMIN" && user?.role !== "LOAN_OFFICER") {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    const allLeads = await db
      .select()
      .from(leadsTable)
      .orderBy(desc(leadsTable.createdAt));

    return NextResponse.json({ success: true, data: allLeads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch leads" }, { status: 500 });
  }
}

/**
 * POST /api/leads
 * Creates a new lead from a contact form or similar source.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, source } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const newLead = await db
      .insert(leadsTable)
      .values({
        name,
        email,
        phone,
        message,
        source: source || 'Website Contact',
      } as InsertLead)
      .returning();

    return NextResponse.json({ success: true, data: newLead[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ success: false, error: "Failed to create lead" }, { status: 500 });
  }
}