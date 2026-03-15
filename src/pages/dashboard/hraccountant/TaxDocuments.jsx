import React, { useState } from 'react';
import { 
    FileText, Search, ChevronDown, Download, Eye, 
    CheckCircle, XCircle, Clock, Upload, History, FileDown, 
    User, Plus, ShieldCheck, ClipboardCheck, FilePlus,
    ExternalLink, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/context/ThemeContext';
import {
    taxStatsData as statsData, taxEmployeeDocuments as employeeDocuments, taxActivityTimeline as activityTimeline
} from '@/datasets/hraccountant/taxDocumentsData';


// --- Helper Components ---

const StatusBadge = ({ status }) => {
    const styles = {
        Verified: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20",
        Pending: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-100 dark:border-amber-500/20",
        Rejected: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 border-red-100 dark:border-red-500/20",
    };
    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status]}`}>
            {status}
        </span>
    );
};

const StatCard = ({ title, count, icon: Icon, color, isDarkMode }) => (
    <div className={`p-4 rounded-xl border flex items-center gap-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDarkMode ? `bg-${color}-500/10 text-${color}-400` : `bg-${color}-50 text-${color}-500`}`}>
            <Icon size={20} />
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{title}</p>
            <h3 className="text-lg font-black tracking-tight text-gray-900 dark:text-white leading-none">
                <CountUp end={count} duration={2} />
            </h3>
        </div>
    </div>
);




export default function TaxDocuments() {
    const { isDarkMode } = useTheme();
    const [selectedDoc, setSelectedDoc] = useState(employeeDocuments[0]);
    const [searchQuery, setSearchQuery] = useState("");

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-6 max-w-[1600px] mx-auto pb-10 px-4 md:px-6"
        >
            {/* --- Module Title Section --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">
                            Tax Documents Library
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Manage and verify employee tax submissions for current financial year.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest border transition-all rounded-lg ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
                        <FileDown size={14} />
                        Export Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-500/20 transition-all active:scale-95">
                        <Upload size={14} />
                        Bulk Upload
                    </button>
                </div>
            </div>

            {/* --- Updated Stats Row --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsData.map((stat, idx) => (
                    <StatCard key={idx} {...stat} isDarkMode={isDarkMode} />
                ))}
            </div>

            {/* --- Main Workspace Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* 1. Integrated Table & Filters (Left 8 Cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <motion.div variants={itemVariants} className={`rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                        {/* Integrated Filters Header */}
                        <div className={`p-4 border-b flex flex-col gap-4 ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-gray-50 bg-gray-50/30'}`}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                                    <ClipboardCheck size={18} className="text-emerald-500" />
                                    Employee Documents
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 uppercase tracking-widest">Live Repository</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by ID or Name..."
                                        className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-blue-500/50' : 'bg-white border-gray-200 focus:border-blue-500'}`}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select className={`px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                                    <option>F.Y. 2025–26</option>
                                    <option>F.Y. 2024–25</option>
                                </select>
                                <select className={`px-3 py-2 text-xs rounded-xl border outline-none cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`}>
                                    <option>All Departments</option>
                                    <option>Engineering</option>
                                    <option>Human Resources</option>
                                </select>
                            </div>
                        </div>

                        {/* Document Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className={`border-b text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'border-white/5 text-slate-500' : 'border-gray-100 text-gray-400'}`}>
                                        <th className="px-6 py-4">Employee Details</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4 text-center">F.Y.</th>
                                        <th className="px-6 py-4 text-center">Date</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                                    {employeeDocuments.map((doc, idx) => (
                                        <tr 
                                            key={idx} 
                                            onClick={() => setSelectedDoc(doc)}
                                            className={`group transition-all cursor-pointer ${isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-gray-50'} ${selectedDoc?.id === doc.id ? (isDarkMode ? 'bg-blue-500/10' : 'bg-blue-50/50') : ''}`}
                                        >
                                            <td className="px-6 py-4 flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>{doc.name.charAt(0)}</div>
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold dark:text-gray-100 leading-none mb-1">{doc.name}</span>
                                                    <span className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{doc.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[12px] text-gray-600 dark:text-gray-400 font-medium">{doc.type}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>{doc.year}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-[12px] text-gray-500">{doc.date}</td>
                                            <td className="px-6 py-4 text-center">
                                                <StatusBadge status={doc.status} />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                    <button className="p-1.5 rounded hover:bg-blue-500/10 text-blue-500 transition-all"><Eye size={14} /></button>
                                                    <button className="p-1.5 rounded hover:bg-emerald-500/10 text-emerald-500 transition-all"><Download size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>

                {/* 2. Unified Sidebar - Verification Workspace & Activity (Right 4 Cols) */}
                <div className="lg:col-span-4 space-y-6">
                    <AnimatePresence mode='wait'>
                        <motion.div 
                            key={selectedDoc?.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
                        >
                            <div className={`p-4 border-b flex items-center justify-between ${isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-gray-50/50 border-gray-100'}`}>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Verification Hub</h3>
                                <StatusBadge status={selectedDoc?.status} />
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Preview Placeholder */}
                                <div className={`aspect-[4/3] rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center p-4 transition-all hover:border-blue-500/50 cursor-pointer group ${isDarkMode ? 'bg-[#0c162d]/20 border-white/10' : 'bg-gray-50 border-gray-200'}`}>
                                    <FileText className={`w-12 h-12 mb-3 transition-transform group-hover:scale-110 ${isDarkMode ? 'text-gray-700' : 'text-gray-300'}`} />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{selectedDoc?.type}</p>
                                    <div className="mt-4 flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-[9px] font-black">
                                        <Eye size={10} /> PREVIEW SECURED
                                    </div>
                                </div>

                                {/* Integrated Meta & Actions */}
                                <div className="space-y-4">
                                    <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <User size={16} />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Document Owner</p>
                                                <p className="text-xs font-bold dark:text-white leading-none">{selectedDoc?.name} ( {selectedDoc?.dept} )</p>
                                            </div>
                                        </div>
                                        <p className="text-[11px] text-gray-500 italic leading-relaxed">
                                            "Please verify the authenticity of the attached investment proof before processing March payroll."
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20">
                                            <Check size={14} /> Approve
                                        </button>
                                        <button className="flex items-center justify-center gap-2 py-3 text-[11px] font-black uppercase tracking-widest text-white bg-rose-500 hover:bg-rose-600 rounded-xl transition-all active:scale-95 shadow-lg shadow-rose-500/20">
                                            <XCircle size={14} /> Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Compact Activity Panel */}
                    <div className={`p-6 rounded-2xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Global Activity</h3>
                            <div className="text-[9px] font-black px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded uppercase">Live</div>
                        </div>
                        <div className="space-y-5">
                            {activityTimeline.map((act) => (
                                <div key={act.id} className="flex gap-4 group">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${isDarkMode ? 'bg-white/5 border border-white/5 text-blue-400' : 'bg-gray-100 text-blue-500'}`}>
                                        <act.icon size={14} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300 leading-tight group-hover:text-blue-500 transition-colors">
                                            {act.action}
                                        </p>
                                        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest flex items-center gap-1 font-black leading-none">
                                            <Clock size={10} /> {act.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Stats Overlay */}
            <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 p-1.5 rounded-full border backdrop-blur-xl z-50 transition-all flex items-center gap-4 ${isDarkMode ? 'bg-[#0c162d]/90 border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]' : 'bg-white/95 border-gray-200 shadow-2xl'}`}>
                <div className="px-4 py-2 bg-blue-600 rounded-full flex items-center gap-2 text-white shadow-lg shadow-blue-500/20">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">NEXI5 Vault Active</span>
                </div>
                <div className="flex items-center gap-6 pr-6">
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-emerald-500 uppercase leading-none mb-1 tracking-tighter">Verification Rate</span>
                        <span className="text-[15px] font-black dark:text-white leading-none tracking-tighter">92.4%</span>
                    </div>
                    <div className="w-px h-6 bg-gray-200 dark:bg-white/5" />
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-black text-amber-500 uppercase leading-none mb-1 tracking-tighter">Critical Pending</span>
                        <span className="text-[15px] font-black dark:text-white leading-none tracking-tighter">18</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

