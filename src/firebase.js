import { initializeApp } from "firebase/app";
//import { firebaseApp } from "firebase/firebaseConfig";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage"; //ストレージ

const firebaseConfig = {
  apiKey: "AIzaSyBzRMzit5PQIsH7Dq4iAzNHt5zr9VFwm-g",
  authDomain: "cooking-supporter-b9f69.firebaseapp.com",
  projectId: "cooking-supporter-b9f69",
  storageBucket: "cooking-supporter-b9f69.appspot.com",
  messagingSenderId: "437773343250",
  appId: "1:437773343250:web:e367f5d7fcc01564e0d6cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Initialize Firebase
const storage = getStorage(app);

//const storageRef = ref(storage);
/*
const gsReference = ref(
  firestorage,
  "gs://cooking-supporter-b9f69.appspot.com/sample41.png"
);
*/

export { auth, provider, db, storage };
