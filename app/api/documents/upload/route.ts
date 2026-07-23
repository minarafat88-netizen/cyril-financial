import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(request: Request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ success: false, error: "Authentication secret is not configured" }, { status: 500 });
    }

    // التحقق من الـ Cookie الخاصة بالتوكن للتأكد من تسجيل الدخول
    const cookieHeader = request.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/cynl_auth_token=([^;]+)/);
    
    if (!tokenMatch) {
      return NextResponse.json({ success: false, error: "Unauthorized document upload" }, { status: 401 });
    }

    const token = tokenMatch[1];
    let session: any;
    try {
      session = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ success: false, error: "Invalid or expired session" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const documentType = formData.get("documentType") as string || "BANK_STATEMENT";
    const applicationId = formData.get("applicationId") as string;

    if (!file || !applicationId) {
      return NextResponse.json({ success: false, error: "File and application ID are required" }, { status: 400 });
    }

    // رابط التخزين الوهمي أو المربوط بنظام الـ Storage الخاص بك
    const secureStorageUrl = `https://storage.cynlfinancial.com/vault/${session.userId}/${file.name}`;

    const docRef = await addDoc(collection(db, "documents"), {
      applicationId,
      userId: session.userId,
      fileName: file.name,
      fileUrl: secureStorageUrl,
      documentType,
      fileSize: file.size,
      status: "UPLOADED",
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      message: "Encrypted document stored successfully in secure vault",
      documentId: docRef.id,
      url: secureStorageUrl,
    });
  } catch (error: any) {
    console.error("Document upload error:", error);
    return NextResponse.json({ success: false, error: "Internal server error during document upload" }, { status: 500 });
  }
}