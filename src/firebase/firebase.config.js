// Import the functions you need from the SDKs you need
import { FirebaseError, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import 'firebase/storage';

 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAuls46_Wh_upSlughR9XeU3vLUhoirnLE",
    authDomain: "ql-ks-2cd81.firebaseapp.com",
    projectId: "ql-ks-2cd81",
    storageBucket: "ql-ks-2cd81.appspot.com",
    messagingSenderId: "934604432611",
    appId: "1:934604432611:web:fbffe887763eb1b5b091d6",
    measurementId: "G-SW2CT2DZ3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export {db, auth, app};