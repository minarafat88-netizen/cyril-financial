import { db } from "@/lib/db";
import { loanPrograms } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditLoanForm from "./edit-form";

// Note here: params is now a Promise
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 1. Must await params first
  const { id } = await params;
  
  // 2. Convert the id to a number
  const loanId = parseInt(id);

  // 3. Check if the id is a valid number to avoid NaN error
  if (isNaN(loanId)) {
    notFound();
  }

  // 4. Query for the loan
  const [loan] = await db.select().from(loanPrograms).where(eq(loanPrograms.id, loanId));

  if (!loan) {
    notFound();
  }

  return <EditLoanForm initialData={loan} />;
}