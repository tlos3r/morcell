// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMVeH41b9t5TFS1baMCkOdv_hBJN7ZBR8",
  authDomain: "morcell-product-shop.firebaseapp.com",
  projectId: "morcell-product-shop",
  storageBucket: "morcell-product-shop.appspot.com",
  messagingSenderId: "356374669614",
  appId: "1:356374669614:web:13eb38ae6080f45b97f2bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app