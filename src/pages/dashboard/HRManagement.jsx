import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Plus, Search, Eye, Edit2, 
    Clock, ChevronRight, Settings, Activity,
    MoreVertical, PieChart as PieIcon,
    TrendingUp, Briefcase, LayoutGrid
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, PieChart, Pie, Cell, 
    LineChart, Line
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    hrStatsCards as statsCards,
    hrHiringTrendData as hiringTrendData,
    hrDistributionData as distributionData,
    recruitmentMetrics,
    hrEmployeeActivities as employeeActivities,
    hrDeptWorkforce as deptWorkforce,
    hrActivitiesData as hrActivities,
    hrQuickActions,
} from '@/datasets/hr/hrManagementData';

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

export default function HRManagement() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>HR Management</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Add HR Staff
                </button>
            </div>


            {/* 4. HR Operations Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Hiring Trend */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Monthly Hiring Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hiringTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Line type="monotone" dataKey="hires" stroke={isDarkMode ? "#3ec3ff" : "#2563EB"} strokeWidth={3} dot={{ r: 4, fill: isDarkMode ? "#3ec3ff" : "#2563EB" }} activeDot={{ r: 6 }} />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Employee Distribution */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Distribution by Department</h3>
                        <PieIcon size={20} className="text-[#3ec3ff]" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value">
                                    {distributionData.map((entry, index) => (
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

            {/* 5. Recruitment Overview Section */}
            <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recruitment Overview</h3>
                    <Briefcase size={20} className="text-secondary" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {recruitmentMetrics.map((met, idx) => (
                        <div key={idx} className={`p-4 rounded-xl border flex flex-col items-center text-center gap-2 transition-all hover:scale-[1.05] ${isDarkMode ? 'bg-white/5 border-white/5 shadow-lg' : 'bg-gray-50 border-gray-100 shadow-sm'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${met.color.replace('text-', 'bg-')}/10`}>
                                <met.icon size={20} className={met.color} />
                            </div>
                            <h4 className={`text-xl font-bold font-headings leading-none ${isDarkMode ? 'text-white' : 'text-dark'}`}>{met.value}</h4>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{met.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* 6. Recent Employee Activities Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Employee Activities</h3>
                    <Activity size={20} className="text-emerald-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Employee</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">HR Module</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Date</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {employeeActivities.map((act, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{act.name}</td>
                                    <td className="p-4 text-gray-500">{act.dept}</td>
                                    <td className="p-4 font-medium text-primary dark:text-[#3ec3ff]">{act.action}</td>
                                    <td className="p-4 text-gray-400">{act.module}</td>
                                    <td className="p-4 text-center text-gray-500 font-medium">{act.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${act.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} border`}>
                                            {act.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 7. Department Workforce Summary Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Department Workforce Summary</h3>
                    <LayoutGrid size={20} className="text-indigo-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Employees</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Managers</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Active Projects</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Attendance %</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Performance</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {deptWorkforce.map((dept, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{dept.dept}</td>
                                    <td className="p-4 text-center font-medium">{dept.employees}</td>
                                    <td className="p-4 text-center font-medium">{dept.managers}</td>
                                    <td className="p-4 text-center">{dept.projects}</td>
                                    <td className="p-4 text-center font-semibold text-primary dark:text-[#3ec3ff]">{dept.attendance}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${dept.score === 'Excellent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {dept.score}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 8. Recent HR Activities & Quick Actions Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent HR Activities */}
                <div className={`lg:col-span-2 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent HR Activities</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {hrActivities.map((act, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
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

                {/* Quick Actions */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <Settings size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {hrQuickActions.map((btn, i) => (
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

// End of HRManagement
