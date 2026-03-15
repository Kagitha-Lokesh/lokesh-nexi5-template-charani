import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Activity, Shield, ShieldAlert, History, Search, 
    Filter, Download, Eye, Flag, User, Clock, 
    ChevronRight, ArrowLeft, Plus, Save, 
    CheckCircle2, AlertCircle, Terminal, 
    Lock, Key, Globe, LayoutGrid, FileSearch
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, LineChart, Line, 
    PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

import {
    auditStats as statsCards,
    activityTrend,
    moduleActions,
    auditLogs,
    activeUsers,
    criticalEvents,
    auditQuickActions,
    auditFilterOptions
} from '@/datasets/audit/auditLogsData';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs font-semibold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AuditLogs() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        role: 'All Roles',
        module: 'All Modules',
        action: 'All Actions'
    });

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Audit Logs</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={16} />
                    Export Logs
                </button>
            </div>


            {/* 4. Audit Filters Section */}
            <div className={`rounded-xl border flex flex-col p-6 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <Filter size={20} className="text-primary dark:text-[#3ec3ff]" />
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Audit Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">User Role</label>
                        <select
                            value={filters.role}
                            onChange={(e) => setFilters(prev => ({ ...prev, role: e.target.value }))}
                            className={`p-2 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-lightBlueBg border-borderColor text-dark'}`}
                        >
                            {auditFilterOptions.roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Module</label>
                        <select
                            value={filters.module}
                            onChange={(e) => setFilters(prev => ({ ...prev, module: e.target.value }))}
                            className={`p-2 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-lightBlueBg border-borderColor text-dark'}`}
                        >
                            {auditFilterOptions.modules.map(mod => (
                                <option key={mod} value={mod}>{mod}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Action Type</label>
                        <select
                            value={filters.action}
                            onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
                            className={`p-2 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-lightBlueBg border-borderColor text-dark'}`}
                        >
                            {auditFilterOptions.actions.map(action => (
                                <option key={action} value={action}>{action}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1">Date Range</label>
                        <input type="date" className={`p-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-lightBlueBg border-borderColor text-dark'}`} />
                    </div>
                    <div className="flex items-end">
                        <button className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm text-white transition-all active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                            <Search size={16} />
                            Search Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Audit Logs Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>System Audit Logs</h3>
                    <div className="relative hidden sm:block">
                        <input 
                            type="text" 
                            placeholder="Search logs..." 
                            className={`pl-9 pr-4 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff]' : 'bg-lightBlueBg border border-borderColor text-dark focus:border-primary'}`}
                        />
                        <Search className="absolute left-3 top-2 text-gray-400" size={12} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Timestamp</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Role</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Module</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">IP Address</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {auditLogs.map((log, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-medium text-gray-500">{log.time}</td>
                                    <td className="p-4 font-bold">{log.user}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400`}>
                                            {log.role}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{log.module}</td>
                                    <td className="p-4 font-semibold">{log.action}</td>
                                    <td className="p-4 text-center text-gray-400 font-mono text-[11px]">{log.ip}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${log.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary transition-all'}`} title="View Details"><Eye size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary transition-all'}`} title="Download Log"><Download size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-red-500' : 'hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-all'}`} title="Flag Event"><Flag size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Activity Trend */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>System Activity Trend</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityTrend}>
                                <defs>
                                    <linearGradient id="colorActivity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isDarkMode ? "#3ec3ff" : "#2563EB"} stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor={isDarkMode ? "#3ec3ff" : "#2563EB"} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Area type="monotone" dataKey="activity" stroke={isDarkMode ? "#3ec3ff" : "#2563EB"} strokeWidth={3} fillOpacity={1} fill="url(#colorActivity)" />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Actions by Module */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>User Actions by Module</h3>
                        <Terminal size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={moduleActions} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="module" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={100} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="actions" fill={isDarkMode ? "#3ec3ff" : "#2563EB"} radius={[0, 4, 4, 0]} barSize={20} />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 7. Bottom Section Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Top Active Users */}
                <div className={`lg:col-span-2 rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Top Active Users</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">User</th>
                                    <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                                    <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions Performed</th>
                                    <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Last Activity</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {activeUsers.map((u, i) => (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                        <td className="p-4 font-bold">{u.user}</td>
                                        <td className="p-4 text-gray-500 font-medium">{u.role}</td>
                                        <td className="p-4 text-center font-bold text-primary dark:text-[#3ec3ff]">{u.actions}</td>
                                        <td className="p-4 text-center text-gray-500">{u.last}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Critical Events */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Critical Events</h3>
                        <ShieldAlert size={20} className="text-pink-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {criticalEvents.map((act, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={18} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {act.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions Panel */}
            <div className={`rounded-xl border p-6 flex flex-col md:flex-row flex-wrap items-center gap-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <h3 className={`font-headings font-bold text-lg mr-4 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    {auditQuickActions.map((btn, i) => (
                        <button key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10' : 'bg-gray-50 border border-gray-100 text-dark hover:bg-white hover:shadow-md'}`}>
                             <div className={`w-6 h-6 rounded-md flex items-center justify-center ${btn.bgColor}`}>
                                 <btn.icon size={14} className={btn.color} />
                             </div>
                             {btn.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
