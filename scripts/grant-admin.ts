// This script is used to grant SUPER_ADMIN role to a specific user in Firebase Authentication.
// This script is used to grant SUPER_ADMIN role to a specific user in the Drizzle ORM 'users' table.

import dotenv from "dotenv";
import { db } from "../lib/db"; // عميل Drizzle ORM الخاص بك
import { users } from "../lib/schema"; // مخطط جدول المستخدمين
import { eq } from "drizzle-orm";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function grantAdminRole(userId: string) {
  if (!userId) {
    console.error("Error: User ID is required. Usage: npm run grant-admin <user-id>");
    process.exit(1);
  }

  try {
    // Find the user by ID
    const userToUpdate = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (userToUpdate.length === 0) {
      console.error(`❌ Error: User with ID ${userId} not found.`);
      process.exit(1);
    }

    // Update the user's role to SUPER_ADMIN
    // Cast to any to avoid strict type issues if 'role' is not defined on the generated type
    await db.update(users)
      .set({ role: 'SUPER_ADMIN' } as any)
      .where(eq(users.id, userId));

    console.log(`✅ Successfully granted SUPER_ADMIN role to user: ${userToUpdate[0].email || userToUpdate[0].id}`);
    console.log("Note: User will need to log out and log back in for changes to take effect.");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error(`❌ Error granting SUPER_ADMIN role to user ${userId}:`, error);
    process.exit(1); // Exit with failure
  }
}
// Get user ID from command line arguments
const userId = process.argv[2];
grantAdminRole(userId);
