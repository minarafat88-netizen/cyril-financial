import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import UsersClient from "./client-page";

export default async function AdminUsersPage() {
  // SECURITY GUARD: Ensure only SUPER_ADMIN can manage users
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // Fetch all users from the database
  const dbUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt));

  return <UsersClient initialData={dbUsers} />;
}