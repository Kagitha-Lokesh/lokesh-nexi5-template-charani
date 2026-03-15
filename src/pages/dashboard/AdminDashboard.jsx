import { useState } from 'react';
import { 
    Users, Building2, FolderKanban, ClipboardCheck, CalendarCheck, 
    CreditCard, TrendingUp, ShieldAlert, ArrowRight, Plus, 
    Search, Filter, MoreVertical, Download, Eye, CheckCircle2,
    Clock, Bell, Settings, PieChart as PieIcon, BarChart3, 
    Activity, Shield, Lock, UserPlus, FileText, ChevronRight
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, PieChart, Pie, Cell, 
    LineChart, Line, AreaChart, Area 
} from 'recharts';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
    adminStatsCards as statsCards, 
    recruitmentSummary, 
    payrollDashboardSummary, 
    projectDashboardSummary 
} from '@/datasets';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate, Link } from 'react-router-dom';

// Datasets
import { deptData, attendanceTrends, growthAnalyticsData } from '@/datasets/charts/adminCharts';
import { recentActivities, systemLogs, notifications } from '@/datasets/logs/adminLogs';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
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

export default function AdminDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`p-4 md:p-6 lg:p-8 flex flex-col gap-6 animate-fade-in relative overflow-hidden ${isDarkMode ? 'bg-transparent' : 'bg-lightBlueBg'}`}>
            
            {/* Background Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

            {/* 1. Welcome Banner */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-sm'}`}
            >
                <div>
                    <h2 className={`text-2xl md:text-3xl font-headings font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:from-[#3ec3ff] dark:to-primary animate-gradient-x bg-[length:200%_auto]`}>Welcome Admin!</h2>
                    <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                        Monitor organization activity, employees, payroll and system analytics.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}
                    >
                        View Reports
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/org-overview')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all active:scale-95 ${isDarkMode ? 'bg-primary hover:bg-blue-700' : 'bg-primary hover:bg-blue-700'}`}
                    >
                        Learn More
                    </button>
                </div>
            </motion.div>

            {/* 2. Statistics Cards Grid (8 cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        whileHover={{ y: -5, shadow: isDarkMode ? '0 0 25px rgba(56,189,248,0.2)' : '0 10px 25px rgba(0,0,0,0.05)' }}
                        onClick={() => navigate(stat.path)}
                        className={`p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 cursor-pointer ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}
                    >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bgColor} group transition-transform duration-300`}>
                             <stat.icon size={26} style={{ color: stat.color }} className="group-hover:scale-110 group-hover:rotate-6 transition-transform" />
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                {typeof stat.value === 'string' && isNaN(stat.value) ? stat.value : (
                                    <CountUp end={parseInt(stat.value)} duration={2} separator="," />
                                )}
                            </h3>
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 3. Organization Overview Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Employee Distribution */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Distribution</h3>
                        <PieIcon size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                                    {deptData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Overview */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Attendance Overview</h3>
                        <BarChart3 size={20} className="text-gray-400" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={attendanceTrends}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B' }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="present" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={20} />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 4. HR Operations Overview (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Recruitment Summary Card */}
                <div className={`p-6 rounded-xl border flex flex-col gap-4 shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-borderColor'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h4 className={`font-bold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Recruitment</h4>
                        <Link to="/dashboard/recruitment" className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80 font-bold' : 'text-primary hover:text-blue-700'}`}>View All</Link>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-2xl font-bold font-headings">{recruitmentSummary.totalOpenJobs}</p>
                            <p className="text-[11px] font-bold text-gray-500 uppercase">Open Jobs</p>
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-headings text-emerald-500">+{recruitmentSummary.newHires}</p>
                            <p className="text-[11px] font-bold text-gray-500 uppercase">New Hires</p>
                        </div>
                    </div>
                </div>

                {/* Payroll Summary Card */}
                <div className={`p-6 rounded-xl border flex flex-col gap-4 shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-borderColor'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h4 className={`font-bold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Payroll</h4>
                        <Link to="/dashboard/payroll" className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-primary hover:text-blue-700'}`}>Details</Link>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-1 ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff]' : 'bg-blue-50 text-primary'}`}>
                                {payrollDashboardSummary.status}
                            </span>
                            <p className="text-2xl font-bold font-headings">{payrollDashboardSummary.totalProcessed}</p>
                            <p className="text-[11px] font-bold text-gray-500 uppercase">Processed</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold font-headings text-orange-500">{payrollDashboardSummary.pendingApprovals}</p>
                            <p className="text-[11px] font-bold text-gray-500 uppercase leading-none">Pending</p>
                        </div>
                    </div>
                </div>

                {/* Project Summary Card */}
                <div className={`p-6 rounded-xl border flex flex-col gap-4 shadow-sm transition-all hover:shadow-md ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-borderColor'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                        <h4 className={`font-bold text-sm uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Projects</h4>
                        <Link to="/dashboard/projects" className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-primary hover:text-blue-700'}`}>Board</Link>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="relative w-14 h-14 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-gray-100 dark:text-white/5" />
                                <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150.8" strokeDashoffset={150.8 * (1 - 0.85)} className="text-[#3ec3ff]" />
                            </svg>
                            <span className="absolute text-[11px] font-bold">{projectDashboardSummary.teamAllocation}</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold font-headings">{projectDashboardSummary.activeProjects}</p>
                            <p className="text-[11px] font-bold text-gray-500 uppercase">Active</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. User Management Table Section */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent User Activities</h3>
                    <div className="flex gap-2">
                        <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                            <Filter size={18} className="text-gray-500" />
                        </button>
                        <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                            <Search size={18} className="text-gray-500" />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>User</th>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>Role</th>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>Action</th>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>Module</th>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>Date</th>
                                <th className={`p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`}>Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentActivities.map((act, i) => (
                                <tr key={i} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-medium">{act.user}</td>
                                    <td className="p-4"><span className={`px-2 py-1 rounded-md text-xs font-medium ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{act.role}</span></td>
                                    <td className="p-4 text-gray-500">{act.action}</td>
                                    <td className="p-4 text-gray-500">{act.module}</td>
                                    <td className="p-4 text-gray-500">{act.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${act.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {act.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Grid Row: System Activity & Quick Access & Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* System Activity Panel */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>System Activity</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-6 flex-1">
                        {systemLogs.map((log, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${log.color.replace('text-', 'bg-')}`}></div>
                                <div>
                                    <p className={`text-[14px] font-medium ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{log.message}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {log.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Access Panel */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <Shield size={20} className="text-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: 'Add New User', icon: UserPlus, color: 'text-blue-500', path: '/dashboard/employee/add' },
                            { label: 'Create Department', icon: Building2, color: 'text-cyan-500', path: '/dashboard/departments/add' },
                            { label: 'Allocate Project', icon: FolderKanban, color: 'text-indigo-500', path: '/dashboard/project' },
                            { label: 'Generate Report', icon: FileText, color: 'text-amber-500', path: '/dashboard/reports' },
                            { label: 'View Payroll', icon: CreditCard, color: 'text-pink-500', path: '/dashboard/payroll' }
                        ].map((btn, i) => (
                            <button 
                                key={i} 
                                onClick={() => navigate(btn.path)}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}
                            >
                                <btn.icon size={18} className={btn.color} />
                                {btn.label}
                                <ChevronRight size={14} className="ml-auto text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Notifications Widget */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Notifications</h3>
                        <Bell size={20} className="text-amber-500" />
                    </div>
                    <div className="space-y-4 flex-1">
                        {notifications.map((note, i) => (
                            <div key={i} className={`p-3 rounded-lg border flex items-center gap-3 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Bell size={14} />
                                </div>
                                <span className="text-sm font-medium">{note}</span>
                            </div>
                        ))}
                        <button className="text-sm font-bold text-primary dark:text-[#3ec3ff] hover:underline mt-2 text-center w-full">View All Notifications</button>
                    </div>
                </div>
            </div>

            {/* 7. Reports & Analytics Section (Large card) */}
            <div className={`rounded-xl border flex flex-col h-[500px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-xl ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organization Growth Analytics</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-xs font-semibold text-gray-500">Hiring</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#3ec3ff]"></div>
                            <span className="text-xs font-semibold text-gray-500">Expenses</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={growthAnalyticsData}>
                            <defs>
                                <linearGradient id="colorHiring" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B' }} />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Area type="monotone" dataKey="hiring" stroke="#2563EB" fillOpacity={1} fill="url(#colorHiring)" strokeWidth={3} />
                            <Area type="monotone" dataKey="expenses" stroke="#38BDF8" fillOpacity={1} fill="url(#colorExp)" strokeWidth={3} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Footer */}
            <div className="py-6 text-center">
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
