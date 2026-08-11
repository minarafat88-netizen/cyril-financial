'use server';

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
      rate: data.rate ? parseFloat(data.rate) : null,
      icon: data.icon,
      benefits: data.benefits, // JSONB array of strings
      imageUrl: data.imageUrl,
      sortOrder: data.sortOrder ? parseInt(data.sortOrder) : 0,
    } as any);

    revalidatePath("/admin/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to create loan program", error);
    return { success: false, error: "Failed to create loan program" };
  }
}

// ACTION: Update an existing loan program
export async function updateLoanProgram(id: number, data: any) {
  try {
    await db.update(loanPrograms)
      .set({
        name: data.name,
        slug: data.slug,
        subtitle: data.subtitle,
        description: data.description,
        loanType: data.loanType,
        rate: data.rate ? parseFloat(data.rate) : null,
        icon: data.icon,
        benefits: data.benefits,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder ? parseInt(data.sortOrder) : 0,
      } as any)
      .where(eq(loanPrograms.id, id));

    revalidatePath("/admin/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to update loan program", error);
    return { success: false, error: "Failed to update loan program" };
  }
}