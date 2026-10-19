import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseAppletConfig from "../../firebase-applet-config.json";

// Config fallback if needed
const firebaseConfig = firebaseAppletConfig || {
  apiKey: "AIzaSyDQBAaaxfidq3vMSlANMCq6j6VENUGhqls",
  authDomain: "wecare-hospitals-e6382.firebaseapp.com",
  projectId: "wecare-hospitals-e6382",
  storageBucket: "wecare-hospitals-e6382.firebasestorage.app",
  messagingSenderId: "945733300687",
  appId: "1:945733300687:web:e4c67e35dfd537cb66e2ba"
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Custom database ID from applet config if present
const databaseId = (firebaseAppletConfig as Record<string, string>)?.firestoreDatabaseId;
export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

export default app;
