import React, { useState, useEffect } from 'react';
import { 
    TrendingUp, BarChart3, Users, Target, 
    Briefcase, Calendar, Filter, Search, 
    Download, FileText, Share2, Plus, 
    ChevronRight, Clock, MapPin, DollarSign,
    Building2, PieChart as PieIcon, RefreshCw, Eye
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
    AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from '@/components/common';

// Datasets
import { leadOverview } from '@/datasets/dashboard/bdeStats';
import { revenueForecast, industryDistribution } from '@/datasets/charts/bdeCharts';
import { pipelineData, clientOpportunities } from '@/datasets/sales/salesData';
import { recentSalesActivity, quickSalesActions } from '@/datasets/logs/salesLogs';
import { bdeFilterOptions } from '@/datasets/bde/bdeDashboardData';


// --- Sub-components ---

const Counter = ({ value }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseInt(value);
        if (start === end) return;
        const totalDuration = 1000;
        const increment = end / (totalDuration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);
    return <span>{count}</span>;
};

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

export default function BDEDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const glassClass = `${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'} p-6 rounded-xl border transition-all duration-300`;
    const headingClass = `font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-800'}`;
    const pipelineColumnClass = `${isDarkMode ? 'bg-slate-900/40 border-white/5' : 'bg-slate-50 border-slate-100'} p-3 rounded-xl border min-h-[400px] w-full`;
    const dealCardClass = `${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 border-white/5' : 'bg-white hover:bg-slate-50 border-slate-100'} p-4 rounded-lg border shadow-sm transition-all cursor-pointer group`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight uppercase">Business Development Dashboard</h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Manage deal pipelines, track leads, and monitor revenue growth.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => navigate('/dashboard/project')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
                    >
                        <Plus size={16} />
                        Add New Client
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/project')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                        <Target size={16} />
                        Create Deal Opportunity
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
                    >
                        <FileText size={16} />
                        Generate Sales Report
                    </button>
                </div>
            </div>

            {/* 3. Sales Filters Panel */}
            <div className={glassClass}>
                <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Filter size={14} />
                    Sales Intelligence Filters
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {bdeFilterOptions.map((filter, i) => (
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

            {/* 4. Lead Overview Board */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {leadOverview.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -5, shadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                        onClick={() => navigate(item.path)}
                        className={`${isDarkMode ? 'bg-[#0c162d] transition-colors/50 border-white/10' : 'bg-white border-gray-100'} p-5 rounded-xl border flex flex-col items-center justify-center text-center transition-all group cursor-pointer`}
                    >
                        <div className={`w-10 h-10 rounded-full ${item.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                            <TrendingUp size={18} style={{ color: item.color }} />
                        </div>
                        <h3 className="text-2xl font-black tabular-nums">
                            <Counter value={item.value} />
                        </h3>
                        <p className="text-[9px] uppercase font-bold text-slate-400 mt-1 tracking-widest">{item.title}</p>
                    </motion.div>
                ))}
            </div>

            {/* 5. Deal Pipeline Visualization */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className={`text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>Deal Pipeline</h2>
                    <div className="flex gap-2">
                        <button className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400"><RefreshCw size={14} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto pb-4">
                    <div className="flex gap-4 min-w-[1200px]">
                        {Object.entries(pipelineData).map(([stage, deals], i) => (
                            <div key={stage} className="flex-1 space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{stage} ({deals.length})</span>
                                    <div className={`h-1 w-8 rounded-full`} style={{ backgroundColor: leadOverview[i % 4].color }} />
                                </div>
                                <div className={pipelineColumnClass}>
                                    <AnimatePresence>
                                        {deals.map((deal) => (
                                            <motion.div
                                                key={deal.id}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className={`mb-3 last:mb-0 ${dealCardClass}`}
                                            >
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">ID: #{deal.id}</span>
                                                    <span className="text-[10px] font-bold text-slate-400">{deal.date}</span>
                                                </div>
                                                <h4 className="text-xs font-black truncate">{deal.client}</h4>
                                                <p className="text-[10px] text-slate-400 mt-1 font-medium">{deal.requirement}</p>
                                                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                                    <span className="text-[11px] font-black text-emerald-500">{deal.value}</span>
                                                    <ChevronRight size={12} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 6. Revenue Opportunity Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionCard delay={0.4}>
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Monthly Revenue Forecast</h2>
                            <TrendingUp size={18} className="text-blue-500" />
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueForecast}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151/20' : '#f1f5f9'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} tickFormatter={(value) => `₹${value/100000}L`} />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                        formatter={(val) => [`₹${val.toLocaleString()}`, 'Forecast']}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>

                <MotionCard delay={0.5}>
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Industry Deal Distribution</h2>
                            <PieIcon size={18} className="text-purple-500" />
                        </div>
                        <div className="h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={industryDistribution}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={85}
                                        paddingAngle={5} dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {industryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                        formatter={(val) => [`${val}%`, 'Weight']}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 7. Client Activity Table */}
            <MotionCard delay={0.6}>
                <div className={glassClass}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <h2 className={headingClass}>Client Opportunities</h2>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Search clients..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
                                />
                            </div>
                            <button className={`p-2 rounded-lg border flex items-center gap-2 text-xs font-bold ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50' }`}>
                                <Download size={14} />
                                CSV
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Client Name</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Industry</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Requirement</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Value</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Stage</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Follow-up</th>
                                    <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                {clientOpportunities.map((row, idx) => (
                                    <tr key={idx} className={`group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'} transition-colors`}>
                                        <td className="py-4 pr-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                                    {row.client.charAt(0)}
                                                </div>
                                                <span className="text-xs font-black">{row.client}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4 text-[10px] font-bold text-slate-500">{row.industry}</td>
                                        <td className="py-4 pr-4 text-[10px] font-medium text-slate-400">{row.requirement}</td>
                                        <td className="py-4 pr-4 text-xs font-black text-emerald-500">{row.value}</td>
                                        <td className="py-4 pr-4">
                                            <StatusBadge status={row.stage} />
                                        </td>
                                        <td className="py-4 pr-4">
                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                                                <Clock size={12} className="text-blue-500" />
                                                {row.nextFollowup}
                                            </div>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-blue-500/20 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`} title="View Client"><Eye size={12} /></button>
                                                <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-amber-500/20 text-amber-400' : 'hover:bg-amber-50 text-amber-600'}`} title="Update Stage"><Target size={12} /></button>
                                                <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-emerald-500/20 text-emerald-400' : 'hover:bg-emerald-50 text-emerald-600'}`} title="Add Follow-up"><Plus size={12} /></button>
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
                {/* 8. Recent Sales Activity */}
                <MotionCard delay={0.7} className="lg:col-span-2">
                    <div className={glassClass}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className={headingClass}>Recent Sales Activity</h2>
                            <Clock size={18} className="text-blue-500" />
                        </div>
                        <div className="space-y-6">
                            {recentSalesActivity.map((activity) => (
                                <div key={activity.id} className="flex gap-4 group cursor-default">
                                    <div className="mt-1">
                                        <div className={`w-2 h-2 rounded-full ${
                                            activity.type === 'closed' ? 'bg-emerald-500 ring-4 ring-emerald-500/10' :
                                            activity.type === 'proposal' ? 'bg-blue-500 ring-4 ring-blue-500/10' :
                                            'bg-slate-400 ring-4 ring-slate-400/10'
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
                        <h2 className={`font-bold uppercase tracking-widest text-[11px] mb-8 ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>Quick Sales Actions</h2>
                        <div className="grid grid-cols-1 gap-3">
                            {quickSalesActions.map((action, i) => (
                                <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/30' : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-white hover:shadow-md'}`}>
                                    <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <action.icon size={18} className={action.color} />
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
                    NEXI5 Sales Intelligence Command Center
                </p>
            </div>
        </div>
    );
}
