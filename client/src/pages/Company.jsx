import React, { useState, useEffect } from 'react';
import api from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import {
    Building2, ShieldCheck, LayoutList, Plus, ArrowRight, CreditCard, Lock, AlertTriangle,
    HelpCircle, Library, FileText, BookOpen, Download, ExternalLink,
    Headphones, Clock, Mail, AlertCircle, CheckCircle2, Send, Lightbulb,
    Youtube, Twitter, Facebook, Instagram, SendHorizontal, Info, ChevronDown, MessageSquare
} from 'lucide-react';

// --- Support Content Component ---
const SupportContent = () => {
    const token = useAuthStore((state) => state.token);
    const [tickets, setTickets] = useState([]);
    const [formData, setFormData] = useState({ subject: '', message: '', category: 'General', priority: 'Medium' });
    const [mobileTab, setMobileTab] = useState('create'); // 'create', 'tickets', 'connect'

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await api.get('/support/my-tickets');
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/support/create', formData);
            setFormData({ subject: '', message: '', category: 'General', priority: 'Medium' });
            fetchTickets();
            alert('Ticket created successfully!');
        } catch (err) {
            alert('Failed to create ticket');
        }
    };

    const mobileTabs = [
        { id: 'create', label: 'Create', icon: Headphones },
        { id: 'tickets', label: 'History', icon: LayoutList },
        { id: 'connect', label: 'Connect', icon: MessageSquare }
    ];

    return (
        <div className="space-y-6 animate-fade-in-up pb-12">
            {/* Mobile Tabs */}
            <div className="md:hidden flex p-1.5 bg-[#d9dde0] rounded-2xl relative w-full overflow-x-auto scrollbar-hide gap-1.5 shadow-inner mb-4">
                {mobileTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setMobileTab(tab.id)}
                            className={`flex flex-1 items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${mobileTab === tab.id
                                ? "bg-[#794ef5] text-white shadow-md transform scale-[1.02]"
                                : "text-[#58728d] hover:text-[#3b4c5d] hover:bg-white/40"
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Create Section - Visible on Desktop, or when mobileTab === 'create' */}
            <div className={`space-y-6 ${mobileTab === 'create' ? 'block' : 'hidden md:block'}`}>
                {/* Header Banner */}
                <div className="bg-[#794ef5] border border-black shadow-xl shadow-gray-400 rounded-xl p-4 flex flex-col md:flex-row justify-between md:items-center gap-4 text-white shadow-lg overflow-hidden relative">
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                            <Headphones className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg md:text-xl tracking-tight">Support Center</h2>
                            <p className="text-xs text-white/80">We're here to help you 24/7</p>
                        </div>
                    </div>
                    <div className="border border-white/30 px-3 py-1.5 rounded-full text-xs flex items-center gap-2 w-fit relative z-10 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        Response: 48-72 hours
                    </div>
                    {/* Decorative background element */}
                    <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
                </div>

                {/* Contact Method Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Inquiry - Blue */}
                    <div className="bg-[#3b82f6] border border-black shadow-xl shadow-gray-400 rounded-xl p-4 text-white hover:-translate-y-1 transition-transform cursor-pointer shadow-md flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Inquiry</h3>
                            <div className="flex items-center gap-1.5 mt-1 text-white/80 text-xs text-ellipsis overflow-hidden break-all whitespace-nowrap">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span>inquiry@ivamax.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Support - Green */}
                    <div className="bg-[#22c55e] border border-black shadow-xl shadow-gray-400 rounded-xl p-4 text-white hover:-translate-y-1 transition-transform cursor-pointer shadow-md flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Headphones className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Support</h3>
                            <div className="flex items-center gap-1.5 mt-1 text-white/80 text-xs text-ellipsis overflow-hidden break-all whitespace-nowrap">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span>support@ivamax.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Complaint - Red */}
                    <div className="bg-[#ef4444] border border-black shadow-xl shadow-gray-400 rounded-xl p-4 text-white hover:-translate-y-1 transition-transform cursor-pointer shadow-md flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-4 h-4" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">Complaint</h3>
                            <div className="flex items-center gap-1.5 mt-1 text-white/80 text-xs text-ellipsis overflow-hidden break-all whitespace-nowrap">
                                <Mail className="w-3 h-3 flex-shrink-0" />
                                <span>complaint@ivamax.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Form Area */}
                <div className="bg-[#f0f9ff]/30 border border-gray-400 shadow-xl shadow-gray-400 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#794ef5] rounded-xl flex items-center justify-center text-white">
                            <FileText className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-[#794ef5]">Create Support Ticket</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Ticket Type */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs font-bold text-text-main pb-1">
                                <Mail className="w-3.5 h-3.5 text-[#794ef5]" /> Ticket Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-white border border-gray-400 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:outline-none focus:border-[#794ef5] focus:ring-1 focus:ring-[#794ef5]"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option value="Select Ticket Type" disabled>Select Ticket Type</option>
                                    <option value="General">General</option>
                                    <option value="Technical">Technical</option>
                                    <option value="Payment">Payment</option>
                                    <option value="Account">Account</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs font-bold text-text-main pb-1">
                                <HelpCircle className="w-3.5 h-3.5 text-[#794ef5]" /> Subject <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    className="w-full bg-white border border-gray-400 rounded-xl px-4 py-3 text-sm font-semibold appearance-none focus:outline-none focus:border-[#794ef5] focus:ring-1 focus:ring-[#794ef5]"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                >
                                    <option value="" disabled>Select Subject</option>
                                    <option value="Login Issue">Login Issue</option>
                                    <option value="Transaction Failed">Transaction Failed</option>
                                    <option value="Incorrect Balance">Incorrect Balance</option>
                                    <option value="Other">Other</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs font-bold text-text-main pb-1">
                                <AlertCircle className="w-3.5 h-3.5 text-[#eab308]" /> Priority <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priority: 'High' })}
                                    className={`py-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.priority === 'High' ? 'border-red-500 bg-red-50 text-red-700 shadow-sm' : 'border-gray-400 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <AlertTriangle className="w-3.5 h-3.5" /> High
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priority: 'Medium' })}
                                    className={`py-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.priority === 'Medium' ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-sm ring-2 ring-yellow-400/20' : 'border-gray-400 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Clock className="w-3.5 h-3.5" /> Medium
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, priority: 'Low' })}
                                    className={`py-3 border rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${formData.priority === 'Low' ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-gray-400 bg-white text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5" /> Low
                                </button>
                            </div>
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                            <label className="flex items-center gap-2 text-xs font-bold text-text-main pb-1">
                                <MessageSquare className="w-3.5 h-3.5 text-[#22c55e]" /> Message <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <textarea
                                    className="w-full bg-white border border-gray-400 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#794ef5] focus:ring-1 focus:ring-[#794ef5] h-32 resize-none"
                                    placeholder="Describe your issue in detail..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    maxLength={1000}
                                    required
                                />
                                <div className="absolute bottom-3 right-4 text-[10px] text-gray-400 font-medium">
                                    {formData.message.length}/1000
                                </div>
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-1">
                                <Info className="w-3 h-3" /> Minimum 10 characters required
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#794ef5] hover:bg-[#6b38fb] text-white font-bold py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                        >
                            <Send className="w-4 h-4" /> Submit Ticket
                        </button>
                    </form>
                </div>
            </div>

            {/* Tickets Section - Visible on Desktop, or when mobileTab === 'tickets' */}
            <div className={`space-y-6 ${mobileTab === 'tickets' ? 'block' : 'hidden md:block'}`}>
                {/* Your Tickets */}
                <div className="bg-white border border-gray-400 rounded-2xl p-4 shadow-xl shadow-gray-400">
                    <h2 className="text-base font-bold text-text-main mb-6">Your Tickets</h2>

                    {tickets.length > 0 ? (
                        <div className="grid gap-3">
                            {tickets.map(ticket => (
                                <div key={ticket._id} className="p-4 border rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4">
                                    <div>
                                        <p className="font-bold text-sm">{ticket.subject}</p>
                                        <p className="text-xs text-gray-500 mt-1">{new Date(ticket.createdAt).toLocaleDateString()} • {ticket.category}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">{ticket.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <AlertCircle className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                            <p className="text-sm font-medium text-gray-500">No tickets found. Create your first ticket above!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Connect Section - Visible on Desktop, or when mobileTab === 'connect' */}
            <div className={`space-y-4 ${mobileTab === 'connect' ? 'block' : 'hidden md:block'}`}>
                {/* Connect With Us - Social Media */}
                <div className="space-y-4 border border-gray-400 rounded-2xl p-4 shadow-xl shadow-gray-400">
                    <h2 className="text-base font-bold text-text-main pl-1">Connect With Us</h2>
                    <div className="bg-[#1e293b] rounded-t-xl px-4 py-3">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wider">All Social Media Links</h3>
                    </div>
                    <div className="bg-white border border-gray-400 border-t-0 rounded-b-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {/* Telegram */}
                        <div className="border border-gray-400 rounded-xl relative overflow-hidden group hover:border-[#3b82f6] transition-colors col-span-1">
                            <div className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-10 h-10 bg-blue-200 text-blue-500 rounded-xl flex items-center justify-center">
                                    <SendHorizontal className="w-5 h-5 -rotate-45" />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wide">Telegram Channel</h4>
                            </div>
                            <a href="#" className="flex items-center justify-center gap-1 w-full bg-[#3b82f6] text-white text-[10px] font-bold py-2 uppercase hover:bg-blue-600 transition-colors">
                                Connect <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        {/* Instagram */}
                        <div className="border border-gray-400 rounded-xl relative overflow-hidden group hover:border-pink-500 transition-colors col-span-1">
                            <div className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-10 h-10 bg-pink-200 text-pink-500 rounded-xl flex items-center justify-center">
                                    <Instagram className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wide">Instagram Page</h4>
                            </div>
                            <a href="#" className="flex items-center justify-center gap-1 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-bold py-2 uppercase hover:opacity-90 transition-opacity">
                                Connect <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        {/* Facebook */}
                        <div className="border border-gray-400 rounded-xl relative overflow-hidden group hover:border-blue-600 transition-colors col-span-1">
                            <div className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-10 h-10 bg-blue-200 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Facebook className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wide">Facebook Page</h4>
                            </div>
                            <a href="#" className="flex items-center justify-center gap-1 w-full bg-[#2563eb] text-white text-[10px] font-bold py-2 uppercase hover:bg-blue-700 transition-colors">
                                Connect <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        {/* Twitter */}
                        <div className="border border-gray-400 rounded-xl relative overflow-hidden group hover:border-sky-500 transition-colors col-span-1">
                            <div className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-10 h-10 bg-sky-200 text-sky-500 rounded-xl flex items-center justify-center">
                                    <Twitter className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wide">Twitter Page</h4>
                            </div>
                            <a href="#" className="flex items-center justify-center gap-1 w-full bg-[#0ea5e9] text-white text-[10px] font-bold py-2 uppercase hover:bg-sky-600 transition-colors">
                                Connect <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                        {/* YouTube */}
                        <div className="border border-gray-400 rounded-xl relative overflow-hidden group hover:border-red-600 transition-colors col-span-2 md:col-span-4 lg:col-span-1 mx-auto w-full lg:max-w-none">
                            <div className="p-4 flex flex-col items-center justify-center text-center gap-2">
                                <div className="w-10 h-10 bg-red-200 text-red-600 rounded-xl flex items-center justify-center">
                                    <Youtube className="w-5 h-5" />
                                </div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wide">Youtube Channel</h4>
                            </div>
                            <a href="#" className="flex items-center justify-center gap-1 w-full bg-[#dc2626] text-white text-[10px] font-bold py-2 uppercase hover:bg-red-700 transition-colors">
                                Connect <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">Stay connected with us on social media for updates and announcements</p>
                </div>

                {/* Quick Tips */}
                <div className="bg-[#fffbeb] border border-primary rounded-2xl p-4 shadow-xl shadow-gray-400 mt-4">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-yellow-800 mb-4">
                        <Lightbulb className="w-4 h-4 text-yellow-600" /> Quick Tips
                    </h3>
                    <ul className="space-y-2 text-xs font-medium text-yellow-900/80">
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 shrink-0"></div>
                            Check your spam folder if you don't receive our email response
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 shrink-0"></div>
                            Have your User ID ready when contacting support
                        </li>
                        <li className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 shrink-0"></div>
                            Browse our Help Center for instant answers to common questions
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Marketing Content Component ---
const MarketingContent = () => {
    const [mobileTab, setMobileTab] = useState('advisor');

    const mobileTabs = [
        { id: 'advisor', label: 'Advisor', icon: FileText },
        { id: 'platform', label: 'Platform', icon: BookOpen },
        { id: 'ftp', label: 'DRP', icon: FileText },
        { id: 'utp', label: 'UTP', icon: BookOpen }
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-4">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white shrink-0">
                        <Library className="w-6 h-6" />
                    </div>
                    <div className="md:hidden">
                        <h1 className="text-xl font-bold text-text-main uppercase">Resource Center</h1>
                    </div>
                </div>
                <div>
                    <h1 className="hidden md:block text-2xl font-bold text-text-main uppercase">Resource Center</h1>
                    <p className="text-xs md:text-sm font-bold text-text-muted uppercase">Official Marketing Materials & Documentation</p>
                </div>
            </header>

            {/* Mobile Tabs */}
            <div className="md:hidden flex p-1.5 bg-[#d9dde0] rounded-2xl relative w-full overflow-x-auto scrollbar-hide gap-1.5 shadow-inner">
                {mobileTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setMobileTab(tab.id)}
                            className={`flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all ${mobileTab === tab.id
                                ? "bg-[#794ef5] text-white shadow-md transform scale-[1.02]"
                                : "text-[#58728d] hover:text-[#3b4c5d] hover:bg-white/40"
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Advisor Income Program */}
                <div className={`bg-white border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:border-primary/50 group relative overflow-hidden ${mobileTab === 'advisor' ? 'block' : 'hidden md:block'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Advisor Income Program</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Official Guideline for Marketing Incentives</p>
                        </div>
                        <div className="bg-gray-300 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PDF Format • 2.4 MB</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>Download Guide</span>
                        </button>
                    </div>
                </div>

                {/* Platform Ecosystem */}
                <div className={`bg-white border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 group relative overflow-hidden ${mobileTab === 'platform' ? 'block' : 'hidden md:block'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Platform Ecosystem</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Comprehensive Guides on Gitbook Cloud</p>
                        </div>
                        <div className="bg-gray-300 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Online Docs • v2.1.0</span>
                        </div>
                        <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <ExternalLink className="w-4 h-4" />
                            <span>Explore Wiki</span>
                        </button>
                    </div>
                </div>

                {/* Finance Tenure Bundle */}
                <div className={`bg-white border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:border-primary/50 group relative overflow-hidden ${mobileTab === 'ftp' ? 'block' : 'hidden md:block'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <FileText className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">Dividend Reward Bundle</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">DRP Structural Rewards & Projections</p>
                        </div>
                        <div className="bg-gray-300 px-4 py-2 rounded-lg border border-gray-200">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">PDF Format • 1.8 MB</span>
                        </div>
                        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transform transition-all active:scale-95 uppercase tracking-wide flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            <span>Open Repository</span>
                        </button>
                    </div>
                </div>

                {/* United Tenure Package */}
                <div className={`bg-white border border-gray-400 rounded-3xl p-4 shadow-lg shadow-gray-400 hover:shadow-2xl transition-all duration-300 hover:border-cyan-500/50 group relative overflow-hidden ${mobileTab === 'utp' ? 'block' : 'hidden md:block'}`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none"></div>
                    <div className="flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-cyan-400 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-text-main uppercase mb-2">United Tenure Package</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">UTP Algorithm & Reward Cycle Docs</p>
                        </div>
                        <div className="bg-gray-300 px-4 py-2 rounded-lg border border-gray-200">
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
            <div className="bg-black border border-gray-800 rounded-2xl p-3 shadow-lg shadow-gray-600 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
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

// --- Main Company Component ---
const Company = () => {
    const [activeTab, setActiveTab] = useState('support');

    return (
        <div className="space-y-6">
            {/* Page Header with Tabs */}
            <div className="flex flex-col sm:flex-row justify-between shadow-lg shadow-gray-400 items-start sm:items-center gap-4 bg-white p-4 rounded-3xl border border-gray-400 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-gray-500/5 to-transparent skew-x-12 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center text-primary">
                        <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-text-main uppercase">Company</h1>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Support & Resources</p>
                    </div>
                </div>

                <div className="flex p-1 bg-[#d9dde0] rounded-2xl relative z-10 w-full sm:w-auto overflow-x-auto scrollbar-hide gap-1">
                    <button
                        onClick={() => setActiveTab('support')}
                        className={`flex flex-1 items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'support'
                            ? 'bg-white text-text-main shadow-md'
                            : 'text-[#58728d] hover:text-[#3b4c5d]'
                            }`}
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Support
                    </button>
                    <button
                        onClick={() => setActiveTab('marketing')}
                        className={`flex flex-1 items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${activeTab === 'marketing'
                            ? 'bg-white text-text-main shadow-md'
                            : 'text-[#58728d] hover:text-[#3b4c5d]'
                            }`}
                    >
                        <Library className="w-4 h-4" />
                        Marketing Material
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="animate-fade-in-up">
                {activeTab === 'support' ? <SupportContent /> : <MarketingContent />}
            </div>
        </div>
    );
};

export default Company;
