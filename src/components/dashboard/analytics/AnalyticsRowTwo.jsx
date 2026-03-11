import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Users, UserPlus, UserMinus, MoreVertical, TrendingUp, TrendingDown, Heart, Target, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { structureData, satisfactionData, growthData } from "@/datasets";

const PerformanceItem = ({ title, percentage, colorClass, isDarkMode }) => (
    <div className="mb-4 last:mb-0">
        <div className="flex justify-between items-center mb-1">
            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{title}</span>
            <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{percentage}%</span>
        </div>
        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-lightBlueBg'}`}>
            <div className={`h-full ${colorClass} rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
    </div>
);

export default function AnalyticsRowTwo() {
    const { isDarkMode } = useTheme();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

            {/* Card 1: Employee Structure */}
            <div className={`rounded-[10px] border flex flex-col h-[380px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[16px] lg:text-[18px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Structure</h3>
                </div>
                <div className="p-5 flex-1 w-full relative flex flex-col">
                    <div className="flex-1 min-h-0 w-full relative -left-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={structureData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 13, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                                <Tooltip cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }} contentStyle={{ backgroundColor: isDarkMode ? '#0c162d' : '#fff', borderRadius: '8px', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontWeight: 600, color: isDarkMode ? '#fff' : '#000' }} />
                                <Bar dataKey="value" fill={isDarkMode ? "#3ec3ff" : "#38BDF8"} radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Card 2: Employee Satisfaction */}
            <div className={`rounded-[10px] border flex flex-col h-[380px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[16px] lg:text-[18px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Employee Satisfaction</h3>
                </div>
                <div className="p-5 flex-1 w-full relative flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-[#3ec3ff]/20 border border-[#3ec3ff]' : 'bg-primary/20 border border-primary'}`}></div>
                            <span className={`text-xs font-semibold cursor-default ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>This Month <span className={`${isDarkMode ? 'text-white' : 'text-dark'} ml-1`}>195</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                            <span className={`text-xs font-semibold cursor-default ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Last Month <span className={`${isDarkMode ? 'text-white' : 'text-dark'} ml-1`}>163</span></span>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 w-full -ml-4 -mb-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={satisfactionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isDarkMode ? "#3ec3ff" : "#38BDF8"} stopOpacity={0.4} />
                                        <stop offset="95%" stopColor={isDarkMode ? "#3ec3ff" : "#38BDF8"} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 10 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 10 }} />
                                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#0c162d' : '#fff', borderRadius: '8px', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontWeight: 600, color: isDarkMode ? '#fff' : '#000' }} />
                                <Area type="monotone" dataKey="lastMonth" stroke={isDarkMode ? "#475569" : "#CBD5E1"} fill="transparent" strokeWidth={2} />
                                <Area type="monotone" dataKey="thisMonth" stroke={isDarkMode ? "#3ec3ff" : "#38BDF8"} fill="url(#colorThisMonth)" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Card 3: Performance */}
            <div className={`rounded-[10px] border flex flex-col h-[380px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[16px] lg:text-[18px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Performance</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-center">
                    <PerformanceItem title="Design Team" percentage={35} colorClass="bg-primary" isDarkMode={isDarkMode} />
                    <PerformanceItem title="Developer Team" percentage={25} colorClass="bg-[#2563EB]" isDarkMode={isDarkMode} />
                    <PerformanceItem title="Marketing" percentage={15} colorClass="bg-[#06B6D4]" isDarkMode={isDarkMode} />
                    <PerformanceItem title="Management" percentage={20} colorClass="bg-[#8B5CF6]" isDarkMode={isDarkMode} />
                    <PerformanceItem title="Other" percentage={11} colorClass={isDarkMode ? "bg-slate-500" : "bg-[#94A3B8]"} isDarkMode={isDarkMode} />
                </div>
            </div>

            {/* Card 4: Growth */}
            <div className={`rounded-[10px] border flex flex-col h-[380px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[16px] lg:text-[18px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Growth</h3>
                    <select className={`rounded-md px-2 py-1 text-xs font-semibold focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-gray-400 focus:border-[#3ec3ff]' : 'border border-borderColor text-textSecondary focus:border-primary'}`}>
                        <option value="year">This Year</option>
                    </select>
                </div>
                <div className="p-5 flex-1 flex flex-col items-center">
                    <div className="h-[150px] w-full relative mb-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={growthData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={75}
                                    paddingAngle={2}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {growthData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={isDarkMode && entry.color === '#E2E8F0' ? 'rgba(255,255,255,0.05)' : entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#0c162d' : '#fff', borderRadius: '8px', border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontWeight: 600, color: isDarkMode ? '#fff' : '#000' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>63%</span>
                            <span className={`text-[10px] font-bold tracking-wider uppercase ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Growth</span>
                        </div>
                    </div>

                    <div className="w-full mt-auto space-y-3">
                        <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-200'}`}></div>
                                <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Last Year</span>
                            </div>
                            <span className={`text-[15px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-dark'}`}>$3,095</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-[#3ec3ff]' : 'bg-primary'}`}></div>
                                <span className={`text-sm font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>This Year</span>
                            </div>
                            <span className={`text-[15px] font-bold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>$2,763</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
