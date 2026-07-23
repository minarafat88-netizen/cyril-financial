import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      loanPurpose,
      propertyType,
      purchasePrice,
      downPayment,
      propertyZip,
    } = body;

    if (!firstName || !lastName || !email || !phone || !purchasePrice) {
      return NextResponse.json(
        { success: false, error: "Missing required qualification fields" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "leads"), {
      firstName,
      lastName,
      email,
      phone,
      loanPurpose: loanPurpose || "Purchase",
      propertyType: propertyType || "Single Family",
      purchasePrice: Number(purchasePrice),
      downPayment: Number(downPayment || 0),
      propertyZip: propertyZip || "90067",
      status: "NEW",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Lead successfully captured and routed to CRM",
      leadId: docRef.id,
    });
  } catch (error: any) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error while processing lead" },
      { status: 500 }
    );
  }
}