import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET() {
  try {
    // جلب أسعار الفائدة من فايربيز مرتبة حسب تاريخ التحديث تنازلياً
    const q = query(collection(db, "mortgageRates"), orderBy("updatedAt", "desc"));
    const querySnapshot = await getDocs(q);

    const rates = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate().toISOString() : data.updatedAt || new Date().toISOString(),
      };
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: rates,
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error: any) {
    console.error("Error fetching mortgage rates:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch live mortgage rates" },
      { status: 500 }
    );
  }
}