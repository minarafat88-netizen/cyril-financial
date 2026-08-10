import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { users, type User } from "@/lib/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const authOptions = {
  // 1. Add the Adapter to connect NextAuth with your Drizzle database.
  adapter: DrizzleAdapter(db) as any,
  
  providers: [
    // 2. Add the Google Provider.
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
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

        const user: User = userResult[0];
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  // 3. Add an events hook to handle user creation.
  events: {
    async createUser({ user }: any) {
      if (user.email && user.email.toLowerCase() === 'minarafat88@gmail.com') {
        await db
          .update(users)
          .set({ role: 'SUPER_ADMIN' } as any)
          .where(eq(users.id, user.id));
      }
    }
  },

  callbacks: {
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.id, user.id))
          .limit(1);

        if (dbUser) {
          token.role = dbUser.role;
        }
      }
      return token;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// استخراج كائن الـ handlers بالطريقة الصحيحة للإصدار الخامس
const { handlers } = NextAuth(authOptions as any);

// تصدير معالجات GET و POST من داخل الكائن
export const GET = handlers.GET;
export const POST = handlers.POST;