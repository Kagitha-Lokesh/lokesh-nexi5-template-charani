import { useState, useEffect, useRef } from 'react';
import {
    Users, Briefcase, CalendarOff, ClipboardList,
    CheckCircle2, Clock, ChevronRight, Settings,
    Activity, UserPlus, FileText, BarChart3,
    PieChart as PieIcon, TrendingUp, Bell,
    AlertCircle, UserCheck, Award, Eye,
    FolderKanban, Receipt, ShieldCheck
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend, PieChart, Pie, Cell,
    LineChart, Line
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Datasets
import { statsCards } from '@/datasets/dashboard/hrHeadStats';
import { recruitmentBarData, deptDistribution, attendanceTrend } from '@/datasets/charts/hrHeadCharts';
import { recruitmentActivity, pendingApprovals, hrActivities, quickActions } from '@/datasets/recruitment/recruitmentData';

// ─── Animated Counter Hook ────────────────────────────────────────────────────

function useAnimatedCount(target, duration = 1200) {
    const [count, setCount] = useState(0);
    const frameRef = useRef(null);

    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);

        const tick = () => {
            start += step;
            if (start < target) {
                setCount(Math.floor(start));
                frameRef.current = requestAnimationFrame(tick);
            } else {
                setCount(target);
            }
        };

        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, [target, duration]);

    return count;
}

// ─── Sub-Components ───────────────────────────────────────────────────────────

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

function StatCard({ stat, isDarkMode, onClick }) {
    const count = useAnimatedCount(stat.value);
    return (
        <div 
            onClick={onClick}
            className={`p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}
        >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bgColor}`}>
                <stat.icon size={26} style={{ color: stat.color }} />
            </div>
            <div>
                <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{count}</h3>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.label}</p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HRHeadDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Welcome Banner */}
            <div className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-500/10`}>
                        <Users size={28} className="text-blue-500" />
                    </div>
                    <div>
                        <h2 className={`text-2xl md:text-3xl font-headings font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            Welcome back, HR Manager
                        </h2>
                        <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                            Monitor recruitment progress, workforce distribution, and HR approvals across the organization.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0">
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}
                    >
                        View Reports
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/employees')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark font-bold' : 'bg-primary hover:bg-blue-700'}`}
                    >
                        Manage HR
                    </button>
                </div>
            </div>

            {/* 2. HR Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, idx) => (
                    <StatCard key={idx} stat={stat} isDarkMode={isDarkMode} onClick={() => navigate(stat.path)} />
                ))}
            </div>

            {/* 3. Recruitment Overview Bar Chart */}
            <div className={`${cardClass} flex flex-col h-[380px]`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Recruitment Overview</h3>
                    <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={recruitmentBarData} barSize={40}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                            <XAxis dataKey="metric" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 13 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={36} />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="count" name="Count" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={900}>
                                {recruitmentBarData.map((_, index) => {
                                    const colors = ['#38BDF8', '#8B5CF6', '#10B981', '#F59E0B'];
                                    return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Workforce Distribution — two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Department Distribution Donut */}
                <div className={`${cardClass} flex flex-col h-[400px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Department Distribution</h3>
                        <PieIcon size={20} className="text-[#3ec3ff]" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={110}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={900}
                                >
                                    {deptDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Attendance Trend Line Chart */}
                <div className={`${cardClass} flex flex-col h-[400px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Employee Attendance Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={attendanceTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} domain={[60, 100]} unit="%" width={42} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} formatter={(value) => [`${value}%`, 'Attendance']} />
                                <Line
                                    type="monotone"
                                    dataKey="attendance"
                                    name="Attendance %"
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

            {/* 5. Recent Recruitment Activity Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Recent Recruitment Activity</h3>
                    <Activity size={20} className="text-emerald-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Candidate</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Position</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Recruiter</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Interview Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recruitmentActivity.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className={`p-4 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.candidate}</td>
                                    <td className="p-4 text-gray-500">{row.position}</td>
                                    <td className="p-4 text-gray-500 font-medium">{row.recruiter}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${row.statusColor}`}>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-center font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Pending Approvals + HR Activity Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pending Approvals (spans 2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Pending Approvals</h3>
                        <AlertCircle size={20} className="text-amber-500" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {pendingApprovals.map((item, i) => (
                            <div key={i} className={`p-4 rounded-xl border flex items-center gap-4 transition-all hover:scale-[1.02] duration-200 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.bgColor}`}>
                                    <item.icon size={22} className={item.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold leading-tight truncate ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.label}</p>
                                    <p className={`text-xs mt-1 font-bold ${item.color}`}>{item.count} Pending</p>
                                </div>
                                <button className={`shrink-0 p-2 rounded-lg text-xs font-bold transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}>
                                    Review
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* Summary bar */}
                    <div className={`mt-5 p-4 rounded-xl border border-dashed text-center text-xs font-semibold ${isDarkMode ? 'bg-[#3ec3ff]/5 border-[#3ec3ff]/20 text-[#3ec3ff]' : 'bg-lightSky/20 border-primary/20 text-primary'}`}>
                        {pendingApprovals.reduce((a, b) => a + b.count, 0)} total items require your attention
                    </div>
                </div>

                {/* HR Activity Timeline */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent HR Activities</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-5 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {hrActivities.map((act, i) => (
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

            {/* 7. Quick Actions */}
            <div className={`p-6 ${cardClass} flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {quickActions.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(btn.path)}
                            className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all text-sm font-bold active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}
                        >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${btn.bgColor}`}>
                                <btn.icon size={22} className={btn.color} />
                            </div>
                            <span className="leading-tight">{btn.label}</span>
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
