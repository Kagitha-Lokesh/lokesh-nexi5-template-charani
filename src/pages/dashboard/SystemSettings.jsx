import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Settings, Shield, Globe, Bell, Clock, 
    Save, ArrowLeft, Users, ShieldCheck, 
    LayoutGrid, Activity, ChevronRight, 
    Edit2, ToggleLeft as Toggle, Mail, 
    Lock, Key, Server, Database, Cloud, 
    Briefcase, Calendar, Smartphone, 
    FileText, Zap, LogOut, CheckCircle2,
    Monitor, RefreshCw, Terminal, 
    ShieldAlert, HardDrive, Smartphone as Phone
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// Mock Data for System Settings
import { 
    systemStats as statsCards,
    platformConfigs,
    securitySettings,
    platformIntegrations as integrations,
    organizationPreferences as organizationPrefs,
    systemActivity,
    systemQuickActions
} from '@/datasets/system/systemSettingsData';

export default function SystemSettings() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>System Settings</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Save size={16} />
                    Save Configuration
                </button>
            </div>


            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (2/3 width) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    
                    {/* 4. Platform Configuration Panels */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Platform Configuration</h3>
                            <Monitor size={20} className="text-[#3ec3ff]" />
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {platformConfigs.map((config, i) => (
                                <div key={i} className={`p-4 rounded-xl border flex flex-col gap-3 transition-colors ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-gray-100/50'}`}>
                                    <div className="flex justify-between items-start">
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{config.name}</span>
                                        <button className={`p-1 rounded-md text-primary dark:text-[#3ec3ff] hover:bg-white/10 transition-colors`}><Edit2 size={14} /></button>
                                    </div>
                                    <div className={`text-sm font-semibold truncate ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>
                                        {config.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 5. Security & Access Settings */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Security & Access Control</h3>
                            <ShieldCheck size={20} className="text-emerald-500" />
                        </div>
                        <div className="p-6 space-y-4">
                            {securitySettings.map((setting, i) => (
                                <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-[14px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{setting.name}</span>
                                        <span className={`text-[12px] font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{setting.status}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className={`text-xs font-bold text-primary dark:text-[#3ec3ff] hover:underline`}>Edit</button>
                                        <button className={`p-1.5 rounded-full transition-colors ${setting.active ? 'text-emerald-500' : 'text-gray-400'}`}>
                                            <Toggle size={24} className={setting.active ? 'fill-current' : ''} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 6. Third-Party Integrations */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Third-Party Integrations</h3>
                            <Terminal size={20} className="text-blue-500" />
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {integrations.map((item, i) => (
                                <div key={i} className={`p-4 rounded-xl border flex items-center justify-between transition-all ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white'}`}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-sm'}`}>
                                            {(() => {
                                                const Icon = item.icon;
                                                return <Icon size={20} className={item.color} />;
                                            })()}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`text-[13px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.name}</span>
                                            <span className={`text-[11px] font-medium ${item.status === 'Connected' ? 'text-emerald-500' : 'text-orange-500'}`}>{item.status}</span>
                                        </div>
                                    </div>
                                    <button className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10' : 'bg-white border border-borderColor text-primary hover:bg-gray-50'}`}>
                                        {item.status === 'Connected' ? 'Configure' : 'Connect'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column (1/3 width) */}
                <div className="flex flex-col gap-6">
                    
                    {/* 7. Organization Preferences */}
                    <div className={`rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Organization Preferences</h3>
                            <Briefcase size={20} className="text-secondary" />
                        </div>
                        <div className="p-6 space-y-5">
                            {organizationPrefs.map((pref, i) => (
                                <div key={i} className="flex flex-col gap-1.5">
                                    <label className={`text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1`}>{pref.label}</label>
                                    <div className={`p-3 rounded-xl border text-[13px] font-semibold ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-200' : 'bg-lightBlueBg border-borderColor text-dark'}`}>
                                        {pref.value}
                                    </div>
                                </div>
                            ))}
                            <div className="pt-2">
                                <label className={`text-[11px] font-bold uppercase tracking-wider text-gray-500 px-1 block mb-2`}>Company Logo</label>
                                <div className={`aspect-video rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 ${isDarkMode ? 'bg-white/5 border-white/10 cursor-pointer hover:bg-white/10' : 'bg-gray-50 border-gray-300 cursor-pointer hover:bg-gray-100'}`}>
                                    <Cloud size={24} className="text-gray-400" />
                                    <span className="text-[11px] font-bold text-gray-500">Upload New Logo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 8. Recent System Activity Timeline */}
                    <div className={`p-6 rounded-xl border flex flex-col flex-1 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent System Activity</h3>
                            <Activity size={20} className="text-pink-500" />
                        </div>
                        <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                            {systemActivity.map((act, i) => (
                                <div key={i} className="flex gap-4 relative z-10">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                        {(() => {
                                            const Icon = act.icon;
                                            return <Icon size={18} className={act.color} />;
                                        })()}
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
                        <button className="w-full py-2.5 bg-lightSky/30 text-primary dark:text-[#3ec3ff] dark:bg-white/5 rounded-lg text-xs font-bold hover:bg-lightSky/50 dark:hover:bg-white/10 transition-all mt-6 uppercase tracking-wider">
                            View All Logs
                        </button>
                    </div>
                </div>
            </div>

            {/* 9. Quick Actions Panel (Icons / Buttons) */}
            <div className={`rounded-xl border p-6 flex flex-col md:flex-row flex-wrap items-center gap-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <h3 className={`font-headings font-bold text-lg mr-4 ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                <div className="flex flex-wrap gap-3">
                    {systemQuickActions.map((btn, i) => (
                         <button key={i} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10' : 'bg-gray-50 border border-gray-100 text-dark hover:bg-white hover:shadow-md'}`}>
                              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${btn.bgColor}`}>
                                 {(() => {
                                     const Icon = btn.icon;
                                     return <Icon size={14} className={btn.color} />;
                                 })()}
                              </div>
                              {btn.label}
                         </button>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
