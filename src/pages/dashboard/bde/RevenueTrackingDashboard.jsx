import React, { useState, useEffect } from 'react';
import { 
    TrendingUp, DollarSign, Users, Briefcase, 
    ArrowUpRight, ArrowDownRight, Filter, 
    Download, FileText, Share2, Calendar, 
    Plus, Search, MoreHorizontal, ChevronRight,
    PieChart as PieIcon, BarChart3, LineChart as LineIcon,
    Globe, Shield, Building2, Wallet, 
    FileDigit, Receipt, PlusCircle, ArrowRight, MessageSquare
} from 'lucide-react';
import { 
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
    AreaChart, Area
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/context/ThemeContext';

// Datasets
import { 
    revenueGrowthData, revenueByIndustry, topRevenueClients, 
    revenueByStage, revenueDistribution, recentRevenueActivity, 
    revenueFilterOptions 
} from '@/datasets/bde/revenueTrackingData';

// --- Sub-components ---


const MetricCard = ({ title, value, change, isPositive, icon: Icon, color, isDarkMode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
            y: -5,
            shadow: isDarkMode ? '0 0 25px rgba(56,189,248,0.3)' : '0 10px 30px rgba(0,0,0,0.1)'
        }}
        className={`${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'} p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group`}
    >
        <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:scale-125 transition-transform duration-500`} style={{ backgroundColor: color }} />

        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'} group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}>
                <Icon size={20} style={{ color }} />
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-full ${isPositive ? (isDarkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600') : (isDarkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600')}`}>
                {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {change}
            </div>
        </div>

        <h3 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            {title}
        </h3>
        <div className="text-2xl font-black tracking-tight">
            <CountUp
                end={parseFloat(value.toString().replace(/[^0-9.-]+/g, "")) || 0}
                duration={2.5}
                separator=","
                prefix={value.toString().includes('₹') ? '₹' : ''}
                suffix={value.toString().includes('%') ? '%' : ''}
            />
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

export default function RevenueTrackingDashboard() {
    const { isDarkMode } = useTheme();

    const glassClass = `${isDarkMode ? 'bg-[#1f2937]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'} p-6 rounded-2xl border transition-all duration-300`;
    const headingClass = `text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-8 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3">
                        <Wallet className="text-blue-500" />
                        Revenue Tracking
                    </h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Financial performance monitoring and sales intelligence center.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <FileDigit size={16} />
                        Generate Report
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <Download size={16} />
                        Export Data
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <PlusCircle size={16} />
                        Set Target
                    </button>
                </div>
            </div>

            {/* 3. Revenue Filters */}
            <div className={glassClass}>
                <div className="flex items-center gap-2 mb-6">
                    <Filter size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Financial Filters</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {revenueFilterOptions.map((filter, i) => (
                        <div key={i} className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{filter.label}</label>
                            <select className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}>
                                {filter.options.map((opt, idx) => (
                                    <option key={idx} className={isDarkMode ? 'bg-[#0c162d] transition-colors' : ''}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. Revenue Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Total Revenue" value="12000000" change="+18%" isPositive={true} icon={DollarSign} color="#3B82F6" isDarkMode={isDarkMode} />
                <MetricCard title="Monthly Revenue" value="1800000" change="+12%" isPositive={true} icon={Receipt} color="#10B981" isDarkMode={isDarkMode} />
                <MetricCard title="Revenue Growth" value="22" change="+5.4%" isPositive={true} icon={TrendingUp} color="#8B5CF6" isDarkMode={isDarkMode} />
                <MetricCard title="Average Deal Value" value="650000" change="-2.1%" isPositive={false} icon={Briefcase} color="#F59E0B" isDarkMode={isDarkMode} />
            </div>

            {/* 5. Revenue Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard delay={0.2} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Monthly Revenue Growth</h2>
                        <LineIcon size={18} className="text-blue-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueGrowthData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} tickFormatter={(val) => `₹${val/100000}L`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" animationDuration={1500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                <MotionCard delay={0.3} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Revenue by Industry</h2>
                        <PieIcon size={18} className="text-emerald-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueByIndustry}
                                    cx="50%" cy="50%"
                                    innerRadius={70} outerRadius={100}
                                    paddingAngle={5} dataKey="value"
                                    animationDuration={1500}
                                >
                                    {revenueByIndustry.map((entry, index) => (
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
            </div>

            {/* 6. Top Revenue Clients */}
            <MotionCard delay={0.4} className={glassClass}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <h2 className={headingClass}>Top Revenue Clients</h2>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input 
                            type="text" 
                            placeholder="Search high-value clients..." 
                            className={`w-full pl-9 pr-3 py-2 rounded-xl border text-[10px] font-bold outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Client Name</th>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Industry</th>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Total Revenue</th>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Projects</th>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter">Contribution</th>
                                <th className="pb-4 text-[10px] font-black uppercase text-slate-400 tracking-tighter text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                            {topRevenueClients.map((client, idx) => (
                                <tr key={idx} className={`group ${isDarkMode ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50/50'} transition-colors`}>
                                    <td className="py-5 pr-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${isDarkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                                                {client.name.charAt(0)}
                                            </div>
                                            <span className="text-xs font-black">{client.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 pr-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${isDarkMode ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                                            {client.industry}
                                        </span>
                                    </td>
                                    <td className="py-5 pr-4 text-xs font-black text-emerald-500">{client.revenue}</td>
                                    <td className="py-5 pr-4 text-xs font-black">{client.projects}</td>
                                    <td className="py-5 pr-4 w-48">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${client.contribution}%` }}
                                                    transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                                                    className="h-full bg-blue-500"
                                                />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500">{client.contribution}%</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-all"><EyeIcon size={14} /></button>
                                            <button className="p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-500 transition-all"><MoreHorizontal size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </MotionCard>

            {/* 7. Revenue Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard delay={0.5} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Revenue by Deal Stage</h2>
                        <BarChart3 size={18} className="text-blue-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueByStage} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} width={80} />
                                <Tooltip 
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                    formatter={(val) => [`₹${val.toLocaleString()}`, 'Revenue']}
                                />
                                <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={30} animationDuration={1500} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                <MotionCard delay={0.6} className={glassClass}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Revenue Distribution</h2>
                        <PieIcon size={18} className="text-blue-600" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={revenueDistribution}
                                    cx="50%" cy="50%"
                                    outerRadius={100}
                                    paddingAngle={2} dataKey="value"
                                    animationDuration={1500}
                                >
                                    {revenueDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                />
                                <Legend layout="vertical" align="right" verticalAlign="middle" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingLeft: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>
            </div>

            {/* 8. Recent Revenue Activity & 9. Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <MotionCard delay={0.7} className={`lg:col-span-2 ${glassClass}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Recent Revenue Activity</h2>
                        <TrendingUp size={18} className="text-blue-500" />
                    </div>
                    <div className="space-y-6">
                        {recentRevenueActivity.map((activity) => (
                            <div key={activity.id} className="flex gap-4 group cursor-default items-center">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    activity.type === 'closed' ? 'bg-emerald-500/10 text-emerald-500' :
                                    activity.type === 'contract' ? 'bg-blue-500/10 text-blue-500' :
                                    activity.type === 'proposal' ? 'bg-amber-500/10 text-amber-500' :
                                    'bg-purple-500/10 text-purple-500'
                                }`}>
                                    {activity.type === 'closed' ? <Building2 size={18} /> : 
                                     activity.type === 'contract' ? <Shield size={18} /> :
                                     activity.type === 'proposal' ? <MessageSquare size={18} /> :
                                     <Globe size={18} />}
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

                <MotionCard delay={0.8} className={glassClass}>
                    <h2 className={headingClass + " mb-8"}>Quick Revenue Actions</h2>
                    <div className="grid gap-3">
                        {[
                            { label: 'Add Revenue Entry', icon: Plus, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { label: 'Generate Invoice', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { label: 'Create Opportunity', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { label: 'Revenue Report', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' }
                        ].map((action, i) => (
                            <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/20' : 'bg-slate-50 border-slate-100 text-slate-800 hover:bg-white hover:shadow-md'}`}>
                                <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                    <action.icon size={20} className={action.color} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-black tracking-tight">{action.label}</p>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Financial Analytics</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </MotionCard>
            </div>
            
            {/* Footer */}
            <div className={`py-12 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    NEXI5 Financial Sales Intelligence
                </p>
            </div>
        </div>
    );
}

const EyeIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
