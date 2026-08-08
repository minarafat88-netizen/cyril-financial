import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, passwordResetTokens, type NewUser, type NewPasswordResetToken } from '@/lib/schema'; // Import table schemas
import { eq, and, gt } from 'drizzle-orm';
import bcrypt from 'bcrypt';

/**
 * API route for resetting a user's password.
 * Handles POST requests containing a password reset token and a new password.
 * It validates the token, ensures it's not expired or used,
 * hashes the new password, and updates the user's record.
 * Note: This file is misplaced and should ideally be in `app/api/reset-password/route.ts`.
 */
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
                                   gt(passwordResetTokens.expiresAt, new Date()) // Check if the token has not expired yet
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

    // 2. Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // 10 is the number of salt rounds, adjust as needed

    // 3. Update the user's password in the database
    await db.update(users)
            .set({ password: hashedPassword } as Partial<NewUser>)
            .where(eq(users.id, userId));

    // 4. Mark the token as used to prevent reuse
    await db.update(passwordResetTokens)
            .set({ used: true } as Partial<NewPasswordResetToken>)
            .where(eq(passwordResetTokens.id, resetToken[0].id));

    return NextResponse.json({ success: true, message: "Password has been reset successfully." }, { status: 200 });

  } catch (error) {
    console.error("Reset Password API Error:", error);
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 });
  }
}