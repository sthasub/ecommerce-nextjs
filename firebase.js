// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// import serviceAccount from "./firebase.json";
// import {} from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCh-TQC0r6hvf6sfQlznuXM5Qqhvv4SoZU",
  authDomain: "ecommerce-nextjs-5b907.firebaseapp.com",
  projectId: "ecommerce-nextjs-5b907",
  storageBucket: "ecommerce-nextjs-5b907.appspot.com",
  messagingSenderId: "947716126382",
  appId: "1:947716126382:web:6af5f6d7a9f4e6523b5f3f"
};

// Initialize Firebase or get existing firebase instance
const app = !getApps().length? initializeApp(firebaseConfig):getApp();

const db = getFirestore(app);
export default db; 