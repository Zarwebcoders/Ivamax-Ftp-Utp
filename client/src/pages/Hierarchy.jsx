import React, { useState, useEffect } from 'react';
import { Users, ZoomIn, ZoomOut, User, Loader } from 'lucide-react';
import api from '../lib/axios';

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

// Mock Data removed, now fetched from API

// Simplified Recursive Tree Component to handle lines correctly
const TreeView = ({ node, fetchSubTree }) => {
    const [expanded, setExpanded] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className="flex flex-col items-center">
            {/* Node Card */}
            <div className="relative z-10">
                <div
                    onClick={() => { if (fetchSubTree) fetchSubTree(node.id); }}
                    className="cursor-pointer bg-white border-2 border-primary/30 hover:border-primary rounded-xl p-3 w-40 shadow-lg shadow-gray-400 hover:shadow-lg transition-all flex flex-col items-center text-center"
                    title="Click to view this user's downline"
                >
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

                                <TreeView node={child} fetchSubTree={fetchSubTree} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const Hierarchy = () => {
    const [zoom, setZoom] = useState(1);
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentNodeId, setCurrentNodeId] = useState('null');

    useEffect(() => {
        const fetchTree = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/user/tree/${currentNodeId}`);
                setTreeData(response.data);
            } catch (error) {
                console.error("Failed to fetch tree data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTree();
    }, [currentNodeId]);

    const handleRootChange = (nodeId) => {
        setCurrentNodeId(nodeId);
    };

    const handleResetRoot = () => {
        setCurrentNodeId('null');
    };

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
            <div className="space-y-6">
                <div className="bg-surface border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 h-[600px] flex flex-col relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5 text-primary" />
                            <h2 className="text-xl font-bold text-text-main uppercase tracking-wide border-l-4 border-primary pl-3">
                                Network Genealogy
                            </h2>
                            {currentNodeId !== 'null' && (
                                <button
                                    onClick={handleResetRoot}
                                    className="ml-4 text-xs font-bold text-white bg-primary px-3 py-1 rounded-lg hover:bg-primary-dark transition-all shadow-md"
                                >
                                    Back to My Root
                                </button>
                            )}
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
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full text-primary">
                                <Loader className="w-10 h-10 animate-spin mb-4" />
                                <p className="font-bold uppercase tracking-widest text-sm text-gray-600">Building Tree...</p>
                            </div>
                        ) : treeData ? (
                            <div className="min-w-max min-h-max p-20 flex justify-center origin-top-left transition-transform duration-200"
                                style={{ transform: `scale(${zoom})`, transformOrigin: 'center top' }}>
                                <TreeView node={treeData} fetchSubTree={handleRootChange} />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-500 font-bold uppercase">
                                Failed to load tree
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Hierarchy;
