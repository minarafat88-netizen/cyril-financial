"use server";

import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ACTION: Delete a loan program from the database
export async function deleteLoanProgram(id: number) {
  try {
    await db.delete(loanPrograms).where(eq(loanPrograms.id, id));
    revalidatePath("/admin/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to delete loan program", error);
    return { success: false, error: "Failed to delete loan program" };
  }
}

// ACTION: Create a new loan program
export async function createLoanProgram(data: any) {
  try {
    await db.insert(loanPrograms).values({
      name: data.name,
      slug: data.slug,
      subtitle: data.subtitle,
      description: data.description,
      loanType: data.loanType,
      defaultInterestRate: data.defaultInterestRate ? parseFloat(data.defaultInterestRate) : null,
      icon: data.icon,
      benefits: data.benefits, // JSONB array of strings
      imageUrl: data.imageUrl,
      sortOrder: data.sortOrder ? parseInt(data.sortOrder) : 0,
    } as any);

    // Refresh the loans list page
    revalidatePath("/admin/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to create loan program", error);
    return { success: false, error: "Failed to create loan program" };
  }
}