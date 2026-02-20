import React, { useEffect, useState } from 'react';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import { User, ZoomIn, ZoomOut } from 'lucide-react';
import { cn } from '../utils/cn';

const TreeNode = ({ node, level = 0 }) => {
    const [expanded, setExpanded] = useState(true);

    if (!node) return (
        <div className="flex flex-col items-center p-4 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 opacity-50 min-w-[120px]">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <User className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Empty</span>
        </div>
    );

    const hasChildren = node.left || node.right;

    return (
        <div className="flex flex-col items-center">
            <div className="relative">
                <div
                    className={cn(
                        "relative flex flex-col items-center p-4 border-2 rounded-2xl min-w-[140px] transition-all bg-white mb-2",
                        node.rank === 'Member' ? 'border-gray-200' : 'border-primary/50 shadow-md shadow-primary/10'
                    )}
                >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold mb-2 shadow-lg shadow-primary/20 text-lg">
                        {node.name?.[0] || <User className="w-5 h-5" />}
                    </div>
                    <h3 className="text-sm font-bold text-text-main">{node.userId}</h3>
                    <p className="text-xs text-text-muted font-medium bg-gray-100 px-2 py-0.5 rounded-md mt-1">{node.name}</p>
                    <span className="text-[10px] uppercase tracking-wider bg-primary/10 px-2 py-0.5 rounded-full mt-2 text-primary font-bold">
                        {node.rank}
                    </span>

                    {/* Expand/Collapse Button */}
                    {hasChildren && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpanded(!expanded);
                            }}
                            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border border-gray-300 rounded-full flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:shadow-md transition-all z-10"
                            title={expanded ? "Collapse" : "Expand"}
                        >
                            {expanded ? <span className="text-lg font-bold leading-none mb-1">-</span> : <span className="text-lg font-bold leading-none mb-0.5">+</span>}
                        </button>
                    )}
                </div>
            </div>

            {/* Connection Line */}
            {hasChildren && expanded && (
                <div className="flex flex-col items-center w-full">
                    <div className="h-6 w-0.5 bg-gray-300"></div>
                    <div className="flex w-full justify-center relative">
                        <div className="absolute top-0 w-1/2 border-t-2 border-gray-300"></div>
                        <div className="flex gap-12 pt-6">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-text-muted mb-2 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">LEFT</span>
                                {node.left ? <TreeNode node={node.left} level={level + 1} /> : <TreeNode node={null} />}
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-text-muted mb-2 bg-white px-2 py-0.5 rounded-full border border-gray-200 shadow-sm">RIGHT</span>
                                {node.right ? <TreeNode node={node.right} level={level + 1} /> : <TreeNode node={null} />}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const Network = () => {
    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        fetchTree(user?.userId);
    }, [user]);

    const fetchTree = async (nodeId) => {
        try {
            setLoading(true);
            const res = await api.get(`/user/tree/${nodeId || 'null'}`);
            const { root, left, right } = res.data;
            setTreeData({ ...root, left, right });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 2));
    const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.4));
    const handleResetZoom = () => setZoomLevel(1);

    return (
        <div className="h-full flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-2 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-text-main">Network Tree</h1>
                    <p className="text-text-muted mt-1">Visualize your team hierarchy</p>
                </div>

                <div className="flex space-x-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm self-end md:self-auto z-10">
                    <button
                        onClick={handleZoomOut}
                        className="p-2 hover:bg-gray-100 rounded-lg text-text-muted transition-colors"
                        title="Zoom Out"
                    >
                        <ZoomOut className="w-5 h-5" />
                    </button>
                    <span className="flex items-center text-xs font-bold text-gray-400 px-2 select-none">
                        {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                        onClick={handleZoomIn}
                        className="p-2 hover:bg-gray-100 rounded-lg text-text-muted transition-colors"
                        title="Zoom In"
                    >
                        <ZoomIn className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden relative shadow-inner">
                <div
                    className="absolute inset-0 flex justify-center items-start p-12 transition-transform duration-200 ease-out origin-top"
                    style={{ transform: `scale(${zoomLevel})` }}
                >
                    {loading ? (
                        <div className="flex flex-col items-center justify-center h-full text-text-muted animate-pulse mt-20">
                            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                            <p className="font-bold">Loading Network...</p>
                        </div>
                    ) : (
                        <TreeNode node={treeData} />
                    )}
                </div>

                {/* Reset Zoom Button Overlay */}
                {zoomLevel !== 1 && (
                    <button
                        onClick={handleResetZoom}
                        className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-white transition-all z-20"
                    >
                        Reset View
                    </button>
                )}
            </div>
        </div>
    );
};

export default Network;
