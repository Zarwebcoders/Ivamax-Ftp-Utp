import React from 'react';
import { FileText, BookOpen, Download, ExternalLink, Library } from 'lucide-react';

const MarketingMaterial = () => {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <header className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Library className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Resource Center</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Official Marketing Materials & Documentation</p>
                </div>
            </header>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Advisor Income Program */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Advisor Income Program</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Official Guideline for Marketing Incentives</p>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PDF Format • 2.4 MB</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>Download Guide</span>
                        </button>
                    </div>
                </div>

                {/* Platform Ecosystem */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Platform Ecosystem</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Comprehensive Guides on Gitbook Cloud</p>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Online Docs • v2.1.0</span>
                        </div>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>Explore Wiki</span>
                        </button>
                    </div>
                </div>

                {/* Finance Tenure Bundle */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Finance Tenure Bundle</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">FTP Structural Rewards & Projections</p>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PDF Format • 1.8 MB</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>Open Repository</span>
                        </button>
                    </div>
                </div>

                {/* United Tenure Package */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">United Tenure Package</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">UTP Algorithm & Reward Cycle Docs</p>
                        </div>
                        <div className="bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Online Docs • v1.0.4</span>
                        </div>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Protocol</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Document Legend */}
            <div className="bg-black border border-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <Library className="w-5 h-5 text-gray-500" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Document Legend</span>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex items-start gap-3 max-w-xs">
                        <div className="w-2 h-2 rounded-full bg-primary mt-1 shrink-0"></div>
                        <div>
                            <p className="text-[10px] font-bold text-white uppercase mb-1">Blueprint Docs</p>
                            <p className="text-[10px] text-gray-500 font-medium">Deep dive into revenue models and strategic ecosystem growth.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 max-w-xs">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0"></div>
                        <div>
                            <p className="text-[10px] font-bold text-white uppercase mb-1">Live Wiki</p>
                            <p className="text-[10px] text-gray-500 font-medium">Real-time updated technical documentation and interface tutorials.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingMaterial;
