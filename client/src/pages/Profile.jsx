import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import {
    User,
    Mail,
    Share2,
    Copy,
    Check,
    Instagram,
    Send,
    MessageCircle,
    Award,
    Zap,
    Trophy,
    Activity,
    Layers,
    Users,
    Wallet,
    TrendingUp,
    Shield,
    Coins,
    Star
} from 'lucide-react';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const [copied, setCopied] = useState(false);

    const copyRef = () => {
        if (!user?.userId) return;
        navigator.clipboard.writeText(`https://app.ivamax.finance/?ref=${user.userId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main uppercase tracking-tighter">Profile</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                {user?.rank || 'Member'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Joined Date</p>
                    <p className="text-sm font-bold text-text-main">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
                </div>
            </div>

            {/* Top Stats Row (Black Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* IVAMAX/Captok */}
                <div className="bg-black rounded-2xl p-5 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-gray-900 rounded-lg text-primary">
                            <Wallet className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Captok Balance</p>
                        <h3 className="text-xl font-bold text-white">0 USDT</h3>
                    </div>
                </div>

                {/* Invested */}
                <div className="bg-black rounded-2xl p-5 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-gray-900 rounded-lg text-blue-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Invested</p>
                        <h3 className="text-xl font-bold text-white">0 USDT</h3>
                    </div>
                </div>

                {/* Earned */}
                <div className="bg-black rounded-2xl p-5 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-gray-900 rounded-lg text-green-400">
                            <Coins className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Earned</p>
                        <h3 className="text-xl font-bold text-white">0.00 USDT</h3>
                    </div>
                </div>

                {/* Network */}
                <div className="bg-black rounded-2xl p-5 border border-gray-800 shadow-xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-purple-500/20 transition-all"></div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 bg-gray-900 rounded-lg text-purple-400">
                            <Users className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Network</p>
                        <h3 className="text-xl font-bold text-white">0 Members</h3>
                    </div>
                </div>
            </div>

            {/* Income Overview */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">Income Overview</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {/* Intro Club */}
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Intro Club</p>
                        <h4 className="text-lg font-bold text-text-main">$0.00</h4>
                    </div>
                    {/* Start Royalty */}
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Start Royalty</p>
                        <h4 className="text-lg font-bold text-text-main">$0.00</h4>
                    </div>
                    {/* PayPer Royalty */}
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">PayPer Royalty</p>
                        <h4 className="text-lg font-bold text-text-main">$0.00</h4>
                    </div>
                    {/* FTP Rewards */}
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">FTP Rewards</p>
                        <h4 className="text-lg font-bold text-text-main">$0.00</h4>
                    </div>
                    {/* UTP Rewards */}
                    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm hover:border-primary/50 transition-colors">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">UTP Rewards</p>
                        <h4 className="text-lg font-bold text-text-main">$0.00</h4>
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Settings */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">Contact Settings</h3>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl space-y-6">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Username</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-400" />
                                <span className="font-bold text-text-main">{user?.name || 'Enter Username'}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Registered Email</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                                <Mail className="w-5 h-5 text-gray-400" />
                                <span className="font-bold text-text-main">{user?.email || 'Enter Email'}</span>
                            </div>
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">Account User ID</label>
                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                                <Shield className="w-5 h-5 text-primary" />
                                <span className="font-bold text-primary font-mono">{user?.userId || 'IVA...'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Propagation */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <h3 className="text-sm font-bold text-text-main uppercase tracking-widest">Social Propagation</h3>
                    </div>
                    <div className="bg-black border border-gray-800 rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10 space-y-6">
                            <div>
                                <h4 className="text-white font-bold uppercase mb-1 flex items-center gap-2">
                                    <Share2 className="w-4 h-4 text-primary" />
                                    Amplify Your Network Presence
                                </h4>
                                <p className="text-xs text-gray-500 uppercase">Share your unique access link to expand your hierarchy.</p>
                            </div>

                            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
                                <div className="truncate text-gray-400 text-xs font-mono mr-4">
                                    https://app.ivamax.finance/?ref={user?.userId || '...'}
                                </div>
                                <button
                                    onClick={copyRef}
                                    className="p-2 bg-black rounded-lg text-primary hover:bg-primary hover:text-white transition-all"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                </button>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-8">
                                <button className="bg-green-900/20 border border-green-900/50 hover:bg-green-900/40 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                    <MessageCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">WhatsApp</span>
                                </button>
                                <button className="bg-blue-900/20 border border-blue-900/50 hover:bg-blue-900/40 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                    <Send className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">Telegram</span>
                                </button>
                                <button className="bg-pink-900/20 border border-pink-900/50 hover:bg-pink-900/40 p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all group">
                                    <Instagram className="w-6 h-6 text-pink-500 group-hover:scale-110 transition-transform" />
                                    <span className="text-[10px] font-bold text-pink-500 uppercase tracking-wider">Instagram</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
