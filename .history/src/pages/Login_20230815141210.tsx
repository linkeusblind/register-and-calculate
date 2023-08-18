import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'

import { FcGoogle } from 'react-icons/fc';


const LoginPage: React.FC = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [isAuthing, setIsAuthing] = useState(false);

    const signInWithGoogleHandler = async () => {
        setIsAuthing(true);
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setIsAuthing(false);
            });
    };

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