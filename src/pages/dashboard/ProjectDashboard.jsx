import { useState } from 'react';
import { Plus, Search, FolderKanban, TrendingUp, CheckCircle2, AlertTriangle, Eye, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StatusBadge, PaginationFooter } from '@/components/common';
import { projectStats, projectTableData } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

const iconMap = {
    FolderKanban: FolderKanban,
    TrendingUp: TrendingUp,
    CheckCircle2: CheckCircle2,
    AlertTriangle: AlertTriangle
};

export default function ProjectDashboard() {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] space-y-6 ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className={`text-xl md:text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>Project Dashboard</h1>
                    <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Overview of all active and upcoming projects</p>
                </div>
            </div>

            {/* 4 Statistic Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projectStats.map((stat, index) => {
                    const Icon = iconMap[stat.icon];
                    return (
                        <div key={index} className={`p-6 rounded-[10px] border flex items-center gap-4 transition-all hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]' : stat.bgColor}`}>
                                <Icon size={24} className={isDarkMode ? 'text-[#3ec3ff]' : stat.color} />
                            </div>
                            <div>
                                <h3 className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>{stat.value}</h3>
                                <p className={`text-[13px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                                <p className={`text-[11px] font-semibold mt-1 ${stat.title === 'Overdue Projects' ? 'text-red-500' : (isDarkMode ? 'text-gray-500' : 'text-textSecondary')}`}>{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Projects Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col pb-4 w-full transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>

                {/* Table Header */}
                <div className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>PROJECTS LIST</h2>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search project..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-4 pr-10 py-2 border rounded-full text-sm transition-all font-medium focus:outline-none focus:ring-2 ${isDarkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff]/50 focus:ring-[#3ec3ff]/20' : 'bg-lightBlueBg border-borderColor text-dark focus:border-primary/50 focus:ring-primary/20'}`}
                            />
                            <Search className={`absolute right-3 top-2.5 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`} size={16} />
                        </div>
                        <Link to="/dashboard/project/add" className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg hover:-translate-y-0.5 active:scale-95 text-sm font-semibold whitespace-nowrap ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 shadow-[0_4px_15px_rgba(62,195,255,0.3)]' : 'bg-primary text-white hover:bg-sky-500 shadow-[0px_4px_10px_rgba(56,189,248,0.3)]'}`}>
                            <Plus size={18} />
                            Add Project
                        </Link>
                    </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto p-2 sm:p-6 w-full">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Project Name</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Project Manager</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Team Members</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Start Date</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Deadline</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectTableData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map((proj) => (
                                <tr key={proj.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[60px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                    <td className={`px-4 py-3 text-[14px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{proj.name}</td>
                                    <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{proj.manager}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{proj.team}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{proj.start}</td>
                                    <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{proj.end}</td>
                                    <td className="px-4 py-3">
                                        <StatusBadge status={proj.status} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View"><Eye size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Edit"><Edit size={16} /></button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-white/5' : 'text-textSecondary hover:text-red-600 hover:bg-red-50'}`} title="Delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <PaginationFooter />
            </div>

            {/* Footer */}
            <div className={`py-2 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
