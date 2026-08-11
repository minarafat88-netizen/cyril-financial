import { db } from "@/lib/db";
import { applications } from "@/lib/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ApplicationsClient from "./client-page";

export default async function AdminApplicationsPage() {
  // 1. حماية الصفحة (التأكد من أن المستخدم مدير)
  const session = await auth();
  if (!session || session.user?.role !== "SUPER_ADMIN") {
    redirect("/portal");
  }

  // 2. جلب البيانات الحقيقية من جدول applications وترتيبها من الأحدث للأقدم
  const dbApplications = await db
    .select()
    .from(applications)
    .orderBy(desc(applications.createdAt));

  // 3. تمرير البيانات لواجهة المستخدم
  return <ApplicationsClient initialData={dbApplications} />;
}