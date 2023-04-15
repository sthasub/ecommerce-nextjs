import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCh-TQC0r6hvf6sfQlznuXM5Qqhvv4SoZU",
  authDomain: "ecommerce-nextjs-5b907.firebaseapp.com",
  projectId: "ecommerce-nextjs-5b907",
  storageBucket: "ecommerce-nextjs-5b907.appspot.com",
  messagingSenderId: "947716126382",
  appId: "1:947716126382:web:9db9df34851ade353b5f3f"
};

// const app = firebase.apps.length != 0 ? firebase.initializeApp(firebaseConfig):firebase.app();

const db = firebase.initializeApp(firebaseConfig);

export default db;