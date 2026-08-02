import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { InferInsertModel } from 'drizzle-orm';

type InsertUser = InferInsertModel<typeof users>;

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // 1. التحقق من أن جميع الحقول المطلوبة موجودة
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    // 2. التحقق مما إذا كان المستخدم موجودًا بالفعل
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, message: "An account with this email already exists." },
        { status: 409 } // 409 Conflict
      );
    }

    // 3. تشفير كلمة المرور (Hashing)
    const hashedPassword = await bcrypt.hash(password, 10); // 10 هو عدد جولات التشفير (salt rounds)

    // 4. إدراج المستخدم الجديد في قاعدة البيانات
    await db.insert(users).values({
      name: name, // Ensure name is included
      email: email,
      password: hashedPassword,
    } as InsertUser);

    return NextResponse.json({ success: true, message: "User registered successfully." }, { status: 201 });

  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}