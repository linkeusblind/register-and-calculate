import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const config = {
    firebaseConfig: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    }
}
const app = initializeApp(config.firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);