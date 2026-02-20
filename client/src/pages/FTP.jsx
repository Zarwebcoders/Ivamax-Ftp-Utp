import React, { useState } from 'react';
import { FileText, History, DollarSign, Calendar, TrendingUp, Clock, Activity, ArrowRightLeft } from 'lucide-react';

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

const HistoryTable = ({ title, subtitle, columns, data = [], emptyMessage, icon: Icon, showViewAction }) => (
    <div className="bg-black rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center gap-3">
            {Icon && <div className="p-2 bg-gray-900 rounded-lg text-primary"><Icon className="w-4 h-4" /></div>}
            <div>
                <h3 className="text-white font-bold uppercase text-sm tracking-wider">{title}</h3>
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
                    <tr className="bg-gray-900/50">
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
                            <td colSpan={columns.length + (showViewAction ? 1 : 0)} className="py-16 text-center">
                                <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">{emptyMessage}</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

const FTP = () => {
    const [amount, setAmount] = useState('');
    const [activeTab, setActiveTab] = useState('records');
    const [mobileTab, setMobileTab] = useState('overview'); // 'overview', 'invest', 'history'

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">FTP Stake</h1>
                        <p className="text-xs font-bold text-text-muted uppercase">Manage Your Finance Tenure Package</p>
                    </div>
                </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden bg-black p-2 rounded-2xl border border-gray-800 flex gap-2">
                <button
                    onClick={() => setMobileTab('overview')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'overview'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <Activity className="w-5 h-5 mb-1" />
                    Stats
                </button>
                <button
                    onClick={() => setMobileTab('invest')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'invest'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <TrendingUp className="w-5 h-5 mb-1" />
                    Invest
                </button>
                <button
                    onClick={() => setMobileTab('history')}
                    className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${mobileTab === 'history'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    <History className="w-5 h-5 mb-1" />
                    Records
                </button>
            </div>

            {/* Top Summary Cards */}
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 ${mobileTab === 'overview' ? 'block' : 'hidden'} md:grid`}>
                <SummaryCard title="No of Unit" value="0" />
                <SummaryCard title="FTP Investment" value="$0.00" subValue="0.00 IMX" />
                <SummaryCard title="FTP Profit" value="$0.00" subValue="0.00 IMX" />
            </div>

            {/* Invest FTP Stake Process */}
            <div className={`bg-black rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 p-8 ${mobileTab === 'invest' ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-white font-bold uppercase text-center mb-8 tracking-widest text-sm">Invest FTP Stake Process</h2>

                <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                        <span className="text-white bg-gray-700 px-3 py-1 rounded">Available to Invest :</span>
                        <span className="text-primary">0.0000 IMX = $0.00</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stake Volume (Units)</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Enter Units"
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-primary font-bold placeholder-gray-600"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Term</label>
                        <div className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-4 px-4 font-bold flex justify-between items-center">
                            <span>24 MO</span>
                            <Clock className="w-4 h-4 text-gray-500" />
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20">
                        Invest Now
                    </button>
                </div>
            </div>

            {/* Tables Section with Tabs */}
            <div className={`space-y-6 ${mobileTab === 'history' ? 'block' : 'hidden'} md:block`}>
                {/* Custom Tab Navigation */}
                <div className="bg-black p-2 rounded-2xl border border-gray-800 flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTab('records')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'records'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        FTP Stake Records
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'active'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        Active FTP Stake Detail
                    </button>
                    <button
                        onClick={() => setActiveTab('deactive')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'deactive'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        Deactive FTP Stake Profit
                    </button>
                </div>

                {/* 1. FTP Stake Records */}
                {activeTab === 'records' && (
                    <HistoryTable
                        title="FTP Stake Records"
                        subtitle="History of all stakes"
                        icon={History}
                        columns={['SR.NO', 'DATE', 'STAKE VOLUME', 'STAKE VALUE', 'CURRENT STATUS']}
                        emptyMessage="No Stake Records Found"
                    />
                )}

                {/* 2. Active FTP Stake Detail */}
                {activeTab === 'active' && (
                    <HistoryTable
                        title="Active FTP Stake Detail"
                        subtitle="Currently active stakes"
                        icon={TrendingUp}
                        columns={['SR.NO', 'ACTIVATE DATE', 'MATURITY DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'COMPLETE MONTH', 'CURRENT PROFIT', 'DETAIL']}
                        emptyMessage="No Active Stakes Found"
                        showViewAction={true}
                    />
                )}

                {/* 3. Deactive FTP Stake Profit */}
                {activeTab === 'deactive' && (
                    <HistoryTable
                        title="Deactive FTP Stake Profit"
                        subtitle="Completed or Closed Stakes"
                        icon={DollarSign}
                        columns={['SR.NO', 'ACTIVATE DATE', 'CLOSING DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'COMPLETE MONTH', 'BOOKED PROFIT', 'DETAIL']}
                        emptyMessage="No Deactive Stakes Found"
                        showViewAction={true}
                    />
                )}
            </div>
        </div>
    );
};

export default FTP;
