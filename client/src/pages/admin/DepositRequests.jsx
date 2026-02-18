import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { Check, X, Loader } from 'lucide-react';

const DepositRequests = () => {
    const token = useAuthStore((state) => state.token);
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDeposits();
    }, []);

    const fetchDeposits = async () => {
        try {
            const res = await axios.get('https://ivamax-ftp-utp-backend.vercel.app/api/admin/deposits/pending', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setDeposits(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAction = async (id, action) => {
        if (!confirm(`Are you sure you want to ${action}?`)) return;
        setLoading(true);
        try {
            const url = action === 'approve' ? 'approve' : 'reject';
            await axios.post(`http://localhost:5000/api/admin/deposits/${url}`,
                { transactionId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchDeposits();
        } catch (err) {
            alert('Action failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Pending Deposits</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">User</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {deposits.map((tx) => (
                            <tr key={tx._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-800">{tx.userId?.name}</div>
                                    <div className="text-xs text-gray-500">{tx.userId?.userId}</div>
                                </td>
                                <td className="px-6 py-4 font-bold text-green-600">${tx.amount}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{new Date(tx.createdAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-bold">Pending</span>
                                </td>
                                <td className="px-6 py-4 text-right flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleAction(tx._id, 'approve')}
                                        disabled={loading}
                                        className="bg-green-100 text-green-600 p-2 rounded-lg hover:bg-green-200"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleAction(tx._id, 'reject')}
                                        disabled={loading}
                                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {deposits.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No pending deposits</div>
                )}
            </div>
        </div>
    );
};

export default DepositRequests;
