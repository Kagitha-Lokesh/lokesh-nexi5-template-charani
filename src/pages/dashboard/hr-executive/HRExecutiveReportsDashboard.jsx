import React, { useState } from 'react';
import { 
    FileBarChart, FileText, Download, Printer, Search, 
    Filter, Calendar, Users, UserPlus, Package, Clock, ChevronRight,
    ArrowRight, Share2, MoreHorizontal, LayoutGrid, List
} from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
    LineChart, Line, AreaChart, Area
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    onboardingProgressReportData as onboardingProgressData, onboardingTrendReportData as onboardingTrendData,
    assetCategoryReportData as assetCategoryData, assetDeptReportData as assetDeptData,
    reportActivityLogsData as reportActivityData, recentReportActivitiesData as recentActivity,
    reportFilterOptions
} from '@/datasets/hr-executive/hrExecutiveReportsData';





// --- Sub-components ---

const StatCard = ({ label, value, icon: Icon, isDarkMode, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        className={`p-6 rounded-xl border shadow-sm transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
    >
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-900 text-blue-400' : 'bg-blue-50 text-blue-500'}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{label}</p>
                <h3 className="text-2xl font-bold mt-1">
                    <CountUp end={value} duration={2} />
                </h3>
            </div>
        </div>
    </motion.div>
);

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function HRExecutiveReportsDashboard() {
    const { isDarkMode } = useTheme();

    const cardClass = `rounded-xl border shadow-sm p-6 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`;
    const inputClass = `w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500/50' : 'bg-white border-gray-200 focus:border-blue-500'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            
            {/* 1. Module Title */}
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">HR Operational Reports</h1>
                </div>
                <div className="flex flex-wrap gap-2 text-white">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-sm font-semibold rounded-lg transition-all active:scale-95">
                        <FileText size={16} />
                        Generate Report
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold rounded-lg transition-all active:scale-95">
                        <Download size={16} />
                        Export Reports
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700 dark:text-gray-300'}`}>
                        <Printer size={16} />
                        Download PDF
                    </button>
                </div>
            </motion.div>

            {/* 2. Report Filters Panel */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className={cardClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {reportFilterOptions.map((filter, i) => (

                        <div key={i} className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">{filter.label}</label>
                            <select className={inputClass}>
                                {filter.options.map((opt, idx) => (
                                    <option key={idx} className={isDarkMode ? 'bg-gray-900' : ''}>{opt}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 3. Onboarding Insights Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div {...fadeUp} transition={{ delay: 0.2 }} className={cardClass}>
                    <h3 className="text-lg font-bold tracking-tight mb-6">Onboarding Progress</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={onboardingProgressData}
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {onboardingProgressData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div {...fadeUp} transition={{ delay: 0.3 }} className={cardClass}>
                    <h3 className="text-lg font-bold tracking-tight mb-6">Monthly Onboarding Trend</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={onboardingTrendData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f3f4f6'} />
                                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                <RechartsTooltip />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* 4. Employee Reports Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard label="Active Employees" value={156} icon={Users} isDarkMode={isDarkMode} delay={0.4} />
                <StatCard label="New Joiners" value={14} icon={UserPlus} isDarkMode={isDarkMode} delay={0.5} />
                <StatCard label="Pending Documentation" value={6} icon={FileText} isDarkMode={isDarkMode} delay={0.6} />
            </div>

            {/* 5. Asset Assignment Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div {...fadeUp} transition={{ delay: 0.7 }} className={cardClass}>
                    <h3 className="text-lg font-bold tracking-tight mb-6">Assets Assigned by Category</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={assetCategoryData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    {assetCategoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div {...fadeUp} transition={{ delay: 0.8 }} className={cardClass}>
                    <h3 className="text-lg font-bold tracking-tight mb-6">Assets Assigned per Department</h3>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={assetDeptData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f3f4f6'} />
                                <XAxis dataKey="dept" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                <RechartsTooltip />
                                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* 6. Report Data Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div {...fadeUp} transition={{ delay: 0.9 }} className={`lg:col-span-2 ${cardClass}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold tracking-tight">HR Activity Reports</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input placeholder="Search records..." className={`${inputClass} pl-9`} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-black uppercase text-gray-500 tracking-tighter ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                                    <th className="pb-3 px-2">Employee</th>
                                    <th className="pb-3 px-2">Dept</th>
                                    <th className="pb-3 px-2 text-center">Status</th>
                                    <th className="pb-3 px-2">Assets</th>
                                    <th className="pb-3 px-2 text-center">Join Date</th>
                                    <th className="pb-3 px-2 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {reportActivityData.map((row) => (
                                    <tr key={row.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                                        <td className="py-4 px-2">
                                            <p className="text-xs font-bold">{row.name}</p>
                                        </td>
                                        <td className="py-4 px-2 text-[10px] font-bold text-gray-500">{row.dept}</td>
                                        <td className="py-4 px-2 text-center">
                                            <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${
                                                row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                                            }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-[10px] text-gray-500 font-medium">{row.assets}</td>
                                        <td className="py-4 px-2 text-[10px] font-bold text-center">{row.date}</td>
                                        <td className="py-4 px-2 text-right">
                                            <button className="p-1 px-2 rounded-md hover:bg-blue-500 hover:text-white transition-all text-[10px] font-bold border border-gray-100 dark:border-gray-700">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Right Column: Recent activity & Quick Actions */}
                <div className="space-y-6">
                    {/* Recent Report Activity */}
                    <motion.div {...fadeUp} transition={{ delay: 1.0 }} className={cardClass}>
                        <h3 className="text-lg font-bold tracking-tight mb-6">Recent Report Activity</h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800" />
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                                        isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
                                    }`}>
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    </div>
                                    <div className="pt-1">
                                        <p className="text-[11px] font-medium leading-relaxed">{activity.text}</p>
                                        <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                            <Clock size={10} /> {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div {...fadeUp} transition={{ delay: 1.1 }} className={cardClass}>
                        <h3 className="text-lg font-bold tracking-tight mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: 'Generate Onboarding Report', icon: FileBarChart, color: 'hover:bg-blue-500' },
                                { label: 'Export Employee Data', icon: Users, color: 'hover:bg-indigo-500' },
                                { label: 'Download Asset Report', icon: Package, color: 'hover:bg-amber-500' },
                                { label: 'Schedule Monthly Report', icon: Calendar, color: 'hover:bg-purple-500' },
                            ].map((btn, i) => (
                                <button 
                                    key={i} 
                                    className={`flex items-center gap-3 w-full p-4 rounded-xl border group transition-all duration-300 ${
                                        isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'
                                    } ${btn.color} hover:text-white hover:scale-[1.02]`}
                                >
                                    <btn.icon size={18} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-[11px] font-bold">{btn.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
