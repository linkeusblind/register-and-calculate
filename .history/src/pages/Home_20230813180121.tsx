import { useEffect } from 'react';
import React { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../config/config';
import { query, collection } from 'firebase/firestore'

export interface IHomePageProps { }

const HomePage: React.FC<IHomePageProps> = (props) => {
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