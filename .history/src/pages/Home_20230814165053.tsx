import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './Home.module.css'



interface User {
    displayName?: string;
    // other properties
}

const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const userName = (user as User).displayName?.split(" ")[0];






    return (
        <div>
            <header className={classes.header}>
                <p>Home Page (Protected by Firebase!)</p>
                <div>
                    <p>Hello {userName}</p>
                    <button onClick={() => signOut(auth)}>Sign out</button>
                </div>
            </header>
        </div>
    );
};

export default HomePage;