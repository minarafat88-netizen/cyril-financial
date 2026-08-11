import { db } from "@/lib/db";
import { leads } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import LeadsClient from "./client-page";

export default async function AdminLeadsPage() {
  // SECURITY GUARD: Ensure only SUPER_ADMIN can view this page
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // Fetch all leads from the Neon database using Drizzle
  const dbLeads = await db
    .select()
    .from(leads)
    .orderBy(desc(leads.createdAt));

  return <LeadsClient initialData={dbLeads} />;
}