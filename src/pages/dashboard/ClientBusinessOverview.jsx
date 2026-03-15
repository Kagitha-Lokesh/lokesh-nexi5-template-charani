import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Users, Building2, Briefcase, CreditCard, FolderKanban, 
    AlertCircle, ArrowLeft, Plus, Search, Filter, Eye, Edit2, 
    Trash2, Clock, ChevronRight, LayoutGrid, Settings, 
    FileText, Activity, MoreVertical, Zap, TrendingUp, 
    BarChart3, PieChart as PieIcon, Landmark, Target,
    Handshake, FileCheck, CalendarDays, ClipboardList,
    DollarSign, Globe, Layers, CheckCircle2
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, LineChart, Line, 
    PieChart, Pie, Cell, ComposedChart, Area 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

const LocalTrendingUp = ({ size, className }) => <TrendingUp size={size} className={className} />;

import { 
    statsCards, 
    revenueTrendData, 
    revenueByClientData, 
    industryDistribution, 
    activeClients, 
    businessOpportunities, 
    clientProjectsData, 
    recentActivities,
    clientQuickActions
} from '@/datasets/dashboard/clientBusinessData';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs font-semibold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {typeof entry.value === 'number' && entry.name.toLowerCase().includes('revenue') ? `$${entry.value}K` : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function ClientBusinessOverview() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Client & Business Overview</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Add New Client
                </button>
            </div>


            {/* 4. Business Revenue Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Growth Trend */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Revenue Growth Trend ($K)</h3>
                        <LocalTrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={revenueTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Area type="monotone" dataKey="revenue" fill={isDarkMode ? "rgba(62, 195, 255, 0.1)" : "rgba(37, 99, 235, 0.1)"} stroke="none" />
                                <Line type="monotone" dataKey="revenue" name="Revenue" stroke={isDarkMode ? "#3ec3ff" : "#2563EB"} strokeWidth={3} dot={{ r: 4, fill: isDarkMode ? "#3ec3ff" : "#2563EB" }} activeDot={{ r: 6 }} />
                                <Legend />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue by Client */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Revenue by Top Clients ($K)</h3>
                        <BarChart3 size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByClientData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 10 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="value" name="Revenue" radius={[4, 4, 0, 0]} barSize={40}>
                                    {revenueByClientData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5. Client Distribution Pie Chart */}
            <div className={`rounded-xl border flex flex-col h-[450px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Client Distribution by Industry</h3>
                    <PieIcon size={20} className="text-[#3ec3ff]" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={industryDistribution} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                                {industryDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 600 }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 6. Active Clients Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Active Clients</h3>
                    <Building2 size={20} className="text-secondary" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Client Name</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Industry</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Projects</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Account Manager</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Revenue Generated</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {activeClients.map((client, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{client.name}</td>
                                    <td className="p-4 text-center text-gray-500">{client.industry}</td>
                                    <td className="p-4 text-center font-medium">{client.projects}</td>
                                    <td className="p-4 text-gray-500">{client.manager}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center font-bold text-primary dark:text-[#3ec3ff]">{client.revenue}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="View Client"><Eye size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="Edit Client"><Edit2 size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="View Projects"><FolderKanban size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 7. Business Opportunities Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Business Opportunities</h3>
                    <Target size={20} className="text-orange-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Opportunity Name</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Client</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Value</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Stage</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Owner</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Exp. Close Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {businessOpportunities.map((opp, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{opp.name}</td>
                                    <td className="p-4 text-gray-500">{opp.client}</td>
                                    <td className="p-4 text-center font-bold text-emerald-500">{opp.value}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                            {opp.stage}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 font-medium">{opp.owner}</td>
                                    <td className="p-4 text-center text-gray-400 font-medium">{opp.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 8. Project Allocation by Client Chart */}
            <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Project Allocation by Client</h3>
                    <Layers size={20} className="text-indigo-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={clientProjectsData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="client" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={120} />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="projects" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={25} />
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 9. Recent Business Activities & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Business Activities */}
                <div className={`lg:col-span-2 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Business Activities</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentActivities.map((act, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <Activity size={18} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-[14px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {act.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <Settings size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {clientQuickActions.map((btn, i) => {
                            const Icon = btn.icon;
                            return (
                                <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${btn.color.replace('text-', 'bg-')}/10`}>
                                        <Icon size={18} className={btn.color} />
                                    </div>
                                    {btn.label}
                                    <ChevronRight size={14} className="ml-auto text-gray-400" />
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}

// End of ClientBusinessOverview
