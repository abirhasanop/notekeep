// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAV-8l_i-xl2rOHgkbJqZZ2DFesgkIZ45I",
    authDomain: "note-keep-42557.firebaseapp.com",
    projectId: "note-keep-42557",
    storageBucket: "note-keep-42557.appspot.com",
    messagingSenderId: "63337264823",
    appId: "1:63337264823:web:d974adbdd69a10759dbf32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app