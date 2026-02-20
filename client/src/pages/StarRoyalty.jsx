import React, { useState, useEffect } from 'react';
import { Award, Crown } from 'lucide-react';
import api from '../lib/axios';

const StarRoyalty = () => {
    const [royaltyTx, setRoyaltyTx] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoyalty = async () => {
            try {
                const res = await api.get('/wallet/history');
                const rankRewards = res.data.filter(tx => tx.type === 'RankReward');
                setRoyaltyTx(rankRewards);
            } catch (err) {
                console.error("Failed to fetch royalty history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRoyalty();
    }, []);

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Rank Rewards</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Monthly Rank Royalty Income Statement</p>
                </div>
            </div>

            {/* Royalty Earnings Table */}
            <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex items-center gap-3">
                    <Crown className="w-4 h-4 text-primary" />
                    <h3 className="text-white font-bold uppercase text-sm tracking-wider">Your Royalty Earnings</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Rank Info</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Business Metrics</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Income</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="py-24 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                                    </td>
                                </tr>
                            ) : royaltyTx.length > 0 ? (
                                royaltyTx.map((tx) => (
                                    <tr key={tx._id} className="border-b border-gray-800 hover:bg-gray-900/30 transition-colors">
                                        <td className="py-4 px-6 text-sm font-bold text-white uppercase">
                                            {tx.description || 'Rank Reward'}
                                        </td>
                                        <td className="py-4 px-6 text-xs font-medium text-gray-400">
                                            -
                                        </td>
                                        <td className="py-4 px-6 text-sm font-bold text-green-500">
                                            +{tx.amount} IMX
                                        </td>
                                        <td className="py-4 px-6 text-right text-xs font-medium text-gray-400">
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                /* Empty State */
                                <tr>
                                    <td colSpan="4" className="py-24 text-center">
                                        <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Royalty Income Found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StarRoyalty;
