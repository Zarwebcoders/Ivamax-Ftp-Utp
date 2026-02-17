import React, { useState } from 'react';
import { Banknote, Wallet, History, AlertCircle } from 'lucide-react';

const Withdraw = () => {
    const [amount, setAmount] = useState('');

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Wallet className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Withdraw Protok</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Securely withdraw your earned rewards</p>
                </div>
            </div>

            {/* Withdraw Card */}
            <div className="flex justify-center">
                <div className="w-full max-w-xl bg-white border border-gray-400 rounded-3xl p-8 shadow-xl shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:shadow-golden-300 hover:border-golden-400 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none"></div>

                    <div className="relative z-10 space-y-6">
                        {/* Balance Display */}
                        <div className="bg-black rounded-2xl p-6 border border-gray-800 flex justify-between items-center shadow-lg">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Available Balance</p>
                                <h2 className="text-3xl font-bold text-primary">$0</h2>
                            </div>
                            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-primary border border-gray-700">
                                <span className="font-bold text-lg">$</span>
                            </div>
                        </div>

                        {/* Input Section */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-text-main uppercase tracking-wide flex justify-between">
                                <span>Withdrawal Amount ($)</span>
                                <span className="text-primary">(Min: $10)</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full bg-gray-50 border border-gray-300 text-text-main rounded-xl py-4 pl-4 pr-16 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary font-bold text-lg"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-bold text-gray-500 uppercase">USD</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center space-x-2">
                            <Banknote className="w-5 h-5" />
                            <span>Submit Withdrawal</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Withdrawal Logs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-sm font-bold text-text-main uppercase flex items-center gap-2">
                        <History className="w-4 h-4 text-primary" />
                        Withdrawal Logs
                    </h3>
                    <button className="text-[10px] font-bold bg-black text-primary px-3 py-1 rounded-lg hover:bg-gray-900 transition-colors uppercase border border-primary/20">
                        History
                    </button>
                </div>

                <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-xl min-h-[150px] flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500 font-bold uppercase text-xs tracking-widest flex items-center gap-2 justify-center">
                            <AlertCircle className="w-4 h-4" />
                            No Withdrawals Found
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Withdraw;
