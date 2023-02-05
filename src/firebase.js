import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "<CHANGE IT TO YOUR FIREBASE API KEY>",
  authDomain: "<CHANGE IT TO YOUR AUTH DOMAIN>",
  databaseURL: "<CHANGE IT TO YOUR DATABSE URL>",
  projectId: "<CHANGE IT TO YOUR PROJECT ID>",
  storageBucket: "<CHANGE IT TO YOUR STORAGE BUCKET>",
  messagingSenderId: "<CHANGE IT TO YOUR MESSAGING SENDER ID>",
  appId: "<CHANGE IT TO YOUR APP ID>",
  measurementId: "<CHANGE IT TO YOUR MEASUREMENT ID>"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth();

export { app, auth, storage };
