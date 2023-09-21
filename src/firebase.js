// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZuExqGDibuPyiUiuQCmIay6EMIA9RGFM",
  authDomain: "podcast-app-ebef6.firebaseapp.com",
  projectId: "podcast-app-ebef6",
  storageBucket: "podcast-app-ebef6.appspot.com",
  messagingSenderId: "851730935268",
  appId: "1:851730935268:web:a19b29d91700a3583f6bf1",
  measurementId: "G-C941BMCY9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export {auth,db,storage};