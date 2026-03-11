import { useState } from 'react';
import { Search, Plus, MoreVertical, Edit2, Trash2, Mail, Phone, MapPin, Shield, User, Filter, Edit } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { usersData } from '@/datasets';

export default function UsersManagement() {
    const [activeTab, setActiveTab] = useState('List');
    const { isDarkMode } = useTheme();

    const getRoleBadgeClasses = (role) => {
        if (isDarkMode) {
            switch (role) {
                case 'Super Admin': return 'bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20';
                case 'Admin': return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
                case 'HR Admin': return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
                default: return 'bg-white/5 text-gray-400 border border-white/10';
            }
        }
        switch (role) {
            case 'Super Admin': return 'bg-[#38BDF8] text-white';
            case 'Admin': return 'bg-[#1E40AF] text-white';
            case 'HR Admin': return 'bg-[#06B6D4] text-white';
            case 'Employee': default: return 'bg-[#CBD5F5] text-[#0F172A]';
        }
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 animate-fade-in w-full max-w-full">

            {/* Tabs and Add Button Area */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className={`flex border-b w-full sm:w-auto ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <button
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'List'
                            ? (isDarkMode ? 'border-[#3ec3ff] text-[#3ec3ff]' : 'border-[#38BDF8] text-[#38BDF8]')
                            : (isDarkMode ? 'border-transparent text-gray-500 hover:text-gray-300' : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300')
                            }`}
                        onClick={() => setActiveTab('List')}
                    >
                        List
                    </button>
                    <button
                        className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${activeTab === 'Add New'
                            ? (isDarkMode ? 'border-[#3ec3ff] text-[#3ec3ff]' : 'border-[#38BDF8] text-[#38BDF8]')
                            : (isDarkMode ? 'border-transparent text-gray-500 hover:text-gray-300' : 'border-transparent text-textSecondary hover:text-textPrimary hover:border-gray-300')
                            }`}
                        onClick={() => setActiveTab('Add New')}
                    >
                        Add New
                    </button>
                </div>

                <button className={`px-6 py-2 rounded-md font-medium text-sm transition-all shadow-sm hover:shadow active:scale-95 whitespace-nowrap ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90' : 'bg-[#2563EB] hover:bg-[#1E40AF] text-white'}`}>
                    Add
                </button>
            </div>

            {/* Main Card */}
            {activeTab === 'List' && (
                <div className={`rounded-[10px] border overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-[#E2E8F0] shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'}`}>
                    {/* Card Header */}
                    <div className={`p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-[#E2E8F0]'}`}>
                        <h2 className={`text-[18px] font-semibold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-[#0F172A]'}`}>USER LIST</h2>

                        {/* Search Input */}
                        <div className="relative w-full sm:w-64 group">
                            <input
                                type="text"
                                placeholder="Search something..."
                                className={`w-full rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-[#3ec3ff] focus:ring-2 focus:ring-[#3ec3ff]/20' : 'bg-[#F1F5F9] border-transparent text-[#0F172A] placeholder-[#64748B] focus:bg-white focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20'}`}
                            />
                            <button className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 transition-colors rounded-full ${isDarkMode ? 'text-gray-500 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-[#64748B] hover:text-[#38BDF8] hover:bg-[#F1F5F9]'}`}>
                                <Search size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Desktop/Tablet Table */}
                    <div className="hidden md:block w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`border-b text-[14px] ${isDarkMode ? 'bg-white/5 border-white/5 text-gray-500' : 'bg-gray-50/50 border-[#E2E8F0] text-[#64748B]'}`}>
                                    <th className="py-4 px-6 font-medium whitespace-nowrap w-[35%]">Name</th>
                                    <th className="py-4 px-6 font-medium whitespace-nowrap w-[20%]">Created Date</th>
                                    <th className="py-4 px-6 font-medium whitespace-nowrap w-[25%]">Role</th>
                                    <th className="py-4 px-6 font-medium whitespace-nowrap w-[20%] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px]">
                                {usersData.map((user) => (
                                    <tr
                                        key={user.id}
                                        className={`border-b last:border-0 transition-colors group ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-[#E2E8F0] hover:bg-[#F0F9FF]'}`}
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-4">
                                                {/* Avatar */}
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 border shadow-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-[#E2E8F0] border-white text-[#64748B]'}`}>
                                                    {getInitials(user.name)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-[#0F172A]'}`}>{user.name}</span>
                                                    <span className={`text-[13px] ${isDarkMode ? 'text-gray-500' : 'text-[#64748B]'}`}>{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`py-4 px-6 ${isDarkMode ? 'text-gray-400' : 'text-[#64748B]'}`}>
                                            {user.date}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col items-start gap-1">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClasses(user.role)}`}>
                                                    {user.role}
                                                </span>
                                                <span className={`text-[13px] mt-1 ${isDarkMode ? 'text-gray-500' : 'text-[#64748B]'}`}>{user.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button className={`p-2 rounded-md transition-all border border-transparent group-hover:opacity-100 opacity-60 ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10 hover:border-[#3ec3ff]/20' : 'text-[#64748B] hover:text-[#38BDF8] hover:bg-[#F0F9FF] hover:border-[#38BDF8]/20'}`}>
                                                    <Edit size={18} />
                                                </button>
                                                <button className={`p-2 rounded-md transition-all border border-transparent group-hover:opacity-100 opacity-60 ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20' : 'text-[#64748B] hover:text-red-500 hover:bg-red-50 hover:border-red-100'}`}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Stacked Cards */}
                    <div className="md:hidden flex flex-col p-4 gap-4">
                        {usersData.map((user) => (
                            <div key={user.id} className={`rounded-lg p-4 shadow-sm transition-colors border ${isDarkMode ? 'bg-[#0c162d] border-white/10 hover:border-[#3ec3ff]/50' : 'bg-white border-[#E2E8F0] hover:border-[#38BDF8]/50'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-[#E2E8F0] text-[#64748B]'}`}>
                                            {getInitials(user.name)}
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-[#0F172A]'}`}>{user.name}</h3>
                                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-[#64748B]'}`}>{user.email}</p>
                                        </div>
                                    </div>
                                    <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff]' : 'text-[#64748B] hover:text-[#38BDF8]'}`}>
                                        <Edit size={16} />
                                    </button>
                                </div>

                                <div className={`grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4 pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-gray-50'}`}>
                                    <div>
                                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-[#64748B]'}`}>Created Date</p>
                                        <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-[#0F172A]'}`}>{user.date}</p>
                                    </div>
                                    <div>
                                        <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-[#64748B]'}`}>Role Title</p>
                                        <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-[#0F172A]'}`}>{user.title}</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadgeClasses(user.role)}`}>
                                        {user.role}
                                    </span>
                                    <button className={`p-2 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-red-500' : 'text-[#64748B] hover:text-red-500'}`}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'Add New' && (
                <div className={`rounded-[10px] border p-8 flex items-center justify-center transition-all min-h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 text-gray-400 shadow-2xl' : 'bg-white border-[#E2E8F0] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] text-[#64748B]'}`}>
                    <p>Add New User form integration goes here.</p>
                </div>
            )}
        </div>
    );
}
