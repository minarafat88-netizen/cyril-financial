import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { getCurrentUserSession } from "@/lib/auth";

const ALLOWED_ROLES = ["SUPER_ADMIN", "LOAN_OFFICER"];

export async function GET() {
  const session = await getCurrentUserSession();

  if (!session || !ALLOWED_ROLES.includes(session.role)) {
    return NextResponse.json(
      { success: false, error: "Forbidden" },
      { status: 403 }
    );
  }
  
  if (!adminDb) {
    return NextResponse.json(
      { success: false, error: "Firebase Admin is not initialized." },
      { status: 500 }
    );
  }

  try {
    const applicationsRef = adminDb.collection("applications");
    const snapshot = await applicationsRef.orderBy("createdAt", "desc").get();

    const applications = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Convert Firestore timestamp to ISO string
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, applications }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching applications with Admin SDK:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" }, 
      { status: 500 }
    );
  }
}