import React, { useState } from 'react';
import { Award, Filter, Download, Crown, BadgeDollarSign, Trophy } from 'lucide-react';

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
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Level Rewards</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Introduction Club Reward Income History</p>
                </div>
            </div>

            <div className="bg-black rounded-3xl border border-gray-800 p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="text-white font-bold uppercase text-xs tracking-wider whitespace-nowrap">Filter by Level:</span>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 px-4 appearance-none font-bold text-xs uppercase focus:outline-none focus:border-primary cursor-pointer hover:bg-gray-800 transition-colors"
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

            <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-primary" />
                        <h3 className="text-white font-bold uppercase text-sm tracking-wider">Reward History</h3>
                    </div>

                    <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
                        <span className="text-[10px] text-gray-400 font-bold uppercase mr-2">Total:</span>
                        <span className="text-primary font-bold text-sm">0.00 IMX</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">From Address</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Reward Source</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
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
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Rank Rewards</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Monthly Rank Royalty Income Statement</p>
                </div>
            </div>

            <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <Crown className="w-4 h-4 text-primary" />
                    <h3 className="text-white font-bold uppercase text-sm tracking-wider">Your Royalty Earnings</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Rank Info</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Business Metrics</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Income</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="4" className="py-24 text-center">
                                    <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Royalty Income Found</p>
                                </td>
                            </tr>
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
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <BadgeDollarSign className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">PayPer Generation</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Passive Generation Reward Income History</p>
                </div>
            </div>

            <div className="bg-black rounded-3xl border border-gray-800 p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="text-white font-bold uppercase text-xs tracking-wider whitespace-nowrap">Filter by Level:</span>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 px-4 appearance-none font-bold text-xs uppercase focus:outline-none focus:border-primary cursor-pointer hover:bg-gray-800 transition-colors"
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

            <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <Download className="w-4 h-4 text-primary" />
                    <h3 className="text-white font-bold uppercase text-sm tracking-wider">Reward History</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Level Type</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Income Distribution Details</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
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
            <div className="bg-surface border border-gray-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <Trophy className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">All Rewards</h1>
                        <p className="text-sm font-bold text-text-muted uppercase">View and Manage All Your Ecosystem Rewards</p>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto max-w-full">
                    <button
                        onClick={() => setActiveTab('intro')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'intro'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Award className="w-4 h-4" />
                        <span>Intro Club</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('star')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'star'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Crown className="w-4 h-4" />
                        <span>Star Royalty</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('payper')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'payper'
                                ? 'bg-white text-primary shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <BadgeDollarSign className="w-4 h-4" />
                        <span>Pay Per Royalty</span>
                    </button>
                </div>
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
