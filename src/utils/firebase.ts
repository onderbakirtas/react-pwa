import { FirebaseOptions, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyB_brS-5ZwEkKH6tZrJtHtrGn821p1KkcQ",
  authDomain: "reactpwa1.firebaseapp.com",
  projectId: "reactpwa1",
  storageBucket: "reactpwa1.appspot.com",
  messagingSenderId: "565764617316",
  appId: "1:565764617316:web:07302a6f3f99128c605b71",
  databaseURL: "https://reactpwa1-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
