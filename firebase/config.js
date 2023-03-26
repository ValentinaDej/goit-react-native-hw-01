import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxm4j41wyda7Y0RL4MMu2DqMMrBknr4Js",
  authDomain: "rn-social-383ff.firebaseapp.com",
  projectId: "rn-social-383ff",
  storageBucket: "rn-social-383ff.appspot.com",
  messagingSenderId: "461400031779",
  appId: "1:461400031779:web:5601ce2ac08e86e827a796",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
//export default app;
