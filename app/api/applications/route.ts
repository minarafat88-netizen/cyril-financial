import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const applications = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // تحويل تاريخ فايربيز لـ String عشان ما يحصلش مشاكل في الرندر
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, applications }, { status: 200 });

  } catch (error: any) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch applications" }, 
      { status: 500 }
    );
  }
}