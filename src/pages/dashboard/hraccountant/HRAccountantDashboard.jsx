import { useState, useEffect, useRef } from 'react';
import {
    DollarSign, FileText, Clock, CheckCircle2, AlertTriangle,
    TrendingUp, Download, Filter, Search, ChevronRight,
    Settings, Activity, BarChart3, PieChart as PieIcon,
    CreditCard, RefreshCw, Eye, XCircle, Users, ArrowUpRight
} from 'lucide-react';
import {
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend,
    LineChart, Line, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

// Datasets
import { 
    hrAccountantStatsCards as statsCards,
    salaryDistribution, 
    monthlyPayrollTrend, 
    taxCompliance,
    payrollActivity,
    reimbursements,
    hrAccountantQuickActions as quickActions,
    financialActivities
} from '@/datasets/hraccountant/hraccountantDashboardData';


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
        Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        Pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        Failed: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return (
        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase border ${styles[status] || 'bg-gray-500/10 text-gray-500'}`}>
            {status}
        </span>
    );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs font-semibold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.value}{entry.unit || ''}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ stat, isDarkMode, onClick }) {
    const count = useAnimatedCount(stat.value);
    return (
        <div 
            onClick={onClick}
            className={`p-6 rounded-xl border flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}
        >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bgColor}`}>
                <stat.icon size={26} style={{ color: stat.color }} />
            </div>
            <div>
                <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{count}</h3>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.label}</p>
                <p className={`text-xs font-semibold mt-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{stat.title}</p>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function HRAccountantDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [deptFilter, setDeptFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;

    const cardClass = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const cardHeaderClass = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass = `font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const textMuted = isDarkMode ? 'text-gray-400' : 'text-textSecondary';

    const departments = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];

    const filteredPayroll = payrollActivity.filter(row => {
        const matchesSearch = row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.dept.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDept = deptFilter === 'All' || row.dept === deptFilter;
        return matchesSearch && matchesDept;
    });

    const totalPages = Math.ceil(filteredPayroll.length / rowsPerPage);
    const paginatedPayroll = filteredPayroll.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Dashboard Title Banner ─────────────────────────────────── */}
            <div className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border transition-all hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 bg-emerald-500/10">
                        <DollarSign size={28} className="text-emerald-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            HR Accountant Dashboard
                        </h1>
                        <p className={`text-sm ${textMuted}`}>
                            Manage payroll, tax compliance, salary reports, and financial insights.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-all active:scale-95 flex items-center gap-2 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}
                    >
                        <Download size={16} /> Generate Payroll Report
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/payroll')}
                        className={`px-5 py-2.5 rounded-lg font-medium text-sm text-white transition-all active:scale-95 flex items-center gap-2 ${isDarkMode ? 'bg-emerald-500 hover:bg-emerald-500/90 text-white font-bold' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                    >
                        <DollarSign size={16} /> Process Payroll
                    </button>
                </div>
            </div>

            {/* ── 2. Payroll Processing Overview Cards ─────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, idx) => (
                    <StatCard key={idx} stat={stat} isDarkMode={isDarkMode} onClick={() => navigate(stat.path)} />
                ))}
            </div>

            {/* ── 3. Salary Distribution Charts ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Salary Distribution Donut */}
                <div className={`${cardClass} flex flex-col h-[400px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Salary Distribution by Department</h3>
                        <PieIcon size={20} className="text-blue-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={salaryDistribution}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={68}
                                    outerRadius={108}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={1200}
                                    nameKey="name"
                                >
                                    {salaryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={<CustomTooltip isDarkMode={isDarkMode} />}
                                    formatter={(value) => [`₹${value}L`, 'Salary']}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    wrapperStyle={{ fontSize: '11px', fontWeight: 600 }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Payroll Trend Line Chart */}
                <div className={`${cardClass} flex flex-col h-[400px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Monthly Payroll Trend</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyPayrollTrend}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} unit="L" width={44} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} formatter={(v) => [`₹${v}L`, 'Payroll']} />
                                <Line
                                    type="monotone"
                                    dataKey="amount"
                                    name="Payroll"
                                    stroke={isDarkMode ? '#10B981' : '#059669'}
                                    strokeWidth={3}
                                    dot={{ r: 5, fill: isDarkMode ? '#10B981' : '#059669' }}
                                    activeDot={{ r: 7 }}
                                    isAnimationActive
                                    animationDuration={1200}
                                />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── 4. Payroll Activity Table ─────────────────────────────────── */}
            <div className={`${cardClass} flex flex-col pb-4`}>
                <div className={cardHeaderClass}>
                    <h3 className={headingClass}>Recent Payroll Processing</h3>
                    <Activity size={20} className="text-emerald-500" />
                </div>

                {/* Search + Filter Bar */}
                <div className={`px-5 py-4 flex flex-col sm:flex-row gap-3 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <div className="relative flex-1 max-w-72">
                        <input
                            type="text"
                            placeholder="Search payroll records..."
                            value={searchQuery}
                            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                            className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border ${isDarkMode
                                ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-emerald-500/50 focus:ring-emerald-500/20'
                                : 'bg-lightBlueBg border-borderColor text-textPrimary focus:border-emerald-600/50 focus:ring-emerald-500/20'
                            }`}
                        />
                        <Search size={15} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {departments.map(dept => (
                            <button
                                key={dept}
                                onClick={() => { setDeptFilter(dept); setCurrentPage(1); }}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${deptFilter === dept
                                    ? 'bg-emerald-500 text-white'
                                    : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {dept}
                            </button>
                        ))}
                    </div>
                    <button className={`ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                        <Download size={14} /> Export
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                {['Payroll ID', 'Employee Name', 'Department', 'Salary', 'Deductions', 'Net Pay', 'Status', 'Actions'].map(col => (
                                    <th key={col} className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {paginatedPayroll.length > 0 ? paginatedPayroll.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className={`p-4 font-mono text-xs font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</td>
                                    <td className={`p-4 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                    <td className={`p-4 ${textMuted}`}>{row.dept}</td>
                                    <td className={`p-4 font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.salary}</td>
                                    <td className="p-4 text-red-500 font-medium">{row.deductions}</td>
                                    <td className="p-4 text-emerald-500 font-bold">{row.netPay}</td>
                                    <td className="p-4"><StatusBadge status={row.status} /></td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1">
                                            <button title="View Payslip" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-gray-400 hover:text-primary hover:bg-lightSky'}`}>
                                                <Eye size={15} />
                                            </button>
                                            <button title="Recalculate Salary" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-amber-400 hover:bg-white/5' : 'text-gray-400 hover:text-amber-500 hover:bg-amber-50'}`}>
                                                <RefreshCw size={15} />
                                            </button>
                                            <button title="Approve Payroll" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-emerald-400 hover:bg-white/5' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                                                <CheckCircle2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="8" className={`py-10 text-center text-sm ${textMuted}`}>
                                        No payroll records found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className={`flex items-center justify-between px-5 pt-4 text-sm ${textMuted}`}>
                        <span>Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filteredPayroll.length)}–{Math.min(currentPage * rowsPerPage, filteredPayroll.length)} of {filteredPayroll.length}</span>
                        <div className="flex gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >Prev</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                <button
                                    key={p}
                                    onClick={() => setCurrentPage(p)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${currentPage === p
                                        ? 'bg-emerald-500 text-white'
                                        : isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'
                                    }`}
                                >{p}</button>
                            ))}
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-gray-100 hover:bg-gray-200'}`}
                            >Next</button>
                        </div>
                    </div>
                )}
            </div>

            {/* ── 5. Reimbursement Requests + Tax Compliance ───────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Reimbursement Panel (spans 2 cols) */}
                <div className={`lg:col-span-2 ${cardClass} flex flex-col pb-4`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Employee Reimbursements</h3>
                        <CreditCard size={20} className="text-violet-500" />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                    {['Employee Name', 'Department', 'Expense Type', 'Amount', 'Request Date', 'Status', 'Actions'].map(col => (
                                        <th key={col} className="p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {reimbursements.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                        <td className={`p-4 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                        <td className={`p-4 ${textMuted}`}>{row.dept}</td>
                                        <td className={`p-4 font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{row.type}</td>
                                        <td className="p-4 text-emerald-500 font-bold">{row.amount}</td>
                                        <td className={`p-4 font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.date}</td>
                                        <td className="p-4"><StatusBadge status={row.status} /></td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1">
                                                <button title="Approve" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-emerald-400 hover:bg-white/5' : 'text-gray-400 hover:text-emerald-500 hover:bg-emerald-50'}`}>
                                                    <CheckCircle2 size={15} />
                                                </button>
                                                <button title="Reject" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-white/5' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'}`}>
                                                    <XCircle size={15} />
                                                </button>
                                                <button title="View Details" className={`p-1.5 rounded-md transition-all ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-gray-400 hover:text-primary hover:bg-lightSky'}`}>
                                                    <Eye size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tax Compliance Donut */}
                <div className={`${cardClass} flex flex-col h-[400px]`}>
                    <div className={cardHeaderClass}>
                        <h3 className={headingClass}>Tax Compliance Status</h3>
                        <FileText size={20} className="text-amber-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={taxCompliance}
                                    cx="50%"
                                    cy="42%"
                                    innerRadius={62}
                                    outerRadius={95}
                                    paddingAngle={4}
                                    dataKey="value"
                                    isAnimationActive
                                    animationDuration={1200}
                                >
                                    {taxCompliance.map((entry, index) => (
                                        <Cell key={`tax-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    content={<CustomTooltip isDarkMode={isDarkMode} />}
                                    formatter={(v) => [`${v}%`, '']}
                                />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* ── 6. Financial Activity Timeline + Quick Actions ─────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Financial Activity Timeline (spans 1 col) */}
                <div className={`p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Recent Financial Activity</h3>
                        <Activity size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-4 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {financialActivities.map((act, i) => (
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

                {/* Quick Financial Actions (spans 2 cols) */}
                <div className={`lg:col-span-2 p-6 ${cardClass} flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={headingClass}>Quick Financial Actions</h3>
                        <Settings size={20} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {quickActions.map((btn, i) => (
                            <button
                                key={i}
                                onClick={() => navigate(btn.path)}
                                className={`flex flex-col items-center gap-3 p-4 rounded-xl border text-center transition-all text-sm font-bold active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}
                            >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${btn.bgColor}`}>
                                    <btn.icon size={22} className={btn.color} />
                                </div>
                                <span className="leading-tight text-xs">{btn.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Download Salary Sheets CTA */}
                    <div className={`mt-6 p-4 rounded-xl border border-dashed flex items-center justify-between gap-4 ${isDarkMode ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-emerald-50 border-emerald-500/30'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                                <Download size={18} className="text-emerald-500" />
                            </div>
                            <div>
                                <p className={`text-sm font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Download Salary Sheets</p>
                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Export complete payroll data in XLSX / PDF</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-lg hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-1 whitespace-nowrap">
                            Download <ArrowUpRight size={13} />
                        </button>
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
