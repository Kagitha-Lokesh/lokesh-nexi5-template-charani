import React from 'react';
import { MoreVertical, Eye, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { StatusBadge } from '@/components/common';
import { mockTableData } from "@/datasets";

const AvatarStack = ({ isDarkMode }) => (
    <div className="flex -space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border-2 ${isDarkMode ? 'bg-primary/20 border-gray-800 text-[#3ec3ff]' : 'bg-lightSky border-white text-primary'}`}>SB</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border-2 ${isDarkMode ? 'bg-green-500/10 border-gray-800 text-green-400' : 'bg-green-100 border-white text-green-600'}`}>MD</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border-2 ${isDarkMode ? 'bg-orange-500/10 border-gray-800 text-orange-400' : 'bg-orange-100 border-white text-orange-600'}`}>AC</div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm border-2 ${isDarkMode ? 'bg-white/5 border-gray-800 text-gray-400' : 'bg-gray-100 border-white text-gray-600'}`}>+2</div>
    </div>
);

const PaymentBadge = ({ text, isDarkMode }) => {
    if (text === 'Done') {
        return <span className={`px-3 py-1 rounded-md text-xs font-bold ${isDarkMode ? 'bg-green-500/10 text-green-400' : 'bg-[#10B981]/10 text-[#10B981]'}`}>{text}</span>;
    }
    if (text === 'Pending') {
        return <span className={`px-3 py-1 rounded-md text-xs font-bold ${isDarkMode ? 'bg-amber-500/10 text-amber-400' : 'bg-[#F59E0B]/10 text-[#F59E0B]'}`}>{text}</span>;
    }
    return <span className={`px-3 py-1 rounded-md text-xs font-bold ${isDarkMode ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>{text}</span>;
};

export default function ProjectSummaryTable() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`rounded-[10px] border flex flex-col mb-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)]'}`}>

            {/* Table Header Area */}
            <div className={`p-5 md:p-6 border-b flex justify-between items-center ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                <h2 className={`text-[18px] lg:text-[20px] font-headings font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-dark'}`}>Project Summary</h2>
                <button className={`text-sm font-medium transition-colors ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-textSecondary hover:text-primary'}`}>
                    View All
                </button>
            </div>

            {/* Table wrapper */}
            <div className="overflow-x-auto w-full p-2 sm:p-6">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                        <tr className={`border-b ${isDarkMode ? 'border-white/5' : 'border-borderColor'}`}>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Client Name</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Team</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Project</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Project Cost</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Payment</th>
                            <th className={`px-4 py-4 font-headings font-semibold text-xs uppercase tracking-wider ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>Status</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDarkMode ? 'divide-white/5' : 'divide-transparent'}`}>
                        {mockTableData.map((row, index) => (
                            <tr key={index} className={`group transition-colors border-b last:border-b-0 h-[70px] ${isDarkMode ? 'hover:bg-white/[0.02] border-white/5' : 'hover:bg-lightBlueBg border-borderColor'}`}>
                                <td className="px-4 py-3">
                                    <div>
                                        <p className={`text-[14px] font-bold ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{row.id}</p>
                                        <p className={`text-[13px] font-medium ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{row.client}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <AvatarStack isDarkMode={isDarkMode} />
                                </td>
                                <td className={`px-4 py-3 text-[14px] font-bold ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>{row.project}</td>
                                <td className={`px-4 py-3 text-[14px] font-semibold ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{row.cost}</td>
                                <td className="px-4 py-3">
                                    <PaymentBadge text={row.payment} isDarkMode={isDarkMode} />
                                </td>
                                <td className="px-4 py-3">
                                    <StatusBadge status={row.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
