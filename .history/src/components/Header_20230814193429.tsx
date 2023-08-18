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
    const [isAuthing, setIsAuthing] = useState(true);

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
        setIsAuthing(false);
    })

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <header className={classes.header}>
                <section className={classes.userSection}>
                    {isAuthing && (
                        <div>
                            <h1 className={classes.user}>Hello {userName}</h1>
                            <button className={classes.logoutButton} onClick={() => signOut(auth)}>Sign out</button>

                        </div>
                    )}
                    <NightModeToggle />
                </section>
            </header>
        </div>
    );
};

export default HomePage;