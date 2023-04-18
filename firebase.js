import { initializeApp, cert, getApp, getApps } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './firebase.json';


// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId
// };

const app = !getApps().length ? initializeApp({credential:cert(serviceAccount)}) : getApp();
const db = getFirestore(app);
export default db;