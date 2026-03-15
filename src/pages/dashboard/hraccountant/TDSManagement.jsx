import React, { useState } from 'react';
import { 
    LayoutDashboard, Users, CreditCard, Banknote, ClipboardList, 
    Receipt, Wallet, TrendingUp, ShieldCheck, Landmark, HeartHandshake,
    CheckCircle, Clock, AlertCircle, FileText, Download, Filter, 
    Search, ChevronDown, Eye, MoreVertical, Calendar, Upload, 
    Calculator, BadgeInfo, UserCheck, FileDown, PlusCircle, History,
    RefreshCw, Shield, FileSearch, Trash2, Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    taxSummary, employeeTaxRecords, monthlyDeductions,
    taxDocuments, tdsFilingSteps as filingSteps, tdsRecentActivity as recentActivity
} from '@/datasets/hraccountant/tdsManagementData';


// --- Helper Components ---

const CountUp = ({ end, duration = 2, prefix = "" }) => {
    const [count, setCount] = useState(0);
    React.useEffect(() => {
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [end, duration]);
    return <span>{prefix}{count.toLocaleString()}</span>;
};

const SelectField = ({ label, options, value, onChange }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
        <div className="relative">
            <select 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-body text-gray-900 dark:text-white"
            >
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
    </div>
);




export default function TDSManagement() {
    const { isDarkMode } = useTheme();
    const [financialYear, setFinancialYear] = useState("2025–2026");
    const [period, setPeriod] = useState("Q4");
    const [regime, setRegime] = useState("New Regime");
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
                        <Calculator className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                            Tax Deducted at Source (TDS)
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Comprehensive tax control center & compliance tracker
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20 rounded-xl transition-all border border-blue-100 dark:border-blue-500/20">
                        <FileDown className="w-4 h-4" />
                        Export Tax Data
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                        <PlusCircle className="w-4 h-4" />
                        Generate TDS Report
                    </button>
                </div>
            </div>

            {/* --- Tax Period Selector --- */}
            <motion.div variants={itemVariants} className={`rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                <div className={`p-4 border-b flex items-center gap-2 ${isDarkMode ? 'border-white/5 bg-white/[0.02]' : 'border-gray-100 bg-gray-50/30'}`}>
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide uppercase">Tax Period Selector</h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <SelectField 
                        label="Financial Year" 
                        options={["2024–2025", "2025–2026", "2026–2027"]}
                        value={financialYear}
                        onChange={setFinancialYear}
                    />
                    <SelectField 
                        label="Tax Period (Quarter)" 
                        options={["Q1", "Q2", "Q3", "Q4"]}
                        value={period}
                        onChange={setPeriod}
                    />
                    <SelectField 
                        label="Tax Regime" 
                        options={["New Regime", "Old Regime", "All"]}
                        value={regime}
                        onChange={setRegime}
                    />
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Department</label>
                        <div className="relative">
                            <select className="w-full appearance-none bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-body text-gray-900 dark:text-white">
                                <option>All Departments</option>
                                <option>Engineering</option>
                                <option>HR</option>
                                <option>Marketing</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* --- TDS Deduction Board --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {taxSummary.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className={`p-6 rounded-2xl border flex items-center gap-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-500/10`}>
                            <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                {stat.title}
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                                <CountUp end={stat.value} prefix={stat.isCurrency ? "₹" : ""} />
                            </h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* --- Main Content Grid --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Employee Tax Records */}
                <motion.div variants={itemVariants} className={`lg:col-span-12 rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-gray-900 dark:text-white">Employee Tax Records</h2>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-[#111827]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">Employee ID</th>
                                    <th className="px-6 py-4">Employee Name</th>
                                    <th className="px-6 py-4 text-center">Department</th>
                                    <th className="px-6 py-4 text-right">Annual Salary</th>
                                    <th className="px-6 py-4 text-center">Tax Regime</th>
                                    <th className="px-6 py-4 text-right">Estimated Tax</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {employeeTaxRecords.map((emp) => (
                                    <tr key={emp.id} className="hover:bg-gray-50/50 dark:hover:bg-blue-500/5 transition-colors group">
                                        <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{emp.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{emp.name}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium uppercase tracking-tight">
                                                    {emp.dept}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-medium text-gray-700 dark:text-gray-300">
                                            ₹{emp.salary.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                                    emp.regime === 'New Regime' 
                                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                        : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400'
                                                }`}>
                                                    {emp.regime}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-semibold text-blue-600 dark:text-blue-400">
                                            ₹{emp.estimatedTax.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                                <button title="View Tax Profile" className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-600 text-blue-500 transition-all transform hover:scale-110">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button title="Update Tax Declaration" className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-600 text-emerald-500 transition-all transform hover:scale-110">
                                                    <RefreshCw className="w-4 h-4" />
                                                </button>
                                                <button title="Edit Tax Details" className="p-2 hover:bg-white dark:hover:bg-gray-700 rounded-lg shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-600 text-blue-500 transition-all transform hover:scale-110">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Monthly TDS Deductions */}
                <motion.div variants={itemVariants} className={`lg:col-span-12 rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Receipt className="w-5 h-5 text-emerald-500" />
                                <h2 className="font-semibold text-gray-900 dark:text-white">Monthly Tax Deductions</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                                Status: <span className="text-emerald-500">All Updates</span>
                            </span>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-[#111827]/50 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    <th className="px-6 py-4">Employee Name</th>
                                    <th className="px-6 py-4 text-right">Gross Salary</th>
                                    <th className="px-6 py-4 text-right">Taxable Income</th>
                                    <th className="px-6 py-4 text-right">Monthly TDS</th>
                                    <th className="px-6 py-4 text-right">Total TDS Paid</th>
                                    <th className="px-6 py-4 text-center">Deduction Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {monthlyDeductions.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-blue-500/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{row.name}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right text-gray-600 dark:text-gray-400 tracking-tight">
                                            ₹{row.salary.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right text-emerald-600 dark:text-emerald-400 font-medium">
                                            ₹{row.taxable.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-semibold text-gray-900 dark:text-white">
                                            ₹{row.monthlyTds.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-medium text-blue-600 dark:text-blue-400">
                                            ₹{row.totalTds.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                                                    row.status === 'Paid' 
                                                        ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                        : row.status === 'Processing'
                                                        ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                                                        : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                                                }`}>
                                                    {row.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* TDS Filing Status (Progress UI) */}
                <motion.div variants={itemVariants} className={`lg:col-span-5 p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold text-gray-900 dark:text-white">TDS Filing Progress Status</h2>
                        </div>
                        <span className="text-[10px] font-bold text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded uppercase tracking-widest">
                            {period} CYCLE
                        </span>
                    </div>

                    <div className="relative space-y-6">
                        {/* Vertical Progress Line */}
                        <div className="absolute left-[15px] top-[10px] bottom-[10px] w-0.5 bg-gray-100 dark:bg-gray-800" />
                        
                        {filingSteps.map((step) => (
                            <div key={step.id} className="relative flex items-start gap-6 group">
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 bg-white dark:bg-[#1f2937] transition-all duration-300 ${
                                    step.status === 'completed' 
                                        ? 'border-emerald-500 text-emerald-500' 
                                        : step.status === 'current'
                                        ? 'border-blue-500 text-blue-500 ring-4 ring-blue-500/10 scale-110'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-300'
                                }`}>
                                    {step.status === 'completed' ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <span className="text-xs font-bold font-mono">{step.id}</span>
                                    )}
                                </div>
                                <div className="flex-1 pb-2">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <h3 className={`text-sm font-semibold transition-colors ${
                                            step.status === 'waiting' ? 'text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-white'
                                        }`}>
                                            {step.title}
                                        </h3>
                                        <span className="text-[10px] text-gray-400 font-medium font-mono uppercase">
                                            {step.date}
                                        </span>
                                    </div>
                                    <p className={`text-xs ${
                                        step.status === 'completed' ? 'text-emerald-500' : 
                                        step.status === 'current' ? 'text-blue-500' : 'text-gray-400'
                                    } font-medium tracking-tight`}>
                                        {step.status === 'completed' ? 'Processing Complete' : 
                                         step.status === 'current' ? 'Submission In-Progress' : 'Awaiting Cycle'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4" />
                        File Quarterly TDS
                    </button>
                </motion.div>

                {/* Tax Document Records */}
                <motion.div variants={itemVariants} className={`lg:col-span-7 rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                    <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <FileSearch className="w-5 h-5 text-amber-500" />
                            <h2 className="font-semibold text-gray-900 dark:text-white">Tax Document Records</h2>
                        </div>
                        <button className="text-xs text-blue-500 hover:underline font-medium">View All Vault</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 dark:bg-[#111827]/50 border-b border-gray-100 dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                    <th className="px-6 py-4">Document Name</th>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4 text-center">F.Y.</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {taxDocuments.map((doc, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-lg group-hover:scale-110 transition-transform">
                                                    <FileText className="w-4 h-4 text-amber-500" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-tight">{doc.employee}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs text-gray-400 font-mono">{doc.year}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center">
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide cursor-default ${
                                                    doc.status === 'Generated'
                                                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                                        : doc.status === 'Uploaded'
                                                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                        : 'bg-gray-50 text-gray-400 dark:bg-gray-800 dark:text-gray-500 italic'
                                                }`}>
                                                    {doc.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {doc.status !== 'Pending' && (
                                                    <button className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-600 text-blue-500 transition-all">
                                                        <Download className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <button className="p-1.5 hover:bg-white dark:hover:bg-gray-700 rounded shadow-sm border border-transparent hover:border-gray-100 dark:hover:border-gray-600 text-amber-500 transition-all">
                                                    <RefreshCw className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Actions & Activity Timeline */}
                <motion.div variants={itemVariants} className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Quick TDS Actions */}
                    <div className={`p-6 rounded-2xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                            <PlusCircle className="w-5 h-5 text-blue-500" />
                            <h2 className="font-semibold">Quick Tax Management Actions</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: "Calculate TDS", icon: Calculator, color: "blue", desc: "Automated deductions" },
                                { label: "Generate Form 16", icon: FileText, color: "amber", desc: "For all employees" },
                                { label: "File Quarterly TDS", icon: ShieldCheck, color: "emerald", desc: "compliance filing" },
                                { label: "Export Reports", icon: TrendingUp, color: "purple", desc: "Excel/PDF formats" },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className="p-4 bg-gray-50 hover:bg-blue-50 dark:bg-[#111827] dark:hover:bg-blue-500/5 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-500/20 text-left transition-all group active:scale-[0.98]"
                                >
                                    <div className={`p-2 bg-white dark:bg-gray-800 rounded-lg w-fit mb-3 shadow-sm group-hover:scale-110 transition-transform text-${action.color}-500`}>
                                        <action.icon className="w-5 h-5" />
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-tight">{action.label}</div>
                                    <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 italic">{action.desc}</div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-500/10 flex gap-3">
                            <BadgeInfo className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed italic">
                                <strong>PRO TIP:</strong> Verify tax declarations and regime choices before running the final TDS calculation for the quarter.
                            </p>
                        </div>
                    </div>

                    {/* Recent Tax Activity */}
                    <div className={`p-6 rounded-2xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                <h2 className="font-semibold text-gray-900 dark:text-white">Recent Tax Activity</h2>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic group-hover:text-blue-400">REALTIME FEED</span>
                        </div>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[17px] top-2 bottom-2 w-px bg-gray-100 dark:bg-gray-800" />
                            {recentActivity.map((act) => (
                                <div key={act.id} className="relative flex items-center gap-4 group cursor-default">
                                    <div className="z-10 w-9 h-9 rounded-xl bg-gray-50 dark:bg-[#111827] border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all group-hover:scale-110 shadow-sm">
                                        <act.icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-500 transition-colors">
                                            {act.action}
                                        </div>
                                        <div className="text-[10px] text-gray-400 font-mono mt-0.5 flex items-center gap-1.5 uppercase font-bold tracking-tight">
                                            <Clock className="w-3 h-3" />
                                            {act.time}
                                        </div>
                                    </div>
                                    <ChevronDown className="w-4 h-4 text-gray-300 -rotate-90 group-hover:text-blue-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-2.5 text-xs font-bold text-gray-400 dark:text-gray-500 border border-dashed border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:text-blue-500 transition-all group flex items-center justify-center gap-2">
                            VIEW HISTORICAL AUDITS
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* --- Sticky Footer Action Summary (Visual Polish) --- */}
            <div className="fixed bottom-6 right-6 md:right-10 flex items-center gap-3 animate-bounce-slow">
                <div className="hidden lg:flex flex-col items-end px-4 py-2 bg-white/80 dark:bg-[#1f2937]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100/50 dark:border-gray-800/50 cursor-default">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Tax Compliance Score</span>
                    <span className="text-lg font-black text-emerald-500 tracking-tighter">98/100</span>
                </div>
                <div className="p-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20 cursor-pointer hover:scale-110 active:scale-95 transition-all">
                    <ShieldCheck className="w-6 h-6" />
                </div>
            </div>
        </motion.div>
    );
}

// Additional missing icon for the button in activity
const ArrowRight = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);
