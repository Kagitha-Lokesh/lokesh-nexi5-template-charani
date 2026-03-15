import { useState, useMemo } from 'react';
import {
    Download, Filter, Search, Eye, CheckCircle2, XCircle,
    ChevronRight, ChevronLeft, ChevronsUpDown, ArrowUp, ArrowDown,
    Clock, FileText, BarChart3, Activity, CreditCard,
    Settings, AlertTriangle, RefreshCw, IndianRupee
} from 'lucide-react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    deptPayrollDist, monthlyTrend, complianceData, payrollRecords,
    payrollActivities as recentActivities,
    payrollMonths as months, payrollDepts as depts,
    payrollEmpTypes as empTypes, payrollStatuses,
    payrollPaymentStatuses as paymentStatuses
} from '@/datasets/hrhead/payrollApprovalData';

const ROWS_PER_PAGE = 5;

// ─── Style Helpers ────────────────────────────────────────────────────────────

const statusBadge = (s) => ({
    'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Approved': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'Rejected': 'bg-red-500/10 text-red-500 border-red-500/20',
    'Processed': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
}[s] || 'bg-gray-500/10 text-gray-400 border-gray-500/20');

const fmt = (n) => `₹${n.toLocaleString('en-IN')}`;

const CustomPieTooltip = ({ active, payload, isDarkMode, unit = '' }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{payload[0].name}</p>
            <p style={{ color: payload[0].payload.color }} className="font-bold">{unit}{payload[0].value}{unit === '' ? '%' : 'L'}</p>
        </div>
    );
    return null;
};

const CustomLineTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) return (
        <div className={`p-3 border rounded-lg shadow-lg text-xs ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
            <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
            <p className="font-bold text-[#3ec3ff]">₹{payload[0].value}L payroll cost</p>
        </div>
    );
    return null;
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PayrollApproval() {
    const { isDarkMode } = useTheme();

    const [filters, setFilters] = useState({ month: 'All Months', dept: 'All Departments', empType: 'All Types', status: 'All Status', payment: 'All Payments' });
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('id');
    const [sortDir, setSortDir] = useState('asc');
    const [page, setPage] = useState(1);
    const [selected, setSelected] = useState(null);
    const [statusOverrides, setStatusOverrides] = useState({});

    const handleFilter = (k, v) => { setFilters(p => ({ ...p, [k]: v })); setPage(1); };
    const handleSort = (key) => { if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortKey(key); setSortDir('asc'); } };

    const SortIcon = ({ col }) => {
        if (sortKey !== col) return <ChevronsUpDown size={12} className="text-gray-400" />;
        return sortDir === 'asc' ? <ArrowUp size={12} className="text-primary dark:text-[#3ec3ff]" /> : <ArrowDown size={12} className="text-primary dark:text-[#3ec3ff]" />;
    };

    const handleAction = (id, action) => {
        setStatusOverrides(p => ({ ...p, [id]: action }));
        if (selected?.id === id) setSelected(prev => ({ ...prev, _status: action }));
    };

    const filtered = useMemo(() => payrollRecords
        .filter(r => {
            const st = statusOverrides[r.id] || r.status;
            const filterStatus = filters.status === 'Pending Approval' ? 'Pending' : filters.status;
            return (
                (filters.dept === 'All Departments' || r.dept === filters.dept) &&
                (filters.empType === 'All Types' || r.empType === filters.empType) &&
                (filters.status === 'All Status' || st === filterStatus) &&
                (!search || [r.employee, r.dept, r.id].some(f => f.toLowerCase().includes(search.toLowerCase())))
            );
        })
        .sort((a, b) => {
            let av = a[sortKey], bv = b[sortKey];
            if (typeof av === 'string') { av = av.toLowerCase(); bv = bv.toLowerCase(); }
            return av < bv ? (sortDir === 'asc' ? -1 : 1) : av > bv ? (sortDir === 'asc' ? 1 : -1) : 0;
        }), [filters, search, sortKey, sortDir, statusOverrides]);

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
            <div className="flex items-center justify-between mt-2 gap-3 flex-wrap">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Payroll Approval</h2>
                <div className="flex items-center gap-3">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs border transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-white border-gray-200 hover:shadow-sm text-dark'}`}>
                        <Download size={14} />
                        Export Payroll Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}>
                        <CheckCircle2 size={14} />
                        Approve Payroll Batch
                    </button>
                </div>
            </div>

            {/* 2. Filters */}
            <div className={`p-5 ${cardClass}`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={17} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    <h3 className={`font-headings font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Payroll Data</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    <select className={selectClass} value={filters.month} onChange={e => handleFilter('month', e.target.value)}>
                        {months.map(m => <option key={m}>{m}</option>)}
                    </select>
                    <select className={selectClass} value={filters.dept} onChange={e => handleFilter('dept', e.target.value)}>
                        {depts.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <select className={selectClass} value={filters.empType} onChange={e => handleFilter('empType', e.target.value)}>
                        {empTypes.map(t => <option key={t}>{t}</option>)}
                    </select>
                    <select className={selectClass} value={filters.status} onChange={e => handleFilter('status', e.target.value)}>
                        {payrollStatuses.map(s => <option key={s}>{s}</option>)}
                    </select>
                    <select className={selectClass} value={filters.payment} onChange={e => handleFilter('payment', e.target.value)}>
                        {paymentStatuses.map(p => <option key={p}>{p}</option>)}
                    </select>
                    <select className={selectClass}>
                        <option>Last 30 Days</option>
                        <option>Last Quarter</option>
                        <option>This Year</option>
                    </select>
                </div>
            </div>

            {/* 3. Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Payroll Distribution Donut */}
                <div className={`${cardClass} flex flex-col h-[370px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Payroll by Department</h3>
                        <IndianRupee size={18} className="text-[#38BDF8]" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="70%">
                            <PieChart>
                                <Pie data={deptPayrollDist} cx="50%" cy="50%" innerRadius={58} outerRadius={90} paddingAngle={3} dataKey="value" isAnimationActive animationDuration={900}>
                                    {deptPayrollDist.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} unit="₹" />} />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-3 gap-x-4 gap-y-1.5 mt-2">
                            {deptPayrollDist.map(d => (
                                <div key={d.name} className="flex items-center gap-1.5 text-xs font-semibold">
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>{d.name.split(' ')[0]}</span>
                                    <span style={{ color: d.color }} className="ml-auto">₹{d.value}L</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Monthly Payroll Trend Line */}
                <div className={`${cardClass} flex flex-col h-[370px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Monthly Payroll Cost Trend</h3>
                        <BarChart3 size={18} className="text-violet-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis domain={[80, 115]} axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} width={36} tickFormatter={v => `₹${v}L`} />
                                <Tooltip content={<CustomLineTooltip isDarkMode={isDarkMode} />} />
                                <Line type="monotone" dataKey="cost" name="Payroll Cost" stroke={isDarkMode ? '#3ec3ff' : '#2563EB'} strokeWidth={3} dot={{ r: 5, fill: isDarkMode ? '#3ec3ff' : '#2563EB' }} activeDot={{ r: 7 }} isAnimationActive animationDuration={900} />
                                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 4. Payroll Table + Details Panel */}
            <div className={`grid gap-6 ${selected ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>

                {/* Table */}
                <div className={`${selected ? 'xl:col-span-2' : ''} ${cardClass} flex flex-col pb-4`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Pending Payroll Approvals</h3>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                            <Search size={15} className="text-gray-400 shrink-0" />
                            <input className="bg-transparent outline-none w-36 text-sm placeholder-gray-400" placeholder="Search payroll..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    {[['id', 'Payroll ID'], ['employee', 'Employee'], ['dept', 'Department'], ['base', 'Base Salary'], ['bonus', 'Bonus'], ['deductions', 'Deductions'], ['net', 'Net Salary'], ['status', 'Status']].map(([key, label]) => (
                                        <th key={key} className={`${thClass} cursor-pointer select-none`} onClick={() => handleSort(key)}>
                                            <div className="flex items-center gap-1">{label} <SortIcon col={key} /></div>
                                        </th>
                                    ))}
                                    <th className={`${thClass} text-center`}>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.length === 0 && (
                                    <tr><td colSpan={9} className="p-8 text-center text-gray-400">No payroll records match your filters.</td></tr>
                                )}
                                {paginated.map((row) => {
                                    const st = statusOverrides[row.id] || row.status;
                                    const isSelected = selected?.id === row.id;
                                    return (
                                        <tr key={row.id} onClick={() => setSelected({ ...row, _status: st })}
                                            className={`border-b last:border-0 cursor-pointer transition-colors ${isSelected ? (isDarkMode ? 'bg-[#3ec3ff]/5' : 'bg-blue-50') : (isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor')}`}>
                                            <td className={`p-4 font-bold text-xs ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold text-xs shrink-0">{row.employee.charAt(0)}</div>
                                                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.employee}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-xs text-gray-500">{row.dept}</td>
                                            <td className={`p-4 text-xs font-semibold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{fmt(row.base)}</td>
                                            <td className="p-4 text-xs text-emerald-500 font-semibold">+{fmt(row.bonus)}</td>
                                            <td className="p-4 text-xs text-red-500 font-semibold">-{fmt(row.deductions)}</td>
                                            <td className={`p-4 text-xs font-bold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{fmt(row.net)}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase border ${statusBadge(st)}`}>{st}</span>
                                            </td>
                                            <td className="p-4" onClick={e => e.stopPropagation()}>
                                                <div className="flex items-center gap-1">
                                                    <button onClick={() => setSelected({ ...row, _status: st })} title="View" className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`}><Eye size={13} /></button>
                                                    <button onClick={() => handleAction(row.id, 'Approved')} disabled={st !== 'Pending'} title="Approve" className="px-1.5 py-1 text-[10px] font-bold rounded bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed">✓</button>
                                                    <button onClick={() => handleAction(row.id, 'Rejected')} disabled={st !== 'Pending'} title="Reject" className="px-1.5 py-1 text-[10px] font-bold rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed">✗</button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between px-5 pt-4 text-sm text-gray-500">
                        <span>{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
                        <div className="flex items-center gap-2">
                            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronLeft size={16} /></button>
                            <span className="font-semibold text-xs">{page}/{totalPages}</span>
                            <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className={`p-1 rounded-md ${isDarkMode ? 'hover:bg-white/10 disabled:opacity-30' : 'hover:bg-gray-100 disabled:opacity-30'}`}><ChevronRight size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Payroll Details Panel */}
                {selected && (
                    <div className={`p-6 ${cardClass} flex flex-col gap-4 self-start`}>
                        <div className="flex items-center justify-between">
                            <h3 className={headingClass}>Payroll Details</h3>
                            <button onClick={() => setSelected(null)} className={`text-xs font-semibold px-2 py-1 rounded-md ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-gray-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`}>✕</button>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold font-headings">{selected.employee.charAt(0)}</div>
                            <div>
                                <p className={`font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{selected.employee}</p>
                                <p className="text-xs text-gray-500">{selected.empId} · {selected.dept}</p>
                            </div>
                        </div>
                        <div className="space-y-2.5 text-sm">
                            {[
                                ['Payroll ID', selected.id],
                                ['Employment Type', selected.empType],
                            ].map(([label, val]) => (
                                <div key={label} className="flex justify-between gap-2">
                                    <span className="text-gray-500 shrink-0">{label}</span>
                                    <span className={`font-semibold text-right ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{val}</span>
                                </div>
                            ))}
                        </div>
                        {/* Salary breakdown */}
                        <div className={`p-3 rounded-lg border space-y-2 text-sm ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Salary Breakdown</p>
                            {[
                                ['Base Salary', fmt(selected.base), 'text-gray-500', ''],
                                ['Bonuses', `+${fmt(selected.bonus)}`, 'text-emerald-500', ''],
                                ['Allowances', `+${fmt(selected.allowances)}`, 'text-blue-500', ''],
                                ['Tax Deductions', `-${fmt(selected.tax)}`, 'text-red-500', ''],
                                ['Other Deductions', `-${fmt(selected.otherDed)}`, 'text-red-400', ''],
                            ].map(([label, val, valClass]) => (
                                <div key={label} className="flex justify-between text-xs">
                                    <span className="text-gray-500">{label}</span>
                                    <span className={`font-bold ${valClass}`}>{val}</span>
                                </div>
                            ))}
                            <div className={`pt-2 border-t flex justify-between text-sm font-bold ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                                <span className={isDarkMode ? 'text-white' : 'text-dark'}>Net Salary</span>
                                <span className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}>{fmt(selected.net)}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button disabled={(selected._status || selected.status) !== 'Pending'} onClick={() => handleAction(selected.id, 'Approved')} className="w-full py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Approve Payroll</button>
                            <button disabled={(selected._status || selected.status) !== 'Pending'} onClick={() => handleAction(selected.id, 'Rejected')} className="w-full py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed">Reject Payroll</button>
                            <button className={`w-full py-2 rounded-lg border text-sm font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'}`}>Request Adjustment</button>
                        </div>
                    </div>
                )}
            </div>

            {/* 5. Compliance + Activity + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Compliance Donut */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className={headingClass}>Payroll Compliance</h3>
                    </div>
                    <div style={{ height: 200 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={complianceData} cx="50%" cy="50%" innerRadius={52} outerRadius={80} paddingAngle={4} dataKey="value" isAnimationActive animationDuration={900}>
                                    {complianceData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip content={<CustomPieTooltip isDarkMode={isDarkMode} />} />
                                <Legend wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-2">
                        {complianceData.map(d => (
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

                {/* Recent Payroll Activity */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className={headingClass}>Recent Payroll Activity</h3>
                        <Activity size={18} className="text-emerald-500" />
                    </div>
                    <div className="space-y-4 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentActivities.map((act, i) => (
                            <div key={i} className="flex gap-3 relative z-10">
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={15} className={act.color} />
                                </div>
                                <div className="pt-0.5">
                                    <p className={`text-[12px] font-semibold leading-snug ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5"><Clock size={10} /> {act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-5">
                        <h3 className={headingClass}>Quick Actions</h3>
                        <Settings size={18} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { label: 'Approve Payroll Batch', icon: CheckCircle2, color: 'text-emerald-500' },
                            { label: 'View Payroll Reports', icon: BarChart3, color: 'text-blue-500' },
                            { label: 'Review Salary Adjustments', icon: RefreshCw, color: 'text-amber-500' },
                            { label: 'Payroll Compliance Audit', icon: AlertTriangle, color: 'text-red-500' },
                        ].map((btn, i) => (
                            <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 hover:-translate-y-0.5 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                <btn.icon size={17} className={btn.color} />
                                {btn.label}
                                <ChevronRight size={13} className="ml-auto text-gray-400" />
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
