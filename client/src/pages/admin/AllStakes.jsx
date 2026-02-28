import React, { useState, useEffect } from 'react';
import { Activity, Search, Filter, RefreshCcw, TrendingUp } from 'lucide-react';
import api from '../../lib/axios';

const AllStakes = () => {
    const [stakes, setStakes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterPlan, setFilterPlan] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [search, setSearch] = useState('');

    const fetchStakes = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/stakes');
            setStakes(res.data);
        } catch (error) {
            console.error("Failed to fetch stakes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStakes();
    }, []);

    const StatusBadge = ({ status }) => {
        const styles = {
            Active: 'bg-green-100 text-green-700 border border-green-200',
            Completed: 'bg-blue-100 text-blue-700 border border-blue-200',
            Cancelled: 'bg-red-100 text-red-700 border border-red-200'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[status]}`}>
                {status}
            </span>
        );
    };

    const PlanBadge = ({ planType }) => {
        const isDSP = planType === 'DSP' || planType === 'DRP';
        return (
            <span className={`px-2 py-1 flex items-center gap-1 rounded text-xs font-bold uppercase tracking-wider border ${isDSP ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-purple-50 text-purple-700 border-purple-200'}`}>
                {isDSP ? 'DRP (DSP)' : 'UTP (USP)'}
            </span>
        );
    };

    const filteredStakes = stakes.filter(s => {
        const matchesPlan = filterPlan === 'All' || s.planType === filterPlan || (filterPlan === 'DSP' && s.planType === 'DRP') || (filterPlan === 'UTP' && s.planType === 'USP');
        const matchesStatus = filterStatus === 'All' || s.status === filterStatus;
        const matchesSearch =
            s.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
            s.userId?.userId?.toLowerCase().includes(search.toLowerCase());
        return matchesPlan && matchesStatus && matchesSearch;
    });

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="bg-surface border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <TrendingUp className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-text-main uppercase tracking-tight">Global Investments</h1>
                        <p className="text-xs md:text-sm font-bold text-text-muted mt-1 uppercase">Monitor All User Stakes (DRP & UTP)</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-3xl border border-gray-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Plan Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Plan:</span>
                        <select
                            value={filterPlan}
                            onChange={(e) => setFilterPlan(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-2 font-bold uppercase"
                        >
                            <option value="All">All Plans</option>
                            <option value="DSP">DRP (DSP)</option>
                            <option value="UTP">UTP (USP)</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Status:</span>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block p-2 font-bold uppercase"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search user or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block pl-10 p-2.5 font-bold uppercase placeholder:normal-case placeholder:font-normal"
                        />
                    </div>
                    <button
                        onClick={fetchStakes}
                        className="p-2.5 bg-gray-50 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors flex items-center justify-center"
                        title="Refresh"
                    >
                        <RefreshCcw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-surface border border-gray-400 rounded-3xl overflow-hidden shadow-lg shadow-gray-400">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-text-muted uppercase bg-gray-50 border-b border-gray-200 font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Plan</th>
                                <th className="px-6 py-4 text-right">Amount</th>
                                <th className="px-6 py-4 text-right">ROI %</th>
                                <th className="px-6 py-4 text-right">Profit Earned</th>
                                <th className="px-6 py-4 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 font-bold uppercase tracking-wider">
                                        Loading Investments...
                                    </td>
                                </tr>
                            ) : filteredStakes.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500 font-bold uppercase tracking-wider">
                                        No stakes found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredStakes.map((stake) => (
                                    <tr key={stake._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-800">{new Date(stake.createdAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-500">{new Date(stake.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900 truncate w-32 md:w-auto">{stake.userId?.name || 'Unknown'}</div>
                                            <div className="text-xs font-bold text-primary">{stake.userId?.userId || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <PlanBadge planType={stake.planType} />
                                            {stake.planType === 'DRP' && stake.roiStartDate && (
                                                <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider" title="ROI Generation Start Date">
                                                    Starts: {new Date(stake.roiStartDate).toLocaleDateString()}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-xl text-gray-800">${stake.amount.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            {stake.planType === 'DRP' ? (
                                                <div className="font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded inline-block">{stake.roiPercentage}% <span className="text-[10px] text-indigo-400 uppercase">/ day</span></div>
                                            ) : (
                                                <div className="font-bold text-gray-400 italic text-xs">Varies Weekly</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-lg text-green-600">${stake.totalProfit.toFixed(2)}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <StatusBadge status={stake.status} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllStakes;
