import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../../store/useAuthStore';
import { MessageSquare, Send } from 'lucide-react';

const SupportAdmin = () => {
    const token = useAuthStore((state) => state.token);
    const [tickets, setTickets] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [selectedTicket, setSelectedTicket] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/support/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTickets(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/support/reply',
                { ticketId: selectedTicket.ticketId, reply: replyText, status: 'Resolved' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReplyText('');
            setSelectedTicket(null);
            fetchTickets();
        } catch (err) {
            alert('Reply failed');
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Support Tickets (Admin)</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* List */}
                <div className="space-y-4">
                    {tickets.map((ticket) => (
                        <div
                            key={ticket._id}
                            onClick={() => setSelectedTicket(ticket)}
                            className={`p-4 rounded-xl border cursor-pointer hover:shadow-md transition-all ${selectedTicket?._id === ticket._id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white'
                                }`}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{ticket.subject}</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                    }`}>{ticket.status}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1 truncate">{ticket.message}</p>
                            <p className="text-xs text-gray-400 mt-2">By: {ticket.userId?.name} ({ticket.userId?.userId})</p>
                        </div>
                    ))}
                    {tickets.length === 0 && <p className="text-gray-400 text-center">No tickets found</p>}
                </div>

                {/* Detail & Reply */}
                <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-6">
                    {selectedTicket ? (
                        <>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedTicket.subject}</h3>
                            <div className="bg-gray-50 p-4 rounded-xl mb-4 text-gray-700 text-sm">
                                {selectedTicket.message}
                            </div>

                            {selectedTicket.adminReply ? (
                                <div className="bg-green-50 p-4 rounded-xl border border-green-100 mb-4">
                                    <p className="text-xs font-bold text-green-700 mb-1">Your Reply:</p>
                                    <p className="text-sm text-green-800">{selectedTicket.adminReply}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleReply}>
                                    <textarea
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-primary mb-4 h-32"
                                        placeholder="Type your reply here..."
                                        required
                                    ></textarea>
                                    <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 flex justify-center items-center gap-2">
                                        <Send className="w-4 h-4" /> Send Reply
                                    </button>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="text-center text-gray-400 py-10">Select a ticket to view details</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SupportAdmin;
