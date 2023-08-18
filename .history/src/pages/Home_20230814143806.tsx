import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';




const HomePage: React.FC = () => {
    const auth = getAuth();


    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;