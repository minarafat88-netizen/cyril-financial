import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // عميل Drizzle ORM الخاص بك
import { mortgageRates } from "@/lib/schema"; // مخطط جدول أسعار الرهن العقاري
import { desc } from "drizzle-orm"; // لترتيب النتائج تنازلياً


export async function GET() {
  try {
    // جلب أسعار الفائدة من PostgreSQL باستخدام Drizzle، مرتبة حسب تاريخ التحديث تنازلياً
    const rates = await db
      .select()
      .from(mortgageRates)
      .orderBy(desc(mortgageRates.updatedAt));

    // تنسيق البيانات، على سبيل المثال، تحويل كائنات التاريخ إلى سلاسل ISO
    const formattedRates = rates.map(rate => {
      return {
        ...rate,
        updatedAt: rate.updatedAt.toISOString(), // التأكد من أن updatedAt هو سلسلة ISO
      };
    });

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: formattedRates,
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