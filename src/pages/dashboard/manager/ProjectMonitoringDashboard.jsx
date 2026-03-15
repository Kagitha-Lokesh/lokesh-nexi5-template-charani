import { useState } from 'react';
import {
    Plus, Search, FolderKanban, TrendingUp, CheckCircle2, AlertTriangle,
    Eye, Edit, Trash2, Calendar, ClipboardList, Filter, MoreVertical,
    Activity, Zap, FileText, Send, Megaphone, Clock, ChevronRight,
    ArrowRight, Info, LayoutGrid, List, Download, RefreshCw,
    UserPlus, FileBarChart
} from 'lucide-react';
import {
    BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend,
} from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import {
    projectsOverview,
    milestones,
    workloadData,
    completionRateData,
    horizontalTimeline,
    riskIssues,
    recentUpdates,
    projectQuickActions as quickActionsItems,
} from '@/datasets/manager/projectMonitoringData';

// ─── Components ──────────────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
    }),
};

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-xl shadow-xl text-sm ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-gray-100'}`}>
                <p className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{label}</p>
                {payload.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color || p.fill }} />
                        <span className="font-bold" style={{ color: p.color || p.fill }}>{p.value} {p.unit || ''}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

// ─── Main Component ──────────────────────────────────────────────────────────

export default function ProjectMonitoringDashboard() {
    const { isDarkMode } = useTheme();

    // Local state for filters
    const [search, setSearch] = useState('');
    const [dept, setDept] = useState('All');
    const [status, setStatus] = useState('All');
    const [priority, setPriority] = useState('All');

    const cardBase = `rounded-xl border transition-all ${isDarkMode ? 'bg-[#0c162d]/50 border-white/10 shadow-xl' : 'bg-white border-gray-100 shadow-sm'}`;
    const headerBase = `p-6 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`;
    const headingBase = `font-headings font-bold text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`;

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col gap-6 font-body min-h-screen ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* 1. Module Title */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-xl font-bold tracking-tight font-headings ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Project Monitoring
                    </h1>
                    <p className={`text-sm mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Real-time project oversight, visibility, and risk management.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                        <Plus size={16} /> Create Project
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] hover:bg-white/10' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}>
                        <ClipboardList size={16} /> Add Milestone
                    </button>
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all active:scale-95 ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                        <FileBarChart size={16} /> Generate Project Report
                    </button>
                </div>
            </motion.div>

            {/* 2. Project Filter Panel */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className={`${cardBase} p-6`}>
                <div className="flex items-center gap-2 mb-4 text-sm font-bold text-gray-500">
                    <Filter size={14} /> Filter Projects
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Project Name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:ring-blue-500/50' : 'bg-gray-50 border-gray-200 focus:ring-blue-500/20'}`}
                        />
                    </div>
                    {['Department', 'Project Status', 'Priority Level', 'Deadline Range'].map((label, idx) => (
                        <select
                            key={label}
                            className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-300' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                        >
                            <option>{label}</option>
                            <option>All</option>
                            {idx === 1 && <> <option>In Progress</option> <option>Completed</option> <option>Delayed</option> </>}
                            {idx === 2 && <> <option>High</option> <option>Medium</option> <option>Low</option> </>}
                        </select>
                    ))}
                </div>
            </motion.div>

            {/* 3. Project Progress Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {projectsOverview.map((item, i) => (
                    <motion.div
                        key={item.id}
                        variants={fadeUp} initial="hidden" animate="visible" custom={i + 2}
                        whileHover={{ y: -4, shadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                        className={`${cardBase} p-6 group cursor-default relative overflow-hidden`}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon size={24} style={{ color: item.color }} />
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold font-headings block">{item.count}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.id === 3 ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                    {item.trend}
                                </span>
                            </div>
                        </div>
                        <h3 className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.title}</h3>
                        <div className="mt-4 flex items-center gap-3">
                            <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                            </div>
                            <span className="text-xs font-bold" style={{ color: item.color }}>{item.percentage}%</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* 4. Milestone Tracker */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5} className={cardBase}>
                <div className={headerBase}>
                    <h2 className={headingBase}>Project Milestones</h2>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                        <List size={14} /> View All Milestones
                    </span>
                </div>
                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className={`text-xs uppercase tracking-wider text-gray-500 font-semibold border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                            <tr>
                                <th className="px-4 py-3">Project Name</th>
                                <th className="px-4 py-3">Milestone</th>
                                <th className="px-4 py-3">Deadline</th>
                                <th className="px-4 py-3 text-center">Completion Status</th>
                                <th className="px-6 py-3 min-w-[200px]">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {milestones.map((m, i) => (
                                <tr key={i} className={`border-b last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                                    <td className="px-4 py-4 font-bold">{m.project}</td>
                                    <td className="px-4 py-4 text-gray-500">{m.milestone}</td>
                                    <td className="px-4 py-4 font-mono text-xs">{m.deadline}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase border ${
                                            m.status === 'Completed'   ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                            m.status === 'In Progress' ? 'bg-blue-500/10    text-blue-500    border-blue-500/20'    :
                                            m.status === 'Delayed'     ? 'bg-red-500/10     text-red-500     border-red-500/20'     :
                                                                         'bg-amber-500/10   text-amber-500   border-amber-500/20'
                                        }`}>
                                            {m.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${m.progress}%` }}
                                                    transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
                                                    className="h-full rounded-full"
                                                    style={{ backgroundColor: m.color }}
                                                />
                                            </div>
                                            <span className="text-[11px] font-bold w-8 text-right text-gray-500">{m.progress}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* 5. Team Workload & Completion Rates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Workload Bar Chart */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6} className={cardBase}>
                    <div className={headerBase}>
                        <h2 className={headingBase}>Team Workload Distribution</h2>
                        <TrendingUp size={18} className="text-blue-500" />
                    </div>
                    <div className="p-6 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={workloadData} layout="vertical" margin={{ left: 10, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? 'rgba(255,255,255,0.05)' : '#E2E8F0'} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="team" type="category" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 11 }} width={80} />
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Bar dataKey="tasks" name="Active Tasks" radius={[0, 4, 4, 0]} isAnimationActive animationDuration={1000}>
                                    {workloadData.map((_, i) => (
                                        <Cell key={i} fill={isDarkMode ? '#3ec3ff' : '#2563EB'} fillOpacity={0.8 - i * 0.1} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Completion Donut Chart */}
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7} className={cardBase}>
                    <div className={headerBase}>
                        <h2 className={headingBase}>Project Completion Rate</h2>
                        <PieChart icon size={18} className="text-violet-500" />
                    </div>
                    <div className="p-6 h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={completionRateData}
                                    cx="50%" cy="50%"
                                    innerRadius={70} outerRadius={100}
                                    paddingAngle={5} dataKey="value"
                                    isAnimationActive animationDuration={1000}
                                >
                                    {completionRateData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                                </Pie>
                                <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px', fontWeight: 600 }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* 6. Project Timeline Panel */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={8} className={cardBase}>
                <div className={headerBase}>
                    <h2 className={headingBase}>Project Timeline</h2>
                    <Calendar size={18} className="text-violet-500" />
                </div>
                <div className="p-8 overflow-x-auto">
                    <div className="flex items-start min-w-[900px] relative pb-8">
                        {/* Connecting Line */}
                        <div className={`absolute top-5 left-0 right-0 h-1 rounded-full ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />

                        {horizontalTimeline.map((item, i) => (
                            <div key={i} className="flex-1 px-4 relative flex flex-col items-center">
                                {/* Dot */}
                                <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center z-10 shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-[#0c162d]' : 'bg-white border-white'}`} style={{ borderColor: item.color }}>
                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                                </div>

                                <div className="mt-4 text-center">
                                    <p className={`text-xs font-bold leading-tight ${isDarkMode ? 'text-white' : 'text-dark'}`}>{item.stage}</p>
                                    <p className="text-[10px] text-gray-500 mt-1 font-mono">{item.date}</p>
                                    <div className="mt-2 text-[10px] font-bold uppercase" style={{ color: item.color }}>{item.status}</div>
                                    <div className="mt-1 text-[10px] font-bold text-gray-400">{item.progress}%</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* 7. Risk / Delay Monitor */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={9} className={cardBase}>
                <div className={headerBase}>
                    <h2 className={headingBase}>Project Risk Monitor</h2>
                    <AlertTriangle size={18} className="text-red-500" />
                </div>
                <div className="overflow-x-auto p-4">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead className={`text-xs uppercase tracking-wider text-gray-500 font-semibold border-b ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                            <tr>
                                <th className="px-4 py-3">Project Name</th>
                                <th className="px-4 py-3">Risk Type</th>
                                <th className="px-4 py-3 text-center">Impact Level</th>
                                <th className="px-4 py-3">Assigned Team</th>
                                <th className="px-4 py-3">Resolution Status</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {riskIssues.map((risk, i) => (
                                <tr key={i} className={`border-b last:border-0 hover:bg-red-50/10 dark:hover:bg-red-900/10 transition-colors ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                                    <td className="px-4 py-4 font-bold">{risk.project}</td>
                                    <td className="px-4 py-4 text-gray-500">{risk.type}</td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                            risk.impact === 'High'   ? 'bg-red-500/10 text-red-500 border-red-500/20'     :
                                            risk.impact === 'Medium' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                                         'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                        }`}>
                                            {risk.impact}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-gray-500 font-medium">{risk.team}</td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-400 uppercase italic">{risk.status}</td>
                                    <td className="px-4 py-4 text-center">
                                        <button className={`p-1.5 rounded-lg transition-all ${isDarkMode ? 'bg-white/5 text-gray-300 hover:bg-white/10' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                            <ArrowRight size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* 8. Recent Project Activity */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={10} className={cardBase}>
                <div className={headerBase}>
                    <h2 className={headingBase}>Recent Project Updates</h2>
                    <Activity size={18} className="text-blue-500" />
                </div>
                <div className="p-6 space-y-4">
                    {recentUpdates.map((act, i) => (
                        <div key={i} className="flex gap-4 items-start">
                            <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-bold text-white shadow-md`} style={{ backgroundColor: act.color }}>
                                <act.icon size={16} />
                            </div>
                            <div className="min-w-0 pt-0.5">
                                <p className={`text-sm font-semibold leading-snug ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    {act.update}
                                </p>
                                <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-1">
                                    <Clock size={10} /> {act.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* 9. Quick Actions */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={11} className={cardBase}>
                <div className={headerBase}>
                    <h2 className={headingBase}>Control Center Quick Actions</h2>
                    <Zap size={18} className="text-amber-500" />
                </div>
                <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickActionsItems.map((btn, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -4, shadow: '0 8px 20px rgba(0,0,0,0.15)' }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex flex-col items-center gap-4 p-6 rounded-xl border text-center transition-all ${isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-gray-50 border-gray-100 hover:bg-white hover:shadow-md'}`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform ${btn.color}`}>
                                <btn.icon size={24} className="text-white" />
                            </div>
                            <span className="font-bold text-sm tracking-tight">{btn.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Pagination / Export area mockup */}
            <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-2">
                    <button className={`p-2 rounded-lg border text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                        <Download size={14} className="mr-1 inline" /> Export Data
                    </button>
                    <button className={`p-2 rounded-lg border text-sm transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 hover:text-white' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 shadow-sm'}`}>
                        <RefreshCw size={14} className="mr-1 inline" /> Reload Center
                    </button>
                </div>
                <div className="flex items-center gap-1 font-mono text-[11px] text-gray-500">
                    <CheckCircle2 size={12} className="text-emerald-500" /> System Online · All project data synchronized
                </div>
            </div>

            {/* Footer */}
            <div className={`py-6 text-center border-t mt-auto ${isDarkMode ? 'border-white/5' : 'border-gray-100'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>Copyright © NEXI5 Project Command v2.0</p>
            </div>
        </div>
    );
}
