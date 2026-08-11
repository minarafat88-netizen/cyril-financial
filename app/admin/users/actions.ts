"use server";

import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { hash } from "bcryptjs";

export async function createUser(data: {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  role: "SUPER_ADMIN" | "LOAN_OFFICER" | "PROCESSOR" | "CLIENT";
}) {
  try {
    // تشفير كلمة المرور إذا وجدت
    const hashedPassword = data.password ? await hash(data.password, 10) : null;

    await db.insert(users).values({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      phone: data.phone || null,
      role: data.role,
    } as any);

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "Failed to create user. Email might already exist." };
  }
}

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