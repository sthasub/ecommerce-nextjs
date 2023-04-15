import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore";

// import {initializeApp, applicationDefault, cert } from "firebase-admin/app";
// import {getFirestore,Timestamp, FieldValue } from "firebase-admin/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCh-TQC0r6hvf6sfQlznuXM5Qqhvv4SoZU",
//   authDomain: "ecommerce-nextjs-5b907.firebaseapp.com",
//   projectId: "ecommerce-nextjs-5b907",
//   storageBucket: "ecommerce-nextjs-5b907.appspot.com",
//   messagingSenderId: "947716126382",
//   appId: "1:947716126382:web:9db9df34851ade353b5f3f"
// };

// console.log(firebase.apps.length," FIREBASE ");
// const app = firebase.apps.length != 0 ? firebase.initializeApp(firebaseConfig):firebase.app;
// const db = app.storage()

// export default async function initializeAppWithConfig(){
//   initializeApp(firebaseConfig);
//   const db= getFirestore();
//   return db;  
// }

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCh-TQC0r6hvf6sfQlznuXM5Qqhvv4SoZU",
  authDomain: "ecommerce-nextjs-5b907.firebaseapp.com",
  projectId: "ecommerce-nextjs-5b907",
  storageBucket: "ecommerce-nextjs-5b907.appspot.com",
  messagingSenderId: "947716126382",
  appId: "1:947716126382:web:9db9df34851ade353b5f3f"
});
export const auth = firebaseApp.auth();
export const db = firebaseApp.firestore();
export default firebaseApp;