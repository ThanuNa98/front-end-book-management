import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
