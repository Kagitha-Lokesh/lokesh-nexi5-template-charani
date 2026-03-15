import { useState, useEffect } from 'react';
import {
    Wallet, Receipt, Filter, Search, ChevronDown, Eye, CheckCircle2,
    XCircle, Clock, CreditCard, Activity, Download, Send, RefreshCw,
    Plane, Stethoscope, Utensils, Briefcase, GraduationCap, MapPin,
    ArrowUpRight, AlertCircle, Info, FileText
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
    reimbursementCategories as categories, reimbursementClaims as claims,
    reimbursementPaymentTracker as paymentTracker, reimbursementActivityFeed as activityFeed,
    REIMB_STATUS_STYLE as STATUS_STYLE, REIMB_DEPARTMENTS as DEPARTMENTS,
    REIMB_CATEGORIES as CATS, REIMB_STATUSES as STATUSES
} from '@/datasets/hraccountant/reimbursementsData';


// ─── Sub-components ───────────────────────────────────────────────────────────

function ReceiptPreview({ claim, isDarkMode }) {
    if (!claim) return (
        <div className={`flex flex-col items-center justify-center h-full min-h-64 gap-3 ${isDarkMode ? 'text-gray-600' : 'text-gray-300'}`}>
            <Receipt size={48} />
            <p className="text-sm font-medium">Select a claim to preview receipt</p>
        </div>
    );

    return (
        <div className={`rounded-xl border p-5 space-y-4 shadow-inner ${isDarkMode ? 'bg-[#080f1f] border-white/10' : 'bg-gray-50 border-gray-200'}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Expense Receipt</h3>
                <span className={`px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${STATUS_STYLE[claim.status]}`}>{claim.status}</span>
            </div>

            {/* Placeholder for receipt image */}
            <div className={`aspect-[4/3] rounded-lg border-2 border-dashed flex flex-col items-center justify-center gap-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-600' : 'bg-white border-gray-200 text-gray-300'}`}>
                <FileText size={40} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Receipt_Image_{claim.id}.jpg</p>
            </div>

            <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Amount</p>
                        <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{claim.amt}</p>
                    </div>
                    <div>
                        <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Merchant</p>
                        <p className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{claim.merchant}</p>
                    </div>
                </div>
                <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Description</p>
                    <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{claim.desc}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2">
                    <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all active:scale-95">Approve</button>
                    <button className="flex-1 py-2 rounded-lg text-xs font-bold text-white bg-red-500 hover:bg-red-600 transition-all active:scale-95">Reject</button>
                </div>
                <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-amber-400 hover:bg-white/10' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>Request Clarification</button>
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Reimbursements() {
    const { isDarkMode } = useTheme();
    const [selectedClaim, setSelectedClaim] = useState(null);
    const [searchQuery,   setSearchQuery]   = useState('');
    const [statusFilter,  setStatusFilter]  = useState('All');
    const [catFilter,     setCatFilter]     = useState('All');
    const [deptFilter,    setDeptFilter]    = useState('All');
    const [currentPage,   setCurrentPage]   = useState(1);
    const rowsPerPage = 5;

    const card      = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const head      = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const heading   = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const muted     = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const divider   = isDarkMode ? 'border-white/5' : 'border-borderColor';
    const select    = `w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500/20 focus:border-blue-500/50' : 'bg-gray-50 border-borderColor text-dark focus:ring-blue-500/20 focus:border-blue-500/50'}`;

    const filtered = claims.filter(c => {
        const q = searchQuery.toLowerCase();
        return (c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.cat.toLowerCase().includes(q))
            && (statusFilter === 'All' || c.status === statusFilter)
            && (catFilter    === 'All' || c.cat    === catFilter);
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated  = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const FilterBox = ({ label, opts, val, onChange }) => (
        <div className="flex flex-col gap-1.5 flex-1 min-w-[150px]">
            <label className={`text-xs font-semibold ${muted}`}>{label}</label>
            <div className="relative">
                <select value={val} onChange={e => onChange(e.target.value)} className={select}>
                    {opts.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={13} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${muted}`} />
            </div>
        </div>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Module Title ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                        <Wallet size={20} className="text-violet-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Reimbursements</h1>
                        <p className={`text-xs mt-0.5 ${muted}`}>Review, approve, and process employee expense claims</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95">
                        <CreditCard size={15} /> Process Payments
                    </button>
                </div>
            </div>

            {/* ── 2. Expense Filters ────────────────────────────────────────── */}
            <div className={`${card} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                    <Filter size={15} className="text-blue-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Expense Filters</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    <FilterBox label="Expense Category" opts={CATS}        val={catFilter}    onChange={setCatFilter} />
                    <FilterBox label="Department"       opts={DEPARTMENTS} val={deptFilter}   onChange={setDeptFilter} />
                    <FilterBox label="Request Status"   opts={STATUSES}    val={statusFilter} onChange={setStatusFilter} />
                    <div className="flex flex-col gap-1.5 flex-[2] min-w-[200px]">
                        <label className={`text-xs font-semibold ${muted}`}>Search Employee</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className={select}
                            />
                            <Search size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 ${muted}`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 3. Categories Panel ───────────────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((c, i) => (
                    <div key={i} className={`${card} p-4 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${c.bg}`}>
                            <c.icon size={22} className={c.color} />
                        </div>
                        <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{c.name}</p>
                        <p className={`text-[10px] mt-1 font-semibold ${muted}`}>{c.claims} Claims</p>
                    </div>
                ))}
            </div>

            {/* ── 4. Claims Workspace ───────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Claims list */}
                <div className={`xl:col-span-2 ${card} flex flex-col`}>
                    <div className={head}>
                        <h3 className={heading}>Expense Claims</h3>
                        <div className="flex gap-2">
                            {['All', 'Pending', 'Approved'].map(s => (
                                <button key={s} onClick={() => setStatusFilter(s)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${statusFilter === s ? 'bg-blue-500 text-white' : isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{s}</button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[700px]">
                            <thead>
                                <tr className={`border-b text-xs font-semibold uppercase text-gray-500 ${divider}`}>
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Category</th>
                                    <th className="p-4 text-center">Amount</th>
                                    <th className="p-4 text-center">Date</th>
                                    <th className="p-4 text-center">Receipt</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {paginated.map((row, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => setSelectedClaim(selectedClaim?.id === row.id ? null : row)}
                                        className={`border-b last:border-0 cursor-pointer transition-colors ${selectedClaim?.id === row.id ? (isDarkMode ? 'bg-blue-500/5' : 'bg-blue-50') : (isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50')}`}
                                    >
                                        <td className="p-4">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</p>
                                            <p className={`text-[10px] ${muted}`}>{row.dept} · {row.id}</p>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold border ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-100 border-gray-200 text-gray-600'}`}>{row.cat}</span>
                                        </td>
                                        <td className={`p-4 text-center font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.amt}</td>
                                        <td className={`p-4 text-center text-[11px] font-semibold ${muted}`}>{row.date}</td>
                                        <td className="p-4 text-center">
                                            <button className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-blue-400 hover:bg-white/5' : 'text-blue-600 hover:bg-blue-50'}`}><Receipt size={14} /></button>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                                        </td>
                                        <td className="p-4" onClick={e => e.stopPropagation()}>
                                            <div className="flex gap-1">
                                                <button title="View" className={`p-1.5 rounded-md ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-dark'}`}><Eye size={14} /></button>
                                                <button title="Approve" className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-500/10"><CheckCircle2 size={14} /></button>
                                                <button title="Reject" className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10"><XCircle size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className={`p-4 border-t flex items-center justify-between text-[11px] font-semibold ${divider} ${muted}`}>
                        <span>Showing {Math.min((currentPage - 1) * rowsPerPage + 1, filtered.length)}–{Math.min(currentPage * rowsPerPage, filtered.length)} of {filtered.length}</span>
                        <div className="flex gap-1.5">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 hover:opacity-80 disabled:opacity-30">Prev</button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-2.5 py-1 rounded-md bg-gray-100 dark:bg-white/5 hover:opacity-80 disabled:opacity-30">Next</button>
                        </div>
                    </div>
                </div>

                {/* Receipt Preview */}
                <div className={`${card} flex flex-col overflow-hidden`}>
                    <div className={head}>
                        <div className="flex items-center gap-2">
                            <Receipt size={18} className="text-blue-500" />
                            <h3 className={heading}>Receipt Preview</h3>
                        </div>
                        {selectedClaim && <button onClick={() => setSelectedClaim(null)} className={muted}><RefreshCw size={14} /></button>}
                    </div>
                    <div className="p-4 flex-1">
                        <ReceiptPreview claim={selectedClaim} isDarkMode={isDarkMode} />
                    </div>
                </div>
            </div>

            {/* ── 5. Status Tracker + Activity ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Payment Status Tracker */}
                <div className={`${card} flex flex-col`}>
                    <div className={head}>
                        <div className="flex items-center gap-2">
                            <CreditCard size={18} className="text-emerald-500" />
                            <h3 className={heading}>Payment Status Tracker</h3>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${divider}`}>
                                    <th className="p-4 px-5">Employee</th>
                                    <th className="p-4 text-center">Amount</th>
                                    <th className="p-4 text-center">Date</th>
                                    <th className="p-4">Method</th>
                                    <th className="p-4 px-5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {paymentTracker.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'}`}>
                                        <td className={`p-4 px-5 font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</td>
                                        <td className="p-4 text-center text-emerald-500 font-bold">{row.amt}</td>
                                        <td className={`p-4 text-center font-medium ${muted}`}>{row.date}</td>
                                        <td className={`p-4 font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.method}</td>
                                        <td className="p-4 px-5 text-right">
                                            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className={`${card} flex flex-col p-5`}>
                    <div className="flex items-center gap-2 mb-5">
                        <Activity size={18} className="text-blue-500" />
                        <h3 className={heading}>Recent Expense Activity</h3>
                    </div>
                    <div className="flex flex-col gap-4 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {activityFeed.map((act, i) => (
                            <div key={i} className="flex gap-3 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={15} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className={`text-[10px] mt-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}><Clock size={10}/> {act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 6. Quick Actions ──────────────────────────────────────────── */}
            <div className={`${card} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ArrowUpRight size={15} className="text-blue-500" />
                    </div>
                    <h3 className={heading}>Quick Actions</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { label: 'Approve All Pending',   icon: CheckCircle2, color: 'text-emerald-500' },
                        { label: 'Process Payments',      icon: CreditCard,   color: 'text-blue-500' },
                        { label: 'Export Expense Report', icon: Download,     color: 'text-violet-500' },
                        { label: 'Expense Summary',       icon: FileText,     color: 'text-amber-500' },
                    ].map((btn, i) => (
                        <button key={i} className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all active:scale-95 hover:-translate-y-1 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}>
                            <btn.icon size={18} className={btn.color} />
                            <span className="text-xs font-bold">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
