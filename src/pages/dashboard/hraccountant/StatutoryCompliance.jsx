import { useState, useEffect } from 'react';
import { 
    ShieldCheck, Download, FileText, Calendar, Filter, 
    Search, ChevronDown, CheckCircle2, AlertTriangle, 
    Clock, RefreshCw, Upload, Eye, ArrowUpRight, 
    Landmark, HeartHandshake, FileCheck, ExternalLink,
    AlertCircle, Activity, MoreVertical, FileDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    complianceSummary, complianceFilings as filings, complianceDeadlines as deadlines,
    complianceDocuments as documents, complianceAlerts as alerts,
    STATUTORY_STATUS_STYLE as STATUS_STYLE, STATUTORY_DEADLINE_STYLE as DEADLINE_STYLE
} from '@/datasets/hraccountant/statutoryComplianceData';






// ─── Sub-components ───────────────────────────────────────────────────────────

const SelectField = ({ label, opts, val, onChange, isDarkMode }) => (
    <div className="flex flex-col gap-1.5 flex-1 min-w-[180px]">
        <label className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</label>
        <div className="relative">
            <select 
                value={val} 
                onChange={e => onChange(e.target.value)} 
                className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 ${
                    isDarkMode 
                        ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500/20 focus:border-blue-500/50' 
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

export default function StatutoryCompliance() {
    const { isDarkMode } = useTheme();
    const [fy, setFy] = useState('2025–2026');
    const [month, setMonth] = useState('March');
    const [dept, setDept] = useState('All');
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
                        <ShieldCheck size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <h1 className={`text-xl font-semibold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Statutory Compliance</h1>
                        <p className={`text-xs mt-0.5 ${textMuted}`}>Government compliance control center & monitoring dashboard</p>
                    </div>
                </div>
                <div className="flex gap-3 shrink-0 flex-wrap">
                    <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-lightSky/50 text-primary hover:bg-lightSky'}`}>
                        <Download size={15} /> Export Tax Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        <FileText size={15} /> Generate Compliance Report
                    </button>
                </div>
            </div>

            {/* ── 2. Compliance Period Selector ─────────────────────────────── */}
            <motion.div {...fadeProps} className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-5">
                    <Calendar size={15} className="text-blue-500" />
                    <h3 className={`font-headings font-semibold text-sm ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Compliance Period Selector</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                    <SelectField label="Financial Year"  opts={['2025–2026', '2024–2025']} val={fy} onChange={setFy} isDarkMode={isDarkMode} />
                    <SelectField label="Compliance Month" opts={['January', 'February', 'March']} val={month} onChange={setMonth} isDarkMode={isDarkMode} />
                    <SelectField label="Department"       opts={['All', 'Engineering', 'HR', 'Sales']} val={dept} onChange={setDept} isDarkMode={isDarkMode} />
                </div>
            </motion.div>

            {/* ── 3. Compliance Status Board ────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {complianceSummary.map((card, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeProps}
                        transition={{ delay: i * 0.1 }}
                        className={`${cardClass} p-5 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg cursor-pointer group`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h4 className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>{card.title}</h4>
                            <div className={`p-2 rounded-lg ${card.bg}`}>
                                <card.icon size={18} className={card.color} />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{card.value}</p>
                                <p className={`text-[10px] mt-1 ${textMuted}`}>Employees Covered: {card.total}</p>
                            </div>
                            <div className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${STATUS_STYLE[card.status]}`}>
                                {card.status}
                            </div>
                        </div>
                        {/* Status glow for active items */}
                        {card.status === 'Processing' && (
                            <div className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </div>
                        )}
                        {card.status === 'Overdue' && (
                            <div className="absolute top-2 right-2 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* ── 4. Main Statutory Filing Workspace ──────────────────────────── */}
            <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                <div className={headerClass}>
                    <div className="flex items-center gap-2">
                        <Activity size={18} className="text-blue-500" />
                        <h3 className={headingClass}>Statutory Compliance Filings</h3>
                    </div>
                    <div className="relative max-w-64 w-full">
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border transition-all focus:ring-blue-500/20 focus:border-blue-500/50 ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600' : 'bg-gray-50 border-borderColor'}`}
                        />
                        <Search size={14} className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`} />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[800px]">
                        <thead>
                            <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                <th className="p-4 px-6">Compliance Type</th>
                                <th className="p-4">Period</th>
                                <th className="p-4 text-center">Employees</th>
                                <th className="p-4 text-right">Total Amount</th>
                                <th className="p-4 text-center">Submission</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {filings.map((row, i) => (
                                <tr key={i} className={`border-b last:border-0 hover:bg-white/[0.02] transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-50 hover:bg-gray-50'}`}>
                                    <td className="p-4 px-6 flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${row.type === 'PF' ? 'bg-blue-500/10 text-blue-500' : row.type === 'ESI' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-violet-500/10 text-violet-500'}`}>
                                            {row.type === 'PF' ? <Landmark size={14} /> : row.type === 'ESI' ? <HeartHandshake size={14} /> : <FileText size={14} />}
                                        </div>
                                        <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{row.type} Filing</span>
                                    </td>
                                    <td className={`p-4 font-medium ${textMuted}`}>{row.period}</td>
                                    <td className={`p-4 text-center font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{row.count}</td>
                                    <td className="p-4 text-right font-bold text-blue-500">{row.amount}</td>
                                    <td className={`p-4 text-center font-medium ${textMuted}`}>{row.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${STATUS_STYLE[row.status]}`}>{row.status}</span>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button title="View Filing" className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-blue-400 hover:bg-blue-400/10' : 'text-primary hover:bg-blue-50'}`}><Eye size={14} /></button>
                                            <button title="Upload Document" className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-emerald-400 hover:bg-emerald-400/10' : 'text-emerald-600 hover:bg-emerald-50'}`}><Upload size={14} /></button>
                                            <button title="Options" className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'text-gray-500 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-100'}`}><MoreVertical size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* ── 5. Deadlines Tracker + Alerts Panel ───────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Deadlines Timeline */}
                <motion.div {...fadeProps} className={`lg:col-span-2 ${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-amber-500" />
                            <h3 className={headingClass}>Upcoming Compliance Deadlines</h3>
                        </div>
                        <button className={`text-[10px] font-bold uppercase tracking-wider transition-all hover:text-blue-500 ${textMuted}`}>View Full Timeline</button>
                    </div>
                    <div className="p-6 flex flex-col gap-4">
                        {deadlines.map((dl, i) => (
                            <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-white/10' : 'bg-gray-50 border-gray-100'}`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${dl.status === 'Overdue' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                    <Calendar size={18} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-100' : 'text-dark'}`}>{dl.type}</p>
                                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${DEADLINE_STYLE[dl.status]}`}>{dl.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1.5">
                                        <p className={`text-[11px] flex items-center gap-1.5 ${textMuted}`}><Clock size={10} /> Deadline: <span className="font-bold">{dl.date}</span></p>
                                        <p className={`text-[11px] flex items-center gap-1.5 ${textMuted}`}><Activity size={10} /> Priority: <span className="font-bold text-amber-500">Normal</span></p>
                                    </div>
                                </div>
                                <button className={`p-2 rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all`}>
                                    <ArrowUpRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Alerts Panel */}
                <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                    <div className={headerClass}>
                        <div className="flex items-center gap-2">
                            <AlertCircle size={18} className="text-red-500" />
                            <h3 className={headingClass}>Compliance Alerts</h3>
                        </div>
                    </div>
                    <div className="p-5 space-y-3">
                        {alerts.map((alert, i) => (
                            <div 
                                key={i} 
                                className={`p-3.5 rounded-lg border-l-4 space-y-1.5 transition-all hover:scale-[1.02] ${
                                    alert.priority === 'High' 
                                        ? isDarkMode ? 'bg-red-500/10 border-red-500/50' : 'bg-red-50 border-red-500/50'
                                        : isDarkMode ? 'bg-amber-500/10 border-amber-500/50' : 'bg-amber-50 border-amber-500/50'
                                }`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className={`text-[9px] font-bold uppercase tracking-widest ${alert.color}`}>{alert.type} ALERT</span>
                                    <span className={`text-[9px] font-bold ${textMuted}`}>{alert.priority}</span>
                                </div>
                                <p className={`text-[12px] font-bold leading-snug ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{alert.text}</p>
                            </div>
                        ))}
                        <button className={`w-full py-2.5 mt-2 rounded-xl text-[11px] font-bold border transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10' : 'bg-gray-50 border-gray-100 text-gray-500 hover:bg-gray-100'}`}>
                            CLEAR ALL NOTIFICATIONS
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* ── 6. Document Records Panel ─────────────────────────────────── */}
            <motion.div {...fadeProps} className={`${cardClass} flex flex-col`}>
                <div className={headerClass}>
                    <div className="flex items-center gap-2">
                        <FileCheck size={18} className="text-emerald-500" />
                        <h3 className={headingClass}>Compliance Document Records</h3>
                    </div>
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-blue-500 px-3 py-1.5 rounded-lg hover:bg-blue-500/5 transition-all">
                        <Upload size={14} /> Upload New Batch
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`border-b text-[10px] font-bold uppercase text-gray-400 ${dividerClass}`}>
                                <th className="p-4 px-6">Document Name</th>
                                <th className="p-4 text-center">Type</th>
                                <th className="p-4 text-center">Period</th>
                                <th className="p-4 text-center">Upload Date</th>
                                <th className="p-4 text-center">Status</th>
                                <th className="p-4 px-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[12px]">
                            {documents.map((doc, i) => (
                                <tr key={i} className={`border-b last:border-0 hover:bg-white/[0.02] transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-50 hover:bg-gray-50'}`}>
                                    <td className="p-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-500/10 flex items-center justify-center shrink-0">
                                                <FileText size={14} className="text-gray-500" />
                                            </div>
                                            <span className={`font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-center"><span className={`px-2 py-0.5 rounded uppercase text-[10px] font-bold bg-gray-500/10 ${textMuted}`}>{doc.type}</span></td>
                                    <td className={`p-4 text-center font-medium ${textMuted}`}>{doc.period}</td>
                                    <td className={`p-4 text-center font-medium ${textMuted}`}>{doc.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${STATUS_STYLE[doc.status]}`}>{doc.status}</span>
                                    </td>
                                    <td className="p-4 px-6 text-right">
                                        <div className="flex gap-2 justify-end">
                                            <button title="Download" className={`p-1.5 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-all`}><FileDown size={14} /></button>
                                            <button title="View" className={`p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-all`}><Eye size={14} /></button>
                                            <button title="External Link" className={`p-1.5 rounded-lg text-gray-400 hover:bg-gray-500/10 transition-all`}><ExternalLink size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* ── 7. Quick Compliance Actions ───────────────────────────────── */}
            <motion.div {...fadeProps} className={`${cardClass} p-6`}>
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <ArrowUpRight size={15} className="text-blue-500" />
                    </div>
                    <h3 className={headingClass}>Quick Compliance Actions</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Upload Document', icon: Upload,         color: 'text-blue-500'    },
                        { label: 'File PF Returns',  icon: Landmark,       color: 'text-emerald-500' },
                        { label: 'Submit ESI',       icon: HeartHandshake, color: 'text-violet-500'  },
                        { label: 'Generate Report',  icon: RefreshCw,       color: 'text-amber-500'   },
                    ].map((btn, i) => (
                        <button 
                            key={i} 
                            className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all active:scale-95 group overflow-hidden relative ${
                                isDarkMode 
                                    ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' 
                                    : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md text-dark'
                            }`}
                        >
                            <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-white/5 border border-white/5 shadow-sm`}>
                                <btn.icon size={20} className={btn.color} />
                            </div>
                            <span className="text-xs font-bold leading-tight uppercase tracking-wider">{btn.label}</span>
                            {/* Hover glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Footer */}
            <div className={`py-8 text-center mt-auto border-t border-dashed ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase">System Online</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                        <span className="text-[10px] font-bold text-blue-500 uppercase">Compliance v2.8</span>
                    </div>
                </div>
                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>NEXI5 Government Compliance Monitor · Secure Channel 0x4F2A</p>
            </div>
        </div>
    );
}
