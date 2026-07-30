export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET() {
  try {
    // You can fetch data from the database or return default AI information
    let knowledgeData = [];
    
    try {
      const snapshot = await db.collection("ai_knowledge").get();
      knowledgeData = snapshot.docs.map(doc => ({
        id: doc.id, // eslint-disable-line
        ...doc.data()
      }));
    } catch (dbError) {
      // بيانات افتراضية في حال لم تكن مجموعة قاعدة البيانات منشأة بعد
      console.warn("AI Knowledge: Could not fetch from Firestore, falling back to default data.", dbError);
      knowledgeData = [
        {
          question: "What loan programs do you offer?",
          answer: "We offer FHA, VA, Conventional, and ARM loan programs tailored to your financial needs."
        },
        {
          question: "How can I contact support?",
          answer: "You can reach out to our team through the contact form or call our support line directly."
        }
      ];
    }

    return NextResponse.json({ success: true, data: knowledgeData });
  } catch (error) {
    console.error("Error fetching AI knowledge base:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch knowledge base" },
      { status: 500 }
    );
  }
}