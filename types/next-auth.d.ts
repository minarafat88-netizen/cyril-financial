import { type DefaultSession, type DefaultUser } from "next-auth";
import { type JWT } from "next-auth/jwt";
import { type UserRole } from "@/lib/schema";

/**
 * Augment the built-in `User` type from `next-auth`
 * to add the `role` property.
 */
declare module "next-auth" {
  interface User extends DefaultUser {
    // Use the specific role type from your schema for better type safety
    role?: UserRole;
  }

  interface Session {
    user?: {
      id: string;
      // Use the specific role type from your schema
      role?: UserRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    // Use the specific role type from your schema
    role?: UserRole;
  }
}
