import { useState } from 'react';
import {
    Briefcase, Users, CheckCircle2, Clock,
    ChevronRight, Settings, Activity, UserPlus,
    FileText, BarChart3, Eye, Filter, Download,
    CalendarDays, UserCheck, TrendingUp,
    PieChart as PieIcon, XCircle
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, PieChart, Pie, Cell,
    LineChart, Line
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    recruitPipelineData as pipelineData, deptApplications, hiringTrend,
    recruiterData, recruitmentActivities as recentActivities,
    recruitmentDepartments as departments, recruitmentRoles as roles,
    recruitmentRecruiters as recruiters, recruitmentStages as stages
} from '@/datasets/hrhead/recruitmentManagementData';

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RecruitmentManagement() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({
        department: 'All Departments',
        role: 'All Roles',
        recruiter: 'All Recruiters',
        stage: 'All Stages',
        dateRange: '30',
    });

    const handleFilter = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const selectClass = `text-sm px-3 py-2 rounded-lg border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 focus:border-[#3ec3ff]' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-primary'}`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Section Title */}
            <div className="flex items-center justify-between mt-2">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                    Recruitment Management
                </h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={15} />
                    Export Recruitment Report
                </button>
            </div>

            {/* 2. Recruitment Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-5">
                    <Filter size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Recruitment</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {/* Department */}
                    <select className={selectClass} value={filters.department} onChange={e => handleFilter('department', e.target.value)}>
                        {departments.map(d => <option key={d}>{d}</option>)}
                    </select>
                    {/* Job Role */}
                    <select className={selectClass} value={filters.role} onChange={e => handleFilter('role', e.target.value)}>
                        {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                    {/* Recruiter */}
                    <select className={selectClass} value={filters.recruiter} onChange={e => handleFilter('recruiter', e.target.value)}>
                        {recruiters.map(r => <option key={r}>{r}</option>)}
                    </select>
                    {/* Hiring Stage */}
                    <select className={selectClass} value={filters.stage} onChange={e => handleFilter('stage', e.target.value)}>
                        {stages.map(s => <option key={s}>{s}</option>)}
                    </select>
                    {/* Date Range */}
                    <select className={selectClass} value={filters.dateRange} onChange={e => handleFilter('dateRange', e.target.value)}>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                        <option value="90">Last 90 Days</option>
                        <option value="365">This Year</option>
                    </select>
                </div>
            </div>

            {/* 3. Hiring Pipeline — Horizontal Bar Chart */}
            <div className={`${cardClass} flex flex-col h-[380px]`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Hiring Pipeline</h3>
                    <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pipelineData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="stage"
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }}
                                width={100}
                            />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="count" name="Candidates" radius={[0, 6, 6, 0]} barSize={28} isAnimationActive animationDuration={900}>
                                {pipelineData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Recruitment Analytics — two charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Applications by Department — Donut */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Applications by Department</h3>
                        <PieIcon size={20} className="text-[#3ec3ff]" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptApplications}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={900}
                                >
                                    {deptApplications.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Hiring Trend — Line Chart */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Monthly Hiring Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={hiringTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={36} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Line
                                    type="monotone"
                                    dataKey="hires"
                                    name="Hires"
                                    stroke={isDarkMode ? '#3ec3ff' : '#2563EB'}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: isDarkMode ? '#3ec3ff' : '#2563EB' }}
                                    activeDot={{ r: 6 }}
                                    isAnimationActive
                                    animationDuration={900}
                                />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5. Recruiter Performance Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Recruiter Performance</h3>
                    <UserCheck size={20} className="text-violet-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Recruiter</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Open Positions</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Candidates Screened</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Interviews Scheduled</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Hires Completed</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recruiterData.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                                <Users size={14} className="text-blue-500" />
                                            </div>
                                            <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center font-semibold text-amber-500">{row.openPositions}</td>
                                    <td className="p-4 text-center font-medium text-gray-500">{row.screened}</td>
                                    <td className={`p-4 text-center font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.interviews}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                            {row.hires} Hires
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        <button className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="View Details">
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Recruitment Activity Timeline (2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Recruitment Activity</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-5 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentActivities.map((act, i) => (
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

                {/* Quick Actions */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Quick Actions</h3>
                        <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: 'Approve Job Requests', icon: CheckCircle2, color: 'text-emerald-500' },
                            { label: 'View Candidate Reports', icon: FileText, color: 'text-blue-500' },
                            { label: 'Assign Recruiter', icon: UserPlus, color: 'text-violet-500' },
                            { label: 'Generate Hiring Report', icon: BarChart3, color: 'text-amber-500' },
                        ].map((btn, i) => (
                            <button
                                key={i}
                                className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 hover:-translate-y-0.5 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}
                            >
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
