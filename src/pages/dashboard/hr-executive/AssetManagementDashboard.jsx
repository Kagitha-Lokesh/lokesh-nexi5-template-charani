import React, { useState } from 'react';
import { 
    Plus, UserPlus, FileText, Download, Search, Filter, 
    MoreHorizontal, Laptop, Smartphone, Monitor, CreditCard, 
    Package, CheckCircle2, Clock, AlertCircle, History, 
    ArrowRightLeft, ArrowRight, LayoutGrid, List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import {
    assetDistributionData as assetDistribution, assetStatusData, assetInventoryData as assetInventory,
    recentAssetActivityData as recentActivity, assetFilterOptions
} from '@/datasets/hr-executive/assetManagementData';





// --- Sub-components ---

const AssetCard = ({ asset, isDarkMode }) => {
    const statusColors = {
        'Available': 'bg-emerald-500/10 text-emerald-500',
        'Assigned': 'bg-blue-500/10 text-blue-500',
        'Under Maintenance': 'bg-amber-500/10 text-amber-500',
        'Retired': 'bg-gray-500/10 text-gray-500',
    };

    const AssetIcon = asset.type === 'Laptop' ? Laptop : 
                     asset.type === 'Phone' ? Smartphone : 
                     asset.type === 'Monitor' ? Monitor : 
                     asset.type === 'ID Card' ? CreditCard : Package;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
            className={`p-5 rounded-xl border shadow-sm transition-all duration-300 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg ${statusColors[asset.status]}`}>
                    <AssetIcon size={20} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[asset.status]}`}>
                    {asset.status}
                </span>
            </div>

            <h4 className="text-[15px] font-bold mb-1">{asset.name}</h4>
            <p className="text-[11px] text-gray-500 mb-4 font-medium">Asset ID: {asset.id}</p>

            <div className={`p-3 rounded-lg mb-4 text-[11px] ${isDarkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Employee:</span>
                    <span className="font-bold">{asset.employee}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">Department:</span>
                    <span className="font-bold">{asset.dept}</span>
                </div>
            </div>

            <div className="flex gap-2 border-t border-gray-100 dark:border-gray-700 pt-4">
                <button className="flex-1 text-[10px] font-bold py-2 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-blue-500 hover:text-white transition-all">View</button>
                <button className="flex-1 text-[10px] font-bold py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all">Assign</button>
            </div>
        </motion.div>
    );
};

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function AssetManagementDashboard() {
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');

    const cardClass = `rounded-xl border shadow-sm p-6 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`;
    const inputClass = `w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500/50' : 'bg-white border-gray-200 focus:border-blue-500'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            
            {/* 1. Module Title */}
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Asset Management</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all active:scale-95">
                        <Plus size={16} />
                        Add New Asset
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-all active:scale-95">
                        <UserPlus size={16} />
                        Assign Asset
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm border ${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'}`}>
                        <Download size={16} />
                        Export Report
                    </button>
                </div>
            </motion.div>

            {/* 2. Asset Filters Panel */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className={cardClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Search Asset</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Name, ID..." className={`${inputClass} pl-9`} />
                        </div>
                    </div>
                    {assetFilterOptions.map((filter, i) => (

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

            {/* 3. Asset Inventory Grid */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold tracking-tight">Asset Inventory</h2>
                    <div className="flex gap-2">
                        <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><LayoutGrid size={16} /></button>
                        <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><List size={16}/></button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {assetInventory.map((asset) => (
                        <AssetCard key={asset.id} asset={asset} isDarkMode={isDarkMode} />
                    ))}
                </div>
            </motion.div>

            {/* 4. Asset Status Overview & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Analytics Section */}
                <div className="lg:col-span-2 space-y-6">
                    <motion.div {...fadeUp} transition={{ delay: 0.3 }} className={cardClass}>
                        <h3 className="text-lg font-bold tracking-tight mb-6">Asset Status Breakdown</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={assetDistribution}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {assetDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={assetStatusData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#374151' : '#f3f4f6'} />
                                    <XAxis dataKey="status" fontSize={10} axisLine={false} tickLine={false} />
                                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                                    <RechartsTooltip />
                                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                        {assetStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Asset Assignment Table */}
                    <motion.div {...fadeUp} transition={{ delay: 0.4 }} className={cardClass}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold tracking-tight">Recent Assignments</h3>
                            <button className="text-xs font-bold text-blue-500 hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className={`border-b text-[10px] font-bold uppercase text-gray-500 tracking-tighter ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                                        <th className="pb-3 text-center">Asset ID</th>
                                        <th className="pb-3">Asset Name</th>
                                        <th className="pb-3">Employee</th>
                                        <th className="pb-3">Dept</th>
                                        <th className="pb-3 text-center">Assigned Date</th>
                                        <th className="pb-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                    {assetInventory.filter(a => a.status === 'Assigned').map((row, idx) => (
                                        <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="py-4 text-center text-[11px] font-bold text-blue-500">{row.id}</td>
                                            <td className="py-4 text-[11px] font-bold">{row.name}</td>
                                            <td className="py-4 text-[11px] font-medium">{row.employee}</td>
                                            <td className="py-4 text-[11px] text-gray-500">{row.dept}</td>
                                            <td className="py-4 text-center text-[11px] font-medium">{row.date}</td>
                                            <td className="py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-1.5 rounded-md hover:bg-blue-500 hover:text-white transition-colors"><ArrowRightLeft size={14} /></button>
                                                    <button className="p-1.5 rounded-md hover:bg-red-500 hover:text-white transition-colors"><History size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Activity & Quick Actions */}
                <div className="space-y-6">
                    {/* Recent Activity */}
                    <motion.div {...fadeUp} transition={{ delay: 0.5 }} className={cardClass}>
                        <h3 className="text-lg font-bold tracking-tight mb-6">Recent Asset Activity</h3>
                        <div className="space-y-6 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800" />
                            {recentActivity.map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}>
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
                    <motion.div {...fadeUp} transition={{ delay: 0.6 }} className={cardClass}>
                        <h3 className="text-lg font-bold tracking-tight mb-6">Quick Actions</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {[
                                { label: 'Register New Asset', icon: Plus, color: 'hover:bg-blue-500' },
                                { label: 'Single/Bulk Assign', icon: UserPlus, color: 'hover:bg-indigo-500' },
                                { label: 'Record Asset Return', icon: History, color: 'hover:bg-orange-500' },
                                { label: 'Transfer Asset', icon: ArrowRightLeft, color: 'hover:bg-purple-500' },
                            ].map((btn, i) => (
                                <button key={i} className={`flex items-center gap-3 w-full p-4 rounded-xl border group transition-all duration-300 ${isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100'} ${btn.color} hover:text-white hover:scale-[1.02]`}>
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
