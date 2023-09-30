import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHV609k66sKs3_6-IiLd6UM8sGOjSBEtA",
  authDomain: "whatapp-clone-400216.firebaseapp.com",
  projectId: "whatapp-clone-400216",
  storageBucket: "whatapp-clone-400216.appspot.com",
  messagingSenderId: "354100903630",
  appId: "1:354100903630:web:a737a34542e30b77789a9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }