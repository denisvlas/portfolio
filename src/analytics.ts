import { db, auth } from "../firestore";
import {
  addDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { signInAnonymously } from "firebase/auth";

type VisitPayload = {
  referrer?: string;
  userAgent?: string;
  language?: string;
  screen?: { width: number; height: number; pixelRatio: number };
  utm?: Record<string, string>;
  path?: string;
};

type ChatLogPayload = {
  question: string;
  answer?: string;
  flag?: string | null;
};

export async function logVisit(payload?: Partial<VisitPayload>): Promise<void> {
  try {
    // Autentificare anonimă pentru analytics
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }
    console.log("logVisit: starting", { auth: !!auth.currentUser });
    const url = new URL(window.location.href);
    const utm: Record<string, string> = {};
    url.searchParams.forEach((value, key) => {
      if (key.toLowerCase().startsWith("utm_")) {
        utm[key] = value;
      }
    });

    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No user ID available for visit logging");
      return;
    }

    const doc: VisitPayload & { ts: Date; userId: string } = {
      referrer: document.referrer || undefined,
      userAgent: navigator.userAgent,
      language: navigator.language,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1,
      },
      utm: Object.keys(utm).length ? utm : undefined,
      path: url.hash || url.pathname,
      userId,
      ...payload,
      ts: new Date(),
    };

    // Elimină cheile cu valori undefined (Firestore nu acceptă undefined)
    const cleaned = Object.fromEntries(
      Object.entries(doc).filter(([, value]) => value !== undefined)
    );

    console.log("logVisit: about to write", cleaned);
    await addDoc(
      collection(db, "visits"),
      cleaned as VisitPayload & { ts: Date; userId: string }
    );
    console.log("logVisit: success");
  } catch (err) {
    console.error("logVisit error", err);
  }
}

export async function logChat(payload: ChatLogPayload): Promise<void> {
  try {
    // Autentificare anonimă pentru analytics
    if (!auth.currentUser) {
      await signInAnonymously(auth);
    }

    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.error("No user ID available for chat logging");
      return;
    }

    const doc = {
      ...payload,
      userId,
      ts: new Date(),
      path: window.location.hash || window.location.pathname,
    };
    await addDoc(collection(db, "chat_logs"), doc);
  } catch (err) {
    console.error("logChat error", err);
  }
}

// Funcție pentru a citi istoricul chat-ului unui utilizator
export async function getUserChatHistory(
  userId?: string
): Promise<(ChatLogPayload & { id: string })[]> {
  try {
    const targetUserId = userId || auth.currentUser?.uid;
    if (!targetUserId) {
      console.error("No user ID provided for chat history");
      return [];
    }

    const q = query(
      collection(db, "chat_logs"),
      where("userId", "==", targetUserId),
      orderBy("ts", "desc")
    );

    const querySnapshot = await getDocs(q);
    const chatHistory = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (ChatLogPayload & { id: string })[];

    return chatHistory;
  } catch (err) {
    console.error("getUserChatHistory error", err);
    return [];
  }
}

// Funcție pentru a citi vizitele unui utilizator
export async function getUserVisits(
  userId?: string
): Promise<(VisitPayload & { id: string; userId: string; ts: Date })[]> {
  try {
    const targetUserId = userId || auth.currentUser?.uid;
    if (!targetUserId) {
      console.error("No user ID provided for visits history");
      return [];
    }

    const q = query(
      collection(db, "visits"),
      where("userId", "==", targetUserId),
      orderBy("ts", "desc")
    );

    const querySnapshot = await getDocs(q);
    const visits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as (VisitPayload & { id: string; userId: string; ts: Date })[];

    return visits;
  } catch (err) {
    console.error("getUserVisits error", err);
    return [];
  }
}
