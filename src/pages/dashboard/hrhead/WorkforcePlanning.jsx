import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, ChevronRight, ChevronLeft,
    ChevronsUpDown, ArrowUp, ArrowDown, Clock, FileText,
    BarChart3, Activity, Building2, Settings, Users,
    TrendingUp, AlertTriangle, PlusCircle, ListChecks
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
    PieChart, Pie, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    deptDistribution, headcountData, growthTrend, deptTableData, upcomingNeeds,
    workforceDepts as depts, workforceRoles as roles,
    workforceEmpTypes as empTypes, workforceLocations as locations,
    workforceDateRanges as dateRanges
} from '@/datasets/hrhead/workforcePlanningData';

const ROWS_PER_PAGE = 5;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const gapBadge = (gap) => {
    if (gap >= 25) return 'bg-red-500/10 text-red-500 border-red-500/20';
    if (gap >= 10) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
};

const gapLabel = (gap) => {
    if (gap >= 25) return 'High';
    if (gap >= 10) return 'Medium';
    return 'Low';
};

const CustomPieTooltip = ({ active, payload, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{payload[0].name}</p>
            <p style={{ color: payload[0].payload.color }} className="font-bold">{payload[0].value} employees</p>
        </div>
    );
    return null;
};

const CustomBarTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1.5 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            {payload.map((e, i) => <p key={i} style={{ color: e.fill }} className="font-bold">{e.name}: {e.value}</p>)}
        </div>
    );
    return null;
};

const CustomLineTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            <p className="font-bold text-[#3ec3ff]">{payload[0].value} employees</p>
        </div>
    );
    return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorkforcePlanning() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ dept: 'All Departments', role: 'All Roles', empType: 'All Types', location: 'All Locations', dateRange: 'q2' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('gap');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={12} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={12} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const filtered = useMemo(() => deptTableData
        .filter(r => (
            (filters.dept === 'All Departments' || r.dept === filters.dept) &&
            (!search || r.dept.toLowerCase().includes(search.toLowerCase()) || r.manager.toLowerCase().includes(search.toLowerCase()))
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
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Workforce Planning</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Download size={15} />
                    Export Workforce Report
                </button>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Workforce Data</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass} value={filters.role} onChange={e => handleFilter('role', e.target.value)}>
                        {roles.map(r => <option key={r}>{r}</option>)}
                    </select>
                    <select className={selectClass} value={filters.empType} onChange={e => handleFilter('empType', e.target.value)}>
                        {empTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <select className={selectClass} value={filters.location} onChange={e => handleFilter('location', e.target.value)}>
                        {locations.map(l => <option key={l}>{l}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dateRange} onChange={e => handleFilter('dateRange', e.target.value)}>
                        {dateRanges.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                    </select>
                </div>
            </div>

            {/* 3. Donut + Headcount Bar — side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Workforce Distribution Donut */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Workforce by Department</h3>
                        <Users size={20} className="text-[#3ec3ff] dark:text-[#3ec3ff]" style={{ color: '#38BDF8' }} />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="75%">
                            <PieChart>
                                <Pie data={deptDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" isAnimationActive animationDuration={900}>
                                    {deptDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-2 mt-2">
                            {deptDistribution.map(d => (
                                <div key={d.name} className="flex items-center gap-1.5 text-xs font-semibold">
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} title={d.name}>{d.name.split(' ')[0]}</span>
                                    <span style={{ color: d.color }} className="ml-auto">{d.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Headcount vs Required Grouped Bar */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Headcount vs Hiring Gap</h3>
                        <AlertTriangle size={20} className="text-amber-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={headcountData} barGap={2} barCategoryGap="30%">
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="dept" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} width={30} />
                                <Tooltip content={<CustomBarTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                                <Bar dataKey="current" name="Current Headcount" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={18} isAnimationActive animationDuration={900} />
                                <Bar dataKey="required" name="Required Headcount" fill={isDarkMode ? 'rgba(255,255,255,0.12)' : '#CBD5E1'} radius={[4, 4, 0, 0]} barSize={18} isAnimationActive animationDuration={900} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 4. Workforce Growth Line Chart */}
            <div className={`${cardClass} flex flex-col h-[320px]`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Workforce Growth Trend</h3>
                    <TrendingUp size={20} className="text-emerald-500" />
                </div>
                <div className="flex-1 p-5">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthTrend}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                            <YAxis domain={[400, 500]} axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={40} />
                            <Tooltip content={<CustomLineTooltip isDarkMode={isDarkMode} />} />
                            <Line type="monotone" dataKey="employees" name="Total Employees" stroke={isDarkMode ? '#3ec3ff' : '#2563EB'} strokeWidth={3} dot={{ r: 5, fill: isDarkMode ? '#3ec3ff' : '#2563EB' }} activeDot={{ r: 7 }} isAnimationActive animationDuration={900} />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 5. Department Workforce Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Department Workforce Overview</h3>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={15} className="text-gray-400 shrink-0" />
                        <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search departments..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                {[['dept', 'Department'], ['current', 'Current'], ['required', 'Required'], ['gap', 'Hiring Gap'], ['recruitments', 'Recruitments'], ['manager', 'Manager']].map(([key, label]) => (
                                    <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                        <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                    </th>
                                ))}
                                <th className={`${thClass} text-center`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginated.length === 0 && (
                                <tr><td colSpan={7} className="p-8 text-center text-gray-400">No departments match your search.</td></tr>
                            )}
                            {paginated.map((row) => (
                                <tr key={row.dept} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                                <Building2 size={14} className="text-blue-500" />
                                            </div>
                                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.dept}</span>
                                        </div>
                                    </td>
                                    <td className={`p-4 font-bold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.current}</td>
                                    <td className="p-4 text-gray-500 font-medium">{row.required}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${gapBadge(row.gap)}`}>
                                                {gapLabel(row.gap)}
                                            </span>
                                            <span className={`text-xs font-bold ${gapBadge(row.gap).includes('red') ? 'text-red-500' : gapBadge(row.gap).includes('amber') ? 'text-amber-500' : 'text-emerald-500'}`}>+{row.gap}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${isDarkMode ? 'bg-violet-500/10 text-violet-400' : 'bg-violet-50 text-violet-600'}`}>{row.recruitments} Active</span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-xs">{row.manager}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button title="View Department" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={14} /></button>
                                            <button title="Open Hiring Requests" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-emerald-400' : 'hover:bg-gray-100 text-gray-500 hover:text-emerald-500'}`}><ListChecks size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                    <span>{filtered.length} department{filtered.length !== 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                        <span className="font-semibold text-xs">{page}/{totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* 6. Upcoming Workforce Needs + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Upcoming Workforce Needs (2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Upcoming Workforce Needs</h3>
                        <TrendingUp size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-5 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {upcomingNeeds.map((item, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <item.icon size={18} className={item.color} />
                                </div>
                                <div className="pt-2">
                                    <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.text}</p>
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
                            { label: 'Create Hiring Request', icon: PlusCircle, color: 'text-blue-500' },
                            { label: 'View Recruitment Pipeline', icon: BarChart3, color: 'text-violet-500' },
                            { label: 'Generate Workforce Forecast', icon: TrendingUp, color: 'text-emerald-500' },
                            { label: 'Assign Recruitment Team', icon: Users, color: 'text-amber-500' },
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
