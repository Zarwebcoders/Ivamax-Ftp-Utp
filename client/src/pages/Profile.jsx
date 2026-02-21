import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
    User, Mail, Share2, Copy, Check, Instagram, Send, MessageCircle,
    Wallet, TrendingUp, Coins, Users, Shield, Lock, Phone, Calendar,
    CreditCard, Settings, LayoutGrid, Key
} from 'lucide-react';
import { cn } from '../utils/cn';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const [activeTab, setActiveTab] = useState('profile'); // mobile tab state
    const [copied, setCopied] = useState(false);
    const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

    const copyRef = () => {
        if (!user?.userId) return;
        navigator.clipboard.writeText(`https://app.ivamax.finance/?ref=${user.userId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- Components for Sections ---

    const ProfileDetails = () => (
        <div className="bg-white border border-gray-400 hover:border-gray-600 shadow-lg shadow-gray-400 rounded-3xl p-4 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Profile Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">User ID</label>
                    <p className="font-mono text-sm md:text-base font-bold text-primary truncate">{user?.userId}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Full Name</label>
                    <p className="font-bold text-sm md:text-base text-gray-800 truncate">{user?.name}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100 col-span-2 md:col-span-1">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Email</label>
                    <p className="font-medium text-sm md:text-base text-gray-600 truncate">{user?.email}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Mobile</label>
                    <p className="font-medium text-sm md:text-base text-gray-600 truncate">{user?.mobile || 'N/A'}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Joined Date</label>
                    <p className="font-medium text-sm md:text-base text-gray-600 truncate">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Sponsor ID</label>
                    <p className="font-mono text-sm md:text-base font-bold text-gray-800 truncate">{user?.sponsorId || 'ROOT'}</p>
                </div>
                <div className="bg-gray-300 p-3 rounded-xl border border-gray-100 col-span-2">
                    <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase block mb-1">Sponsor Name</label>
                    <p className="font-bold text-sm md:text-base text-gray-800 truncate">{user?.sponsorName || 'N/A'}</p>
                </div>
            </div>
        </div>
    );

    const SecuritySettings = () => (
        <div className="bg-white border border-gray-400 hover:border-gray-600 shadow-lg shadow-gray-400 rounded-3xl p-4 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Lock className="w-5 h-5 text-primary" /> Security
            </h3>
            <div className="space-y-4">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Old Password</label>
                    <input type="password" placeholder="Enter current password" className="w-full bg-gray-300 border border-gray-400 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">New Password</label>
                        <input type="password" placeholder="Enter new password" className="w-full bg-gray-300 border border-gray-400 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Confirm Password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full bg-gray-300 border border-gray-400 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                </div>
                <button className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-colors">
                    Update Password
                </button>
            </div>
        </div>
    );

    const WalletInfo = () => (
        <div className="bg-white border border-gray-400 hover:border-gray-600 shadow-lg shadow-gray-400 rounded-3xl p-4 space-y-6">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> Wallet Details
            </h3>
            <div className="space-y-4">
                <div className="bg-gray-300 p-4 rounded-xl border border-gray-100 flex items-center justify-between">
                    <div>
                        <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Network</label>
                        <p className="font-bold text-gray-800">BEP20 / TRC20</p>
                    </div>
                    <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold">Active</div>
                </div>
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase block mb-1">Wallet Address</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={user?.walletAddress || 'No wallet linked'}
                            readOnly
                            className="w-full bg-gray-300 border border-gray-200 rounded-xl p-3 text-sm font-mono text-gray-600 focus:outline-none"
                        />
                        <button className="bg-primary hover:bg-primary/90 text-white px-4 rounded-xl font-bold transition-colors">
                            Change
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const SocialAndRef = () => (
        <div className="space-y-6">
            {/* Referral */}
            <div className="bg-black text-white rounded-3xl p-4 shadow-lg shadow-gray-600 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                    <Share2 className="w-5 h-5 text-primary" /> Referral Link
                </h3>
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-3 flex items-center justify-between relative z-10">
                    <div className="truncate text-gray-400 text-xs font-mono mr-2">
                        https://app.ivamax.finance/?ref={user?.userId}
                    </div>
                    <button onClick={copyRef} className="p-2 bg-gray-800 rounded-lg text-white hover:bg-primary transition-colors">
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-3 gap-3">
                <button className="bg-green-50 border border-green-400 hover:bg-green-200 shadow-lg shadow-gray-400 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                    <span className="text-[10px] font-bold text-green-700 uppercase">WhatsApp</span>
                </button>
                <button className="bg-blue-50 border border-blue-400 hover:bg-blue-200 shadow-lg shadow-gray-400 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all">
                    <Send className="w-6 h-6 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Telegram</span>
                </button>
                <button className="bg-pink-50 border border-pink-400 hover:bg-pink-200 shadow-lg shadow-gray-400 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all">
                    <Instagram className="w-6 h-6 text-pink-600" />
                    <span className="text-[10px] font-bold text-pink-700 uppercase">Instagram</span>
                </button>
            </div>
        </div>
    );

    const SystemStatus = () => (
        <div className="bg-white border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 space-y-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" /> System Status
            </h3>
            {[
                { label: 'Login System', status: 'Active', color: 'green' },
                { label: 'Registration System', status: 'Active', color: 'green' },
                { label: 'Token Buy System', status: 'Active', color: 'green' },
                { label: 'Support System', status: 'Active', color: 'green' },
                { label: 'Material Support', status: 'Review', color: 'orange' },
            ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-gray-300 rounded-xl border border-gray-100">
                    <span className="text-sm font-bold text-gray-700">{item.label}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-md bg-${item.color}-100 text-${item.color}-700 uppercase`}>
                        {item.status}
                    </span>
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6 pb-20 md:pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main uppercase tracking-tighter">My Account</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="px-3 py-1 bg-primary rounded-full border border-primary">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                                {user?.rank || 'Member'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Navigation (Responsive) */}
            <div className="flex p-1.5 bg-[#d9dde0] rounded-2xl relative w-full overflow-x-auto scrollbar-hide gap-4 shadow-inner">
                {[
                    { id: 'profile', label: 'Profile', icon: User },
                    { id: 'security', label: 'Security', icon: Lock },
                    { id: 'wallet', label: 'Wallet', icon: CreditCard },
                    { id: 'system', label: 'System', icon: Settings }
                ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all",
                                activeTab === tab.id
                                    ? "bg-primary text-white shadow-md transform scale-[1.02]"
                                    : "text-[#58728d] hover:text-[#3b4c5d] hover:bg-white/40"
                            )}
                        >
                            <Icon className="w-4 h-4 md:w-5 md:h-5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Area */}
            <div className="animate-fade-in-up mt-8">
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <ProfileDetails />
                        </div>
                        <div className="space-y-6">
                            <SocialAndRef />
                        </div>
                    </div>
                )}
                {activeTab === 'security' && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <SecuritySettings />
                    </div>
                )}
                {activeTab === 'wallet' && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <WalletInfo />
                    </div>
                )}
                {activeTab === 'system' && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <SystemStatus />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
