
import axios from 'axios';

// Detect environment or default to localhost if not specified
// Vite sets import.meta.env.MODE to 'development' when running npm run dev
const isDevelopment = import.meta.env.MODE === 'development';

const API_Base_URL = isDevelopment
    ? 'http://localhost:5000/api'
    : 'https://ivamax-ftp-utp-backend.vercel.app/api';

console.log(`[API Config] Running in ${import.meta.env.MODE} mode. Using API: ${API_Base_URL}`);

const api = axios.create({
    baseURL: API_Base_URL,
});

// Request Interceptor: Attach Token Automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle Global Errors (Optional)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            // localStorage.removeItem('token');
            // window.location.href = '/otp-login'; // Or handle redirect
        }
        return Promise.reject(error);
    }
);

export default api;
