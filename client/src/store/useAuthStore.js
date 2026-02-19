import { create } from 'zustand';
import api from '../lib/axios';

export const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,
    error: null,

    login: async (userId, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/login', { userId, password });
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
            const response = await api.post('/auth/register', userData);
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
            // Headers are automatically handled by the interceptor in lib/axios.js
            const response = await api.get('/user/profile');
            set({ user: response.data, isAuthenticated: true });
        } catch (error) {
            console.error("Failed to load user", error);
            localStorage.removeItem('token');
            set({ user: null, token: null, isAuthenticated: false });
        }
    }
}));
