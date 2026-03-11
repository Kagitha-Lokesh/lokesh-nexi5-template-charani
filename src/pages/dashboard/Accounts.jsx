import { useState } from 'react';
import { Search, Plus, Filter, Mail, Printer, Trash2, TrendingUp, TrendingDown, Landmark, CreditCard, DollarSign } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SearchHeader, PaginationFooter } from '@/components/common';
import { mockInvoices, mockPayments, mockExpenses, accountStats } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

export default function Accounts() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('Invoices');
    const [searchQuery, setSearchQuery] = useState('');

    const renderInvoicesTable = () => (
        <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
            <SearchHeader title="INVOICES" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="overflow-x-auto p-2 sm:p-6 pb-4 flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Invoice No.</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Clients</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Date</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Type</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Amount</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider text-center w-36 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockInvoices.filter(i => i.client.toLowerCase().includes(searchQuery.toLowerCase())).map((inv) => (
                            <tr key={inv.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{inv.id}</td>
                                <td className={`px-4 py-3 text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{inv.client}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{inv.date}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{inv.type}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white transition-all ${inv.status === 'Approved' ? (isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[0_0_10px_rgba(62,195,255,0.4)]' : 'bg-primary') : 'bg-orange-500'}`}>
                                        {inv.status}
                                    </span>
                                </td>
                                <td className={`px-4 py-3 text-[14px] font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{inv.amount}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Email"><Mail size={16} /></button>
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff] hover:bg-white/5' : 'text-textSecondary hover:text-primary hover:bg-lightSky'}`} title="Print"><Printer size={16} /></button>
                                        <button className={`p-1.5 transition-all rounded-md ${isDarkMode ? 'text-gray-400 hover:text-red-500 hover:bg-white/5' : 'text-textSecondary hover:text-red-500 hover:bg-red-50'}`} title="Delete"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationFooter />
        </div>
    );

    const renderPaymentsTable = () => (
        <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
            <SearchHeader title="PAYMENTS" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="overflow-x-auto p-2 sm:p-6 pb-4 flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>ID</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Clients Name</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Project Name</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Date</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Type</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPayments.filter(p => p.client.toLowerCase().includes(searchQuery.toLowerCase())).map((pay) => (
                            <tr key={pay.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{pay.id}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-headings shrink-0 text-xs border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-[#3ec3ff]/20' : 'bg-lightSky text-primary border-primary/20'}`}>
                                            {pay.client.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <p className={`text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{pay.client}</p>
                                            <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{pay.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{pay.project}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{pay.date}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{pay.type}</td>
                                <td className={`px-4 py-3 text-[14px] font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{pay.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationFooter />
        </div>
    );

    const renderExpensesTable = () => (
        <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
            <SearchHeader title="EXPENSES" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div className="overflow-x-auto p-2 sm:p-6 pb-4 flex-1">
                <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Item</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Order By</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>From</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Date</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Paid By</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockExpenses.filter(e => e.item.toLowerCase().includes(searchQuery.toLowerCase())).map((exp, i) => (
                            <tr key={i} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                <td className={`px-4 py-3 text-[14px] font-semibold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{exp.item}</td>
                                <td className={`px-4 py-3 text-[14px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{exp.orderBy}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{exp.from}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{exp.date}</td>
                                <td className={`px-4 py-3 text-[14px] ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{exp.paidBy}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white transition-all ${exp.status === 'Approved' ? (isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[0_0_10px_rgba(62,195,255,0.4)]' : 'bg-primary') : 'bg-orange-500'}`}>
                                        {exp.status}
                                    </span>
                                </td>
                                <td className={`px-4 py-3 text-[14px] font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{exp.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PaginationFooter />
        </div>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Page Tabs */}
            <div className="flex items-center gap-6 mb-6">
                {['Invoices', 'Payments', 'Expenses'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => { setActiveTab(tab); setSearchQuery(''); }}
                        className={`text-sm font-semibold tracking-wide transition-all ${activeTab === tab
                            ? (isDarkMode ? 'text-[#3ec3ff] border-b-2 border-[#3ec3ff]' : 'text-primary border-b-2 border-primary')
                            : (isDarkMode ? 'text-gray-600 hover:text-[#3ec3ff]/70' : 'text-textSecondary hover:text-dark')
                            } pb-1`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {accountStats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-[10px] border flex flex-col transition-all hover:-translate-y-1 duration-300 relative group ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                            <span className={`text-xs font-bold font-sans ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className={`text-3xl font-bold font-headings absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] text-center w-full ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                            {stat.value}
                        </h3>
                        <p className={`text-xs mt-auto text-center translate-y-2 opacity-80 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>{stat.subtext}</p>
                    </div>
                ))}
            </div>

            {/* Tab Rendering Logic */}
            {activeTab === 'Invoices' && renderInvoicesTable()}
            {activeTab === 'Payments' && renderPaymentsTable()}
            {activeTab === 'Expenses' && renderExpensesTable()}

            {/* Dashboard Root Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
