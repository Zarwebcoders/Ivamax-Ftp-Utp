import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, Users, ArrowRightLeft, FileText, Activity, MessageSquare, User, Network, ShoppingCart, LogOut, ChevronLeft, ChevronRight, Share2, Headphones, Presentation, Award, Star, BadgeDollarSign, ScrollText, Building2, Banknote } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { cn } from '../utils/cn';

const Sidebar = () => {
    const logout = useAuthStore((state) => state.logout);

    const user = useAuthStore((state) => state.user);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Buy IMX', path: '/buy-imx', icon: ShoppingCart },
        { name: 'Hierarchy', path: '/hierarchy', icon: Network },
        { name: 'IMX Transfer', path: '/imx-transfer', icon: ArrowRightLeft },
        { name: 'FTP', path: '/ftp', icon: FileText },
        { name: 'UTP', path: '/utp', icon: Activity },
        { name: 'Wallet', path: '/wallet', icon: Wallet },
        { name: 'All Rewards', path: '/all-rewards', icon: Award },
        { name: 'Withdraw', path: '/withdraw', icon: Banknote },
        { name: 'Wallet Statements', path: '/wallet-statement', icon: ScrollText },
        { name: 'Company', path: '/company', icon: Building2 },
        { name: 'Profile', path: '/profile', icon: User },
    ];

    const adminItems = [
        { name: 'Admin Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'User Mgmt', path: '/admin/users', icon: Users },
        { name: 'Deposits', path: '/admin/deposits', icon: FileText },
        { name: 'Support Admin', path: '/admin/support', icon: Headphones },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-400 h-screen flex flex-col fixed left-0 top-0 zs-50 shadow-xl shadow-gray-600">
            <div className="p-3 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                        IV
                    </div>
                    <h1 className="text-2xl font-bold text-text-main tracking-tight">
                        IVAMAX
                    </h1>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100 text-gray-400">
                    <ChevronLeft className="w-5 h-5" />
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium",
                                isActive
                                    ? "bg-primary/5 text-secondary border-l-4 border-primary"
                                    : "text-text-muted hover:text-primary hover:bg-gray-50"
                            )
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn("w-5 h-5", isActive ? "fill-current" : "")} />
                                <span className="text-sm font-semibold">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}

                {user?.role === 'admin' && (
                    <>
                        <div className="px-4 py-2 mt-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Admin Panel</div>
                        {adminItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group font-medium",
                                        isActive
                                            ? "bg-red-50 text-red-600 border-l-4 border-red-500"
                                            : "text-text-muted hover:text-red-500 hover:bg-red-50"
                                    )
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <item.icon className={cn("w-5 h-5", isActive ? "fill-current" : "")} />
                                        <span className="text-sm font-semibold">{item.name}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </>
                )}
            </nav>

            <div className="border-t border-gray-100 flex-shrink-0">
                <div className="bg-gray-100 rounded-xl p-4 mb-4 flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        T
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-bold text-text-main truncate">Test User</p>
                        <p className="text-xs text-text-muted truncate">ID: IVA100001</p>
                    </div>
                    <LogOut onClick={logout} className="w-5 h-5 text-red-400 cursor-pointer ml-auto mr-2 hover:text-red-500" />
                </div>
            </div>
        </aside >
    );
};

export default Sidebar;
