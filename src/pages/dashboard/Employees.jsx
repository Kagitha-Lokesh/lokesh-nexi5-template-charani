import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit2, Trash2, Plus } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/context/ThemeContext';
import { PaginationFooter, SearchHeader } from '@/components/common';
import { employeesData, employeeStatCharts } from '@/datasets';

const { statData1, statData2 } = employeeStatCharts;

const StatCard = ({ title, value, data, color, isDarkMode }) => (
    <div className={`p-6 rounded-[10px] border flex justify-between items-center hover:-translate-y-1 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'}`}>
        <div>
            <h3 className={`text-sm font-semibold mb-1 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{title}</h3>
            <p className={`font-headings text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{value}</p>
        </div>
        <div className="w-16 h-12">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <Bar dataKey="v" fill={color} radius={[2, 2, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default function Employees() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('All');
    const { isDarkMode } = useTheme();

    const filteredEmployees = employeesData.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent' : 'bg-lightBlueBg'}`}>
            {/* Page Tabs and Add Action */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex items-center gap-6">
                    {['All'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-sm font-semibold tracking-wide transition-colors ${activeTab === tab
                                ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff] pb-1' : 'text-primary border-b-2 border-primary pb-1')
                                : (isDarkMode ? 'text-gray-500 hover:text-gray-300 pb-1' : 'text-textSecondary hover:text-dark pb-1')
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <Link
                    to="/dashboard/employee/add"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-medium text-sm shadow-sm hover:shadow active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90' : 'bg-secondary text-white hover:bg-blue-700'}`}
                >
                    <Plus size={18} />
                    Add
                </Link>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Employee" value="614" data={statData1} color={isDarkMode ? "#3ec3ff" : "#38BDF8"} isDarkMode={isDarkMode} />
                <StatCard title="New Employee" value="124" data={statData2} color="#2563EB" isDarkMode={isDarkMode} />
                <StatCard title="Male" value="504" data={statData1} color="#06B6D4" isDarkMode={isDarkMode} />
                <StatCard title="Female" value="110" data={statData2} color="#F59E0B" isDarkMode={isDarkMode} />
            </div>

            {/* Employee List Card */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_30px_rgba(0,0,0,0.08)]'}`}>
                <SearchHeader title="EMPLOYEE LIST" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                {/* Table Content */}
                <div className="overflow-x-auto flex-1 p-2 sm:p-6 pb-4">
                    {/* Desktop Table */}
                    <table className="hidden md:table w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider w-16 text-center ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>S.NO</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Name</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee ID</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Phone</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Join Date</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Role</th>
                                <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center w-36 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[14px]">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((emp, index) => (
                                    <tr
                                        key={emp.id + emp.name}
                                        className={`group transition-colors border-b last:border-b-0 cursor-default ${isDarkMode ? 'border-white/5 hover:bg-white/[0.02]' : 'hover:bg-lightBlueBg border-borderColor'}`}
                                    >
                                        <td className="px-4 py-4 text-center">
                                            <p className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{index + 1}</p>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold font-headings shrink-0 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-white/10' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                    {emp.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{emp.name}</p>
                                                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{emp.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={`px-4 py-4 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{emp.id}</td>
                                        <td className={`px-4 py-4 text-[14px] ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{emp.phone}</td>
                                        <td className={`px-4 py-4 text-[14px] ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{emp.joinDate}</td>
                                        <td className={`px-4 py-4 text-[14px] font-semibold ${isDarkMode ? 'text-gray-300' : 'text-textPrimary'}`}>{emp.role}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View">
                                                    <Eye size={18} />
                                                </button>
                                                <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Edit">
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`} title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className={`py-8 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                        No employees found matching "{searchQuery}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Mobile Stacked Cards */}
                    <div className="md:hidden flex flex-col gap-4">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp, index) => (
                                <div key={emp.id + emp.name + "_mobile"} className={`rounded-lg p-4 shadow-sm flex flex-col gap-3 transition-all border ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-borderColor'}`}>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold font-headings shrink-0 ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-white/10' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{emp.name}</p>
                                                <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{emp.email}</p>
                                            </div>
                                        </div>
                                        <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>#{index + 1}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div><span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>ID:</span> <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{emp.id}</span></div>
                                        <div><span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Role:</span> <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{emp.role}</span></div>
                                        <div><span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Phone:</span> <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{emp.phone}</span></div>
                                        <div><span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Joined:</span> <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{emp.joinDate}</span></div>
                                    </div>
                                    <div className={`flex gap-2 justify-end pt-3 border-t mt-1 ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="View"><Eye size={16} /></button>
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/10' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Edit"><Edit2 size={16} /></button>
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-red-500/10' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`} title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={`py-8 text-center text-sm ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                                No employees found matching "{searchQuery}"
                            </div>
                        )}
                    </div>
                </div>
                <PaginationFooter />
            </div>

            {/* Dashboard Root Footer */}
            <div className="py-6 text-center mt-auto">
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
