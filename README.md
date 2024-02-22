<!-- npm install firebase -->

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATaDtC3ZzKGOBYbmxMz7lG1I_TkabsnAY",
  authDomain: "argev-3af51.firebaseapp.com",
  projectId: "argev-3af51",
  storageBucket: "argev-3af51.appspot.com",
  messagingSenderId: "865523070346",
  appId: "1:865523070346:web:ad0be412f0d62f90ad4473",
  measurementId: "G-0F5MG2LBG9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

<!-- npm install -g firebase-tools -->


firebase login

firebase init

firebase deploy