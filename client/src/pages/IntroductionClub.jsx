import React, { useState } from 'react';
import { Award, Filter, Download } from 'lucide-react';

const IntroductionClub = () => {
    const [selectedLevel, setSelectedLevel] = useState('All Levels');

    // Mock Data for levels
    const levels = ['All Levels', 'Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Award className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Level Rewards</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Introduction Club Reward Income History</p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-black rounded-3xl border border-gray-800 p-6 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter className="w-5 h-5 text-primary" />
                    <span className="text-white font-bold uppercase text-xs tracking-wider whitespace-nowrap">Filter by Level:</span>
                </div>

                <div className="relative w-full md:w-64">
                    <select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-xl py-3 px-4 appearance-none font-bold text-xs uppercase focus:outline-none focus:border-primary cursor-pointer hover:bg-gray-800 transition-colors"
                    >
                        {levels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <div className="w-2 h-2 border-r-2 border-b-2 border-primary rotate-45 mb-1"></div>
                    </div>
                </div>
            </div>

            {/* Reward History Table */}
            <div className="bg-black rounded-3xl border border-gray-800 overflow-hidden shadow-lg">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-primary" />
                        <h3 className="text-white font-bold uppercase text-sm tracking-wider">Reward History</h3>
                    </div>

                    <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
                        <span className="text-[10px] text-gray-400 font-bold uppercase mr-2">Total:</span>
                        <span className="text-primary font-bold text-sm">0.00 IMX</span>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-900/50">
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">From Address</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Reward Source</th>
                                <th className="text-left py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                                <th className="text-right py-4 px-6 text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Empty State */}
                            <tr>
                                <td colSpan="4" className="py-24 text-center">
                                    <p className="text-gray-600 font-bold uppercase text-xs tracking-widest">No Rewards Found</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default IntroductionClub;
