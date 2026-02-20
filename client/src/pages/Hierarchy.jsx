import React, { useState } from 'react';
import { Users, Award, DollarSign, Activity, ZoomIn, ZoomOut, User, Search, Filter, List, Network } from 'lucide-react';

const StatCard = ({ title, value, subtext, icon: Icon }) => (
    <div className="bg-surface border border-gray-400 rounded-2xl p-4 shadow-lg shadow-gray-400 hover:shadow-lg transition-all group">
        <div className="flex justify-between items-start mb-2">
            <div>
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">{title}</h3>
                <div className="text-2xl font-bold text-text-main">{value}</div>
                {subtext && <div className="text-xs font-bold text-primary mt-1">{subtext}</div>}
            </div>
            {Icon && (
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-white group-hover:bg-primary transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
            )}
        </div>
    </div>
);

// Mock Tree Data
const treeData = {
    id: 'user-1', name: 'You', rank: 'Star 3', self: '$500', team: '12', teamBus: '$5000',
    children: [
        {
            id: 'user-2', name: 'User A', rank: 'Star 2', self: '$200', team: '5', teamBus: '$1200',
            children: [
                { id: 'user-4', name: 'User A1', rank: 'Star 1', self: '$100', team: '0', teamBus: '$0' },
                { id: 'user-5', name: 'User A2', rank: 'Star 1', self: '$100', team: '0', teamBus: '$0' }
            ]
        },
        {
            id: 'user-3', name: 'User B', rank: 'Star 1', self: '$100', team: '2', teamBus: '$300',
            children: [
                { id: 'user-6', name: 'User B1', rank: 'No Rank', self: '$50', team: '0', teamBus: '$0' }
            ]
        },
        {
            id: 'user-7', name: 'User C', rank: 'No Rank', self: '$50', team: '0', teamBus: '$0', children: []
        }
    ]
};

// Simplified Recursive Tree Component to handle lines correctly
const TreeView = ({ node }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div className="relative z-10">
                <div className="bg-white border-2 border-primary/30 hover:border-primary rounded-xl p-3 w-40 shadow-lg shadow-gray-400 hover:shadow-lg transition-all flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
                        <User className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-gray-400 uppercase mb-0.5">{node.id}</p>
                    <p className="text-sm font-bold text-text-main truncate w-full">{node.name}</p>
                    <div className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 mb-2">
                        {node.rank}
                    </div>

                    <div className="grid grid-cols-3 gap-1 w-full pt-2 border-t border-gray-100">
                        <div className="flex flex-col">
                            <span className="text-[8px] text-gray-400 font-bold">SELF</span>
                            <span className="text-[10px] font-bold text-gray-800">{node.self}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-gray-400 font-bold">TEAM</span>
                            <span className="text-[10px] font-bold text-gray-800">{node.team}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] text-gray-400 font-bold">BUS.</span>
                            <span className="text-[10px] font-bold text-gray-800">{node.teamBus}</span>
                        </div>
                    </div>
                </div>

                {/* Toggle Button */}
                {hasChildren && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(!expanded);
                        }}
                        className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:shadow-md transition-all z-20"
                        title={expanded ? "Collapse" : "Expand"}
                    >
                        {expanded ? <span className="text-lg font-bold leading-none mb-1">-</span> : <span className="text-lg font-bold leading-none mb-0.5">+</span>}
                    </button>
                )}
            </div>

            {/* Children Container */}
            {hasChildren && expanded && (
                <div className="flex flex-col items-center">
                    {/* Vertical Line from Parent Card Down to Crossbar */}
                    <div className="w-px h-8 bg-gray-400"></div>

                    {/* Children Row using Padding instead of Gap for continuous lines */}
                    <div className="flex items-start justify-center">
                        {node.children.map((child, index) => (
                            <div key={child.id} className="flex flex-col items-center relative px-4">
                                {/* Horizontal Line Left (from center to left edge) */}
                                {index > 0 && (
                                    <div className="absolute top-0 left-0 w-1/2 h-px bg-gray-400"></div>
                                )}

                                {/* Horizontal Line Right (from center to right edge) */}
                                {index < node.children.length - 1 && (
                                    <div className="absolute top-0 right-0 w-1/2 h-px bg-gray-400"></div>
                                )}

                                {/* Vertical Line from Crossbar Down to Child Card */}
                                <div className="w-px h-8 bg-gray-400"></div>

                                <TreeView node={child} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const Hierarchy = () => {
    const [viewMode, setViewMode] = useState('genealogy'); // 'genealogy' or 'list'
    const [zoom, setZoom] = useState(1);

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
                        <h1 className="text-2xl font-bold text-text-main uppercase">Network Hierarchy</h1>
                        <p className="text-sm font-bold text-text-muted uppercase">Invite Partners & Earn Ecosystem Rewards</p>
                    </div>
                </div>

                {/* View Switcher */}
                <div className="flex bg-gray-300 p-1 rounded-xl">
                    <button
                        onClick={() => setViewMode('genealogy')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'genealogy'
                            ? 'bg-white text-primary shadow-lg'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Network className="w-4 h-4" />
                        <span>Genealogy</span>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'list'
                            ? 'bg-white text-primary shadow-lg'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <List className="w-4 h-4" />
                        <span>Team List</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Self Business" value="$0.00" subtext="0 IMX" icon={DollarSign} />
                <StatCard title="Direct Team" value="0" icon={Users} />
                <StatCard title="Direct Self Business" value="$0.00" subtext="0 IMX" icon={Activity} />
                <StatCard title="Total Team" value="0" icon={Award} />
                <StatCard title="Team Business" value="$0.00" icon={DollarSign} />
                <StatCard title="Rank" value="Unranked" icon={Award} />
            </div> */}

            {/* Genealogy Tree View */}
            {viewMode === 'genealogy' && (
                <div className="space-y-6">
                    <div className="bg-surface border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 h-[600px] flex flex-col relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-2">
                                <Users className="w-5 h-5 text-primary" />
                                <h2 className="text-xl font-bold text-text-main uppercase tracking-wide border-l-4 border-primary pl-3">
                                    Network Genealogy
                                </h2>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => setZoom(z => Math.max(0.2, z - 0.1))} className="p-2 bg-gray-300 rounded-lg hover:border-gray-400 hover:border-black border hover:text-black transition-all text-gray-600">
                                    <ZoomOut className="w-5 h-5" />
                                </button>
                                <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 bg-gray-300 rounded-lg hover:border-gray-400 hover:border-black border hover:text-black transition-all text-gray-600">
                                    <ZoomIn className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 bg-gray-300 rounded-2xl border border-gray-100 overflow-auto relative cursor-grab active:cursor-grabbing no-scrollbar">
                            <div className="min-w-max min-h-max p-20 flex justify-center origin-top-left transition-transform duration-200"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}>
                                <TreeView node={treeData} />
                            </div>
                        </div>
                    </div>

                    {/* Rank Legend */}
                    <div className="bg-surface border border-gray-400 shadow-lg shadow-gray-400 rounded-2xl p-4">
                        <h3 className="text-sm font-bold text-primary uppercase mb-4 flex items-center">
                            <Award className="w-4 h-4 mr-2" />
                            Rank Legend
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {['Star 1', 'Star 2', 'Star 3', 'Star 4', 'Star 5', 'Star 6', 'Star 7', 'No Rank'].map((rank, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                    <div className={`w-3 h-3 rounded-full border border-gray-300 ${idx < 3 ? 'bg-primary' : rank === 'No Rank' ? 'bg-gray-400' : 'bg-secondary'}`}></div>
                                    <span className="text-xs font-bold text-text-muted uppercase">{rank}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Team List View */}
            {viewMode === 'list' && (
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
                                        <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase">FTP Stake</th>
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
            )}
        </div>
    );
};

export default Hierarchy;
