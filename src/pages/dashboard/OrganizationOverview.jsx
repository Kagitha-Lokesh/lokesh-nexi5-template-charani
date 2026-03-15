import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Users, Building2, FolderKanban, Briefcase, ClipboardCheck, 
    TrendingUp, ArrowLeft, ArrowRight, FileSearch, PieChart as PieIcon,
    BarChart3, Activity, Bell, ChevronRight, UserCheck, ShieldCheck,
    CheckCircle2, Clock, MoreVertical, LayoutGrid, Network
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, PieChart, Pie, Cell, 
    LineChart, Line, AreaChart, Area 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';

// Mock Data
import { 
    organizationStats as statsCards,
    departmentPerformance,
    employeeDistribution as distributionData,
    growthTrends as growthData,
    projectAllocation,
    recentActivities as activities,
    organizationAlerts,
    organizationalHierarchy
} from '@/datasets/organization/organizationOverviewData';

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

const HierarchyItem = ({ label, subLabel, icon: Icon, color, children }) => {
    const { isDarkMode } = useTheme();
    return (
        <div className="flex flex-col">
            <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${color.replace('text-', 'bg-')}/10`}>
                    <Icon size={16} className={color} />
                </div>
                <div>
                    <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                    {subLabel && <p className="text-xs text-gray-500">{subLabel}</p>}
                </div>
            </div>
            {children && (
                <div className={`ml-6 mt-3 pl-6 border-l-2 space-y-3 ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default function OrganizationOverview() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organization Overview</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700 shadow-md'}`}>
                    View Detailed Reports
                    <ArrowRight size={14} />
                </button>
            </div>


            {/* 4. Department Performance Section */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Department Performance</h3>
                    <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>
                        <MoreVertical size={18} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Head</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Employees</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Active Projects</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Attendance %</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Performance</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {departmentPerformance.map((dept, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{dept.department}</td>
                                    <td className="p-4 text-gray-500">{dept.head}</td>
                                    <td className="p-4 font-medium">{dept.employees}</td>
                                    <td className="p-4 text-center">{dept.projects}</td>
                                    <td className="p-4 text-center font-semibold text-primary dark:text-[#3ec3ff]">{dept.attendance}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${dept.score === 'Excellent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                            {dept.score}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20`}>
                                            {dept.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. Workforce Distribution Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                {/* Monthly Employee Growth */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Monthly Employee Growth</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={growthData}>
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
            </div>

            {/* 6. Project Allocation Across Departments Section */}
            <div className={`rounded-xl border flex flex-col h-[450px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Project Allocation Across Departments</h3>
                    <BarChart3 size={20} className="text-indigo-500" />
                </div>
                <div className="flex-1 p-8">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectAllocation} layout="vertical" margin={{ left: 40, right: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B' }} />
                            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontWeight: 600 }} />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="projects" fill={isDarkMode ? "#3ec3ff" : "#2563EB"} radius={[0, 4, 4, 0]} barSize={25} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 7. Hierarchy & Activity Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Organizational Hierarchy */}
                <div className={`lg:col-span-1 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organizational Hierarchy</h3>
                        <Network size={20} className="text-secondary" />
                    </div>
                    <div className="space-y-4">
                        <HierarchyItem 
                            label={organizationalHierarchy.label} 
                            subLabel={organizationalHierarchy.subLabel} 
                            icon={organizationalHierarchy.icon} 
                            color={organizationalHierarchy.color}
                        >
                            {organizationalHierarchy.children.map((child, i) => (
                                <HierarchyItem key={i} label={child.label} subLabel={child.subLabel} icon={child.icon} color={child.color}>
                                    {child.children?.map((subChild, j) => (
                                        <HierarchyItem key={j} label={subChild.label} subLabel={subChild.subLabel} icon={subChild.icon} color={subChild.color} />
                                    ))}
                                </HierarchyItem>
                            ))}
                        </HierarchyItem>
                    </div>
                </div>

                {/* Recent Organizational Activities */}
                <div className={`lg:col-span-1 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Activity</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {activities.map((act, i) => (
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

                {/* Organization Alerts */}
                <div className={`lg:col-span-1 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organization Alerts</h3>
                        <Bell size={20} className="text-pink-500" />
                    </div>
                    <div className="space-y-4">
                        {organizationAlerts.map((alert, i) => (
                            <div key={i} className={`p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer ${alert.color}`}>
                                <h4 className="text-[14px] font-bold">{alert.title}</h4>
                                <p className="text-xs opacity-70 mt-1">{alert.details}</p>
                            </div>
                        ))}
                        <button className={`w-full py-3 rounded-xl border text-sm font-bold mt-2 transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-[#3ec3ff]' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-primary'}`}>
                            View All Notifications
                        </button>
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
