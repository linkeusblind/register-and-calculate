import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import classes from './Login.module.css'

import { FcGoogle } from 'react-icons/fc';

export interface ILoginPageProps { }

const LoginPage: React.FC<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    return (
        <div className={classes.loginPage}>
            <p>Login Page</p>
            <button className={classes.loginButton} onClick={() => signInWithGoogle()} disabled={authing}>
                <FcGoogle />Sign in with Google
            </button>
        </div>
    );
};

export default LoginPage;