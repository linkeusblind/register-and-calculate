import React from 'react';
import { getAuth, signOut } from 'firebase/auth';



const Header: React.FC = (props) => {
    const auth = getAuth();

    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default Header;