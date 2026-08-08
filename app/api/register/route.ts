import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, type NewUser } from '@/lib/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';

/**
 * API route for registering a new user.
 * Handles POST requests with user details (name, email, phone, password).
 * Validates input, checks for existing users, hashes the password,
 * and creates a new user record in the database.
 * Assigns 'SUPER_ADMIN' role to a specific email address.
 */
export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    // Validate that all required fields are present
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { success: false, message: "All fields (name, email, phone, password) are required." },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters long." },
        { status: 400 }
      );
    }

    // Check if a user with the same email or phone already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email.toLowerCase()), eq(users.phone, phone)))
      .limit(1);

    if (existingUser.length > 0) {
      const message =
        existingUser[0].email === email.toLowerCase()
          ? 'User with this email already exists.'
          : 'User with this phone number already exists.';
      return NextResponse.json(
        { success: false, message },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine user role - 'SUPER_ADMIN' is granted here
    const userRole = email.toLowerCase() === 'minarafat88@gmail.com' ? 'SUPER_ADMIN' : 'user';

    // Create a new user
    const newUser = {
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role: userRole,
    };

    const insertedUsers = await db.insert(users).values(newUser).returning();

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: insertedUsers[0].id,
        name: insertedUsers[0].name,
        email: insertedUsers[0].email,
        role: insertedUsers[0].role,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Registration API Error:", error);
    return NextResponse.json({ success: false, message: "An internal server error occurred." }, { status: 500 });
  }
}