import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, interest, message } = body;

    // التحقق من صحة البيانات الأساسية
    if (!firstName || !email) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: First Name and Email are mandatory." },
        { status: 400 }
      );
    }

    // هنا يتم إدراج كود الحفظ في قاعدة البيانات (Firebase)
    // كمثال توضيحي نقوم بطباعة البيانات في الخادم
    console.log("New Lead Received: ", { firstName, lastName, email, interest });

    return NextResponse.json(
      { success: true, message: "Lead captured successfully.", leadId: "LD-" + Date.now() },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}