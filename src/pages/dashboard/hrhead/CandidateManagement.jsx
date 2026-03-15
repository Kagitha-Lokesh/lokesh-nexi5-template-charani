import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, CheckCircle2, XCircle,
    ChevronRight, ChevronLeft, ChevronsUpDown, ArrowUp, ArrowDown,
    Clock, FileText, BarChart3, Activity, Building2,
    Settings, Users, CalendarDays, UserCheck, ArrowRightCircle, Star
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
    PieChart, Pie, Legend, ResponsiveContainer
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    pipelineData, recruitmentStatusData, candidates, recentActivities,
    jobRoles, candidateDepts as depts, candidateRecruiters as recruiters,
    candidateStages as stages, candidateStatuses as appStatuses,
    candidateDateRanges as dateRanges
} from '@/datasets/hrhead/candidateManagementData';

const ROWS_PER_PAGE = 5;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const stageBadge = (s) => ({
    'Application Review': 'bg-gray-500/10 text-gray-500 border-gray-500/20',
    'Technical Interview': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'HR Interview': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'Offer Stage': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'Hired': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Rejected': 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || 'bg-gray-500/10 text-gray-500 border-gray-500/20');

const statusBadge = (s) => ({
    Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    Shortlisted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || '');

const stageOrder = ['Application Review', 'Technical Interview', 'HR Interview', 'Offer Stage', 'Hired'];
const nextStage = (current) => stageOrder[Math.min(stageOrder.indexOf(current) + 1, stageOrder.length - 1)];

const CustomBarTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            <p style={{ color: payload[0].payload.fill }} className="font-bold">{payload[0].value} candidates</p>
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

export default function CandidateManagement() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ role: 'All Roles', dept: 'All Departments', recruiter: 'All Recruiters', stage: 'All Stages', status: 'All Status', dateRange: '30' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [stageOverrides, setStageOverrides] = useState({});
    const [statusOverrides, setStatusOverrides] = useState({});

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={12} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={12} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const filtered = useMemo(() => candidates
        .filter(c => {
            const st = statusOverrides[c.id] || c.status;
            const sg = stageOverrides[c.id] || c.stage;
            return (
                (filters.role === 'All Roles' || c.role === filters.role) &&
                (filters.dept === 'All Departments' || c.dept === filters.dept) &&
                (filters.recruiter === 'All Recruiters' || c.recruiter === filters.recruiter) &&
                (filters.stage === 'All Stages' || sg === filters.stage) &&
                (filters.status === 'All Status' || st === filters.status) &&
                (!search || [c.name, c.role, c.dept, c.recruiter].some(f => f.toLowerCase().includes(search.toLowerCase())))
            );
        })
        .sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return av < bv ? (sortDir === 'asc' ? -1 : 1) : av > bv ? (sortDir === 'asc' ? 1 : -1) : 0;
        }), [filters, search, sortKey, sortDir, statusOverrides, stageOverrides]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    const handleStatus = (id, action) => {
        setStatusOverrides(p => ({ ...p, [id]: action }));
        if (selected?.id === id) setSelected(prev => ({ ...prev, _status: action }));
    };

    const handleNextStage = (id, current) => {
        const ns = nextStage(stageOverrides[id] || current);
        setStageOverrides(p => ({ ...p, [id]: ns }));
        if (selected?.id === id) setSelected(prev => ({ ...prev, _stage: ns }));
    };

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const selectClass = `text-sm px-3 py-2 rounded-lg border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 focus:border-[#3ec3ff]' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-primary'}`;
    const thClass = `p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Section Title */}
            <div className="flex items-center justify-between mt-2">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Candidate Management</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={15} />
                    Export Candidate Report
                </button>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Candidates</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <select className={selectClass} value={filters.role} onChange={e => handleFilter('role', e.target.value)}>
                        {jobRoles.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass} value={filters.recruiter} onChange={e => handleFilter('recruiter', e.target.value)}>
                        {recruiters.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.stage} onChange={e => handleFilter('stage', e.target.value)}>
                        {stages.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
                        {appStatuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dateRange} onChange={e => handleFilter('dateRange', e.target.value)}>
                        {dateRanges.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                </div>
            </div>

            {/* 3. Pipeline Chart */}
            <div className={`${cardClass} flex flex-col h-[360px]`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Candidate Pipeline Overview</h3>
                    <BarChart3 size={20} className="text-blue-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pipelineData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={110} />
                            <Tooltip content={<CustomBarTooltip isDarkMode={isDarkMode} />} />
                            <Bar dataKey="count" name="Candidates" radius={[0, 6, 6, 0]} barSize={26} isAnimationActive animationDuration={900}>
                                {pipelineData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 4. Table + Profile Panel */}
            <div className={`grid gap-6 ${selected ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>

                {/* Candidates Table */}
                <div className={`${selected ? 'xl:col-span-2' : ''} ${cardClass} flex flex-col pb-4`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>All Candidates</h3>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                            <Search size={15} className="text-gray-400 shrink-0" />
                            <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search candidates..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    {[['name', 'Candidate'], ['role', 'Job Role'], ['dept', 'Department'], ['recruiter', 'Recruiter'], ['stage', 'Interview Stage'], ['status', 'Status'], ['date', 'Applied']].map(([key, label]) => (
                                        <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                            <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                        </th>
                                    ))}
                                    <th className={`${thClass} text-center`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.length === 0 && (
                                    <tr><td colSpan={8} className="p-8 text-center text-gray-400">No candidates match your filters.</td></tr>
                                )}
                                {paginated.map((c) => {
                                    const st = statusOverrides[c.id] || c.status;
                                    const sg = stageOverrides[c.id] || c.stage;
                                    const isSelected = selected?.id === c.id;
                                    return (
                                        <tr key={c.id} onClick={() => setSelected({ ...c, _status: st, _stage: sg })}
                                            className={`border-b last:border-0 cursor-pointer transition-colors ${isSelected ? (isDarkMode ? 'bg-[#3ec3ff]/5' : 'bg-blue-50') : (isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor')}`}>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0 text-violet-500 font-bold text-xs">{c.name.charAt(0)}</div>
                                                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{c.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-500 text-xs">{c.role}</td>
                                            <td className="p-4 text-gray-500 text-xs">{c.dept}</td>
                                            <td className="p-4 text-gray-500 text-xs">{c.recruiter}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${stageBadge(sg)}`}>{sg}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${statusBadge(st)}`}>{st}</span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-xs">{c.date}</td>
                                            <td className="p-4" onClick={e => e.stopPropagation()}>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => setSelected({ ...c, _status: st, _stage: sg })} title="View Profile" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={14} /></button>
                                                    <button onClick={() => handleStatus(c.id, 'Approved')} disabled={st === 'Approved' || st === 'Rejected'} title="Approve" className="px-1.5 py-1 text-[10px] font-bold rounded bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed">✓</button>
                                                    <button onClick={() => handleStatus(c.id, 'Rejected')} disabled={st === 'Approved' || st === 'Rejected'} title="Reject" className="px-1.5 py-1 text-[10px] font-bold rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed">✗</button>
                                                    <button onClick={() => handleNextStage(c.id, c.stage)} title="Next Stage" className="px-1.5 py-1 text-[10px] font-bold rounded bg-violet-500 text-white hover:bg-violet-600">→</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                        <span>{filtered.length} candidate{filtered.length !== 1 ? 's' : ''}</span>
                        <div className="flex items-center gap-2">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                            <span className="font-semibold text-xs">{page}/{totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Candidate Profile Panel */}
                {selected && (
                    <div className={`p-6 ${cardClass} flex flex-col gap-4 self-start`}>
                        <div className="flex items-center justify-between">
                            <h3 className={headingClass}>Candidate Profile</h3>
                            <button onClick={() => setSelected(null)} className={`text-xs font-semibold px-2 py-1 rounded-md ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>✕</button>
                        </div>
                        {/* Avatar + name */}
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold text-lg font-headings">{selected.name.charAt(0)}</div>
                            <div>
                                <p className={`font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{selected.name}</p>
                                <p className="text-xs text-gray-500">{selected.role}</p>
                            </div>
                        </div>
                        <div className="space-y-2.5 text-sm">
                            {[
                                ['Department', selected.dept],
                                ['Recruiter', selected.recruiter],
                                ['Experience', selected.experience],
                                ['Current Company', selected.company],
                                ['Applied Date', selected.date],
                                ['Interview Stage', selected._stage || selected.stage],
                                ['Status', selected._status || selected.status],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between gap-2">
                                    <span className="text-gray-500 shrink-0">{label}</span>
                                    <span className={`font-semibold text-right ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{val}</span>
                                </div>
                            ))}
                        </div>
                        {/* Skills */}
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Skills</p>
                            <div className="flex flex-wrap gap-2">
                                {selected.skills.map(skill => (
                                    <span key={skill} className={`px-2 py-1 rounded-md text-xs font-semibold ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 pt-1">
                            <button disabled={['Approved', 'Rejected'].includes(selected._status || selected.status)} onClick={() => handleStatus(selected.id, 'Approved')} className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Approve Candidate</button>
                            <button disabled={['Approved', 'Rejected'].includes(selected._status || selected.status)} onClick={() => handleStatus(selected.id, 'Rejected')} className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Reject Candidate</button>
                            <button onClick={() => handleNextStage(selected.id, selected.stage)} className="w-full py-2 rounded-lg bg-violet-500 hover:bg-violet-600 text-white text-sm font-bold transition-all active:scale-95">Move to Next Stage</button>
                        </div>
                    </div>
                )}
            </div>

            {/* 5. Recruitment Status Donut + Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recruitment Status Donut */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={headingClass}>Recruitment Status</h3>
                    </div>
                    <div style={{ height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={recruitmentStatusData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {recruitmentStatusData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {recruitmentStatusData.map(d => (
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

                {/* Recent Candidate Activity - 2 cols */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Candidate Activity</h3>
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
            </div>

            {/* 6. Quick Actions */}
            <div className={`p-6 ${cardClass} flex flex-col`}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'View Recruitment Pipeline', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { label: 'Review Interview Feedback', icon: Star, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { label: 'Approve Candidate Offers', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { label: 'Generate Recruitment Report', icon: Download, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                    ].map((btn, i) => (
                        <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-sm font-bold active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${btn.bg}`}>
                                <btn.icon size={20} className={btn.color} />
                            </div>
                            <span className="leading-tight text-left">{btn.label}</span>
                            <ChevronRight size={14} className="ml-auto text-gray-400 shrink-0" />
                        </button>
                    ))}
                </div>
            </div>

            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
