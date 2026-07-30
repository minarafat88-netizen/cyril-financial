import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getStorage, type Storage } from "firebase-admin/storage";

// Define the shape of the service account credentials for type safety.
interface ServiceAccount {
  projectId: string;
  clientEmail: string;
  privateKey: string;
}

// Retrieve service account credentials from environment variables with safe key processing.
const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.trim().replace(/^["'](.*)["']$/, '$1').replace(/\\n/g, '\n')
    : '',
};

// Initialize the Firebase Admin SDK securely, preventing duplication errors.
const app = !getApps().length
  ? initializeApp({
      credential: cert(serviceAccount),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || `${serviceAccount.projectId}.appspot.com`,
    })
  : getApp();

// Get the Firestore database and Storage instances and export them.
const db: Firestore = getFirestore(app);
const storage: Storage = getStorage(app);

export { db, storage };