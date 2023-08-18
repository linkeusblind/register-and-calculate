import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './Home.module.css'
import Header from '../components/Header';
import CalculateItem from '../components/CalculateItem';
import UserHistory from '../components/UserHistory'
import History from './History';


const HomePage: React.FC = () => {


    return (
        <div>
            <Header />
            <CalculateItem />
            <UserHistory />
            <History />
        </div>
    );
};

export default HomePage;