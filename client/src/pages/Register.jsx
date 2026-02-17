import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { User, Lock, Mail, Phone, Users, Loader } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
        sponsorId: '',
        placement: 'Left'
    });

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
        const success = await register(formData);
        if (success) navigate('/dashboard');
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const InputField = ({ icon: Icon, ...props }) => (
        <div className="bg-gray-50 border border-gray-400 rounded-xl px-4 py-3 flex items-center focus-within:ring-2 focus-within:ring-primary focus-within:border-primary transition-all">
            <Icon className="w-5 h-5 text-primary mr-3" />
            <input
                {...props}
                className="bg-transparent w-full text-text-main placeholder-text-muted focus:outline-none font-medium"
            />
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-400 py-10 relative overflow-hidden">
            {/* Background Blobs - Adjusted for Light Theme */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/60 rounded-full blur-3xl opacity-40 animate-pulse"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/60 rounded-full blur-3xl opacity-40 animate-pulse delay-1000"></div>

            <div className="w-full max-w-2xl p-8 bg-white border border-gray-100 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-text-main mb-2">
                        Join <span className="text-primary">IVAMAX</span>
                    </h1>
                    <p className="text-text-muted">Start your financial journey today</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <InputField icon={User} name="name" placeholder="Full Name" onChange={handleChange} required />
                        <InputField icon={Phone} name="mobile" placeholder="Mobile" onChange={handleChange} required />
                    </div>

                    <InputField icon={Mail} name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                    <InputField icon={Lock} name="password" type="password" placeholder="Password" onChange={handleChange} required />

                    <div className="grid grid-cols-2 gap-4">
                        <InputField icon={Users} name="sponsorId" placeholder="Sponsor ID" onChange={handleChange} />
                        <div className="bg-gray-50 border border-gray-400 rounded-xl px-4 py-3 flex items-center">
                            <select
                                name="placement"
                                className="bg-transparent w-full text-text-main focus:outline-none font-medium"
                                onChange={handleChange}
                            >
                                <option value="Left">Left</option>
                                <option value="Right">Right</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-6 bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1 hover:shadow-primary/30 flex justify-center text-lg"
                    >
                        {isLoading ? <Loader className="animate-spin" /> : 'Register Now'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <Link to="/login" className="text-text-muted hover:text-primary transition-colors font-medium">
                        Already have an account? <span className="text-secondary font-bold">Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
