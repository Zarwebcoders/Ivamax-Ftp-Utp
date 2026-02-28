import React, { useState, useEffect } from 'react';
import { FileText, History, DollarSign, Calendar, TrendingUp, Clock, Activity, ArrowRightLeft, Loader } from 'lucide-react';
import api from '../lib/axios';

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

const DSPSlabTable = () => {
    const slabs = [
        { sr: 1, package: 50, daily: '0.100', monthly: '3.00' },
        { sr: 2, package: 250, daily: '0.125', monthly: '3.75' },
        { sr: 3, package: 500, daily: '0.150', monthly: '4.50' },
        { sr: 4, package: 1000, daily: '0.175', monthly: '5.25' },
        { sr: 5, package: 2500, daily: '0.200', monthly: '6.00' },
        { sr: 6, package: 5000, daily: '0.225', monthly: '6.75' },
        { sr: 7, package: 10000, daily: '0.250', monthly: '7.50' },
        { sr: 8, package: 25000, daily: '0.275', monthly: '8.25' },
        { sr: 9, package: 50000, daily: '0.300', monthly: '9.00' },
        { sr: 10, package: 75000, daily: '0.325', monthly: '9.75' },
        { sr: 11, package: 100000, daily: '0.350', monthly: '10.50' },
    ];

    return (
        <div className="bg-white rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden mb-6">
            <div className="p-4 border-b border-gray-800 bg-gray-50 flex items-center justify-center">
                <h3 className="text-black font-black uppercase text-sm tracking-widest text-center">DSP STAKE PACKAGE SYSTEM</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-center">
                    <thead className="bg-[#d4a04d] text-white">
                        <tr>
                            <th className="py-2 px-4 text-[10px] font-bold uppercase border-r border-[#be8e40]">SR.NO.</th>
                            <th className="py-2 px-4 text-[10px] font-bold uppercase border-r border-[#be8e40]">STAKE PACKAGE ($)</th>
                            <th className="py-2 px-4 text-[10px] font-bold uppercase border-r border-[#be8e40]">DAILY %</th>
                            <th className="py-2 px-4 text-[10px] font-bold uppercase">MONTHLY %</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slabs.map((slab, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="py-2 px-4 text-xs font-bold text-gray-700 border-r border-gray-200">{slab.sr}</td>
                                <td className="py-2 px-4 text-xs font-bold text-gray-700 border-r border-gray-200">{slab.package.toLocaleString()}</td>
                                <td className="py-2 px-4 text-xs font-bold text-gray-700 border-r border-gray-200">{slab.daily}</td>
                                <td className="py-2 px-4 text-xs font-bold text-gray-700">{slab.monthly}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">COUNT YOUR FIRST DAYS AFTER 7 DAYS OF INVESTMENT</p>
            </div>
        </div>
    );
};

const DRP = () => {
    const [amount, setAmount] = useState('');
    const [activeTab, setActiveTab] = useState('records');
    const [mobileTab, setMobileTab] = useState('overview'); // 'overview', 'invest', 'history'
    const [loading, setLoading] = useState(false);

    const handleInvest = async () => {
        if (!amount || amount < 50) {
            alert("Minimum investment is 50 Units (USDT)");
            return;
        }

        if (!confirm(`Are you sure you want to invest ${amount} Units ($${amount}) in DRP?`)) return;

        setLoading(true);
        try {
            await api.post('/stake/invest', {
                planType: 'DRP',
                amount: Number(amount)
            });
            alert('Staking Successful! ROI will start generating after 7 days.');
            setAmount('');
            // TODO: refresh history
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to invest');
        } finally {
            setLoading(false);
        }
    };

    const handleUnstake = async (stakeId) => {
        if (!confirm('Are you sure you want to exit this plan early? Your initial capital will be returned to CapTok.')) return;

        try {
            await api.post('/stake/unstake', { stakeId });
            alert('Unstake successful. Capital returned.');
            // TODO: refresh history
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to unstake');
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">DRP Stake</h1>
                        <p className="text-xs font-bold text-text-muted uppercase">Manage Your Daily Reward Package</p>
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
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 ${mobileTab === 'overview' ? 'block' : 'hidden'} md:grid mb-6`}>
                <SummaryCard title="No of Unit" value="0" />
                <SummaryCard title="DRP Investment" value="$0.00" subValue="0.00 IMX" />
                <SummaryCard title="DRP Profit" value="$0.00" subValue="0.00 IMX" />
            </div>

            {/* DSP Slab Table */}
            <div className={`${mobileTab === 'overview' ? 'block' : 'hidden'} md:block`}>
                <DSPSlabTable />
            </div>

            {/* 2-Column Layout */}
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 items-start ${mobileTab !== 'overview' ? 'block' : 'hidden'} md:grid`}>

                {/* Left Column: Invest DRP Stake Process */}
                <div className={`lg:col-span-1 bg-white rounded-3xl border border-gray-400 shadow-lg shadow-gray-400 p-8 ${mobileTab === 'invest' ? 'block' : 'hidden'} md:block`}>
                    <h2 className="text-black font-bold uppercase text-center mb-8 tracking-widest text-sm">Invest DRP Stake Process</h2>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-bold uppercase">
                            <span className="text-white bg-gray-700 px-3 py-1 rounded">Min. Investment :</span>
                            <span className="text-[#c9a05b]">$50.00 (CapTok)</span>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stake Volume ($)</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="Enter Amount"
                                    min="50"
                                    className="w-full bg-transparent border border-gray-700 text-black rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-[#d4af37] font-bold placeholder-gray-400"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            onClick={handleInvest}
                            className="w-full flex items-center justify-center bg-[#d4af37] hover:bg-[#c19b26] disabled:opacity-50 text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform hover:scale-[1.01] shadow-lg shadow-[#d4af37]/20"
                        >
                            {loading ? <Loader className="w-5 h-5 animate-spin" /> : 'Invest Now'}
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
                            DRP Stake Records
                        </button>
                        <button
                            onClick={() => setActiveTab('active')}
                            className={`flex-1 py-3 px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'active'
                                ? 'bg-[#d4af37] text-black shadow-md'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Active DRP Stake Detail
                        </button>
                        <button
                            onClick={() => setActiveTab('deactive')}
                            className={`flex-1 py-3 px-4 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'deactive'
                                ? 'bg-[#d4af37] text-black shadow-md'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Deactive DRP Stake Profit
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* 1. DRP Stake Records */}
                        {activeTab === 'records' && (
                            <HistoryTable
                                title="DRP Stake Records"
                                subtitle="History of all stakes"
                                icon={History}
                                columns={['SR.NO', 'DATE', 'STAKE VOLUME', 'STAKE VALUE', 'CURRENT STATUS']}
                                emptyMessage="No Stake Records Found"
                            />
                        )}

                        {/* 2. Active DRP Stake Detail */}
                        {activeTab === 'active' && (
                            <HistoryTable
                                title="Active DRP Stake Detail"
                                subtitle="Currently active stakes"
                                icon={TrendingUp}
                                columns={['SR.NO', 'ACTIVATE DATE', 'MATURITY DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'COMPLETE MONTH', 'CURRENT PROFIT', 'DETAIL']}
                                emptyMessage="No Active Stakes Found"
                                showViewAction={true}
                            />
                        )}

                        {/* 3. Deactive DRP Stake Profit */}
                        {activeTab === 'deactive' && (
                            <HistoryTable
                                title="Deactive DRP Stake Profit"
                                subtitle="Completed or Closed Stakes"
                                icon={DollarSign}
                                columns={['SR.NO', 'ACTIVATE DATE', 'CLOSING DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'COMPLETE MONTH', 'BOOKED PROFIT', 'DETAIL']}
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

export default DRP;
