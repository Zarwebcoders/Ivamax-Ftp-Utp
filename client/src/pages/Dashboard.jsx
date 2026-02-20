import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import {
    User, Shield,
    Bell, Megaphone, Newspaper,
    Trophy, Image as ImageIcon,
    Layout
} from 'lucide-react';

const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center space-x-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <h2 className="text-xl font-bold text-text-main uppercase tracking-wide border-l-4 border-primary pl-3">
            {title}
        </h2>
    </div>
);

const DetailCard = ({ label, value, subValue, alert }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-3 shadow-lg shadow-gray-400 flex flex-col justify-between hover:border-primary transition-colors shadow-lg">
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

// Placeholder Components for new sections
const DisplayBanner = () => (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-6 text-white text-center shadow-lg h-48 flex flex-col items-center shadow-gray-500 justify-center">
        <ImageIcon className="w-12 h-12 mb-2 opacity-80" />
        <h3 className="text-2xl font-bold uppercase">Advertise Banner</h3>
        <p className="text-sm opacity-90">Promotional content goes here</p>
    </div>
);

const ROCBanner = () => (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl p-6 text-white text-center shadow-lg shadow-gray-500 h-40 flex flex-col items-center justify-center">
        <Trophy className="w-12 h-12 mb-2 opacity-80" />
        <h3 className="text-xl font-bold uppercase">ROC Banner</h3>
        <p className="text-xs opacity-90">Changes every week</p>
    </div>
);

const AdvisorRanking = () => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-3 shadow-lg shadow-gray-400">
        <SectionHeader title="Advisor Ranking" icon={Trophy} />
        <div className="space-y-3">
            {[1, 2, 3].map((rank) => (
                <div key={rank} className="flex items-center justify-between p-3 bg-gray-300 rounded-xl">
                    <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${rank === 1 ? 'bg-yellow-100 text-yellow-600' : rank === 2 ? 'bg-gray-100 text-gray-600' : 'bg-orange-100 text-orange-600'}`}>
                            #{rank}
                        </span>
                        <span className="font-bold text-text-main">Advisor Name</span>
                    </div>
                    <span className="text-sm text-primary font-bold">Points: {1000 - (rank * 100)}</span>
                </div>
            ))}
        </div>
    </div>
);

const NewsBox = () => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-3 shadow-lg shadow-gray-400">
        <SectionHeader title="News" icon={Newspaper} />
        <div className="space-y-3">
            <div className="p-3 bg-blue-200 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm font-bold text-text-main">Market Update</p>
                <p className="text-xs text-gray-500 mt-1">Latest market trends and updates...</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-xl border-l-4 border-blue-500">
                <p className="text-sm font-bold text-text-main">New Features</p>
                <p className="text-xs text-gray-500 mt-1">Check out the latest platform features...</p>
            </div>
        </div>
    </div>
);

const AnnouncementBox = () => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-3 shadow-lg shadow-gray-400">
        <SectionHeader title="Announcements" icon={Megaphone} />
        <div className="space-y-3">
            <div className="p-3 bg-yellow-200 rounded-xl border-l-4 border-yellow-500">
                <p className="text-sm font-bold text-text-main">System Maintenance</p>
                <p className="text-xs text-gray-500 mt-1">Scheduled maintenance on Sunday...</p>
            </div>
        </div>
    </div>
);

const NotificationSystem = () => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-3 shadow-lg shadow-gray-400">
        <SectionHeader title="Notifications" icon={Bell} />
        <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-300 rounded-xl">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                <div>
                    <p className="text-sm font-bold text-text-main">Welcome!</p>
                    <p className="text-xs text-gray-500">Thanks for joining our platform.</p>
                </div>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Tab State
    const [activeTab, setActiveTab] = useState('joining'); // Default tab

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await api.get('/user/dashboard');
                setData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDashboardData();
        }
    }, [token]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
    }

    const tabs = [
        { id: 'display_banner', label: 'Display Banner', icon: ImageIcon },
        { id: 'joining', label: 'Joining Details', icon: User },
        { id: 'roc_banner', label: 'ROC Banner', icon: Trophy },
        { id: 'advisor_ranking', label: 'Advisor Ranking', icon: Trophy },
        { id: 'news', label: 'News', icon: Newspaper },
        { id: 'announcements', label: 'Announcements', icon: Megaphone },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    // CSS class util to show/hide based on tab and screen size
    // Shows on mobile ONLY if active tab matches. Always shows on desktop (md:block).
    const getVisibilityClass = (tabId) => {
        return `${activeTab === tabId ? 'block' : 'hidden'} md:block`;
    };

    return (
        <div className="space-y-6 pb-20 md:pb-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-text-main flex items-center gap-3">
                    <span className="bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/30">
                        <Layout className="w-6 h-6" />
                    </span>
                    IVAMAX DASHBOARD
                </h1>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                <div className="flex space-x-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all
                                    ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-white text-text-muted border border-gray-200'}
                                `}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm font-bold">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Display Banner */}
                <div className={`${getVisibilityClass('display_banner')} md:col-span-3`}>
                    <DisplayBanner />
                </div>

                {/* Joining Details (Profile & Sponsor) */}
                {/* Spanning 2 columns on large screens for better layout */}
                <div className={`${getVisibilityClass('joining')} md:col-span-2 space-y-6`}>
                    {/* Profile Details */}
                    <div className="bg-white border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:shadow-golden-300 hover:border-golden-400">
                        <SectionHeader title="Joining Details" icon={User} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DetailCard label="Username" value={user?.username || data?.user?.username || "Update Profile"} alert={!user?.username} />
                            <DetailCard label="Email" value={user?.email || data?.user?.email || "Update Profile"} alert={!user?.email} />
                            <DetailCard label="Account" value={data?.user?.sponsorAddress || "0xa887...508854"} subValue="Connected" />
                            <DetailCard label="Rank" value={data?.user?.rank || "No Rank"} subValue="Current Status" />
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
                                <p className="text-lg font-bold text-white">{data?.user?.sponsorName || "N/A"}</p>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Sponsor Address</p>
                                <p className="text-sm font-bold text-white/80 font-mono truncate">{data?.user?.sponsorAddress || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ROC Banner */}
                <div className={`${getVisibilityClass('roc_banner')}`}>
                    <ROCBanner />
                </div>

                {/* Advisor Ranking */}
                <div className={`${getVisibilityClass('advisor_ranking')}`}>
                    <AdvisorRanking />
                </div>

                {/* News */}
                <div className={`${getVisibilityClass('news')}`}>
                    <NewsBox />
                </div>

                {/* Announcements */}
                <div className={`${getVisibilityClass('announcements')}`}>
                    <AnnouncementBox />
                </div>

                {/* Notifications */}
                <div className={`${getVisibilityClass('notifications')}`}>
                    <NotificationSystem />
                </div>

            </div>
        </div>
    );
};
export default Dashboard;
