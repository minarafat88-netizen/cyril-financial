import { type DefaultSession, type DefaultUser } from "next-auth";

/**
 * Augment the built-in `User` type from `next-auth`
 * to add the `role` property.
 */
declare module "next-auth" {
  interface User extends DefaultUser {
    role?: string | null;
  }

  interface Session {
    user?: {
      id: string;
      role?: string | null;
    } & DefaultSession["user"];
  }
}
