import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader, Eye, EyeOff } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        sponsorId: '',
        placement: 'Left'
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const register = useAuthStore((state) => state.register);
    const isLoading = useAuthStore((state) => state.isLoading);
    const navigate = useNavigate();

    // Auto-fill sponsorId from URL
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) {
            setFormData(prev => ({ ...prev, sponsorId: ref }));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        const success = await register(formData);
        if (success) navigate('/dashboard');
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#9099a8] py-8 px-4 font-sans relative overflow-hidden">
            <div className="w-full max-w-xl bg-white rounded-3xl p-6 md:p-8 shadow-2xl relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#ffbc00] mb-2 uppercase tracking-tight">
                        IVAMAX
                    </h1>
                    <p className="text-gray-600 font-bold text-xs md:text-sm">
                        Create your account and start earning
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* SPONSOR ID */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                            Sponsor ID / Referral Link <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="sponsorId"
                            value={formData.sponsorId}
                            onChange={handleChange}
                            required
                            placeholder="Referral ID will be auto-filled from link"
                            className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 font-bold text-sm text-gray-500 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                        />
                        <p className="text-[10px] font-bold text-[#fb7185] uppercase tracking-wider mt-1.5">
                            * Registration requires a referral link. Please use one to register.
                        </p>
                    </div>

                    {/* FULL NAME & MOBILE */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 font-bold text-sm text-gray-600 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                                Mobile No <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                placeholder="Enter mobile number"
                                className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 font-bold text-sm text-gray-600 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                            />
                        </div>
                    </div>

                    {/* EMAIL ID */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                            Email ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter email address"
                            className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 font-bold text-sm text-gray-600 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                        />
                    </div>

                    {/* PASSWORDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="Create password"
                                    className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 pr-10 font-bold text-sm text-gray-600 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-black text-[#2e3e4e] uppercase tracking-wide">
                                Confirm Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Confirm password"
                                    className="w-full bg-[#ebedf0] border border-[#d8dde3] rounded-xl px-4 py-3 pr-10 font-bold text-sm text-gray-600 focus:outline-none focus:border-[#ffbc00] focus:ring-1 focus:ring-[#ffbc00] placeholder:text-[#a0abb8]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#ffbc00] hover:bg-[#eab308] text-white font-extrabold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(255,188,0,0.39)] transition-transform active:scale-95 flex justify-center items-center text-base tracking-wider uppercase"
                        >
                            {isLoading ? <Loader className="animate-spin w-5 h-5" /> : 'Create Account'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-[#2e3e4e] font-bold text-xs md:text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#a17e13] hover:text-[#ffbc00] transition-colors">
                            Login Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
