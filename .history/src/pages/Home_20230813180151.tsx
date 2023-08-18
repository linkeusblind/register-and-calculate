import { useEffect } from 'react';
import React { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../config/config';
import { query, collection } from 'firebase/firestore'


const HomePage: React.FC = () => {
    const auth = getAuth();

    useEffect(() => {
        const q = query(collection(db, 'UserNames'))
    })

    return (
        <div>
            <p>Home Page (Protected by Firebase!)</p>
            <button onClick={() => signOut(auth)}>Sign out</button>
        </div>
    );
};

export default HomePage;