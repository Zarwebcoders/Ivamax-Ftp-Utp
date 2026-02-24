import React, { useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Layout = () => {
    const user = useAuthStore((state) => state.user);
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
            case '/drp':
                return { title: 'Dividend Reward Package', subtitle: 'Manage your DRP investments' };
            case '/utp':
                return { title: 'United Tenure Package', subtitle: 'Manage your UTP investments' };
            case '/wallet':
                return { title: 'Financial Center', subtitle: 'Ecosystem Liquidity & Portfolio Overview' };
            case '/all-rewards':
                return { title: 'All Rewards', subtitle: 'Manage all your rewards and bonuses' };
            case '/withdraw':
                return { title: 'Withdraw', subtitle: 'Manage your withdrawals' };
            case '/company':
                return { title: 'Company', subtitle: 'Manage your company information' };
            case '/profile':
                return { title: 'Profile Settings', subtitle: 'Manage your account settings' };
            default:
                return { title: 'Dashboard', subtitle: 'Welcome back to your financial overview' };
        }
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-background text-text-main font-sans flex relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 min-h-screen flex flex-col w-full lg:ml-64 transition-all duration-300">
                {/* Topbar */}
                <header className="h-16 md:h-20 px-4 md:px-8 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-400 flex items-center justify-between shadow-sm md:shadow-xl shadow-gray-400">
                    <div className="flex items-center gap-4">
                        {/* Mobile Hamburger */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-text-muted hover:text-primary transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-text-main truncate max-w-[200px] md:max-w-none">
                                {pageInfo.title}
                            </h2>
                            <p className="text-xs md:text-sm text-text-muted hidden md:block">{pageInfo.subtitle}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <button className="relative p-2 text-text-muted hover:text-primary transition-colors">
                            <Bell className="w-5 h-5 md:w-6 md:h-6" />
                            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>

                        <button className="bg-secondary hover:bg-secondary/90 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold shadow-lg shadow-secondary/20 transition-all flex items-center space-x-2 text-xs md:text-sm">
                            <span>Connect Wallet</span>
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 md:p-5 overflow-x-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
