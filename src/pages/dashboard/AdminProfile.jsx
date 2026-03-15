import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    User, Mail, Phone, MapPin, Building2, 
    ShieldCheck, Calendar, Clock, Lock, 
    Key, Smartphone, Laptop, Globe, 
    Edit2, Shield, Activity, 
    Zap, ChevronRight,
    Bell,
    Languages, Settings,
    LogOut, Sun, Moon, FileSearch,
    Download, FileText, Briefcase, CreditCard
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { getCurrentUserData } from '@/config/roleData';
import { securitySettings, getAccountPreferences } from '@/datasets/profile/adminProfileData';

export default function AdminProfile() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    // ── Dynamic user data based on logged-in role ─────────────────────────
    const userData = getCurrentUserData();

    const personalInfo = [
        { label: 'Full Name', value: userData.name, icon: User },
        { label: 'Email', value: userData.email, icon: Mail },
        { label: 'Phone Number', value: userData.phone || '+91-XXXXXXXXXX', icon: Phone },
        { label: 'Employee ID', value: userData.empId, icon: ShieldCheck },
        { label: 'Department', value: userData.department, icon: Building2 },
        { label: 'Location', value: userData.location, icon: MapPin },
    ];

    const workInfo = [
        { label: 'Role', value: userData.role, icon: Shield },
        { label: 'Reporting To', value: userData.reportingTo, icon: ShieldCheck },
        { label: 'Joining Date', value: userData.joiningDate, icon: Calendar },
        { label: 'Employment Type', value: userData.empType, icon: Briefcase },
        { label: 'Office Location', value: userData.office, icon: MapPin },
    ];

    const accountPreferences = getAccountPreferences(isDarkMode);

    const recentActivity = userData.recentActivity || [];
    const quickActions = userData.quickActions || [];

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* Profile Header Banner Card */}
            <div className={`rounded-xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        {userData.avatar ? (
                            <img
                                src={userData.avatar}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                            />
                        ) : (
                            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-primary/20 ${userData.avatarColor || 'bg-primary'}`}>
                                {userData.avatarInitial}
                            </div>
                        )}
                        <button className="absolute bottom-0 right-0 p-1.5 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit2 size={12} />
                        </button>
                    </div>
                    <div>
                        <h1 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{userData.name}</h1>
                        <p className={`text-sm font-semibold flex items-center gap-2 ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>
                            <Shield size={14} /> {userData.role}
                        </p>
                        <p className={`text-xs font-medium mt-1 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                            {userData.department}
                        </p>
                    </div>
                </div>
                <button className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700 text-white'}`}>
                    <Edit2 size={16} />
                    Edit Profile
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column: Profile & Work Info */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                    
                    {/* Personal Information Card */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Personal Information</h3>
                            <button className="p-1.5 text-gray-400 hover:text-primary transition-colors">
                                <Edit2 size={16} />
                            </button>
                        </div>
                        <div className="p-6 space-y-5">
                            {personalInfo.map((info, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                        {info.label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <info.icon size={16} className={`shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`} />
                                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>
                                            {info.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Work Information Card */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Work Information</h3>
                            <Briefcase size={18} className="text-secondary" />
                        </div>
                        <div className="p-6 space-y-5">
                            {workInfo.map((info, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                        {info.label}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <info.icon size={16} className={`shrink-0 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`} />
                                        <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>
                                            {info.value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Security, Preferences & Activity */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* Security Settings Card */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Account Security</h3>
                            <Lock size={18} className="text-red-500" />
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {securitySettings.map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-borderColor hover:bg-white'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                            <item.icon size={18} className="text-gray-400" />
                                        </div>
                                        <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.name}</span>
                                    </div>
                                    {item.name === 'Login History' || item.name === 'Active Sessions' || item.name === 'Change Password' ? (
                                        <button className={`text-xs font-bold text-primary dark:text-[#3ec3ff] hover:underline`}>{item.status}</button>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-bold text-emerald-500 uppercase">{item.status}</span>
                                            <div className="w-10 h-5 bg-emerald-500/10 rounded-full relative p-1 cursor-pointer">
                                                <div className="w-3 h-3 bg-emerald-500 rounded-full absolute right-1"></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Preferences Card */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Preferences</h3>
                            <Settings size={18} className="text-primary" />
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {accountPreferences.map((pref, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-borderColor hover:bg-white'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                            <pref.icon size={18} className="text-gray-400" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-[10px] font-bold uppercase text-gray-500 tracking-wider`}>{pref.label}</span>
                                            <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{pref.value}</span>
                                        </div>
                                    </div>
                                    {pref.toggle ? (
                                        <div className="w-10 h-5 bg-emerald-500/10 rounded-full relative p-1 cursor-pointer">
                                            <div className="w-3 h-3 bg-emerald-500 rounded-full absolute right-1"></div>
                                        </div>
                                    ) : (
                                        <ChevronRight size={16} className="text-gray-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Row inside Right Column */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Recent Activity Card */}
                        <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                            <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Activity</h3>
                                <Activity size={18} className="text-pink-500" />
                            </div>
                            <div className="p-6 space-y-4">
                                {recentActivity.map((act, i) => (
                                    <div key={i} className="flex gap-3 items-start">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} border ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                            <act.icon size={14} className={act.color} />
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                            <span className="text-[10px] font-medium text-gray-500">{act.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions Panel */}
                        <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                            <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                                <Zap size={18} className="text-orange-500" />
                            </div>
                            <div className="p-6 grid grid-cols-1 gap-3">
                                {quickActions.map((btn, i) => {
                                    const Icon = btn.icon;
                                    return (
                                        <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-xs font-bold active:scale-95 text-white ${btn.color} hover:opacity-90 shadow-sm`}>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/20`}>
                                                <Icon size={16} />
                                            </div>
                                            {btn.label}
                                        </button>
                                    );
                                })}
                            </div>
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
