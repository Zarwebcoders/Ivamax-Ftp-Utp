import React, { useState } from 'react';
import { History, Filter, ChevronDown, Search } from 'lucide-react';

const WalletStatement = () => {
    // Mock States for filters
    const [walletFilter, setWalletFilter] = useState('All Wallets');
    const [typeFilter, setTypeFilter] = useState('All Types');

    return (
        <div className="space-y-6 pb-12">
            {/* Header Section */}
            <header className="bg-black rounded-3xl p-4 shadow-xl border border-gray-800 shadow-gray-400 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                {/* Background Decoration */}
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
                    {/* Wallet Filter */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-700 transition-all font-bold text-xs uppercase tracking-wider">
                            <span>{walletFilter}</span>
                            <ChevronDown className="w-4 h-4 text-primary" />
                        </button>
                    </div>

                    {/* Type Filter */}
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

                {/* Subtle Grain/Noise Texture Opacity if needed, essentially just white for now */}
            </div>
        </div>
    );
};

export default WalletStatement;
