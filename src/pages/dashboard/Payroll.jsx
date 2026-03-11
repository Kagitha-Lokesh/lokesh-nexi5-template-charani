import { useState } from 'react';
import { Search, DollarSign, Download, Filter, Mail, Printer, Trash2, Eye, BarChart3, Activity, PieChart, LineChart, TrendingUp, TrendingDown } from 'lucide-react';
import '@/index.css';
import { PaginationFooter } from '@/components/common';
import { payrollData, payrollStats } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

const iconMap = {
    BarChart3: <BarChart3 className="w-6 h-6" />,
    Activity: <Activity className="w-6 h-6" />,
    PieChart: <PieChart className="w-6 h-6" />,
    LineChart: <LineChart className="w-6 h-6" />
};

const PayslipView = ({ isDarkMode }) => (
    <div className={`p-6 rounded-[10px] border flex flex-col gap-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>

        {/* Employee Info Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold font-headings text-2xl shrink-0 border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                    JS
                </div>
                <div>
                    <h2 className={`text-xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>John Smith</h2>
                    <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Order ID: <span className={isDarkMode ? 'text-gray-200' : 'text-dark'}>C09</span></p>
                    <p className={`text-sm max-w-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                        795 Folsom Ave, Suite 546<br />
                        San Francisco, CA 54656
                    </p>
                    <div className="flex gap-2 mt-3">
                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Email">
                            <Mail size={16} />
                        </button>
                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Print">
                            <Printer size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[0_0_15px_rgba(62,195,255,0.3)]' : 'bg-[#1F2937] text-white'}`}>
                Jun 15, 2019
            </div>
        </div>

        {/* Salary Breakdown Table */}
        <div className={`overflow-x-auto border rounded-lg transition-all ${isDarkMode ? 'border-white/10 shadow-inner bg-[#0c162d]/30' : 'border-borderColor'}`}>
            <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                    <tr className={isDarkMode ? 'bg-white/5 text-[#3ec3ff]' : 'bg-[#1F2937] text-white'}>
                        <th className="px-4 py-3 font-semibold text-sm w-16 text-center">#</th>
                        <th className="px-4 py-3 font-semibold text-sm">Description</th>
                        <th className="px-4 py-3 font-semibold text-sm">Earnings</th>
                        <th className="px-4 py-3 font-semibold text-sm">Deductions</th>
                        <th className="px-4 py-3 font-semibold text-sm">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {[
                        { id: '01', desc: 'Basic Salary', earn: '$1,500', ded: '', total: '$380' },
                        { id: '02', desc: 'House Rent Allowance (H.R.A.)', earn: '$62', ded: '', total: '$250' },
                        { id: '03', desc: 'Tax Deducted at Source (T.D.S.)', earn: '', ded: '$80', total: '$120' },
                        { id: '04', desc: 'C/Bank Loan', earn: '', ded: '$120', total: '$120' },
                        { id: '05', desc: 'Other Allowance', earn: '$121', ded: '', total: '$120' }
                    ].map((row, idx) => (
                        <tr key={idx} className={`border-b transition-colors h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-borderColor hover:bg-[#F1F5F9]'}`}>
                            <td className={`px-4 py-3 text-center font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{row.id}</td>
                            <td className={`px-4 py-3 font-medium ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{row.desc}</td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{row.earn}</td>
                            <td className={`px-4 py-3 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{row.ded}</td>
                            <td className={`px-4 py-3 font-medium ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <p className={`text-sm italic mt-2 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>
            Note: Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-4 sm:gap-12 pt-4">
            <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between gap-12">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Total Earnings:</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>$1683</span>
                </div>
                <div className="flex justify-between gap-12">
                    <span className={`font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Total Deductions:</span>
                    <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-dark'}`}>$200</span>
                </div>
            </div>
            <div className={`px-6 py-3 rounded-lg border flex flex-col shadow-lg transition-all ${isDarkMode ? 'bg-[#3ec3ff]/10 border-[#3ec3ff]/20 shadow-[0_0_20px_rgba(62,195,255,0.1)]' : 'bg-lightSky border-primary/20'}`}>
                <span className={`text-xs font-semibold uppercase mb-1 ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>Final Salary</span>
                <span className={`text-2xl font-bold font-headings ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>$1483.00</span>
            </div>
        </div>

        <div className="flex justify-end mt-2">
            <button className={`flex items-center gap-2 px-6 py-2.5 rounded-md transition-all font-medium text-sm shadow-md active:scale-95 ${isDarkMode
                ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 hover:shadow-[0_0_20px_rgba(62,195,255,0.3)]'
                : 'bg-primary text-white hover:bg-sky-400 shadow-[0px_4px_10px_rgba(56,189,248,0.3)]'
                }`}>
                <Printer size={18} />
                Print
            </button>
        </div>

    </div>
);

export default function Payroll() {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('Employee Salary');

    const filteredSalaries = payrollData.filter(emp =>
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Page Tabs */}
            <div className="flex items-center gap-6 mb-6">
                {['Employee Salary', 'Payslip'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-sm font-semibold tracking-wide transition-all ${activeTab === tab
                            ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff]' : 'text-primary border-b-2 border-primary')
                            : (isDarkMode ? 'text-gray-600 hover:text-[#3ec3ff]/70' : 'text-textSecondary hover:text-dark')
                            } pb-1`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Conditional Views */}
            {activeTab === 'Employee Salary' ? (
                <>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {payrollStats.map((stat, index) => (
                            <div key={index} className={`p-5 rounded-[10px] flex justify-between items-center transition-all hover:-translate-y-1 duration-300 border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-transparent'}`}>
                                <div>
                                    <p className={`text-sm font-medium mb-1 font-sans ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                                    <h3 className={`text-2xl font-bold mb-2 font-sans ${isDarkMode ? 'text-white' : 'text-textPrimary'}`}>{stat.amount}</h3>
                                    <div className={`flex items-center text-xs font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                        {stat.isPositive ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                                        <span>{stat.isPositive ? '↑' : '↓'} {stat.change}</span>
                                        <span className={`ml-1 font-normal hidden sm:inline-block ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}> Since last month</span>
                                    </div>
                                </div>
                                <div className={`p-3 rounded-full flex-shrink-0 transition-all ${isDarkMode ? 'bg-white/5 text-[#3ec3ff]' : 'bg-lightBlueBg text-primary'}`}>
                                    {iconMap[stat.icon]}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Employee Salary List Card */}
                    <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border-borderColor'}`}>

                        {/* Card Header */}
                        <div className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>EMPLOYEE</h2>

                            <div className="relative w-full sm:w-64">
                                <input
                                    type="text"
                                    placeholder="Search something..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-4 pr-10 py-2 rounded-full text-sm transition-all focus:outline-none focus:ring-2 ${isDarkMode
                                        ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff]/50 focus:ring-[#3ec3ff]/20'
                                        : 'bg-lightBlueBg border border-borderColor text-textPrimary focus:border-primary/50 focus:ring-primary/20'
                                        }`}
                                />
                                <button className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-gray-600 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>
                                    <Search size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Table Content */}
                        <div className="overflow-x-auto flex-1 p-2 sm:p-6 pb-4">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead>
                                    <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                                        <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Employee</th>
                                        <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Role</th>
                                        <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Salary</th>
                                        <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                                        <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center w-36 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSalaries.length > 0 ? (
                                        filteredSalaries.map((emp) => (
                                            <tr
                                                key={emp.id}
                                                className={`group transition-colors border-b last:border-b-0 cursor-default h-[60px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}
                                            >
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-headings shrink-0 text-xs border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                            {emp.name.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <div>
                                                            <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{emp.name}</p>
                                                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{emp.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-4 py-4 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{emp.role}</td>
                                                <td className={`px-4 py-4 text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{emp.salary}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white transition-all ${emp.status === 'Done' ? (isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[0_0_10px_rgba(62,195,255,0.4)]' : 'bg-primary') : 'bg-orange-500'}`}>
                                                        {emp.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Email">
                                                            <Mail size={16} />
                                                        </button>
                                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Print">
                                                            <Printer size={16} />
                                                        </button>
                                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-white/5' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`} title="Delete">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className={`py-8 text-center text-sm ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>
                                                No salaries found matching "{searchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <PaginationFooter />
                    </div>
                </>
            ) : (
                <PayslipView isDarkMode={isDarkMode} />
            )}

            {/* Dashboard Root Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
