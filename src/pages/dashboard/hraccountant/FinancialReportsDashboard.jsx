import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
    FileText, Download, Filter, DownloadCloud, FileSpreadsheet, 
    ArrowUpRight, ArrowDownRight, IndianRupee, PieChart as PieIcon, 
    TrendingUp, Wallet, CreditCard, Gift, Calculator, Search,
    ChevronDown, Clock, Share2, Printer, FolderKanban
} from 'lucide-react';
import {
    payrollTrendData, expenseComparisonData, deptCostData,
    financialReportRecords as reportRecords, financialActivity
} from '@/datasets/hraccountant/financialReportsData';
import { useTheme } from '@/context/ThemeContext';


const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};




const FinancialReportsDashboard = () => {
    const { isDarkMode } = useTheme();
    const [searchDept, setSearchDept] = useState('');

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto overflow-x-hidden">
            
            {/* 1. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Financial Reports & Analytics</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage payroll costs, department spending, and financial health.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <Printer size={14} /> Download Summary
                    </button>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <Download size={14} /> Export Reports
                    </button>
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">
                        <FileText size={14} /> Generate Financial Report
                    </button>
                </div>
            </div>

            {/* 2. Financial Filters Panel */}
            <motion.div 
                {...fadeUp}
                className={`rounded-xl border p-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
                <div className="flex items-center gap-2 mb-6">
                    <Filter size={18} className="text-blue-500" />
                    <h3 className="font-semibold text-sm">Financial Filters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Financial Year</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>2025–2026</option>
                                <option>2024–2025</option>
                                <option>2023–2024</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Month / Quarter</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>Current Month</option>
                                <option>Quarter 1 (Q1)</option>
                                <option>Quarter 2 (Q2)</option>
                                <option>Quarter 3 (Q3)</option>
                                <option>Quarter 4 (Q4)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Department</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>Sales</option>
                                <option>HR</option>
                                <option>Finance</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Expense Category</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>All Categories</option>
                                <option>Payroll</option>
                                <option>Reimbursements</option>
                                <option>Operational</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Report Type</label>
                        <div className="relative">
                            <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option>Detailed Monthly</option>
                                <option>Summary Annual</option>
                                <option>Department Wise</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* 3. Payroll vs Expense Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div 
                    {...fadeUp}
                    className={`p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-sm">Payroll Cost Trend</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Monthly trend in INR (Lakhs)</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded text-[10px] font-bold">
                            <ArrowUpRight size={12} /> +12%
                        </div>
                    </div>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={payrollTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#88888820" />
                                <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0c162d', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                    itemStyle={{ color: '#3ec3ff' }}
                                />
                                <Line type="monotone" dataKey="cost" stroke="#3ec3ff" strokeWidth={3} dot={{ r: 4, fill: '#3ec3ff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div 
                    {...fadeUp}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-sm">Expense Comparison</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Category wise distribution (%)</p>
                        </div>
                        <Wallet size={18} className="text-violet-500" />
                    </div>
                    <div className="h-[280px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={expenseComparisonData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                                <XAxis dataKey="category" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    cursor={{fill: '#88888810'}}
                                    contentStyle={{ backgroundColor: '#0c162d', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                />
                                <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={40}>
                                    {expenseComparisonData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 0 ? '#3ec3ff' : '#a855f7'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* 4. Department Cost & Expense Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Department Cost Analysis (Donut) */}
                <motion.div 
                    {...fadeUp}
                    className={`lg:col-span-1 p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">Department Cost Analysis</h3>
                        <PieIcon size={18} className="text-emerald-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={deptCostData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {deptCostData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0c162d', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Expense Category Breakdown */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                        {[
                            { label: 'Payroll', value: '₹75L', icon: Calculator, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { label: 'Reimburs.', value: '₹12L', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-50' },
                            { label: 'Bonuses', value: '₹8L', icon: Gift, color: 'text-amber-500', bg: 'bg-amber-50' },
                            { label: 'Training', value: '₹5L', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { label: 'Software', value: '₹10L', icon: FolderKanban, color: 'text-rose-500', bg: 'bg-rose-50' },
                        ].map((cat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -4 }}
                                className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}
                            >
                                <div className={`w-10 h-10 ${cat.bg} dark:bg-gray-700/50 rounded-lg flex items-center justify-center mb-3`}>
                                    <cat.icon size={20} className={cat.color} />
                                </div>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">{cat.label}</p>
                                <p className="text-lg font-bold mt-1 tracking-tight">{cat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div 
                        {...fadeUp}
                        className={`p-6 rounded-xl border flex-1 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm">Quick Financial Summary</h3>
                            <button className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-widest">Update Data</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 dark:text-gray-400">Total Operating Cost</span>
                                <span className="text-sm font-bold">₹1.24 Cr</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[75%]" />
                            </div>
                            <div className="grid grid-cols-3 gap-4 pt-2">
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">Budgeted</p>
                                    <p className="text-sm font-bold">₹1.50 Cr</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">Actual</p>
                                    <p className="text-sm font-bold text-emerald-500">₹1.24 Cr</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-gray-400 uppercase font-bold">Variance</p>
                                    <p className="text-sm font-bold text-emerald-500">-17.3%</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* 5. Financial Report Tables */}
            <motion.div 
                {...fadeUp}
                className={`rounded-xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
                <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="font-semibold text-sm">Department Financial Reports</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="text"
                                placeholder="Search Department..."
                                value={searchDept}
                                onChange={(e) => setSearchDept(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full md:w-64"
                            />
                        </div>
                        <button className="p-1 px-3 text-[10px] font-bold border border-emerald-500/30 text-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-lg flex items-center gap-2 uppercase tracking-tight transition-all">
                            <FileSpreadsheet size={12} /> Export CSV
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Total Payroll</th>
                                <th className="px-6 py-4">Total Reimbursements</th>
                                <th className="px-6 py-4">Total Bonuses</th>
                                <th className="px-6 py-4">Operational Expenses</th>
                                <th className="px-6 py-4">Total Cost</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-gray-50 dark:divide-gray-700">
                            {reportRecords.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 font-bold">{item.dept}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.payroll}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.reimbursements}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.bonuses}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{item.operational}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-[#3ec3ff]">{item.total}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                                            <button className="p-1.5 hover:bg-blue-500/10 text-blue-500 rounded transition-all" title="View Report">
                                                <ArrowUpRight size={14} />
                                            </button>
                                            <button className="p-1.5 hover:bg-emerald-500/10 text-emerald-500 rounded transition-all" title="Download Report">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-900/20 border-t border-gray-50 dark:border-gray-700 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">Showing all {reportRecords.length} departments</span>
                    <div className="flex items-center gap-2">
                        <button className="p-1 px-3 text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-gray-800 rounded disabled:opacity-50" disabled>Previous</button>
                        <button className="p-1 px-3 text-[10px] font-bold text-blue-500 bg-blue-500/10 rounded">Next</button>
                    </div>
                </div>
            </motion.div>

            {/* 6. Lower Section: Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Financial Activity */}
                <motion.div 
                    {...fadeUp}
                    className={`lg:col-span-2 p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-sm">Recent Financial Activity</h3>
                        <Clock size={16} className="text-blue-500" />
                    </div>
                    <div className="space-y-4">
                        {financialActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
                                <div className={`mt-1 p-2 rounded-lg 
                                    ${activity.type === 'system' ? 'bg-blue-50 text-blue-500' : 
                                      activity.type === 'export' ? 'bg-emerald-50 text-emerald-500' : 
                                      'bg-amber-50 text-amber-500'} dark:bg-gray-700`}>
                                    {activity.type === 'system' ? <Calculator size={14} /> : 
                                     activity.type === 'export' ? <DownloadCloud size={14} /> : 
                                     <IndianRupee size={14} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold">{activity.text}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1.5"><Clock size={10} /> {activity.time}</p>
                                </div>
                                <button className="p-1 px-2 text-[10px] border border-gray-100 dark:border-gray-600 rounded-md hover:bg-white dark:hover:bg-gray-600 transition-all">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Report Actions */}
                <motion.div 
                    {...fadeUp}
                    className={`p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <h3 className="font-semibold text-sm mb-6">Quick Report Actions</h3>
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all group">
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2 bg-blue-500 text-white rounded-lg group-hover:scale-110 transition-transform"><FileText size={18} /></div>
                                <div>
                                    <p className="text-xs font-bold">Monthly Financial Report</p>
                                    <p className="text-[10px] text-gray-400">Current cycle analysis</p>
                                </div>
                            </div>
                            <ChevronDown size={14} className="text-gray-300 -rotate-90 group-hover:text-blue-500 transition-all" />
                        </button>

                        <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 transition-all group">
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2 bg-emerald-500 text-white rounded-lg group-hover:scale-110 transition-transform"><DownloadCloud size={18} /></div>
                                <div>
                                    <p className="text-xs font-bold">Department Reports</p>
                                    <p className="text-[10px] text-gray-400">Export spending by dept</p>
                                </div>
                            </div>
                            <FileSpreadsheet size={16} className="text-gray-300 group-hover:text-emerald-500 transition-all" />
                        </button>

                        <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-violet-50 dark:hover:bg-violet-500/10 hover:border-violet-200 dark:hover:border-violet-500/30 transition-all group">
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2 bg-violet-500 text-white rounded-lg group-hover:scale-110 transition-transform"><PieIcon size={18} /></div>
                                <div>
                                    <p className="text-xs font-bold">Expense Summary</p>
                                    <p className="text-[10px] text-gray-400">Categorized cost breakdown</p>
                                </div>
                            </div>
                            <Share2 size={16} className="text-gray-300 group-hover:text-violet-500 transition-all" />
                        </button>

                        <button className="flex items-center justify-between w-full p-4 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:border-amber-200 dark:hover:border-amber-500/30 transition-all group">
                            <div className="flex items-center gap-3 text-left">
                                <div className="p-2 bg-amber-500 text-white rounded-lg group-hover:scale-110 transition-transform"><Calculator size={18} /></div>
                                <div>
                                    <p className="text-xs font-bold">Annual Finance Report</p>
                                    <p className="text-[10px] text-gray-400">Full year consolidation</p>
                                </div>
                            </div>
                            <ArrowDownRight size={16} className="text-gray-300 group-hover:text-amber-500 transition-all" />
                        </button>
                    </div>
                </motion.div>

            </div>

        </div>
    );
};

export default FinancialReportsDashboard;
