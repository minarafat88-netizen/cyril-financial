import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

/**
 * This file exports the main Auth.js functions.
 * - `handlers` contains GET and POST API route handlers.
 * - `auth` is for getting the session on the server-side.
 * - `signIn` and `signOut` are for client-side authentication actions.
 */
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function verifyAuthToken(token?: string) {
  try {
    const session = await auth();
    if (!session || !session.user) return null;
    return session.user;
  } catch (error) {
    return null;
  }
}

export async function getCurrentUserSession() {
  try {
    const session = await auth();
    return session;
  } catch (error) {
    return null;
  }
}