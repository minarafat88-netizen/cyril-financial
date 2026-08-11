"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ACTION: Updates the application status in the database
export async function updateApplicationStatus(id: number, newStatus: string) {
  try {
    await db
      .update(applications)
      .set({ 
        status: newStatus, 
        updatedAt: new Date() // Update the timestamp automatically
      } as any)
      .where(eq(applications.id, id));

    // Refresh the page data to reflect the changes immediately
    revalidatePath("/admin/applications");
    
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to update status", error);
    return { success: false, error: "Failed to update status" };
  }
}