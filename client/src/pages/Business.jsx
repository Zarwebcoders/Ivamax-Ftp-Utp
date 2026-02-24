import React, { useState } from 'react';
import { Users, Search, Filter, Users2, UserPlus, User, Briefcase, Wallet } from 'lucide-react';

const BusinessCard = ({ title, value, icon: Icon, iconBgColor, iconColor, valueColor = "text-blue-600" }) => (
    <div className="bg-white rounded-2xl p-5 border border-gray-400 shadow-gray-400 shadow-lg flex justify-between items-center transition-transform hover:scale-105">
        <div className="flex flex-col">
            <span className="text-gray-500 font-bold text-sm mb-1">{title}</span>
            <span className={`text-3xl font-black ${valueColor}`}>{value}</span>
        </div>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBgColor} ${iconColor}`}>
            <Icon className="w-6 h-6" />
        </div>
    </div>
);

const Business = () => {
    // Team List States
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Members');
    // Mock Data for Team List
    const teamMembers = [];

    return (
        <div className="space-y-8 pb-12">
            {/* Page Header */}
            <div className="bg-surface border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">Business</h1>
                        <p className="text-sm font-bold text-text-muted uppercase">View Your Team List Business Data</p>
                    </div>
                </div>
            </div>

            {/* Business Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <BusinessCard
                    title="Self Business"
                    value="$0.00"
                    icon={User}
                    iconBgColor="bg-purple-50"
                    iconColor="text-purple-500"
                    valueColor="text-purple-600"
                />
                <BusinessCard
                    title="Direct Team"
                    value="0"
                    icon={UserPlus}
                    iconBgColor="bg-blue-50"
                    iconColor="text-blue-500"
                    valueColor="text-blue-600"
                />
                <BusinessCard
                    title="Total Team"
                    value="0"
                    icon={Users2}
                    iconBgColor="bg-indigo-50"
                    iconColor="text-indigo-500"
                    valueColor="text-indigo-600"
                />
                <BusinessCard
                    title="Team Business"
                    value="$0.00"
                    icon={Briefcase}
                    iconBgColor="bg-pink-50"
                    iconColor="text-pink-500"
                    valueColor="text-pink-600"
                />
                <BusinessCard
                    title="Used Balance"
                    value="$0.00"
                    icon={Wallet}
                    iconBgColor="bg-emerald-50"
                    iconColor="text-emerald-500"
                    valueColor="text-emerald-600"
                />
            </div>

            {/* Team List View */}
            <div className="space-y-6">
                {/* Search and Filter Section - Dark Theme */}
                <div className="bg-white rounded-3xl p-4 shadow-lg shadow-gray-600 border border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="SEARCH USERNAME, EMAIL OR ADDRESS"
                            className="w-full bg-gray-300 border border-gray-700 text-black rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary text-xs font-bold uppercase tracking-wider"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <Filter className="text-primary w-5 h-5" />
                        <span className="text-black font-bold text-xs uppercase">Status :</span>
                        <select
                            className="bg-gray-300 border border-gray-700 text-black rounded-xl py-2 px-4 focus:outline-none focus:border-primary text-xs font-bold uppercase"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Members</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Team Members Table - Dark Theme */}
                <div className="bg-white rounded-3xl border border-gray-800 shadow-gray-600 overflow-hidden shadow-lg min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-800">
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">User Info</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Status</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Business</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">DRP Stake</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">UTP Stake</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Team Info</th>
                                    <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">Joined Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teamMembers.length > 0 ? (
                                    teamMembers.map((member, index) => (
                                        <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                                            <td className="py-4 px-6 text-black">{member.name}</td>
                                            <td className="py-4 px-6 text-black">{member.status}</td>
                                            <td className="py-4 px-6 text-black">{member.business}</td>
                                            <td className="py-4 px-6 text-black">{member.ftpStake}</td>
                                            <td className="py-4 px-6 text-black">{member.utpStake}</td>
                                            <td className="py-4 px-6 text-black">{member.teamInfo}</td>
                                            <td className="py-4 px-6 text-black">{member.joinedDate}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-20 text-center">
                                            <p className="text-black font-bold uppercase text-xs tracking-wider">No Team Members Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Business;
