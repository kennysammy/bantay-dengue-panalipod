import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, setDoc, type CollectionReference } from "firebase/firestore";
import { getMessaging, isSupported as isMessagingSupported } from "firebase/messaging";
import { getStorage } from "firebase/storage";
import { COLLECTIONS } from "@repo/constants";
import type { Alert, Assessment, Barangay, CleanupTask, RiskTrend, SymptomReport, UserProfile } from "@repo/shared";

const runtimeEnv = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};

const firebaseConfig = {
  apiKey: runtimeEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: runtimeEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: runtimeEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: runtimeEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: runtimeEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: runtimeEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function getMessagingClient() {
  if (!(await isMessagingSupported())) {
    return null;
  }

  return getMessaging(app);
}

export const typedCollections = {
  users: collection(db, COLLECTIONS.users) as CollectionReference<UserProfile>,
  assessments: collection(db, COLLECTIONS.assessments) as CollectionReference<Assessment>,
  symptoms: collection(db, COLLECTIONS.symptoms) as CollectionReference<SymptomReport>,
  cleanupTasks: collection(db, COLLECTIONS.cleanupTasks) as CollectionReference<CleanupTask>,
  barangays: collection(db, COLLECTIONS.barangays) as CollectionReference<Barangay>,
  riskTrends: collection(db, COLLECTIONS.riskTrends) as CollectionReference<RiskTrend>,
  alerts: collection(db, COLLECTIONS.alerts) as CollectionReference<Alert>,
};

export async function getUserProfile(userId: string) {
  const userDoc = await getDoc(doc(db, COLLECTIONS.users, userId));
  return userDoc.data() as UserProfile | undefined;
}

export async function upsertAssessment(assessment: Assessment) {
  await setDoc(doc(db, COLLECTIONS.assessments, assessment.id), assessment, { merge: true });
}
