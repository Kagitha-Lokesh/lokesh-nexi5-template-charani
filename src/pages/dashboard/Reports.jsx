import React, { useState } from 'react';
import { Search, Mail, Printer, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { StatusBadge, SearchHeader, PaginationFooter } from '@/components/common';
import { mockExpenses, mockInvoices, expenseStats } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

export default function Reports() {
    const { isDarkMode } = useTheme();
    const [activeTab, setActiveTab] = useState('Expenses');
    const [searchQuery, setSearchQuery] = useState('');

    const renderExpensesTab = () => (
        <div className="flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {expenseStats.map((stat, index) => (
                    <div key={index} className={`p-6 rounded-[10px] border flex flex-col transition-all hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h3 className={`text-3xl font-bold font-headings leading-none ${isDarkMode ? 'text-white' : 'text-dark'}`}>{stat.amount}</h3>
                                <p className={`text-sm font-medium mt-2 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.label}</p>
                            </div>
                            <span className={`text-sm font-bold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-dark'}`}>
                                {stat.percentage}
                            </span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-lightBlueBg'}`}>
                            <div className={`h-full ${stat.color} rounded-full transition-all duration-1000`} style={{ width: stat.percentage }}></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Expenses Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <SearchHeader title="EXPENSES" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="overflow-x-auto p-2 sm:p-6 flex-1">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
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
                            {mockExpenses.filter(e => e.item.toLowerCase().includes(searchQuery.toLowerCase())).map((exp) => (
                                <tr key={exp.id} className={`group transition-colors border-b last:border-b-0 cursor-default h-[56px] ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
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
        </div>
    );

    const renderInvoiceTab = () => (
        <div className="flex flex-col gap-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { value: '562', label: 'Total Approved' },
                    { value: '254', label: 'Pending Invoice' },
                    { value: '982', label: 'Closed' }
                ].map((stat, index) => (
                    <div key={index} className={`p-6 rounded-[10px] border flex flex-col items-center justify-center text-center transition-all hover:-translate-y-1 duration-300 ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                        <h3 className={`text-4xl font-bold font-headings mb-1 ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{stat.value}</h3>
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Invoices Table */}
            <div className={`rounded-[10px] border overflow-hidden flex flex-col flex-1 pb-4 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
                <SearchHeader title="INVOICES" searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <div className="overflow-x-auto p-2 sm:p-6 flex-1">
                    <table className="w-full text-left border-collapse min-w-[900px]">
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
        </div>
    );

    const renderDetailTab = () => (
        <div className={`p-6 md:p-8 rounded-[10px] border flex flex-col gap-8 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl text-white' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>

            {/* Header Area */}
            <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6 ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                <div>
                    <h2 className={`text-2xl font-bold font-headings uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>INVOICE</h2>
                    <p className={`font-medium mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>#AB0017</p>
                </div>
                <button className={`flex items-center gap-2 px-5 py-2.5 rounded-md transition-all font-medium text-sm shadow-lg hover:-translate-y-0.5 active:scale-95 ${isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 shadow-[0_4px_15px_rgba(62,195,255,0.3)]' : 'bg-primary text-white hover:bg-sky-400 shadow-[0px_4px_10px_rgba(56,189,248,0.3)]'}`}>
                    <Printer size={18} />
                    Print Invoice
                </button>
            </div>

            {/* Company & Client Info Area */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-6 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Company</p>
                    <p className={`font-semibold text-[15px] mb-1 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>NEXI5 HRM Portal</p>
                    <p className={`text-[14px] leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                        Street Address<br />
                        State, City<br />
                        Region, Postal Code<br />
                        ltd@example.com
                    </p>
                </div>
                <div>
                    <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Client</p>
                    <p className={`font-semibold text-[15px] mb-1 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>Client Name</p>
                    <p className={`text-[14px] leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                        Street Address<br />
                        State, City<br />
                        Region, Postal Code<br />
                        ctr@example.com
                    </p>
                </div>
            </div>

            {/* Invoice Products Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                        <tr className={isDarkMode ? 'bg-white/5' : 'bg-lightBlueBg'}>
                            <th className={`px-4 py-3 font-semibold text-sm w-12 text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>#</th>
                            <th className={`px-4 py-3 font-semibold text-sm ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>Product</th>
                            <th className={`px-4 py-3 font-semibold text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>QNT</th>
                            <th className={`px-4 py-3 font-semibold text-sm text-right ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>Unit</th>
                            <th className={`px-4 py-3 font-semibold text-sm text-right ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            { id: 1, name: 'Logo Creation', desc: 'Logo and business cards design', qnt: 1, unit: '$1,800', amount: '$1,800' },
                            { id: 2, name: 'Online Store Design & Development', desc: 'Design/Development for modern browsers', qnt: 1, unit: '$20,000', amount: '$20,000' },
                            { id: 3, name: 'App Design', desc: 'Promotional mobile application', qnt: 1, unit: '$3,200', amount: '$3,200' }
                        ].map((item) => (
                            <tr key={item.id} className={`border-b transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-borderColor hover:bg-[#F1F5F9]'}`}>
                                <td className={`px-4 py-4 text-center font-medium ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{item.id}</td>
                                <td className="px-4 py-4">
                                    <p className={`font-semibold mb-1 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{item.name}</p>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{item.desc}</p>
                                </td>
                                <td className={`px-4 py-4 text-center ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{item.qnt}</td>
                                <td className={`px-4 py-4 text-right ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{item.unit}</td>
                                <td className={`px-4 py-4 text-right font-semibold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-dark'}`}>{item.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Summary Block */}
            <div className="flex justify-end pt-4">
                <div className="w-full sm:w-80 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between items-center px-4">
                        <span className={isDarkMode ? 'text-gray-500 font-medium' : 'text-textSecondary font-medium'}>Subtotal</span>
                        <span className={isDarkMode ? 'text-gray-200 font-semibold' : 'text-dark font-semibold'}>$25,000</span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                        <span className={isDarkMode ? 'text-gray-500 font-medium' : 'text-textSecondary font-medium'}>VAT Rate</span>
                        <span className={isDarkMode ? 'text-gray-200 font-semibold' : 'text-dark font-semibold'}>20%</span>
                    </div>
                    <div className={`flex justify-between items-center px-4 pb-3 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                        <span className={isDarkMode ? 'text-gray-500 font-medium' : 'text-textSecondary font-medium'}>VAT Due</span>
                        <span className={isDarkMode ? 'text-gray-200 font-semibold' : 'text-dark font-semibold'}>$5,000</span>
                    </div>
                    <div className={`flex justify-between items-center p-4 rounded-lg shadow-lg transition-all ${isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[0_4px_15px_rgba(62,195,255,0.3)]' : 'bg-primary text-white shadow-[0px_4px_10px_rgba(56,189,248,0.3)]'}`}>
                        <span className="font-bold text-base uppercase tracking-wider">Total Due</span>
                        <span className="font-bold text-xl font-headings">$30,000</span>
                    </div>
                </div>
            </div>

            {/* Footer Note */}
            <div className={`pt-8 text-center text-sm italic ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>
                Thank you very much for doing business with us.<br />
                We look forward to working with you again.
            </div>

        </div>
    );

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)] ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Page Tabs */}
            <div className="flex items-center gap-6 mb-6">
                {['Expenses', 'Invoice', 'Detail'].map(tab => (
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

            {/* Tab Rendering Logic */}
            {activeTab === 'Expenses' && renderExpensesTab()}
            {activeTab === 'Invoice' && renderInvoiceTab()}
            {activeTab === 'Detail' && renderDetailTab()}

            {/* Dashboard Root Footer */}
            <div className={`py-6 text-center mt-auto border-t ${isDarkMode ? 'border-white/5' : 'border-borderColor/50'}`}>
                <p className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Copyright © NEXI5 HRM Portal</p>
            </div>
        </div>
    );
}
