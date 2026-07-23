import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export async function POST(request: Request) {
  try {
    if (!JWT_SECRET) {
      return NextResponse.json({ success: false, error: "Authentication secret is not configured" }, { status: 500 });
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 });
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    // جلب بيانات أول مستخدم مطابق للإيميل
    const userDoc = querySnapshot.docs[0];
    const user = userDoc.data();
    const userId = userDoc.id;

    // التأكد من وجود حقل الباسورد المشفر
    if (!user.passwordHash) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: userId, email: user.email, role: user.role || "USER" },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    const response = NextResponse.json({
      success: true,
      user: { 
        id: userId, 
        email: user.email, 
        firstName: user.firstName || "", 
        lastName: user.lastName || "", 
        role: user.role || "USER" 
      }
    });

    response.cookies.set({
      name: "cynl_auth_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 28800, // 8 hours
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, error: "Internal server authentication error" }, { status: 500 });
  }
}