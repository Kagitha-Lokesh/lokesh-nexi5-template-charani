import React, { useState, useEffect } from 'react';
import { Search, Users, CheckCircle, XCircle, Calendar as CalendarIcon, Download, CheckSquare, Eye, LogIn, LogOut, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';
import { StatusBadge, PaginationFooter } from '@/components/common';
import { attendanceStats, mockAttendance } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

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

    // Live Clock State
    const [currentTime, setCurrentTime] = useState(new Date());

    // Check In/Out State Machine
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    // Update real-time clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format helpers
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    // Actions
    const handleCheckIn = () => {
        setIsCheckedIn(true);
        setCheckInTime(new Date());
    };

    const handleCheckOut = () => {
        if (!isCheckedIn) return;
        setIsCheckedIn(false);
        setCheckOutTime(new Date());
    };

    // Calculate Working Hours dynamically
    const getWorkingHoursString = () => {
        if (!checkInTime) return '—';

        let endObj = isCheckedIn ? currentTime : checkOutTime;
        if (!endObj) return '—';

        const diffMs = endObj.getTime() - checkInTime.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${diffHrs}h ${diffMins}m`;
    };

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] space-y-6 ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-xl md:text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Attendance Dashboard</h1>
                </div>
            </div>

            {/* ADMIN CHECK-IN / CHECK-OUT CARD */}
            <div className={`p-6 rounded-[10px] border flex flex-col xl:flex-row items-center justify-between gap-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>

                {/* Visual Identity & Clock */}
                <div className="flex flex-col xl:flex-row items-center gap-6 w-full xl:w-auto">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 relative shadow-sm border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-white/10' : 'bg-lightSky text-primary border-borderColor'}`}>
                        <Clock size={32} />
                        {isCheckedIn && <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 animate-pulse ${isDarkMode ? 'bg-[#3ec3ff] border-[#0c162d]' : 'bg-green-500 border-white'}`}></div>}
                    </div>
                    <div className="text-center xl:text-left">
                        <h2 className={`text-xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>My Attendance</h2>
                        <p className={`text-sm font-semibold uppercase tracking-wider mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{formatDate(currentTime)}</p>
                        <p className={`text-3xl font-black mt-1 drop-shadow-sm font-headings tracking-tight ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{formatTime(currentTime)}</p>
                    </div>
                </div>

                {/* Tracking Metrics */}
                <div className={`flex flex-col sm:flex-row items-center gap-6 divide-y sm:divide-y-0 sm:divide-x w-full xl:w-auto justify-center xl:justify-end xl:flex-1 ${isDarkMode ? 'divide-white/5' : 'divide-borderColor'}`}>
                    <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                        <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Check-In Time</span>
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{checkInTime ? formatTime(checkInTime) : '—'}</span>
                    </div>
                    <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                        <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Check-Out Time</span>
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{checkOutTime ? formatTime(checkOutTime) : '—'}</span>
                    </div>
                    <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                        <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Working Hours</span>
                        <span className={`text-lg font-bold ${isCheckedIn ? (isDarkMode ? 'text-[#3ec3ff]' : 'text-primary') : (isDarkMode ? 'text-gray-300' : 'text-dark')}`}>{getWorkingHoursString()}</span>
                    </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-row items-center gap-4 w-full xl:w-auto justify-center xl:justify-end">
                    <button
                        onClick={handleCheckIn}
                        disabled={isCheckedIn}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all font-semibold shadow-sm w-full sm:w-auto text-sm ${!isCheckedIn ? (isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 hover:shadow-[0_0_20px_rgba(62,195,255,0.3)]' : 'bg-[#22C55E] text-white hover:bg-green-600') : (isDarkMode ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 border border-borderColor')}`}
                    >
                        <LogIn size={20} />
                        Check In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        disabled={!isCheckedIn}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all font-semibold shadow-sm w-full sm:w-auto text-sm ${isCheckedIn ? (isDarkMode ? 'bg-red-500/80 text-white hover:bg-red-600' : 'bg-[#EF4444] text-white hover:bg-red-600') : (isDarkMode ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 border border-borderColor')}`}
                    >
                        <LogOut size={20} />
                        Check Out
                    </button>
                </div>
            </div>

            {/* 4 Statistic Cards */}
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

            {/* Filter Section */}
            <div className={`p-4 rounded-[10px] border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <input type="date" className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary'}`} />
                    <select className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary bg-white'}`}>
                        <option value="" className={isDarkMode ? 'bg-[#0c162d]' : ''}>All Departments</option>
                        <option value="web" className={isDarkMode ? 'bg-[#0c162d]' : ''}>Web Development</option>
                        <option value="design" className={isDarkMode ? 'bg-[#0c162d]' : ''}>UI/UX Design</option>
                        <option value="marketing" className={isDarkMode ? 'bg-[#0c162d]' : ''}>Marketing</option>
                        <option value="hr" className={isDarkMode ? 'bg-[#0c162d]' : ''}>HR & Admin</option>
                    </select>
                    <select className={`rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 transition-all w-full sm:w-auto ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary focus:ring-primary bg-white'}`}>
                        <option value="" className={isDarkMode ? 'bg-[#0c162d]' : ''}>All Statuses</option>
                        <option value="present" className={isDarkMode ? 'bg-[#0c162d]' : ''}>Present</option>
                        <option value="absent" className={isDarkMode ? 'bg-[#0c162d]' : ''}>Absent</option>
                        <option value="late" className={isDarkMode ? 'bg-[#0c162d]' : ''}>Late</option>
                        <option value="leave" className={isDarkMode ? 'bg-[#0c162d]' : ''}>On Leave</option>
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

            {/* Daily Attendance Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col pb-4 w-full transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <div className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>EMPLOYEE ATTENDANCE</h2>
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search employee..."
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
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee ID</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Department</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Check In</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Check Out</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Working Hours</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAttendance.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase())).map((record) => (
                                <tr key={record.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[60px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
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
                                    <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-dark'}`}>{record.empId}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{record.department}</td>
                                    <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{record.checkIn}</td>
                                    <td className={`px-4 py-3 text-[14px] font-medium text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{record.checkOut}</td>
                                    <td className={`px-4 py-3 text-[14px] text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{record.hours}</td>
                                    <td className="px-4 py-3 text-center">
                                        <StatusBadge status={record.status} />
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-500 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View Details">
                                            <Eye size={18} />
                                        </button>
                                    </td>
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
