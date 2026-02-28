import React, { useState, useEffect } from 'react';
import { ShoppingCart, TrendingUp, RefreshCw, History, Activity, Loader } from 'lucide-react';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';

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

const TokenValuationTable = () => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-400 border border-gray-300 mt-8">
        <div className="bg-[#1f4a3e] py-6 px-6 text-center text-white relative overflow-hidden">
            <h2 className="text-xl font-bold tracking-widest uppercase">Token Valuation Benefit</h2>
            <p className="text-[#c9a05b] text-xs font-bold uppercase mt-2">Get Token Valuation as 5X to 10X & much more at listing time</p>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                    <h3 className="font-bold text-gray-800 uppercase text-xs">Token Distribution</h3>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                    <h3 className="font-bold text-gray-800 uppercase text-xs">Token P2P Trading</h3>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                    <h3 className="font-bold text-gray-800 uppercase text-xs">Token Exchange Listing</h3>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Phase</th>
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Step</th>
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Phase Step</th>
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Phase Price</th>
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Valuation</th>
                            <th className="py-3 px-4 text-[10px] md:text-xs font-bold uppercase tracking-wider">Get Return</th>
                        </tr>
                    </thead>
                    <tbody className="text-xs md:text-sm">
                        <tr className="bg-blue-50 border-b border-blue-100">
                            <td className="py-3 px-4 font-bold text-blue-900" rowSpan="2">PHASES -1</td>
                            <td className="py-3 px-4 text-blue-800" rowSpan="2">TOKEN DISTRIBUTION</td>
                            <td className="py-3 px-4 text-blue-800 font-medium">START PRISE</td>
                            <td className="py-3 px-4 font-bold">0.10 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">250 $</td>
                            <td className="py-3 px-4 font-bold text-gray-500">0%</td>
                        </tr>
                        <tr className="bg-blue-50/50 border-b border-blue-200">
                            <td className="py-3 px-4 text-blue-800 font-medium">END PRISE</td>
                            <td className="py-3 px-4 font-bold">0.20 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">100%</td>
                        </tr>

                        <tr className="bg-purple-50 border-b border-purple-100">
                            <td className="py-3 px-4 font-bold text-purple-900" rowSpan="2">PHASE -2</td>
                            <td className="py-3 px-4 text-purple-800" rowSpan="2">TOKEN P2P TRADING</td>
                            <td className="py-3 px-4 text-purple-800 font-medium">START PRISE</td>
                            <td className="py-3 px-4 font-bold">0.20 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">100%</td>
                        </tr>
                        <tr className="bg-purple-50/50 border-b border-purple-200">
                            <td className="py-3 px-4 text-purple-800 font-medium">END PRISE</td>
                            <td className="py-3 px-4 font-bold">1.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">2500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">500%</td>
                        </tr>

                        <tr className="bg-green-50 border-b border-green-100">
                            <td className="py-3 px-4 font-bold text-green-900" rowSpan="5">PHASE -3</td>
                            <td className="py-3 px-4 text-green-800" rowSpan="5">TOKEN LISTING</td>
                            <td className="py-3 px-4 text-green-800 font-medium">START PRISE</td>
                            <td className="py-3 px-4 font-bold">1.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">2500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">500%</td>
                        </tr>
                        <tr className="bg-green-50/50 border-b border-green-100">
                            <td className="py-3 px-4 text-green-800 font-medium">POTENTIAL PRISE</td>
                            <td className="py-3 px-4 font-bold">2.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">5000 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">1000%</td>
                        </tr>
                        <tr className="bg-green-50/50 border-b border-green-100">
                            <td className="py-3 px-4 text-green-800 font-medium">POTENTIAL PRISE</td>
                            <td className="py-3 px-4 font-bold">3.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">7500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">1500%</td>
                        </tr>
                        <tr className="bg-green-50/50 border-b border-green-100">
                            <td className="py-3 px-4 text-green-800 font-medium">POTENTIAL PRISE</td>
                            <td className="py-3 px-4 font-bold">5.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">12500 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">2500%</td>
                        </tr>
                        <tr className="bg-green-50/50">
                            <td className="py-3 px-4 text-green-800 font-medium">POTENTIAL PRISE</td>
                            <td className="py-3 px-4 font-bold">10.0 $</td>
                            <td className="py-3 px-4 font-bold text-[#c9a05b]">25000 $</td>
                            <td className="py-3 px-4 font-bold text-green-600">5000%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const BuyIMX = () => {
    const [slots, setSlots] = useState(1);
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'buy', 'history'
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);

    const tokenPrice = 0.1;
    const tokensPerSlot = 250;
    const slotValue = 25;

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const res = await api.get('/wallet/history');
            const deposits = res.data.filter(tx => tx.type === 'Deposit');
            setTransactions(deposits);
        } catch (error) {
            console.error('Failed to fetch history', error);
        }
    };

    const handleBuy = async () => {
        setIsLoading(true);
        try {
            await api.post('/wallet/buy-imx', { slots });
            alert('IMX Purchased Successfully!');
            setActiveTab('history');
            fetchHistory();
            useAuthStore.getState().loadUser(); // Refresh global user state for balance
        } catch (error) {
            alert(error.response?.data?.message || 'Transaction Failed');
        } finally {
            setIsLoading(false);
        }
    };

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



            {/* Two Column Layout Wrapper */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Left Column: Purchase Card */}
                <div className={`lg:col-span-1 ${activeTab === 'buy' || activeTab === 'overview' ? 'block' : 'hidden'} md:block w-full`}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg shadow-gray-400 border border-gray-300">
                        {/* Top Golden Section (Reference image 2 style) */}
                        <div className="bg-[#e4ca17] py-8 px-6 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[180px]">
                            {/* Decorative Star/Shapes */}
                            <div className="absolute top-0 right-0 p-2 opacity-20 transform translate-x-1/4 -translate-y-1/4">
                                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a89000]">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </div>

                            <div className="relative z-10 flex flex-col items-center">
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#7a6b14] text-[#4d420a] text-xs font-bold uppercase mb-4 shadow-sm bg-[#e4ca17]/80">
                                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    Most Popular
                                </span>
                                <h2 className="text-2xl font-bold text-[#1f4a3e] tracking-tight mb-2">Purchase IMX</h2>
                                <div className="flex items-start justify-center gap-1 text-[#1f4a3e]">
                                    <span className="text-xl font-bold mt-1">$</span>
                                    <span className="text-5xl font-black tracking-tighter">{(slots * slotValue).toFixed(0)}</span>
                                </div>
                                <p className="text-[#1f4a3e] font-bold text-sm mt-3">Lifetime Access</p>
                            </div>

                            {/* Center bottom indicator block */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-4 bg-[#b89f0e] rounded-b-lg"></div>
                        </div>

                        {/* Bottom White Section - Quantity & Payment */}
                        <div className="p-6 bg-white flex flex-col items-center space-y-6">

                            {/* "Active Account" styled text from image 2 - optionally keeping it or replacing it as requested. 
                                User: "active acount aur links ki jagah quantity aayega" 
                            */}

                            {/* Quantity Component (Reference image 1 style) */}
                            <div className="w-full bg-white border border-gray-200 rounded-2xl p-0 shadow-sm">
                                <h3 className="text-center text-[#d4af37] font-bold uppercase tracking-widest text-sm mb-4">Quantity</h3>

                                <div className="space-y-4">
                                    {/* Custom Input with +/- buttons */}
                                    <div className="bg-primary rounded-xl flex items-center justify-between p-1">
                                        <button
                                            onClick={() => setSlots(Math.max(1, slots - 1))}
                                            className="w-10 h-10 flex items-center justify-center text-gray-800 hover:text-white transition-colors"
                                        >
                                            <span className="text-xl font-bold">-</span>
                                        </button>

                                        <input
                                            type="number"
                                            min="1"
                                            value={slots}
                                            onChange={(e) => setSlots(Math.max(1, parseInt(e.target.value) || 0))}
                                            className="w-full max-w-[100px] bg-transparent text-white text-center text-xl font-bold py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />

                                        <button
                                            onClick={() => setSlots(slots + 1)}
                                            className="w-10 h-10 flex items-center justify-center text-gray-800 hover:text-white transition-colors"
                                        >
                                            <span className="text-xl font-bold">+</span>
                                        </button>
                                    </div>

                                    {/* Volume & Est Value Box */}
                                    <div className="bg-[#111827] rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-gray-400 font-bold text-[10px] uppercase tracking-wider">Volume</span>
                                            <span className="text-white font-bold text-sm">{slots * tokensPerSlot} IMX</span>
                                        </div>
                                        <div className="flex justify-between items-center bg-[#1f2937] p-3 rounded-lg">
                                            <span className="text-[#d4af37] font-bold text-[10px] uppercase tracking-wider">Est. Value</span>
                                            <span className="text-[#d4af37] font-bold text-xl">${(slots * slotValue).toFixed(2)}</span>
                                        </div>
                                    </div>

                                    {/* Initiate Payment Button */}
                                    <button
                                        onClick={handleBuy}
                                        disabled={isLoading}
                                        className="w-full bg-[#d4af37] flex items-center justify-center hover:bg-[#c19b26] text-black font-bold py-3.5 rounded-xl uppercase tracking-wider text-sm transition-all transform active:scale-95 shadow-md shadow-[#d4af37]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : 'Initiate Payment'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Purchase Records */}
                <div className={`lg:col-span-2 space-y-6 ${activeTab === 'history' || activeTab === 'overview' ? 'block' : 'hidden'} md:block`}>

                    {/* CapTok Balance Display (Image 6 Rule 8) */}
                    <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-400 border border-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Activity className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CAPTOK WALLET BALANCE</p>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {useAuthStore.getState().user?.wallet?.captok?.main?.toLocaleString() || 0} IMX
                                </h3>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">VALUE IN USDT</p>
                            <h3 className="text-xl font-bold text-green-600">
                                ${((useAuthStore.getState().user?.wallet?.captok?.main || 0) * tokenPrice).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-gray-400 shadow-lg border border-gray-400 flex flex-col overflow-hidden min-h-[500px]">
                        <div className="p-6  flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                    <History className="w-4 h-4 text-primary" />
                                </div>
                                <h2 className="text-gray-800 text-sm font-bold uppercase tracking-wide">Purchase Records</h2>
                            </div>
                            <button
                                onClick={fetchHistory}
                                className="flex items-center space-x-2 bg-primary border border-gray-400 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase hover:bg-gray-50 hover:text-gray-900 transition-colors shadow-lg shadow-gray-400"
                            >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Sync</span>
                            </button>
                        </div>

                        <div className="flex-1 overflow-x-auto p-0">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-y border-gray-400 bg-gray-50/80">
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Lot</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Value</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tokens</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Token Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.length > 0 ? (
                                        transactions.map(tx => {
                                            const purchasedSlots = tx.amount / tokensPerSlot;
                                            return (
                                                <tr key={tx._id} className="border-b border-gray-200 hover:bg-gray-50/50">
                                                    <td className="py-4 px-6 text-[10px] font-bold text-gray-700 whitespace-nowrap">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-4 px-6 text-sm font-bold text-gray-900">{purchasedSlots}</td>
                                                    <td className="py-4 px-6 text-sm font-bold text-gray-900">${(purchasedSlots * slotValue).toFixed(2)}</td>
                                                    <td className="py-4 px-6 text-sm font-bold text-primary">{tx.amount} IMX</td>
                                                    <td className="py-4 px-6">
                                                        <span className={`px-2.5 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider`}>
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-[10px] font-bold text-gray-500 uppercase">CapTok</td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="py-24 text-center">
                                                <div className="flex flex-col items-center justify-center opacity-50">
                                                    <ShoppingCart className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1} />
                                                    <span className="text-gray-500 font-bold uppercase text-xs tracking-wider">No Transaction History Found</span>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Token Valuation Table appended to the bottom of the page */}
            <div className={`${activeTab === 'overview' ? 'block' : 'hidden'} md:block`}>
                <TokenValuationTable />
            </div>

        </div>
    );
};

export default BuyIMX;
