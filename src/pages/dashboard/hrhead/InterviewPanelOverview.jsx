import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, Calendar, MessageSquare,
    ChevronRight, ChevronLeft, ChevronsUpDown, ArrowUp, ArrowDown,
    Clock, FileText, BarChart3, Activity, Building2,
    Settings, Users, CheckCircle2, XCircle, AlertCircle, UserCheck
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
    PieChart, Pie, Legend, ResponsiveContainer
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    interviewPipelineData as pipelineData, interviewerPerformance, outcomesData,
    interviews, interviewActivities as recentActivities,
    interviewRoles as roles, interviewDepts as depts,
    interviewerList as interviewers, interviewStageFilters as stageFilters,
    interviewStatusFilters as statusFilters, interviewDateRanges as dateRanges
} from '@/datasets/hrhead/interviewPanelData';

const ROWS_PER_PAGE = 5;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const statusBadge = (s) => ({
    'Scheduled': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Completed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Pending Feedback': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Cancelled': 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || 'bg-gray-500/10 text-gray-500 border-gray-500/20');

const typeBadge = (t) => ({
    'Technical': 'bg-violet-500/10 text-violet-500',
    'HR Round': 'bg-blue-500/10 text-blue-500',
    'Managerial': 'bg-amber-500/10 text-amber-500',
    'Final Round': 'bg-emerald-500/10 text-emerald-500',
}[t] || 'bg-gray-500/10 text-gray-500');

const CustomBarTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1.5 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            {payload.map((e, i) => <p key={i} style={{ color: e.fill || e.color }} className="font-bold">{e.name}: {e.value}</p>)}
        </div>
    );
    return null;
};

const CustomPieTooltip = ({ active, payload, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{payload[0].name}</p>
            <p style={{ color: payload[0].payload.color }} className="font-bold">{payload[0].value} candidates</p>
        </div>
    );
    return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InterviewPanelOverview() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ role: 'All Roles', dept: 'All Departments', interviewer: 'All Interviewers', stage: 'All Stages', status: 'All Status', dateRange: '30' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={12} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={12} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const filtered = useMemo(() => interviews
        .filter(r => (
            (filters.role === 'All Roles' || r.role === filters.role) &&
            (filters.dept === 'All Departments' || r.dept === filters.dept) &&
            (filters.interviewer === 'All Interviewers' || r.interviewer === filters.interviewer) &&
            (filters.stage === 'All Stages' || r.type.includes(filters.stage.replace(' Interview', '').replace(' Round', ''))) &&
            (filters.status === 'All Status' || r.status === filters.status) &&
            (!search || [r.candidate, r.role, r.dept, r.interviewer, r.type].some(f => f.toLowerCase().includes(search.toLowerCase())))
        ))
        .sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return av < bv ? (sortDir === 'asc' ? -1 : 1) : av > bv ? (sortDir === 'asc' ? 1 : -1) : 0;
        }), [filters, search, sortKey, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const selectClass = `text-sm px-3 py-2 rounded-lg border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 focus:border-[#3ec3ff]' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-primary'}`;
    const thClass = `p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Section Title */}
            <div className="flex items-center justify-between mt-2">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Interview Panel Overview</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={15} />
                    Export Interview Report
                </button>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Interviews</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <select className={selectClass} value={filters.role} onChange={e => handleFilter('role', e.target.value)}>
                        {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass} value={filters.interviewer} onChange={e => handleFilter('interviewer', e.target.value)}>
                        {interviewers.map(i => <option key={i}>{i}</option>)}
                    </select>
                    <select className={selectClass} value={filters.stage} onChange={e => handleFilter('stage', e.target.value)}>
                        {stageFilters.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
                        {statusFilters.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dateRange} onChange={e => handleFilter('dateRange', e.target.value)}>
                        {dateRanges.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                </div>
            </div>

            {/* 3. Interview Pipeline Chart */}
            <div className={`${cardClass} flex flex-col h-[340px]`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Interview Pipeline</h3>
                    <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pipelineData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={160} />
                            <Tooltip content={<CustomBarTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="count" name="Interviews" radius={[0, 6, 6, 0]} barSize={24} isAnimationActive animationDuration={900}>
                                {pipelineData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Interview Schedule Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Upcoming Interview Schedule</h3>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={15} className="text-gray-400 shrink-0" />
                        <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search interviews..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                {[['candidate', 'Candidate'], ['role', 'Job Role'], ['dept', 'Department'], ['interviewer', 'Interviewer'], ['type', 'Type'], ['date', 'Date'], ['status', 'Status']].map(([key, label]) => (
                                    <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                        <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                    </th>
                                ))}
                                <th className={`${thClass} text-center`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginated.length === 0 && (
                                <tr><td colSpan={8} className="p-8 text-center text-gray-400">No interviews match your filters.</td></tr>
                            )}
                            {paginated.map((row) => (
                                <tr key={row.id} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs shrink-0">{row.candidate.charAt(0)}</div>
                                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.candidate}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-500 text-xs">{row.role}</td>
                                    <td className="p-4 text-gray-500 text-xs">{row.dept}</td>
                                    <td className="p-4 text-gray-500 text-xs font-medium">{row.interviewer}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${typeBadge(row.type)}`}>{row.type}</span>
                                    </td>
                                    <td className={`p-4 text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${statusBadge(row.status)}`}>{row.status}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button title="View Candidate" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={14} /></button>
                                            <button title="Reschedule" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-amber-400' : 'hover:bg-gray-100 text-gray-500 hover:text-amber-500'}`}><Calendar size={14} /></button>
                                            <button title="View Feedback" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-emerald-400' : 'hover:bg-gray-100 text-gray-500 hover:text-emerald-500'}`}><MessageSquare size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                    <span>{filtered.length} interview{filtered.length !== 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                        <span className="font-semibold text-xs">{page}/{totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* 5. Interviewer Performance + Outcomes Donut */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Interviewer Performance Grouped Bar Chart */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Interviewer Performance</h3>
                        <Users size={20} className="text-violet-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={interviewerPerformance} barGap={2} barCategoryGap="25%">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} width={28} />
                                <Tooltip content={<CustomBarTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                                <Bar dataKey="conducted" name="Conducted" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive animationDuration={900} />
                                <Bar dataKey="passed" name="Passed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive animationDuration={900} />
                                <Bar dataKey="rejected" name="Rejected" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive animationDuration={900} />
                                <Bar dataKey="pending" name="Pending" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={14} isAnimationActive animationDuration={900} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Interview Outcomes Donut Chart */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Interview Outcomes</h3>
                        <AlertCircle size={20} className="text-amber-500" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie data={outcomesData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {outcomesData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 mt-2 px-2">
                            {outcomesData.map(d => (
                                <div key={d.name} className="flex items-center justify-between text-xs font-semibold">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{d.name}</span>
                                    </div>
                                    <span style={{ color: d.color }}>{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Interview Activity (2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Interview Activity</h3>
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
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={12} /> {act.time}</p>
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
                            { label: 'View All Interviews', icon: BarChart3, color: 'text-blue-500' },
                            { label: 'Review Interview Feedback', icon: MessageSquare, color: 'text-amber-500' },
                            { label: 'Assign Interview Panel', icon: Users, color: 'text-violet-500' },
                            { label: 'Generate Interview Report', icon: Download, color: 'text-emerald-500' },
                        ].map((btn, i) => (
                            <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 hover:-translate-y-0.5 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                <btn.icon size={18} className={btn.color} />
                                {btn.label}
                                <ChevronRight size={14} className="ml-auto text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
