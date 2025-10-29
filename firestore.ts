import { initializeApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';

const env = import.meta.env as Record<string, string | undefined>;
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
};

function isNonEmpty(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value !== 'undefined' && value !== 'null';
}

export const firebaseEnabled: boolean = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId,
].every(isNonEmpty);

let dbLocal: Firestore | null = null;
let authLocal: Auth | null = null;

if (firebaseEnabled) {
  const app = initializeApp(firebaseConfig as Required<typeof firebaseConfig>);
  dbLocal = getFirestore(app);
  authLocal = getAuth(app);
} else if (typeof window !== 'undefined') {
  // Evită crash-ul în runtime când lipsesc cheile; logează un warning o singură dată
  const flag = '__FIREBASE_CFG_WARNED__';
  if (!(flag in window)) {
    // @ts-expect-error attach marker on window
    window[flag] = true;
    // eslint-disable-next-line no-console
    console.warn('Firebase dezactivat: variabilele VITE_FIREBASE_* lipsesc sau sunt invalide.');
  }
}

// Exporturi cu tipuri stabile pentru consumatori
export const db = dbLocal as unknown as Firestore;
export const auth = authLocal as unknown as Auth;