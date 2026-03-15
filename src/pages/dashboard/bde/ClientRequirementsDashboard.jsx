import React, { useState } from 'react';
import { 
    ClipboardList, Filter, Search, Plus, 
    Download, FileText, Send, UserCheck, 
    MoreHorizontal, Calendar, IndianRupee, 
    Layers, Building2, Briefcase, Clock, 
    ArrowUpRight, ArrowRight, CheckCircle2,
    PieChart as PieIcon, BarChart3, TrendingUp,
    MessageSquare, Eye, ExternalLink, Activity
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Datasets
import { 
    requirementsData, industryDistribution, monthlyRequests, 
    recentActivities, requirementFilterOptions 
} from '@/datasets/bde/clientRequirementsData';

// --- Sub-components ---


const StatusBadge = ({ status }) => {
    const styles = {
        'Open': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        'In Discussion': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
        'Proposal Sent': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        'Closed': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    };
    
    return (
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${styles[status] || 'bg-gray-500/10 text-gray-500'}`}>
            {status}
        </span>
    );
};

const RequirementCard = ({ requirement, isDarkMode }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -5, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
        className={`${isDarkMode ? 'bg-[#1f2937]/50 border-white/10' : 'bg-white border-slate-100 shadow-sm'} p-5 rounded-2xl border transition-all duration-300 group`}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                    {requirement.client.charAt(0)}
                </div>
                <div>
                    <h3 className="text-xs font-black tracking-tight">{requirement.client}</h3>
                    <p className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} uppercase`}>{requirement.industry}</p>
                </div>
            </div>
            <StatusBadge status={requirement.status} />
        </div>
        
        <h2 className="text-sm font-bold mb-4 line-clamp-1">{requirement.title}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Type</span>
                <p className="text-xs font-bold flex items-center gap-1.5">
                    <Layers size={12} className="text-slate-400" />
                    {requirement.type}
                </p>
            </div>
            <div className="space-y-1">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Budget</span>
                <p className="text-xs font-bold flex items-center gap-1.5 text-emerald-500">
                    <IndianRupee size={12} />
                    {requirement.budget}
                </p>
            </div>
            <div className="space-y-1">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Deadline</span>
                <p className="text-xs font-bold flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400" />
                    {requirement.deadline}
                </p>
            </div>
            <div className="space-y-1">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Posted</span>
                <p className="text-xs font-bold flex items-center gap-1.5">
                    <Clock size={12} className="text-slate-400" />
                    {requirement.posted}
                </p>
            </div>
        </div>
        
        <div className={`pt-4 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-50'} flex items-center justify-between gap-2`}>
            <button className={`flex-1 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-slate-50 hover:bg-slate-100 text-slate-700'}`}>
                View Details
            </button>
            <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all group-hover:scale-105 active:scale-95">
                <Send size={14} />
            </button>
        </div>
    </motion.div>
);

const MotionCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function ClientRequirementsDashboard() {
    const { isDarkMode } = useTheme();
    const [viewMode, setViewMode] = useState('board'); // 'board' or 'table'

    const glassClass = `${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'} p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden`;
    const headingClass = `text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-8 font-body min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* Background Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
           
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3">
                        <ClipboardList className="text-blue-500" />
                        Client Requirements
                    </h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Incoming client needs tracking and assignment board.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <Plus size={16} />
                        Add Requirement
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <FileText size={16} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* 3. Requirement Filters Panel */}
            <div className={glassClass}>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Filter size={14} className="text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Board Filters</span>
                    </div>
                    <div className="flex items-center bg-slate-100 dark:bg-white/5 rounded-lg p-1">
                        <button 
                            onClick={() => setViewMode('board')}
                            className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${viewMode === 'board' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Board
                        </button>
                        <button 
                            onClick={() => setViewMode('table')}
                            className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${viewMode === 'table' ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Table
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {requirementFilterOptions.map((filter, i) => (
                        <div key={i} className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{filter.label}</label>
                            <select className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}>
                                {filter.options.map((opt, idx) => (
                                    <option key={idx} className={isDarkMode ? 'bg-[#1f2937]' : ''}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. Requirement Cards Board */}
            <AnimatePresence mode="wait">
                {viewMode === 'board' && (
                    <motion.div 
                        key="board"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        {requirementsData.map((req, i) => (
                            <RequirementCard key={req.id} requirement={req} isDarkMode={isDarkMode} />
                        ))}
                    </motion.div>
                )}

                {/* 6. Requirement Table (Alternative View) */}
                {viewMode === 'table' && (
                    <motion.div 
                        key="table"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={glassClass}
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">ID</th>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Client</th>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Requirement</th>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Budget</th>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Deadline</th>
                                        <th className="pb-4 text-[10px) font-black uppercase text-slate-400 tracking-tighter">Status</th>
                                        <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                    {requirementsData.map((req, idx) => (
                                        <tr key={idx} className={`group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'} transition-colors`}>
                                            <td className="py-5 pr-4 text-[10px] font-black text-blue-500">{req.id}</td>
                                            <td className="py-5 pr-4">
                                                <span className="text-xs font-black">{req.client}</span>
                                            </td>
                                            <td className="py-5 pr-4 max-w-[200px]">
                                                <p className="text-xs font-bold line-clamp-1">{req.title}</p>
                                                <p className="text-[9px] font-bold text-slate-400 mt-0.5">{req.type}</p>
                                            </td>
                                            <td className="py-5 pr-4 text-xs font-black text-emerald-500">{req.budget}</td>
                                            <td className="py-5 pr-4 text-xs font-bold">{req.deadline}</td>
                                            <td className="py-5 pr-4">
                                                <StatusBadge status={req.status} />
                                            </td>
                                            <td className="py-5 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-all"><Eye size={14} /></button>
                                                    <button className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-500 transition-all"><MoreHorizontal size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 5. Requirement Insights Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard delay={0.2} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Industry Distribution</h2>
                        <PieIcon size={18} className="text-blue-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={industryDistribution}
                                    cx="50%" cy="50%"
                                    innerRadius={70} outerRadius={100}
                                    paddingAngle={5} dataKey="value"
                                    animationDuration={1500}
                                >
                                    {industryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                <MotionCard delay={0.3} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Monthly Requirement Inflow</h2>
                        <BarChart3 size={18} className="text-emerald-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyRequests}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                <Tooltip 
                                    cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc' }}
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                />
                                <Bar dataKey="requests" fill="#10B981" radius={[4, 4, 0, 0]} barSize={40} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>
            </div>

            {/* 7. Recent Requirement Activity & 8. Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <MotionCard delay={0.4} className={`lg:col-span-2 ${glassClass}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Recent Activity</h2>
                        <Activity size={18} className="text-blue-500" />
                    </div>
                    <div className="space-y-6">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="flex gap-4 group cursor-default items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    activity.type === 'new' ? 'bg-blue-500/10 text-blue-500' :
                                    activity.type === 'proposal' ? 'bg-purple-500/10 text-purple-500' :
                                    activity.type === 'assignment' ? 'bg-emerald-500/10 text-emerald-500' :
                                    'bg-amber-500/10 text-amber-500'
                                }`}>
                                    {activity.type === 'new' ? <IndianRupee size={18} /> : 
                                     activity.type === 'proposal' ? <FileText size={18} /> :
                                     activity.type === 'assignment' ? <UserCheck size={18} /> :
                                     <Calendar size={18} />}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{activity.text}</p>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">{activity.time}</span>
                                </div>
                                <ArrowRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </MotionCard>

                <MotionCard delay={0.5} className={glassClass}>
                    <h2 className={headingClass + " mb-8"}>Quick Actions</h2>
                    <div className="grid gap-3">
                        {[
                            { label: 'New Requirement', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { label: 'Create Proposal', icon: Send, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                            { label: 'Assign Manager', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { label: 'Market Insights', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-500/10' }
                        ].map((action, i) => (
                            <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/20' : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-white hover:shadow-md'}`}>
                                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <action.icon size={20} className={action.color} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-black tracking-tight">{action.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Requirement Center</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </MotionCard>
            </div>
            
            {/* Footer */}
            <div className={`py-12 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    NEXI5 Project Marketplace Intelligence
                </p>
            </div>
        </div>
    );
}
