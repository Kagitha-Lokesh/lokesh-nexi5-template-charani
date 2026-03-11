import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { salaryData, revenueBarData, balanceData } from "@/datasets";

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
    if (active && payload && payload.length) {
        return (
            <div className={`p-3 border rounded-lg shadow-lg ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                <p className={`font-medium text-sm mb-2 ${isDarkMode ? 'text-white' : 'text-dark'}`}>{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm font-semibold capitalize" style={{ color: entry.color }}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const CircularProgress = ({ percentage, isDarkMode }) => {
    const radius = 85;
    const stroke = 15;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg height={radius * 2} width={radius * 2}>
                <circle
                    stroke={isDarkMode ? "#1e293b" : "#E2E8F0"}
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={isDarkMode ? "#3ec3ff" : "#38BDF8"}
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-1000 ease-in-out"
                    transform={`rotate(-90 ${radius} ${radius})`}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
                <span className={`text-3xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{percentage}%</span>
            </div>
        </div>
    );
};

export default function AnalyticsRowOne() {
    const { isDarkMode } = useTheme();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

            {/* Card 1: Salary Statistics */}
            <div className={`rounded-[10px] border flex flex-col h-[480px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[18px] lg:text-[20px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Salary Statistics</h3>
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer flex items-center p-1">
                        <div className="w-4 h-4 bg-primary rounded-full absolute right-1"></div>
                    </div>
                </div>

                <div className="p-5 flex-1 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salaryData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "#E2E8F0"} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDarkMode ? '#94A3B8' : '#64748B', fontSize: 12 }} />
                            <Tooltip cursor={{ fill: isDarkMode ? 'rgba(255,255,255,0.05)' : '#F1F5F9' }} content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', fontWeight: 600, color: isDarkMode ? '#cbd5e1' : '#64748B' }} />
                            <Bar dataKey="Design" fill="#38BDF8" radius={[4, 4, 0, 0]} barSize={8} />
                            <Bar dataKey="Development" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={8} />
                            <Bar dataKey="Marketing" fill="#06B6D4" radius={[4, 4, 0, 0]} barSize={8} />
                            <Bar dataKey="Other" fill={isDarkMode ? "#475569" : "#94A3B8"} radius={[4, 4, 0, 0]} barSize={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className={`p-4 border-t w-full flex justify-center ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-borderColor bg-gray-50/30'}`}>
                    <button className="text-[13px] font-bold text-primary dark:text-[#3ec3ff] hover:text-secondary dark:hover:text-[#3ec3ff]/80 hover:underline transition-all">
                        GENERATE REPORT
                    </button>
                </div>
            </div>

            {/* Card 2: Revenue */}
            <div className={`rounded-[10px] border flex flex-col h-[480px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[18px] lg:text-[20px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>Revenue</h3>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 relative">
                    <CircularProgress percentage={82} isDarkMode={isDarkMode} />

                    <div className="text-center">
                        <h2 className={`text-3xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>124,301</h2>
                        <div className="flex items-center justify-center gap-1 text-green-500 font-semibold text-sm mt-1">
                            <ArrowUpRight size={16} />
                            <span>+3.7%</span>
                        </div>
                    </div>

                    <div className="w-full h-[50px] opacity-70">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueBarData}>
                                <Bar dataKey="value" fill={isDarkMode ? "#3ec3ff" : "#38BDF8"} radius={[2, 2, 0, 0]} barSize={12} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`p-4 border-t w-full flex justify-center ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-borderColor bg-gray-50/30'}`}>
                    <button className="text-[13px] font-bold text-primary dark:text-[#3ec3ff] hover:text-secondary dark:hover:text-[#3ec3ff]/80 hover:underline transition-all">
                        SEND REPORT
                    </button>
                </div>
            </div>

            {/* Card 3: My Balance */}
            <div className={`rounded-[10px] border flex flex-col h-[480px] transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>
                <div className={`p-5 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h3 className={`font-headings font-bold text-[18px] lg:text-[20px] ${isDarkMode ? 'text-white' : 'text-dark'}`}>My Balance</h3>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="mb-2">
                        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Balance</p>
                        <h2 className={`text-3xl lg:text-4xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>$20,508</h2>
                    </div>

                    <div className="w-full h-24 -ml-2 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={balanceData}>
                                <Line type="monotone" dataKey="value" stroke={isDarkMode ? "#3ec3ff" : "#06B6D4"} strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Bank of America</span>
                            <span className={`text-[17px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>$15,025</span>
                        </div>
                        <div className={`flex justify-between items-center pb-3 border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>RBC Bank</span>
                            <span className={`text-[17px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>$1,843</span>
                        </div>
                        <div className="flex justify-between items-center pb-1">
                            <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Frost Bank</span>
                            <span className={`text-[17px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>$27</span>
                        </div>
                    </div>
                </div>

                <div className={`p-4 border-t w-full flex justify-center ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-borderColor bg-gray-50/30'}`}>
                    <button className="text-[13px] font-bold text-primary dark:text-[#3ec3ff] hover:text-secondary dark:hover:text-[#3ec3ff]/80 hover:underline transition-all">
                        VIEW MORE
                    </button>
                </div>
            </div>

        </div>
    );
}
