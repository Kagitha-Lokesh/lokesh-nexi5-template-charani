import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Settings as SettingsIcon, Shield, Globe, Bell, Clock, 
    Save, ArrowLeft, Users, ShieldCheck, 
    LayoutGrid, Activity, ChevronRight, 
    Edit2, ToggleLeft as Toggle, Mail, 
    Lock, Key, Server, Database, Cloud, 
    Briefcase, Calendar, Smartphone, 
    FileText, Zap, LogOut, CheckCircle2,
    Monitor, RefreshCw, Terminal, 
    ShieldAlert, HardDrive, Download,
    Building2, MapPin, Phone as PhoneIcon, Mail as MailIcon,
    Moon, Sun, Languages, Eye, HelpCircle,
    UserCog, Laptop, Palette, Navigation
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

import { 
    settingsStats as statsCards,
    generalSettings,
    organizationSettings as orgSettings,
    notificationSettings as notifySettings,
    securityPolicies,
    userPreferences as userPrefs,
    recentChanges,
    settingsQuickActions
} from '@/datasets/settings/settingsData';

export default function Settings() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Settings</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Save size={16} />
                    Save Changes
                </button>
            </div>


            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Column 1 */}
                <div className="flex flex-col gap-6">
                    {/* General Settings */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>General Settings</h3>
                            <SettingsIcon size={20} className="text-[#3ec3ff]" />
                        </div>
                        <div className="p-5 space-y-4">
                            {generalSettings.map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex items-center gap-3">
                                        <item.icon size={16} className="text-gray-400" />
                                        <div className="flex flex-col">
                                            <span className={`text-[11px] font-bold uppercase tracking-wider text-gray-500`}>{item.name}</span>
                                            <span className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.value}</span>
                                        </div>
                                    </div>
                                    <button className={`p-1 rounded-md text-primary dark:text-[#3ec3ff] hover:bg-white/10`}><Edit2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Notification Settings */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Notification Settings</h3>
                            <Bell size={20} className="text-orange-500" />
                        </div>
                        <div className="p-5 space-y-4">
                            {notifySettings.map((item, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                    <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.name}</span>
                                    <button className={`p-1 transition-colors ${item.active ? 'text-emerald-500' : 'text-gray-400'}`}>
                                        <Toggle size={22} className={item.active ? 'fill-current' : ''} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-6">
                    {/* Organization Settings */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organization Settings</h3>
                            <Building2 size={20} className="text-emerald-500" />
                        </div>
                        <div className="p-5 space-y-4">
                             {orgSettings.map((pref, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <label className={`text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1`}>{pref.label}</label>
                                    <div className={`p-3 rounded-xl border text-sm font-semibold flex items-center gap-3 ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-lightBlueBg border-borderColor text-dark'}`}>
                                        <pref.icon size={14} className="text-gray-400" />
                                        {pref.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* User Preferences */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>User Preferences</h3>
                            <UserCog size={20} className="text-purple-500" />
                        </div>
                        <div className="p-5 space-y-4">
                            {userPrefs.map((pref, i) => (
                                <div key={i} className={`flex flex-col gap-1.5`}>
                                    <label className={`text-[10px] font-bold uppercase tracking-wider text-gray-500 px-1`}>{pref.label}</label>
                                    <div className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-between ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-lightBlueBg border-borderColor text-dark'}`}>
                                        <div className="flex items-center gap-3">
                                            <pref.icon size={14} className="text-gray-400" />
                                            {pref.value}
                                        </div>
                                        <ChevronRight size={14} className="text-gray-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col gap-6">
                    {/* Security Settings */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Security Settings</h3>
                            <Shield size={20} className="text-red-500" />
                        </div>
                        <div className="p-5 space-y-4">
                            {securityPolicies.map((setting, i) => (
                                <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                    <div className="flex flex-col">
                                        <span className={`text-[13px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{setting.name}</span>
                                        <span className={`text-[11px] font-medium text-gray-500`}>{setting.status}</span>
                                    </div>
                                    <button className={`p-1.5 rounded-full transition-colors ${setting.active ? 'text-emerald-500' : 'text-gray-400'}`}>
                                        <Toggle size={22} className={setting.active ? 'fill-current' : ''} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Configuration Changes */}
                    <div className={`p-6 rounded-xl border flex flex-col flex-1 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Changes</h3>
                            <Activity size={20} className="text-pink-500" />
                        </div>
                        <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                            {recentChanges.map((act, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                        <act.icon size={18} className={act.color} />
                                    </div>
                                    <div className="pt-1">
                                        <p className={`text-[13px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                            <Clock size={12} /> {act.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions Panel */}
                    <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-3">
                            {settingsQuickActions.map((btn, i) => (
                                <button key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-xs font-semibold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
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
