// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHEWsnIxkxnsNilJEzJ_1uJ-sRNDvmy7w",
  authDomain: "pawmart-server-client.firebaseapp.com",
  projectId: "pawmart-server-client",
  storageBucket: "pawmart-server-client.firebasestorage.app",
  messagingSenderId: "27810600739",
  appId: "1:27810600739:web:09c8afa1b76029081d9e96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);