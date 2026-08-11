import { db } from "@/lib/db";
import { inquiries } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import InquiriesClient from "./client-page";

export default async function AdminInquiriesPage() {
  // SECURITY GUARD: Ensure only SUPER_ADMIN can view inquiries
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // Fetch all inquiries from the database, newest first
  const dbInquiries = await db
    .select()
    .from(inquiries)
    .orderBy(desc(inquiries.createdAt));

  return <InquiriesClient initialData={dbInquiries} />;
}