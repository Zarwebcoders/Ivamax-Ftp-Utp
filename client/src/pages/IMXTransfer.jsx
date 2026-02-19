import React, { useState } from 'react';
import { Wallet, History, ArrowRightLeft, CreditCard, Layers, Activity } from 'lucide-react';

const WalletCard = ({ title, items, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {title}
            </h3>
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                <Wallet className="w-4 h-4" />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {items.map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{item.label}</p>
                    <p className="text-lg font-bold text-text-main text-green-600">{item.value}</p>
                    <p className="text-[10px] font-bold text-text-muted mt-1">{item.subtext}</p>
                </div>
            ))}
        </div>

        {/* Decorative background element */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
    </div>
);

const HistorySection = ({ title, activeTab, onTabChange }) => (
    <div className="bg-black rounded-3xl border border-gray-800 shadow-lg shadow-gray-600 overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-white font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                {title}
            </h3>
            <div className="flex gap-2">
                <button
                    onClick={() => onTabChange('FTP')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'FTP' ? 'bg-primary text-black' : 'bg-gray-700 text-gray-400 hover:bg-gray-800'}`}
                >
                    FTP {title.split(' ')[0]}
                </button>
                <button
                    onClick={() => onTabChange('UTP')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${activeTab === 'UTP' ? 'bg-secondary text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-800'}`}
                >
                    UTP {title.split(' ')[0]}
                </button>
            </div>
        </div>
        <div className="p-12 text-center bg-gray-950/50 min-h-[150px] flex flex-col items-center justify-center">
            <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">No Records Found for {activeTab}</p>
        </div>
    </div>
);

const IMXTransfer = () => {
    const [captokTab, setCaptokTab] = useState('FTP');
    const [protokTab, setProtokTab] = useState('FTP');
    const [activeTab, setActiveTab] = useState('holdings'); // 'holdings', 'history'
    const [historyType, setHistoryType] = useState('captok'); // 'captok', 'protok'

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Reward Center</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Reward Center</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Manage Assets & Transfers</p>
                </div>
            </div>

            {/* Mobile Tab Navigation */}
            <div className="md:hidden bg-black p-2 rounded-2xl border border-gray-800 flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('holdings')}
                    className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'holdings'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    Holdings
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`flex-1 py-3 px-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${activeTab === 'history'
                        ? 'bg-primary text-black shadow-lg shadow-primary/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-900'
                        }`}
                >
                    History
                </button>
            </div>

            {/* Wallet Holdings Section */}
            <div className={`space-y-6 ${activeTab === 'holdings' ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-xl font-bold text-text-main uppercase border-l-4 border-primary pl-4">Wallet Holdings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WalletCard
                        title="Captok Wallet"
                        icon={CreditCard}
                        items={[
                            { label: "Captok Balance", value: "$0", subtext: "0 IMX" },
                            { label: "Used Balance", value: "$0", subtext: "0 IMX" },
                            { label: "Free Balance", value: "$0", subtext: "0 IMX" }
                        ]}
                    />
                    <WalletCard
                        title="Protok Wallet"
                        icon={Layers}
                        items={[
                            { label: "Protok Balance", value: "$0", subtext: "0 IMX" },
                            { label: "FTP Pro Balance", value: "$0", subtext: "0 IMX" },
                            { label: "UTP Pro Balance", value: "$0", subtext: "0 IMX" }
                        ]}
                    />
                    <WalletCard
                        title="FTP Plan"
                        icon={Activity}
                        items={[
                            { label: "FTP Stake Inv.", value: "$0", subtext: "0 IMX" },
                            { label: "FTP Pro Balance", value: "$0", subtext: "0 IMX" },
                        ]}
                    />
                    <WalletCard
                        title="UTP Plan"
                        icon={Activity}
                        items={[
                            { label: "UTP Unit", value: "$0", subtext: "0 IMX" },
                            { label: "UTP Stake Inv.", value: "$0", subtext: "0 IMX" },
                            { label: "UTP Pro Balance", value: "$0", subtext: "0 IMX" }
                        ]}
                    />
                </div>
            </div>

            {/* Transaction History Section */}
            <div className={`space-y-6 pt-6 ${activeTab === 'history' ? 'block' : 'hidden'} md:block`}>
                <h2 className="text-xl font-bold text-text-main uppercase border-l-4 border-secondary pl-4">Transaction History</h2>

                {/* History Type Tabs */}
                <div className="flex gap-4 border-b border-gray-800 pb-2 mb-4 overflow-x-auto">
                    <button
                        onClick={() => setHistoryType('captok')}
                        className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all whitespace-nowrap ${historyType === 'captok'
                            ? 'text-primary border-primary'
                            : 'text-gray-500 border-transparent hover:text-gray-300'
                            }`}
                    >
                        Captok History
                    </button>
                    <button
                        onClick={() => setHistoryType('protok')}
                        className={`text-sm font-bold uppercase tracking-wider pb-2 border-b-2 transition-all whitespace-nowrap ${historyType === 'protok'
                            ? 'text-primary border-primary'
                            : 'text-gray-500 border-transparent hover:text-gray-300'
                            }`}
                    >
                        Protok History
                    </button>
                </div>

                <div className="space-y-6">
                    {historyType === 'captok' && (
                        <HistorySection
                            title="Captok History"
                            activeTab={captokTab}
                            onTabChange={setCaptokTab}
                        />
                    )}
                    {historyType === 'protok' && (
                        <HistorySection
                            title="Protok History"
                            activeTab={protokTab}
                            onTabChange={setProtokTab}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default IMXTransfer;
