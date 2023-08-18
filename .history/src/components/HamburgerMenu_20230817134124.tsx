import React, { useState } from 'react';
import classes from './HamburgerMenu.module.css';
import NightModeToggle from './NightModeToggle';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const auth = getAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${classes.hamburgerMenu} ${isOpen ? classes.open : ''}`} onClick={toggleMenu}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
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
            <section className={classes.settings}>
                <button className={classes.logoutButton} onClick={(() => {
                    signOut(auth)
                })}>Sign out</button>
                <NightModeToggle />
            </section>
        </div>
    );
};

export default HamburgerMenu;
