import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './Home.module.css'



interface User {
    displayName?: string;
    // other properties
}

const HomePage: React.FC = () => {


    return (
        <div>

        </div>
    );
};

export default HomePage;