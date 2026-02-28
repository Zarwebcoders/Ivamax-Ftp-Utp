import React, { useState, useEffect } from 'react';
import { Banknote, CheckCircle, XCircle, Search, Clock, Check, X, Filter, RefreshCcw } from 'lucide-react';
import api from '../../lib/axios';

const AdminWithdrawals = () => {
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');

    const fetchWithdrawals = async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/withdrawals');
            setWithdrawals(res.data);
        } catch (error) {
            console.error("Failed to fetch withdrawals:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWithdrawals();
    }, []);

    const handleAction = async (id, action) => {
        if (!window.confirm(`Are you sure you want to ${action} this withdrawal?`)) return;

        try {
            await api.post('/admin/withdrawals/action', { transactionId: id, action });
            fetchWithdrawals(); // Refresh list after action
        } catch (error) {
            console.error(`Failed to ${action} withdrawal:`, error);
            alert(error.response?.data?.message || 'Action failed');
        }
    };

    const StatusBadge = ({ status }) => {
        const styles = {
            Completed: 'bg-green-100 text-green-700 border border-green-200',
            Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
            Rejected: 'bg-red-100 text-red-700 border border-red-200'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${styles[status]}`}>
                {status}
            </span>
        );
    };

    const filteredWithdrawals = withdrawals.filter(w => {
        const matchesFilter = filter === 'All' || w.status === filter;
        const matchesSearch =
            w.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
            w.userId?.userId?.toLowerCase().includes(search.toLowerCase()) ||
            w.walletAddress?.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="bg-surface border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Banknote className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-text-main uppercase">Withdrawal Requests</h1>
                            <p className="text-sm font-bold text-text-muted mt-1 uppercase">Manage & Approve Payouts</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex gap-2">
                    {['All', 'Pending', 'Completed', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all uppercase tracking-wider flex items-center gap-2 ${filter === status
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {status === 'Pending' && <Clock className="w-4 h-4" />}
                            {status === 'Completed' && <CheckCircle className="w-4 h-4" />}
                            {status === 'Rejected' && <XCircle className="w-4 h-4" />}
                            {status === 'All' && <Filter className="w-4 h-4" />}
                            {status}
                        </button>
                    ))}
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search user, ID, or wallet..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-primary focus:border-primary block pl-10 p-2.5 font-bold uppercase placeholder:normal-case placeholder:font-normal"
                        />
                    </div>
                    <button
                        onClick={fetchWithdrawals}
                        className="p-2.5 bg-white border border-gray-300 rounded-xl text-gray-600 hover:text-primary hover:border-primary transition-colors flexitems-center justify-center"
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
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Wallet Address</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-bold uppercase">
                                        Loading withdrawals...
                                    </td>
                                </tr>
                            ) : filteredWithdrawals.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500 font-bold uppercase">
                                        No withdrawals found matching criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredWithdrawals.map((withdrawal) => (
                                    <tr key={withdrawal._id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-bold text-gray-800">{new Date(withdrawal.createdAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-gray-500">{new Date(withdrawal.createdAt).toLocaleTimeString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{withdrawal.userId?.name || 'Unknown'}</div>
                                            <div className="text-xs font-bold text-primary">{withdrawal.userId?.userId || 'N/A'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-xl text-gray-800">${withdrawal.amount.toFixed(2)}</div>
                                            <div className="text-xs text-gray-500 uppercase font-bold tracking-widest text-[#26A17B]">USDT (BEP-20)</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded border border-gray-200 inline-block w-48 overflow-hidden text-ellipsis" title={withdrawal.walletAddress || withdrawal.userId?.walletAddress || 'No Address'}>
                                                {withdrawal.walletAddress || withdrawal.userId?.walletAddress || 'No Address Attached'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={withdrawal.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {withdrawal.status === 'Pending' ? (
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleAction(withdrawal._id, 'approve')}
                                                        className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 border border-green-200 transition-colors"
                                                        title="Approve"
                                                    >
                                                        <Check className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(withdrawal._id, 'reject')}
                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200 transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Processed</span>
                                            )}
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

export default AdminWithdrawals;
