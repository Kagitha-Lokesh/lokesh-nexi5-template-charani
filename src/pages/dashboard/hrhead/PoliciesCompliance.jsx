import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, Edit2, Archive, FileDown,
    ChevronRight, ChevronLeft, ChevronsUpDown, ArrowUp, ArrowDown,
    Clock, FileText, BarChart3, Activity, ShieldCheck,
    Settings, Bell, PlusCircle, AlertTriangle, CheckCircle2, XCircle
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    policyCategories, complianceStatus, adoptionTrend,
    policies, acknowledgments, policyRecentUpdates as recentUpdates,
    policyCategoryFilters as categories, policyDepts as depts,
    policyStatusFilters as policyStatuses, policyComplianceFilters as complianceFilters
} from '@/datasets/hrhead/policiesComplianceData';

const ROWS_PER_PAGE = 5;
const ACK_PER_PAGE = 4;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const complianceBadge = (s) => ({
    'Compliant': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Pending Review': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Violation Detected': 'bg-red-500/10 text-red-500 border-red-500/20',
}[s] || 'bg-gray-500/10 text-gray-400 border-gray-500/20');

const ackBadge = (s) => ({
    'Acknowledged': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
}[s] || '');

const CustomPieTooltip = ({ active, payload, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{payload[0].name}</p>
            <p style={{ color: payload[0].payload.color }} className="font-bold">{payload[0].value}{typeof payload[0].value === 'number' && payload[0].value <= 100 && String(payload[0].value).includes('.') === false && payload[0].value < 30 ? '' : '%' in String(payload[0].value) ? '' : payload[0].payload.value > 20 ? '%' : ''}</p>
        </div>
    );
    return null;
};

const CustomLineTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            <p className="font-bold text-emerald-500">{payload[0].value}% adoption</p>
        </div>
    );
    return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PoliciesCompliance() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ category: 'All Categories', dept: 'All Departments', policyStatus: 'All Status', compliance: 'All Compliance' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('updated');
    const [sortDir, setSortDir] = useState('desc');
    const [page, setPage] = useState(1);
    const [ackPage, setAckPage] = useState(1);
    const [ackSearch, setAckSearch] = useState('');

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('desc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={12} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={12} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const filteredPolicies = useMemo(() => policies
        .filter(r => (
            (filters.category === 'All Categories' || r.category === filters.category) &&
            (filters.dept === 'All Departments' || r.dept === filters.dept) &&
            (filters.compliance === 'All Compliance' || r.compliance === filters.compliance) &&
            (!search || r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase()))
        ))
        .sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return av < bv ? (sortDir === 'asc' ? -1 : 1) : av > bv ? (sortDir === 'asc' ? 1 : -1) : 0;
        }), [filters, search, sortKey, sortDir]);

    const totalPages = Math.max(1, Math.ceil(filteredPolicies.length / ROWS_PER_PAGE));
    const paginated = filteredPolicies.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

    const filteredAcks = useMemo(() => acknowledgments.filter(a =>
        !ackSearch || [a.employee, a.dept, a.policy].some(f => f.toLowerCase().includes(ackSearch.toLowerCase()))
    ), [ackSearch]);
    const ackTotalPages = Math.max(1, Math.ceil(filteredAcks.length / ACK_PER_PAGE));
    const paginatedAcks = filteredAcks.slice((ackPage - 1) * ACK_PER_PAGE, ackPage * ACK_PER_PAGE);

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const selectClass = `text-sm px-3 py-2 rounded-lg border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300 focus:border-[#3ec3ff]' : 'bg-gray-50 border-gray-200 text-gray-700 focus:border-primary'}`;
    const thClass = `p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500`;

    const Paginator = ({ page, total, onPage }) => (
        <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
            <span>{total} result{total !== 1 ? 's' : ''}</span>
            <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => onPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                <span className="font-semibold text-xs">{page}/{Math.max(1, Math.ceil(total / (total <= ACK_PER_PAGE ? ACK_PER_PAGE : ROWS_PER_PAGE)))}</span>
                <button disabled={page === Math.max(1, Math.ceil(total / (total <= ACK_PER_PAGE ? ACK_PER_PAGE : ROWS_PER_PAGE)))} onClick={() => onPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
            </div>
        </div>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Section Title */}
            <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>HR Policies &amp; Compliance</h2>
                <div className="flex items-center gap-3">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs border transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-white border-gray-200 hover:shadow-sm text-dark'}`}>
                        <Download size={14} />
                        Export Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90' : 'bg-primary hover:bg-blue-700'}`}>
                        <PlusCircle size={14} />
                        Add New Policy
                    </button>
                </div>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Policies</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    <select className={selectClass} value={filters.category} onChange={e => handleFilter('category', e.target.value)}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass} value={filters.policyStatus} onChange={e => handleFilter('policyStatus', e.target.value)}>
                        {policyStatuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.compliance} onChange={e => handleFilter('compliance', e.target.value)}>
                        {complianceFilters.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <select className={selectClass}>
                        <option>All Dates</option>
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>

            {/* 3. Category Donut + Compliance Charts side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Policy Distribution Donut */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={`font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}>Policy Distribution</h3>
                        <ShieldCheck size={18} className="text-blue-500" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie data={policyCategories} cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {policyCategories.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-1.5 mt-2">
                            {policyCategories.map(d => (
                                <div key={d.name} className="flex items-center justify-between text-xs font-semibold">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{d.name}</span>
                                    </div>
                                    <span style={{ color: d.color }}>{d.value} policies</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Compliance Status Donut */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={`font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}>Compliance Status</h3>
                        <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie data={complianceStatus} cx="50%" cy="50%" innerRadius={52} outerRadius={82} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {complianceStatus.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-1.5 mt-2">
                            {complianceStatus.map(d => (
                                <div key={d.name} className="flex items-center justify-between text-xs font-semibold">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{d.name}</span>
                                    </div>
                                    <span style={{ color: d.color }}>{d.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Policy Adoption Trend Line */}
                <div className={`${cardClass} flex flex-col h-[360px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={`font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}>Adoption Trend</h3>
                        <Activity size={18} className="text-violet-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={adoptionTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} />
                                <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} width={36} tickFormatter={v => `${v}%`} />
                                <Tooltip content={<CustomLineTooltip isDarkMode={isDarkMode} />} />
                                <Line type="monotone" dataKey="rate" name="Adoption Rate" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} activeDot={{ r: 6 }} isAnimationActive animationDuration={900} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 4. Company Policies Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Company Policies</h3>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={15} className="text-gray-400 shrink-0" />
                        <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search policies..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                {[['name', 'Policy Name'], ['category', 'Category'], ['dept', 'Department'], ['effective', 'Effective Date'], ['compliance', 'Compliance'], ['updated', 'Last Updated']].map(([key, label]) => (
                                    <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                        <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                    </th>
                                ))}
                                <th className={`${thClass} text-center`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginated.length === 0 && (
                                <tr><td colSpan={7} className="p-8 text-center text-gray-400">No policies match your filters.</td></tr>
                            )}
                            {paginated.map((row) => (
                                <tr key={row.id} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0"><FileText size={13} className="text-blue-500" /></div>
                                            <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500">{row.category}</td>
                                    <td className="p-4 text-xs text-gray-500">{row.dept}</td>
                                    <td className={`p-4 text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.effective}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${complianceBadge(row.compliance)}`}>{row.compliance}</span>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500 flex items-center gap-1"><Clock size={11} /> {row.updated}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button title="View" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={13} /></button>
                                            <button title="Edit" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-amber-400' : 'hover:bg-gray-100 text-gray-500 hover:text-amber-500'}`}><Edit2 size={13} /></button>
                                            <button title="Archive" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-red-400' : 'hover:bg-gray-100 text-gray-500 hover:text-red-500'}`}><Archive size={13} /></button>
                                            <button title="Download" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-emerald-400' : 'hover:bg-gray-100 text-gray-500 hover:text-emerald-500'}`}><FileDown size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                    <span>{filteredPolicies.length} polic{filteredPolicies.length !== 1 ? 'ies' : 'y'}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                        <span className="font-semibold text-xs">{page}/{totalPages}</span>
                        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* 5. Acknowledgment Table */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Employee Policy Acknowledgments</h3>
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                        <Search size={15} className="text-gray-400 shrink-0" />
                        <input className="bg-transparent outline-none w-32 text-sm placeholder-gray-400" placeholder="Search employees..." value={ackSearch} onChange={e => { setAckSearch(e.target.value); setAckPage(1); }} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className={thClass}>Employee</th>
                                <th className={thClass}>Department</th>
                                <th className={thClass}>Policy Name</th>
                                <th className={thClass}>Date</th>
                                <th className={thClass}>Status</th>
                                <th className={`${thClass} text-center`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedAcks.map((a) => (
                                <tr key={a.id} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-7 h-7 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold text-xs shrink-0">{a.employee.charAt(0)}</div>
                                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{a.employee}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs text-gray-500">{a.dept}</td>
                                    <td className="p-4 text-xs text-gray-500">{a.policy}</td>
                                    <td className={`p-4 text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{a.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${ackBadge(a.status)}`}>{a.status}</span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button title="View Details" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={13} /></button>
                                            <button title="Send Reminder" disabled={a.status === 'Acknowledged'} className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-amber-400 disabled:opacity-30' : 'hover:bg-gray-100 text-gray-500 hover:text-amber-500 disabled:opacity-30'}`}><Bell size={13} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                    <span>{filteredAcks.length} employee{filteredAcks.length !== 1 ? 's' : ''}</span>
                    <div className="flex items-center gap-2">
                        <button disabled={ackPage === 1} onClick={() => setAckPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                        <span className="font-semibold text-xs">{ackPage}/{ackTotalPages}</span>
                        <button disabled={ackPage === ackTotalPages} onClick={() => setAckPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* 6. Recent Updates + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Policy Updates (2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Policy Updates</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-5 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentUpdates.map((item, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <item.icon size={18} className={item.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={12} /> {item.time}</p>
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
                            { label: 'Create New Policy', icon: PlusCircle, color: 'text-blue-500' },
                            { label: 'Review Compliance Report', icon: BarChart3, color: 'text-violet-500' },
                            { label: 'Audit Policy Violations', icon: AlertTriangle, color: 'text-red-500' },
                            { label: 'Send Policy Reminder', icon: Bell, color: 'text-amber-500' },
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
