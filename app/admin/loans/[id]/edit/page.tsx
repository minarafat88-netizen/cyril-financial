import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditLoanForm from "@/app/admin/loans/[id]/edit/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const [loan] = await db.select().from(loanPrograms).where(eq(loanPrograms.id, parseInt(params.id)));
  
  if (!loan) notFound();

  return <EditLoanForm initialData={loan} /> as React.ReactNode;
}