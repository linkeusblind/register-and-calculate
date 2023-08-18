import React from 'react';
import Header from '../components/Header';
import { getAuth, signOut } from 'firebase/auth';

export interface IHomePageProps { }

const HomePage: React.FC<IHomePageProps> = (props) => {
    const auth = getAuth();

    return (
        <div>
            <Header>
                <p>Home Page (Protected by Firebase!)</p>
                <button onClick={() => signOut(auth)}>Sign out</button>
            </Header>
        </div>
    );
};

export default HomePage;