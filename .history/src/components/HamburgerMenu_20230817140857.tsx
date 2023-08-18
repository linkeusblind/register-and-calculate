import React, { useState } from 'react';
import classes from './HamburgerMenu.module.css';
import NightModeToggle from './NightModeToggle';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

const HamburgerMenu: React.FC = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const auth = getAuth();

    const toggleMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    return (
        <div className={`${classes.hamburgerMenu} ${isOpenMenu ? classes.open : ''}`} onClick={toggleMenu}>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <span className={classes.bar}></span>
            <section className={classes.m_settings}>
                <ul className={classes.links}>
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
                <NightModeToggle />
                <button className={classes.logoutButton} onClick={(() => {
                    signOut(auth)
                })}>Sign out</button>
            </section>
        </div >
    );
};

export default HamburgerMenu;
