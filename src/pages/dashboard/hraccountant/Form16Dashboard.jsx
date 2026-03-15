import { useState, useEffect } from 'react';
import { 
    FileCheck, FileText, Search, Filter, ChevronDown, Download, Eye, 
    Mail, RefreshCw, Send, Plus, History, FileDown, MoreVertical, 
    Building2, User, Calendar, ShieldCheck, CheckCircle, 
    Clock, Upload, Grid, List, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    form16InitialRecords as initialRecords, form16ActivityTimeline as activityTimeline
} from '@/datasets/hraccountant/form16DashboardData';


// ─── Sub-components ───────────────────────────────────────────────────────────

const CountUp = ({ value, prefix = '', suffix = '' }) => {
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

const StatusBadge = ({ status }) => {
    const styles = {
        Generated: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
        Pending: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
        Sent: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border-blue-100 dark:border-blue-500/20",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${styles[status]}`}>
            {status}
        </span>
    );
};

const ActionCard = (props) => {
    const { icon: CardIcon, title, description, buttonText, onClick, isDarkMode } = props;
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg flex flex-col gap-4 ${
                isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-gray-100 shadow-sm'
            }`}
        >
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl">
                    <CardIcon size={24} className="text-blue-500" />
                </div>
                <div>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
                </div>
            </div>
            <button 
                onClick={onClick}
                className="mt-2 w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/10"
            >
                {buttonText}
            </button>
        </motion.div>
    );
};




// ─── Main Component ───────────────────────────────────────────────────────────

export default function Form16Dashboard() {
    const { isDarkMode } = useTheme();
    const [selectedRecord, setSelectedRecord] = useState(initialRecords[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fy, setFy] = useState("2025–2026");
    const [dept, setDept] = useState("All Departments");
    const [statusFilter, setStatusFilter] = useState("All Status");

    const fadeProps = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 }
    };

    const cardClass = `rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'} p-6`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'bg-[#0c162d]/50 text-white' : 'bg-lightBlueBg text-dark'}`}>
            
            {/* ── 2. Module Title ───────────────────────────────────────────── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center">
                        <FileCheck size={22} className="text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight uppercase">Form 16 Tax Certificates</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">Compliance Management & Certificate Distribution</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        <Plus size={15} /> Generate Form 16
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-blue-500 border border-blue-100 dark:border-gray-700 rounded-lg text-sm font-bold transition-all hover:bg-blue-50">
                        <Grid size={15} /> Bulk Generate
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 rounded-lg text-sm font-bold transition-all hover:bg-gray-50">
                        <FileDown size={15} /> Export Certificates
                    </button>
                </div>
            </div>

            {/* ── 3. Financial Year Selector ────────────────────────────────── */}
            <motion.div {...fadeProps} className={cardClass}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Financial Year</label>
                        <div className="relative">
                            <select 
                                value={fy} 
                                onChange={(e) => setFy(e.target.value)}
                                className="w-full pl-3 pr-10 py-2.5 bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 appearance-none font-medium"
                            >
                                <option>2025–2026</option>
                                <option>2024–2025</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Department</label>
                        <div className="relative">
                            <select 
                                value={dept} 
                                onChange={(e) => setDept(e.target.value)}
                                className="w-full pl-3 pr-10 py-2.5 bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 appearance-none font-medium"
                            >
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>HR</option>
                                <option>Finance</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Employee Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search by name or ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 font-medium"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Generation Status</label>
                        <div className="relative">
                            <select 
                                value={statusFilter} 
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-3 pr-10 py-2.5 bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 appearance-none font-medium"
                            >
                                <option>All Status</option>
                                <option>Generated</option>
                                <option>Pending</option>
                                <option>Sent</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── 4. Form 16 Generation Center ──────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard 
                    icon={User}
                    title="Generate Individual Certificate"
                    description="Generate Form 16 for selected employee after finalizing TDS calculation."
                    buttonText="Generate Certificate"
                    isDarkMode={isDarkMode}
                />
                <ActionCard 
                    icon={Grid}
                    title="Bulk Generate Certificates"
                    description="Run bulk process to generate Form 16 for an entire department or company."
                    buttonText="Bulk Generate"
                    isDarkMode={isDarkMode}
                />
                <ActionCard 
                    icon={Upload}
                    title="Upload Generated Certificates"
                    description="Import externally generated or legacy signed Form 16 certificates."
                    buttonText="Upload Certificate"
                    isDarkMode={isDarkMode}
                />
            </div>

            {/* ── 5. Employee Records & 6. Preview ──────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Records Table */}
                <motion.div {...fadeProps} className={`lg:col-span-8 rounded-xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-tight flex items-center gap-2">
                            <List size={16} className="text-blue-500" />
                            Employee Form 16 Records
                        </h3>
                        <div className="flex gap-3">
                            <div className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded uppercase tracking-widest border border-emerald-100 dark:border-emerald-500/20">
                                32 Generated
                            </div>
                            <div className="text-[10px] font-bold text-amber-500 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded uppercase tracking-widest border border-amber-100 dark:border-amber-500/20">
                                12 Pending
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-[#111827] border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Employee Details</th>
                                    <th className="px-4 py-4">Dept / FY</th>
                                    <th className="px-4 py-4 text-center">Gen Date</th>
                                    <th className="px-4 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                {initialRecords.map((row, idx) => (
                                    <tr 
                                        key={idx} 
                                        onClick={() => setSelectedRecord(row)}
                                        className={`group cursor-pointer hover:bg-blue-50/30 dark:hover:bg-blue-500/5 transition-all ${selectedRecord?.id === row.id ? 'bg-blue-50/50 dark:bg-blue-500/10' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{row.name}</span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{row.id}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{row.dept}</span>
                                                <span className="text-[10px] text-gray-400">{row.fy}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{row.date}</span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex justify-center">
                                                <StatusBadge status={row.status} />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                                <button title="Preview" className="p-1.5 text-blue-500 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all"><Eye size={14} /></button>
                                                <button title="Download" className="p-1.5 text-emerald-500 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all"><Download size={14} /></button>
                                                <button title="Email" className="p-1.5 text-indigo-500 bg-white dark:bg-gray-800 rounded shadow-sm border border-gray-100 dark:border-gray-700 hover:scale-110 transition-all"><Send size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Preview Panel */}
                <motion.div {...fadeProps} className="lg:col-span-4 flex flex-col gap-6">
                    <div className={`rounded-xl border transition-all overflow-hidden sticky top-6 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="p-5 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-tight flex items-center gap-2 text-blue-600">
                                <Eye size={16} />
                                Form 16 Preview
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* PDF Viewer Mock */}
                            <div className="aspect-[3/4] bg-gray-50 dark:bg-[#111827] rounded-xl border border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-8 text-center group transition-all">
                                <FileText className={`w-16 h-16 text-gray-200 dark:text-gray-800 mb-4 transition-transform group-hover:scale-110 duration-500`} />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest line-clamp-2">
                                    {selectedRecord?.status === 'Generated' || selectedRecord?.status === 'Sent' 
                                        ? `Official Certificate for ${selectedRecord?.name}` 
                                        : "Certificate Not Yet Generated"}
                                </p>
                                {selectedRecord?.status === 'Generated' && (
                                    <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-500">
                                        <CheckCircle size={14} /> Ready to Send
                                    </div>
                                )}
                            </div>

                            {/* Metadata */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 dark:border-gray-800">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Employee</span>
                                    <span className="text-xs font-bold">{selectedRecord?.name}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 dark:border-gray-800">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Financial Year</span>
                                    <span className="text-xs font-bold text-blue-500">{selectedRecord?.fy}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 dark:border-gray-800">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Gen Date</span>
                                    <span className="text-xs font-bold">{selectedRecord?.date}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-dashed border-gray-100 dark:border-gray-800">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">Status</span>
                                    <StatusBadge status={selectedRecord?.status} />
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-2 pt-4">
                                <button className="w-full flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/10">
                                    <Download size={14} /> Download Certificate
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10">
                                    <Send size={14} /> Send to Employee
                                </button>
                                <button className="w-full py-2.5 text-blue-500 text-xs font-bold hover:underline">
                                    Regenerate Certificate
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ── 7. Distribution Panel ─────────────────────────────────────── */}
            <motion.div {...fadeProps} className={cardClass}>
                <div className="flex items-center gap-2 mb-6">
                    <Mail size={18} className="text-blue-500" />
                    <h3 className="text-sm font-bold uppercase tracking-tight">Form 16 Distribution Tracking</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <th className="px-6 py-3">Employee</th>
                                <th className="px-4 py-3">Email Address</th>
                                <th className="px-4 py-3">Department</th>
                                <th className="px-4 py-3 text-center">Sent Date</th>
                                <th className="px-6 py-3 text-right">Delivery Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                            {initialRecords.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-all text-xs">
                                    <td className="px-6 py-4 font-bold">{row.name}</td>
                                    <td className="px-4 py-4 text-blue-500 font-medium">{row.email}</td>
                                    <td className="px-4 py-4">{row.dept}</td>
                                    <td className="px-4 py-4 text-center font-medium text-gray-500">{row.sentDate}</td>
                                    <td className="px-6 py-4 text-right">
                                        {row.sentDate !== 'Pending' ? (
                                            <div className="flex items-center justify-end gap-1.5 text-emerald-500 font-bold uppercase tracking-tighter text-[10px]">
                                                <Check size={14} /> Delivered
                                            </div>
                                        ) : (
                                            <button className="px-3 py-1.5 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded text-[10px] font-bold uppercase tracking-widest transition-all">
                                                Send Certificate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* ── 8. Recent Activity & 9. Quick Actions ───────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
                {/* Activity Feed */}
                <motion.div {...fadeProps} className={cardClass}>
                    <div className="flex items-center gap-2 mb-6">
                        <History size={18} className="text-blue-500" />
                        <h3 className="text-sm font-bold uppercase tracking-tight">Recent Form 16 Activity</h3>
                    </div>
                    <div className="space-y-6 relative">
                        <div className={`absolute left-[13px] top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800`}></div>
                        {activityTimeline.map((item, i) => (
                            <div key={i} className="relative flex items-start gap-4 group">
                                <div className={`z-10 w-7 h-7 rounded-lg bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                    <item.icon size={14} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-bold leading-tight group-hover:text-blue-500 transition-colors">{item.text}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Clock size={10} className="text-gray-400" />
                                        <span className="text-[10px] font-medium text-gray-400 font-mono">{item.time}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions Panel */}
                <motion.div {...fadeProps} className={`lg:col-span-2 ${cardClass}`}>
                    <div className="flex items-center gap-2 mb-8">
                        <Grid size={18} className="text-blue-500" />
                        <h3 className="text-sm font-bold uppercase tracking-tight">System Quick Actions</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Generate Certificates', icon: FilePlus, color: 'bg-blue-500' },
                            { label: 'Bulk Email Form 16', icon: Send, color: 'bg-emerald-500' },
                            { label: 'Export Certificate List', icon: FileDown, color: 'bg-amber-500' },
                            { label: 'Download All Certificates', icon: Download, color: 'bg-purple-500' },
                        ].map((btn, i) => (
                            <button 
                                key={i} 
                                className={`flex flex-col items-center gap-4 p-5 rounded-2xl border transition-all active:scale-95 group overflow-hidden relative ${
                                    isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-xl'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${btn.color} group-hover:-translate-y-1 transition-transform`}>
                                    {btn.icon === FilePlus ? <FileCheck size={24} /> : <btn.icon size={24} />}
                                </div>
                                <span className="text-[10px] font-extrabold uppercase tracking-widest text-center leading-tight">{btn.label}</span>
                                <div className="absolute -bottom-1 -right-1 opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                                    {btn.icon === FilePlus ? <FileCheck size={60} /> : <btn.icon size={60} />}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-xl border border-dashed border-blue-200 dark:border-blue-500/20 flex gap-4 items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                            <ShieldCheck size={20} className="text-blue-500" />
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed italic text-blue-600/80 dark:text-blue-400/60">
                            <span className="font-bold text-blue-600 dark:text-blue-400 uppercase mr-1">Compliance Alert:</span>
                            Ensure all Form 16 certificates are digitally signed before distribution to maintain legal validity for employee tax filings.
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Sticky Execution Footer */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 p-1 bg-white/40 dark:bg-[#1f2937]/40 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 dark:border-gray-800/20 z-50">
                <div className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-500/20">
                    <CheckCircle size={14} className="animate-pulse" />
                    System Active
                </div>
                <div className="flex items-center gap-6 px-4 pr-8 py-2">
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-bold text-emerald-500 uppercase leading-none mb-1">Generated</span>
                        <span className="text-sm font-black tracking-tighter">72%</span>
                    </div>
                    <div className="w-px h-6 bg-gray-300 dark:bg-gray-700" />
                    <div className="flex flex-col items-center">
                        <span className="text-[8px] font-bold text-blue-500 uppercase leading-none mb-1">Sent</span>
                        <span className="text-sm font-black tracking-tighter">45%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

const FilePlus = ({ size, className }) => <FileText size={size} className={className} />;
