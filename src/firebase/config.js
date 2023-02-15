// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDphSCYfHoqPQSWDBag4Ys30GGuwC5aOn0",
  authDomain: "rn-travel-blog.firebaseapp.com",
  projectId: "rn-travel-blog",
  storageBucket: "rn-travel-blog.appspot.com",
  messagingSenderId: "962317222397",
  appId: "1:962317222397:web:d77c39c8e56bb5296a1994",
  measurementId: "G-LQCLYJ59PJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
