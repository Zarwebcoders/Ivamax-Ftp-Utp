import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, DollarSign, Layers, CreditCard, Activity, Landmark, Download, TrendingUp, PieChart, Shield, History, ChevronDown, Search, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionButton = ({ icon: Icon, label, colorClass, onClick, link }) => {
    const Content = () => (
        <div className="bg-black border border-gray-800 shadow-lg shadow-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-900 transition-all group shadow-lg hover:shadow-xl hover:translate-y-[-2px]">
            <div className={`p-4 rounded-2xl bg-gray-900 group-hover:bg-gray-800 transition-colors ${colorClass}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-white font-bold uppercase text-xs tracking-widest">{label}</span>
        </div>
    );

    if (link) {
        return <Link to={link} className="block w-full"><Content /></Link>;
    }

    return <button onClick={onClick} className="w-full"><Content /></button>;
};

const WalletCard = ({ title, items, icon: Icon }) => {
    // Function to determine gradient based on title
    const getGradient = () => {
        switch (title) {
            case 'Captok Wallet':
                return 'from-blue-600 to-blue-400';
            case 'Protok Wallet':
                return 'from-purple-600 to-purple-400';
            case 'FTP Plan':
                return 'from-amber-600 to-amber-400';
            case 'UTP Plan':
                return 'from-emerald-600 to-emerald-400';
            default:
                return 'from-gray-600 to-gray-400';
        }
    };

    return (
        <div className="group relative">
            {/* Card Container with Glassmorphism effect */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, gray 1px, transparent 0)',
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>

                {/* Animated Gradient Orbs */}
                <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-r ${getGradient()} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                <div className={`absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-r ${getGradient()} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>

                {/* Header with Icon and Title */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${getGradient()} shadow-lg`}>
                            {Icon && <Icon className="w-5 h-5 text-white" />}
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                            Active
                        </span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all group/card"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
                                    {item.label}
                                </span>
                                <span className="text-2xl font-bold text-white mb-1">
                                    {item.value}
                                </span>
                                <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    {item.subtext}
                                </span>
                            </div>

                            {/* Mini trend indicator */}
                            {idx === 0 && (
                                <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full w-3/4 bg-gradient-to-r ${getGradient()} rounded-full`}></div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer Stats */}
                <div className="relative z-10 mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Shield className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Secured</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <PieChart className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-500">Updated live</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WalletStatementContent = () => {
    const [walletFilter, setWalletFilter] = useState('All Wallets');
    const [typeFilter, setTypeFilter] = useState('All Types');

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Header Section */}
            <header className="bg-black rounded-3xl p-4 shadow-xl border border-gray-800 shadow-gray-400 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-primary border border-gray-700">
                        <History className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white uppercase tracking-wide">Wallet Statements</h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Track all your transactions and rewards</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="relative z-10 flex flex-wrap gap-4">
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-700 transition-all font-bold text-xs uppercase tracking-wider">
                            <span>{walletFilter}</span>
                            <ChevronDown className="w-4 h-4 text-primary" />
                        </button>
                    </div>
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-700 transition-all font-bold text-xs uppercase tracking-wider">
                            <span>{typeFilter}</span>
                            <ChevronDown className="w-4 h-4 text-primary" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content - Empty State */}
            <div className="bg-white rounded-3xl border border-gray-400 shadow-xl shadow-gray-400 min-h-[500px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="text-center space-y-6 z-10">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-4 border-gray-100 shadow-inner">
                        <Search className="w-10 h-10 text-gray-300" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-text-main uppercase tracking-widest">No Transactions Found</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Try adjusting your filters</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Wallet = () => {
    const [mainTab, setMainTab] = useState('overview'); // 'overview', 'statements'
    const [mobileTab, setMobileTab] = useState('captok'); // 'captok', 'protok', 'ftp', 'utp'

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <WalletIcon className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-text-main uppercase">Financial Center</h1>
                        <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Ecosystem Liquidity & Portfolio Overview</p>
                    </div>
                </div>

                {/* Main Tabs Navigation */}
                <div className="flex p-1.5 bg-[#d9dde0] rounded-2xl relative w-full md:w-auto overflow-x-auto scrollbar-hide gap-1.5 shadow-inner">
                    <button
                        onClick={() => setMainTab('overview')}
                        className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${mainTab === 'overview'
                            ? "bg-white text-text-main shadow-md transform scale-[1.02]"
                            : "text-[#58728d] hover:text-[#3b4c5d] hover:bg-white/40"
                            }`}
                    >
                        <PieChart className="w-4 h-4" />
                        Overview
                    </button>
                    <button
                        onClick={() => setMainTab('statements')}
                        className={`flex flex-1 md:flex-none items-center justify-center gap-2 px-6 py-3 rounded-xl text-[11px] md:text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${mainTab === 'statements'
                            ? "bg-[#c9a05b] text-white shadow-md transform scale-[1.02]"
                            : "text-[#58728d] hover:text-[#3b4c5d] hover:bg-white/40"
                            }`}
                    >
                        <FileText className="w-4 h-4" />
                        Wallet Statements
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            {mainTab === 'overview' && (
                <div className="animate-fade-in-up space-y-6">
                    {/* Mobile Tab Navigation for Wallets */}
                    <div className="md:hidden bg-gray-300 p-2 rounded-2xl border border-gray-800 flex gap-1 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setMobileTab('captok')}
                            className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'captok'
                                ? 'bg-blue-500/20 text-blue-800 shadow-lg border border-blue-500/50'
                                : 'text-gray-500 hover:text-white hover:bg-gray-900'
                                }`}
                        >
                            Captok
                        </button>
                        <button
                            onClick={() => setMobileTab('protok')}
                            className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'protok'
                                ? 'bg-purple-500/20 text-purple-800 shadow-lg border border-purple-500/50'
                                : 'text-gray-500 hover:text-white hover:bg-gray-900'
                                }`}
                        >
                            Protok
                        </button>
                        <button
                            onClick={() => setMobileTab('ftp')}
                            className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'ftp'
                                ? 'bg-amber-500/20 text-amber-800 shadow-lg border border-amber-500/50'
                                : 'text-gray-500 hover:text-white hover:bg-gray-900'
                                }`}
                        >
                            FTP
                        </button>
                        <button
                            onClick={() => setMobileTab('utp')}
                            className={`flex-1 min-w-[80px] py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'utp'
                                ? 'bg-emerald-500/20 text-emerald-800 shadow-lg border border-emerald-500/50'
                                : 'text-gray-500 hover:text-white hover:bg-gray-900'
                                }`}
                        >
                            UTP
                        </button>
                    </div>

                    {/* Wallet Holdings Section */}
                    <div className="space-y-6 pt-2">
                        <h2 className="hidden md:block text-xl font-bold text-text-main uppercase border-l-4 border-primary pl-4">Wallet Holdings</h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className={`${mobileTab === 'captok' ? 'block' : 'hidden'} md:block`}>
                                <WalletCard
                                    title="Captok Wallet"
                                    icon={CreditCard}
                                    items={[
                                        { label: "Captok Balance", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "Used Balance", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "Free Balance", value: "$0.00", subtext: "0.00 IMX" }
                                    ]}
                                />
                            </div>

                            <div className={`${mobileTab === 'protok' ? 'block' : 'hidden'} md:block`}>
                                <WalletCard
                                    title="Protok Wallet"
                                    icon={Layers}
                                    items={[
                                        { label: "Protok Balance", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "FTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "UTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" }
                                    ]}
                                />
                            </div>

                            <div className={`${mobileTab === 'ftp' ? 'block' : 'hidden'} md:block`}>
                                <WalletCard
                                    title="FTP Plan"
                                    icon={Activity}
                                    items={[
                                        { label: "FTP Unit", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "FTP Stake Inv.", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "FTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" },
                                    ]}
                                />
                            </div>

                            <div className={`${mobileTab === 'utp' ? 'block' : 'hidden'} md:block`}>
                                <WalletCard
                                    title="UTP Plan"
                                    icon={Activity}
                                    items={[
                                        { label: "UTP Unit", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "UTP Stake Inv.", value: "$0.00", subtext: "0.00 IMX" },
                                        { label: "UTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" }
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {mainTab === 'statements' && (
                <WalletStatementContent />
            )}
        </div>
    );
};

export default Wallet;