import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, passwordResetTokens, type NewUser, type NewPasswordResetToken } from '@/lib/schema'; // استيراد مخططات الجداول
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Token and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { success: false, message: "New password must be at least 8 characters long." },
        { status: 400 }
      );
    }

  
    const resetToken = await db.select()
                               .from(passwordResetTokens)
                               .where(
                                 and(
                                   eq(passwordResetTokens.token, token),
                                   eq(passwordResetTokens.used, false),
                                   gt(passwordResetTokens.expiresAt, new Date()) // التحقق مما إذا كان الرمز لم ينتهِ بعد
                                 )
                               )
                               .limit(1);

    if (!resetToken || resetToken.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired password reset token." },
        { status: 400 }
      );
    }

    const userId = resetToken[0].userId;

    // 2. تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 هي عدد جولات التمليح (salt rounds)، اضبطها حسب الحاجة

    // 3. تحديث كلمة مرور المستخدم في قاعدة البيانات
    await db.update(users)
            .set({ password: hashedPassword } as Partial<NewUser>)
            .where(eq(users.id, userId));

    // 4. وضع علامة على الرمز كمستخدم لمنع إعادة الاستخدام
    await db.update(passwordResetTokens)
            .set({ used: true } as Partial<NewPasswordResetToken>)
            .where(eq(passwordResetTokens.id, resetToken[0].id));

    return NextResponse.json({ success: true, message: "Password has been reset successfully." }, { status: 200 });

  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 });
  }
}
