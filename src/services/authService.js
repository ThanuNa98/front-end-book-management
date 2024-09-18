import axios from 'axios';

export const login = async (credentials) => {
    return await axios.post('/api/auth/login', credentials);
};

export const register = async (userData) => {
    return await axios.post('/api/auth/register', userData);
};

export const getUsernameById = async (userId) => {
    try {
        const response = await axios.get(`/api/auth/user/${userId}`);
        return response.data.username;
    } catch (error) {
        console.error('Error fetching username:', error);
        throw error;
    }
};