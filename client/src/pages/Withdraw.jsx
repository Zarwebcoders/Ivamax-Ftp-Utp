import React, { useState } from 'react';
import { Wallet, AlertCircle, CheckCircle2, Clock, ArrowRight } from 'lucide-react';

const Withdraw = () => {
    const [amount, setAmount] = useState('');

    return (
        <div className="space-y-6 md:space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Withdraw Protok</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Withdraw Protok</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Securely withdraw your earned rewards</p>
                </div>
            </div>

            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Protok Balance */}
                <div className="bg-green-100 border border-green-500 rounded-3xl p-6 shadow-lg shadow-gray-400 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-extrabold text-[#3a5d4e] uppercase tracking-wider mb-1">Protok Balance</p>
                        <h3 className="text-2xl font-black text-green-600">$0.00</h3>
                    </div>
                    <div className="w-10 h-10 border border-green-500 rounded-full flex items-center justify-center text-green-600">
                        <span className="text-lg font-normal">$</span>
                    </div>
                </div>

                {/* Total Withdrawn */}
                <div className="bg-[#e0f2fe] border border-blue-400 rounded-3xl p-6 shadow-lg shadow-gray-400 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">Total Withdrawn</p>
                        <h3 className="text-2xl font-black text-blue-500">$0.00</h3>
                    </div>
                    <div className="w-10 h-10 border border-blue-500 rounded-full flex items-center justify-center text-blue-500">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-[#ffedd5] border border-orange-400 rounded-3xl p-6 shadow-lg shadow-gray-400 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">Pending Requests</p>
                        <h3 className="text-2xl font-black text-orange-600">$0.00</h3>
                    </div>
                    <div className="w-10 h-10 border border-orange-500 rounded-full flex items-center justify-center text-orange-600">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Two-column layout for Form and History */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Left Column: Request Payout Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-400 rounded-3xl p-6 shadow-lg shadow-gray-400">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Request Payout</h3>

                        <div className="space-y-6">
                            {/* Wallet Address */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Wallet Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Wallet className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter wallet address"
                                        className="w-full bg-white border border-gray-300 text-gray-800 rounded-2xl py-3 pl-10 pr-4 focus:outline-none focus:border-[#af8c30] focus:ring-1 focus:ring-[#af8c30] text-sm font-medium"
                                    />
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-600">Amount</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <span className="text-gray-400 font-bold">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-white border border-gray-300 text-gray-800 rounded-2xl py-3 pl-8 pr-4 focus:outline-none focus:border-[#af8c30] focus:ring-1 focus:ring-[#af8c30] text-sm font-medium"
                                    />
                                </div>
                                <p className="text-[10px] text-gray-400 flex items-center gap-1 font-medium mt-1">
                                    <AlertCircle className="w-3 h-3 text-gray-400" /> Min withdrawal: $10. No Fee
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button className="w-full bg-[#ae8a28] hover:bg-[#967728] text-white font-bold py-3.5 rounded-2xl shadow-md transition-all active:scale-95 text-sm flex items-center justify-center gap-2 mt-4">
                                <span>Proceed to Withdraw</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Withdrawal History */}
                <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-400 rounded-3xl shadow-lg shadow-gray-400 h-full flex flex-col overflow-hidden min-h-[400px]">
                        {/* Header & Tabs */}
                        <div className="border-b border-gray-200 p-4 md:px-6 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h3 className="text-[15px] font-bold text-gray-800">Withdrawal History</h3>
                            <div className="flex bg-[#f3f4f6] p-1 rounded-xl gap-1">
                                <button className="bg-[#ae8a28] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-lg shadow-gray-200 border border-gray-400">All</button>
                                <button className="text-gray-500 hover:text-gray-700 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-gray-200 border border-gray-400">Approved</button>
                                <button className="text-gray-500 hover:text-gray-700 text-xs font-bold px-4 py-1.5 rounded-lg transition-colors shadow-lg shadow-gray-200 border border-gray-400">Pending</button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col items-center justify-center">
                            <Wallet className="w-16 h-16 text-gray-400 mb-4 opacity-50" strokeWidth={1} />
                            <p className="text-gray-500 font-medium text-sm">No withdrawal history yet</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Withdraw;
