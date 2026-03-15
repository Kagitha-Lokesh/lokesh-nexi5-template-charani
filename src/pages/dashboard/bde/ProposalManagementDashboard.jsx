import React, { useState } from 'react';
import { 
    FileText, Send, Clock, CheckCircle2, XCircle, 
    MoreHorizontal, Plus, Search, Filter, 
    Download, Upload, Share2, FileDown, 
    Calendar, Eye, Edit3, Bell, 
    PieChart as PieIcon, BarChart3, TrendingUp, 
    ArrowRight, MessageSquare, AlertCircle, User
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';

// Datasets
import { 
    proposalConversionRate, monthlyProposalValue, proposalWorkflowData, 
    allProposals, recentProposalActivity, proposalFilterOptions 
} from '@/datasets/bde/proposalManagementData';

// --- Sub-components ---


const ProposalCard = ({ proposal, isDarkMode }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, shadow: '0 8px 30px rgba(0,0,0,0.1)' }}
        className={`${isDarkMode ? 'bg-[#0c162d]/50 border-white/5 hover:bg-[#0c162d]/70' : 'bg-white border-slate-100 hover:bg-slate-50'} p-4 rounded-xl border shadow-sm transition-all cursor-pointer group mb-3 last:mb-0`}
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">{proposal.id}</span>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400"><Eye size={10} /></button>
                <button className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400"><FileDown size={10} /></button>
            </div>
        </div>
        <h4 className="text-xs font-black truncate leading-tight mb-1">{proposal.client}</h4>
        <p className="text-[10px] text-slate-400 font-medium truncate mb-3">{proposal.project}</p>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-white/5">
            <span className="text-[11px] font-black text-emerald-500">{proposal.value}</span>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                <Calendar size={10} />
                {proposal.date}
            </div>
        </div>
    </motion.div>
);

const MotionCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5 }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function ProposalManagementDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const glassClass = `${isDarkMode ? 'bg-[#1f2937]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'} p-6 rounded-xl border transition-all duration-300`;
    const headingClass = `font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`;

    const getStatusColor = (status) => {
        switch(status.toLowerCase()) {
            case 'draft': return 'bg-slate-100 text-slate-600 dark:bg-white/5 dark:text-slate-400';
            case 'sent': return 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
            case 'under review': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400';
            case 'approved': return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400';
            case 'rejected': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* Background Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight uppercase text-blue-600">Proposal Management</h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Create, track, and manage client proposals in a centralized workspace.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <Plus size={16} />
                        Create Proposal
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Upload size={16} />
                        Upload Proposal
                    </button>
                </div>
            </div>

            {/* 3. Proposal Filters Panel */}
            <div className={glassClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {proposalFilterOptions.map((filter, i) => (
                        <div key={i} className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{filter.label}</label>
                            {filter.type === 'text' ? (
                                <input placeholder={filter.placeholder} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`} />
                            ) : (
                                <select className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}>
                                    {filter.options.map((opt, idx) => (
                                        <option key={idx} className={isDarkMode ? 'bg-[#0c162d] transition-colors' : ''}>{opt}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. Proposal Workflow Cards */}
            <div className="space-y-4">
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex gap-6 min-w-[max-content]">
                        {Object.entries(proposalWorkflowData).map(([stage, proposals], i) => (

                            <div key={stage} className="w-[260px] flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">{stage}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {proposals.length}
                                    </span>
                                </div>
                                <div className={`flex-1 min-h-[350px] p-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900/40 border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
                                    <AnimatePresence>
                                        {proposals.map((prop) => (
                                            <ProposalCard key={prop.id} proposal={prop} isDarkMode={isDarkMode} />
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Proposal Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionCard delay={0.4}>
                    <div className={glassClass}>
                        <h2 className={headingClass}>Proposal Status Distribution</h2>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={proposalConversionRate}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={85}
                                        paddingAngle={5} dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {proposalConversionRate.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>

                <MotionCard delay={0.5}>
                    <div className={glassClass}>
                        <h2 className={headingClass}>Proposal Value Trend</h2>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyProposalValue}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151/20' : '#f1f5f9'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 7. Proposal Table */}
            <MotionCard delay={0.6}>
                <div className={glassClass}>
                    <h2 className={headingClass}>Detailed Proposal Records</h2>
                    <div className="overflow-x-auto mt-6">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400">ID</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400">Client</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400">Project</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400">Value</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {allProposals.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5">
                                        <td className="py-4 text-[10px] font-black text-blue-500">{row.id}</td>
                                        <td className="py-4 text-xs font-black">{row.client}</td>
                                        <td className="py-4 text-[10px] font-bold text-slate-500">{row.project}</td>
                                        <td className="py-4 text-xs font-black text-emerald-500">{row.value}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Eye size={14} className="cursor-pointer text-slate-400" />
                                                <Edit3 size={14} className="cursor-pointer text-slate-400" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MotionCard>
        </div>
    );
}
