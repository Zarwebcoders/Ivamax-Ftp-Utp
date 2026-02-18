import React, { useState } from 'react';
import { ShoppingCart, TrendingUp, RefreshCw, History } from 'lucide-react';

const InfoCard = ({ title, value, subtext, highlight, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-4 shadow-lg shadow-gray-400 hover:shadow-lg transition-all relative overflow-hidden group">
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</h3>
            {Icon && (
                <div className="p-2 bg-gray-50 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                </div>
            )}
        </div>
        <div>
            <div className="text-2xl font-bold text-text-main mb-1">{value}</div>
            {subtext && <div className={`text-xs font-bold ${highlight ? 'text-green-500' : 'text-text-muted'}`}>{subtext}</div>}
        </div>
    </div>
);

const BuyIMX = () => {
    const [slots, setSlots] = useState(1);
    const tokenPrice = 0.1;
    const tokensPerSlot = 250;
    const slotValue = 25;

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                    <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase tracking-tight">PURCHASE CENTER</h1>
                    <p className="text-sm font-bold text-text-muted uppercase tracking-wide">ACQUIRE IMX VIA SECURE GATEWAY</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="max-w-3xl mx-auto w-full">
                <div className="bg-black rounded-3xl p-8 shadow-lg shadow-gray-600 border border-gray-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <ShoppingCart className="w-32 h-32 text-white" />
                    </div>

                    <h2 className="text-center text-white font-bold uppercase tracking-widest mb-8">Configuration</h2>

                    <div className="space-y-6 relative z-10">
                        <div>
                            <input
                                type="number"
                                min="1"
                                value={slots}
                                onChange={(e) => setSlots(Math.max(1, parseInt(e.target.value) || 0))}
                                className="w-full bg-gray-900 border border-gray-700 text-white text-center text-2xl font-bold rounded-xl py-4 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>

                        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400 font-bold text-xs uppercase">Volume</span>
                                <span className="text-white font-bold text-lg">{slots * tokensPerSlot} IMX</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg">
                                <span className="text-primary font-bold text-xs uppercase">Est. Value</span>
                                <span className="text-primary font-bold text-2xl">${(slots * slotValue).toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform active:scale-95 shadow-lg shadow-primary/20">
                            Initiate Payment
                        </button>
                    </div>
                </div>
            </div>

            {/* Purchase Records */}
            <div className="bg-black rounded-3xl shadow-gray-600 border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <History className="w-5 h-5 text-primary" />
                        <h2 className="text-white font-bold uppercase tracking-wide">Purchase Records</h2>
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
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Date</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Total Lot</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Value</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tokens</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                                <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Token Type</th>
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
