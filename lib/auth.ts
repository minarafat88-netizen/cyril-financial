import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

/**
 * This file exports the main Auth.js functions.
 * - `handlers` contains GET and POST API route handlers.
 * - `auth` is for getting the session on the server-side.
 * - `signIn` and `signOut` are for client-side authentication actions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

/**
 * A helper function to get the current user from the server-side session.
 * Returns the user object or null if not authenticated.
 */
export async function getCurrentUser() {
  try {
    const session = await auth();
    return session?.user ?? null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

/**
 * A helper function to get the full current session on the server-side.
 * Returns the session object or null if not authenticated.
 */
export async function getCurrentUserSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
}