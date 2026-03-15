import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Bell, ShieldAlert, UserCheck, CreditCard, 
    CalendarCheck, Shield, Settings, Mail, 
    ArrowLeft, CheckCircle2, Search, Filter,
    MoreVertical, Eye, Trash2, CheckCircle, 
    AlertTriangle, Clock, Info, Download, 
    Zap, Activity, FileText, Share2, 
    Plus, ChevronRight, X
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

import { 
    notificationStats as statsCards,
    notificationItems,
    notificationCategories as categories,
    criticalAlerts,
    notificationQuickActions
} from '@/datasets/notifications/notificationsData';

export default function Notifications() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Notifications</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <CheckCircle2 size={16} />
                    Mark All as Read
                </button>
            </div>


            {/* 4. Notification Filters Panel */}
            <div className={`rounded-xl border p-6 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-2 mb-6 text-primary dark:text-[#3ec3ff]">
                    <Filter size={18} />
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Filter Notifications</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {[
                        { label: 'Notification Type', placeholder: 'All Types' },
                        { label: 'Module', placeholder: 'All Modules' },
                        { label: 'Priority Level', placeholder: 'Select Priority' },
                        { label: 'Date Range', placeholder: 'Select Date' },
                        { label: 'Status', placeholder: 'All Status' }
                    ].map((filter, i) => (
                        <div key={i} className="flex flex-col gap-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{filter.label}</label>
                            <select className={`w-full p-2.5 rounded-lg border text-xs transition-all outline-none ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-gray-300 focus:border-[#3ec3ff]' : 'bg-gray-50 border-borderColor text-dark focus:border-primary'}`}>
                                <option>{filter.placeholder}</option>
                            </select>
                        </div>
                    ))}
                </div>
                <div className="mt-6 flex justify-end">
                    <button className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                        <Search size={14} />
                        Apply Filters
                    </button>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 5. Notifications List Table (Left 2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className={`rounded-xl border flex flex-col overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>All Notifications</h3>
                            <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
                                <MoreVertical size={18} className="text-gray-500" />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className={`${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                        <th className={`px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Notification</th>
                                        <th className={`px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Module</th>
                                        <th className={`px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Priority</th>
                                        <th className={`px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Date</th>
                                        <th className={`px-6 py-4 text-center text-[11px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-borderColor'}`}>
                                    {notificationItems.map((item) => (
                                        <tr key={item.id} className={`transition-colors h-20 ${item.unread ? (isDarkMode ? 'bg-[#3ec3ff]/5' : 'bg-blue-50/50') : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50')}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-[#0c162d]' : 'bg-white shadow-sm'} border ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                                        <item.icon size={18} className={item.color} />
                                                    </div>
                                                    <div>
                                                        <div className={`text-sm font-semibold max-w-[240px] truncate ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.text}</div>
                                                        <div className={`text-[11px] font-medium flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                                           <span className={`w-1.5 h-1.5 rounded-full ${item.unread ? 'bg-orange-500' : 'bg-emerald-500'}`}></span>
                                                           {item.status}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'bg-white/5 text-gray-300' : 'bg-gray-100 text-textSecondary'}`}>
                                                    {item.module}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                                                    item.priority === 'High' ? 'bg-red-500/10 text-red-500' : 
                                                    item.priority === 'Medium' ? 'bg-orange-500/10 text-orange-500' : 
                                                    'bg-blue-500/10 text-blue-500'
                                                }`}>
                                                    {item.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`text-xs font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{item.date}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {[
                                                        { icon: Eye, color: 'text-blue-500', title: 'View' },
                                                        { icon: CheckCircle, color: 'text-emerald-500', title: 'Mark Read' },
                                                        { icon: Trash2, color: 'text-red-500', title: 'Delete' }
                                                    ].map((action, i) => (
                                                        <button key={i} title={action.title} className={`p-2 rounded-lg border transition-all active:scale-90 ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-borderColor hover:bg-gray-50 hover:shadow-sm'} ${action.color}`}>
                                                            <action.icon size={14} />
                                                        </button>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className={`p-4 border-t text-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                             <button className={`text-xs font-bold text-primary dark:text-[#3ec3ff] hover:underline uppercase tracking-wider`}>Load More Notifications</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Column (Right 1/3) */}
                <div className="flex flex-col gap-6">
                    
                    {/* 6. Notification Categories Overview */}
                    <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Categories</h3>
                            <Activity size={20} className="text-secondary" />
                        </div>
                        <div className="space-y-6">
                            {categories.map((cat, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center text-xs font-bold">
                                        <span className={isDarkMode ? 'text-gray-400' : 'text-textSecondary'}>{cat.name}</span>
                                        <span className={isDarkMode ? 'text-white' : 'text-dark'}>{cat.count} Notifications</span>
                                    </div>
                                    <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100 shadow-inner'}`}>
                                        <div 
                                            className={`h-full rounded-full transition-all duration-1000 ${cat.color}`} 
                                            style={{ width: `${cat.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 7. Critical Alerts Timeline */}
                    <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Critical Alerts</h3>
                            <ShieldAlert size={20} className="text-red-500" />
                        </div>
                        <div className="space-y-6 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                            {criticalAlerts.map((alert, i) => (
                                <div key={i} className="flex gap-4 relative z-10 transition-all hover:translate-x-1 cursor-pointer group">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-all group-hover:scale-110 ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                        <alert.icon size={18} className={alert.color} />
                                    </div>
                                    <div className="pt-1">
                                        <p className={`text-[13px] font-semibold leading-tight group-hover:text-primary dark:group-hover:text-[#3ec3ff] transition-colors ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{alert.text}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Clock size={12} /> {alert.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 8. Quick Actions Panel */}
                    <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                            <Zap size={20} className="text-orange-500" />
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {notificationQuickActions.map((btn, i) => (
                                <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-[11px] font-bold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${btn.color.replace('text-', 'bg-')}/10`}>
                                        <btn.icon size={16} className={btn.color} />
                                    </div>
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
