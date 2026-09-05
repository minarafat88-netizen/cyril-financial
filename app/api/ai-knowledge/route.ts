export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { aiKnowledge } from "@/lib/schema";

export async function GET() {
  try {
    // Fetch the knowledge base from Vercel Postgres using Drizzle
    const knowledgeData = await db.select().from(aiKnowledge);

    return NextResponse.json({ success: true, data: knowledgeData });
  } catch (error) {
    console.error("Error fetching AI knowledge base:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch knowledge base" },
      { status: 500 }
    );
  }
}