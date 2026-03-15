import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Plus, Search, Filter, Eye, Edit2, 
    CheckCircle2, Clock, ChevronRight, 
    LayoutGrid, Settings, Activity,
    Check, X, MoreVertical, BarChart3, PieChart as PieIcon,
    FileCheck
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, PieChart, Pie, Cell 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    permissionsStatsCards as statsCards,
    permissionRoles as roles,
    matrixData,
    roleSummaries,
    moduleAccess,
    permissionsAnalyticsData as analyticsData,
    permissionsPieData as pieData,
    permissionsRecentActivity as recentActivity,
    permissionsQuickActions,
} from '@/datasets/permissions/permissionsData';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs font-semibold" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function Permissions() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Permissions Management</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Create Permission Rule
                </button>
            </div>


            {/* 4. Permissions Matrix Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Permissions Matrix</h3>
                    <div className="flex items-center gap-2">
                         <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>
                            <Filter size={18} />
                        </button>
                        <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 sticky left-0 z-20 bg-inherit min-w-[200px]">Module</th>
                                {roles.map((role, i) => (
                                    <th key={i} className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">{role}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            {matrixData.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold sticky left-0 z-20 bg-inherit border-r dark:border-white/5">{row.module}</td>
                                    {roles.map((role, ri) => {
                                        const perm = row.permissions[role];
                                        let badgeColor = "bg-gray-500/10 text-gray-500";
                                        let icon = <X size={12} className="text-red-500" />;
                                        
                                        if (perm === 'Full') {
                                            badgeColor = "bg-green-500/10 text-green-500 border-green-500/20";
                                            icon = <Check size={12} className="text-green-500" />;
                                        } else if (perm?.includes('View')) {
                                            badgeColor = "bg-blue-500/10 text-blue-500 border-blue-500/20";
                                            icon = <Eye size={12} className="text-blue-500" />;
                                        } else if (perm === 'Restricted') {
                                            badgeColor = "bg-red-500/10 text-red-500 border-red-500/20";
                                            icon = <X size={12} className="text-red-500" />;
                                        } else if (perm === 'Approve') {
                                            badgeColor = "bg-amber-500/10 text-amber-500 border-amber-500/20";
                                            icon = <CheckCircle2 size={12} className="text-amber-500" />;
                                        }

                                        return (
                                            <td key={ri} className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border flex items-center gap-1.5 ${badgeColor}`}>
                                                        {icon}
                                                        {perm || 'Restricted'}
                                                    </span>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. Role Permission Overview & Module Access Control */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Permission Summary */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Role Permission Summary</h3>
                        <Activity size={20} className="text-primary" />
                    </div>
                    <div className="space-y-6 flex-1">
                        {roleSummaries.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold">{item.role}</span>
                                    <span className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{item.label}</span>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <div 
                                        className={`h-full rounded-full ${item.color} transition-all duration-1000 shadow-sm`} 
                                        style={{ width: `${(item.count / item.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Module Access Control */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Module Access Control</h3>
                        <LayoutGrid size={20} className="text-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {moduleAccess.map((mod, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-3 transition-all hover:shadow-md ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-200'}`}>
                                <h4 className="font-bold text-sm leading-tight">{mod.name}</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-500">{mod.roles} Roles allowed</span>
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-500">{mod.level}</span>
                                </div>
                                <div className="mt-auto pt-2 flex items-center gap-1 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                    <Clock size={10} />
                                    Updated {mod.updated}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Permission Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Bar Chart */}
                <div className={`lg:col-span-2 rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Roles vs Permissions</h3>
                        <BarChart3 size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={analyticsData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="permissions" fill={isDarkMode ? "#3ec3ff" : "#2563EB"} radius={[4, 4, 0, 0]} barSize={40} />
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Permission Usage</h3>
                        <PieIcon size={20} className="text-indigo-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 7. Recent Permission Changes & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Updates */}
                <div className={`lg:col-span-2 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Permission Updates</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6">
                        {recentActivity.map((act, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    <act.icon size={18} className={act.color} />
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

                {/* Quick Admin Actions */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <Settings size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {permissionsQuickActions.map((btn, i) => (
                            <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                <btn.icon size={18} className={btn.color} />
                                {btn.label}
                                <ChevronRight size={14} className="ml-auto text-gray-400" />
                            </button>
                        ))}
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

