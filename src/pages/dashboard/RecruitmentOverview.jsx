import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
    Briefcase, Users, UserCheck, CalendarDays, CheckCircle2, 
    ArrowLeft, Plus, Search, Filter, Eye, Edit2, 
    Trash2, Clock, ChevronRight, LayoutGrid, 
    Settings, FileText, Activity, MoreVertical, 
    Zap, ClipboardList, TrendingUp, BarChart3, 
    UserPlus, FilePlus, Share2, Mail, ExternalLink,
    MapPin, Target, Monitor
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, Legend, LineChart, Line, 
    Cell, ComposedChart, Area 
} from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import { 
    recruitmentStats as statsCards,
    pipelineData,
    hiringTrendData,
    openPositions,
    candidateApplications,
    upcomingInterviews,
    performanceMetrics,
    recentActivity
} from '@/datasets/recruitment/recruitmentOverviewData';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-xs font-semibold" style={{ color: entry.color || entry.fill }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function RecruitmentOverview() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>
            
            {/* 1. Page Section Title */}
            <div className="flex items-center justify-between mt-2 mb-4">
                <h2 className={`text-xl font-semibold tracking-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recruitment Overview</h2>
                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs text-white transition-all active:scale-95 shrink-0 shadow-md ${isDarkMode ? 'bg-[#3ec3ff] hover:bg-[#3ec3ff]/90 text-dark' : 'bg-primary hover:bg-blue-700'}`}>
                    <Plus size={16} />
                    Create Job Posting
                </button>
            </div>


            {/* 4. Recruitment Pipeline Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recruitment Pipeline Bar Chart */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recruitment Pipeline</h3>
                        <BarChart3 size={20} className="text-secondary" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={pipelineData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} width={100} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                                    {pipelineData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                                <Legend />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Hiring Trend Line Chart */}
                <div className={`rounded-xl border flex flex-col h-[400px] ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Hiring Trend (Monthly)</h3>
                        <TrendingUp size={20} className="text-emerald-500" />
                    </div>
                    <div className="flex-1 p-5">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={hiringTrendData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Area type="monotone" dataKey="hired" fill={isDarkMode ? "rgba(62, 195, 255, 0.1)" : "rgba(37, 99, 235, 0.1)"} stroke="none" />
                                <Line type="monotone" dataKey="hired" stroke={isDarkMode ? "#3ec3ff" : "#2563EB"} strokeWidth={3} dot={{ r: 4, fill: isDarkMode ? "#3ec3ff" : "#2563EB" }} activeDot={{ r: 6 }} />
                                <Legend />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 5. Open Job Positions Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Open Job Positions</h3>
                    <Briefcase size={20} className="text-secondary" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Job Title</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Department</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Openings</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Applications</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Posted Date</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {openPositions.map((job, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{job.title}</td>
                                    <td className="p-4 text-gray-500">{job.dept}</td>
                                    <td className="p-4 text-center font-medium">{job.openings}</td>
                                    <td className="p-4 text-center font-medium text-primary dark:text-[#3ec3ff]">{job.apps}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase bg-green-500/10 text-green-500 border border-green-500/20`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center text-gray-400">{job.date}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="View Job"><Eye size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-white/10 text-gray-400 hover:text-[#3ec3ff]' : 'hover:bg-gray-100 text-gray-500 hover:text-primary'}`} title="Edit Job"><Edit2 size={16} /></button>
                                            <button className={`p-1.5 rounded-md ${isDarkMode ? 'hover:bg-red-500/10 text-gray-400 hover:text-red-500' : 'hover:bg-red-50 text-gray-500 hover:text-red-500'}`} title="Close Job"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 6. Candidate Activity Table */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Candidate Applications</h3>
                    <Users size={20} className="text-secondary" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Candidate</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Position Applied</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Experience</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Interview Stage</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Recruiter</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {candidateApplications.map((cand, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{cand.name}</td>
                                    <td className="p-4 text-gray-500">{cand.position}</td>
                                    <td className="p-4 text-center">{cand.exp}</td>
                                    <td className="p-4 text-center">
                                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                            {cand.stage}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500">{cand.recruiter}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${cand.status === 'Offer Sent' ? 'bg-purple-500/10 text-purple-500' : 'bg-amber-500/10 text-amber-500'} border`}>
                                            {cand.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 7. Upcoming Interviews Schedule */}
            <div className={`rounded-xl border flex flex-col pb-4 ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Upcoming Interviews</h3>
                    <CalendarDays size={20} className="text-orange-500" />
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Candidate</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Position</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500">Interview Panel</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Date</th>
                                <th className="p-4 font-headings text-xs font-semibold uppercase tracking-wider text-gray-500 text-center">Mode</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {upcomingInterviews.map((int, i) => (
                                <tr key={i} className={`border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-gray-50 border-borderColor'}`}>
                                    <td className="p-4 font-bold">{int.candidate}</td>
                                    <td className="p-4 text-gray-500">{int.position}</td>
                                    <td className="p-4 text-gray-500 font-medium">{int.panel}</td>
                                    <td className="p-4 text-center font-bold text-primary dark:text-[#3ec3ff]">{int.date}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-1.5">
                                            {int.mode === 'Online' ? <Monitor size={14} className="text-blue-500" /> : <MapPin size={14} className="text-emerald-500" />}
                                            <span className="font-semibold">{int.mode}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 8. Recruitment Performance & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Performance Metrics */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recruitment Performance</h3>
                        <Activity size={20} className="text-primary" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                        {performanceMetrics.map((perf, idx) => (
                            <div key={idx} className={`p-4 rounded-xl border flex items-center gap-4 transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${perf.bgColor}`}>
                                    <perf.icon size={22} className={perf.color} />
                                </div>
                                <div>
                                    <h4 className={`text-xl font-bold font-headings leading-none ${isDarkMode ? 'text-white' : 'text-dark'}`}>{perf.value}</h4>
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{perf.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`mt-6 p-4 rounded-xl border border-dashed ${isDarkMode ? 'bg-[#3ec3ff]/5 border-[#3ec3ff]/20 text-[#3ec3ff]' : 'bg-lightSky/20 border-primary/20 text-primary'} text-xs font-semibold text-center`}>
                        Recruiter efficiency improved by 8% this month.
                    </div>
                </div>

                {/* Recent Recruitment Activity */}
                <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Recent Recruitment Activity</h3>
                        <Activity size={20} className="text-emerald-500" />
                    </div>
                    <div className="space-y-6 flex-1 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100 dark:before:bg-white/5">
                        {recentActivity.map((act, i) => (
                            <div key={i} className="flex gap-4 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${isDarkMode ? 'bg-[#0c162d] border border-white/10' : 'bg-white border border-gray-100'}`}>
                                    <act.icon size={18} className={act.color} />
                                </div>
                                <div className="pt-1">
                                    <p className={`text-[14px] font-semibold leading-tight ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{act.text}</p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                        <Clock size={12} /> {act.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 9. Quick Actions */}
            <div className={`p-6 rounded-xl border flex flex-col ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-borderColor shadow-sm'}`}>
                <div className="flex items-center justify-between mb-6">
                    <h3 className={`font-headings font-bold text-lg ${isDarkMode ? 'text-white' : 'text-dark'}`}>Quick Actions</h3>
                    <Settings size={20} className="text-secondary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: 'Create Job Posting', icon: FilePlus, color: 'text-blue-500' },
                        { label: 'View Candidate Pipeline', icon: Users, color: 'text-purple-500' },
                        { label: 'Schedule Interview', icon: CalendarDays, color: 'text-orange-500' },
                        { label: 'Generate Recruitment Report', icon: FileText, color: 'text-emerald-500' }
                    ].map((btn, i) => (
                        <button key={i} className={`flex items-center gap-3 p-4 rounded-xl border transition-all text-sm font-bold active:scale-95 ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-200' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${btn.color.replace('text-', 'bg-')}/10`}>
                                <btn.icon size={20} className={btn.color} />
                            </div>
                            {btn.label}
                            <ChevronRight size={16} className="ml-auto text-gray-400" />
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
