import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCcbo98_4QuV4yp1URUBisynWPRwkpO7ks",
  authDomain: "letters-d11de.firebaseapp.com",
  projectId: "letters-d11de",
  storageBucket: "letters-d11de.appspot.com",
  messagingSenderId: "382393607993",
  appId: "1:382393607993:web:971828f3b51535f7356ae8"
}
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
