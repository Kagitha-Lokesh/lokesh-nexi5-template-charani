import React, { useState } from 'react';
import { 
    Calendar as CalendarIcon, Filter, Search, Plus, 
    Download, FileText, Send, UserCheck, 
    MoreHorizontal, Clock, Video, MapPin,
    ArrowUpRight, ArrowRight, CheckCircle2,
    PieChart as PieIcon, BarChart3, TrendingUp,
    MessageSquare, Eye, ExternalLink, Activity,
    ChevronLeft, ChevronRight, User, PlusCircle,
    PlayCircle, Edit, StickyNote, RefreshCcw
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

// Datasets
import { 
    upcomingMeetings, meetingStats, monthlyActivity, 
    meetingTimeline, meetingFilterOptions 
} from '@/datasets/bde/meetingsData';

// --- Sub-components ---


const CalendarView = ({ isDarkMode }) => {
    // Simplified Calendar component
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const currentMonth = 'April 2026';
    const dates = Array.from({ length: 30 }, (_, i) => i + 1);
    const meetingDates = [10, 12, 15, 18, 22, 25];

    return (
        <div className={`${isDarkMode ? 'bg-[#0c162d]/50 border-white/10' : 'bg-white border-slate-100 shadow-sm'} p-6 rounded-2xl border transition-all duration-300`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-black uppercase tracking-widest">{currentMonth}</h3>
                <div className="flex gap-2">
                    <button className={`p-1.5 rounded-lg border ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <ChevronLeft size={16} />
                    </button>
                    <button className={`p-1.5 rounded-lg border ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}>
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
                {days.map(day => (
                    <div key={day} className={`text-[10px] font-black uppercase text-center ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        {day}
                    </div>
                ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
                {dates.map(date => (
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        key={date} 
                        className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs font-bold cursor-pointer transition-all relative
                            ${meetingDates.includes(date) ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-50 text-slate-600'}`}
                    >
                        {date}
                        {meetingDates.includes(date) && (
                            <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full" />
                        )}
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-8 space-y-3">
                <h4 className={`text-[10px] font-black uppercase tracking-tighter ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Selected Date Impact</h4>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
                    <p className="text-[11px] font-bold">3 Meetings Scheduled</p>
                    <p className={`text-[9px] font-medium mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>High availability for late afternoon slots.</p>
                </div>
            </div>
        </div>
    );
};

const MeetingCard = ({ meeting, isDarkMode }) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: 5 }}
        className={`${isDarkMode ? 'bg-[#0c162d]/50 border-white/5 hover:border-blue-500/30' : 'bg-white border-slate-100 shadow-sm hover:border-blue-200'} p-4 rounded-xl border transition-all duration-300 group`}
    >
        <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-white/5' : 'bg-slate-50'} group-hover:scale-110 transition-transform`}>
                    <meeting.icon size={18} className="text-blue-500" />
                </div>
                <div>
                    <h3 className="text-xs font-black tracking-tight">{meeting.client}</h3>
                    <p className="text-[10px] font-bold text-blue-500">{meeting.type}</p>
                </div>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${isDarkMode ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>
                {meeting.mode}
            </div>
        </div>
        
        <div className="flex items-center justify-between text-[11px] font-bold mb-4">
            <div className="flex items-center gap-2">
                <Clock size={12} className="text-slate-400" />
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{meeting.time}</span>
            </div>
            <div className="flex items-center gap-2">
                <User size={12} className="text-slate-400" />
                <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>{meeting.executive}</span>
            </div>
        </div>
        
        <div className={`pt-3 border-t ${isDarkMode ? 'border-white/5' : 'border-slate-50'} flex gap-1.5`}>
            <button className="flex-1 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all">Join</button>
            <button className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}><Edit size={12} /></button>
            <button className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}><StickyNote size={12} /></button>
            <button className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-white/5 hover:bg-white/10 text-slate-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'}`}><RefreshCcw size={12} /></button>
        </div>
    </motion.div>
);

const MotionCard = ({ children, delay = 0, className = "" }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export default function MeetingsDashboard() {
    const { isDarkMode } = useTheme();

    const glassClass = `${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-slate-100 shadow-sm'} p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden`;
    const headingClass = `text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`;

    return (
        <div className={`p-4 md:p-6 lg:p-8 space-y-8 font-body min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-transparent text-white' : 'bg-slate-50 text-slate-900'}`}>
            
            {/* Background Glow Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
            
            {/* 2. Module Title */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold tracking-tight uppercase flex items-center gap-3">
                        <CalendarIcon className="text-blue-500" />
                        Client Meetings
                    </h1>
                    <p className={`text-xs mt-1 font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Integrated scheduler and meeting management workplace.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                        <PlusCircle size={16} />
                        Schedule Meeting
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                        <PlayCircle size={16} />
                        Create Demo
                    </button>
                </div>
            </div>

            {/* 3. Meeting Filters Panel */}
            <div className={glassClass}>
                <div className="flex items-center gap-2 mb-6">
                    <Filter size={14} className="text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scheduling Filters</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {meetingFilterOptions.map((filter, i) => (
                        <div key={i} className="space-y-2">
                            <label className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{filter.label}</label>
                            {filter.type === 'select' || !filter.type ? (
                                <select className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`}>
                                    {filter.options.map((opt, idx) => (
                                        <option key={idx} className={isDarkMode ? 'bg-[#0c162d] transition-colors' : ''}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input type="date" className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-blue-500/50' : 'bg-slate-50 border-slate-200 focus:border-blue-500'}`} />
                            )}
                        </div>
                    ))}
                </div>

            </div>

            {/* 4. Meeting Calendar Panel & 5. Upcoming Meetings List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard delay={0.1}>
                    <CalendarView isDarkMode={isDarkMode} />
                </MotionCard>
                
                <MotionCard delay={0.2} className={glassClass + " flex flex-col h-full"}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Upcoming Meetings</h2>
                        <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${isDarkMode ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            {upcomingMeetings.length} Total
                        </span>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                        {upcomingMeetings.map((meeting) => (
                            <MeetingCard key={meeting.id} meeting={meeting} isDarkMode={isDarkMode} />
                        ))}
                    </div>
                </MotionCard>
            </div>

            {/* 6. Meeting Timeline & 7. Meeting Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                <MotionCard delay={0.3} className={`lg:col-span-1 ${glassClass}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Meeting Timeline</h2>
                        <Activity size={18} className="text-blue-500" />
                    </div>
                    <div className="space-y-6 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-slate-100 dark:before:bg-white/5">
                        {meetingTimeline.map((activity, idx) => (
                            <div key={activity.id} className="flex gap-4 group cursor-default relative">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center z-10 ${
                                    activity.type === 'completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                    activity.type === 'demo' ? 'bg-blue-500/10 text-blue-500' :
                                    activity.type === 'call' ? 'bg-amber-500/10 text-amber-500' :
                                    'bg-purple-500/10 text-purple-500'
                                }`}>
                                    <CheckCircle2 size={18} />
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{activity.text}</p>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1 block">{activity.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </MotionCard>

                <MotionCard delay={0.4} className={`lg:col-span-2 ${glassClass}`}>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className={headingClass}>Meeting Insights</h2>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-[10px] font-bold text-slate-400">Activity</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-[10px] font-bold text-slate-400">Growth</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[300px]">
                        <div className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={meetingStats}
                                        cx="50%" cy="50%"
                                        innerRadius={60} outerRadius={80}
                                        paddingAngle={5} dataKey="value"
                                        animationDuration={1500}
                                    >
                                        {meetingStats.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                    />
                                    <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', paddingTop: '20px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyActivity}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#f1f5f9'} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} />
                                    <Tooltip 
                                        cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : '#f8fafc' }}
                                        contentStyle={{ backgroundColor: isDarkMode ? '#1e293b' : '#fff', borderColor: 'transparent', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="meetings" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={20} animationDuration={1500} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* 8. Quick Actions Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12">
                {[
                    { label: 'Schedule New Meeting', icon: CalendarIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Create Demo Session', icon: PlayCircle, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                    { label: 'Send Meeting Invite', icon: Send, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { label: 'Export Meeting List', icon: Download, color: 'text-amber-500', bg: 'bg-amber-500/10' }
                ].map((action, i) => (
                    <button key={i} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all active:scale-95 group ${isDarkMode ? 'bg-white/5 border-white/5 text-white hover:bg-white/10 hover:border-blue-500/20 shadow-xl' : 'bg-white border-slate-100 text-slate-800 hover:shadow-md'}`}>
                        <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <action.icon size={20} className={action.color} />
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-black tracking-tight">{action.label}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Quick Execution</p>
                        </div>
                    </button>
                ))}
            </div>
            
            {/* Footer */}
            <div className={`py-12 text-center border-t mt-12 ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    NEXI5 Client Meeting Command Center
                </p>
            </div>
        </div>
    );
}
