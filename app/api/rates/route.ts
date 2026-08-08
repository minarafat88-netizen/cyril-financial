import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Your Drizzle ORM client
import { mortgageRates } from "@/lib/schema"; // Mortgage rates table schema
import { desc } from "drizzle-orm"; // To sort results in descending order

/**
 * API route to fetch the latest mortgage rates.
 * Handles GET requests to retrieve all mortgage rates from the database,
 * ordered by the most recently updated.
 * It formats the data and adds caching headers for performance.
 */
export async function GET() {
  try {
    // Fetch interest rates from PostgreSQL using Drizzle, ordered by update date descending
    const rates = await db
      .select()
      .from(mortgageRates)
      .orderBy(desc(mortgageRates.updatedAt));

    // Format the data, for example, converting Date objects to ISO strings
    const formattedRates = rates.map(rate => {
      return {
        ...rate,
        updatedAt: rate.updatedAt.toISOString(), // Ensure updatedAt is an ISO string
      };
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: formattedRates,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: any) {
    console.error("Error fetching mortgage rates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live mortgage rates" },
      { status: 500 }
    );
  }
}