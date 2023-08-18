import { useState, useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import NightModeToggle from "../components/NightModeToggle";
import classes from './Header.module.css'



interface User {
    displayName?: string;
    // other properties
}

const HomePage: React.FC = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [userName, setUserName] = useState<string | null>(null);
    // const userName = (user as User).displayName?.split(" ")[0];

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

    if (loading) {
        // Handle loading state if needed
        return <div>Loading...</div>;
    }
    return (
        <div>
            <header className={classes.header}>
                <h1>Home Page</h1>
                <section className={classes.userSection}>
                    <p>Hello {userName}</p>
                    <button className={classes.logoutButton} onClick={() => signOut(auth)}>Sign out</button>
                    <NightModeToggle />
                </section>
            </header>
        </div>
    );
};

export default HomePage;