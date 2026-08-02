import { NextResponse } from 'next/server';
import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Use the signIn function from next-auth with the credentials provider
    await signIn('credentials', { email, password, redirect: false });

    return NextResponse.json({ success: true, message: "Successfully logged in." }, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      // Handle specific authentication errors from next-auth
      return NextResponse.json(
        { success: false, message: "Invalid login credentials." },
        { status: 401 }
      );
    }

    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}