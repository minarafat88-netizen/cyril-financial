export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("cynl_auth_token")?.value;
    
    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized access" }, { status: 401 });
    }

    const session = verifyAuthToken(token);
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "LOAN_OFFICER")) {
      return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
    }

    // جلب العملاء المحتملين (leads) من Firestore وترتيبهم تنازلياً حسب تاريخ الإنشاء
    const leadsRef = collection(db, "leads");
    const q = query(leadsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const leads = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    console.error("Error fetching admin lead pipeline:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch admin lead pipeline" }, { status: 500 });
  }
}