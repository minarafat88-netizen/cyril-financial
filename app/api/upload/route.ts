import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// adminStorage is expected to be attached to the global object in certain runtimes.
const adminStorage: any = (globalThis as any).adminStorage;

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]);

export async function POST(request: Request) {
  try {
    // 1. استخدام getToken بدلاً من getServerSession المحذوفة
    const token = await getToken({
      req: request as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // 2. جلب الصلاحية مباشرة من التوكن
    const role = token?.role;

    if (!token || (role !== "SUPER_ADMIN" && role !== "LOAN_OFFICER")) {
      return NextResponse.json({ success: false, error: "Unauthorized upload access" }, { status: 403 });
    }

    if (!adminStorage) {
      return NextResponse.json(
        { success: false, error: "Storage is not configured for this environment" },
        { status: 503 }
      );
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file uploaded" }, { status: 400 });
    }

    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ success: false, error: "File size must be between 1 byte and 10MB" }, { status: 413 });
    }

    if (!ALLOWED_CONTENT_TYPES.has(file.type)) {
      return NextResponse.json({ success: false, error: "Unsupported file type" }, { status: 415 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `documents/${Date.now()}_${safeName}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = adminStorage.bucket();
    const fileRef = bucket.file(fileName);

    await fileRef.save(buffer, {
      metadata: {
        contentType: file.type,
        cacheControl: "private, max-age=3600",
      },
    });

    const [signedUrl] = await fileRef.getSignedUrl({
      action: "read",
      expires: Date.now() + 60 * 60 * 1000,
    });

    return NextResponse.json({
      success: true,
      url: signedUrl,
      fileName: safeName,
    });
  } catch (error) {
    console.error("Admin upload error:", error);
    return NextResponse.json({ success: false, error: "Upload failed" }, { status: 500 });
  }
}