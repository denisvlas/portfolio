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
  ip?: string;
  country?: string;
  region?: string;
  city?: string;
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

    // Încearcă să obții IP și locație (fallback robust)
    let ip: string | undefined;
    let country: string | undefined;
    let region: string | undefined;
    let city: string | undefined;

    try {
      // Pas 1: Obținem IP-ul
      const ipApis = [
        "https://api.ipify.org?format=json",
        "https://api64.ipify.org?format=json",
      ];

      for (const apiUrl of ipApis) {
        try {
          const ipResp = await Promise.race([
            fetch(apiUrl, { cache: "no-store" }),
            new Promise<Response>((_, reject) =>
              setTimeout(() => reject(new Error("ip-timeout")), 1500)
            ) as unknown as Promise<Response>,
          ]);

          if (ipResp.ok) {
            const ipData = await ipResp.json();
            ip = ipData?.ip;
            if (ip) break;
          }
        } catch (ipError) {
          console.warn(`IP API ${apiUrl} failed:`, ipError);
        }
      }

      // Pas 2: Dacă avem IP, obținem informații geografice de la ipinfo.io
      if (ip) {
        try {
          const geoResp = await Promise.race([
            fetch(`https://ipinfo.io/${ip}/json/`, {
              cache: "no-store",
              headers: { "Cache-Control": "no-cache" },
            }),
            new Promise<Response>((_, reject) =>
              setTimeout(() => reject(new Error("geo-timeout")), 2000)
            ) as unknown as Promise<Response>,
          ]);

          if (geoResp.ok) {
            type GeoResponse = {
              ip?: string;
              country?: string;
              region?: string;
              city?: string;
              loc?: string;
            };
            const geoData: GeoResponse = await geoResp.json();

            country = geoData?.country;
            region = geoData?.region;
            city = geoData?.city;
          }
        } catch (geoError) {
          console.warn("ipinfo.io failed:", geoError);
          // Continuăm cu doar IP-ul
        }
      }
    } catch (e) {
      console.warn("All location methods failed", e);
    }

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
      ip,
      country,
      region,
      city,
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
export async function getUserVisits(userId?: string): Promise<
  (VisitPayload & {
    id: string;
    userId: string;
    ts: Date;
    ip?: string;
    country?: string;
    region?: string;
    city?: string;
  })[]
> {
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
