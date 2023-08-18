import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';





const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState<string>(auth);
    const userName: string = user?.displayName.split(" ")[0]





    return (
        <div>
            <p>{userName}</p>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;