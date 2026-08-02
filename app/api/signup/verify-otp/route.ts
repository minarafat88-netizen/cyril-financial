import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, otps } from '@/lib/schema';
import { eq, and, gte } from 'drizzle-orm';
import type { InferInsertModel } from 'drizzle-orm';

type InsertUser = InferInsertModel<typeof users>;
export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required." }, { status: 400 });
    }

    // Find the OTP in the database that is not expired
    const otpRecord = await db.select().from(otps).where(
      and(
        eq(otps.email, email),
        eq(otps.code, otp),
        gte(otps.expiresAt, new Date())
      )
    ).limit(1);

    if (otpRecord.length === 0 || !otpRecord[0].pendingUserData) {
      return NextResponse.json({ error: "Invalid or expired verification code." }, { status: 400 });
    }

    const { name, phone, hashedPassword } = otpRecord[0].pendingUserData;

    // Use a transaction to ensure both user creation and OTP deletion succeed or fail together
    await db.transaction(async (tx) => {
      // الخطوة 1: إنشاء المستخدم الجديد في جدول users
      await tx.insert(users).values({ // as InsertUser
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
        role: 'user',
      } as InsertUser);

      // الخطوة 2: حذف رمز التحقق المستخدم من جدول otps
      await tx.delete(otps).where(eq(otps.email, email));
    });

    return NextResponse.json({ success: true, message: "Account created successfully." });

  } catch (error: any) {
    console.error("Verify OTP Error:", error);

    // التعامل مع أخطاء قيد التفرد في قاعدة البيانات
    // (الرمز 23505 خاص بـ PostgreSQL)
    if (error.code === '23505') {
      if (error.constraint_name.includes('email')) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
      }
      if (error.constraint_name.includes('phone')) {
        return NextResponse.json({ error: "An account with this phone number already exists." }, { status: 409 });
      }
    }

    return NextResponse.json({ error: "An internal server error occurred." }, { status: 500 });
  }
}