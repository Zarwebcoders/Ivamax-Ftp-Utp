import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Mail, Phone, Shield, Copy, Check } from 'lucide-react';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const [copied, setCopied] = React.useState(false);

    const copyRef = () => {
        navigator.clipboard.writeText(`https://ivamax.com/register?sponsor=${user?.userId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-8 text-text-main">Profile Settings</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Avatar Section */}
                    <div className="md:w-1/3 flex flex-col items-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl font-bold text-white mb-4 shadow-xl shadow-primary/20">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <h3 className="text-2xl font-bold text-text-main">{user?.name}</h3>
                        <span className="text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold mt-2 uppercase tracking-wide">
                            {user?.rank || 'Member'}
                        </span>
                        <p className="text-text-muted mt-2 font-mono bg-white px-3 py-1 rounded-lg border border-gray-200">ID: {user?.userId}</p>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-2/3 space-y-6">
                        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 bg-blue-50 rounded-xl mr-4">
                                <Mail className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Email Address</p>
                                <p className="text-text-main font-medium text-lg">{user?.email}</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="p-3 bg-green-50 rounded-xl mr-4">
                                <Phone className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Mobile Number</p>
                                <p className="text-text-main font-medium text-lg">{user?.mobile}</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-5 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="p-3 bg-white rounded-xl mr-4 shadow-sm">
                                    <Shield className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-1">Referral Link</p>
                                    <p className="text-text-main font-medium text-sm truncate max-w-[250px] md:max-w-md">
                                        https://ivamax.com/register?sponsor={user?.userId}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={copyRef}
                                className="p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors shadow-sm border border-gray-100"
                                title="Copy Link"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-primary" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 opacity-60 cursor-not-allowed">
                    <h3 className="font-bold text-lg mb-2 text-text-main">Change Password</h3>
                    <p className="text-sm text-text-muted">Security settings coming soon.</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 opacity-60 cursor-not-allowed">
                    <h3 className="font-bold text-lg mb-2 text-text-main">KYC Verification</h3>
                    <p className="text-sm text-text-muted">KYC modules coming soon.</p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
