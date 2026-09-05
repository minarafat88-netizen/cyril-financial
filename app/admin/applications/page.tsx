import { db } from "@/lib/db";
import { applications } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApplicationsClient from "./client-page";

export default async function AdminApplicationsPage() {
  // 1. Secure the page (ensure the user is an admin)
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // 2. Fetch real data from the applications table and order it from newest to oldest
  const dbApplications = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));

  // 3. Pass the data to the client component
  return <ApplicationsClient initialData={dbApplications} />;
}