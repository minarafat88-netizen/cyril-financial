import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getStorage, type Storage } from "firebase-admin/storage";

let adminStorage: Storage | null = null;

if (!getApps().length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
    : undefined;

  const hasValidPrivateKey =
    Boolean(privateKey) &&
    privateKey.includes("-----BEGIN PRIVATE KEY-----") &&
    !privateKey.includes("Your-Private-Key-Here") &&
    !privateKey.includes("your-private-key");

  if (projectId && clientEmail && hasValidPrivateKey) {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey!,
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "cyrilfinancial.appspot.com",
      });

      adminStorage = getStorage();
    } catch (error) {
      console.error("Firebase Admin initialization failed:", error);
    }
  } else {
    console.warn("Firebase Admin environment variables are not configured or use placeholder credentials.");
  }
}

export { adminStorage };