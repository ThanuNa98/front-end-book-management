import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
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
            const response = await axios.post('http://localhost:5000/api/books/register', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', response.data.username);
            window.dispatchEvent(new Event('storage'));
            setLoading(false);
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message || 'An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="auth-container register">
            <div className="auth-image reg-img">
                {/* Add image here */}
            </div>
            <div className="auth-form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="auth-toggle-text">
                    Already have an account?{' '}
                    <Link to="/login" className="auth-toggle-link">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
