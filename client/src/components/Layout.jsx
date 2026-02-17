import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Layout = () => {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();

    const pageInfo = useMemo(() => {
        const path = location.pathname;
        switch (path) {
            case '/':
            case '/dashboard':
                return { title: 'Dashboard', subtitle: 'Welcome back to your financial overview' };
            case '/buy-imx':
                return { title: 'Buy IMX', subtitle: 'Purchase and manage your IMX tokens' };
            case '/hierarchy':
                return { title: 'Network Hierarchy', subtitle: 'Visual representation of your team structure' };
            case '/imx-transfer':
                return { title: 'Reward Center', subtitle: 'Manage your IMX transfers and rewards' };
            case '/ftp':
                return { title: 'Finance Tenure Package', subtitle: 'Manage your FTP investments' };
            case '/utp':
                return { title: 'United Tenure Package', subtitle: 'Manage your UTP investments' };
            case '/wallet':
                return { title: 'Financial Center', subtitle: 'Ecosystem Liquidity & Portfolio Overview' };
            case '/all-rewards':
                return { title: 'All Rewards', subtitle: 'Manage all your rewards and bonuses' };
            case '/withdraw':
                return { title: 'Withdraw', subtitle: 'Manage your withdrawals' };
            case '/wallet-statement':
                return { title: 'Wallet Statement', subtitle: 'View your transaction history' };
            case '/support':
                return { title: 'Support', subtitle: 'Get help with your account' };
            case '/marketing-material':
                return { title: 'Marketing Material', subtitle: 'Promotional resources for your business' };
            case '/profile':
                return { title: 'Profile Settings', subtitle: 'Manage your account settings' };
            default:
                return { title: 'Dashboard', subtitle: 'Welcome back to your financial overview' };
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background text-text-main font-sans flex">
            <Sidebar />

            <main className="flex-1 min-h-screen flex flex-col ml-64 transition-all duration-300">
                {/* Topbar */}
                <header className="h-20 px-8 sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-400 flex items-center justify-between shadow-xl shadow-gray-400">
                    <div>
                        <h2 className="text-2xl font-bold text-text-main">
                            {pageInfo.title}
                        </h2>
                        <p className="text-sm text-text-muted">{pageInfo.subtitle}</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-text-muted hover:text-primary transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-secondary/20 transition-all flex items-center space-x-2">
                            <span>Connect Wallet</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-5 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
