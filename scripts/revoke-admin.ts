// This script is used to revoke the SUPER_ADMIN role from a specific user in Firebase Authentication.
// This script is used to revoke the SUPER_ADMIN role from a specific user in Firebase Authentication.

import dotenv from "dotenv";
import admin from 'firebase-admin'; // Import Firebase Admin SDK

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// تعريف واجهة لبيانات حساب الخدمة لضمان أمان الأنواع
interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// Fetch service account credentials from environment variables with secure private key processing.
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.trim().replace(/^["'](.*)["']$/, '$1').replace(/\\n/g, '\n')
    : '',
};

// Initialize Firebase Admin SDK securely, preventing duplication errors.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

async function revokeAdminRole(uid: string) {
  if (!uid) {
    console.error("Error: User UID is required. Usage: npm run revoke-admin <user-uid>");
    process.exit(1);
  }

  try {
    // Remove custom claims from the user by setting them to an empty object
    await admin.auth().setCustomUserClaims(uid, {});
    const user = await admin.auth().getUser(uid);
    console.log(`✅ Successfully revoked admin role from user: ${user.email || user.uid}`);
    await admin.auth().revokeRefreshTokens(uid); // Force user to re-authenticate to update claims
    console.log("User's refresh tokens revoked. User will need to re-authenticate for changes to take effect.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error revoking admin role from user ${uid}:`, error);
    process.exit(1);
  }
}
// Get user UID from command line arguments
const userUid = process.argv[2];
revokeAdminRole(userUid);