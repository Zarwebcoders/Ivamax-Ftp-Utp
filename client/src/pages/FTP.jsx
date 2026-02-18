import React, { useState } from 'react';
import { FileText, History, DollarSign, Calendar, TrendingUp, Clock } from 'lucide-react';

const BalanceCard = ({ title, imxValue, usdValue, code }) => (
    <div className="bg-surface border border-gray-400 shadow-lg shadow-gray-600 hover:shadow-md rounded-3xl p-6 transition-all group relative overflow-hidden">
        <div className="flex justify-between items-start mb-4 relative z-10">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">{title}</h3>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border text-white ${code === 'C' ? 'bg-primary text-primary border-primary' : 'bg-secondary text-secondary border-secondary'}`}>
                {code}
            </div>
        </div>
        <div className="relative z-10">
            <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs font-bold text-gray-400">IMX</span>
                <span className="text-2xl font-bold text-text-main">{imxValue}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-gray-400">$ VALUE</span>
                <span className={`text-base font-bold ${code === 'C' ? 'text-primary' : 'text-secondary'}`}>{usdValue}</span>
            </div>
        </div>
        {/* Decorative background */}
        <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-50 ${code === 'C' ? 'bg-primary/10' : 'bg-secondary/10'}`}></div>
    </div>
);

const HistoryTable = ({ title, subtitle, columns, data = [], emptyMessage, icon: Icon }) => (
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={columns.length} className="py-16 text-center">
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

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Finance Tenure Package</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Finance Tenure Package</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Earn Rewards by purchasing for a fixed 24-month term</p>
                </div>
            </div>

            {/* Top Balances */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BalanceCard title="Captok Balance" imxValue="0.0000" usdValue="$0.00" code="C" />
                <BalanceCard title="FTP Protok Balance" imxValue="0.0000" usdValue="$0.00" code="P" />
            </div>

            {/* Create Investment (Dark Theme Container to match image) */}
            <div className="bg-black rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 p-8">
                <h2 className="text-white font-bold uppercase text-center mb-8 tracking-widest text-sm">Create New Investment</h2>

                <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                        <span className="text-white bg-gray-700 px-3 py-1 rounded">Available to Invest :</span>
                        <span className="text-primary">0.0000 IMX = $0.00</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Investment Amount ($)</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Min $50"
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

            {/* History Tables */}
            <div className="space-y-8">
                <HistoryTable
                    title="FTP Investment History"
                    subtitle="Compounding & Growth Records"
                    icon={TrendingUp}
                    columns={['SR No', 'Stake Amount', 'Monthly Fix', 'Start Date', 'Maturity Date', '6M (25%)', '12M (60%)', '18M (100%)', '24M (150%)', 'Profit']}
                    emptyMessage="No Active FTP Records"
                />

                <HistoryTable
                    title="Captok Transition History"
                    subtitle="Credits, Debits & Rewards Log"
                    icon={History}
                    columns={['SR No', 'Transition Date', 'Transition Amount', 'Transition Tokens', 'Transition Type', 'Source']}
                    emptyMessage="No Transition History Found"
                />

                <HistoryTable
                    title="FTP Pro-Tok History"
                    subtitle="Rewards & Yield Distribution Log"
                    icon={History}
                    columns={['SR No', 'Transition Date', 'Invested Amount', 'Plan Status', 'Booked Profit', 'Type', 'Source']}
                    emptyMessage="No FTP Pro-Tok History Found"
                />
            </div>
        </div>
    );
};

export default FTP;
