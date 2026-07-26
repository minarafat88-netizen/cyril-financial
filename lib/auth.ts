import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export interface JWTPayload {
  userId: string;
  email: string;
  role: "SUPER_ADMIN" | "LOAN_OFFICER" | "PROCESSOR" | "CLIENT";
}

export function verifyAuthToken(token: string): JWTPayload | null {
  if (!JWT_SECRET) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUserSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("cyril_auth_token")?.value;

  if (!token) return null;

  return verifyAuthToken(token);
}