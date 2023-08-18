import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { stringify } from 'querystring';





const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState<AuthStateOptions>(auth);
    console.log('User info' + stringify(user.photoURL))


    return (
        <div>
            <div>
                {/* <img src={user.photoURL} alt="" /> */}
            </div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;