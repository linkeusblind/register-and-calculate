import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './Home.module.css'
import Header from '../components/Header';


const HomePage: React.FC = () => {


    return (
        <div>
            <Header />
        </div>
    );
};

export default HomePage;