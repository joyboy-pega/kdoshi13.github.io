import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "gen-lang-client-0273669283",
  appId: "1:27111540198:web:f7015fcae57c703eaec227",
  apiKey: "AIzaSyCg3Pz-dt1_3KSOEfBfQe_QLuiEpXi8iog",
  authDomain: "gen-lang-client-0273669283.firebaseapp.com",
  storageBucket: "gen-lang-client-0273669283.firebasestorage.app",
  messagingSenderId: "27111540198",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-8958bec9-42a4-4cab-8918-40fb4d269256");
export const googleProvider = new GoogleAuthProvider();
