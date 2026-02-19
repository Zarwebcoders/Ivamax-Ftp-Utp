import React, { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import { Search } from 'lucide-react';

const UserManagement = () => {
    const token = useAuthStore((state) => state.token);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.userId.includes(search) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <div className="relative w-full md:w-auto">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-primary w-full md:w-64"
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                                <th className="px-6 py-4 whitespace-nowrap">Name</th>
                                <th className="px-6 py-4 whitespace-nowrap">Email</th>
                                <th className="px-6 py-4 whitespace-nowrap">Sponsor</th>
                                <th className="px-6 py-4 whitespace-nowrap">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-primary whitespace-nowrap">{user.userId}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">{user.sponsorId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-400 whitespace-nowrap">{new Date(user.doj).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && <div className="p-8 text-center text-gray-400">No users found</div>}
            </div>
        </div>
    );
};

export default UserManagement;
