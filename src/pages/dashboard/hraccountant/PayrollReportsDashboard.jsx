import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform, animate } from 'framer-motion';
import { 
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { 
    Users, CreditCard, Banknote, Calculator, TrendingUp, 
    FileText, Download, Filter, ChevronDown, CheckCircle2, 
    Clock, AlertCircle, Eye, DownloadCloud, FileCheck, Search,
    Share2, Briefcase, Building2
} from 'lucide-react';
import {
    payrollProgressData, monthlyTrendData, salaryDistData,
    deptPayrollData, employeePayrollRecords, payrollActivity, payrollFilterOptions
} from '@/datasets/hraccountant/payrollReportsData';
import { useTheme } from '@/context/ThemeContext';


const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

// --- CountUp Component ---
const CountUp = ({ to, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, to, {
            duration: 1.5,
            onUpdate: (value) => setCount(Math.floor(value))
        });
        return () => controls.stop();
    }, [to]);

    return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
};




const PayrollReportsDashboard = () => {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto overflow-x-hidden">
            
            {/* 1. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Payroll Reports & Insights</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Analyze payroll intelligence, salary trends, and processing status.</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <DownloadCloud size={14} /> Download Salary Sheet
                    </button>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        <Share2 size={14} /> Export Payroll Data
                    </button>
                    <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">
                        <FileText size={14} /> Generate Payroll Report
                    </button>
                </div>
            </div>

            {/* 2. Payroll Filters Panel */}
            <motion.div 
                {...fadeUp}
                className={`rounded-xl border p-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
                <div className="flex items-center gap-2 mb-6 text-blue-500">
                    <Filter size={18} />
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Payroll Filters</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {payrollFilterOptions.map((filter, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{filter.label}</label>
                            <div className="relative">
                                <select className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2.5 px-3 text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                    {filter.options.map(opt => <option key={opt}>{opt}</option>)}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 3. Payroll Processing Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {payrollProgressData.map((card, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white dark:bg-[#1f2937] p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 ${card.bg} dark:bg-gray-800 rounded-xl flex items-center justify-center shrink-0`}>
                                <card.icon size={24} className={card.color} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
                                <p className="text-2xl font-bold mt-1 tracking-tight">
                                    <CountUp to={card.value} prefix={card.prefix} suffix={card.suffix} />
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 4. Salary Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Payroll Trend */}
                <motion.div 
                    {...fadeUp}
                    className={`p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="font-semibold text-sm">Monthly Payroll Trend</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider">Salary cost in Lakhs/Crores</p>
                        </div>
                        <TrendingUp size={18} className="text-blue-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyTrendData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#88888820" vertical={false} />
                                <XAxis dataKey="month" fontSize={10} axisLine={false} tickLine={false} />
                                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0c162d', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="amount" stroke="#3ec3ff" strokeWidth={3} dot={{ r: 4, fill: '#3ec3ff' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Salary Distribution */}
                <motion.div 
                    {...fadeUp}
                    className={`p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-sm">Salary Distribution</h3>
                        <CreditCard size={18} className="text-purple-500" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={salaryDistData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {salaryDistData.map((entry, index) => (
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
            </div>

            {/* 5. Department Payroll Breakdown */}
            <motion.div 
                {...fadeUp}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="font-semibold text-sm">Department Payroll Breakdown</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Total payroll cost by department</p>
                    </div>
                    <Building2 size={18} className="text-emerald-500" />
                </div>
                <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={deptPayrollData} layout="vertical" margin={{ left: 40 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#88888820" horizontal={false} />
                            <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis dataKey="dept" type="category" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip 
                                cursor={{fill: '#88888810'}}
                                contentStyle={{ backgroundColor: '#0c162d', border: 'none', borderRadius: '8px', fontSize: '10px', color: '#fff' }}
                            />
                            <Bar dataKey="amount" fill="#10b981" radius={[0, 4, 4, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* 6. Employee Payroll Report Table */}
            <motion.div 
                {...fadeUp}
                className={`rounded-xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
                <div className="p-6 border-b border-gray-50 dark:border-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="font-semibold text-sm">Employee Payroll Report</h3>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input 
                                type="text"
                                placeholder="Search Employee..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-64"
                            />
                        </div>
                        <button className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20 transition-all shadow-sm">
                            <Download size={16} />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                            <tr>
                                <th className="px-6 py-4">Employee ID</th>
                                <th className="px-6 py-4">Employee Name</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4">Basic Salary</th>
                                <th className="px-6 py-4">Allowances</th>
                                <th className="px-6 py-4">Deductions</th>
                                <th className="px-6 py-4">Net Salary</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-xs divide-y divide-gray-50 dark:divide-gray-700">
                            {employeePayrollRecords.map((item, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                    <td className="px-6 py-4 font-mono font-bold text-gray-400">{item.id}</td>
                                    <td className="px-6 py-4 font-bold">{item.name}</td>
                                    <td className="px-6 py-4">{item.dept}</td>
                                    <td className="px-6 py-4">{item.salary}</td>
                                    <td className="px-6 py-4 text-emerald-500">{item.allow}</td>
                                    <td className="px-6 py-4 text-rose-500">{item.deduct}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-[#3ec3ff]">{item.net}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold 
                                            ${item.status === 'Processed' ? 'bg-emerald-500/10 text-emerald-500' : 
                                              item.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                                              'bg-rose-500/10 text-rose-500'}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-all" title="View Payslip">
                                                <Eye size={14} />
                                            </button>
                                            <button className="p-1.5 hover:bg-blue-500/10 text-blue-500 rounded transition-all" title="Download Report">
                                                <DownloadCloud size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* 7. Activity Timeline & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Payroll Activity */}
                <motion.div 
                    {...fadeUp}
                    className={`lg:col-span-2 p-6 rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-semibold text-sm">Recent Payroll Activity</h3>
                        <Clock size={16} className="text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {payrollActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                                <div className={`mt-1 p-2 rounded-lg bg-gray-50 dark:bg-gray-900 ${activity.color}`}>
                                    <activity.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold leading-relaxed">{activity.text}</p>
                                    <p className="text-[10px] text-gray-400 mt-1 flex items-center gap-1.5"><Clock size={10} /> {activity.time}</p>
                                </div>
                                <button className="text-[10px] font-bold text-blue-500 hover:underline">Details</button>
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
                    <div className="space-y-3">
                        {[
                            { label: 'Generate Monthly Payroll Report', icon: FileCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { label: 'Export Department Payroll', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { label: 'Download Salary Summary', icon: DownloadCloud, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { label: 'Generate Annual Payroll Report', icon: Calculator, color: 'text-violet-500', bg: 'bg-violet-500/10' }
                        ].map((action, idx) => (
                            <button
                                key={idx}
                                className="flex items-center gap-3 w-full p-4 bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-blue-500/30 rounded-xl transition-all group"
                            >
                                <div className={`p-2 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                                    <action.icon size={18} />
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">{action.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

            </div>

        </div>
    );
};

export default PayrollReportsDashboard;
