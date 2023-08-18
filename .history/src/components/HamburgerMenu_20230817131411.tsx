import React, { useState } from 'react';
import classes from './HamburgerMenu.module.css';

const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`${classes.hamburgerMenu} ${isOpen ? classes.open : ''}`} onClick={toggleMenu}>
            <span className={classes.bar}>asas</span>
            <span className={classes.bar}>asas</span>
            <span className={classes.bar}>asass</span>
        </div>
    );
};

export default HamburgerMenu;
