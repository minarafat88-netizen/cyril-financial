export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase"; // تأكد من مسار ملف الـ firebase الخاص بك
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("cyril_auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const session = verifyAuthToken(token);
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "LOAN_OFFICER")) {
      return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
    }

    // جلب المستندات من مجموعة applications في Firestore وترتيبها تنازلياً حسب تاريخ الإنشاء
    const applicationsRef = collection(db, "applications");
    const q = query(applicationsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const applications = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, count: applications.length, data: applications });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch loan applications" }, { status: 500 });
  }
}