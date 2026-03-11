import { useState } from 'react';
import { Search, Filter, Download, Check, X, Eye, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge, SearchHeader, PaginationFooter } from '@/components/common';
import { leaveRequests, leaveBalance, leaveStats } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

export default function LeaveManagement() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('requests');
    const [searchQuery, setSearchQuery] = useState('');

    const renderRequestsTab = () => (
        <div className="flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {leaveStats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-[10px] border flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 duration-300 relative group ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                        <div className="w-full flex justify-between items-start absolute top-4 left-0 px-4">
                            <p className="text-sm font-medium text-textSecondary invisible">{stat.title}</p>
                            <span className={`text-xs font-bold font-sans ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <p className={`text-sm font-medium mb-2 w-full text-left ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                        <h3 className={`text-4xl font-bold font-headings my-2 w-full text-left ${isDarkMode ? 'text-white' : 'text-dark'}`}>{stat.value}</h3>
                        {stat.subtext && <p className={`text-xs mt-auto w-full text-left ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>{stat.subtext}</p>}
                    </div>
                ))}
            </div>

            {/* Leave Requests Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <SearchHeader title="LEAVE REQUESTS" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="overflow-x-auto p-2 sm:p-6 flex-1">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Leave Type</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>From Date</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>To Date</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Days</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Reason</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaveRequests.filter(req => req.name.toLowerCase().includes(searchQuery.toLowerCase())).map((req) => (
                                <tr key={req.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-headings shrink-0 text-xs text-center uppercase border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                {req.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{req.name}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{req.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{req.type}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{req.from}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{req.to}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{req.days}</td>
                                    <td className={`px-4 py-3 text-[14px] max-w-[150px] truncate ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`} title={req.reason}>{req.reason}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={req.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className={`flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity`}>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-green-500 hover:bg-white/5' : 'text-green-600 hover:bg-green-50'}`} title="Approve"><Check size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-red-500 hover:bg-white/5' : 'text-red-600 hover:bg-red-50'}`} title="Reject"><X size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View"><Eye size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-white/5' : 'text-textSecondary hover:text-red-600 hover:bg-red-50'}`} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <PaginationFooter />
            </div>
        </div>
    );

    const renderCalendarTab = () => (
        <div className={`p-6 rounded-[10px] border min-h-[400px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
            <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase mb-6 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Leave Calendar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveRequests.map(req => (
                    <div key={req.id} className={`p-4 border rounded-lg flex flex-col gap-2 transition-all hover:shadow-md ${isDarkMode ? 'bg-white/5 border-white/10 shadow-xl' : 'border-borderColor hover:shadow-md'}`}>
                        <div className="flex justify-between items-start">
                            <h4 className={`font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{req.name}</h4>
                            <StatusBadge status={req.status} />
                        </div>
                        <p className={`text-sm italic ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{req.type}</p>
                        <div className={`flex items-center gap-2 mt-2 text-sm font-medium px-3 py-2 rounded-md ${isDarkMode ? 'bg-[#0c162d] text-gray-400 shadow-inner' : 'bg-lightBlueBg text-dark'}`}>
                            <CalendarIcon size={16} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                            {req.from} - {req.to}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBalanceTab = () => (
        <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
            <SearchHeader title="LEAVE BALANCE" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="overflow-x-auto p-2 sm:p-6 flex-1">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Annual Leave</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Sick Leave</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Casual Leave</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Used Leaves</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Remaining Leaves</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaveBalance.filter(b => b.name.toLowerCase().includes(searchQuery.toLowerCase())).map((bal) => (
                            <tr key={bal.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-headings shrink-0 text-xs text-center uppercase border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                                            {bal.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{bal.name}</p>
                                    </div>
                                </td>
                                <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{bal.annual}</td>
                                <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{bal.sick}</td>
                                <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{bal.casual}</td>
                                <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{bal.used}</td>
                                <td className={`px-4 py-3 text-[14px] font-bold text-center ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{bal.remaining}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationFooter />
        </div>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Page Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className={`text-xl md:text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Leave Management</h1>
                </div>

                {/* Actions / Filters */}
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative hidden md:block w-64">
                        <input
                            type="text"
                            placeholder="Search..."
                            className={`w-full pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-1 text-sm shadow-sm transition-all ${isDarkMode
                                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff] focus:ring-[#3ec3ff]'
                                : 'bg-white border-borderColor text-dark focus:border-primary focus:ring-primary'
                                }`}
                        />
                        <Search className={`absolute left-3 top-2.5 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`} size={18} />
                    </div>

                    {/* Year Dropdown */}
                    <div className="relative">
                        <select className={`appearance-none border text-sm rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer transition-all hidden sm:block ${isDarkMode
                            ? 'bg-[#0c162d] border-white/10 text-gray-300 focus:border-[#3ec3ff] focus:ring-[#3ec3ff] hover:bg-white/5'
                            : 'bg-white border-borderColor text-textSecondary focus:border-primary hover:bg-gray-50'
                            }`}>
                            <option value="2026">2026</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                        </select>
                        <Filter className="absolute right-3 top-2.5 text-textSecondary pointer-events-none hidden sm:block" size={16} />
                    </div>

                    <button className={`flex items-center justify-center gap-2 border px-3 py-2 rounded-md transition-all shadow-sm active:scale-95 ${isDarkMode
                        ? 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
                        : 'bg-white border-borderColor text-textSecondary hover:text-dark'
                        }`}>
                        <Download size={18} />
                        <span className="hidden sm:inline text-sm font-medium">Export</span>
                    </button>

                    <Link to="/dashboard/leaves/apply" className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all shadow-sm active:scale-95 ${isDarkMode
                        ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 hover:shadow-[0_0_20px_rgba(62,195,255,0.3)]'
                        : 'bg-primary text-white hover:bg-sky-500'
                        }`}>
                        <CalendarIcon size={18} />
                        <span className="hidden sm:inline text-sm font-medium">Apply Leave</span>
                    </Link>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="flex items-center gap-6 mb-6">
                {[{ id: 'requests', label: 'Leave Requests' }, { id: 'calendar', label: 'Leave Calendar' }, { id: 'balance', label: 'Leave Balance' }].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSearchQuery(''); }}
                        className={`text-sm font-semibold tracking-wide transition-all ${activeTab === tab.id
                            ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff]' : 'text-primary border-b-2 border-primary')
                            : (isDarkMode ? 'text-gray-600 hover:text-[#3ec3ff]/70' : 'text-textSecondary hover:text-dark')
                            } pb-1`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Rendering Logic */}
            {activeTab === 'requests' && renderRequestsTab()}
            {activeTab === 'calendar' && renderCalendarTab()}
            {activeTab === 'balance' && renderBalanceTab()}

            {/* Dashboard Root Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
