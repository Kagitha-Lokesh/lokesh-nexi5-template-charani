import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, CheckCircle2, XCircle,
    ChevronRight, ChevronLeft, ChevronsUpDown, ArrowUp, ArrowDown,
    Clock, FileText, BarChart3, Activity, Building2,
    Settings, AlertTriangle, Users, CalendarDays, UserPlus, Zap
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    hiringRequests, priorityChartData, recentActivities,
    hiringDepts as depts, hiringStatuses as statuses,
    hiringPriorities as priorities, hiringDateRanges as dateRanges
} from '@/datasets/hrhead/hiringRequestsData';

const ROWS_PER_PAGE = 4;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const priorityBadge = (p) => ({ High: 'bg-red-500/10 text-red-500 border-red-500/20', Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20', Low: 'bg-blue-500/10 text-blue-500 border-blue-500/20' }[p] || '');

const statusBadge = (s) => ({ Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20', Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', Rejected: 'bg-red-500/10 text-red-500 border-red-500/20', 'In Progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20' }[s] || '');

const CustomTooltip = ({ active, payload, isDarkMode }) => {
    if (active && payload?.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{payload[0].name}</p>
                <p style={{ color: payload[0].payload.color }} className="font-bold">{payload[0].value} requests</p>
            </div>
        );
    }
    return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HiringRequests() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ dept: 'All Departments', status: 'All Status', priority: 'All Priority', dateRange: '30' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('date');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [rowOverrides, setRowOverrides] = useState({});
    const [priorityOverrides, setPriorityOverrides] = useState({});

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={13} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={13} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={13} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const filtered = useMemo(() => hiringRequests
        .filter(r => {
            const st = rowOverrides[r.id] || r.status;
            return (
                (filters.dept === 'All Departments' || r.dept === filters.dept) &&
                (filters.status === 'All Status' || st === filters.status) &&
                (filters.priority === 'All Priority' || r.priority === filters.priority) &&
                (!search || [r.title, r.dept, r.id, r.requestedBy].some(f => f.toLowerCase().includes(search.toLowerCase())))
            );
        })
        .sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return av < bv ? (sortDir === 'asc' ? -1 : 1) : av > bv ? (sortDir === 'asc' ? 1 : -1) : 0;
        }), [filters, search, sortKey, sortDir, rowOverrides]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
    const paginated = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    const handleAction = (id, action) => {
        setRowOverrides(p => ({ ...p, [id]: action }));
        if (selected?.id === id) setSelected(prev => ({ ...prev, _status: action }));
    };

    const cyclePriority = (id, current) => {
        const order = { High: 'Medium', Medium: 'Low', Low: 'High' };
        setPriorityOverrides(p => ({ ...p, [id]: order[priorityOverrides[id] || current] }));
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
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Hiring Requests</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={15} />
                    Export Hiring Report
                </button>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Requests</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass}>
                        <option>All Roles</option>
                        {['Backend Developer', 'Sales Manager', 'Digital Marketer', 'DevOps Engineer', 'HR Specialist'].map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
                        {statuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.priority} onChange={e => handleFilter('priority', e.target.value)}>
                        {priorities.map(p => <option key={p}>{p}</option>)}
                    </select>
                    <select className={selectClass}>
                        <option>All Requesters</option>
                        {['Manager Rahul', 'Manager Priya', 'Manager Arjun', 'Manager Sonia', 'Manager David'].map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dateRange} onChange={e => handleFilter('dateRange', e.target.value)}>
                        {dateRanges.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                </div>
            </div>

            {/* 3. Table + Details */}
            <div className={`grid gap-6 ${selected ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>

                {/* Table */}
                <div className={`${selected ? 'xl:col-span-2' : ''} ${cardClass} flex flex-col pb-4`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>All Hiring Requests</h3>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                            <Search size={15} className="text-gray-400 shrink-0" />
                            <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search requests..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    {[['id', 'Request ID'], ['dept', 'Department'], ['title', 'Job Title'], ['requestedBy', 'Requested By'], ['positions', 'Positions'], ['priority', 'Priority'], ['date', 'Date'], ['status', 'Status']].map(([key, label]) => (
                                        <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                            <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                        </th>
                                    ))}
                                    <th className={`${thClass} text-center`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.length === 0 && (
                                    <tr><td colSpan={9} className="p-8 text-center text-gray-400">No requests match your filters.</td></tr>
                                )}
                                {paginated.map((row) => {
                                    const st = rowOverrides[row.id] || row.status;
                                    const pr = priorityOverrides[row.id] || row.priority;
                                    const isSelected = selected?.id === row.id;
                                    return (
                                        <tr key={row.id} onClick={() => setSelected({ ...row, _status: st, _priority: pr })}
                                            className={`border-b last:border-0 cursor-pointer transition-colors ${isSelected ? (isDarkMode ? 'bg-[#3ec3ff]/5' : 'bg-blue-50') : (isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor')}`}>
                                            <td className={`p-4 font-bold text-xs ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</td>
                                            <td className="p-4 text-gray-500">{row.dept}</td>
                                            <td className={`p-4 font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.title}</td>
                                            <td className="p-4 text-gray-500 text-xs">{row.requestedBy}</td>
                                            <td className="p-4 text-center font-medium text-gray-500">{row.positions}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${priorityBadge(pr)}`}>{pr}</span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-xs">{row.date}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${statusBadge(st)}`}>{st}</span>
                                            </td>
                                            <td className="p-4" onClick={e => e.stopPropagation()}>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => setSelected({ ...row, _status: st, _priority: pr })} title="View" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={14} /></button>
                                                    <button onClick={() => handleAction(row.id, 'Approved')} disabled={st !== 'Pending'} title="Approve" className="px-2 py-1 text-[10px] font-bold rounded bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed">✓</button>
                                                    <button onClick={() => handleAction(row.id, 'Rejected')} disabled={st !== 'Pending'} title="Reject" className="px-2 py-1 text-[10px] font-bold rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed">✗</button>
                                                    <button onClick={() => cyclePriority(row.id, row.priority)} title="Cycle Priority" className="px-2 py-1 text-[10px] font-bold rounded bg-amber-400 text-white hover:bg-amber-500">↑P</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                        <span>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
                        <div className="flex items-center gap-2">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                            <span className="font-semibold text-xs">{page}/{totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Request Details Panel */}
                {selected && (
                    <div className={`p-6 ${cardClass} flex flex-col gap-4 self-start`}>
                        <div className="flex items-center justify-between">
                            <h3 className={headingClass}>Hiring Request Details</h3>
                            <button onClick={() => setSelected(null)} className={`text-xs font-semibold px-2 py-1 rounded-md ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>✕</button>
                        </div>
                        <div className="space-y-2.5 text-sm">
                            {[
                                ['Request ID', selected.id],
                                ['Department', selected.dept],
                                ['Job Title', selected.title],
                                ['Positions', selected.positions],
                                ['Experience', selected.experience],
                                ['Employment Type', selected.type],
                                ['Budget Range', selected.budget],
                                ['Requested By', selected.requestedBy],
                                ['Date', selected.date],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between gap-2">
                                    <span className="text-gray-500 shrink-0">{label}</span>
                                    <span className={`font-semibold text-right ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{val}</span>
                                </div>
                            ))}
                        </div>
                        <div className={`p-3 rounded-lg border text-xs ${isDarkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'}`}>
                            <p className="font-bold text-gray-500 uppercase tracking-wider mb-1">Reason for Hiring</p>
                            <p>{selected.reason}</p>
                        </div>
                        <div className={`p-3 rounded-lg border text-xs ${isDarkMode ? 'bg-amber-500/5 border-amber-500/20 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-800'}`}>
                            <p className="font-bold uppercase tracking-wider mb-1">Manager Comments</p>
                            <p>{selected.managerComment}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button disabled={(selected._status || selected.status) !== 'Pending'} onClick={() => handleAction(selected.id, 'Approved')} className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Approve Request</button>
                            <button disabled={(selected._status || selected.status) !== 'Pending'} onClick={() => handleAction(selected.id, 'Rejected')} className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Reject Request</button>
                            <button className={`w-full py-2 rounded-lg border text-sm font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`}>Request More Information</button>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Priority Donut Chart + Recent Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Hiring Priority Donut (1 col) */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={headingClass}>Hiring Priority Overview</h3>
                    </div>
                    <div className="flex-1" style={{ height: 220 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={priorityChartData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {priorityChartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    {/* Summary rows */}
                    <div className="space-y-2 mt-2">
                        {priorityChartData.map(p => (
                            <div key={p.name} className="flex items-center justify-between text-xs font-semibold">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{p.name}</span>
                                </div>
                                <span style={{ color: p.color }}>{p.value} requests</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Hiring Activity (2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Hiring Activity</h3>
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

            {/* 5. Quick Actions */}
            <div className={`p-6 ${cardClass} flex flex-col`}>
                <div className="flex items-center justify-between mb-5">
                    <h3 className={headingClass}>Quick Actions</h3>
                    <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'View Recruitment Pipeline', icon: BarChart3, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                        { label: 'Approve Pending Requests', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { label: 'Generate Hiring Report', icon: Download, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                        { label: 'Open Workforce Planning', icon: Users, color: 'text-violet-500', bg: 'bg-violet-500/10' },
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

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
