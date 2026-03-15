import React, { useState } from 'react';
import { Search, Users, CheckCircle, XCircle, Calendar as CalendarIcon, Download, CheckSquare, Eye } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatusBadge, PaginationFooter } from '@/components/common';
import { attendanceStats, mockAttendance, attendanceDepartments, attendanceStatuses } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';
import AttendanceCard from '@/components/dashboard/core/AttendanceCard';

// Map icon strings to components for the stats cards
const iconMap = {
    Users: Users,
    CheckCircle: CheckCircle,
    XCircle: XCircle,
    Calendar: CalendarIcon
};

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-2 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AttendanceDashboard() {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const userRole = localStorage.getItem('userRole') || 'employee';
    const isAdmin = userRole === 'admin' || userRole === 'CEO' || userRole === 'HR Head' || userRole === 'HR Executive';

    // Mock filtering for employee Marshall Nichols
    const filteredAttendance = isAdmin 
        ? mockAttendance.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : mockAttendance.filter(a => a.name === 'Marshall Nichols' && a.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] space-y-6 ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-xl md:text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                        {isAdmin ? 'Attendance Dashboard' : 'My Attendance & Clock'}
                    </h1>
                </div>
            </div>

            {/* CHECK-IN / CHECK-OUT CARD - Home for all except admin-only roles 
                Admins primarily monitor others on this page. */}
            {!isAdmin && <AttendanceCard />}

            {/* 4 Statistic Cards - HIDE FOR EMPLOYEE */}
            {isAdmin && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {attendanceStats.map((stat, index) => {
                        const Icon = iconMap[stat.icon];
                        return (
                            <div key={index} className={`p-6 rounded-[10px] border flex items-center gap-4 transition-all hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5' : stat.bgColor}`}>
                                    <Icon size={24} className={isDarkMode ? 'text-[#3ec3ff]' : stat.color} />
                                </div>
                                <div>
                                    <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{stat.value}</h3>
                                    <p className={`text-[13px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                                    <p className={`text-[11px] font-semibold mt-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Filter Section - HIDE FOR EMPLOYEE */}
            {isAdmin && (
                <div className={`p-4 rounded-[10px] border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <input type="date" className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary'}`} />
                        <select className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary bg-white'}`}>
                            {attendanceDepartments.map(dept => (
                                <option key={dept.value} value={dept.value}>{dept.label}</option>
                            ))}
                        </select>
                        <select className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary bg-white'}`}>
                            {attendanceStatuses.map(status => (
                                <option key={status.value} value={status.value}>{status.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 border px-4 py-2 rounded-md transition-all text-sm font-semibold shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white' : 'bg-white border-borderColor text-dark hover:bg-gray-50'}`}>
                            <Download size={16} />
                            Export Attendance
                        </button>
                        <button className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all shadow-sm active:scale-95 text-sm font-semibold ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 hover:shadow-[0_0_20px_rgba(62,195,255,0.3)]' : 'bg-primary text-white hover:bg-sky-500 shadow-[0px_4px_10px_rgba(56,189,248,0.3)]'}`}>
                            <CheckSquare size={16} />
                            Mark Attendance
                        </button>
                    </div>
                </div>
            )}

            {/* Daily Attendance Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col pb-4 w-full transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <div className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                        {isAdmin ? 'EMPLOYEE ATTENDANCE' : 'MY ATTENDANCE HISTORY'}
                    </h2>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-4 pr-10 py-2 rounded-full text-sm transition-all font-medium focus:outline-none focus:ring-2 ${isDarkMode
                                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff]/50 focus:ring-[#3ec3ff]/20'
                                : 'bg-lightBlueBg border border-borderColor text-dark focus:border-primary/50 focus:ring-primary/20'
                                }`}
                        />
                        <Search className={`absolute right-3 top-2.5 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`} size={16} />
                    </div>
                </div>

                <div className="overflow-x-auto p-2 sm:p-6 w-full">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                {isAdmin && <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee</th>}
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee ID</th>
                                {isAdmin && <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Department</th>}
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Check In</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Check Out</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Working Hours</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                                {isAdmin && <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAttendance.map((record) => (
                                <tr key={record.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[60px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                    {isAdmin && (
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-headings shrink-0 text-xs text-center uppercase border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                    {record.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{record.name}</p>
                                                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{record.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                    )}
                                    <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-dark'}`}>{record.empId}</td>
                                    {isAdmin && <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{record.department}</td>}
                                    <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{record.checkIn}</td>
                                    <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{record.checkOut}</td>
                                    <td className={`px-4 py-3 text-[14px] text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{record.hours}</td>
                                    <td className="px-4 py-3 text-center">
                                        <StatusBadge status={record.status} />
                                    </td>
                                    {isAdmin && (
                                        <td className="px-4 py-3 text-center">
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-500 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View Details">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PaginationFooter />
            </div>

            {/* Footer */}
            <div className="py-2 text-center mt-auto">
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
