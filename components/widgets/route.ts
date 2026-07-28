export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { verifyAuthToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    // إضافة await هنا لأن cookies أصبحت دالة غير متزامنة (Async) في Next.js الحديث
    const cookieStore = await cookies();
    const token = cookieStore.get("cyril_auth_token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const session = verifyAuthToken(token);
    if (!session || (session.role !== "SUPER_ADMIN" && session.role !== "LOAN_OFFICER")) {
      return NextResponse.json({ success: false, error: "Insufficient privileges" }, { status: 403 });
    }

    const leadsQuery = query(collection(db, "leads"), orderBy("createdAt", "desc"), limit(3));
    const applicationsQuery = query(collection(db, "applications"), orderBy("createdAt", "desc"), limit(3));
    
    const [leadsSnapshot, applicationsSnapshot] = await Promise.all([
      getDocs(leadsQuery),
      getDocs(applicationsQuery),
    ]);

    const activities: any = [];

    leadsSnapshot.forEach(doc => {
      const data = doc.data();
      activities.push({
        id: `lead-${doc.id}`,
        title: "Lead Captured",
        desc: `${data.firstName} ${data.lastName || ''} inquired about ${data.interest}`,
        time: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        icon: "💬",
      });
    });

    applicationsSnapshot.forEach(doc => {
      const data = doc.data();
      activities.push({
        id: `app-${doc.id}`,
        title: "New Application Submitted",
        desc: `Loan Type: ${data.loanType || 'N/A'} by ${data.borrower?.firstName || ''} ${data.borrower?.lastName || ''}`,
        time: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
        icon: "🪙",
      });
    });

    // فرز جميع الأنشطة حسب التاريخ وتحديد أحدث 5
    const sortedActivities = activities
      .sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5);

    return NextResponse.json({ success: true, data: sortedActivities });

  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch recent activity" }, { status: 500 });
  }
}