// This script is used to grant SUPER_ADMIN role to a specific user in Firebase Authentication.
// This script is used to grant SUPER_ADMIN role to a specific user in Firebase Authentication.

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

async function grantAdminRole(uid: string) {
  if (!uid) {
    console.error("Error: User UID is required. Usage: npm run grant-admin <user-uid>");
    process.exit(1);
  }

  try {
    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(uid, { role: 'SUPER_ADMIN' });
    const user = await admin.auth().getUser(uid);
    console.log(`✅ Successfully granted SUPER_ADMIN role to user: ${user.email || user.uid}`);
    console.log("Updated custom claims:", user.customClaims);
    await admin.auth().revokeRefreshTokens(uid); // Force user to re-authenticate for new claims to take effect
    console.log("User's refresh tokens revoked. User will need to re-authenticate for claims to take effect.");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error(`❌ Error granting SUPER_ADMIN role to user ${uid}:`, error);
    process.exit(1); // Exit with failure
  }
}
// Get user UID from command line arguments
const userUid = process.argv[2];
grantAdminRole(userUid);
