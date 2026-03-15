import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Users, Shield, ShieldCheck, ShieldAlert, Lock, 
    ArrowLeft, Plus, Search, Filter, Eye, Edit2, 
    Trash2, CheckCircle2, Clock, ChevronRight, 
    Key, UserPlus, Settings, FileText, Activity,
    MoreVertical, Zap
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

import { 
    rolesStats,
    rolesList,
    rolePermissions,
    roleAssignmentData,
    roleActivities,
    rolesQuickActions
} from '@/datasets/roles/rolesData';

export default function ManageRoles() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Manage Roles</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Add New Role
                </button>
            </div>


            {/* 4. Roles Management Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Roles List</h3>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search roles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm border focus:outline-none focus:ring-1 ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-[#3ec3ff]' : 'bg-gray-50 border-gray-200 focus:border-primary focus:ring-primary'}`}
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Role Name</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Description</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Users Assigned</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Permissions</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Created Date</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {rolesList.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase())).map((role, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{role.name}</td>
                                    <td className="p-4 text-gray-500">{role.desc}</td>
                                    <td className="p-4 text-center font-medium">{role.users}</td>
                                    <td className="p-4 text-center font-medium text-primary dark:text-[#3ec3ff]">{role.perms}</td>
                                    <td className="p-4 text-center text-gray-400">{role.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-green-500/10 text-green-500 border border-green-500/20`}>
                                            {role.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View"><Eye size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Edit"><Edit2 size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 5. Role Permissions & Assignment Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Permissions Overview */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Role Permissions Overview</h3>
                        <Lock size={20} className="text-pink-500" />
                    </div>
                    <div className="space-y-4 flex-1">
                        {rolePermissions.map((item, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border flex flex-col gap-2 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-sm">{item.role}</span>
                                    <ChevronRight size={14} className="text-gray-500" />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {item.modules.map((mod, i) => (
                                        <span key={i} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${item.color}`}>
                                            {mod}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Role Assignment Panel */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>User Role Assignment</h3>
                        <UserPlus size={20} className="text-blue-500" />
                    </div>
                    <div className="space-y-6 flex-1">
                        {roleAssignmentData.map((item, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-gray-500">{item.label}</span>
                                    <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{item.value} Users</span>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                    <div 
                                        className={`h-full rounded-full ${item.color} transition-all duration-1000`} 
                                        style={{ width: `${(item.value / item.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        <div className={`mt-auto p-4 rounded-xl border border-dashed ${isDarkMode ? 'bg-[#3ec3ff]/5 border-[#3ec3ff]/20' : 'bg-lightSky/20 border-primary/20'}`}>
                            <p className="text-xs text-center text-gray-500">Need to update assignments? Use the bulk action tool in User Management.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Recent Role Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Role Changes */}
                <div className={`lg:col-span-2 p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Role Changes</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6">
                        {roleActivities.map((act, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                    {act.type === 'create' ? <Zap size={18} className="text-blue-500" /> : <Settings size={18} className="text-amber-500" />}
                                </div>
                                <div>
                                    <p className={`text-[14px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {act.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Admin Actions */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        <Shield size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        {rolesQuickActions.map((btn, i) => {
                            const Icon = btn.icon;
                            return (
                                <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-sm font-semibold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                    <Icon size={18} className={btn.color} />
                                    {btn.label}
                                    <ChevronRight size={14} className="ml-auto text-gray-400" />
                                </button>
                            );
                        })}
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
