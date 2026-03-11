import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MoreVertical, Edit2, Trash2, Users, User, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { mockDepartments } from '@/datasets';

export default function Departments() {
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
    const { isDarkMode } = useTheme();

    // Filter logic
    const filteredDepartments = mockDepartments.filter(dept =>
        dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dept.head.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent' : 'bg-lightBlueBg'}`}>

            {/* Page View Tabs and Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`text-sm font-semibold tracking-wide transition-colors ${viewMode === 'list'
                            ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff] pb-1' : 'text-primary border-b-2 border-primary pb-1')
                            : (isDarkMode ? 'text-gray-500 hover:text-gray-300 pb-1' : 'text-textSecondary hover:text-dark pb-1')
                            }`}
                    >
                        List View
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`text-sm font-semibold tracking-wide transition-colors ${viewMode === 'grid'
                            ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff] pb-1' : 'text-primary border-b-2 border-primary pb-1')
                            : (isDarkMode ? 'text-gray-500 hover:text-gray-300 pb-1' : 'text-textSecondary hover:text-dark pb-1')
                            }`}
                    >
                        Grid View
                    </button>
                </div>

                <Link
                    to="/dashboard/departments/add"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-medium text-sm shadow-sm hover:shadow active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90' : 'bg-secondary text-white hover:bg-blue-700'}`}
                >
                    <Plus size={18} />
                    Add
                </Link>
            </div>

            {/* Main Content Card */}
            <div className={`rounded-[10px] border flex flex-col overflow-hidden w-full transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'}`}>

                {/* Card Header */}
                <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 border-b gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <h2 className={`font-headings font-bold text-[18px] tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>Departments List</h2>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search something..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-4 pr-10 py-2 border rounded-full text-sm focus:outline-none transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-2 focus:ring-[#3ec3ff]/20 placeholder-gray-500' : 'bg-lightBlueBg border-borderColor text-textPrimary focus:border-primary/50 focus:ring-2 focus:ring-primary/20 placeholder-gray-400'}`}
                        />
                        <button className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="overflow-x-auto p-2 sm:p-6 pb-4 w-full">
                    {viewMode === 'list' ? (
                        <table className="w-full text-left border-collapse min-w-[800px]">
                            <thead>
                                <tr>
                                    <th className={`py-4 px-4 font-headings font-semibold text-xs uppercase tracking-wider border-b ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-textSecondary border-borderColor'}`}>#</th>
                                    <th className={`py-4 px-4 font-headings font-semibold text-xs uppercase tracking-wider border-b ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-textSecondary border-borderColor'}`}>Department Name</th>
                                    <th className={`py-4 px-4 font-headings font-semibold text-xs uppercase tracking-wider border-b ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-textSecondary border-borderColor'}`}>Department Head</th>
                                    <th className={`py-4 px-4 font-headings font-semibold text-xs uppercase tracking-wider border-b text-center ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-textSecondary border-borderColor'}`}>Total Employee</th>
                                    <th className={`py-4 px-4 font-headings font-semibold text-xs uppercase tracking-wider border-b text-right ${isDarkMode ? 'text-gray-500 border-white/5' : 'text-textSecondary border-borderColor'}`}>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-[14px]">
                                {filteredDepartments.length > 0 ? (
                                    filteredDepartments.map((dept) => (
                                        <tr
                                            key={dept.id}
                                            className={`transition-colors group cursor-default ${isDarkMode ? 'border-b border-white/5 hover:bg-white/[0.02]' : 'hover:bg-lightBlueBg border-b border-borderColor'}`}
                                        >
                                            <td className={`py-4 px-4 text-sm font-medium ${isDarkMode ? 'text-[#3ec3ff]' : 'text-dark'}`}>{dept.id}</td>
                                            <td className={`py-4 px-4 text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{dept.name}</td>
                                            <td className={`py-4 px-4 text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{dept.head}</td>
                                            <td className={`py-4 px-4 text-sm font-semibold text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{dept.employees}</td>
                                            <td className="py-4 px-4">
                                                <div className="flex gap-3 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`}>
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`}>
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className={`py-8 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                            No departments found matching "{searchQuery}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredDepartments.map((dept) => (
                                <div key={dept.id} className={`rounded-lg p-6 transition-all relative group border ${isDarkMode ? 'bg-[#0c162d] border-white/10 hover:border-[#3ec3ff]/50' : 'bg-white border-borderColor hover:shadow-md hover:border-primary/30'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg font-headings ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border border-white/10' : 'bg-lightSky text-primary'}`}>
                                            {dept.name.charAt(0)}
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`}>
                                                <Edit2 size={16} />
                                            </button>
                                            <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`}>
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <h3 className={`text-lg font-bold font-headings mb-1 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{dept.name}</h3>
                                    <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Head: <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{dept.head}</span></p>

                                    <div className={`pt-4 border-t flex justify-between items-center ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                                        <span className={`text-xs uppercase font-semibold ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Employees</span>
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff]' : 'text-secondary bg-blue-50'}`}>{dept.employees}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Dashboard Root Footer */}
            <div className="py-6 text-center mt-auto">
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
