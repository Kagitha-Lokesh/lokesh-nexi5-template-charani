import { useState, useEffect, useRef } from 'react';
import {
    Users, FolderKanban, ClipboardList, CalendarOff,
    CheckCircle2, Clock, ChevronRight, Settings,
    Activity, UserPlus, FileText, BarChart3,
    PieChart as PieIcon, TrendingUp, AlertCircle,
    UserCheck, Download, Search, Filter, X,
    Calendar, Target, Zap, Award, XCircle, Eye,
    ArrowRight, Plus, MoreVertical, Bell
} from 'lucide-react';
import {
    LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';

// Datasets
import { teamOverviewCards } from '@/datasets/dashboard/managerStats';
import { productivityData, taskDistributionData } from '@/datasets/charts/managerCharts';
import { kanbanProjects, kanbanColumnColors, pendingApprovals, teamActivities, quickActions } from '@/datasets/management/projectData';
import { attendanceData, attendanceStatusStyle } from '@/datasets/attendance/attendanceLogs';



// ─── Framer Motion Variants ───────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
    }),
};

// ─── Sub-Components ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg text-sm ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} className="font-bold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.value}{entry.unit || ''}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

function TeamOverviewCard({ card, index, isDarkMode, onClick }) {
    return (
        <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ 
                y: -5, 
                shadow: isDarkMode ? '0 0 25px rgba(56,189,248,0.2)' : '0 10px 30px rgba(0,0,0,0.1)'
            }}
            onClick={onClick}
            className={`p-5 rounded-xl border flex items-center gap-4 transition-all duration-300 cursor-pointer relative overflow-hidden group ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}
        >
            <div className={`absolute top-0 right-0 w-20 h-20 -mr-6 -mt-6 rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-500`} style={{ backgroundColor: card.color }} />
            
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${card.bgColor} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <card.icon size={24} style={{ color: card.color }} />
            </div>
            <div>
                <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                    <CountUp end={card.value} duration={2} />
                </h3>
                <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{card.title}</p>
            </div>
        </motion.div>
    );
}

function MemberAvatar({ initials, color }) {
    return (
        <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white dark:ring-[#0c162d] -ml-2 first:ml-0"
            style={{ backgroundColor: color }}
        >
            {initials}
        </div>
    );
}

const avatarColors = ['#38BDF8', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ManagerDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [statusFilter, setStatusFilter] = useState('All');
    const [approvalFilter, setApprovalFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;

    // Attendance filters
    const departments = ['All', ...new Set(attendanceData.map(r => r.dept))];
    const filteredAttendance = attendanceData.filter(r => {
        const matchDept = deptFilter === 'All' || r.dept === deptFilter;
        const matchStatus = statusFilter === 'All' || r.status === statusFilter;
        const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchDept && matchStatus && matchSearch;
    });
    const totalPages = Math.ceil(filteredAttendance.length / rowsPerPage);
    const paginatedAttendance = filteredAttendance.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Approval filters
    const approvalCategories = ['All', 'Leave Requests', 'Task Approvals', 'Project Updates'];
    const filteredApprovals = pendingApprovals.filter(a =>
        approvalFilter === 'All' || a.type === approvalFilter
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ─────────────── 1. Module Title ─────────────────────────────── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                        Team Leadership Dashboard
                    </h1>
                    <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                        Monitor your team, track projects, and manage approvals.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => navigate('/dashboard/project')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}
                    >
                        <FolderKanban size={15} /> Assign Project
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/project')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <Plus size={15} /> Create Task
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}
                    >
                        <FileText size={15} /> Generate Team Report
                    </button>
                </div>
            </motion.div>

            {/* ─────────────── 2. Team Overview Cards ──────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {teamOverviewCards.map((card, i) => (
                    <TeamOverviewCard key={card.title} card={card} index={i} isDarkMode={isDarkMode} onClick={() => navigate(card.path)} />
                ))}
            </div>

            {/* ─────────────── 3. Team Performance Charts ───────────────────── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
                {/* Productivity Trend — Line Chart */}
                <div className={`${cardClass} flex flex-col h-[340px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Team Productivity Trend</h3>
                        <TrendingUp size={18} className="text-blue-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={productivityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} domain={[60, 100]} unit="%" width={44} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Line
                                    type="monotone"
                                    dataKey="productivity"
                                    name="Productivity"
                                    unit="%"
                                    stroke={isDarkMode ? '#3ec3ff' : '#2563EB'}
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: isDarkMode ? '#3ec3ff' : '#2563EB' }}
                                    activeDot={{ r: 7 }}
                                    isAnimationActive
                                    animationDuration={900}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Task Completion Distribution — Donut */}
                <div className={`${cardClass} flex flex-col h-[340px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Task Completion Distribution</h3>
                        <PieIcon size={18} className="text-violet-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskDistributionData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={64}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={900}
                                >
                                    {taskDistributionData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            {/* ─────────────── 4. Project Allocation Board (Kanban) ─────────── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={2}
                className={cardClass}
            >
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Project Allocation Board</h3>
                    <FolderKanban size={18} className="text-indigo-500" />
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {Object.entries(kanbanProjects).map(([column, projects]) => {
                        const style = kanbanColumnColors[column];
                        return (
                            <div key={column} className={`rounded-xl border p-4 flex flex-col gap-3 ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                {/* Column Header */}
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
                                    <h4 className={`text-xs font-bold uppercase tracking-wider ${style.text}`}>{column}</h4>
                                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full ${style.bg} ${style.text} border ${style.border}`}>{projects.length}</span>
                                </div>
                                {/* Cards */}
                                {projects.map((proj, pi) => (
                                    <motion.div
                                        key={pi}
                                        whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
                                        transition={{ duration: 0.2 }}
                                        className={`p-3 rounded-lg border cursor-pointer ${isDarkMode ? 'bg-[#0c162d]/70 border-white/10' : 'bg-white border-gray-200 shadow-sm'}`}
                                    >
                                        <p className={`text-sm font-semibold leading-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>{proj.name}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="flex items-center">
                                                {proj.members.map((m, mi) => (
                                                    <MemberAvatar key={mi} initials={m} color={avatarColors[mi % avatarColors.length]} />
                                                ))}
                                            </div>
                                            <span className="text-[10px] text-gray-500 ml-auto flex items-center gap-1">
                                                <Clock size={10} /> {proj.deadline}
                                            </span>
                                        </div>
                                        <span className={`mt-2 inline-block px-2 py-0.5 text-[10px] font-bold rounded-md border ${style.bg} ${style.text} ${style.border}`}>{proj.status}</span>
                                    </motion.div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* ─────────────── 5. Team Attendance Monitor ───────────────────── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={3}
                className={`${cardClass} flex flex-col`}
            >
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Team Attendance Monitor</h3>
                    <div className="flex gap-2">
                        <button onClick={() => {}} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <Download size={13} /> Download Report
                        </button>
                    </div>
                </div>
                {/* Filters */}
                <div className={`px-5 py-3 border-b flex flex-wrap gap-3 ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={14} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={searchTerm}
                            onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                            className="bg-transparent outline-none w-36 text-sm placeholder:text-gray-400"
                        />
                    </div>
                    <select
                        value={deptFilter}
                        onChange={e => { setDeptFilter(e.target.value); setCurrentPage(1); }}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                    >
                        {departments.map(d => <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>)}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={e => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                    >
                        {['All', 'Present', 'Working', 'Absent', 'Leave'].map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
                    </select>
                    <button
                        onClick={() => { /* Export CSV */ }}
                        className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff] hover:bg-[#3ec3ff]/20' : 'bg-blue-50 text-primary hover:bg-blue-100'}`}
                    >
                        <Download size={13} /> Export CSV
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[640px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                {['Employee Name', 'Department', 'Check-in', 'Check-out', 'Status', 'Action'].map(h => (
                                    <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedAttendance.length > 0 ? paginatedAttendance.map((row, i) => {
                                const ss = attendanceStatusStyle[row.status];
                                return (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-borderColor hover:bg-gray-50'}`}>
                                        <td className={`p-4 font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                        <td className="p-4 text-gray-500">{row.dept}</td>
                                        <td className={`p-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.checkin}</td>
                                        <td className={`p-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.checkout}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${ss.bg} ${ss.text} ${ss.border}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <button className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                <Eye size={12} /> View
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan={6} className="p-6 text-center text-gray-400 text-sm">No matching records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`px-5 py-3 border-t flex items-center justify-between text-xs ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                        <span className="text-gray-500">
                            Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredAttendance.length)}–{Math.min(currentPage * rowsPerPage, filteredAttendance.length)} of {filteredAttendance.length}
                        </span>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-7 h-7 rounded-md font-bold transition-all ${page === currentPage
                                        ? (isDarkMode ? 'bg-[#3ec3ff] text-dark' : 'bg-primary text-white')
                                        : (isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')}`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* ─────────────── 6 & 7. Approvals + Activity ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pending Approvals Panel */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={4}
                    className={`lg:col-span-2 ${cardClass} flex flex-col`}
                >
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Pending Approvals</h3>
                        {/* Filter tabs */}
                        <div className="flex gap-1 flex-wrap">
                            {approvalCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setApprovalFilter(cat)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${approvalFilter === cat
                                        ? (isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff]' : 'bg-primary/10 text-primary')
                                        : (isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700')}`}
                                >
                                    {cat === 'All' ? 'All' : cat}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="p-5 flex flex-col gap-3">
                        {filteredApprovals.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.06, duration: 0.35 }}
                                className={`flex items-center gap-3 p-3.5 rounded-xl border ${isDarkMode ? 'bg-white/[0.03] border-white/5' : 'bg-gray-50 border-gray-100'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bgColor}`}>
                                    <item.icon size={18} className={item.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-white' : 'text-dark'}`}>{item.person}</p>
                                    <p className="text-xs text-gray-500 truncate">{item.detail}</p>
                                </div>
                                <span className={`hidden sm:inline shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.bgColor} ${item.color} ${item.borderColor}`}>
                                    {item.type}
                                </span>
                                <div className="flex gap-1.5 shrink-0">
                                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all">
                                        <CheckCircle2 size={11} /> Approve
                                    </button>
                                    <button className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20 transition-all">
                                        <XCircle size={11} /> Reject
                                    </button>
                                    <button className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                                        <Eye size={13} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {filteredApprovals.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-4">No pending approvals in this category.</p>
                        )}
                    </div>
                    {/* Summary */}
                    <div className={`mx-5 mb-5 p-3 rounded-xl border border-dashed text-center text-xs font-semibold ${isDarkMode ? 'bg-[#3ec3ff]/5 border-[#3ec3ff]/20 text-[#3ec3ff]' : 'bg-blue-50 border-primary/20 text-primary'}`}>
                        {pendingApprovals.length} total items require your attention
                    </div>
                </motion.div>

                {/* Recent Team Activity */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={5}
                    className={`${cardClass} p-6 flex flex-col`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Team Activity</h3>
                        <Activity size={18} className="text-blue-500" />
                    </div>
                    <div className="space-y-4 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:rounded-full before:bg-gray-100 dark:before:bg-white/5">
                        {teamActivities.map((act, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.07, duration: 0.35 }}
                                className="flex gap-4 relative z-10"
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={16} className={act.color} />
                                </div>
                                <div className="pt-1.5">
                                    <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={11} /> {act.time}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ─────────────── 8. Quick Actions ─────────────────────────────── */}
            <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={6}
                className={`${cardClass} p-6 flex flex-col`}
            >
                <div className="flex items-center justify-between mb-6">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Zap size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {quickActions.map((btn, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => navigate(btn.path)}
                            className={`flex flex-col items-center gap-3 p-5 rounded-xl border text-center font-bold text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${btn.bg}`}>
                                <btn.icon size={22} className={btn.color} />
                            </div>
                            <span className="leading-tight text-sm">{btn.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div className={`py-5 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>

        </div>
    );
}
