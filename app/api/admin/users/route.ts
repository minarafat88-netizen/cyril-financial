export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
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
    if (!session || session.role !== "SUPER_ADMIN") {
      return NextResponse.json({ success: false, error: "Super administrator privileges required" }, { status: 403 });
    }

    // جلب قائمة المستخدمين من مجموعة users في Firestore وترتيبها تنازلياً حسب تاريخ الإنشاء
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const users = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        nmlsId: data.nmlsId,
        phone: data.phone,
        createdAt: data.createdAt,
      };
    });

    return NextResponse.json({ success: true, count: users.length, data: users });
  } catch (error) {
    console.error("Error fetching corporate user roster:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch corporate user roster" }, { status: 500 });
  }
}