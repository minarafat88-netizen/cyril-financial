'use server';

import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
type LoanInsert = typeof loanPrograms.$inferInsert;

export type LoanProgramFormData = {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  defaultInterestRate: string;
  icon: string;
  imageUrl: string;
  benefits: string[];
};

function toLoanInsert(data: LoanProgramFormData): LoanInsert {
  const defaultInterestRate = Number.parseFloat(data.defaultInterestRate);

  return {
    name: data.name.trim(),
    slug: data.slug.trim(),
    subtitle: data.subtitle.trim() || null,
    description: data.description.trim() || null,
    defaultInterestRate: Number.isFinite(defaultInterestRate) ? defaultInterestRate : null,
    icon: data.icon.trim() || null,
    benefits: data.benefits.filter((benefit) => benefit.trim() !== ""),
    imageUrl: data.imageUrl.trim() || null,
  };
}

// ACTION: Delete a loan program from the database
export async function deleteLoanProgram(id: number) {
  try {
    await db.delete(loanPrograms).where(eq(loanPrograms.id, id));
    revalidatePath("/admin/loans");
    revalidatePath("/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to delete loan program", error);
    return { success: false, error: "Failed to delete loan program" };
  }
}

// ACTION: Toggle loan active/hidden status
export async function toggleLoanStatus(id: number, currentStatus: boolean) {
  try {
    await db.update(loanPrograms)
      .set({ isActive: !currentStatus })
      .where(eq(loanPrograms.id, id));

    revalidatePath("/admin/loans");
    revalidatePath("/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to toggle loan status", error);
    return { success: false, error: "Failed to toggle loan status" };
  }
}

// ACTION: Create a new loan program
export async function createLoanProgram(data: LoanProgramFormData) {
  try {
    const newProgram = toLoanInsert(data);

    await db.insert(loanPrograms).values(newProgram);

    revalidatePath("/admin/loans");
    revalidatePath("/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to create loan program", error);
    return { success: false, error: "Failed to create loan program" };
  }
}

// ACTION: Update an existing loan program
export async function updateLoanProgram(id: number, data: LoanProgramFormData) {
  try {
    const updatedProgram: Partial<LoanInsert> = toLoanInsert(data);

    await db.update(loanPrograms)
      .set(updatedProgram)
      .where(eq(loanPrograms.id, id));

    revalidatePath("/admin/loans");
    revalidatePath("/loans");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to update loan program", error);
    return { success: false, error: "Failed to update loan program" };
  }
}