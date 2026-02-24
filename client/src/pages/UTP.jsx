import React, { useState } from 'react';
import { Package, History, DollarSign, Activity, TrendingUp, Layers } from 'lucide-react';

const SummaryCard = ({ title, value, subValue }) => (
    <div className="bg-surface border border-gray-400 shadow-lg shadow-gray-600 hover:shadow-md rounded-2xl md:rounded-3xl p-3 md:p-6 transition-all group relative overflow-hidden flex flex-col items-center justify-center">
        <div className="relative z-10 text-center w-full">
            <h3 className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-wider mb-1 md:mb-2 leading-tight">{title}</h3>
            <div className="text-xl md:text-2xl font-bold text-text-main mb-0.5 md:mb-1">{value}</div>
            {subValue && <div className="text-[9px] md:text-xs font-bold text-primary">{subValue}</div>}
        </div>
        {/* Decorative background */}
        <div className="absolute -bottom-6 -right-6 w-16 md:w-24 h-16 md:h-24 rounded-full blur-2xl opacity-50 bg-primary/10"></div>
    </div>
);

const HistoryTable = ({ title, subtitle, columns, data = [], emptyMessage, icon: Icon, showViewAction, showCloseAction }) => (
    <div className="bg-white rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
            {Icon && <div className="p-2 bg-primary rounded-lg text-white"><Icon className="w-4 h-4" /></div>}
            <div>
                <h3 className="text-black font-bold uppercase text-sm tracking-wider">{title}</h3>
                {subtitle && <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wide">{subtitle}</p>}
            </div>

            <div className="ml-auto">
                <button className="text-[10px] font-bold uppercase text-gray-400 border border-gray-700 rounded-lg px-3 py-1 hover:bg-gray-800 transition-colors">
                    Total: {data.length}
                </button>
            </div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-gray-800">
                        {columns.map((col, idx) => (
                            <th key={idx} className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                {Object.values(row).map((val, i) => (
                                    <td key={i} className="py-4 px-6 text-xs text-gray-300 font-medium whitespace-nowrap">{val}</td>
                                ))}
                                {showCloseAction && (
                                    <td className="py-4 px-6 text-xs text-center">
                                        <button className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/50 hover:bg-yellow-500 hover:text-black transition-all rounded px-3 py-1 text-[10px] font-bold uppercase">
                                            Close
                                        </button>
                                    </td>
                                )}
                                {showViewAction && (
                                    <td className="py-4 px-6 text-xs text-center">
                                        <button className="bg-primary/20 text-primary border border-primary/50 hover:bg-primary hover:text-black transition-all rounded px-3 py-1 text-[10px] font-bold uppercase">
                                            View
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length + (showViewAction ? 1 : 0) + (showCloseAction ? 1 : 0)} className="py-16 text-center">
                                <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">{emptyMessage}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const UTP = () => {
    const [units, setUnits] = useState('');
    const [activeTab, setActiveTab] = useState('records');
    const [mobileTab, setMobileTab] = useState('overview'); // 'overview', 'invest', 'history'

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <Package className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">UTP Stake</h1>
                        <p className="text-xs font-bold text-text-muted uppercase">Manage Your United Tenure Package</p>
                    </div>
                </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden bg-gray-300 p-2 rounded-2xl border border-gray-800 flex gap-2">
                <button
                    onClick={() => setMobileTab('overview')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'overview'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-500 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <Activity className="w-5 h-5 mb-1" />
                    Stats
                </button>
                <button
                    onClick={() => setMobileTab('invest')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'invest'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-500 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <TrendingUp className="w-5 h-5 mb-1" />
                    Invest
                </button>
                <button
                    onClick={() => setMobileTab('history')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'history'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-500 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <History className="w-5 h-5 mb-1" />
                    Records
                </button>
            </div>

            {/* Top Summary Cards */}
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 ${mobileTab === 'overview' ? 'block' : 'hidden'} md:grid`}>
                <SummaryCard title="UTP No of Unit" value="0" />
                <SummaryCard title="UTP Investment" value="$0.00" subValue="0.00 IMX" />
                <SummaryCard title="UTP Profit" value="$0.00" subValue="0.00 IMX" />
            </div>

            {/* 2-Column Layout */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 items-start ${mobileTab !== 'overview' ? 'block' : 'hidden'} md:grid`}>

                {/* Left Column: Invest UTP Stake Process */}
                <div className={`lg:col-span-1 bg-white rounded-3xl border border-gray-400 shadow-lg shadow-gray-400 p-8 ${mobileTab === 'invest' ? 'block' : 'hidden'} md:block`}>
                    <h2 className="text-black font-bold uppercase text-center mb-8 tracking-widest text-sm">Invest UTP Stake Process</h2>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-bold uppercase">
                            <span className="text-white bg-gray-700 px-3 py-1 rounded">Available :</span>
                            <span className="text-[#c9a05b]">0.0000 IMX = $0.00</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stake Volume (Units)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Min 1"
                                    min="1"
                                    className="w-full bg-transparent border border-gray-700 text-black rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-[#d4af37] font-bold placeholder-gray-400"
                                    value={units}
                                    onChange={(e) => setUnits(e.target.value)}
                                />
                            </div>
                            {units && Number(units) > 0 && (
                                <p className="text-xs font-bold text-emerald-600 mt-2 text-right">
                                    Total Investment: ${(Number(units) * 50).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            )}
                        </div>

                        <button className="w-full bg-[#d4af37] hover:bg-[#c19b26] text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-[#d4af37]/20">
                            Invest Now
                        </button>
                    </div>
                </div>

                {/* Right Column: Tables Section with Tabs */}
                <div className={`lg:col-span-2 space-y-6 ${mobileTab === 'history' ? 'block' : 'hidden'} md:block`}>
                    {/* Custom Tab Navigation */}
                    <div className="bg-gray-300 p-2 rounded-lg border border-gray-400 flex flex-wrap gap-2 shadow-sm">
                        <button
                            onClick={() => setActiveTab('records')}
                            className={`flex-1 py-3 px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'records'
                                ? 'bg-[#d4af37] text-black shadow-md'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            UTP Stake Records
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`flex-1 py-3 px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'active'
                                ? 'bg-[#d4af37] text-black shadow-md'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Active UTP Stake Detail
                        </button>
                        <button
                            onClick={() => setActiveTab('deactive')}
                            className={`flex-1 py-3 px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'deactive'
                                ? 'bg-[#d4af37] text-black shadow-md'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Deactive UTP Stake Profit
                        </button>
                    </div>

                    <div className="space-y-6">

                        {/* 1. UTP Stake Records */}
                        {activeTab === 'records' && (
                            <HistoryTable
                                title="UTP Stake Records"
                                subtitle="History of all stakes"
                                icon={History}
                                columns={['SR.NO', 'DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS']}
                                emptyMessage="No Stake Records Found"
                            />
                        )}

                        {/* 2. Active UTP Stake Detail */}
                        {activeTab === 'active' && (
                            <HistoryTable
                                title="Active UTP Stake Detail"
                                subtitle="Currently active stakes"
                                icon={TrendingUp}
                                columns={['SR.NO', 'ACTIVATE DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'LAST ROC DATE', 'LAST ROC %', 'TOTAL PROFIT', 'ACTION', 'DETAIL']}
                                emptyMessage="No Active Stakes Found"
                                showCloseAction={true} // For 'ACTION' column (Close button)
                                showViewAction={true}  // For 'DETAIL' column (View button)
                            />
                        )}

                        {/* 3. Deactive UTP Stake Profit */}
                        {activeTab === 'deactive' && (
                            <HistoryTable
                                title="Deactive UTP Stake Profit"
                                subtitle="Completed or Closed Stakes"
                                icon={DollarSign}
                                columns={['SR.NO', 'ACTIVATE DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'LAST ROC DATE', 'LAST ROC %', 'TOTAL PROFIT', 'DETAIL']}
                                emptyMessage="No Deactive Stakes Found"
                                showViewAction={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UTP;
