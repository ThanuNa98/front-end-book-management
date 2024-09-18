import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(storedUser);
            } else {
                setUser(null);
            }
        };

        fetchUser();

        const handleStorageChange = () => {
            fetchUser();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        window.dispatchEvent(new Event('storage'));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">BookManager</Link>
                <div className="hamburger" onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ul className={`navbar-menu ${isMenuOpen ? 'show' : ''}`}>
                    {isMenuOpen && (
                        <button className="close-button" onClick={closeMenu}>
                            &times;
                        </button>
                    )}
                    <li className="navbar-item">
                        <Link to="/" className="navbar-link" onClick={closeMenu}>Home</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="/books" className="navbar-link" onClick={closeMenu}>Books</Link>
                    </li>
                    {!user ? (
                        <>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link" onClick={closeMenu}>Login</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/register" className="navbar-link" onClick={closeMenu}>Register</Link>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-item">
                            <button onClick={() => { handleLogout(); closeMenu(); }} className="navbar-link">Logout</button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
