// This script is used to revoke the SUPER_ADMIN role from a specific user in Firebase Authentication.
// This script is used to revoke the SUPER_ADMIN role from a specific user in the Drizzle ORM 'users' table.

import dotenv from "dotenv";
// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

import { db } from "../lib/db"; // عميل Drizzle ORM الخاص بك
import { users } from "../lib/schema"; // مخطط جدول المستخدمين
import { eq } from "drizzle-orm";

async function revokeAdminRole(userId: string) {
  if (!userId) {
    console.error("Error: User ID is required. Usage: npm run revoke-admin <user-id>");
    process.exit(1);
  }

  try {
    // Find the user by ID
    const userToUpdate = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (userToUpdate.length === 0) {
      console.error(`❌ Error: User with ID ${userId} not found.`);
      process.exit(1);
    }

    // Update the user's role to 'user' (or any default non-admin role)
    await db.update(users)
      .set({ role: 'user' } as any) // Set to a default non-admin role
      .where(eq(users.id, userId));

    console.log(`✅ Successfully revoked admin role from user: ${userToUpdate[0].email || userToUpdate[0].id}`);
    console.log("Note: User will need to log out and log back in for changes to take effect.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error revoking admin role from user ${userId}:`, error);
    process.exit(1);
  }
}
// Get user ID from command line arguments
const userId = process.argv[2];
revokeAdminRole(userId);