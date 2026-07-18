import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { join } from 'path';

let app;

if (!getApps().length) {
  try {
    // In a real production environment, you would use environment variables for this.
    // For this local/demo setup, we use the downloaded service account key.
    const serviceAccountPath = join(process.cwd(), 'service-account.json');
    app = initializeApp({
      credential: cert(serviceAccountPath)
    });
  } catch (error) {
    console.error('Firebase Admin init error', error);
  }
} else {
  app = getApps()[0];
}

const db = app ? getFirestore(app) : null;
const auth = app ? getAuth(app) : null;

export { app, db, auth };
