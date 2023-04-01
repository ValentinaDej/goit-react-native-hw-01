import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4xP_47GflU9Ql-LtHdLSAzepth0ZETvs",
  authDomain: "react-native-social-fc13d.firebaseapp.com",
  projectId: "react-native-social-fc13d",
  storageBucket: "react-native-social-fc13d.appspot.com",
  messagingSenderId: "40947173598",
  appId: "1:40947173598:web:08d9a8759a2bcc70c7da4f",
  measurementId: "G-WVLMWRDWW8",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

//export default app;
