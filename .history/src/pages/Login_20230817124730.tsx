import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'

import { FcGoogle } from 'react-icons/fc';


const LoginPage: React.FC = (props) => {
    const auth = getAuth();
    const firestore = getFirestore();
    const navigate = useNavigate();
    const [isAuthing, setIsAuthing] = useState(false);

    const signInWithGoogleHandler = async () => {
        setIsAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setIsAuthing(false);
            });
    };

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in
            const { uid, displayName, email } = user;

            // Create a user document in Firestore
            const userDocRef = doc(firestore, 'users', uid);
            const userData = {
                displayName,
                email,
                createdAt: new Date(),
            };

            setDoc(userDocRef, userData, { merge: true })
                .then(() => {
                    console.log('User document created in Firestore.');
                })
                .catch((error) => {
                    console.error('Error creating user document:', error);
                });
        } else {
            // User is signed out
        }
    });

    return (
        <div className={classes.loginPage}>
            <h1>Welcome to Login Page</h1>
            <button className={classes.loginButton} onClick={() => signInWithGoogleHandler()} disabled={isAuthing}>
                <FcGoogle /> Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;