import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileCheck, Upload, Download, Filter, Search, 
    MoreVertical, ChevronRight, FileText, Building2, 
    Calendar, User, CreditCard, ArrowUpRight, CheckCircle2,
    Clock, AlertCircle, Share2, History, ExternalLink,
    FilterX, PlusCircle, Printer, Mail, Trash2, RefreshCw
} from 'lucide-react';
import {
    form16BTransactions as transactions, form16BFilingRecords as filingRecords, form16BTimeline as timeline
} from '@/datasets/hraccountant/form16BDashboardData';
import { useTheme } from '@/context/ThemeContext';


const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const Form16BDashboard = () => {
    const { isDarkMode } = useTheme();
    const [selectedTransaction, setSelectedTransaction] = useState(null);




    return (
        <div className="p-4 md:p-6 space-y-6 bg-gray-50/50 dark:bg-gray-950 min-h-screen font-body">
            {/* 2. Module Title */}
            <motion.div 
                {...fadeUp}
                className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
                <div>
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Form 16B – Property Transaction TDS
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage property transaction tax compliance and certificate generation</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                        <PlusCircle className="w-4 h-4" />
                        Generate Form 16B
                    </button>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 transition-colors shadow-sm">
                        <Upload className="w-4 h-4" />
                        Upload Property Tax Record
                    </button>
                    <button className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 transition-colors shadow-sm">
                        <Download className="w-4 h-4" />
                        Export Certificates
                    </button>
                </div>
            </motion.div>

            {/* 3. Transaction Filters */}
            <motion.div 
                {...fadeUp}
                className={`rounded-xl border p-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-blue-500" />
                    <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Transaction Filters</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">Financial Year</label>
                        <select className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                            <option>2025–2026</option>
                            <option>2024–2025</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">Transaction Date</label>
                        <input type="date" className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">Property Value</label>
                        <select className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none">
                            <option>Above ₹50L</option>
                            <option>₹30L – ₹50L</option>
                            <option>Below ₹30L</option>
                        </select>
                    </div>
                    <div className="space-y-1.5 lg:col-span-2">
                        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">Buyer / Seller Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Search Name or PAN..." 
                                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500/20 outline-none"
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 py-2 rounded-lg text-sm font-medium transition-colors">
                            <FilterX className="w-4 h-4" />
                            Clear
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* 4. Property Transaction Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Recent Property Transactions", count: "14", trend: "+2 this week", icon: Building2, color: "bg-blue-500" },
                    { label: "Pending Tax Certificates", count: "05", trend: "Requires attention", icon: Clock, color: "bg-amber-500" },
                    { label: "Filed Transactions", count: "08", trend: "100% compliant", icon: CheckCircle2, color: "bg-emerald-500" }
                ].map((card, idx) => (
                    <motion.div
                        key={idx}
                        {...fadeUp}
                        transition={{ delay: idx * 0.1 }}
                        className={`p-6 rounded-xl border flex items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group cursor-default ${
                            isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-gray-100 shadow-sm'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.label}</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.count}</h3>
                                <p className={`text-xs ${card.color.replace('bg-', 'text-')}`}>{card.trend}</p>
                            </div>
                            <div className={`${card.color} p-2.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 5. Form 16B Certificate Records & 7. Government Filing Panel */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Records Table */}
                    <motion.div 
                        {...fadeUp}
                        className={`rounded-xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Property Transaction Certificates</h2>
                            </div>
                            <button className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1">
                                View All <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Transaction ID</th>
                                        <th className="px-6 py-4">Buyer / Seller</th>
                                        <th className="px-6 py-4">Property Value</th>
                                        <th className="px-6 py-4">TDS (1%)</th>
                                        <th className="px-6 py-4 text-center">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {transactions.map((txn, i) => (
                                        <tr 
                                            key={i} 
                                            className="hover:bg-gray-50 transition-colors"
                                            onClick={() => setSelectedTransaction(txn)}
                                        >
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{txn.id}</span>
                                                <p className="text-[10px] text-gray-400">{txn.date}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{txn.buyer}</span>
                                                    <span className="text-[10px] text-gray-400">Seller: {txn.seller}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 font-medium">{txn.value}</td>
                                            <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 font-semibold">{txn.tds}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center">
                                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        txn.status === 'Generated' ? 'bg-green-100 text-green-700' :
                                                        txn.status === 'Filed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {txn.status}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Government Filing Panel */}
                    <motion.div 
                        {...fadeUp}
                        className={`rounded-xl border transition-all overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ExternalLink className="w-5 h-5 text-emerald-500" />
                                <h2 className="text-base font-semibold text-gray-900 dark:text-white">Government Filing Records</h2>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filingRecords.map((record, idx) => (
                                    <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <div className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
                                                <CheckCircle2 className={`w-4 h-4 ${record.status === 'Paid' ? 'text-emerald-500' : 'text-amber-500'}`} />
                                            </div>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${record.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none">Transaction ID</p>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase leading-none">{record.id}</h4>
                                        </div>
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            <div>
                                                <p className="text-[9px] text-gray-400 leading-none mb-1">Challan</p>
                                                <p className="text-xs font-medium leading-none">{record.challan}</p>
                                            </div>
                                            <div>
                                                <p className="text-[9px] text-gray-400 leading-none mb-1">Filing Date</p>
                                                <p className="text-xs font-medium leading-none">{record.filingDate}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Preview, Timeline, Quick Actions */}
                <div className="space-y-6">
                    {/* 6. Certificate Preview Panel */}
                    <motion.div 
                        {...fadeUp}
                        className={`rounded-xl border p-5 transition-all sticky top-6 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-2xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <FileCheck className="w-5 h-5 text-blue-500" />
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Certificate Preview</h2>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800/80 rounded-xl p-5 border border-gray-100 dark:border-gray-700 min-h-[320px] flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <AnimatePresence mode="wait">
                                {selectedTransaction ? (
                                    <motion.div
                                        key={selectedTransaction.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="w-full space-y-4"
                                    >
                                        <div className="w-16 h-20 bg-white dark:bg-gray-900 rounded-md shadow-lg border-t-4 border-blue-500 mx-auto flex items-center justify-center">
                                            <FileText className="w-8 h-8 text-blue-200" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full inline-block uppercase tracking-wider">
                                                {selectedTransaction.id}
                                            </p>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white capitalize">
                                                {selectedTransaction.buyer}
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3 text-left pt-2">
                                            <div className="p-2.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <p className="text-[8px] text-gray-400 uppercase mb-0.5">Value</p>
                                                <p className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{selectedTransaction.value}</p>
                                            </div>
                                            <div className="p-2.5 bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                                                <p className="text-[8px] text-gray-400 uppercase mb-0.5">TDS Paid</p>
                                                <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">{selectedTransaction.tds}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
                                                <Download className="w-4 h-4" /> Download Certificate
                                            </button>
                                            <button className="w-full py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                                <Share2 className="w-4 h-4" /> Send Certificate
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto text-blue-500">
                                            <FileText className="w-8 h-8 opacity-40" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">No Transaction Selected</p>
                                            <p className="text-xs text-gray-400">Select a record from the table to preview certificate</p>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* 8. Transaction Timeline */}
                    <motion.div 
                        {...fadeUp}
                        className={`rounded-xl border p-5 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <History className="w-5 h-5 text-purple-500" />
                            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">Recent Property Tax Activity</h2>
                        </div>
                        <div className="space-y-5 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-gray-100 dark:before:bg-gray-800">
                            {timeline.map((item, idx) => (
                                <div key={idx} className="flex gap-4 relative">
                                    <div className={`mt-1 bg-white dark:bg-gray-900 border-2 rounded-full p-1 z-10 ${item.color.replace('text-', 'border-')}`}>
                                        <item.icon className={`w-3 h-3 ${item.color}`} />
                                    </div>
                                    <div className="flex-1 space-y-0.5">
                                        <div className="flex justify-between items-start">
                                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 leading-none">{item.event}</p>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.details}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 9. Quick Actions */}
                    <motion.div 
                        {...fadeUp}
                        className="bg-gray-900 dark:bg-blue-600 rounded-xl shadow-sm p-6 text-white overflow-hidden relative"
                    >
                        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <h2 className="text-base font-bold mb-4 relative z-10">Compliance Shortcusts</h2>
                        <div className="grid grid-cols-2 gap-3 relative z-10">
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-lg text-left transition-colors flex flex-col gap-2 group">
                                <RefreshCw className="w-4 h-4 text-blue-200 group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-xs font-bold leading-tight uppercase tracking-wide">Sync Data</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-lg text-left transition-colors flex flex-col gap-2 group">
                                <Printer className="w-4 h-4 text-blue-200" />
                                <span className="text-xs font-bold leading-tight uppercase tracking-wide">Print All</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-lg text-left transition-colors flex flex-col gap-2 group">
                                <Mail className="w-4 h-4 text-blue-200" />
                                <span className="text-xs font-bold leading-tight uppercase tracking-wide">Email Report</span>
                            </button>
                            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-lg text-left transition-colors flex flex-col gap-2 group">
                                <Trash2 className="w-4 h-4 text-red-300" />
                                <span className="text-xs font-bold leading-tight uppercase tracking-wide text-red-100">Purge Logs</span>
                            </button>
                        </div>
                        <button className="w-full mt-4 flex items-center justify-center gap-2 bg-white text-blue-600 py-2.5 rounded-lg text-sm font-bold shadow-lg hover:bg-blue-50 transition-colors uppercase tracking-widest relative z-10">
                            Generate Tax Ledger
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Form16BDashboard;
