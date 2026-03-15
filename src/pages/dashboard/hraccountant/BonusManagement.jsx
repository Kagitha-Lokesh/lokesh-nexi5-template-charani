import { useState, useEffect } from 'react';
import {
    TrendingUp, Plus, Calendar, Target, Users, DollarSign,
    CheckCircle2, XCircle, Clock, Calculator, Activity,
    Download, Layout, Search, Filter, ChevronDown,
    ArrowUpRight, Award, Star, History, FileText,
    Percent, Building2, User, Eye
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import {
    campaigns, deptPools, allocations, pendingApprovals,
    bonusActivity, BONUS_STATUS_STYLE as STATUS_STYLE, BONUS_DEPARTMENTS as DEPARTMENTS, CAMPAIGN_TYPES
} from '@/datasets/hraccountant/bonusManagementData';


// ─── Sub-components ───────────────────────────────────────────────────────────

function BonusCalculator({ employee, isDarkMode }) {
    const [rating, setRating] = useState(employee?.rating || 4.5);
    const [perc, setPerc] = useState(30);

    // Sync state when employee changes
    useEffect(() => {
        if (employee) {
            setRating(employee.rating);
            setPerc(30);
        }
    }, [employee]);

    const base = employee?.base || 85000;
    const calculated = (base * (perc / 100)).toFixed(0);

    if (!employee) return (
        <div className={`flex flex-col items-center justify-center p-8 text-center min-h-[300px] border-2 border-dashed rounded-xl ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
            <Calculator size={48} className="mb-3 opacity-20" />
            <p className="text-sm font-medium">Select an employee to use bonus calculator</p>
        </div>
    );

    return (
        <div className={`rounded-xl border p-5 space-y-5 shadow-inner ${isDarkMode ? 'bg-[#080f1f] border-white/10' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`flex items-center justify-between pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <h3 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>Bonus Calculator</h3>
                <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-500 text-white uppercase">Active Tool</span>
            </div>

            <div className="space-y-4">
                <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Target Employee</p>
                    <p className={`text-[13px] font-bold mt-1 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{employee.name} <span className="text-[10px] font-normal text-gray-500">· {employee.dept}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Base Salary</label>
                        <p className={`text-base font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>₹{base.toLocaleString()}</p>
                    </div>
                    <div>
                        <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Performance</label>
                        <div className="flex items-center gap-1 mt-1 text-emerald-500 font-bold text-base">
                            <Star size={16} fill="currentColor" /> {rating}
                        </div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Bonus Percentage</label>
                        <span className="text-xs font-bold text-blue-500">{perc}%</span>
                    </div>
                    <input 
                        type="range" min="0" max="100" step="5" value={perc} 
                        onChange={e => setPerc(parseInt(e.target.value))}
                        className={`w-full h-1.5 rounded-lg appearance-none cursor-pointer ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}
                        style={{ accentColor: '#3b82f6' }}
                    />
                </div>

                <div className={`p-4 rounded-xl border flex items-center justify-between ${isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}>
                    <div>
                        <p className={`text-[10px] font-bold uppercase ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Calculated Bonus</p>
                        <p className={`text-[10px] ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Based on {perc}% of base</p>
                    </div>
                    <p className="text-xl font-bold text-emerald-500">₹{parseInt(calculated).toLocaleString()}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <button className="w-full py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-md shadow-blue-500/10">Apply Bonus</button>
                <button className={`w-full py-2 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-400 hover:bg-white/10' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>Save Adjustment</button>
            </div>
        </div>
    );
}

const SelectBox = ({ label, opts, val, onChange, isDarkMode, mutedClass, selectBase }) => (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
        <label className={`text-xs font-semibold ${mutedClass}`}>{label}</label>
        <div className="relative">
            <select value={val} onChange={e => onChange(e.target.value)} className={selectBase}>
                {opts.map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown size={13} className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${mutedClass}`} />
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BonusManagement() {
    const { isDarkMode } = useTheme();
    const [selectedEmp, setSelectedEmp] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [campaign,    setCampaign]    = useState('Annual Performance Bonus 2026');
    const [deptFilter,  setDeptFilter]  = useState('All');
    const [typeFilter,  setTypeFilter]  = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    const cardClass      = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const headerClass    = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass   = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const mutedClass     = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const dividerClass   = isDarkMode ? 'border-white/5' : 'border-borderColor';
    const selectBase     = `w-full appearance-none pl-3 pr-8 py-2 rounded-lg text-sm border transition-all focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500/20 focus:border-blue-500/50' : 'bg-gray-50 border-borderColor text-dark focus:ring-blue-500/20 focus:border-blue-500/50'}`;

    const filtered = allocations.filter(a => {
        const q = searchQuery.toLowerCase();
        return (a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q) || a.dept.toLowerCase().includes(q))
            && (deptFilter === 'All' || a.dept === deptFilter);
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const paginated  = filtered.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);



    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Module Title ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <TrendingUp size={20} className="text-amber-500" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Bonus Management</h1>
                        <p className={`text-xs mt-0.5 ${mutedClass}`}>Plan, allocate, and manage employee performance incentives</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95">
                        <Plus size={15} /> Create Bonus Campaign
                    </button>
                </div>
            </div>

            {/* ── 2. Bonus Campaign Selector ────────────────────────────────── */}
            <div className={`${cardClass} p-5`}>
                <div className="flex items-center gap-2 mb-4">
                    <Calendar size={15} className="text-amber-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Bonus Campaign Selector</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    <SelectBox label="Bonus Campaign" opts={campaigns.map(c => c.name)} val={campaign} onChange={setCampaign} isDarkMode={isDarkMode} mutedClass={mutedClass} selectBase={selectBase} />
                    <SelectBox label="Department"     opts={DEPARTMENTS}               val={deptFilter} onChange={setDeptFilter} isDarkMode={isDarkMode} mutedClass={mutedClass} selectBase={selectBase} />
                    <SelectBox label="Bonus Type"      opts={CAMPAIGN_TYPES}            val={typeFilter} onChange={setTypeFilter} isDarkMode={isDarkMode} mutedClass={mutedClass} selectBase={selectBase} />
                </div>
            </div>

            {/* ── 3. Department Bonus Pool Panel ───────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {deptPools.map((pool, i) => (
                    <div key={i} className={`${cardClass} p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg cursor-pointer group`}>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{pool.name}</h4>
                            <div className={`p-2 rounded-lg ${pool.bg}`}>
                                <Building2 size={16} className={pool.color} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-end">
                                <p className={`text-[10px] font-bold uppercase tracking-wider ${mutedClass}`}>Bonus Pool</p>
                                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>₹{(pool.total/100000).toFixed(1)}L</p>
                            </div>
                            <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                                <div 
                                    className={`h-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-1000`} 
                                    style={{ width: `${(pool.used/pool.total)*100}%` }}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t dark:border-white/5">
                                <div>
                                    <p className={`text-[9px] font-bold uppercase ${mutedClass}`}>Allocated</p>
                                    <p className="text-xs font-bold text-emerald-500">₹{(pool.used/1000).toFixed(0)}K</p>
                                </div>
                                <div className="text-right">
                                    <p className={`text-[9px] font-bold uppercase ${mutedClass}`}>Remaining</p>
                                    <p className="text-xs font-bold text-blue-500">₹{((pool.total - pool.used)/1000).toFixed(0)}K</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── 4. Allocation Workspace + Calculator ─────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Allocation workspace */}
                <div className={`xl:col-span-2 ${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <h3 className={headingClass}>Employee Bonus Allocation</h3>
                        <div className="relative max-w-64 w-full">
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                className={`w-full pl-9 pr-4 py-2 rounded-lg text-xs border transition-all focus:ring-blue-500/20 focus:border-blue-500/50 ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-borderColor'}`}
                            />
                            <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedClass}`} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[750px]">
                            <thead>
                                <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                    <th className="p-4 px-5">Employee</th>
                                    <th className="p-4 text-center">Performance</th>
                                    <th className="p-4 text-right">Base Salary</th>
                                    <th className="p-4 text-right">Recommended</th>
                                    <th className="p-4 text-right">Approved</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {paginated.map((row, i) => (
                                    <tr
                                        key={i}
                                        onClick={() => setSelectedEmp(selectedEmp?.id === row.id ? null : row)}
                                        className={`border-b last:border-0 cursor-pointer transition-colors ${selectedEmp?.id === row.id ? (isDarkMode ? 'bg-blue-500/5' : 'bg-blue-50') : (isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50')}`}
                                    >
                                        <td className="p-4 px-5">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</p>
                                            <p className={`text-[10px] ${mutedClass}`}>{row.dept} · {row.id}</p>
                                        </td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-1 font-bold text-emerald-500">
                                                <Star size={12} fill="currentColor" /> {row.rating}
                                            </div>
                                        </td>
                                        <td className={`p-4 text-right font-medium ${mutedClass}`}>₹{row.base.toLocaleString()}</td>
                                        <td className={`p-4 text-right font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>₹{row.rec.toLocaleString()}</td>
                                        <td className="p-4 text-right font-bold text-emerald-500">₹{row.apprv.toLocaleString()}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold border ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                                        </td>
                                        <td className="p-4 px-5 text-right" onClick={e => e.stopPropagation()}>
                                            <div className="flex gap-1 justify-end">
                                                <button title="Approve" className="p-1.5 rounded-md text-emerald-500 hover:bg-emerald-500/10"><CheckCircle2 size={14} /></button>
                                                <button title="Reject"  className="p-1.5 rounded-md text-red-500 hover:bg-red-500/10"><XCircle size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className={`p-4 px-5 border-t flex items-center justify-between text-[10px] font-bold ${dividerClass} ${mutedClass}`}>
                        <span>{(currentPage-1)*rowsPerPage+1}–{Math.min(currentPage*rowsPerPage, filtered.length)} OF {filtered.length} EMPLOYEES</span>
                        <div className="flex gap-2">
                            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 hover:opacity-80 disabled:opacity-30">PREV</button>
                            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/5 hover:opacity-80 disabled:opacity-30">NEXT</button>
                        </div>
                    </div>
                </div>

                {/* Calculator side panel */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <Calculator size={18} className="text-blue-500" />
                            <h3 className={headingClass}>Bonus Calculator</h3>
                        </div>
                    </div>
                    <div className="p-4">
                        <BonusCalculator employee={selectedEmp} isDarkMode={isDarkMode} />
                    </div>
                </div>

            </div>

            {/* ── 5. Approval Queue + Activity ─────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Bonus Approval Queue */}
                <div className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-amber-500" />
                            <h3 className={headingClass}>Pending Bonus Approvals</h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white leading-tight">2 NEW</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                    <th className="p-4 px-5">Employee</th>
                                    <th className="p-4 text-center">Amount</th>
                                    <th className="p-4 text-center">By</th>
                                    <th className="p-4 px-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {pendingApprovals.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-gray-50 hover:bg-gray-50'}`}>
                                        <td className="p-4 px-5">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</p>
                                            <p className={`text-[10px] ${mutedClass}`}>{row.dept}</p>
                                        </td>
                                        <td className="p-4 text-center text-emerald-500 font-bold">{row.amt}</td>
                                        <td className={`p-4 text-center font-medium ${mutedClass}`}>{row.by}</td>
                                        <td className="p-4 px-5 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button className={`px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-emerald-600 hover:bg-emerald-700`}>Approve</button>
                                                <button className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'}`}><Eye size={12} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bonus Activity Timeline */}
                <div className={`${cardClass} flex flex-col p-5`}>
                    <div className="flex items-center gap-2 mb-6">
                        <Activity size={18} className="text-blue-500" />
                        <h3 className={headingClass}>Bonus Activity</h3>
                    </div>
                    <div className="flex flex-col gap-5 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {bonusActivity.map((act, i) => (
                            <div key={i} className="flex gap-3 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={15} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className={`text-[10px] mt-1.5 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}><Clock size={10}/> {act.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 6. Quick Actions ──────────────────────────────────────────── */}
            <div className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ArrowUpRight size={15} className="text-blue-500" />
                    </div>
                    <h3 className={headingClass}>Quick Compensation Actions</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Allocate Dept Pool', icon: Building2, color: 'text-blue-500' },
                        { label: 'Approve Bonuses',    icon: CheckCircle2, color: 'text-emerald-500' },
                        { label: 'Generate Reports',   icon: Download,     color: 'text-violet-500' },
                        { label: 'View FY History',    icon: History,      color: 'text-amber-500' },
                    ].map((btn, i) => (
                        <button key={i} className={`flex flex-col items-center gap-3 p-5 rounded-xl border text-center transition-all active:scale-95 hover:-translate-y-1 duration-200 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'}`}>
                            <btn.icon size={24} className={btn.color} />
                            <span className="text-xs font-bold leading-tight uppercase tracking-wide">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>NEXI5 Compensation Planner · v1.4</p>
            </div>
        </div>
    );
}
