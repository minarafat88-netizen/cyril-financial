import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { db } from '@/lib/db';
import { users } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import type { InferInsertModel } from 'drizzle-orm';

type InsertUser = InferInsertModel<typeof users>;

export const authConfig = {
  pages: {
    signIn: '/login', // Redirect users to /login if they are not authenticated
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // 1. Find the user in the database
        const userResult = await db.select().from(users).where(eq(users.email, String(credentials.email))).limit(1);
        const user = userResult[0];

        if (!user || !user.password) {
          // User not found or doesn't have a password (e.g., signed up with Google)
          return null;
        }

        // 2. Compare the provided password with the hashed password in the database
        const passwordsMatch = await bcrypt.compare(String(credentials.password), user.password);

        if (passwordsMatch) {
          const { password, ...userWithoutPassword } = user;
          return { ...userWithoutPassword, id: String(user.id), name: user.name || user.email }; // Ensure id is string and name is present
        }

        return null; // Passwords do not match
      },
    }),
Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // This callback is triggered whenever a session is checked.
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub; // Add user ID to the session
      }
      return session;
    },
    // This callback is triggered on sign-in.
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && user.email) {
        // On Google sign-in, check if the user exists in our database.
        // If not, create a new user record.
        // Only insert fields that exist on the users table (email is required). Name is optional.
        await db
          .insert(users)
          .values({ email: user.email, name: user.name || user.email } as InsertUser)
          .onConflictDoNothing({ target: users.email });
      }
      return true; // Return true to continue the sign-in process
    },
  },
} satisfies NextAuthConfig;