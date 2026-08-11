import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditLoanForm from "./edit-form";

// لاحظ هنا: params أصبحت Promise
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 1. يجب عمل await لـ params أولاً
  const { id } = await params;
  
  // 2. تحويل الـ id إلى رقم
  const loanId = parseInt(id);

  // 3. التحقق من أن الـ id رقم صالح لتجنب خطأ NaN
  if (isNaN(loanId)) {
    notFound();
  }

  // 4. الاستعلام عن القرض
  const [loan] = await db.select().from(loanPrograms).where(eq(loanPrograms.id, loanId));

  if (!loan) {
    notFound();
  }

  return <EditLoanForm initialData={loan} />;
}