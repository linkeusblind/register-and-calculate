import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";

export const config = {
    const app = initializeApp(firebaseConfig);
    firebaseConfig: {
        apiKey: "AIzaSyBsjIkOo0izY_G4JwVLpgr60LnyvBSQdLw",
        authDomain: "register-and-calculate.firebaseapp.com",
        projectId: "register-and-calculate",
        storageBucket: "register-and-calculate.appspot.com",
        messagingSenderId: "897521205485",
        appId: "1:897521205485:web:d88cace32f528bfa584ce4"
    }
}

export const db = getFirestore(app);