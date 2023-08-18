import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import NightModeToggle from "../components/NightModeToggle";
import classes from './Header.module.css'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import History from '../pages/History';
import HamburgerMenu from './HamburgerMenu';



interface User {
    displayName?: string;
    // other properties
}

const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [userName, setUserName] = useState<string | null>(null);


    useEffect(() => {
        const loadUserName = async () => {
            if (user !== null) {
                const displayName = (user as User).displayName;
                if (displayName) {
                    const firstName = displayName.split(" ")[0];
                    setUserName(firstName);
                }
            }

        };
        loadUserName();
    }, [user]);

    const signOutHandler = (() => {
        signOut(auth);
    })

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <HamburgerMenu />
            <header className={classes.header}>
                <section className={classes.userSection}>
                    <h1 className={classes.user}>Hello {userName}</h1>
                    <nav className={classes.nav} >
                        <ul>
                            <li>
                                <NavLink to='/'>
                                    Calculate
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/history'>
                                    History
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </section>
                <section>
                    <button className={classes.logoutButton} onClick={signOutHandler}>Sign out</button>
                    <NightModeToggle />
                </section>
            </header>
        </div >
    );
};

export default HomePage;