import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBZANhL4W1eGrhov4aZAcwh4dm6sqHsSI4",
  authDomain: "geek-utopia.firebaseapp.com",
  projectId: "geek-utopia",
  storageBucket: "geek-utopia.appspot.com",
  messagingSenderId: "1069744415298",
  appId: "1:1069744415298:web:2a71a9768cac76afd2c3db",
  measurementId: "G-X3ELJ63415"
};
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);