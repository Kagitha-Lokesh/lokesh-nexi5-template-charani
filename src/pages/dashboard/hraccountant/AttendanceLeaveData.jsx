import { useState, useEffect, useRef } from 'react';
import {
    ClipboardCheck, RefreshCw, Download, Search, Eye, Edit2,
    CheckCircle2, Clock, AlertTriangle, XCircle, ChevronDown,
    ArrowUpDown, Filter, Send, CalendarDays, Users, Shield,
    TrendingUp, Activity, X, Info
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { 
    attendanceRows, 
    leaveAdjustments, 
    attendanceIssues,
    ATT_DEPARTMENTS as DEPARTMENTS, 
    ATT_MONTHS as MONTHS,
    ATT_EMP_TYPES as EMP_TYPES, 
    ATT_STATUS as STATUS, 
    ATT_LEAVE_STATUS as LEAVE_STATUS
} from '@/datasets/hraccountant/attendanceLeaveData';





// ─── Animated Count ───────────────────────────────────────────────────────────

function useCount(target, duration = 1200) {
    const [val, setVal] = useState(0);
    const raf = useRef(null);
    useEffect(() => {
        let cur = 0;
        const step = target / (duration / 16);
        const tick = () => {
            cur += step;
            if (cur < target) { setVal(Math.floor(cur)); raf.current = requestAnimationFrame(tick); }
            else setVal(target);
        };
        raf.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf.current);
    }, [target, duration]);
    return val;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }) {
    const map = {
        Verified: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        Pending:  'bg-amber-500/10  text-amber-500  border-amber-500/20',
        Missing:  'bg-red-500/10    text-red-500    border-red-500/20',
        Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        Rejected: 'bg-red-500/10    text-red-500    border-red-500/20',
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${map[status] || 'bg-gray-500/10 text-gray-500 border-gray-200'}`}>
            {status}
        </span>
    );
}

function IssueAlert({ issue, isDarkMode }) {
    const styles = {
        error:   { border: 'border-red-500',    bg: isDarkMode ? 'bg-red-500/10'    : 'bg-red-50',    icon: XCircle,       iconColor: 'text-red-500'   },
        warning: { border: 'border-amber-500',  bg: isDarkMode ? 'bg-amber-500/10'  : 'bg-amber-50',  icon: AlertTriangle, iconColor: 'text-amber-500' },
        info:    { border: 'border-blue-500',   bg: isDarkMode ? 'bg-blue-500/10'   : 'bg-blue-50',   icon: Info,          iconColor: 'text-blue-500'  },
    };
    const s = styles[issue.type] || styles.info;
    return (
        <div className={`border-l-4 ${s.border} ${s.bg} px-4 py-3 rounded-r-xl flex items-start gap-3`}>
            <s.icon size={16} className={`${s.iconColor} mt-0.5 shrink-0`} />
            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{issue.msg}</p>
        </div>
    );
}

function FilterSelect({ label, options, value, onChange, isDarkMode }) {
    const base = `w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm font-medium border transition-all focus:outline-none focus:ring-2 ${
        isDarkMode
            ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50 focus:ring-blue-500/20'
            : 'bg-gray-50 border-borderColor text-dark focus:border-blue-500/50 focus:ring-blue-500/20'
    }`;
    return (
        <div className="flex flex-col gap-1.5">
            <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{label}</label>
            <div className="relative">
                <select value={value} onChange={e => onChange(e.target.value)} className={base}>
                    {options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={13} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
        </div>
    );
}

function VerifyCard({ icon: Icon, color, bg, label, target, isDarkMode }) {
    const count = useCount(target);
    return (
        <div className={`p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                <Icon size={26} style={{ color }} />
            </div>
            <div>
                <p className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{count}</p>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{label}</p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AttendanceLeaveData() {
    const { isDarkMode } = useTheme();

    const [searchQuery,    setSearchQuery]    = useState('');
    const [deptFilter,     setDeptFilter]     = useState('All');
    const [monthFilter,    setMonthFilter]    = useState('March 2026');
    const [empTypeFilter,  setEmpTypeFilter]  = useState('All');
    const [attStatusFilter,setAttStatusFilter]= useState('All');
    const [leaveFilter,    setLeaveFilter]    = useState('All');
    const [sortKey,        setSortKey]        = useState(null);
    const [sortAsc,        setSortAsc]        = useState(true);
    const [currentPage,    setCurrentPage]    = useState(1);
    const [selectedImpact, setSelectedImpact] = useState(null);
    const rowsPerPage = 5;

    const cardClass      = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass= `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass   = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const muted          = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const dividerClass   = isDarkMode ? 'border-white/5' : 'border-borderColor';

    const handleSort = key => {
        if (sortKey === key) setSortAsc(a => !a);
        else { setSortKey(key); setSortAsc(true); }
        setCurrentPage(1);
    };

    const filtered = attendanceRows
        .filter(r => {
            const q  = searchQuery.toLowerCase();
            const ok = r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q) || r.dept.toLowerCase().includes(q);
            const d  = deptFilter      === 'All' || r.dept   === deptFilter;
            const s  = attStatusFilter === 'All' || r.status === attStatusFilter;
            return ok && d && s;
        })
        .sort((a, b) => {
            if (!sortKey) return 0;
            return sortAsc ? (a[sortKey] > b[sortKey] ? 1 : -1) : (a[sortKey] < b[sortKey] ? 1 : -1);
        });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated  = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    // Selected row for payroll impact
    const previewRow = selectedImpact || attendanceRows[0];
    const adjustedSalary = 85000 - (previewRow.absent * 3864) + (previewRow.ot === '—' ? 0 : 1200 * parseInt(previewRow.ot));

    const SortTh = ({ label, k }) => (
        <th
            className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap cursor-pointer select-none group"
            onClick={() => k && handleSort(k)}
        >
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
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                        <ClipboardCheck size={20} className="text-emerald-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            Attendance &amp; Leave Data
                        </h1>
                        <p className={`text-xs mt-0.5 ${muted}`}>Verify records and leave data before payroll processing</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95">
                        <RefreshCw size={15} /> Sync Attendance
                    </button>
                </div>
            </div>

            {/* ── 2. Attendance Data Filters ────────────────────────────────── */}
            <div className={`${cardClass} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={15} className="text-emerald-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Attendance Data Filters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <FilterSelect label="Payroll Month"      options={MONTHS}      value={monthFilter}     onChange={setMonthFilter}     isDarkMode={isDarkMode} />
                    <FilterSelect label="Department"         options={DEPARTMENTS} value={deptFilter}      onChange={v => { setDeptFilter(v); setCurrentPage(1); }} isDarkMode={isDarkMode} />
                    <FilterSelect label="Employee Type"      options={EMP_TYPES}   value={empTypeFilter}   onChange={setEmpTypeFilter}   isDarkMode={isDarkMode} />
                    <FilterSelect label="Attendance Status"  options={STATUS}  value={attStatusFilter} onChange={v => { setAttStatusFilter(v); setCurrentPage(1); }} isDarkMode={isDarkMode} />
                    <FilterSelect label="Leave Status"       options={LEAVE_STATUS}value={leaveFilter}     onChange={setLeaveFilter}     isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* ── 3. Verification Cards ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <VerifyCard icon={Users}         color="#38BDF8" bg="bg-blue-500/10"    label="Total Employees"          target={145} isDarkMode={isDarkMode} />
                <VerifyCard icon={CheckCircle2}  color="#10B981" bg="bg-emerald-500/10" label="Attendance Records Verified" target={130} isDarkMode={isDarkMode} />
                <VerifyCard icon={Clock}         color="#F59E0B" bg="bg-amber-500/10"   label="Records Pending Verification" target={15} isDarkMode={isDarkMode} />
            </div>

            {/* ── 4. Attendance Table + Payroll Impact ──────────────────────── */}
            <div className={`grid gap-6 ${selectedImpact ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'}`}>

                {/* Table */}
                <div className={`${cardClass} flex flex-col pb-4 ${selectedImpact ? 'xl:col-span-2' : ''}`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Employee Attendance Records</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>

                    {/* Search + quick filter */}
                    <div className={`px-5 py-4 flex flex-col sm:flex-row gap-3 border-b ${dividerClass}`}>
                        <div className="relative flex-1 max-w-72">
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${
                                    isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:ring-emerald-500/20'
                                        : 'bg-lightBlueBg border-borderColor text-dark focus:border-emerald-500/50 focus:ring-emerald-500/20'
                                }`}
                            />
                            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${muted}`} />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {['All', 'Verified', 'Pending', 'Missing'].map(s => (
                                <button
                                    key={s}
                                    onClick={() => { setAttStatusFilter(s); setCurrentPage(1); }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                        attStatusFilter === s
                                            ? s === 'Verified' ? 'bg-emerald-500 text-white'
                                              : s === 'Missing' ? 'bg-red-500 text-white'
                                              : s === 'Pending' ? 'bg-amber-500 text-white'
                                              : 'bg-blue-500 text-white'
                                            : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                        <button className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <Download size={13} /> Export CSV
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className={`border-b ${dividerClass}`}>
                                    <SortTh label="Employee ID"   k="id"      />
                                    <SortTh label="Employee Name" k="name"    />
                                    <SortTh label="Department"    k="dept"    />
                                    <SortTh label="Working"       k="working" />
                                    <SortTh label="Present"       k="present" />
                                    <SortTh label="Leave"         k="leave"   />
                                    <SortTh label="Absent"        k="absent"  />
                                    <SortTh label="Overtime"                  />
                                    <SortTh label="Status"        k="status"  />
                                    <th className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.length > 0 ? paginated.map((row, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => setSelectedImpact(selectedImpact?.id === row.id ? null : row)}
                                        className={`border-b last:border-0 cursor-pointer transition-colors ${
                                            selectedImpact?.id === row.id
                                                ? isDarkMode ? 'bg-emerald-500/5' : 'bg-emerald-50'
                                                : isDarkMode ? `border-white/5 hover:bg-white/[0.02]` : `border-borderColor hover:bg-gray-50`
                                        }`}
                                    >
                                        <td className={`p-4 font-mono text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</td>
                                        <td className={`p-4 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                        <td className={`p-4 ${muted}`}>{row.dept}</td>
                                        <td className={`p-4 text-center font-semibold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{row.working}</td>
                                        <td className="p-4 text-center text-emerald-500 font-bold">{row.present}</td>
                                        <td className="p-4 text-center text-blue-500 font-semibold">{row.leave}</td>
                                        <td className="p-4 text-center text-red-500 font-semibold">{row.absent}</td>
                                        <td className={`p-4 text-center font-medium text-amber-500`}>{row.ot}</td>
                                        <td className="p-4"><StatusBadge status={row.status} /></td>
                                        <td className="p-4" onClick={e => e.stopPropagation()}>
                                            <div className="flex items-center gap-1">
                                                <button title="View Details"       className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-gray-400 hover:text-primary hover:bg-lightSky'}`}><Eye size={14} /></button>
                                                <button title="Adjust Attendance"  className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-amber-400 hover:bg-white/5' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}><Edit2 size={14} /></button>
                                                <button title="Verify Record"      className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-emerald-400 hover:bg-white/5' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}><Shield size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="10" className={`py-10 text-center text-sm ${muted}`}>No records found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className={`flex items-center justify-between px-5 pt-4 text-sm ${muted}`}>
                            <span>Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length}</span>
                            <div className="flex gap-2">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Prev</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                    <button key={p} onClick={() => setCurrentPage(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === p ? 'bg-emerald-500 text-white' : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>{p}</button>
                                ))}
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className={`px-3 py-1.5 rounded-lg text-xs font-semibold disabled:opacity-40 transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}>Next</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Payroll Impact Preview (slides in when a row is selected) */}
                {selectedImpact && (
                    <div className={`${cardClass} flex flex-col`}>
                        <div className={cardHeaderClass}>
                            <div>
                                <h3 className={headingClass}>Payroll Impact Preview</h3>
                                <p className={`text-xs mt-0.5 ${muted}`}>{previewRow.name} · {previewRow.dept}</p>
                            </div>
                            <button onClick={() => setSelectedImpact(null)} className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-gray-500 hover:text-white hover:bg-white/5' : 'text-gray-400 hover:text-dark hover:bg-gray-100'}`}>
                                <X size={16} />
                            </button>
                        </div>
                        <div className="p-5 flex flex-col gap-3">
                            {[
                                { label: 'Working Days',   val: previewRow.working, color: isDarkMode ? 'text-gray-200' : 'text-dark' },
                                { label: 'Present Days',   val: previewRow.present, color: 'text-emerald-500' },
                                { label: 'Leave Days',     val: previewRow.leave,   color: 'text-blue-500' },
                                { label: 'Absent Days',    val: previewRow.absent,  color: 'text-red-500' },
                                { label: 'Overtime',       val: previewRow.ot,      color: 'text-amber-500' },
                            ].map((f, i) => (
                                <div key={i} className={`flex justify-between items-center py-2.5 border-b last:border-0 ${dividerClass}`}>
                                    <span className={`text-sm ${muted}`}>{f.label}</span>
                                    <span className={`text-sm font-bold ${f.color}`}>{f.val}</span>
                                </div>
                            ))}

                            <div className={`p-4 rounded-xl border flex items-center justify-between mt-2 ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                                <div>
                                    <p className={`text-xs font-semibold uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Adjusted Monthly Salary</p>
                                    <p className={`text-[10px] ${muted}`}>After leave & absent deductions</p>
                                </div>
                                <span className="text-xl font-bold text-emerald-500">
                                    ₹{adjustedSalary.toLocaleString('en-IN')}
                                </span>
                            </div>

                            <div className="flex flex-col gap-2 mt-1">
                                <button className="w-full py-2 rounded-lg text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95">
                                    Verify Record
                                </button>
                                <button className={`w-full py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-amber-400 hover:bg-white/10' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>
                                    Adjust Attendance
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 5. Leave Adjustments + Attendance Issues ──────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Leave Adjustments Panel */}
                <div className={`lg:col-span-2 ${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <CalendarDays size={18} className="text-blue-500" />
                            <h3 className={headingClass}>Leave Adjustments</h3>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-50 text-amber-700'}`}>
                            {leaveAdjustments.filter(l => l.status === 'Pending').length} Pending
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                            <thead>
                                <tr className={`border-b text-xs font-semibold uppercase text-gray-500 ${dividerClass}`}>
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Leave Type</th>
                                    <th className="p-4 text-center">Days</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Payroll Impact</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {leaveAdjustments.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-borderColor hover:bg-gray-50'}`}>
                                        <td className="p-4">
                                            <p className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</p>
                                            <p className={`text-xs ${muted}`}>{row.dept}</p>
                                        </td>
                                        <td className={`p-4 text-sm ${muted}`}>{row.type}</td>
                                        <td className={`p-4 text-center font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.days}</td>
                                        <td className="p-4"><StatusBadge status={row.status} /></td>
                                        <td className={`p-4 text-sm font-semibold ${row.impactColor}`}>{row.impact}</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <button className={`p-1.5 rounded-md text-xs transition-all ${isDarkMode ? 'text-emerald-400 hover:bg-white/5' : 'text-emerald-500 hover:bg-emerald-50'}`} title="Approve"><CheckCircle2 size={14} /></button>
                                                <button className={`p-1.5 rounded-md text-xs transition-all ${isDarkMode ? 'text-red-400 hover:bg-white/5' : 'text-red-500 hover:bg-red-50'}`} title="Reject"><XCircle size={14} /></button>
                                                <button className={`p-1.5 rounded-md text-xs transition-all ${isDarkMode ? 'text-amber-400 hover:bg-white/5' : 'text-amber-500 hover:bg-amber-50'}`} title="Adjust Days"><Edit2 size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Attendance Issues Panel */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={cardHeaderClass}>
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={18} className="text-amber-500" />
                            <h3 className={headingClass}>Attendance Issues</h3>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-700'}`}>
                            {attendanceIssues.filter(i => i.type === 'error').length} Errors
                        </span>
                    </div>
                    <div className="p-4 flex flex-col gap-3">
                        {attendanceIssues.map((issue, i) => (
                            <IssueAlert key={i} issue={issue} isDarkMode={isDarkMode} />
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 6. Quick Payroll Actions ──────────────────────────────────── */}
            <div className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <TrendingUp size={15} className="text-blue-500" />
                    </div>
                    <h3 className={headingClass}>Quick Payroll Actions</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'Verify All Records',      icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                        { label: 'Apply Leave Adjustments', icon: CalendarDays, color: 'text-blue-500',    bg: 'bg-blue-500/10'    },
                        { label: 'Update Payroll Days',     icon: RefreshCw,    color: 'text-violet-500',  bg: 'bg-violet-500/10'  },
                        { label: 'Send Attendance Report',  icon: Send,         color: 'text-amber-500',   bg: 'bg-amber-500/10'   },
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

            {/* ── Footer ────────────────────────────────────────────────────── */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
