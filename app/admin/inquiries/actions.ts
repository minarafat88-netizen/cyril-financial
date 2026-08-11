"use server";

import { db } from "@/lib/db";
import { inquiries } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ACTION: Update inquiry status (e.g., Pending -> Resolved)
export async function updateInquiryStatus(id: number, newStatus: string) {
  try {
    await db
      .update(inquiries)
      .set({ status: newStatus } as any)
      .where(eq(inquiries.id, id));

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to update inquiry status", error);
    return { success: false, error: "Failed to update status" };
  }
}

// ACTION: Delete an inquiry
export async function deleteInquiry(id: number) {
  try {
    await db.delete(inquiries).where(eq(inquiries.id, id));
    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to delete inquiry", error);
    return { success: false, error: "Failed to delete inquiry" };
  }
}