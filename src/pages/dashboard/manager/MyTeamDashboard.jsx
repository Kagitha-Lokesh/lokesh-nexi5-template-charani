import { useState } from 'react';
import {
    Users, UserPlus, ClipboardList, Calendar, MessageSquare,
    Eye, Search, Filter, MoreVertical, CheckCircle2, Clock,
    Activity, Zap, FileText, Send, Megaphone, GitBranch,
    ChevronDown, ChevronRight, Circle, Wifi, WifiOff,
    BarChart3, PieChart as PieIcon, Download,
} from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    teamMembers,
    hierarchyTree,
    teamPerformanceData as performanceData,
    taskDonut,
    availabilityRows,
    teamActivities as activities,
    teamQuickActions as quickActions,
    teamDepts as depts,
    teamRoles as roles,
    teamAvails as avails,
    availRowFilter,
} from '@/datasets/manager/myTeamData';

// ─── Status helpers ──────────────────────────────────────────────────────────

const onlineStyle = {
    Online:  'bg-emerald-500',
    Busy:    'bg-blue-500',
    Away:    'bg-amber-500',
    Offline: 'bg-gray-400',
};

const availStyle = {
    Available:     { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20' },
    Busy:          { bg: 'bg-blue-500/10',    text: 'text-blue-500',    border: 'border-blue-500/20' },
    'Not Available': { bg: 'bg-amber-500/10', text: 'text-amber-500',   border: 'border-amber-500/20' },
    Offline:       { bg: 'bg-gray-500/10',    text: 'text-gray-500',    border: 'border-gray-500/20' },
};

// ─── Framer Motion variants ───────────────────────────────────────────────────

const fadeUp = {
    hidden:  { opacity: 0, y: 22 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.07, duration: 0.45, ease: 'easeOut' },
    }),
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg text-sm ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-gray-200'}`}>
                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{label}</p>
                {payload.map((e, i) => (
                    <p key={i} className="font-bold" style={{ color: e.color || e.fill }}>
                        {e.name}: {e.value}{e.unit || ''}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ─── Hierarchy Node ───────────────────────────────────────────────────────────

function HierarchyNode({ node, isDarkMode, depth = 0 }) {
    const [expanded, setExpanded] = useState(true);
    const hasChildren = node.children && node.children.length > 0;
    return (
        <div className={depth > 0 ? 'pl-6 border-l border-dashed border-gray-200 dark:border-white/10 mt-3' : ''}>
            <div className="flex items-center gap-3 group">
                {hasChildren && (
                    <button
                        onClick={() => setExpanded(e => !e)}
                        className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    >
                        {expanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
                    </button>
                )}
                {!hasChildren && <div className="w-5 h-5 shrink-0" />}
                <div
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border flex-1 transition-all cursor-default group-hover:shadow-sm ${isDarkMode ? 'bg-white/[0.04] border-white/10 hover:bg-white/[0.07]' : 'bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200'}`}
                    style={{ borderLeft: `3px solid ${node.color}` }}
                >
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                        style={{ backgroundColor: node.color }}
                    >
                        {node.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                        <p className={`text-sm font-semibold leading-tight truncate ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{node.name}</p>
                        <p className="text-[11px] text-gray-500 truncate">{node.role}</p>
                    </div>
                    <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${isDarkMode ? 'bg-white/10 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                        {node.dept}
                    </span>
                </div>
            </div>
            {expanded && hasChildren && (
                <div className="mt-1">
                    {node.children.map((child, i) => (
                        <HierarchyNode key={i} node={child} isDarkMode={isDarkMode} depth={depth + 1} />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyTeamDashboard() {
    const { isDarkMode } = useTheme();

    // Directory filters
    const [search, setSearch]       = useState('');
    const [deptF,  setDeptF]        = useState('All');
    const [roleF,  setRoleF]        = useState('All');
    const [availF, setAvailF]       = useState('All');

    // Availability table filters
    const [availSearch, setAvailSearch] = useState('');
    const [availRowF,   setAvailRowF]   = useState('All');
    const [availPage,   setAvailPage]   = useState(1);
    const rowsPerPage = 5;

    const cardClass       = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`;
    const headingClass    = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`;

    // Filtered team members
    const filteredMembers = teamMembers.filter(m => {
        const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
        const matchDept   = deptF  === 'All' || m.dept        === deptF;
        const matchRole   = roleF  === 'All' || m.designation === roleF;
        const matchAvail  = availF === 'All' || m.status      === availF;
        return matchSearch && matchDept && matchRole && matchAvail;
    });

    // Filtered availability rows
    const filteredAvail = availabilityRows.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(availSearch.toLowerCase());
        const matchAvail  = availRowF === 'All' || r.avail === availRowF;
        return matchSearch && matchAvail;
    });
    const totalPages     = Math.ceil(filteredAvail.length / rowsPerPage);
    const paginatedAvail = filteredAvail.slice((availPage - 1) * rowsPerPage, availPage * rowsPerPage);

    const selectClass = `px-3 py-1.5 rounded-lg border text-sm font-medium appearance-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-700'}`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ─────────────── 1. Module Title ──────────────────────────────── */}
            <motion.div
                variants={fadeUp} initial="hidden" animate="visible"
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
                <div>
                    <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        My Team
                    </h1>
                    <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Manage your team members, track performance and availability.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-blue-50 text-primary hover:bg-blue-100'}`}>
                        <UserPlus size={15} /> Add Team Member
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <ClipboardList size={15} /> Assign Task
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                        <Calendar size={15} /> Schedule Meeting
                    </button>
                </div>
            </motion.div>

            {/* ─────────────── 2. Team Directory Grid ───────────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1}>
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Team Directory</h3>
                        {/* Filters */}
                        <div className="flex flex-wrap items-center gap-2">
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                <Search size={13} className="text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search member..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="bg-transparent outline-none w-28 text-sm placeholder:text-gray-400"
                                />
                            </div>
                            <select value={deptF}  onChange={e => setDeptF(e.target.value)}  className={selectClass}>
                                {depts.map(d  => <option key={d}  value={d}>{d  === 'All' ? 'All Depts' : d}</option>)}
                            </select>
                            <select value={roleF}  onChange={e => setRoleF(e.target.value)}  className={selectClass}>
                                {roles.map(r  => <option key={r}  value={r}>{r  === 'All' ? 'All Roles' : r}</option>)}
                            </select>
                            <select value={availF} onChange={e => setAvailF(e.target.value)} className={selectClass}>
                                {avails.map(a => <option key={a} value={a}>{a === 'All' ? 'All Status' : a}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {filteredMembers.length > 0 ? filteredMembers.map((m, i) => (
                            <motion.div
                                key={m.id}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                custom={i * 0.5}
                                whileHover={{ y: -4, boxShadow: '0 12px 28px rgba(0,0,0,0.12)' }}
                                transition={{ duration: 0.2 }}
                                className={`p-5 rounded-xl border cursor-pointer transition-all ${isDarkMode ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]' : 'bg-white border-gray-100 hover:border-gray-200'}`}
                            >
                                {/* Avatar + Status */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="relative">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md"
                                            style={{ backgroundColor: m.color }}
                                        >
                                            {m.initials}
                                        </div>
                                        <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 ${isDarkMode ? 'border-[#0c162d]' : 'border-white'} ${onlineStyle[m.status]}`} />
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                        m.status === 'Online'  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        m.status === 'Busy'    ? 'bg-blue-500/10    text-blue-500    border-blue-500/20'    :
                                        m.status === 'Away'    ? 'bg-amber-500/10   text-amber-500   border-amber-500/20'   :
                                                                  'bg-gray-500/10    text-gray-500    border-gray-500/20'
                                    }`}>{m.status}</span>
                                </div>

                                {/* Info */}
                                <p className={`font-semibold text-sm leading-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{m.name}</p>
                                <p className="text-[11px] text-gray-500 mt-0.5">{m.designation}</p>
                                <p className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.dept}</p>

                                {/* Score bar */}
                                <div className="mt-3">
                                    <div className="flex justify-between text-[10px] mb-1">
                                        <span className="text-gray-500">Performance</span>
                                        <span className="font-bold" style={{ color: m.color }}>{m.score}%</span>
                                    </div>
                                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${m.score}%` }}
                                            transition={{ duration: 0.8, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: m.color }}
                                        />
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className={`flex gap-1.5 mt-4 pt-3 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                    <button className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        <Eye size={10} /> Profile
                                    </button>
                                    <button className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        <ClipboardList size={10} /> Task
                                    </button>
                                    <button className={`flex-1 flex items-center justify-center gap-1 text-[10px] font-bold py-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                        <MessageSquare size={10} /> Msg
                                    </button>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-4 py-10 text-center text-gray-400 text-sm">No team members match your filters.</div>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* ─────────────── 3 & 4. Hierarchy + Activity ──────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Team Hierarchy */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2} className={`lg:col-span-2 ${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Team Structure</h3>
                        <GitBranch size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    </div>
                    <div className="p-6 overflow-auto">
                        <HierarchyNode node={hierarchyTree} isDarkMode={isDarkMode} depth={0} />
                    </div>
                </motion.div>

                {/* Recent Activity */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className={`${cardClass} p-6 flex flex-col`}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className={headingClass}>Recent Team Activity</h3>
                        <Activity size={18} className="text-blue-500" />
                    </div>
                    <div className="space-y-4 flex-1 relative before:absolute before:left-5 before:top-1 before:bottom-1 before:w-[2px] before:rounded-full before:bg-gray-100 dark:before:bg-white/5">
                        {activities.map((act, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
                                className="flex gap-3 relative z-10"
                            >
                                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={15} style={{ color: act.color }} />
                                </div>
                                <div className="pt-1 min-w-0">
                                    <p className={`text-[12px] font-semibold leading-snug ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        <span className="font-bold">{act.person}</span> {act.action} {act.task}
                                    </p>
                                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                                        <Clock size={10} /> {act.time}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* ─────────────── 5. Performance Panel ─────────────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bar Chart — Performance Scores */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Team Performance Score</h3>
                        <BarChart3 size={18} className="text-blue-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={performanceData} barSize={24}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} />
                                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} unit="%" width={38} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="score" name="Score" unit="%" radius={[4, 4, 0, 0]} isAnimationActive animationDuration={900}>
                                    {performanceData.map((_, i) => (
                                        <Cell key={i} fill={isDarkMode ? '#3ec3ff' : '#2563EB'} fillOpacity={0.7 + (i % 3) * 0.1} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart — Task Completion */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Task Completion Rate</h3>
                        <PieIcon size={18} className="text-violet-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taskDonut}
                                    cx="50%" cy="47%"
                                    innerRadius={70} outerRadius={108}
                                    paddingAngle={4} dataKey="value"
                                    isAnimationActive animationDuration={900}
                                >
                                    {taskDonut.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>

            {/* ─────────────── 6. Team Availability Board ───────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className={`${cardClass} flex flex-col`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Team Availability Board</h3>
                    <div className="flex items-center gap-2">
                        <Wifi size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-500">{availabilityRows.filter(r => r.avail === 'Available').length} Available</span>
                    </div>
                </div>

                {/* Filters */}
                <div className={`px-5 py-3 border-b flex flex-wrap gap-3 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={13} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={availSearch}
                            onChange={e => { setAvailSearch(e.target.value); setAvailPage(1); }}
                            className="bg-transparent outline-none w-32 text-sm placeholder:text-gray-400"
                        />
                    </div>
                    <select value={availRowF} onChange={e => { setAvailRowF(e.target.value); setAvailPage(1); }} className={selectClass}>
                        {availRowFilter.map(a => <option key={a} value={a}>{a === 'All' ? 'All Availability' : a}</option>)}
                    </select>
                    <button className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff] hover:bg-[#3ec3ff]/20' : 'bg-blue-50 text-primary hover:bg-blue-100'}`}>
                        <Download size={13} /> Export
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                                {['Employee', 'Role', 'Today Status', 'Working Hours', 'Availability', 'Actions'].map(h => (
                                    <th key={h} className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedAvail.length > 0 ? paginatedAvail.map((row, i) => {
                                const av = availStyle[row.avail] || availStyle.Offline;
                                return (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-100 hover:bg-gray-50'}`}>
                                        <td className={`p-4 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{row.name}</td>
                                        <td className="p-4 text-gray-500 text-xs">{row.role}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                                                row.status === 'Present' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                row.status === 'Leave'   ? 'bg-amber-500/10   text-amber-500   border-amber-500/20'   :
                                                                           'bg-gray-500/10    text-gray-500    border-gray-500/20'
                                            }`}>{row.status}</span>
                                        </td>
                                        <td className={`p-4 font-mono text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.hours}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${av.bg} ${av.text} ${av.border}`}>
                                                {row.avail}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1.5">
                                                <button className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                    <Eye size={10} /> Profile
                                                </button>
                                                <button className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                    <MessageSquare size={10} /> Msg
                                                </button>
                                                <button className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                                    <ClipboardList size={10} /> Task
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }) : (
                                <tr><td colSpan={6} className="p-6 text-center text-gray-400 text-sm">No records match your filters.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`px-5 py-3 border-t flex items-center justify-between text-xs ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                        <span className="text-gray-500">
                            Showing {Math.min((availPage - 1) * rowsPerPage + 1, filteredAvail.length)}–{Math.min(availPage * rowsPerPage, filteredAvail.length)} of {filteredAvail.length}
                        </span>
                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setAvailPage(page)}
                                    className={`w-7 h-7 rounded-md font-bold transition-all ${page === availPage
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

            {/* ─────────────── 7. Quick Actions ─────────────────────────────── */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className={`${cardClass} p-6 flex flex-col`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Zap size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {quickActions.map((btn, i) => {
                        const Icon = btn.icon;
                        return (
                            <motion.button
                                key={i}
                                whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`flex flex-col items-center gap-3 p-5 rounded-xl border text-center font-bold text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-gray-800'}`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${btn.bg}`}>
                                    <Icon size={22} className={btn.color} />
                                </div>
                                <span className="leading-tight text-sm">{btn.label}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Footer */}
            <div className={`py-5 text-center border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
