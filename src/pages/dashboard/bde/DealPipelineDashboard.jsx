import React, { useState, useEffect } from 'react';
import { 
    LayoutDashboard, TrendingUp, BarChart3, Target, 
    Plus, Filter, Search, Download, FileText, 
    Share2, Calendar, Clock, ChevronRight, 
    MoreHorizontal, ArrowRight, CheckCircle2, 
    XCircle, AlertCircle, Building2, User, Eye,
    DollarSign, Briefcase, PieChart as PieIcon, RefreshCw
} from 'lucide-react';
import { 
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';

// Datasets
import { 
    dealValueInsights, winRateDistribution, pipelineStagesData, 
    topOpportunities, recentDealActivity, pipelineFilterOptions 
} from '@/datasets/bde/dealPipelineData';

// --- Sub-components ---


const KanbanCard = ({ deal, isDarkMode }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4, shadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        className={`${isDarkMode ? 'bg-[#0c162d]/50 border-white/5 hover:bg-[#0c162d]/70' : 'bg-white border-slate-100 hover:bg-slate-50'} p-4 rounded-xl border shadow-sm transition-all cursor-pointer group mb-3 last:mb-0`}
    >
        <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">ID: #{deal.id}</span>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 Transition-all"><ArrowRight size={10} /></button>
                <button className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 text-slate-400 Transition-all"><MoreHorizontal size={10} /></button>
            </div>
        </div>
        <h4 className="text-xs font-black truncate leading-tight mb-1">{deal.client}</h4>
        <p className="text-[10px] text-slate-400 font-medium truncate mb-3">{deal.requirement}</p>
        
        <div className="flex items-center gap-1.5 mb-3">
            <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
            <span className="text-[11px] font-black text-emerald-500">{deal.value}</span>
        </div>

        <div className="pt-3 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-[9px] font-black text-blue-500">
                    {deal.manager.charAt(0)}
                </div>
                <span className="text-[9px] font-bold text-slate-500">{deal.manager}</span>
            </div>
            <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400">
                <Calendar size={10} />
                {deal.date}
            </div>
        </div>
    </motion.div>
);

const ProbabilityBar = ({ value, isDarkMode }) => (
    <div className="flex items-center gap-3">
        <div className={`h-1.5 w-24 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-slate-100'}`}>
            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full rounded-full ${
                    value >= 70 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' :
                    value >= 50 ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' :
                    'bg-slate-400'
                }`}
            />
        </div>
        <span className="text-[10px] font-black w-8">
            <CountUp end={value} duration={2} suffix="%" />
        </span>
    </div>
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

export default function DealPipelineDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const glassClass = `${isDarkMode ? 'bg-[#1f2937]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'} p-6 rounded-xl border transition-all duration-300 relative overflow-hidden`;
    const headingClass = `font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* Background Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />

            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight uppercase">Deal Pipeline</h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Track and manage sales opportunities across multiple pipeline stages.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <Plus size={16} />
                        Add New Deal
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Briefcase size={16} />
                        Import Opportunities
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <FileText size={16} />
                        Export Pipeline Report
                    </button>
                </div>
            </div>

            {/* 3. Pipeline Filters */}
            <div className={glassClass}>
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Filter size={14} />
                    Pipeline Filters
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {pipelineFilterOptions.map((filter, i) => (
                        <div key={i} className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{filter.label}</label>
                            <select className={`w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}>
                                {filter.options.map((opt, idx) => (
                                    <option key={idx} className={isDarkMode ? 'bg-[#0c162d] transition-colors' : ''}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. Deal Pipeline Kanban Board */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Opportunities Pipeline</h2>
                    <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-white/5 text-slate-400"><RefreshCw size={14} /></button>
                </div>
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex gap-6 min-w-[max-content]">
                        {Object.entries(pipelineStagesData).map(([stage, deals], i) => (

                            <div key={stage} className="w-[280px] flex flex-col gap-4">
                                <div className="flex items-center justify-between px-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${
                                            stage === 'Closed Won' ? 'bg-emerald-500' : 
                                            stage === 'Closed Lost' ? 'bg-red-500' :
                                            stage === 'Negotiation' ? 'bg-amber-500' :
                                            'bg-blue-500'
                                        }`} />
                                        <span className="text-[11px] font-black uppercase text-slate-500 tracking-tighter">{stage}</span>
                                    </div>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                        {deals.length}
                                    </span>
                                </div>
                                <div className={`flex-1 min-h-[450px] p-2 rounded-2xl border transition-all ${isDarkMode ? 'bg-slate-900/40 border-white/5' : 'bg-slate-50/50 border-slate-100'}`}>
                                    <AnimatePresence>
                                        {deals.map((deal) => (
                                            <KanbanCard key={deal.id} deal={deal} isDarkMode={isDarkMode} />
                                        ))}
                                    </AnimatePresence>
                                    {deals.length === 0 && (
                                        <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-30">
                                            <AlertCircle size={24} className="mb-2" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest">No Active Deals</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Deal Value Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionCard delay={0.4}>
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Deal Value by Stage (₹)</h2>
                            <BarChart3 size={18} className="text-blue-500" />
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dealValueInsights}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151/20' : '#f1f5f9'} />
                                    <XAxis dataKey="stage" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} tickFormatter={(value) => `₹${value/100000}L`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                        formatter={(val) => [`₹${val.toLocaleString()}`, 'Total Value']}
                                    />
                                    <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>

                <MotionCard delay={0.5}>
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Win Rate Distribution</h2>
                            <PieIcon size={18} className="text-emerald-500" />
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={winRateDistribution}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={85}
                                        paddingAngle={5} dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {winRateDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                        formatter={(val) => [`${val}%`, 'Pipeline share']}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 7. Top Deals Table */}
            <MotionCard delay={0.6}>
                <div className={glassClass}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h2 className={headingClass}>Top Opportunities</h2>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input 
                                type="text" 
                                placeholder="Search deals..." 
                                className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Client Name</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Value</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Deal Stage</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Probability</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Closing Date</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {topOpportunities.map((row, idx) => (
                                    <tr key={idx} className={`group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'} transition-colors`}>
                                        <td className="py-4 pr-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black">{row.client}</span>
                                                <span className="text-[9px] font-bold text-slate-500 uppercase">{row.industry}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 text-xs font-black text-emerald-500">{row.value}</td>
                                        <td className="py-4 pr-4">
                                            <StatusBadge status={row.stage} />
                                        </td>
                                        <td className="py-4 pr-4">
                                            <ProbabilityBar value={row.probability} isDarkMode={isDarkMode} />
                                        </td>
                                        <td className="py-4 pr-4 text-[10px] font-bold text-slate-500">{row.date}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-md hover:bg-blue-500/20 text-blue-400 Transition-all" title="View Deal"><Eye size={12} /></button>
                                                <button className="p-1.5 rounded-md hover:bg-amber-500/20 text-amber-400 Transition-all" title="Update Stage"><ArrowRight size={12} /></button>
                                                <button className="p-1.5 rounded-md hover:bg-emerald-500/20 text-emerald-400 Transition-all" title="Schedule Meeting"><Calendar size={12} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </MotionCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 8. Recent Deal Activity */}
                <MotionCard delay={0.7} className="lg:col-span-2">
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Recent Pipeline Activity</h2>
                            <Clock size={18} className="text-blue-500" />
                        </div>
                        <div className="space-y-6">
                            {recentDealActivity.map((activity) => (
                                <div key={activity.id} className="flex gap-4 group cursor-default">
                                    <div className="mt-1">
                                        <div className={`w-2 h-2 rounded-full ${
                                            activity.type === 'won' ? 'bg-emerald-500 ring-4 ring-emerald-500/10' :
                                            activity.type === 'move' ? 'bg-amber-500 ring-4 ring-amber-500/10' :
                                            'bg-blue-500 ring-4 ring-blue-500/10'
                                        }`} />
                                    </div>
                                    <div className="flex-1">
                                        <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{activity.text}</p>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1.5 block">{activity.time}</span>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </MotionCard>

                {/* 9. Quick Actions */}
                <MotionCard delay={0.8}>
                    <div className={glassClass}>
                        <h2 className={`font-bold uppercase tracking-widest text-[11px] mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Pipeline Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: 'Create Deal', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                { label: 'Schedule Meeting', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                                { label: 'Send Proposal', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                                { label: 'Pipeline Report', icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
                            ].map((action, i) => (
                                <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/30' : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-white hover:shadow-md'}`}>
                                    <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <action.icon size={18} className={action.icon === Eye ? '' : action.color} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black tracking-tight">{action.label}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Fast Execution</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* Footer */}
            <div className={`py-12 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    NEXI5 Sales Opportunity Command Center
                </p>
            </div>
        </div>
    );
}
