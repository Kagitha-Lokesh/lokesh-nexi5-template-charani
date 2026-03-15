import React, { useState, useEffect } from 'react';
import { 
    TrendingUp, Star, Users, CheckCircle, 
    AlertCircle, Clock, Filter, Search, 
    Download, FileText, Share2, MoreHorizontal, 
    RefreshCw, Send, ChevronRight, BarChart3,
    Trophy, MessageSquare, Target, Zap, Eye
} from 'lucide-react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
    AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';
import {
    performanceScoreboard,
    ratingDistribution,
    productivityTrend,
    employeePerformanceData,
    performanceActivity,
    performanceQuickActions,
} from '@/datasets/manager/performanceReviewsData';

// --- Sub-components ---

const Counter = ({ value, decimals = 0 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const end = parseFloat(value);
        if (start === end) return;
        const totalDuration = 1000;
        const increment = end / (totalDuration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [value]);
    return <span>{count.toFixed(decimals)}</span>;
};

const StarRating = ({ rating }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star 
                    key={s} 
                    size={12} 
                    className={s <= Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'} 
                />
            ))}
            <span className="ml-1.5 text-xs font-bold text-slate-500">{rating}</span>
        </div>
    );
};

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

export default function PerformanceReviewsDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const cardClass = `p-6 rounded-xl shadow-sm border transition-all duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white border-gray-100'}`;
    const headingClass = `font-semibold font-headings ${isDarkMode ? 'text-white' : 'text-slate-800'}`;
    const inputClass = `w-full px-3 py-2 rounded-lg border text-sm outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-[#f8fafc] text-slate-900'}`}>
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-semibold tracking-tight uppercase"
                    >
                        Team Performance Reviews
                    </motion.h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Evaluate team growth, productivity trends, and individual contributions.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95 group">
                        <Zap size={16} className="group-hover:animate-pulse" />
                        Submit Performance Review
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <FileText size={16} />
                        Generate Performance Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Share2 size={16} />
                        Export Evaluation Data
                    </button>
                </div>
            </div>

            {/* 3. Review Filters Panel */}
            <MotionCard delay={0.1}>
                <div className={cardClass}>
                    <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <Filter size={14} />
                        Evaluation Filters
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Review Period</label>
                            <select className={inputClass}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Q1 2026</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Q2 2026</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Annual 2025</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Department</label>
                            <select className={inputClass}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Engineering</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>HR</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Sales</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Marketing</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Employee</label>
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="text" placeholder="Search member..." className={`${inputClass} pl-9`} />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Performance Rating</label>
                            <select className={inputClass}>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Above 4.0</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>3.0 - 4.0</option>
                                <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Below 3.0</option>
                            </select>
                        </div>
                    </div>
                </div>
            </MotionCard>

            {/* 4. Team Performance Scoreboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceScoreboard.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                        whileHover={{ y: -5, shadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                        className={`${cardClass} border-l-4`}
                        style={{ borderLeftColor: stat.color }}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
                                    <Counter value={stat.value} decimals={stat.title === 'Average Rating' ? 1 : 0} />
                                </h3>
                                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider font-body">{stat.title}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 5. Performance Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MotionCard delay={0.4}>
                    <div className={`${cardClass} h-[400px]`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Performance Rating Distribution</h2>
                            <BarChart3 size={18} className="text-slate-400" />
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={ratingDistribution}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={80}
                                        paddingAngle={5} dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {ratingDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                                            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>

                <MotionCard delay={0.5}>
                    <div className={`${cardClass} h-[400px]`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Team Productivity Trend</h2>
                            <TrendingUp size={18} className="text-green-500" />
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={productivityTrend}>
                                    <defs>
                                        <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151/20' : '#f1f5f9'} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                    <Tooltip 
                                        contentStyle={{ 
                                            backgroundColor: isDarkMode ? '#1e293b' : '#fff',
                                            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                                            borderRadius: '8px',
                                            fontSize: '11px',
                                            fontWeight: 'bold'
                                        }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" animationDuration={1500} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 6. Employee Performance Table */}
            <MotionCard delay={0.6}>
                <div className={cardClass}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className={headingClass}>Employee Performance Records</h2>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                <input 
                                    type="text" 
                                    placeholder="Filter by name..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className={`${inputClass} pl-9`}
                                />
                            </div>
                            <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-400 hover:bg-slate-50' }`}>
                                <RefreshCw size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Employee Name</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Department</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Tasks Done</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Performance Rating</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Review Date</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-4 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {employeePerformanceData.map((row) => (
                                        <motion.tr 
                                            key={row.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className={`group border-b last:border-0 h-[64px] transition-all ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'border-slate-50 hover:bg-slate-50/50'}`}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[10px] text-white ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100 text-slate-500'}`}>
                                                        {row.name.charAt(0)}
                                                    </div>
                                                    <p className="text-sm font-semibold">{row.name}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500 font-medium">{row.dept}</td>
                                            <td className="px-4 py-3 text-center">
                                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                                    {row.tasks}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StarRating rating={row.rating} />
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500 font-mono">{row.lastReview}</td>
                                            <td className="px-4 py-3 text-center">
                                                <StatusBadge status={row.status} />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-blue-500/20 text-blue-400' : 'hover:bg-blue-50 text-blue-600'}`} title="View Review"><Eye size={14} /></button>
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`} title="Edit Review"><Share2 size={14} className="rotate-90" /></button>
                                                    <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-emerald-500/20 text-emerald-400' : 'hover:bg-emerald-50 text-emerald-600'}`} title="Add Feedback"><MessageSquare size={14} /></button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            </MotionCard>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7. Feedback Panel */}
                <MotionCard delay={0.7} className="lg:col-span-2">
                    <div className={cardClass}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Manager Feedback Center</h2>
                            <MessageSquare size={18} className="text-blue-500" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Employee</label>
                                    <select className={inputClass}>
                                        <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Rahul Sharma</option>
                                        <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Priya Nair</option>
                                        <option className={isDarkMode ? 'bg-[#0c162d]' : ''}>Ankit Verma</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Strengths</label>
                                    <textarea 
                                        rows={2}
                                        placeholder="e.g. Strong problem-solving..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Areas for Improvement</label>
                                    <textarea 
                                        rows={2}
                                        placeholder="e.g. Documentation quality..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Consolidated Comments</label>
                                    <textarea 
                                        rows={2}
                                        placeholder="Final evaluation remarks..."
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 flex gap-3">
                            <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95">
                                Submit Feedback
                            </button>
                            <button className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white' : 'bg-slate-50 border border-slate-200 text-slate-600'}`}>
                                Update Review
                            </button>
                        </div>
                    </div>
                </MotionCard>

                {/* 8. Performance Trend Timeline */}
                <MotionCard delay={0.8}>
                    <div className={cardClass}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={headingClass}>Evaluation Activity</h2>
                            <Target size={18} className="text-red-500" />
                        </div>
                        <div className="space-y-6">
                            {performanceActivity.map((act) => (
                                <div key={act.id} className="flex gap-4 group">
                                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                                        act.type === 'rating' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 
                                        act.type === 'promo' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 
                                        act.type === 'trend' ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-400'
                                    }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-bold leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-slate-700'}`}>{act.text}</p>
                                        <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5 mt-1 uppercase tracking-wider">
                                            <Clock size={10} /> {act.time}
                                        </p>
                                    </div>
                                    <ChevronRight size={14} className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                            ))}
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 9. Quick Actions */}
            <MotionCard delay={0.9}>
                <div className={cardClass}>
                    <h2 className={`font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {performanceQuickActions.map((btn, i) => (
                            <button key={i} className={`flex items-center gap-3 px-4 py-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-blue-500/30' : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 shadow-sm'}`}>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'} group-hover:scale-110 transition-transform`}>
                                    <btn.icon size={20} className={btn.color} />
                                </div>
                                <span className="text-xs font-bold tracking-tight text-left leading-snug">{btn.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </MotionCard>

            {/* Footer */}
            <div className={`py-12 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    NEXI5 Performance Intelligence System v2.0
                </p>
            </div>
        </div>
    );
}
