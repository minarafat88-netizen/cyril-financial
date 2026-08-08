import NextAuth from "next-auth"; 
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

/**
 * IMPORTANT: Make sure to 'export' this constant.
 * This object contains all your NextAuth.js configurations.
 */
export const authOptions = {
  // Use DrizzleAdapter to connect NextAuth with your database
  adapter: DrizzleAdapter(db) as any, 
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          typeof credentials.email !== 'string' ||
          !credentials.password ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }

        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toLowerCase()))
          .limit(1);

        if (userResult.length === 0 || !userResult[0].password) {
          return null;
        }

        const user = userResult[0];
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          return null;
        }

        // Return user object, which will be used in callbacks
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role, // Make sure 'role' is included
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // This callback adds the user ID and role to the session object
    session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    // This callback adds the user ID and role to the JWT
    jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login", // Your custom login page
  },
};

const handler = NextAuth(authOptions as any);

export const GET = handler as any;
export const POST = handler as any;