import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoansClient from "./client-page";

export default async function AdminLoansPage() {
  // 1. SECURITY GUARD: Ensure only SUPER_ADMIN can view this page
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // 2. DATA FETCHING: Get all loan programs, ordered by sortOrder or createdAt
  const dbLoans = await db
    .select()
    .from(loanPrograms)
    .orderBy(desc(loanPrograms.createdAt));

  // 3. RENDER UI: Pass the real database records to the Client Component
  return <LoansClient initialData={dbLoans} />;
}