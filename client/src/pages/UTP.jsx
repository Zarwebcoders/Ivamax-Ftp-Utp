import React, { useState } from 'react';
import { Package, History, DollarSign, Activity, TrendingUp, Layers } from 'lucide-react';

const SummaryCard = ({ title, value, subValue }) => (
    <div className="bg-surface border border-gray-400 shadow-lg shadow-gray-600 hover:shadow-md rounded-3xl p-6 transition-all group relative overflow-hidden">
        <div className="relative z-10 text-center">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">{title}</h3>
            <div className="text-2xl font-bold text-text-main mb-1">{value}</div>
            {subValue && <div className="text-xs font-bold text-primary">{subValue}</div>}
        </div>
        {/* Decorative background */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-50 bg-primary/10"></div>
    </div>
);

const HistoryTable = ({ title, subtitle, columns, data = [], emptyMessage, icon: Icon, showViewAction, showCloseAction }) => (
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

            {/* Top Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SummaryCard title="UTP No of Unit" value="0" />
                <SummaryCard title="UTP Investment" value="$0.00" subValue="0.00 IMX" />
                <SummaryCard title="UTP Profit" value="$0.00" subValue="0.00 IMX" />
            </div>

            {/* Invest UTP Stake Process */}
            <div className="bg-black rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 p-8">
                <h2 className="text-white font-bold uppercase text-center mb-8 tracking-widest text-sm">Invest UTP Stake Process</h2>

                <div className="space-y-6">
                    <div className="flex justify-between items-center text-xs font-bold uppercase">
                        <span className="text-white bg-gray-700 px-3 py-1 rounded">Available :</span>
                        <span className="text-primary">0.0000 IMX = $0.00</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Stake Volume (Units)</label>
                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Min 1"
                                className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:border-primary font-bold placeholder-gray-600"
                                value={units}
                                onChange={(e) => setUnits(e.target.value)}
                            />
                        </div>
                    </div>

                    <button className="w-full bg-primary hover:bg-primary/90 text-black font-bold py-4 rounded-xl uppercase tracking-wider transition-all transform hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-primary/20">
                        Invest Now
                    </button>
                </div>
            </div>

            {/* Tables Section with Tabs */}
            <div className="space-y-6">
                {/* Custom Tab Navigation */}
                <div className="bg-black p-2 rounded-2xl border border-gray-800 flex flex-wrap gap-2">
                    <button
                        onClick={() => setActiveTab('records')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'records'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        UTP Stake Records
                    </button>
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'active'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        Active UTP Stake Detail
                    </button>
                    <button
                        onClick={() => setActiveTab('deactive')}
                        className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${activeTab === 'deactive'
                            ? 'bg-primary text-black shadow-lg shadow-primary/20'
                            : 'text-gray-400 hover:text-white hover:bg-gray-900'
                            }`}
                    >
                        Deactive UTP Stake Profit
                    </button>
                </div>

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
                        columns={['SR.NO', 'ACTIVATE DATE', 'STAKE VOLUME', 'STAKE VALUE', 'STATUS', 'LAST ROC DATE', 'LAST ROC %', 'TOTAL PROFIT', 'ACTION', 'DETAIL']}
                        emptyMessage="No Deactive Stakes Found"
                        showCloseAction={false} // Screenshot shows 'CLOSED' text in Action column, but for now buttons in my mock. Actually, user screenshot says 'CLOSED' text. 
                        // I will adapt HistoryTable to handle text vs button if needed, but for now I'll use the same structure or just verify.
                        // The user screenshot for Deactive shows 'CLOSED' under ACTION and 'VIEW' under DETAIL.
                        // My HistoryTable `showCloseAction` adds a button. I might need a different prop or logic if it's just text.
                        // However, since row data maps to columns, if I pass 'CLOSED' in the data for that column, it works.
                        // But wait, the previous `showViewAction` added a whole TD.
                        // If I want 'CLOSED' text in a column named ACTION, I should just include it in the data.
                        // But for Active, I want a BUTTON.
                        // So for Active, I use `showCloseAction` prop to force a button column?
                        // Actually, looking at the screenshot: Active has 'CLOSE' button (yellow). Deactive has 'CLOSED' text.
                        // So for Deactive, I should NOT use `showCloseAction` and instead rely on data having 'CLOSED'.
                        // AND I should use `showViewAction` for the View button.
                        // Columns buffer:
                        // Active: ... PROFIT | ACTION (Button) | DETAIL (Button)
                        // Deactive: ... PROFIT | ACTION (Text) | DETAIL (Button)
                        // My `HistoryTable` adds `showCloseAction` as a TD.
                        // If I want text for Deactive, I should just include 'CLOSED' in the row data and have 'ACTION' in the columns list.
                        // But for Active, I want a button.
                        // If I use `showCloseAction`, it adds an extra TD.
                        // So for Active: Columns = [..., PROFIT, DETAIL]. Props: showCloseAction=true (adds Action col?), showViewAction=true (adds Detail col?).
                        // My implementation of `HistoryTable`:
                        // showCloseAction adds a TD. showViewAction adds a TD.
                        // So for Active: Columns should NOT include 'ACTION' or 'DETAIL' in the text list if they are pure button columns added by props?
                        // Let's check my Previous FTP implementation.
                        // FTP Active: Columns included 'DETAIL'. I added `showViewAction` which added a TD.
                        // So I had N columns in header, N-1 in data + 1 in props = N columns total.
                        // So if I want 'ACTION' and 'DETAIL' headers:
                        // Active: Columns=[..., 'ACTION', 'DETAIL']. Data has neither. Props: showCloseAction + showViewAction.
                        // Deactive: Columns=[..., 'ACTION', 'DETAIL']. Data has 'CLOSED' for Action. Props: showViewAction only.
                        // This implies mixed logic.
                        // For simplicity in this `replace_file_content` (since I can't write complex logic in one shot easily without errors), 
                        // I will stick to the props adding buttons.
                        // So for Active: showCloseAction=true, showViewAction=true.
                        // For Deactive: showViewAction=true. 'ACTION' column will need to be handled.
                        // I'll just render the columns as per screenshot and assume data will match or I'll adjust.
                        // The user just wants the structure/design.
                        showViewAction={true}
                    />
                )}
            </div>
        </div>
    );
};

export default UTP;
