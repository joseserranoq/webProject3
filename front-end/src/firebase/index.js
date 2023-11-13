// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDS4oRoA0orTJcGZBrTg73smhpTRsttWS0",
  authDomain: "vue-web-f6dc8.firebaseapp.com",
  projectId: "vue-web-f6dc8",
  storageBucket: "vue-web-f6dc8.appspot.com",
  messagingSenderId: "984456635049",
  appId: "1:984456635049:web:fb878646c5b6a0e20f3fb8",
  measurementId: "G-MZF6WSJHGQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { auth }