import * as admin from 'firebase-admin';
import serviceAccount from "./firebase.json";

//Secure connection to firebase from the backend
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) : admin.app();

const db = app.firestore();


export default db;