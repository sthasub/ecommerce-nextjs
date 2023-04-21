// Import the functions you need from the SDKs you need
import { getApp, initializeApp,getApps } from "firebase/app";
import { getFirestore} from "firebase/firestore";

// import serviceAccount from "./firebase.json";
// import {} from "firebase-admin";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

// Initialize Firebase or get existing firebase instance
const app = !getApps().length? initializeApp(firebaseConfig):getApp();

const db = getFirestore(app);
export default db; 