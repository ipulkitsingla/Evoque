import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const auth = {
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.success) {
            localStorage.setItem('adminToken', response.data.token);
            localStorage.setItem('adminUser', JSON.stringify(response.data.user));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
    },

    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    }
};

export default api; 