import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, Plus, Loader, CheckCircle, Clock, LayoutList, ShieldCheck, CreditCard, Lock, HelpCircle, AlertTriangle, ArrowRight } from 'lucide-react';

const Support = () => {
    const token = useAuthStore((state) => state.token);
    const [tickets, setTickets] = useState([]);
    const [view, setView] = useState('home'); // 'home', 'create', 'list'
    const [formData, setFormData] = useState({ subject: '', message: '', category: 'General', priority: 'Medium' });

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/support/my-tickets', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/support/create', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setView('list'); // Switch to list view after creation
            setFormData({ subject: '', message: '', category: 'General', priority: 'Medium' });
            fetchTickets();
        } catch (err) {
            alert('Failed to create ticket');
        }
    };

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <header className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-text-main uppercase">Support Terminal</h1>
                    <p className="text-sm font-bold text-text-muted uppercase">Protocol Assistance and Technical Resolution Center</p>
                </div>
            </header>

            {/* Top Cards: Initialize & Registry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Initialize Ticket Card */}
                <button
                    onClick={() => setView(view === 'create' ? 'home' : 'create')}
                    className={`text-left rounded-3xl p-8 border transition-all duration-300 relative overflow-hidden group ${view === 'create'
                            ? 'bg-black border-primary shadow-xl shadow-primary/20'
                            : 'bg-black border-gray-800 hover:border-primary/50'
                        }`}
                >
                    <div className="absolute top-4 right-4">
                        <ArrowRight className={`w-5 h-5 text-gray-500 transition-transform group-hover:text-primary ${view === 'create' ? 'rotate-90 text-primary' : ''}`} />
                    </div>
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-primary border border-gray-700 mb-6 group-hover:scale-110 transition-transform">
                        <Plus className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase mb-2">Initialize Ticket</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Launch formal inquiry for technical anomalies or ledger inquiries</p>
                </button>

                {/* Access Registry Card */}
                <button
                    onClick={() => setView(view === 'list' ? 'home' : 'list')}
                    className={`text-left rounded-3xl p-8 border transition-all duration-300 relative overflow-hidden group ${view === 'list'
                            ? 'bg-black border-primary shadow-xl shadow-primary/20'
                            : 'bg-black border-gray-800 hover:border-primary/50'
                        }`}
                >
                    <div className="absolute top-4 right-4">
                        <ArrowRight className={`w-5 h-5 text-gray-500 transition-transform group-hover:text-primary ${view === 'list' ? 'rotate-90 text-primary' : ''}`} />
                    </div>
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-primary border border-gray-700 mb-6 group-hover:scale-110 transition-transform">
                        <LayoutList className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase mb-2">Access Registry</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Monitor status and engagement history for all active protocol tickets</p>
                </button>
            </div>

            {/* DYNAMIC CONTENT AREA */}
            {view === 'create' && (
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl animate-fade-in-up">
                    <h3 className="text-lg font-bold text-text-main uppercase mb-6 flex items-center gap-2">
                        <Plus className="w-5 h-5 text-primary" />
                        Create New Support Ticket
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option>General</option>
                                <option>Technical</option>
                                <option>Payment</option>
                                <option>Account</option>
                            </select>
                            <select
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <input
                            type="text"
                            placeholder="TICKET SUBJECT"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary uppercase placeholder:text-gray-400"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="DESCRIBE YOUR ISSUE IN DETAIL..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary h-32 uppercase placeholder:text-gray-400"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                        <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all uppercase tracking-wide text-sm">
                            Submit Ticket
                        </button>
                    </form>
                </div>
            )}

            {view === 'list' && (
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-xl animate-fade-in-up">
                    <h3 className="text-lg font-bold text-text-main uppercase mb-6 flex items-center gap-2">
                        <LayoutList className="w-5 h-5 text-primary" />
                        Ticket Registry
                    </h3>
                    <div className="grid gap-4">
                        {tickets.map((ticket) => (
                            <div key={ticket._id} className="bg-gray-50 border border-gray-100 p-6 rounded-2xl hover:border-gray-300 transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-base font-bold text-text-main flex items-center gap-2 group-hover:text-primary transition-colors">
                                            {ticket.subject}
                                        </h3>
                                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wide">{new Date(ticket.createdAt).toLocaleDateString()} • {ticket.category}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                                            ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-700'
                                        }`}>
                                        {ticket.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm font-medium">{ticket.message}</p>
                                {ticket.adminReply && (
                                    <div className="mt-4 bg-white border-l-4 border-primary p-4 rounded-r-xl shadow-sm">
                                        <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">Official Response:</p>
                                        <p className="text-sm text-gray-700 font-medium">{ticket.adminReply}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        {tickets.length === 0 && (
                            <div className="text-center py-10 text-gray-400">
                                <p className="font-bold uppercase text-xs tracking-widest">No Active Tickets Found in Registry</p>
                            </div>
                        )}
                    </div>
                </div>
            )}


            {/* Info Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Support Protocol */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Support Protocol
                    </h3>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <span className="text-xl font-bold text-gray-200">01</span>
                            <div>
                                <h4 className="text-sm font-bold text-text-main uppercase mb-1">Initialization</h4>
                                <p className="text-xs font-medium text-gray-500 uppercase leading-relaxed">Securely authenticate and define the nature of inquiry.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-xl font-bold text-gray-200">02</span>
                            <div>
                                <h4 className="text-sm font-bold text-text-main uppercase mb-1">Validation</h4>
                                <p className="text-xs font-medium text-gray-500 uppercase leading-relaxed">Support operatives verify and cross-reference protocol logs.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="text-xl font-bold text-gray-200">03</span>
                            <div>
                                <h4 className="text-sm font-bold text-text-main uppercase mb-1">Resolution</h4>
                                <p className="text-xs font-medium text-gray-500 uppercase leading-relaxed">Direct engagement until the anomaly is fully rectified.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Target Categories */}
                <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm h-full">
                    <h3 className="text-sm font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                        Target Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black rounded-2xl p-4 border border-gray-800">
                            <CreditCard className="w-5 h-5 text-primary mb-3" />
                            <h4 className="text-xs font-bold text-white uppercase mb-1">Financial</h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Ledger Sync</p>
                        </div>
                        <div className="bg-black rounded-2xl p-4 border border-gray-800">
                            <Lock className="w-5 h-5 text-primary mb-3" />
                            <h4 className="text-xs font-bold text-white uppercase mb-1">Access</h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Auth Security</p>
                        </div>
                        <div className="bg-black rounded-2xl p-4 border border-gray-800">
                            <AlertTriangle className="w-5 h-5 text-primary mb-3" />
                            <h4 className="text-xs font-bold text-white uppercase mb-1">Technical</h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Core Errors</p>
                        </div>
                        <div className="bg-black rounded-2xl p-4 border border-gray-800">
                            <HelpCircle className="w-5 h-5 text-primary mb-3" />
                            <h4 className="text-xs font-bold text-white uppercase mb-1">General</h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">Info Request</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div className="bg-black border border-gray-800 rounded-2xl p-4 flex items-center justify-center gap-3">
                <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-700 animate-pulse delay-150"></div>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Response Latency: <span className="text-primary">~24 Hours</span> (Nominal)
                </span>
            </div>
        </div>
    );
};

export default Support;
