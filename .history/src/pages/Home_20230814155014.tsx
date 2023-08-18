import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';





const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const userName = () => {
        return (
            const userName1 = user?.displayName.split(" ")[0]
        )
    }




    return (
        <div>
            <div>
                {userName}
            </div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;