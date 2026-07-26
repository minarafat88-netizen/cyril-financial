import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Firebase authentication is typically handled on the client side using signInWithEmailAndPassword.
    // If you need server-side validation or custom token creation, integrate Firebase Admin SDK here.
    
    // Simulating user authentication response structure for your frontend flow:
    if (email && password) {
      return NextResponse.json(
        { 
          success: true, 
          message: "Successfully logged in.",
          user: {
            id: "firebase-user-id-placeholder",
            email: email,
          }
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Invalid login credentials." },
      { status: 401 }
    );

  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}