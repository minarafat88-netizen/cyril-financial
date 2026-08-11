"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ACTION: Update user role clearance
export async function updateUserRole(userId: string, newRole: any) {
  try {
    await db
      .update(users)
      .set({ role: newRole } as any)
      .where(eq(users.id, userId));

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to update user role", error);
    return { success: false, error: "Failed to update user role" };
  }
}

// ACTION: Delete a user from the database
export async function deleteUser(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));
    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Database Error: Failed to delete user", error);
    return { success: false, error: "Failed to delete user" };
  }
}