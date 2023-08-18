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
    const [isSignedOut, setisSignedOut] = useState<boolean | (() => boolean)>(false);

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
        setisSignedOut(true)
    }, [user, isSignedOut]);

    const signOutHandler = (() => {
        setisSignedOut(false);
        signOut(auth);
    })

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <header className={classes.header}>
                {isSignedOut && (
                    <section className={classes.userSection}>
                        <h1 className={classes.user}>Hello {userName}</h1>
                        <button className={classes.logoutButton} onClick={signOutHandler}>Sign out</button>
                    </section>
                )}
                <NightModeToggle />
            </header>
        </div>
    );
};

export default HomePage;