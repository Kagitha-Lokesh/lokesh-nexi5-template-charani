import { useState, useRef, useEffect } from 'react';
import {
    FileText, Download, Mail, Printer, Send, Search,
    ChevronDown, Eye, CheckCircle2, Clock, Filter,
    BarChart3, Activity, Settings, RefreshCw, ArrowUpDown,
    Building2, CalendarDays, DollarSign, User
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
    payslips, payrollHistory, salarySlipActivityFeed as activityFeed,
    SLIP_STATUS_STYLE as STATUS_STYLE,
    SLIP_DEPARTMENTS as DEPARTMENTS, SLIP_MONTHS as MONTHS,
    SLIP_EMP_TYPES as EMP_TYPES, SLIP_STATUSES as STATUSES
} from '@/datasets/hraccountant/salarySlipsData';

// ─── Payslip document preview ─────────────────────────────────────────────────

function PayslipDoc({ emp, isDarkMode }) {
    if (!emp) return (
        <div className={`flex flex-col items-center justify-center h-full min-h-64 gap-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            <FileText size={48} />
            <p className="text-sm font-medium">Select an employee to preview payslip</p>
        </div>
    );

    const rowClass = `flex justify-between items-center py-2 border-b last:border-0 text-sm ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`;
    const labelClass = isDarkMode ? 'text-gray-400' : 'text-gray-500';
    const valClass = `font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`;

    return (
        <div className={`rounded-xl border p-5 shadow-inner space-y-4 ${isDarkMode ? 'bg-[#080f1f] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            {/* Header */}
            <div className={`flex items-center justify-between pb-4 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>NEXI5 HRM Portal</p>
                    <h3 className={`text-base font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Salary Slip — {emp.month}</h3>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${STATUS_STYLE[emp.status]}`}>{emp.status}</div>
            </div>

            {/* Employee info */}
            <div className="grid grid-cols-2 gap-2">
                {[
                    { label: 'Employee Name', val: emp.name },
                    { label: 'Employee ID',   val: emp.id   },
                    { label: 'Department',    val: emp.dept },
                    { label: 'Pay Month',     val: emp.month },
                ].map((f, i) => (
                    <div key={i}>
                        <p className={`text-[10px] font-semibold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{f.label}</p>
                        <p className={`text-[13px] font-bold mt-0.5 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{f.val}</p>
                    </div>
                ))}
            </div>

            {/* Earnings */}
            <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Earnings</p>
                <div className={`rounded-lg border overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    {[
                        { label: 'Basic Salary',    val: emp.basic   },
                        { label: 'House Rent (HRA)', val: emp.hra    },
                        { label: 'Dearness Allowance', val: emp.da   },
                        { label: 'Special Allowance',  val: emp.special },
                        { label: 'Bonus / Incentive',  val: emp.bonus },
                    ].map((r, i) => (
                        <div key={i} className={`${rowClass} px-3 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                            <span className={labelClass}>{r.label}</span>
                            <span className="text-emerald-500 font-bold text-sm">+ {r.val}</span>
                        </div>
                    ))}
                    <div className={`flex justify-between px-3 py-2 text-sm font-bold ${isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-700'}`}>
                        <span>Gross Salary</span><span>{emp.gross}</span>
                    </div>
                </div>
            </div>

            {/* Deductions */}
            <div>
                <p className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>Deductions</p>
                <div className={`rounded-lg border overflow-hidden ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                    {[
                        { label: 'Provident Fund (PF)', val: emp.pf   },
                        { label: 'ESI',                  val: emp.esi  },
                        { label: 'Income Tax (TDS)',      val: emp.tds  },
                        { label: 'Professional Tax',      val: emp.pt   },
                    ].map((r, i) => (
                        <div key={i} className={`${rowClass} px-3 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'}`}>
                            <span className={labelClass}>{r.label}</span>
                            <span className="text-red-500 font-bold text-sm">− {r.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Net salary */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${isDarkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-200'}`}>
                <div>
                    <p className={`text-xs font-bold uppercase ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>Net Salary (Take Home)</p>
                    <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>After all deductions</p>
                </div>
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{emp.net}</span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95">
                    <Download size={13} /> Download PDF
                </button>
                <button className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-emerald-400 hover:bg-white/10' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                    <Mail size={13} /> Email
                </button>
                <button className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    <Printer size={13} />
                </button>
            </div>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function SalarySlips() {
    const { isDarkMode } = useTheme();
    const [selectedEmp,   setSelectedEmp]   = useState(null);
    const [searchQuery,   setSearchQuery]   = useState('');
    const [deptFilter,    setDeptFilter]    = useState('All');
    const [monthFilter,   setMonthFilter]   = useState('March 2026');
    const [empTypeFilter, setEmpTypeFilter] = useState('All');
    const [statusFilter,  setStatusFilter]  = useState('All');
    const [sortKey,       setSortKey]       = useState(null);
    const [sortAsc,       setSortAsc]       = useState(true);
    const [currentPage,   setCurrentPage]   = useState(1);
    const rowsPerPage = 5;

    const card        = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeader  = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const heading     = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const muted       = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const divider     = isDarkMode ? 'border-white/5' : 'border-borderColor';
    const inputBase   = `w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/20' : 'bg-gray-50 border-borderColor text-dark focus:border-blue-500/50 focus:ring-blue-500/20'}`;

    const handleSort = k => { if (sortKey === k) setSortAsc(a => !a); else { setSortKey(k); setSortAsc(true); } setCurrentPage(1); };

    const filtered = payslips
        .filter(p => {
            const q = searchQuery.toLowerCase();
            return (p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.dept.toLowerCase().includes(q))
                && (deptFilter   === 'All' || p.dept   === deptFilter)
                && (statusFilter === 'All' || p.status === statusFilter);
        })
        .sort((a, b) => {
            if (!sortKey) return 0;
            return sortAsc ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1);
        });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated  = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const SelectField = ({ label, opts, val, onChange }) => (
        <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${muted}`}>{label}</label>
            <div className="relative">
                <select value={val} onChange={e => onChange(e.target.value)} className={inputBase}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={13} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${muted}`} />
            </div>
        </div>
    );

    const SortTh = ({ label, k }) => (
        <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer select-none group" onClick={() => k && handleSort(k)}>
            <span className="flex items-center gap-1">
                {label}
                {k && <ArrowUpDown size={11} className={`transition-opacity ${sortKey === k ? 'opacity-100 text-blue-500' : 'opacity-0 group-hover:opacity-50'}`} />}
            </span>
        </th>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Module Title ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <FileText size={20} className="text-blue-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Salary Slips</h1>
                        <p className={`text-xs mt-0.5 ${muted}`}>Generate, preview, download and manage employee payslips</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Bulk Download
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95">
                        <RefreshCw size={15} /> Generate Payslips
                    </button>
                </div>
            </div>

            {/* ── 2. Month Selector ────────────────────────────────────────── */}
            <div className={`${card} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={15} className="text-blue-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Payroll Month Selector</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <SelectField label="Payroll Month"  opts={MONTHS}      val={monthFilter}   onChange={setMonthFilter}   />
                    <SelectField label="Department"     opts={DEPARTMENTS} val={deptFilter}    onChange={v => { setDeptFilter(v); setCurrentPage(1); }} />
                    <SelectField label="Employee Type"  opts={EMP_TYPES}   val={empTypeFilter} onChange={setEmpTypeFilter} />
                </div>
            </div>

            {/* ── 3. Workspace: Payslip List + Preview ─────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ── Employee Payslip List ──────────────────────────────────── */}
                <div className={`${card} flex flex-col`}>
                    <div className={cardHeader}>
                        <h3 className={heading}>Employee Payslips</h3>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'}`}>{filtered.length} payslips</span>
                    </div>

                    {/* Search + filter */}
                    <div className={`px-4 py-3 flex flex-col sm:flex-row gap-3 border-b ${divider}`}>
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:ring-blue-500/20 focus:border-blue-500/50' : 'bg-gray-50 border-borderColor focus:ring-blue-500/20 focus:border-blue-500/50'}`}
                            />
                            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`} />
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {STATUSES.map(s => (
                                <button key={s} onClick={() => { setStatusFilter(s); setCurrentPage(1); }}
                                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${statusFilter === s
                                        ? s === 'Generated' ? 'bg-emerald-500 text-white' : s === 'Sent' ? 'bg-blue-500 text-white' : s === 'Pending' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white'
                                        : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}>{s}</button>
                            ))}
                        </div>
                    </div>

                    {/* Payslip cards */}
                    <div className="p-3 flex flex-col gap-2 flex-1 overflow-auto">
                        {paginated.length > 0 ? paginated.map((emp, i) => (
                            <div
                                key={i}
                                onClick={() => setSelectedEmp(selectedEmp?.id === emp.id ? null : emp)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex items-center gap-3 ${
                                    selectedEmp?.id === emp.id
                                        ? isDarkMode ? 'bg-blue-500/10 border-blue-500/40' : 'bg-blue-50 border-blue-300'
                                        : isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white border-gray-100 hover:border-gray-200'
                                }`}
                            >
                                {/* Avatar */}
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                                    {emp.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className={`text-sm font-bold truncate ${isDarkMode ? 'text-white' : 'text-dark'}`}>{emp.name}</p>
                                        <span className={`shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold border ${STATUS_STYLE[emp.status]}`}>{emp.status}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className={`text-xs truncate ${muted}`}>{emp.id} · {emp.dept}</p>
                                        <p className="text-xs font-bold text-emerald-500 shrink-0">{emp.net}</p>
                                    </div>
                                    <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>{emp.month}</p>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                                    <button title="Preview" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-500 hover:text-blue-400 hover:bg-white/5' : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50'}`}>
                                        <Eye size={14} />
                                    </button>
                                    <button title="Download" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-500 hover:text-emerald-400 hover:bg-white/5' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                                        <Download size={14} />
                                    </button>
                                    <button title="Send" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-500 hover:text-amber-400 hover:bg-white/5' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}>
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <p className={`text-center py-8 text-sm ${muted}`}>No payslips found</p>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={`flex items-center justify-between px-5 py-3 text-sm border-t ${divider} ${muted}`}>
                            <span>Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length}</span>
                            <div className="flex gap-1.5">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                                ))}
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Next</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Payslip Preview ────────────────────────────────────────── */}
                <div className={`${card} flex flex-col`}>
                    <div className={cardHeader}>
                        <div className="flex items-center gap-2">
                            <Eye size={18} className="text-blue-500" />
                            <h3 className={heading}>Payslip Preview</h3>
                        </div>
                        {selectedEmp && (
                            <span className={`text-xs font-semibold ${muted}`}>{selectedEmp.name}</span>
                        )}
                    </div>
                    <div className="p-4 flex-1 overflow-auto">
                        <PayslipDoc emp={selectedEmp} isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>

            {/* ── 4. Payroll History + Activity ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Payslip History */}
                <div className={`lg:col-span-2 ${card} flex flex-col`}>
                    <div className={cardHeader}>
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} className="text-violet-500" />
                            <h3 className={heading}>Payslip History</h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[500px]">
                            <thead>
                                <tr className={`border-b text-xs font-semibold uppercase text-gray-500 ${divider}`}>
                                    <th className="p-4">Payroll Month</th>
                                    <th className="p-4 text-center">Total Employees</th>
                                    <th className="p-4 text-center">Generated</th>
                                    <th className="p-4 text-center">Pending</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {payrollHistory.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-borderColor hover:bg-gray-50'}`}>
                                        <td className="p-4">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.month}</p>
                                        </td>
                                        <td className={`p-4 text-center font-semibold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{row.total}</td>
                                        <td className="p-4 text-center text-emerald-500 font-bold">{row.generated}</td>
                                        <td className={`p-4 text-center font-bold ${row.pending > 0 ? 'text-amber-500' : isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{row.pending}</td>
                                        <td className="p-4">
                                            <button className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                                                row.done
                                                    ? isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    : 'bg-blue-500 text-white hover:bg-blue-600'
                                            }`}>
                                                {row.done ? 'View' : 'Generate'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className={`${card} flex flex-col p-5`}>
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Activity size={18} className="text-blue-500" />
                            <h3 className={heading}>Recent Activity</h3>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {activityFeed.map((act, i) => (
                            <div key={i} className="flex gap-3 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={15} className={act.color} />
                                </div>
                                <div className="pt-1 min-w-0">
                                    <p className={`text-[12px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className={`text-[10px] mt-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}><Clock size={10}/> {act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 5. Quick Actions ──────────────────────────────────────────── */}
            <div className={`${card} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center">
                        <Settings size={15} className="text-violet-500" />
                    </div>
                    <h3 className={heading}>Quick Payroll Actions</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Generate All Payslips',       icon: RefreshCw,   color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
                        { label: 'Email Payslips to Employees',  icon: Mail,        color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { label: 'Download Payroll Sheet',       icon: Download,    color: 'text-violet-500',  bg: 'bg-violet-500/10'  },
                        { label: 'View Payroll Reports',         icon: BarChart3,   color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
                    ].map((btn, i) => (
                        <button key={i} className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}>
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${btn.bg}`}>
                                <btn.icon size={22} className={btn.color} />
                            </div>
                            <span className="text-xs font-bold leading-tight">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Footer ───────────────────────────────────────────────────── */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
