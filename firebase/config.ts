import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGU2wuoptmRVHicCvLdn39PlMvmdVfIL0",
  authDomain: "medipan-app.firebaseapp.com",
  projectId: "medipan-app",
  storageBucket: "medipan-app.firebasestorage.app",
  messagingSenderId: "807965408428",
  appId: "1:807965408428:web:9cd6145abf536a55ca7309",
  measurementId: "G-GQCH3ZG40D"
};

// Firebase Appを初期化
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// 各サービスをエクスポートして、アプリの他の場所で使えるようにする
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);