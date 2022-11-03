import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebase = {
    apiKey: "AIzaSyDsG42ATEGw0zJ8u6uYxwrmhe7d-pCkooY",
    authDomain: "mygrocerystorepal.firebaseapp.com",
    projectId: "mygrocerystorepal",
    storageBucket: "mygrocerystorepal.appspot.com",
    messagingSenderId: "35499284115",
    appId: "1:35499284115:web:435d5ecb85440277979f66",
    measurementId: "G-TF66PYDSN7"
};

// Initialize Firebase
const app = initializeApp(firebase);
export const auth = getAuth(app)
const analytics = getAnalytics(app);