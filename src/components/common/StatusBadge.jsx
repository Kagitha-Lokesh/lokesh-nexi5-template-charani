import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const StatusBadge = ({ status }) => {
    const { isDarkMode } = useTheme();

    let colorClass = '';
    switch (status) {
        // Attendance
        case 'Present':
            colorClass = isDarkMode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#22C55E] text-white'; break;
        case 'Absent':
            colorClass = isDarkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#EF4444] text-white'; break;
        case 'Late':
            colorClass = isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-[#F59E0B] text-white'; break;
        case 'On Leave':
            colorClass = isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff] border border-[#3ec3ff]/20' : 'bg-primary text-white'; break;

        // Projects / Reports
        case 'Delivered':
        case 'Approved':
            colorClass = isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff] border border-[#3ec3ff]/20' : 'bg-primary text-white'; break;
        case 'Pending':
            colorClass = isDarkMode ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-orange-500 text-white'; break;
        case 'Rejected':
            colorClass = isDarkMode ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-[#EF4444] text-white'; break;
        case 'Submit':
            colorClass = isDarkMode ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#10B981] text-white'; break;

        default:
            colorClass = isDarkMode ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-gray-500 text-white';
    }
    return (
        <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full transition-all ${colorClass}`}>
            {status}
        </span>
    );
};
