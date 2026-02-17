import { create } from 'zustand';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (userId, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/login`, { userId, password });
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Login failed',
                isLoading: false
            });
            return false;
        }
    },

    register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            const { token, user } = response.data;

            localStorage.setItem('token', token);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return true;
        } catch (error) {
            set({
                error: error.response?.data?.message || 'Registration failed',
                isLoading: false
            });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
    },

    // Helper to load user profile if token exists
    loadUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:5000/api/user/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ user: response.data, isAuthenticated: true });
        } catch (error) {
            console.error("Failed to load user", error);
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
        }
    }
}));
