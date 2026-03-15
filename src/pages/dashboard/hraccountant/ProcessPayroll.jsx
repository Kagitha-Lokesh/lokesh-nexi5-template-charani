import { useState, useEffect, useRef } from 'react';
import {
    DollarSign, FileText, CheckCircle2, Clock, AlertTriangle,
    Search, Download, RefreshCw, Eye, Settings, Activity,
    BarChart3, Filter, ChevronDown, TrendingUp, XCircle,
    ArrowUpDown, Send, Calculator, PlayCircle,
    PieChart as PieIcon
} from 'lucide-react';
import {
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    batchCards, employeePayrollData, processPayrollDeptDist as deptPayrollDist,
    payrollExpenseTrend, processPayrollTimeline as activityTimeline,
    processPayrollQuickActions as quickActions,
    PROCESS_DEPARTMENTS as DEPARTMENTS, PROCESS_MONTHS as MONTHS,
    PROCESS_EMP_TYPES as EMP_TYPES, PROCESS_BATCHES as BATCHES,
    PROCESS_ATT_STATUSES as ATT_STATUSES
} from '@/datasets/hraccountant/processPayrollData';

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

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
    const styles = {
        Processed: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        Calculated: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        Error: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${styles[status] || 'bg-gray-500/10 text-gray-500'}`}>
            {status}
        </span>
    );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload?.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, i) => (
                    <p key={i} className="text-xs font-semibold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: ₹{entry.value}L
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ─── Batch Stat Card ──────────────────────────────────────────────────────────

function BatchCard({ card, isDarkMode }) {
    const count = useAnimatedCount(card.value);
    return (
        <div className={`p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${card.bgColor}`}>
                <card.icon size={26} style={{ color: card.color }} />
            </div>
            <div>
                <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{count}</h3>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{card.title}</p>
            </div>
        </div>
    );
}

// ─── Salary Calculation Panel ──────────────────────────────────────────────────

function SalaryPanel({ employee, isDarkMode, onClose }) {
    if (!employee) return null;
    const fields = [
        { label: 'Base Salary', value: '₹85,000', color: isDarkMode ? 'text-gray-200' : 'text-dark' },
        { label: 'Allowances', value: '₹5,000', color: 'text-blue-500' },
        { label: 'Overtime Pay', value: '₹2,000', color: 'text-violet-500' },
        { label: 'Bonus', value: '₹0', color: 'text-amber-500' },
        { label: 'Tax Deduction', value: '₹2,500', color: 'text-red-500' },
        { label: 'Other Deductions', value: '₹500', color: 'text-red-400' },
    ];
    return (
        <div className={`rounded-xl border p-6 flex flex-col gap-5 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <Calculator size={18} className="text-blue-500" />
                    </div>
                    <div>
                        <h3 className={`font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`}>Salary Calculation</h3>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{employee.name} · {employee.dept}</p>
                    </div>
                </div>
                <button onClick={onClose} className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-gray-500 hover:text-red-400 hover:bg-white/5' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
                    <XCircle size={18} />
                </button>
            </div>

            <div className="flex flex-col gap-3">
                {fields.map((f, i) => (
                    <div key={i} className={`flex justify-between items-center py-2 border-b last:border-0 ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{f.label}</span>
                        <span className={`text-sm font-semibold ${f.color}`}>{f.value}</span>
                    </div>
                ))}
            </div>

            <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Net Salary</span>
                <span className="text-xl font-bold text-emerald-500">₹89,000</span>
            </div>

            <div className="flex gap-2 flex-wrap">
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-amber-400 hover:bg-white/10' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>
                    <RefreshCw size={13} /> Recalculate
                </button>
                <button className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-blue-400 hover:bg-white/10' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                    <FileText size={13} /> Save Payroll
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all active:scale-95">
                    <CheckCircle2 size={13} /> Approve
                </button>
            </div>
        </div>
    );
}

// ─── Select Dropdown ──────────────────────────────────────────────────────────

function FilterSelect({ label, options, value, onChange, isDarkMode }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className={`w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border transition-all focus:outline-none focus:ring-2 ${isDarkMode
                        ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/20'
                        : 'bg-gray-50 border-borderColor text-dark focus:border-blue-500/50 focus:ring-blue-500/20'
                    }`}
                >
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
                <ChevronDown size={14} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProcessPayroll() {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [selectedMonth, setSelectedMonth] = useState('March 2026');
    const [selectedEmpType, setSelectedEmpType] = useState('All');
    const [selectedBatch, setSelectedBatch] = useState('All');
    const [selectedAttStatus, setSelectedAttStatus] = useState('All');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [sortKey, setSortKey] = useState(null);
    const [sortAsc, setSortAsc] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const textMuted = isDarkMode ? 'text-gray-400' : 'text-textSecondary';

    const handleSort = (key) => {
        if (sortKey === key) setSortAsc(a => !a);
        else { setSortKey(key); setSortAsc(true); }
        setCurrentPage(1);
    };

    const filtered = employeePayrollData
        .filter(row => {
            const q = searchQuery.toLowerCase();
            const matchSearch = row.name.toLowerCase().includes(q) || row.id.toLowerCase().includes(q) || row.dept.toLowerCase().includes(q);
            const matchDept = deptFilter === 'All' || row.dept === deptFilter;
            return matchSearch && matchDept;
        })
        .sort((a, b) => {
            if (!sortKey) return 0;
            const va = a[sortKey]; const vb = b[sortKey];
            return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
        });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const SortTh = ({ label, sortId }) => (
        <th
            className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer select-none group"
            onClick={() => sortId && handleSort(sortId)}
        >
            <span className="flex items-center gap-1">
                {label}
                {sortId && <ArrowUpDown size={11} className={`transition-opacity ${sortKey === sortId ? 'opacity-100 text-blue-500' : 'opacity-0 group-hover:opacity-50'}`} />}
            </span>
        </th>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Module Title Banner ─────────────────────────────────────── */}
            <div className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-blue-500/10">
                        <DollarSign size={28} className="text-blue-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            Process Payroll
                        </h1>
                        <p className={`text-sm ${textMuted}`}>
                            Calculate, verify, and process payroll for employees — March 2026 cycle.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export Payroll Sheet
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95">
                        <PlayCircle size={15} /> Start Payroll Processing
                    </button>
                </div>
            </div>

            {/* ── 2. Payroll Processing Filters ─────────────────────────────── */}
            <div className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={16} className="text-blue-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Payroll Processing Filters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <FilterSelect label="Payroll Month" options={MONTHS} value={selectedMonth} onChange={setSelectedMonth} isDarkMode={isDarkMode} />
                    <FilterSelect label="Department" options={DEPARTMENTS} value={deptFilter} onChange={v => { setDeptFilter(v); setCurrentPage(1); }} isDarkMode={isDarkMode} />
                    <FilterSelect label="Employee Type" options={EMP_TYPES} value={selectedEmpType} onChange={setSelectedEmpType} isDarkMode={isDarkMode} />
                    <FilterSelect label="Payroll Batch" options={BATCHES} value={selectedBatch} onChange={setSelectedBatch} isDarkMode={isDarkMode} />
                    <FilterSelect label="Attendance Status" options={ATT_STATUSES} value={selectedAttStatus} onChange={setSelectedAttStatus} isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* ── 3. Payroll Batch Overview Cards ───────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {batchCards.map((card, i) => <BatchCard key={i} card={card} isDarkMode={isDarkMode} />)}
            </div>

            {/* ── 4. Employee Payroll Table + Salary Panel ──────────────────── */}
            <div className={`grid gap-6 ${selectedEmployee ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>

                {/* Table */}
                <div className={`${cardClass} flex flex-col pb-4 ${selectedEmployee ? 'xl:col-span-2' : ''}`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Employee Payroll Processing</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>

                    {/* Search + Filter */}
                    <div className={`px-5 py-4 flex flex-col sm:flex-row gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <div className="relative flex-1 max-w-72">
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode
                                    ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 focus:ring-blue-500/20'
                                    : 'bg-lightBlueBg border-borderColor text-dark focus:border-blue-500/50 focus:ring-blue-500/20'
                                }`}
                            />
                            <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['All', 'Pending', 'Calculated', 'Processed', 'Error'].map(s => (
                                <button
                                    key={s}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <button className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <Download size={13} /> Export
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    <SortTh label="Employee ID" sortId="id" />
                                    <SortTh label="Employee Name" sortId="name" />
                                    <SortTh label="Department" sortId="dept" />
                                    <SortTh label="Working Days" sortId="days" />
                                    <SortTh label="Base Salary" />
                                    <SortTh label="Allowances" />
                                    <SortTh label="Deductions" />
                                    <SortTh label="Net Salary" />
                                    <SortTh label="Status" sortId="status" />
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.length > 0 ? paginated.map((row, i) => (
                                    <tr
                                        key={i}
                                        className={`border-b last:border-0 transition-colors cursor-pointer ${selectedEmployee?.id === row.id
                                            ? isDarkMode ? 'bg-blue-500/5' : 'bg-blue-50'
                                            : isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'
                                        }`}
                                        onClick={() => setSelectedEmployee(selectedEmployee?.id === row.id ? null : row)}
                                    >
                                        <td className={`p-4 font-mono text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</td>
                                        <td className={`p-4 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                        <td className={`p-4 ${textMuted}`}>{row.dept}</td>
                                        <td className={`p-4 font-semibold text-center ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.days}</td>
                                        <td className={`p-4 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.base}</td>
                                        <td className="p-4 text-blue-500 font-medium">{row.allowances}</td>
                                        <td className="p-4 text-red-500 font-medium">{row.deductions}</td>
                                        <td className="p-4 text-emerald-500 font-bold">{row.net}</td>
                                        <td className="p-4"><StatusBadge status={row.status} /></td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                                <button title="Calculate Salary" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-blue-400 hover:bg-white/5' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'}`}>
                                                    <Calculator size={14} />
                                                </button>
                                                <button title="View Details" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-gray-400 hover:text-primary hover:bg-lightSky'}`}>
                                                    <Eye size={14} />
                                                </button>
                                                <button title="Approve Payroll" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-emerald-400 hover:bg-white/5' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                                                    <CheckCircle2 size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="10" className={`py-10 text-center text-sm ${textMuted}`}>
                                            No employees found matching "{searchQuery}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={`flex items-center justify-between px-5 pt-4 text-sm ${textMuted}`}>
                            <span>Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length}</span>
                            <div className="flex gap-2">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                                ))}
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Next</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Salary Calculation Panel */}
                {selectedEmployee && (
                    <SalaryPanel employee={selectedEmployee} isDarkMode={isDarkMode} onClose={() => setSelectedEmployee(null)} />
                )}
            </div>

            {/* ── 5. Charts ─────────────────────────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Donut — Payroll Distribution */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Payroll Distribution by Department</h3>
                        <PieIcon size={20} className="text-blue-500" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptPayrollDist}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={65}
                                    outerRadius={105}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={1200}
                                >
                                    {deptPayrollDist.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Bar — Payroll Expense Trend */}
                <div className={`${cardClass} flex flex-col h-[380px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Payroll Expense Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={payrollExpenseTrend} barSize={44}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 13 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} unit="L" width={44} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="amount" name="Payroll" radius={[6, 6, 0, 0]} isAnimationActive animationDuration={1200}>
                                    {payrollExpenseTrend.map((_, i) => {
                                        const colors = ['#38BDF8', '#8B5CF6', '#10B981', '#F59E0B'];
                                        return <Cell key={i} fill={colors[i % colors.length]} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── 6. Timeline + Quick Actions ───────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Activity Timeline */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Payroll Processing Activity</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-4 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {activityTimeline.map((act, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={17} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className={`text-xs flex items-center gap-1 mt-1 ${textMuted}`}>
                                        <Clock size={11} /> {act.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Quick Payroll Actions</h3>
                        <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((btn, i) => (
                            <button
                                key={i}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all text-sm font-bold active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${btn.bgColor}`}>
                                    <btn.icon size={22} className={btn.color} />
                                </div>
                                <span className="leading-tight text-xs">{btn.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Processing status bar */}
                    <div className={`mt-6 p-4 rounded-xl border ${isDarkMode ? 'bg-blue-500/5 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Batch Processing Progress — March 2026</span>
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>89%</span>
                        </div>
                        <div className={`h-2 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-blue-200'}`}>
                            <div className="h-2 rounded-full bg-blue-500 transition-all duration-1000" style={{ width: '89%' }} />
                        </div>
                        <p className={`text-xs mt-2 ${textMuted}`}>132 of 148 employees verified · 16 pending calculations</p>
                    </div>
                </div>
            </div>

            {/* ── Footer ────────────────────────────────────────────────────── */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
