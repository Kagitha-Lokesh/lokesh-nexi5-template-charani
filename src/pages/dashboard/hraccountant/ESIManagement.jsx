import { useState, useEffect } from 'react';
import { 
    HeartHandshake, Shield, Download, FileText, Calendar, 
    Search, ChevronDown, CheckCircle2, UserCheck, 
    Activity, Clock, RefreshCw, Upload, Eye, 
    ArrowUpRight, Building2, CreditCard, ClipboardCheck,
    AlertCircle, BadgeInfo, MoreVertical, FileDown,
    PlusCircle, Stethoscope, Baby, ShieldAlert,
    History, Calculator, Landmark, LayoutGrid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    esiContributionSummary as contributionSummary, 
    esiEligibleEmployees as eligibleEmployees, 
    esiContributions as contributions,
    esiBenefits as benefits, 
    esiFilingSteps as filingSteps, 
    esiActivity as activity, 
    ESI_STATUS_STYLE as STATUS_STYLE
} from '@/datasets/hraccountant/esiManagementData';


// ─── Sub-components ───────────────────────────────────────────────────────────

const AnimatedNumber = ({ value, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const increment = value / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);
    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const SelectField = ({ label, opts, val, onChange, isDarkMode }) => (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
        <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</label>
        <div className="relative">
            <select 
                value={val} 
                onChange={e => onChange(e.target.value)} 
                className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 ${
                    isDarkMode 
                        ? 'bg-slate-800/90 border-white/10 text-white focus:ring-blue-500/20 focus:border-blue-500/50' 
                        : 'bg-gray-50 border-gray-100 text-dark focus:ring-blue-500/20 focus:border-blue-500/50'
                }`}
            >
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
        </div>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ESIManagement() {
    const { isDarkMode } = useTheme();
    const [fy, setFy] = useState('2025–2026');
    const [month, setMonth] = useState('March');
    const [eligFilter, setEligFilter] = useState('ESI Applicable');
    const [searchQuery, setSearchQuery] = useState('');

    const cardClass     = `rounded-xl border ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`;
    const headerClass   = `p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`;
    const headingClass  = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-dark'}`;
    const textMuted     = isDarkMode ? 'text-gray-400' : 'text-textSecondary';
    const dividerClass  = isDarkMode ? 'border-white/5' : 'border-borderColor';

    const fadeProps = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
    };

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* ── 1. Module Title ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                        <HeartHandshake size={22} className="text-blue-600" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee State Insurance (ESI)</h1>
                        <p className={`text-xs mt-0.5 ${textMuted}`}>Insurance contribution monitoring & eligibility management</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export ESI Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        <FileText size={15} /> Generate ESI Report
                    </button>
                </div>
            </div>

            {/* ── 2. Period Selector ────────────────────────────────────────── */}
            <motion.div {...fadeProps} className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                    <Calendar size={15} className="text-blue-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>ESI Contribution Period Selector</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    <SelectField label="Financial Year"  opts={['2025–2026', '2024–2025']} val={fy} onChange={setFy} isDarkMode={isDarkMode} />
                    <SelectField label="Contribution Month" opts={['January', 'February', 'March']} val={month} onChange={setMonth} isDarkMode={isDarkMode} />
                    <SelectField label="Employee Eligibility" opts={['ESI Applicable', 'Non-ESI']} val={eligFilter} onChange={setEligFilter} isDarkMode={isDarkMode} />
                </div>
            </motion.div>

            {/* ── 3. Contribution Board ─────────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contributionSummary.map((card, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeProps}
                        transition={{ delay: i * 0.1 }}
                        className={`${cardClass} p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col gap-4 group overflow-hidden relative`}
                    >
                        <div className="flex items-center justify-between">
                            <div className={`p-2.5 rounded-xl transition-colors ${card.bg}`}>
                                <card.icon size={20} className={card.color} />
                            </div>
                            <div className="h-1 shadow-sm w-12 bg-blue-500/10 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        </div>
                        <div>
                            <p className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>{card.title}</p>
                            <h2 className={`text-3xl font-headings font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                <AnimatedNumber value={card.value} prefix={card.suffix === '₹' ? '₹' : ''} />
                            </h2>
                        </div>
                        {/* Background pattern */}
                        <div className="absolute -bottom-2 -right-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <card.icon size={80} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* ── 4. Eligible Employees & ESI Table Row ─────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Eligible Employees Panel */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <UserCheck size={18} className="text-emerald-500" />
                            <h3 className={headingClass}>Employees Covered Under ESI</h3>
                        </div>
                        <button className={`text-[10px] font-bold text-blue-500 uppercase tracking-widest px-3 py-1.5 rounded-lg hover:bg-blue-500/5 transition-all`}>View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                    <th className="p-4 px-6">Employee ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Salary</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 px-6 text-right">Insurance #</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {eligibleEmployees.map((emp, i) => (
                                    <tr key={i} className={`border-b last:border-0 ${dividerClass} hover:bg-blue-500/[0.02]`}>
                                        <td className="p-4 px-6 font-bold text-blue-500">{emp.id}</td>
                                        <td className="p-4">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{emp.name}</p>
                                            <p className={`text-[10px] ${textMuted}`}>{emp.dept}</p>
                                        </td>
                                        <td className={`p-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{emp.salary}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${STATUS_STYLE[emp.status]}`}>{emp.status}</span>
                                        </td>
                                        <td className={`p-4 px-6 text-right font-mono font-medium ${textMuted}`}>{emp.number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* ESI Contribution Table */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <Building2 size={18} className="text-blue-500" />
                            <h3 className={headingClass}>ESI Contributions Breakdown</h3>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className={`pl-8 pr-3 py-1.5 rounded-xl border text-[11px] outline-none transition-all focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500/20' : 'bg-gray-50 border-gray-100 text-dark focus:ring-blue-500/10'}`}
                            />
                            <Search size={12} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                    <th className="p-4 px-6">Name</th>
                                    <th className="p-4">Contribs (EE/ER)</th>
                                    <th className="p-4 text-center">Total</th>
                                    <th className="p-4 text-center">Status</th>
                                    <th className="p-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[12px]">
                                {contributions.map((row, i) => (
                                    <tr key={i} className={`border-b last:border-0 ${dividerClass} hover:bg-blue-500/[0.02]`}>
                                        <td className="p-4 px-6">
                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.name}</p>
                                            <p className={`text-[10px] ${textMuted}`}>Base: {row.salary}</p>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-2"><span className="w-3 text-[9px] font-bold text-blue-400">EE</span><span className="font-bold">{row.employee}</span></div>
                                                <div className="flex items-center gap-2"><span className="w-3 text-[9px] font-bold text-violet-400">ER</span><span className="font-bold">{row.employer}</span></div>
                                            </div>
                                        </td>
                                        <td className={`p-4 text-center font-bold text-blue-500`}>{row.total}</td>
                                        <td className="p-4 text-center">
                                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                                        </td>
                                        <td className="p-4 px-6 text-right">
                                            <div className="flex gap-2 justify-end">
                                                <button className={`p-1.5 rounded-lg border border-transparent hover:border-blue-500/20 hover:bg-blue-500/5 transition-all text-blue-500`}><Eye size={14} /></button>
                                                <button className={`p-1.5 rounded-lg border border-transparent hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all text-emerald-500`}><MoreVertical size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* ── 5. Benefits Overview & Filing Progress ─────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Benefits Overview */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col lg:col-span-2`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-violet-500" />
                            <h3 className={headingClass}>Employee Insurance Benefits Overview</h3>
                        </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {benefits.map((b, i) => (
                            <div key={i} className={`p-4 rounded-xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50 border-gray-100 hover:shadow-md'}`}>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/10' : 'bg-white shadow-sm'}`}>
                                    <b.icon size={22} className="text-violet-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`text-sm font-bold truncate ${isDarkMode ? 'text-gray-100' : 'text-dark'}`}>{b.name}</h4>
                                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase border ${STATUS_STYLE[b.status] || 'border-gray-500/20 text-gray-500'}`}>{b.status}</span>
                                    </div>
                                    <p className={`text-[11px] leading-tight flex items-center gap-1.5 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                        <BadgeInfo size={11} className="shrink-0" /> {b.claim}
                                    </p>
                                </div>
                                <button className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'} transition-all`}>
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className={`mt-auto p-4 border-t ${dividerClass}`}>
                        <div className="flex justify-around items-center opacity-60">
                            {['Medical', 'Sickness', 'Maternity', 'Disability'].map((label, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                                    {label} Benefits
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ESI Filing Tracker */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <ClipboardCheck size={18} className="text-blue-500" />
                            <h3 className={headingClass}>ESI Filing Tracker</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-col gap-6 relative">
                            {/* Line connecting steps */}
                            <div className={`absolute left-[19px] top-2 bottom-6 w-0.5 border-l-2 border-dashed ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}></div>
                            
                            {filingSteps.map((step, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg ${
                                        step.status === 'Completed' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 
                                        step.status === 'Pending' ? 'bg-blue-600 text-white shadow-blue-500/20' : 
                                        'bg-gray-200 text-gray-500 border-2 border-dashed border-gray-300 dark:bg-white/5 dark:border-white/10 dark:text-white/20'
                                    }`}>
                                        {step.status === 'Completed' ? <CheckCircle2 size={18} /> : step.status === 'Pending' ? <Clock size={18}/> : <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40"></div>}
                                    </div>
                                    <div className="flex-1 pt-0.5">
                                        <div className="flex justify-between items-center">
                                            <p className={`text-xs font-bold leading-none ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{step.label}</p>
                                            <span className={`text-[9px] font-bold ${textMuted}`}>{step.date}</span>
                                        </div>
                                        <p className={`text-[10px] font-medium mt-1.5 ${step.status === 'Completed' ? 'text-emerald-500' : textMuted}`}>{step.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className={`w-full py-2.5 mt-8 rounded-xl text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 active:scale-95 transition-all`}>
                            INITIATE NEXT FILING STEP
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* ── 6. Activity & Quick Actions Row ─────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Activity */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <History size={18} className="text-blue-500" />
                            <h3 className={headingClass}>Recent ESI Activity</h3>
                        </div>
                    </div>
                    <div className="p-5 space-y-4">
                        {activity.map((item, i) => (
                            <div key={i} className="flex gap-3 items-start group">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all group-hover:bg-blue-500 group-hover:text-white ${isDarkMode ? 'bg-white/5 text-gray-500' : 'bg-gray-50 text-gray-400'}`}>
                                    <item.icon size={14} />
                                </div>
                                <div>
                                    <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-gray-300' : 'text-dark'} cursor-default`}>{item.text}</p>
                                    <span className={`text-[10px] font-medium ${textMuted}`}>{item.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions Panel */}
                <motion.div {...fadeProps} className={`lg:col-span-2 ${cardClass} p-6`}>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center">
                            <PlusCircle size={18} className="text-blue-600" />
                        </div>
                        <h3 className={headingClass}>Quick ESI Actions</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Calculate ESI', icon: Calculator, color: 'text-blue-500' },
                            { label: 'Upload Filing',  icon: Upload,     color: 'text-violet-500' },
                            { label: 'Submit Payment', icon: CreditCard, color: 'text-emerald-500' },
                            { label: 'Export Data',    icon: FileDown,   color: 'text-amber-500' },
                        ].map((btn, i) => (
                            <button 
                                key={i} 
                                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border text-center transition-all active:scale-95 group relative overflow-hidden ${
                                    isDarkMode 
                                        ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' 
                                        : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-xl text-dark'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white shadow-lg transition-transform group-hover:-translate-y-1 ${isDarkMode ? 'bg-white/5 text-white/50 group-hover:text-white' : 'text-gray-400 group-hover:text-primary'}`}>
                                    <btn.icon size={22} className={btn.color} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider">{btn.label}</span>
                                {/* Background glow */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-full -mr-8 -mt-8 pointer-events-none"></div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Insurance Grid Footer */}
            <div className={`mt-auto py-8 text-center border-t border-dashed ${dividerClass}`}>
                <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                        <Shield size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Insured & Secure</span>
                    </div>
                    <div className="h-4 w-px bg-gray-400/20"></div>
                    <div className="flex items-center gap-2 text-blue-500">
                        <Activity size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Monitor</span>
                    </div>
                </div>
                <p className={`text-[9px] font-bold uppercase tracking-[0.3em] ${textMuted}`}>NEXI5 Employee State Insurance Workflow · Integrated v1.2</p>
            </div>
        </div>
    );
}

