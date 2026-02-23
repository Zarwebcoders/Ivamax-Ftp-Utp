import React, { useState, useEffect } from 'react';
import { Award, Filter, Download, Crown, BadgeDollarSign, Trophy } from 'lucide-react';
import api from '../lib/axios';

// --- Sub-Components (formerly Pages) ---

const IntroductionClubContent = () => {
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const levels = ['All Levels', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

    return (
        <div className="space-y-6">
            {/* Header removed as it's handled by main page now, or kept if distinct visual required? 
                User said "combine page", usually implies tabs switching content. 
                I will keep the headers inside the tabs to match "exactly as is" requirement for content 
                BUT usually tabs implies a shared header. 
                Let's keep the internal headers to be safe as "content", 
                but maybe reduce padding or adjust execution if it looks double-headed. 
                Actually User asked to "combine pages", similar to Hierarchy. 
                Hierarchy had one header and switcher. 
                Let's use a main header for "All Rewards" and then specific content.
                Wait, the visual design in Hierarchy had the standard header.
                I will create a Main Header for "All Rewards" and render the *Body* of the previous pages.
             */}

            {/* Original Content excluding the top Page Header to avoid duplication if we have a main one, 
                 OR we keep them if we use a subtle main header. 
                 Let's stick to the styling of Hierarchy where we check the View Mode.
                 Hierarchy had 1 main header.
                 Here we have 3 distinct distinct concepts. 
                 I'll render the *ENTIRE* original content of each page *inside* the tab 
                 so nothing is lost (titles/descriptions might be specific).
             */}

            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Level Rewards</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Introduction Club Reward Income History</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-800 p-4 shadow-lg shadow-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="text-black font-bold uppercase text-xs tracking-wider whitespace-nowrap">Filter by Level :</span>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-primary border border-gray-700 text-white rounded-xl py-3 px-4 appearance-none font-bold text-xs uppercase focus:outline-none focus:border-primary cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-primary rotate-45 mb-1"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-primary" />
                        <h3 className="text-black font-bold uppercase text-sm tracking-wider">Reward History</h3>
                    </div>

                    <div className="bg-primary px-4 py-2 rounded-lg border border-gray-700">
                        <span className="text-[10px] text-white font-bold uppercase mr-2">Total:</span>
                        <span className="text-white font-bold text-sm">0.00 IMX</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">From Address</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Reward Source</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" className="py-24 text-center">
                                    <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Rewards Found</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const StarRoyaltyContent = () => {
    const [royaltyTx, setRoyaltyTx] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoyalty = async () => {
            try {
                const res = await api.get('/wallet/history');
                const rankRewards = res.data.filter(tx => tx.type === 'RankReward');
                setRoyaltyTx(rankRewards);
            } catch (err) {
                console.error("Failed to fetch royalty history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoyalty();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <Award className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Rank Rewards</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Rank Rewards</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Monthly Rank Royalty Income Statement</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <Crown className="w-4 h-4 text-primary" />
                    <h3 className="text-black font-bold uppercase text-sm tracking-wider">Your Royalty Earnings</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Rank Info</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Business Metrics</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Income</th>
                                <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-24 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    </td>
                                </tr>
                            ) : royaltyTx.length > 0 ? (
                                royaltyTx.map((tx) => (
                                    <tr key={tx._id} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                        <td className="py-4 px-6 text-sm font-bold text-white uppercase">
                                            {tx.description || 'Rank Reward'}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-medium text-gray-400">
                                            -
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-green-500">
                                            +{tx.amount} IMX
                                        </td>
                                        <td className="py-4 px-6 text-right text-xs font-medium text-gray-400">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Empty State */
                                <tr>
                                    <td colSpan="4" className="py-24 text-center">
                                        <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Royalty Income Found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const PayPerRoyaltyContent = () => {
    const [selectedLevel, setSelectedLevel] = useState('All Levels');
    const levels = ['All Levels', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <BadgeDollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">PayPer Generation</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Passive Generation Reward Income History</p>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-800 p-4 shadow-lg shadow-gray-600 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="text-gray-500 font-bold uppercase text-xs tracking-wider whitespace-nowrap">Filter by Level :</span>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-primary border border-gray-700 text-white rounded-xl py-3 px-4 appearance-none font-bold text-xs uppercase focus:outline-none focus:border-primary cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-primary rotate-45 mb-1"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <Download className="w-4 h-4 text-primary" />
                    <h3 className="text-black font-bold uppercase text-sm tracking-wider">Reward History</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Level Type</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Income Distribution Details</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Amount</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" className="py-24 text-center">
                                    <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Rewards Found</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};


// --- Main Page Component ---

const AllRewards = () => {
    const [activeTab, setActiveTab] = useState('intro'); // 'intro', 'star', 'payper'

    return (
        <div className="space-y-8 pb-12">
            {/* Top Navigation / Header Area */}
            <div className="bg-surface border border-gray-400 shadow-lg shadow-gray-400 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">All Rewards</h1>
                        <p className="text-sm font-bold text-text-muted uppercase">View and Manage All Your Ecosystem Rewards</p>
                    </div>
                </div>

                {/* Export Buttons from Reference Image */}
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-200 transition-colors bg-white font-bold text-xs uppercase shadow-sm">
                        <Award className="w-4 h-4 text-gray-500" />
                        Select Period
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#e3cd83] hover:bg-[#d4be72] border border-[#af8c30] text-[#735a16] transition-colors font-bold text-xs uppercase shadow-sm">
                        <Download className="w-4 h-4" />
                        Export PDF
                    </button>
                </div>
            </div>

            {/* Big Cards Tab Switcher */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Intro Club Card */}
                <button
                    onClick={() => setActiveTab('intro')}
                    className={`p-6 rounded-3xl flex flex-col items-start gap-12 border-2 transition-all text-left shadow-lg ${activeTab === 'intro'
                            ? 'bg-[#eef5fd] border-2 border-gray-400 shadow-blue-300'
                            : 'bg-white border border-gray-400 shadow-gray-400 hover:border-gray-200'
                        }`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${activeTab === 'intro' ? 'text-[#3b82f6]' : 'text-primary'
                        }`}>
                        <Award className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold uppercase mb-2 tracking-wide ${activeTab === 'intro' ? 'text-[#1e3a8a]' : 'text-gray-800'}`}>Intro Club</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'intro' ? 'text-[#3b82f6]' : 'text-gray-500'}`}>View detailed statement</p>
                    </div>
                </button>

                {/* Star Royalty Card */}
                <button
                    onClick={() => setActiveTab('star')}
                    className={`p-6 rounded-3xl flex flex-col items-start gap-12 border-2 transition-all text-left shadow-lg ${activeTab === 'star'
                            ? 'bg-[#eef5fd] border-2 border-gray-400 shadow-blue-300'
                            : 'bg-white border border-gray-400 shadow-gray-400 hover:border-gray-200'
                        }`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${activeTab === 'star' ? 'text-[#3b82f6]' : 'text-[#d97706]'
                        }`}>
                        <Crown className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold uppercase mb-2 tracking-wide ${activeTab === 'star' ? 'text-[#1e3a8a]' : 'text-gray-800'}`}>Star Royalty</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'star' ? 'text-[#3b82f6]' : 'text-gray-500'}`}>View detailed statement</p>
                    </div>
                </button>

                {/* Pay Per Royalty Card */}
                <button
                    onClick={() => setActiveTab('payper')}
                    className={`p-6 rounded-3xl flex flex-col items-start gap-12 border-2 transition-all text-left shadow-lg ${activeTab === 'payper'
                            ? 'bg-[#eef5fd] border-2 border-gray-400 shadow-blue-300'
                            : 'bg-white border border-gray-400 shadow-gray-400 hover:border-gray-200'
                        }`}
                >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-sm ${activeTab === 'payper' ? 'text-[#3b82f6]' : 'text-[#9333ea]'
                        }`}>
                        <BadgeDollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold uppercase mb-2 tracking-wide ${activeTab === 'payper' ? 'text-[#1e3a8a]' : 'text-gray-800'}`}>Pay Per Royalty</h3>
                        <p className={`text-xs font-bold uppercase tracking-wider ${activeTab === 'payper' ? 'text-[#3b82f6]' : 'text-gray-500'}`}>View detailed statement</p>
                    </div>
                </button>
            </div>

            {/* Content Area */}
            <div>
                {activeTab === 'intro' && <IntroductionClubContent />}
                {activeTab === 'star' && <StarRoyaltyContent />}
                {activeTab === 'payper' && <PayPerRoyaltyContent />}
            </div>
        </div>
    );
};

export default AllRewards;
