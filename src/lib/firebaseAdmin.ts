import * as admin from "firebase-admin";
import { isLocalEnvironment } from "@/config/appEnvironment";

const credentials = process.env.FIREBASE_ADMIN_CREDENTIALS;

if (!admin.apps.length) {
  if (isLocalEnvironment && credentials) {
    const serviceAccount = JSON.parse(credentials);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } else {
    admin.initializeApp();
  }
}

export const firebaseAdmin = admin;
