import React from 'react';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <header className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">Welcome to Mongo Books</h1>
                    <p className="hero-description">
                        Organize your book collection effortlessly with our intuitive and powerful management system.
                    </p>
                    <a href="/books" className="cta-button">Explore Books</a>
                </div>
            </header>
        </div>
    );
};

export default HomePage;
