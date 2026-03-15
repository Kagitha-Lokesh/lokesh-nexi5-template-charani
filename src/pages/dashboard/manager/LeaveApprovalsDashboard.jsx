import React, { useState } from 'react';
import { 
    Calendar, Check, X, Eye, Filter, Search, 
    Download, FileText, Share2, Users, Clock, 
    AlertCircle, CheckCircle2, MoreHorizontal, 
    RefreshCw, Send, Trash2, ChevronRight, 
    CalendarDays, UserCheck, UserX, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';
import {
    pendingRequests,
    calendarEvents,
    leaveTableData,
    leaveAvailabilityData as availabilityData,
    leaveRecentActivity as recentActivity,
} from '@/datasets/manager/leaveApprovalsData';

// --- Sub-components ---

const MotionCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function LeaveApprovalsDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const cardClass = `p-6 rounded-xl shadow-sm border transition-all duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white border-gray-100'}`;
    const headingClass = `font-semibold font-headings ${isDarkMode ? 'text-white' : 'text-slate-800'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-semibold tracking-tight"
                    >
                        Team Leave Approvals
                    </motion.h1>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage employee leave requests and track team availability.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-all shadow-md active:scale-95 group">
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        Download Leave Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Share2 size={16} />
                        Export Leave Requests
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <FileText size={16} />
                        Generate Leave Summary
                    </button>
                </div>
            </div>

            {/* 3. Leave Filters Panel */}
            <MotionCard delay={0.1}>
                <div className={cardClass}>
                    <div className="flex items-center gap-2 mb-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                        <Filter size={14} />
                        Filter Leave Requests
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Leave Type</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Annual Leave</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Sick Leave</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Personal Leave</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Department</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>All Departments</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Engineering</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>HR</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Sales</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Employee</label>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Name..." className={`w-full pl-9 pr-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Leave Status</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Pending</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Approved</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Rejected</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-500">Date Range</label>
                            <input type="month" className={`w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200'}`} />
                        </div>
                    </div>
                </div>
            </MotionCard>

            {/* 4. Pending Leave Requests Board */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className={headingClass}>Pending Leave Requests</h2>
                    <span className="text-xs text-slate-500 font-medium">3 Actions Required</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingRequests.map((req, idx) => (
                        <motion.div
                            key={req.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className={`${cardClass} hover:shadow-xl group`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:rotate-6 transition-transform">
                                        {req.avatar}
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{req.name}</h3>
                                        <p className="text-xs text-slate-500 font-medium">{req.dept}</p>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                    {req.type}
                                </div>
                            </div>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-xs">
                                    <Clock size={14} className="text-slate-400" />
                                    <span className="font-semibold">{req.duration}</span>
                                </div>
                                <div className="flex items-start gap-2 text-xs">
                                    <AlertCircle size={14} className="text-slate-400 mt-0.5" />
                                    <span className="text-slate-500 line-clamp-2 italic">"{req.reason}"</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <button className="flex items-center justify-center gap-1.5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-green-500/20 active:scale-95">
                                    <Check size={14} /> Approve
                                </button>
                                <button className="flex items-center justify-center gap-1.5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-red-500/20 active:scale-95">
                                    <X size={14} /> Reject
                                </button>
                                <button className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                                    <Eye size={14} /> Details
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 5. Leave Calendar View */}
                <MotionCard delay={0.4} className="lg:col-span-2">
                    <div className={`${cardClass} h-full`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Team Leave Calendar</h2>
                            <div className="flex gap-2">
                                <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}><ChevronRight size={16} className="rotate-180" /></button>
                                <span className="text-sm font-bold">April 2026</span>
                                <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}><ChevronRight size={16} /></button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {calendarEvents.map((event, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    className={`flex items-center justify-between p-3 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-10 rounded-lg flex flex-col items-center justify-center text-[10px] font-bold text-white shadow-sm ${event.color}`}>
                                            <span>{event.date.split(' ')[0]}</span>
                                            <span className="text-sm">{event.date.split(' ')[1]}</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">{event.employee}</p>
                                            <p className="text-[10px] text-slate-500 font-medium">{event.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-6 h-6 rounded-full border-2 border-white dark:border-[#1e293b] bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[8px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    T{i}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-green-500">85% Team Available</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="mt-6 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4">
                           {['Sick Leave', 'Vacation', 'Personal', 'Maternity'].map((label, i) => (
                               <div key={i} className="flex items-center gap-2">
                                   <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-orange-500' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-purple-500' : 'bg-pink-500'}`} />
                                   <span className="text-[10px] font-medium text-slate-500">{label}</span>
                               </div>
                           ))}
                        </div>
                    </div>
                </MotionCard>

                {/* 7. Team Availability Monitor */}
                <MotionCard delay={0.5}>
                    <div className={`${cardClass} h-full`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Team Availability Monitor</h2>
                            <Info size={16} className="text-slate-400" />
                        </div>
                        <div className="space-y-6">
                            {availabilityData.map((dept, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{dept.dept}</p>
                                            <p className="text-sm font-bold">{dept.present} Present / {dept.onLeave} on Leave</p>
                                        </div>
                                        <span className={`text-[10px] font-bold uppercase ${dept.color}`}>{dept.status}</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(dept.present / (dept.present + dept.onLeave)) * 100}%` }}
                                            transition={{ duration: 1, delay: 0.6 + idx * 0.1 }}
                                            className={`h-full rounded-full ${dept.status === 'Available' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={`mt-8 p-4 rounded-xl border border-dashed ${isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                            <p className="text-[10px] font-bold text-blue-500 uppercase mb-1">Manager Tip</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 italic">"Ensure at least 50% staff availability in Engineering before approving more vacation requests this week."</p>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 6. Leave Request Table */}
            <MotionCard delay={0.6}>
                <div className={cardClass}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className={headingClass}>Leave Request Records</h2>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search Requests..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-9 pr-4 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
                                />
                            </div>
                            <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                <RefreshCw size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto min-h-[300px]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Employee</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Type</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Dates (Total)</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {leaveTableData.map((row) => (
                                        <motion.tr 
                                            key={row.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`group border-b last:border-0 transition-all ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-50 hover:bg-slate-50/50'}`}
                                        >
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] text-white ${isDarkMode ? 'bg-slate-700' : 'bg-blue-100 text-blue-600'}`}>
                                                        {row.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{row.name}</p>
                                                        <p className="text-[10px] text-slate-500 uppercase font-medium">{row.dept}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                    row.type === 'Sick Leave' ? 'text-orange-500 bg-orange-500/10' : 
                                                    row.type === 'Vacation' ? 'text-blue-500 bg-blue-500/10' : 'text-purple-500 bg-purple-500/10'
                                                }`}>
                                                    {row.type}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xs font-bold">{row.start} - {row.end}</span>
                                                    <span className="text-[10px] text-slate-500">{row.days} Days Total</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex justify-center">
                                                    <StatusBadge status={row.status} />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-green-500/20 text-green-500' : 'hover:bg-green-50 text-green-600'}`} title="Approve"><Check size={14} /></button>
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-red-500/20 text-red-500' : 'hover:bg-red-50 text-red-600'}`} title="Reject"><X size={14} /></button>
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-blue-500/20 text-blue-500' : 'hover:bg-blue-50 text-blue-600'}`} title="History"><CalendarDays size={14} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Showing 3 of 42 Records</p>
                        <div className="flex gap-2">
                           {[1, 2, 3].map(p => (
                               <button key={p} className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all ${p === 1 ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : isDarkMode ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
                                   {p}
                               </button>
                           ))}
                        </div>
                    </div>
                </div>
            </MotionCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 8. Recent Leave Activity */}
                <MotionCard delay={0.7}>
                    <div className={cardClass}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Recent Leave Activity</h2>
                            <button className="text-[10px] font-bold text-blue-500 uppercase hover:underline tracking-widest">View History</button>
                        </div>
                        <div className="space-y-4">
                            {recentActivity.map((act) => (
                                <div key={act.id} className="flex gap-4 group">
                                    <div className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 group-hover:scale-125 transition-transform ${
                                        act.type === 'submit' ? 'bg-blue-500' : 
                                        act.type === 'approve' ? 'bg-green-500' : 
                                        act.type === 'reject' ? 'bg-red-500' : 'bg-slate-400'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{act.text}</p>
                                        <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-500 font-medium">
                                            <Clock size={10} />
                                            {act.time}
                                        </div>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </MotionCard>

                {/* 9. Quick Actions */}
                <MotionCard delay={0.8}>
                    <div className={cardClass}>
                        <h2 className={`font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button className="flex items-center justify-between px-4 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all shadow-md hover:shadow-green-500/25 active:scale-95 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                        <UserCheck size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold leading-tight uppercase tracking-wider">Approve All</p>
                                        <p className="text-[10px] opacity-80">Process pending requests</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            
                            <button className="flex items-center justify-between px-4 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all shadow-md hover:shadow-blue-500/25 active:scale-95 group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                                        <Send size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold leading-tight uppercase tracking-wider">Send Reminders</p>
                                        <p className="text-[10px] opacity-80">Notify employees on status</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                                        <Calendar size={20} className="text-blue-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold leading-tight uppercase tracking-wider">Download Calendar</p>
                                        <p className="text-[10px] text-slate-500">April schedule as PDF</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className={`flex items-center justify-between px-4 py-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                                        <FileText size={20} className="text-emerald-500" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-bold leading-tight uppercase tracking-wider">Monthly Report</p>
                                        <p className="text-[10px] text-slate-500">March leave analytics</p>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* Footer */}
            <div className={`py-8 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>NEXI5 Approval Center v2.0 · All rights reserved</p>
            </div>
        </div>
    );
}
