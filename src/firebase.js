"use client";
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAKaBLp2bKycHP2YKRwfdrBmMQkb-tJmK0",
  authDomain: "personalweb-df71c.firebaseapp.com",
  projectId: "personalweb-df71c",
  storageBucket: "personalweb-df71c.appspot.com",
  messagingSenderId: "444555015917",
  appId: "1:444555015917:web:f2bc8185f6ca375ed2bee4",
  measurementId: "G-WJK243VWLK"
};

// Initialize Firebase only if no apps have been initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Prevent Analytics from running in server-side environments
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };
