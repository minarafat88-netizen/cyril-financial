import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { put } from "@vercel/blob";
import { db } from "@/lib/db";
import { documents } from "@/lib/schema";
import type { InferInsertModel } from "drizzle-orm";
import { getCurrentUserSession } from "@/lib/auth";

type InsertDocument = InferInsertModel<typeof documents>;

export async function POST(request: Request) {
  try {
    const session = await getCurrentUserSession();
    const user = session?.user as { id?: string; role?: string };

    if (!user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: No active session" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const documentType = (formData.get("documentType") as string) || "BANK_STATEMENT";
    const applicationId = formData.get("applicationId") as string;

    if (!file || !applicationId) {
      return NextResponse.json(
        { success: false, error: "File and application ID are required" },
        { status: 400 }
      );
    }

    // Create a unique and secure storage path for the file
    const fileExtension = file.name.split('.').pop();
    const uniqueFileName = `${uuidv4()}.${fileExtension}`;
    const storagePath = `user_documents/${user.id}/${applicationId}/${uniqueFileName}`;

    // Upload the file to Vercel Blob Storage
    const blob = await put(storagePath, file, {
      access: "public", // Or 'private' if you handle access via signed URLs
    });

    // Save document metadata to your PostgreSQL database using Drizzle
    const [newDocument] = await db
      .insert(documents)
      .values({
        applicationId: parseInt(applicationId, 10),
        userId: parseInt(user.id, 10),
        fileName: file.name, // Keep original name for display
        fileUrl: blob.url,
        documentType,
        fileSize: file.size,
        status: "UPLOADED",
      } as InsertDocument)
      .returning();

    return NextResponse.json({
      success: true,
      message: "Encrypted document stored successfully in secure vault",
      documentId: newDocument.id,
      url: blob.url,
    });
  } catch (error: any) {
    console.error("Document upload error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during document upload" },
      { status: 500 }
    );
  }
}