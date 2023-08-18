import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import NightModeToggle from "../components/NightModeToggle";
import classes from './Header.module.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import History from '../pages/History';



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
            <Router>
                <Switch>
                    <Route exact path="/" component={CalculateItem} />
                    <Route path="/history" component={UserHistory} />
                </Switch>
            </Router>
            <header className={classes.header}>
                <section className={classes.userSection}>
                    <h1 className={classes.user}>Hello {userName}</h1>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                path="/history"
                                element={
                                    <History />
                                }
                            />

                        </Routes>
                    </BrowserRouter>
                    <button className={classes.logoutButton} onClick={signOutHandler}>Sign out</button>
                </section>

                <NightModeToggle />
            </header>
        </div>
    );
};

export default HomePage;