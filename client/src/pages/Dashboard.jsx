import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import {
    User, Mail, Hash, Award, Shield,
    Layers, DollarSign, CreditCard,
    Users, UserCheck, UserX,
    Briefcase, Wallet,
    TrendingUp, Calendar, Target,
    ShoppingCart, Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center space-x-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <h2 className="text-xl font-bold text-text-main uppercase tracking-wide border-l-4 border-primary pl-3">
            {title}
        </h2>
    </div>
);

const DetailCard = ({ label, value, subValue, alert }) => (
    <div className="bg-surface border border-gray-200 rounded-2xl p-2 flex flex-col justify-between hover:border-primary/50 transition-colors shadow-lg">
        <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold text-text-muted uppercase tracking-wider">{label}</span>
            {alert && <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded-full animate-pulse">!</span>}
        </div>
        <div>
            <div className="text-lg font-bold text-text-main truncate">{value}</div>
            {subValue && <div className="text-xs text-primary font-semibold mt-1">{subValue}</div>}
        </div>
    </div>
);

const StatBox = ({ label, value, icon: Icon, color = "primary" }) => (
    <div className="bg-surface border border-gray-400 p-3 rounded-2xl shadow-lg shadow-gray-400 hover:shadow-2xl hover:border-golden-400 transition-all flex items-center justify-between group">
        <div>
            <p className="text-xs font-bold text-text-muted uppercase mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-text-main">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-${color}/10 text-${color} group-hover:scale-110 group-hover:bg-${color} group-hover:text-white transition-transform`}>
            {Icon && <Icon className="w-6 h-6" />}
        </div>
    </div>
);

const WalletCard = ({ title, items, color = "primary" }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-3 shadow-lg shadow-gray-400 hover:shadow-2xl hover:border-golden-400 transition-all h-full">
        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-3">
            <h3 className={`text-sm font-bold text-${color} uppercase`}>{title}</h3>
            <Wallet className="w-4 h-4 text-gray-400" />
        </div>
        <div className="grid grid-cols-2 gap-4">
            {items.map((item, idx) => (
                <div key={idx} className={`${items.length % 2 !== 0 && idx === items.length - 1 ? 'col-span-2' : ''}`}>
                    <p className="text-[10px] font-bold text-text-muted uppercase mb-0.5">{item.label}</p>
                    <p className={`text-sm font-bold ${item.highlight ? `text-${color}` : 'text-text-main'}`}>{item.value}</p>
                    {item.subValue && <p className="text-[10px] text-gray-400">{item.subValue}</p>}
                </div>
            ))}
        </div>
    </div>
);

const PerformanceCard = ({ period, yieldVal, income, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-3 shadow-lg shadow-gray-400 hover:shadow-2xl hover:border-golden-400 transition-all relative overflow-hidden group">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-bold text-text-muted uppercase">{period}</span>
            </div>
            {Icon && <Icon className="w-10 h-10 text-gray-100 group-hover:text-gray-200 transition-colors absolute top-4 right-4" />}
        </div>

        <div className="mb-4">
            <p className="text-[10px] font-bold text-text-muted uppercase">Cumulative Yield</p>
            <h3 className="text-3xl font-bold text-text-main">{yieldVal}</h3>
        </div>

        <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] font-bold text-text-muted uppercase">Total Income Distributed</p>
            <p className="text-lg font-bold text-green-600">${income}</p>
        </div>
    </div>
);

const Dashboard = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [data, setData] = useState(null);

    // Mock data for UI development if backend data is missing specific fields
    const mockData = {
        slots: 0,
        totalIMX: "0.00 IMX",
        totalValue: "$0.00",
        directTeam: 0,
        activeDirectTeam: 0,
        inactiveDirectTeam: 0,
        teamSize: 0,
        activeTeamSize: 0,
        inactiveTeamSize: 0,
        selfBusiness: "$0",
        directTeamBusiness: "$0.00",
        teamBusiness: "$0.00",
        captok: { balance: "$0.00", used: "$0.00", free: "$0.00" },
        protok: { balance: "$0.00", ftp: "$0.00", utp: "$0.00" },
        ftpPlan: { stake: "$0.00", pro: "$0.00" },
        utpPlan: { unit: "$0.00", stake: "$0.00", pro: "$0.00" }
    };

    useEffect(() => {
        // Fetch real data here
        // For now sticking to mock/user data
    }, []);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <h1 className="text-2xl font-bold text-text-main flex flex-col md:flex-row md:items-center items-start gap-3 md:gap-0">
                <span className="bg-primary text-white p-2 rounded-lg mr-3 shadow-lg shadow-primary/30 inline-flex">
                    <Award className="w-6 h-6" />
                </span>
                IVAMAX DASHBOARD
            </h1>

            {/* Row 1: Profile & Sponsor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Details */}
                <div className="lg:col-span-2 bg-white border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:shadow-golden-300 hover:border-golden-400">
                    <SectionHeader title="Profile Details" icon={User} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <DetailCard label="Username" value={user?.username || "Update Profile"} alert={!user?.username} />
                        <DetailCard label="Email" value={user?.email || "Update Profile"} alert={!user?.email} />
                        <DetailCard label="Account" value="0xa887...508854" subValue="Connected" />
                        <DetailCard label="Rank" value={user?.rank || "No Rank"} subValue="Current Status" />
                    </div>
                </div>

                {/* Sponsor Info */}
                <div className="bg-white border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400 bg-gradient-to-br from-gray-600 to-gray-600 text-white hover:shadow-2xl transition-all duration-300 hover:shadow-golden-300 hover:border-golden-400">
                    <div className="flex items-center space-x-2 mb-6">
                        <Shield className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold text-white uppercase tracking-wide border-l-4 border-primary pl-3">
                            Sponsor Info
                        </h2>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Sponsor Name</p>
                            <p className="text-lg font-bold text-white">{user?.sponsorName || "APSL4BDC"}</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                            <p className="text-xs font-bold text-gray-400 uppercase mb-1">Sponsor Address</p>
                            <p className="text-sm font-bold text-white/80 font-mono truncate">{user?.sponsorAddress || "0x51ca...a76bdc"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Self Investment Overview */}
            <div className="space-y-4">
                <SectionHeader title="Self Investment Overview" icon={Layers} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatBox label="No of Slot" value={mockData.slots} icon={TrendingUp} color="primary" />
                    <StatBox label="Total IMX" value={mockData.totalIMX} icon={Layers} color="primary" />
                    <StatBox label="Total Value" value={mockData.totalValue} icon={DollarSign} color="primary" />
                </div>
            </div>

            {/* Row 3: Team Overview */}
            <div className="space-y-4">
                <SectionHeader title="Team Overview" icon={Users} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <StatBox label="Direct Team" value={mockData.directTeam} icon={Users} />
                    <StatBox label="Active Direct Team" value={mockData.activeDirectTeam} icon={UserCheck} />
                    <StatBox label="Inactive Direct Team" value={mockData.inactiveDirectTeam} icon={UserX} />
                    <StatBox label="Team Size" value={mockData.teamSize} icon={Users} />
                    <StatBox label="Active Team Size" value={mockData.activeTeamSize} icon={UserCheck} />
                    <StatBox label="Inactive Team Size" value={mockData.inactiveTeamSize} icon={UserX} />
                </div>
            </div>

            {/* Row 4: Business Overview */}
            <div className="space-y-4">
                <SectionHeader title="Business Overview" icon={Briefcase} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatBox label="Self Business" value={mockData.selfBusiness} icon={Briefcase} color="primary" />
                    <StatBox label="Direct Team Business" value={mockData.directTeamBusiness} icon={Briefcase} color="primary" />
                    <StatBox label="Team Business" value={mockData.teamBusiness} icon={Briefcase} color="primary" />
                </div>
            </div>

            {/* Row 5: Wallet Holdings */}
            <div className="space-y-4">
                <SectionHeader title="Wallet Holdings" icon={Wallet} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <WalletCard
                        title="Captok Wallet"
                        color="green-600"
                        items={[
                            { label: "Captok Balance", value: mockData.captok.balance, subValue: "0.00 IMX", highlight: true },
                            { label: "Used Balance", value: mockData.captok.used, subValue: "0.00 IMX", highlight: true },
                            { label: "Free Balance", value: mockData.captok.free, subValue: "0.00 IMX", highlight: true },
                        ]}
                    />
                    <WalletCard
                        title="Protok Wallet"
                        color="blue-600"
                        items={[
                            { label: "Protok Balance", value: mockData.protok.balance, subValue: "0.00 IMX", highlight: true },
                            { label: "FTP Pro Balance", value: mockData.protok.ftp, subValue: "0.00 IMX", highlight: true },
                            { label: "UTP Pro Balance", value: mockData.protok.utp, subValue: "0.00 IMX", highlight: true },
                        ]}
                    />
                    <WalletCard
                        title="FTP Plan"
                        color="orange-600"
                        items={[
                            { label: "FTP Stake Inv.", value: mockData.ftpPlan.stake, subValue: "0.00 IMX", highlight: true },
                            { label: "FTP Pro Balance", value: mockData.ftpPlan.pro, subValue: "0.00 IMX", highlight: true },
                        ]}
                    />
                    <WalletCard
                        title="UTP Plan"
                        color="indigo-600"
                        items={[
                            { label: "UTP Unit", value: mockData.utpPlan.unit, subValue: "0.00 IMX", highlight: true },
                            { label: "UTP Stake Inv.", value: mockData.utpPlan.stake, subValue: "0.00 IMX", highlight: true },
                            { label: "UTP Pro Balance", value: mockData.utpPlan.pro, subValue: "0.00 IMX", highlight: true },
                        ]}
                    />
                </div>
            </div>

            {/* Row 6: Quick Actions */}
            <div className="space-y-4">
                <SectionHeader title="Quick Actions" icon={Target} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/buy-imx" className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-gray-400 flex items-center justify-center space-x-2 transition-all active:scale-95">
                        <ShoppingCart className="w-5 h-5" />
                        <span>BUY IMX</span>
                    </Link>
                    <Link to="/profile" className="bg-white hover:bg-gray-50 border-2 border-primary text-primary font-bold py-4 px-6 rounded-xl shadow-lg shadow-gray-400 flex items-center justify-center space-x-2 transition-all active:scale-95">
                        <User className="w-5 h-5" />
                        <span>PROFILE</span>
                    </Link>
                    <Link to="/support" className="bg-accent hover:bg-accent/90 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-gray-400 flex items-center justify-center space-x-2 transition-all active:scale-95">
                        <Headphones className="w-5 h-5" />
                        <span>SUPPORT</span>
                    </Link>
                </div>
            </div>

            {/* Row 7: UTP Performance */}
            <div className="space-y-4">
                <SectionHeader title="UTP Performance Overview" icon={TrendingUp} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <PerformanceCard period="Last Week" yieldVal="2%" income="0.2" icon={Calendar} />
                    <PerformanceCard period="Last Month" yieldVal="8.8%" income="0.88" icon={Target} />
                    <PerformanceCard period="Last Year" yieldVal="14.5%" income="1.45" icon={TrendingUp} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
