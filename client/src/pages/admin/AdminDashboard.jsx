import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import { Users, DollarSign, Activity, Settings, Loader } from 'lucide-react';

const AdminDashboard = () => {
    const token = useAuthStore((state) => state.token);
    const [stats, setStats] = useState({ totalUsers: 0, totalInvested: 0 });
    const [pspLoading, setPspLoading] = useState(false);
    const [pspValue, setPspValue] = useState('');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/admin/stats');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`p-4 rounded-full bg-${color}-100 text-${color}-600`}>
                <Icon className="w-8 h-8" />
            </div>
            <div>
                <p className="text-gray-500 text-sm font-bold uppercase">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
            </div>
        </div>
    );

    const handleDeclarePSP = async () => {
        if (!pspValue || isNaN(pspValue) || Number(pspValue) <= 0) {
            alert('Please enter a valid percentage greater than 0');
            return;
        }

        if (!window.confirm(`Are you sure you want to distribute ${pspValue}% to all eligible UTP stakers?`)) return;

        setPspLoading(true);
        try {
            const res = await api.post('/admin/psp/declare', { percentage: Number(pspValue) });
            alert(`Success! Distributed ${pspValue}% to ${res.data.stakesProcessed} stakes. Total Amount: $${res.data.totalAmountDistributed}`);
            setPspValue('');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to distribute PSP');
        } finally {
            setPspLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-12">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} title="Total Users" value={stats.totalUsers} color="blue" />
                <StatCard icon={DollarSign} title="Total Invested" value={`$${stats.totalInvested?.toLocaleString()}`} color="green" />
                <StatCard icon={Activity} title="System Status" value="Active" color="purple" />
            </div>

            {/* Quick Actions / Configuration */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">System Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Declare PSP Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
                        <div className="absolute opacity-5 -right-10 -top-10 transition-transform group-hover:scale-110">
                            <Settings className="w-48 h-48" />
                        </div>
                        <div className="flex items-center space-x-3 mb-4 relative z-10">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                                <Settings className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">Declare Weekly PSP (UTP)</h3>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 relative z-10">
                            Distribute weekly Profit Sharing Percentage to all eligible UTP Stakers (started before this week's Monday).
                        </p>
                        <div className="flex space-x-4 relative z-10">
                            <div className="relative flex-1">
                                <input
                                    type="number"
                                    value={pspValue}
                                    onChange={(e) => setPspValue(e.target.value)}
                                    placeholder="e.g. 2.5"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                            </div>
                            <button
                                onClick={handleDeclarePSP}
                                disabled={pspLoading}
                                className="bg-primary hover:bg-[#d4993d] text-white px-6 py-3 rounded-xl font-bold text-sm uppercase transition-colors flex items-center"
                            >
                                {pspLoading ? <Loader className="w-4 h-4 animate-spin" /> : 'Distribute'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
