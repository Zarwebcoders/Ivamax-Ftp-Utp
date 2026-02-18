import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { Users, DollarSign, Activity } from 'lucide-react';

const AdminDashboard = () => {
    const token = useAuthStore((state) => state.token);
    const [stats, setStats] = useState({ totalUsers: 0, totalInvested: 0 });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await axios.get('https://ivamax-ftp-utp-backend.vercel.app/api/admin/stats', {
                headers: { Authorization: `Bearer ${token}` }
            });
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

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon={Users} title="Total Users" value={stats.totalUsers} color="blue" />
                <StatCard icon={DollarSign} title="Total Invested" value={`$${stats.totalInvested?.toLocaleString()}`} color="green" />
                <StatCard icon={Activity} title="System Status" value="Active" color="purple" />
            </div>

            {/* Quick Actions or Recent Logs could go here */}
        </div>
    );
};

export default AdminDashboard;
