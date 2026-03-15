import React, { useState, useEffect } from 'react';
import { 
    Users, CheckCircle, XCircle, Clock, MapPin, 
    Download, FileText, Share2, Filter, Search, 
    MoreHorizontal, ArrowUpRight, ArrowDownRight, 
    Calendar, Briefcase, UserPlus, Send, RefreshCw
} from 'lucide-react';
import { 
    LineChart, Line, AreaChart, Area, XAxis, YAxis, 
    CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';
import {
    attendanceStats,
    weeklyTrendData,
    attendanceDistributionData as distributionData,
    teamAttendanceTableData as teamAttendanceData,
    lateArrivals,
    timelineActivities,
} from '@/datasets/manager/teamAttendanceData';

// --- Sub-components ---

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;
        let totalMiliseconds = 1000;
        let incrementTime = (totalMiliseconds / end);
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);
        return () => clearInterval(timer);
    }, [value]);
    return <span>{count}</span>;
};

const MotionCard = ({ children, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="w-full"
    >
        {children}
    </motion.div>
);

export default function TeamAttendanceDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const fadeUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-semibold tracking-tight"
                >
                    Team Attendance Monitoring
                </motion.h1>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm active:scale-95">
                        <Download size={16} />
                        Download Attendance Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Share2 size={16} />
                        Export Attendance Data
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <FileText size={16} />
                        Generate Attendance Summary
                    </button>
                </div>
            </div>

            {/* 3. Attendance Filters Panel */}
            <MotionCard delay={0.1}>
                <div className={`p-6 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white border-gray-100'}`}>
                    <div className="flex items-center gap-2 mb-4 text-sm font-medium text-slate-500 uppercase tracking-wider">
                        <Filter size={16} />
                        Filters
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Date</label>
                            <input type="date" className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`} defaultValue={new Date().toISOString().split('T')[0]} />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Department</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Engineering</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>HR</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Marketing</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Sales</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Team</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>All Teams</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Frontend</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Backend</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Design</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Attendance Status</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Present</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Absent</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Late</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Remote</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-slate-500">Work Mode</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>All Modes</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Office</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Remote</option>
                            </select>
                        </div>
                    </div>
                </div>
            </MotionCard>

            {/* 4. Real-Time Attendance Board */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {attendanceStats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                        className={`p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${isDarkMode ? stat.darkBgColor : stat.bgColor}`}>
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                    <Counter value={stat.value} />
                                </h3>
                                <p className="text-xs font-medium text-slate-500">{stat.title}</p>
                            </div>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div 
                                className="h-full rounded-full transition-all duration-1000 ease-out"
                                style={{ 
                                    width: `${(stat.value / stat.total) * 100}%`,
                                    backgroundColor: stat.color 
                                }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 5. Attendance Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionCard delay={0.2}>
                    <div className={`p-6 rounded-xl shadow-sm border h-full ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Weekly Attendance Trend</h2>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                                <ArrowUpRight size={14} className="text-green-500" />
                                2.5% increase from last week
                            </div>
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={weeklyTrendData}>
                                    <defs>
                                        <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f1f5f9'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                                            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '12px',
                                            color: isDarkMode ? '#f8fafc' : '#0f172a'
                                        }}
                                        itemStyle={{ color: '#3b82f6' }}
                                    />
                                    <Area type="monotone" dataKey="percentage" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTrend)" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>

                <MotionCard delay={0.3}>
                    <div className={`p-6 rounded-xl shadow-sm border h-full ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
                        <h2 className={`font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Attendance Status Distribution</h2>
                        <div className="h-[280px] flex flex-col md:flex-row items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                         contentStyle={{ 
                                            backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                                            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 mt-4 md:mt-0 md:ml-6 w-full lg:w-48">
                                {distributionData.map((item, idx) => (
                                    <div key={idx} className={`p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-body">{item.name}</p>
                                        <div className="flex items-center justify-between">
                                            <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{item.value}</span>
                                            <span className="text-[10px] text-slate-500">{Math.round((item.value/24)*100)}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* Middle Grid for Table and Monitors */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* 6. Team Check-In Table */}
                <MotionCard delay={0.4}>
                    <div className={`xl:col-span-2 p-6 rounded-xl shadow-sm border h-full ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Team Attendance Records</h2>
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search Employee..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'}`}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className={`border-b ${isDarkMode ? 'border-gray-800' : 'border-slate-100'}`}>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee Name</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Check-In</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence>
                                        {teamAttendanceData.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((row) => (
                                            <motion.tr 
                                                key={row.id}
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className={`group transition-all border-b last:border-0 ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-slate-50 hover:bg-slate-50'}`}
                                            >
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200 text-slate-500'}`}>
                                                            {row.name.charAt(0)}
                                                        </div>
                                                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-200' : 'text-slate-700'}`}>{row.name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-xs text-slate-500">{row.dept}</td>
                                                <td className="px-4 py-3">
                                                    <div className="flex flex-col">
                                                        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-slate-800'}`}>{row.checkIn}</span>
                                                        <span className="text-[10px] text-slate-500">Scheduled: 9:00 AM</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 flex justify-center">
                                                    <StatusBadge status={row.status} />
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`} title="View Details">
                                                            <Briefcase size={16} />
                                                        </button>
                                                        <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-200 text-slate-600'}`} title="Download">
                                                            <Download size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-xs text-slate-500">Showing 5 of 24 employees</p>
                            <div className="flex gap-2">
                                <button className={`px-3 py-1 text-xs rounded border ${isDarkMode ? 'bg-white/5 border-white/10 disabled:opacity-50' : 'bg-white border-slate-200 disabled:opacity-50'}`} disabled>Previous</button>
                                <button className={`px-3 py-1 text-xs rounded border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>Next</button>
                            </div>
                        </div>
                    </div>
                </MotionCard>

                <div className="space-y-6">
                    {/* 7. Late Arrival Monitor */}
                    <MotionCard delay={0.5}>
                        <div className={`p-6 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Late Arrivals</h2>
                                <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 Today</span>
                            </div>
                            <div className="space-y-3">
                                {lateArrivals.map((e, idx) => (
                                    <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                                <Clock size={16} />
                                            </div>
                                            <div>
                                                <p className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{e.name}</p>
                                                <p className="text-[10px] text-slate-500">{e.dept} • {e.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-bold text-orange-500">+{e.delay}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionCard>

                    {/* 8. Attendance Timeline */}
                    <MotionCard delay={0.6}>
                        <div className={`p-6 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-gray-100'}`}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Attendance Activity</h2>
                                <button className="text-slate-400 hover:text-blue-500"><RefreshCw size={14} /></button>
                            </div>
                            <div className="space-y-4 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200 dark:before:bg-slate-700">
                                {timelineActivities.map((act, idx) => (
                                    <div key={idx} className="flex gap-4 relative">
                                        <div className={`w-[23px] h-[23px] rounded-full border-2 border-white dark:border-[#0c162d] z-10 flex items-center justify-center shrink-0 ${
                                            act.type === 'checkin' ? 'bg-green-500' : 
                                            act.type === 'late' ? 'bg-orange-500' : 
                                            act.type === 'team' ? 'bg-blue-500' : 'bg-red-500'
                                        }`} />
                                        <div className="flex flex-col">
                                            <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>
                                                <span className="font-bold">{act.user || act.team}</span> {act.action}
                                            </p>
                                            <span className="text-[10px] text-slate-500 mt-1">{act.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </MotionCard>
                </div>
            </div>

            {/* 9. Quick Actions */}
            <MotionCard delay={0.7}>
                <div className={`p-6 rounded-xl shadow-sm border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white border-gray-100'}`}>
                    <h2 className={`font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all shadow-md hover:shadow-blue-500/25 active:scale-95 group">
                            <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                            <span className="font-semibold text-sm">Mark Attendance</span>
                        </button>
                        <button className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all shadow-sm active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                            <FileText size={18} className="text-slate-400 group-hover:text-blue-500" />
                            <span className="font-semibold text-sm">Download Team Report</span>
                        </button>
                        <button className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all shadow-sm active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                            <Send size={18} className="text-slate-400 group-hover:text-blue-500" />
                            <span className="font-semibold text-sm">Send Reminders</span>
                        </button>
                        <button className={`flex items-center justify-center gap-3 px-4 py-3 rounded-lg border transition-all shadow-sm active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                            <BarChart3 size={18} className="text-slate-400 group-hover:text-blue-500" />
                            <span className="font-semibold text-sm">Generate Monthly Report</span>
                        </button>
                    </div>
                </div>
            </MotionCard>

            {/* Pagination / Footer Interaction Area */}
            <div className={`mt-12 pt-8 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-100'} text-center`}>
                <p className="text-xs text-slate-500">© 2026 NEXI5 Workforce Monitoring System • Version 2.0.4</p>
            </div>
        </div>
    );
}

// Icon fallbacks if needed
function BarChart3(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
        </svg>
    )
}
