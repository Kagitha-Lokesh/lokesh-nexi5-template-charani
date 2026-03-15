import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    UserPlus, Play, FileText, Search, Filter, 
    MoreHorizontal, CheckCircle2, Clock, AlertCircle, 
    Calendar, Building2, User, ChevronRight, Download, 
    Mail, Upload, Plus, LayoutGrid, List, ArrowRight,
    Users, Package, ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { useTheme } from '@/context/ThemeContext';
import {
    onboardingStatsData as onboardingStats, pipelineStagesData as pipelineStages,
    candidatePipelineData as candidateData, upcomingJoinersData as upcomingJoiners,
    recentOnboardingActivityData as recentActivity, onboardingFilterOptions
} from '@/datasets/hr-executive/hrExecutiveDashboardData';





// --- Sub-components ---

const CandidateCard = ({ candidate, isDarkMode }) => (
    <motion.div
        layout
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.3 }}
        className={`p-4 rounded-lg border shadow-sm cursor-pointer transition-all duration-300 ${
            isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500/50' : 'bg-white border-gray-100 hover:border-blue-500/50'
        }`}
    >
        <div className="flex justify-between items-start mb-3">
            <div>
                <h4 className="text-sm font-bold leading-tight">{candidate.name}</h4>
                <p className="text-[10px] text-gray-500 font-medium mt-0.5">{candidate.role}</p>
            </div>
            <span className="text-[9px] font-bold text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                {candidate.id}
            </span>
        </div>
        
        <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                <Building2 size={12} className="shrink-0" />
                {candidate.dept}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                <Calendar size={12} className="shrink-0" />
                Joining → {candidate.date}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                <User size={12} className="shrink-0" />
                HR → {candidate.hr}
            </div>
        </div>

        <div className="flex flex-wrap gap-1 border-t border-gray-100 dark:border-gray-700 pt-3">
            {['View', 'Docs', 'Verify', 'Schedule'].map((act, i) => (
                <button 
                    key={i} 
                    className="text-[9px] font-bold px-2 py-1 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200 border border-gray-100 dark:border-gray-700"
                >
                    {act}
                </button>
            ))}
        </div>
    </motion.div>
);

const PipelineColumn = ({ stage, candidates, isDarkMode }) => (
    <div className="flex flex-col gap-4 min-w-[280px]">
        <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                <span className="text-[11px] font-black uppercase text-gray-500 tracking-tighter">{stage.title}</span>
            </div>
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
                {candidates.length}
            </span>
        </div>
        <div className={`flex-1 min-h-[400px] p-3 rounded-xl border transition-all duration-300 ${
            isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-gray-50/50 border-gray-200'
        }`}>
            <div className="space-y-4">
                {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} isDarkMode={isDarkMode} />
                ))}
            </div>
        </div>
    </div>
);

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

export default function HrExecutiveDashboard() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const cardClass = `rounded-xl border shadow-sm p-6 ${
        isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'
    }`;

    const inputClass = `w-full px-3 py-2 rounded-lg border text-xs outline-none transition-all ${
        isDarkMode ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500/50' : 'bg-white border-gray-200 focus:border-blue-500'
    }`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-6 font-body min-h-screen ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            
            {/* 2. Module Title */}
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold tracking-tight">Employee Onboarding</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => navigate('/dashboard/employee/add')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-lg transition-all active:scale-95"
                    >
                        <UserPlus size={16} />
                        Add New Candidate
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-all active:scale-95">
                        <Play size={16} />
                        Start Onboarding
                    </button>
                    <button 
                        onClick={() => navigate('/dashboard/reports')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm active:scale-95 border ${
                        isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white border-gray-200 hover:bg-gray-50'
                    }`}>
                        <FileText size={16} />
                        Generate Onboarding Report
                    </button>
                </div>
            </motion.div>

            {/* 3. Onboarding Filters */}
            <motion.div {...fadeUp} transition={{ delay: 0.1 }} className={cardClass}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Candidate Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                            <input placeholder="Search..." className={`${inputClass} pl-9`} />
                        </div>
                    </div>
                    {onboardingFilterOptions.map((filter, i) => (

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

            {/* 6. Onboarding Progress Cards */}
            <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {onboardingStats.map((stat, i) => (
                    <div 
                        key={i} 
                        onClick={() => navigate('/dashboard/recruitment-overview')}
                        className={`${cardClass} cursor-pointer hover:shadow-md transition-shadow active:scale-[0.99]`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div>
                                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-tighter">{stat.label}</p>
                                <h3 className="text-2xl font-bold mt-1">
                                    <CountUp end={stat.value} duration={2} />
                                </h3>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* 4. Candidate Onboarding Pipeline */}
            <motion.div {...fadeUp} transition={{ delay: 0.3 }} className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold tracking-tight">Onboarding Pipeline</h2>
                    <div className="flex gap-2">
                        <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><LayoutGrid size={16} /></button>
                        <button className={`p-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}><List size={16}/></button>
                    </div>
                </div>
                <div className="overflow-x-auto pb-4 custom-scrollbar">
                    <div className="flex gap-6 min-w-max">
                        {pipelineStages.map((stage) => (
                            <PipelineColumn 
                                key={stage.id} 
                                stage={stage} 
                                candidates={candidateData[stage.id] || []} 
                                isDarkMode={isDarkMode} 
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 7. New Joiners Table */}
                <motion.div {...fadeUp} transition={{ delay: 0.4 }} className={`lg:col-span-2 ${cardClass}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold tracking-tight">Upcoming Joiners</h3>
                        <div className="flex gap-2">
                            <button className="text-xs font-bold text-blue-500 hover:underline">Export CSV</button>
                            <button className="text-xs font-bold text-blue-500 hover:underline">View All</button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className={`border-b text-[10px] font-black uppercase text-gray-500 tracking-tighter ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                                    <th className="pb-3">Candidate</th>
                                    <th className="pb-3">Dept</th>
                                    <th className="pb-3 text-center">Join Date</th>
                                    <th className="pb-3">Stage</th>
                                    <th className="pb-3">HR</th>
                                    <th className="pb-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                {upcomingJoiners.map((row, idx) => (
                                    <tr key={idx} className={`group transition-all duration-200 ${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-50'}`}>
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                                                    {row.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold">{row.name}</p>
                                                    <p className="text-[10px] text-gray-500">{row.position}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 text-[10px] font-bold text-gray-500">{row.department}</td>
                                        <td className="py-4 text-[10px] font-bold text-center">{row.joiningDate}</td>
                                        <td className="py-4">
                                            <span className="text-[9px] font-bold px-2 py-1 rounded-full bg-amber-500/10 text-amber-600">
                                                {row.stage}
                                            </span>
                                        </td>
                                        <td className="py-4 text-[10px] font-bold text-gray-500">{row.hr}</td>
                                        <td className="py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 rounded-md hover:bg-blue-500 hover:text-white transition-colors"><Mail size={14} /></button>
                                                <button className="p-1.5 rounded-md hover:bg-blue-500 hover:text-white transition-colors"><ChevronRight size={14} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* 8. Recent Onboarding Activity */}
                <motion.div {...fadeUp} transition={{ delay: 0.5 }} className={cardClass}>
                    <h3 className="text-lg font-bold tracking-tight mb-6">Recent Onboarding Activity</h3>
                    <div className="space-y-6 relative">
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-800" />
                        {recentActivity.map((activity, i) => (
                            <div key={i} className="flex gap-4 relative">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                                    isDarkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
                                }`}>
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                </div>
                                <div className="pt-1">
                                    <p className="text-xs font-medium leading-relaxed">{activity.text}</p>
                                    <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                                        <Clock size={10} /> {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full mt-4 py-2 text-[11px] font-bold text-blue-500 hover:bg-blue-500/5 rounded-lg border border-blue-500/20 transition-all">
                            View All Activity
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* 9. Quick Actions */}
            <motion.div {...fadeUp} transition={{ delay: 0.6 }} className={cardClass}>
                <h3 className="text-lg font-bold tracking-tight mb-6">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Add Candidate', icon: UserPlus, color: 'hover:bg-blue-500', action: () => navigate('/dashboard/employee/add') },
                        { label: 'Upload Documents', icon: Upload, color: 'hover:bg-indigo-500', action: () => {} },
                        { label: 'Schedule Orientation', icon: Calendar, color: 'hover:bg-purple-500', action: () => {} },
                        { label: 'Send Welcome Email', icon: Mail, color: 'hover:bg-emerald-500', action: () => {} },
                    ].map((btn, i) => (
                        <button 
                            key={i} 
                            onClick={btn.action}
                            className={`flex items-center justify-center gap-3 p-4 rounded-xl border group transition-all duration-300 ${
                                isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100 shadow-sm'
                            } ${btn.color} hover:text-white hover:scale-[1.02]`}
                        >
                            <btn.icon size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-xs font-bold">{btn.label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}
