import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, RefreshCw, History, Activity } from 'lucide-react';

const InfoCard = ({ title, value, subtext, highlight, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-3 md:p-4 shadow-lg shadow-gray-400 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="flex justify-between items-start mb-2 md:mb-4">
            <h3 className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-wider leading-tight">{title}</h3>
            {Icon && (
                <div className="p-1.5 md:p-2 bg-gray-50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors shrink-0 ml-2">
                    <Icon className="w-3 h-3 md:w-4 md:h-4" />
                </div>
            )}
        </div>
        <div>
            <div className="text-xl md:text-2xl font-bold text-text-main mb-0.5 md:mb-1">{value}</div>
            {subtext && <div className={`text-[10px] md:text-xs font-bold ${highlight ? 'text-green-500' : 'text-text-muted'}`}>{subtext}</div>}
        </div>
    </div>
);

const BuyIMX = () => {
    const [slots, setSlots] = useState(1);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'buy', 'history'
    const tokenPrice = 0.1;
    const tokensPerSlot = 250;
    const slotValue = 25;

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <ShoppingCart className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase tracking-tight">PURCHASE CENTER</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase tracking-tight">PURCHASE CENTER</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase tracking-wide">ACQUIRE IMX VIA SECURE GATEWAY</p>
                </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden bg-[#d9dde0] p-1.5 rounded-full border border-gray-400 flex justify-between gap-1 mb-6 shadow-sm">
                <button
                    onClick={() => setActiveTab('overview')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'overview'
                        ? 'bg-[#e5e7e9] text-[#c9a05b] shadow-xl'
                        : 'text-[#58728d] hover:text-[#3b4c5d]'
                        }`}
                >
                    <Activity className="w-3.5 h-3.5" />
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab('buy')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'buy'
                        ? 'bg-[#e5e7e9] text-[#c9a05b] shadow-xl'
                        : 'text-[#58728d] hover:text-[#3b4c5d]'
                        }`}
                >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Buy Slot
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${activeTab === 'history'
                        ? 'bg-[#e5e7e9] text-[#c9a05b] shadow-xl'
                        : 'text-[#58728d] hover:text-[#3b4c5d]'
                        }`}
                >
                    <History className="w-3.5 h-3.5" />
                    History
                </button>
            </div>

            {/* Stats Grid */}
            <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ${activeTab === 'overview' ? 'block' : 'hidden'} md:grid`}>
                <InfoCard
                    title="Running Slab Slot"
                    value="Slab 1"
                    icon={TrendingUp}
                />
                <InfoCard
                    title="Current Price CPV IN $"
                    value="$0.1"
                    icon={TrendingUp}
                />
                <InfoCard
                    title="Tokens/Slot"
                    value="1 Slot = 250 IMX"
                    subtext="▲ $25.00"
                    highlight
                    icon={ShoppingCart}
                />
                <InfoCard
                    title="No of Slot"
                    value="0"
                    icon={TrendingUp}
                />
                <InfoCard
                    title="Total IMX"
                    value="undefined IMX"
                    icon={TrendingUp}
                />
                <InfoCard
                    title="Total Value"
                    value="$undefined"
                    icon={ShoppingCart}
                />
            </div>

            {/* Configuration Section */}
            <div className={`max-w-3xl mx-auto w-full ${activeTab === 'buy' ? 'block' : 'hidden'} md:block`}>
                <div className="bg-white rounded-3xl p-4 shadow-lg shadow-gray-600 border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <ShoppingCart className="w-32 h-32 text-white" />
                    </div>

                    <h2 className="text-center text-primary font-bold uppercase tracking-widest mb-8">Quantity</h2>

                    <div className="space-y-6 relative z-10">
                        {/* Custom Input with +/- buttons */}
                        <div className="bg-[#13161f] border border-[#2a2d36] rounded-xl flex items-center">
                            <button
                                onClick={() => setSlots(Math.max(1, slots - 1))}
                                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="text-2xl font-bold">-</span>
                            </button>

                            <input
                                type="number"
                                min="1"
                                value={slots}
                                onChange={(e) => setSlots(Math.max(1, parseInt(e.target.value) || 0))}
                                className="flex-1 bg-transparent text-white text-center text-2xl font-bold py-2 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />

                            <button
                                onClick={() => setSlots(slots + 1)}
                                className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                            >
                                <span className="text-2xl font-bold">+</span>
                            </button>
                        </div>

                        <div className="bg-[#13161f] rounded-xl p-3 border border-[#2a2d36]">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400 font-bold text-xs uppercase">Volume</span>
                                <span className="text-white font-bold text-lg">{slots * tokensPerSlot} IMX</span>
                            </div>
                            <div className="flex justify-between items-center bg-[#1a1c23] p-4 rounded-lg">
                                <span className="text-[#d4af37] font-bold text-xs uppercase">Est. Value</span>
                                <span className="text-[#d4af37] font-bold text-2xl">${(slots * slotValue).toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#d4af37] hover:bg-[#c19b26] text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-[#d4af37]/20">
                            Initiate Payment
                        </button>
                    </div>
                </div>
            </div>

            {/* Purchase Records */}
            <div className={`bg-white rounded-3xl shadow-gray-600 border border-gray-800 overflow-hidden shadow-lg ${activeTab === 'history' ? 'block' : 'hidden'} md:block`}>
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <History className="w-5 h-5 text-primary" />
                        <h2 className="text-black font-bold uppercase tracking-wide">Purchase Records</h2>
                    </div>
                    <button className="flex items-center space-x-2 bg-primary text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-primary/90 transition-colors">
                        <RefreshCw className="w-3 h-3" />
                        <span>Sync</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Date</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Total Lot</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Value</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Tokens</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Token Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="6" className="py-12 text-center text-gray-500 font-bold uppercase text-xs tracking-wider">
                                    No Transaction History Found
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BuyIMX;
