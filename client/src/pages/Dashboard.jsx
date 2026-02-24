import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import {
    User, Shield,
    Bell, Megaphone, Newspaper,
    Trophy, Image as ImageIcon,
    Layout, TrendingUp, DollarSign, Wallet, ArrowUpRight, Users, Building2, Gift
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

// Display Banner - "Welcome back" design
const DisplayBanner = () => {
    const user = useAuthStore((state) => state.user);

    const memberSince = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        })
        : "Feb 2026";

    const rank = user?.rank || "Member";
    const userName = user?.name || user?.username || "New Demo User";

    return (
        <div className="relative w-full rounded-3xl overflow-hidden p-[1px] bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 shadow-2xl">

            {/* Glass Container */}
            <div className="relative rounded-3xl bg-[#0f172a]/90 backdrop-blur-xl px-8 py-4 overflow-hidden">

                {/* Soft Glow Background */}
                <div className="absolute -top-32 -left-10 w-72 h-72 bg-yellow-400/50 blur-[10px] rounded-full"></div>
                <div className="absolute -bottom-32 -right-10 w-72 h-72 bg-amber-500/50 blur-[10px] rounded-full"></div>

                <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10 items-center">

                    {/* LEFT SECTION */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                                Welcome back,{" "}
                                <span className="text-yellow-400">{userName}</span> 👋
                            </h2>

                            <p className="text-gray-300 mt-3 max-w-lg">
                                Scale your success with the most powerful IVAMAX network tools.
                            </p>
                        </div>

                        {/* Images Section */}
                        <div className="flex gap-4 mt-2">
                            <img
                                src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop"
                                alt="Investment Image 1"
                                className="w-1/2 h-28 md:h-36 object-cover rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                            <img
                                src="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop"
                                alt="Investment Image 2"
                                className="w-1/2 h-28 md:h-36 object-cover rounded-2xl border border-white/10 shadow-lg hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </div>

                    {/* RIGHT SECTION - Floating Stats */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 w-full lg:w-80">

                        {/* Member Since Card */}
                        <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-xs uppercase tracking-widest text-yellow-300 mb-2">
                                Member Since
                            </p>
                            <p className="text-3xl font-extrabold text-white">
                                {memberSince}
                            </p>
                        </div>

                        {/* Rank Card */}
                        <div className="bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/30 rounded-2xl p-6 backdrop-blur-lg shadow-xl hover:scale-105 transition duration-300">
                            <p className="text-xs uppercase tracking-widest text-yellow-300 mb-2">
                                Network Size
                            </p>
                            <p className="text-3xl font-extrabold text-white">
                                {rank}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ROCBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "ROC Banner",
            desc: "Join our exclusive",
            gradient: "from-[#f27a24] to-[#e33633]",
            icon: Trophy
        },
        {
            id: 2,
            title: "ROC Banner",
            desc: "Explore High-Yield DRP Plans available now.",
            gradient: "from-blue-500 to-indigo-600",
            icon: Layout
        },
        {
            id: 3,
            title: "ROC Banner",
            desc: "Register early for the upcoming community gathering.",
            gradient: "from-emerald-500 to-teal-600",
            icon: Megaphone
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-400 h-64 md:h-80 lg:h-[380px]">
            {slides.map((slide, index) => {
                const Icon = slide.icon;
                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-gradient-to-r ${slide.gradient} p-8 md:p-10 text-white flex items-center
                            ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        <div className="relative z-20 space-y-1">
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none drop-shadow-sm">{slide.title.substring(0, slide.title.indexOf(' '))} <br /> {slide.title.substring(slide.title.indexOf(' ') + 1)}</h3>
                            <p className="text-sm md:text-md lg:text-lg font-bold opacity-90 mt-1">{slide.desc}</p>
                        </div>

                        {/* Huge Watermark Icon */}
                        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 z-10 opacity-[0.15]">
                            <Icon className="w-56 h-56 md:w-[24rem] md:h-[24rem] transform rotate-12" />
                        </div>
                    </div>
                );
            })}

            {/* Slider Navigation Dots */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-6 md:w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// New Component: Rank & Royalty Card
const RankRoyaltyCard = () => {
    const user = useAuthStore((state) => state.user);
    const rank = user?.rank || 'NO RANK';

    return (
        <div className="bg-[#1b2132] rounded-[2.5rem] p-8 shadow-xl flex flex-col items-center justify-between text-center border-t-4 border-[#e4b94a] h-full relative overflow-hidden">
            {/* Top Trophy Icon */}
            <div className="w-20 h-20 rounded-full border border-[#e4b94a]/30 flex items-center justify-center mb-6 bg-[#1b2132] shadow-[0_0_15px_rgba(228,185,74,0.1)]">
                <Trophy className="w-10 h-10 text-[#e4b94a]" />
            </div>

            {/* Rank Text */}
            <div className="mb-8 w-full z-10">
                <p className="text-[#8e9bb3] text-xs font-bold tracking-[0.3em] uppercase mb-2">Your Current Rank</p>
                <h3 className="text-white text-5xl md:text-6xl font-black uppercase tracking-tighter drop-shadow-md">{rank}</h3>
            </div>

            {/* Royalty Reward Inner Card */}
            <div className="w-full bg-[#232b3f] rounded-[2rem] p-6 text-left border border-[#3b4459] relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-[#8e9bb3] font-bold text-sm">Royalty Reward</p>
                    <div className="flex space-x-0.5">
                        <div className="w-1.5 h-1.5 rounded-full border border-[#e4b94a]"></div>
                        <div className="w-1.5 h-1.5 rounded-full border border-[#e4b94a]"></div>
                        <div className="w-1.5 h-1.5 rounded-full border border-[#e4b94a]"></div>
                    </div>
                </div>

                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-white text-6xl font-black tracking-tighter">0%</span>
                    <span className="text-[#e4b94a] font-bold text-sm">Monthly Fix Royalty</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#2d364a] border border-[#3b4459] rounded-xl px-4 py-2">
                    <span className="text-[#e4b94a] font-bold text-lg">$0</span>
                    <span className="text-[#8e9bb3] text-xs font-bold">Monthly Amount</span>
                </div>
            </div>

            {/* Background subtle glow */}
            <div className="absolute top-[20%] right-[-10%] w-40 h-40 bg-[#e4b94a]/5 rounded-full blur-3xl"></div>
        </div>
    );
};

// New Component: My Earnings
const MyEarnings = () => {
    // using dummy formatting for display context
    return (
        <div className="bg-surface border border-gray-400 rounded-3xl p-5 shadow-lg shadow-gray-400 h-full flex flex-col">
            <SectionHeader title="My Earnings" icon={Wallet} />
            <div className="flex-1 space-y-4 flex flex-col justify-center">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-md">
                    <p className="text-xs md:text-sm font-bold opacity-80 uppercase tracking-wider mb-1">Total Income</p>
                    <h3 className="text-3xl md:text-4xl font-black">$ 12,450.00</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-200/50 p-3 rounded-xl border border-gray-300">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase mb-1">ROC Income</p>
                        <p className="font-bold text-text-main text-base md:text-lg">$ 5,200</p>
                    </div>
                    <div className="bg-gray-200/50 p-3 rounded-xl border border-gray-300">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase mb-1">Stake Income</p>
                        <p className="font-bold text-text-main text-base md:text-lg">$ 3,850</p>
                    </div>
                    <div className="bg-gray-200/50 p-3 rounded-xl border border-gray-300">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase mb-1">Direct Ref</p>
                        <p className="font-bold text-text-main text-base md:text-lg">$ 1,400</p>
                    </div>
                    <div className="bg-gray-200/50 p-3 rounded-xl border border-gray-300">
                        <p className="text-[10px] md:text-xs text-text-muted font-bold uppercase mb-1">Reward</p>
                        <p className="font-bold text-text-main text-base md:text-lg">$ 2,000</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// New Component: Quick Actions
const QuickActions = () => {
    const navigate = useNavigate();

    const actions = [
        { label: 'Buy IMX', icon: DollarSign, color: 'bg-blue-200 text-blue-600', path: '/buy-imx' },
        { label: 'Stake', icon: TrendingUp, color: 'bg-purple-200 text-purple-600', path: '/stake' },
        { label: 'Withdraw', icon: ArrowUpRight, color: 'bg-emerald-200 text-emerald-600', path: '/withdraw' },
        { label: 'Rewards', icon: Gift, color: 'bg-orange-200 text-orange-600', path: '/all-rewards' },
        { label: 'Hierarchy', icon: Users, color: 'bg-indigo-200 text-indigo-600', path: '/hierarchy' },
        { label: 'Company', icon: Building2, color: 'bg-gray-200 text-gray-700', path: '/company' },
    ];

    return (
        <div className="bg-surface border border-gray-400 rounded-3xl p-5 shadow-lg shadow-gray-400 h-full flex flex-col">
            <SectionHeader title="Quick Actions" icon={ArrowUpRight} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 flex-1 place-content-center mt-2">
                {actions.map((action, idx) => {
                    const Icon = action.icon;
                    return (
                        <button
                            key={idx}
                            onClick={() => navigate(action.path)}
                            className="flex flex-col items-center justify-center p-3 md:p-4 rounded-2xl border border-gray-400 hover:border-primary hover:shadow-lg hover:shadow-gray-400 transition-all bg-gray-50/50 group"
                        >
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 md:mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-[10px] md:text-xs font-bold text-text-main text-center uppercase tracking-wide">{action.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

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
    const [activeTab, setActiveTab] = useState('display_banner'); // Default tab

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
        { id: 'roc_banner', label: 'ROC Banner', icon: Trophy },
        { id: 'my_earnings', label: 'My Earnings', icon: Wallet },
        { id: 'quick_actions', label: 'Quick Actions', icon: ArrowUpRight },
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
            <div className="md:hidden overflow-x-auto bg-gray-300 rounded-xl p-1 -mx-4 scrollbar-hide">
                <div className="flex space-x-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all
                                    ${activeTab === tab.id
                                        ? 'bg-white text-primary'
                                        : 'text-text-muted'}
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



                {/* ROC Banner & My Earnings */}
                <div className={`${activeTab === 'roc_banner' || activeTab === 'my_earnings' ? 'block' : 'hidden'} md:block md:col-span-2 lg:col-span-3 mb-6`}>
                    <div className="flex flex-col xl:flex-row gap-6 items-stretch">
                        <div className={`${activeTab === 'roc_banner' ? 'block' : 'hidden'} md:block w-full xl:w-[60%]`}>
                            <ROCBanner />
                        </div>
                        <div className={`${activeTab === 'my_earnings' ? 'block' : 'hidden'} md:block w-full xl:w-[40%]`}>
                            <MyEarnings />
                        </div>
                    </div>
                </div>

                {/* Advisor Ranking & News */}
                <div className={`${activeTab === 'advisor_ranking' || activeTab === 'news' ? 'block' : 'hidden'} md:block md:col-span-2 lg:col-span-3`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className={`${activeTab === 'advisor_ranking' ? 'block' : 'hidden'} md:block`}>
                            <AdvisorRanking />
                        </div>
                        <div className={`${activeTab === 'news' ? 'block' : 'hidden'} md:block`}>
                            <NewsBox />
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`${getVisibilityClass('quick_actions')} md:col-span-1 lg:col-span-2`}>
                    <QuickActions />
                </div>
                {/* Announcements */}
                <div className={`${getVisibilityClass('announcements')}`}>
                    <AnnouncementBox />
                    {/* Notifications */}
                    <div className={`${getVisibilityClass('notifications')} mt-6`}>
                        <NotificationSystem />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;
