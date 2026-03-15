import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Users, UserCheck, UserPlus, UserMinus, Building2, 
    Briefcase, Calendar, MapPin, Search, Filter, 
    MoreVertical, Eye, Edit2, Trash2, Clock, 
    ChevronRight, ArrowLeft, Plus, Download, 
    FileText, PieChart as PieIcon, BarChart3, 
    Activity, Globe, Milestone, TrendingUp,
    CheckCircle2, AlertCircle, Laptop, Layers,
    ClipboardList, UserCog, Upload
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, PieChart, Pie, Cell, 
    LineChart, Line, AreaChart, Area 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

import { 
    employeeMgmtStatsCards as statsCards, 
    employeeMgmtGrowthData as growthData, 
    deptDistribution, 
    employeeDirectory, 
    deptWorkforce, 
    employeeMgmtRecentActivities as recentActivities 
} from '@/datasets/management/employeeManagementData';

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

export default function EmployeeManagement() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Management</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Add Employee
                </button>
            </div>


            {/* 4. Employee Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Employee Growth Trend */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Growth Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isDarkMode ? "#3ec3ff" : "#2563EB"} stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor={isDarkMode ? "#3ec3ff" : "#2563EB"} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Area type="monotone" dataKey="hires" stroke={isDarkMode ? "#3ec3ff" : "#2563EB"} strokeWidth={3} fillOpacity={1} fill="url(#colorHires)" />
                                <Legend />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Employee Distribution by Department */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Distribution by Department</h3>
                        <PieIcon size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={deptDistribution} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value">
                                    {deptDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5. Employee Directory Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Directory</h3>
                    <div className="flex items-center gap-3">
                         <div className="relative hidden sm:block">
                            <input 
                                type="text" 
                                placeholder="Search employees..." 
                                className={`pl-9 pr-4 py-1.5 rounded-full text-xs focus:outline-none focus:ring-1 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff]' : 'bg-lightBlueBg border border-borderColor text-dark focus:border-primary'}`}
                            />
                            <Search className="absolute left-3 top-2 text-gray-400" size={12} />
                         </div>
                         <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>
                             <Filter size={16} className="text-gray-500" />
                         </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Employee Name</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Employee ID</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Role</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Manager</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Joining Date</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {employeeDirectory.map((emp, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff]' : 'bg-primary/10 text-primary'}`}>
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <span className="font-bold">{emp.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center text-gray-500 font-medium">{emp.empId}</td>
                                    <td className="p-4">{emp.dept}</td>
                                    <td className="p-4 font-medium">{emp.role}</td>
                                    <td className="p-4 text-gray-500">{emp.manager}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${emp.status === 'Active' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                                            {emp.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center text-gray-500">{emp.date}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary transition-all'}`} title="View Profile"><Eye size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary transition-all'}`} title="Edit Employee"><Edit2 size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-red-500' : 'hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-all'}`} title="Deactivate"><UserMinus size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Department Workforce Overview */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Department Workforce Summary</h3>
                    <Layers size={20} className="text-secondary" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
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
                                    <td className="p-4 text-center text-gray-500">{dept.managers}</td>
                                    <td className="p-4 text-center font-bold text-primary dark:text-[#3ec3ff]">{dept.projects}</td>
                                    <td className="p-4 text-center font-bold text-emerald-500">{dept.attendance}</td>
                                    <td className="p-4 text-center">
                                         <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${dept.score === 'Excellent' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                                            {dept.score}
                                         </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 7. Employee Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Employee Activity Timeline */}
                <div className={`lg:col-span-2 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Employee Activities</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentActivities.map((act, i) => (
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

                {/* Quick Actions Panel */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <UserCog size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: 'Add Employee', icon: UserPlus, color: 'text-blue-500' },
                            { label: 'Import Employee Data', icon: Upload, color: 'text-purple-500' },
                            { label: 'View Employee Reports', icon: BarChart3, color: 'text-orange-500' },
                            { label: 'View Attendance Dashboard', icon: ClipboardList, color: 'text-pink-500' },
                            { label: 'Generate Workforce Report', icon: FileText, color: 'text-emerald-500' }
                        ].map((btn, i) => {
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
