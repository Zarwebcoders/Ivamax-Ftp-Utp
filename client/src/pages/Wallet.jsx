import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, DollarSign, Layers, CreditCard, Activity, Landmark, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const ActionButton = ({ icon: Icon, label, colorClass, onClick, link }) => {
    const Content = () => (
        <div className="bg-black border border-gray-800 shadow-lg shadow-gray-800 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-900 transition-all group shadow-lg hover:shadow-xl hover:translate-y-[-2px]">
            <div className={`p-4 rounded-2xl bg-gray-900 group-hover:bg-gray-800 transition-colors ${colorClass}`}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="text-white font-bold uppercase text-xs tracking-widest">{label}</span>
        </div>
    );

    if (link) {
        return <Link to={link} className="block w-full"><Content /></Link>;
    }

    return <button onClick={onClick} className="w-full"><Content /></button>;
};

const WalletCard = ({ title, items, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-md transition-all group relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 relative z-10">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4" />}
                {title}
            </h3>
            <div className="p-2 bg-gray-50 rounded-lg text-gray-400 group-hover:text-primary transition-colors">
                <WalletIcon className="w-4 h-4" />
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

const Wallet = () => {
    // These could fulfill the "Add Funds" and "Withdraw" actions
    // For now, we will layout the UI as requested.

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <WalletIcon className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Financial Center</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Financial Center</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Ecosystem Liquidity & Portfolio Overview</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ActionButton
                    icon={ArrowDownLeft}
                    label="Add Funds"
                    colorClass="text-green-500"
                />
                <ActionButton
                    icon={ArrowUpRight}
                    label="Withdraw"
                    colorClass="text-red-500"
                    link="/withdraw"
                />
                <ActionButton
                    icon={Landmark}
                    label="Stake FTP"
                    colorClass="text-yellow-500"
                    link="/ftp"
                />
                <ActionButton
                    icon={Download}
                    label="Stake UTP"
                    colorClass="text-blue-500"
                    link="/utp"
                />
            </div>

            {/* Wallet Holdings Section */}
            <div className="space-y-6 pt-2">
                <h2 className="text-xl font-bold text-text-main uppercase border-l-4 border-primary pl-4">Wallet Holdings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <WalletCard
                        title="Captok Wallet"
                        icon={CreditCard}
                        items={[
                            { label: "Captok Balance", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "Used Balance", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "Free Balance", value: "$0.00", subtext: "0.00 IMX" }
                        ]}
                    />
                    <WalletCard
                        title="Protok Wallet"
                        icon={Layers}
                        items={[
                            { label: "Protok Balance", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "FTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "UTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" }
                        ]}
                    />
                    <WalletCard
                        title="FTP Plan"
                        icon={Activity}
                        items={[
                            { label: "FTP Stake Inv.", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "FTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" },
                        ]}
                    />
                    <WalletCard
                        title="UTP Plan"
                        icon={Activity}
                        items={[
                            { label: "UTP Unit", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "UTP Stake Inv.", value: "$0.00", subtext: "0.00 IMX" },
                            { label: "UTP Pro Balance", value: "$0.00", subtext: "0.00 IMX" }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Wallet;
