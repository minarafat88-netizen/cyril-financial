import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';
import { otps, users } from '@/lib/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const resend = new Resend(process.env.RESEND_API_KEY);

const OTP_EXPIRATION_MINUTES = 5;

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, password, phone } = await req.json();

    if (!email || !password || !firstName || !lastName || !phone) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // التحقق مما إذا كان البريد الإلكتروني أو رقم الهاتف موجودًا بالفعل في استعلام واحد
    const existingUser = await db.select({
        email: users.email,
        phone: users.phone
      }).from(users).where(
        or(eq(users.email, email), eq(users.phone, phone))
      ).limit(1);
      
    if (existingUser.length > 0) {
      if (existingUser[0].email === email) {
        return NextResponse.json({ error: 'An account with this email already exists. Please sign in.' }, { status: 409 });
      }
      if (existingUser[0].phone === phone) {
        return NextResponse.json({ error: 'An account with this phone number already exists.' }, { status: 409 });
      }
    }

    // توليد كود OTP مكون من 6 أرقام
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + OTP_EXPIRATION_MINUTES * 60 * 1000);

    // تشفير كلمة المرور مؤقتاً لتخزينها لحين التحقق
    const hashedPassword = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;

    // حذف أي طلب سابق لنفس الإيميل إن وجد
    await db.delete(otps).where(eq(otps.email, email));

    // حفظ البيانات في جدول الـ OTP مؤقتاً
    await db.insert(otps).values({
      email: email,
      code: otpCode,
      expiresAt,
      pendingUserData: {
        name: fullName,
        phone: phone,
        hashedPassword: hashedPassword,
      },
    });

    // إرسال الإيميل عبر Resend
    await resend.emails.send({
      from: 'Cyril Financial <onboarding@resend.dev>', // أو نطاقك الخاص إذا قمت بربطه
      to: email,
      subject: 'Your Verification Code - Cyril Financial',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Hello ${firstName},</h2>
          <p>Thank you for signing up with Cyril Financial. Your verification code is:</p>
          <h1 style="color: #1e3a8a; letter-spacing: 5px;">${otpCode}</h1>
          <p>This code is valid for ${OTP_EXPIRATION_MINUTES} minutes.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'OTP sent to email successfully' });
  } catch (error: any) {
    console.error('Error sending email OTP:', error);
    return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
  }
}