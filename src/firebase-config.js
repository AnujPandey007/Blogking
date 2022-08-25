// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyZafA90tqP3yQva5sdARZ8ONjpJxt43o",
  authDomain: "blog-8c903.firebaseapp.com",
  projectId: "blog-8c903",
  storageBucket: "blog-8c903.appspot.com",
  messagingSenderId: "167005618766",
  appId: "1:167005618766:web:4b60ad872df3da670ef91f",
  measurementId: "G-45E2KEDTXN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();