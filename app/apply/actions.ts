"use server";

import { db } from "@/lib/db";
import { leads } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  loanType: string;
  message?: string;
  source?: string;
}) {
  try {
    await db.insert(leads).values({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      loanType: data.loanType,
      message: data.message || null,
      source: data.source || "Loan Application Funnel",
      status: "NEW",
    } as any);

    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to save lead", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}