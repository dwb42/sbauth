// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from 'firebase/auth'





// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB1G6C3hg20_ILPb-bum7dKxh0z_665AI",
  authDomain: "supabasedummyapp.firebaseapp.com",
  projectId: "supabasedummyapp",
  storageBucket: "supabasedummyapp.appspot.com",
  messagingSenderId: "949769888623",
  appId: "1:949769888623:web:a70435335393ce73b53e9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init & export firestore service
export const db = getFirestore(app) // ggf plus app als Parameter
// generate & export auth object
export const auth = getAuth()
