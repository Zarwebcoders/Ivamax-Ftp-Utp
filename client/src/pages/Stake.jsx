import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { TrendingUp, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

const Stake = () => {
    const token = useAuthStore((state) => state.token);
    const [activeTab, setActiveTab] = useState('FTP'); // FTP or UTP
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState(12);
    const [stakes, setStakes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStakes();
    }, []);

    const fetchStakes = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/stake', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStakes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleInvest = async (e) => {
        e.preventDefault();
        if (!confirm(`Confirm investment of $${amount} in ${activeTab} Plan?`)) return;

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/stake/invest',
                { planType: activeTab, amount, durationMonths: duration },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAmount('');
            fetchStakes();
            alert('Investment Successful!');
        } catch (err) {
            alert(err.response?.data?.message || 'Investment Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-text-main">Staking <span className="text-secondary">Dashboard</span></h1>

            {/* Tabs */}
            <div className="flex space-x-1 bg-white p-1 rounded-2xl w-fit border border-gray-200 shadow-sm">
                {['FTP', 'UTP'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-8 py-3 font-bold text-lg rounded-xl transition-all duration-300",
                            activeTab === tab
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-text-muted hover:bg-gray-50 hover:text-text-main"
                        )}
                    >
                        {tab} Plan
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Investment Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full">
                        <h3 className="text-xl font-bold mb-6 flex items-center text-text-main">
                            <TrendingUp className="w-6 h-6 mr-3 text-primary" />
                            New Investment
                        </h3>

                        <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10 rounded-2xl">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-bold text-lg text-primary">{activeTab === 'FTP' ? 'Fixed Term Plan' : 'Unit Term Plan'}</h4>
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="h-px bg-primary/10 w-full my-3"></div>
                            <ul className="text-sm text-text-muted space-y-2 font-medium">
                                <li className="flex justify-between"><span>ROI:</span> <span className="text-text-main font-bold">{activeTab === 'FTP' ? '3%' : '5%'} Monthly</span></li>
                                <li className="flex justify-between"><span>Min Duration:</span> <span className="text-text-main font-bold">12 Months</span></li>
                                <li className="flex justify-between"><span>Principal Return:</span> <span className="text-text-main font-bold">End of Term</span></li>
                            </ul>
                        </div>

                        <form onSubmit={handleInvest} className="space-y-6">
                            <div>
                                <label className="text-sm font-bold text-text-muted block mb-2 uppercase tracking-wide">Amount (IMX/USDT)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-3.5 text-gray-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 px-4 py-3 placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 font-bold text-lg text-text-main transition-all"
                                        placeholder="Min 100"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-text-muted block mb-2 uppercase tracking-wide">Duration</label>
                                <div className="relative">
                                    <Clock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 px-4 py-3 text-text-main font-bold focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                                    >
                                        <option value={12}>12 Months</option>
                                        <option value={24}>24 Months</option>
                                        <option value={36}>36 Months</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-text-main hover:bg-text-main/90 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:-translate-y-1 mt-2"
                            >
                                {loading ? 'Processing...' : 'Invest Now'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Active Stakes List */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full">
                        <h3 className="text-xl font-bold mb-6 flex items-center text-text-main">
                            <Clock className="w-6 h-6 mr-3 text-secondary" />
                            Your Active Stakes
                        </h3>

                        {stakes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-text-muted bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                                <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
                                <p className="font-medium">No active investments found.</p>
                                <p className="text-sm mt-1">Start investing to see your portfolio grow.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {stakes.map((stake) => (
                                    <div key={stake._id} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center hover:shadow-lg hover:border-primary/30 transition-all group">
                                        <div className="flex items-start space-x-4">
                                            <div className={cn(
                                                "p-3 rounded-xl",
                                                stake.planType === 'FTP' ? "bg-blue-50 text-blue-500" : "bg-purple-50 text-purple-500"
                                            )}>
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className="font-bold text-text-main text-lg">${stake.amount.toLocaleString()}</span>
                                                    <span className={cn(
                                                        "text-xs font-bold px-2 py-0.5 rounded-full uppercase",
                                                        stake.planType === 'FTP' ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                                                    )}>
                                                        {stake.planType}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-text-muted font-medium">Started: {new Date(stake.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 md:mt-0 md:text-right pl-14 md:pl-0">
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-wide mb-1">Monthly Profit</p>
                                            <p className="text-green-500 font-mono font-bold text-xl flex items-center md:justify-end">
                                                +${(stake.amount * (stake.roiPercentage / 100)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stake;
