import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const LogIn = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/books/login', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.username);
            window.dispatchEvent(new Event('storage'));
            setLoading(false);
            navigate('/books');
        } catch (err) {
            setError(err.response.data.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="auth-container login">
            <div className="auth-image log-img">
                {/* Add image here */}
            </div>
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-toggle-text">
                    Don't have an account?{' '}
                    <Link to="/register" className="auth-toggle-link">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;
