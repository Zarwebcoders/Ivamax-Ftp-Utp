import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { User, Lock, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ userId: '', password: '' });
    const login = useAuthStore((state) => state.login);
    const isLoading = useAuthStore((state) => state.isLoading);
    const error = useAuthStore((state) => state.error);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData.userId, formData.password);
        if (success) navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 relative overflow-hidden">
            {/* Background Blobs - Adjusted for Light Theme */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/60 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/60 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>

            <div className="w-full max-w-md p-8 bg-white border border-gray-800 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-white font-bold text-2xl">IV</span>
                    </div>
                    <h1 className="text-3xl font-bold text-text-main mb-1">
                        IVAMAX
                    </h1>
                    <p className=" text-sm">Welcome back! Access your dashboard.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg mb-6 text-center border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-text-main ml-1">User ID</label>
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 w-5 h-5 text-primary" />
                            <input
                                type="text"
                                required
                                className="w-full bg-gray-50 border border-gray-400 rounded-xl py-3 pl-12 pr-4 text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all font-medium"
                                placeholder="Enter your User ID"
                                value={formData.userId}
                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-bold text-text-main">Password</label>

                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 w-5 h-5 text-primary" />
                            <input
                                type="password"
                                required
                                className="w-full bg-gray-50 border border-gray-400 rounded-xl py-3 pl-12 pr-4 text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary transition-all font-medium"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                        <label className="flex items-center text-text-muted cursor-pointer">
                            <input type="checkbox" className="mr-2 rounded border-gray-300 text-primary focus:ring-primary" />
                            Remember me
                        </label>
                        <a href="#" className="font-bold text-secondary hover:text-primary transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center space-x-2 text-lg"
                    >
                        {isLoading ? <Loader className="animate-spin w-6 h-6" /> : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-text-muted">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-secondary font-bold hover:text-primary transition-colors">
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
