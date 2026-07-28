import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

    // حفظ البيانات في مجموعة 'leads' في Firestore
    const leadRef = await addDoc(collection(db, "leads"), {
      firstName,
      lastName,
      email,
      phone,
      interest: interest || "Not specified",
      message: message || "",
      status: "New", // الحالة الأولية للـ lead
      createdAt: serverTimestamp(),
    });

    console.log("New Lead captured and saved with ID: ", leadRef.id);
    return NextResponse.json(
      { success: true, message: "Thank you! Your request has been received. An advisor will contact you shortly.", leadId: leadRef.id },
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