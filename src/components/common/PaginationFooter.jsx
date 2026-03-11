import React from 'react';
import { useTheme } from '@/context/ThemeContext';

export const PaginationFooter = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex justify-between items-center px-6 py-4 border-t mt-auto transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10' : 'bg-white border-borderColor'}`}>
            <button className={`text-sm font-medium transition-colors disabled:opacity-50 ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>Previous</button>
            <div className="flex items-center gap-2">
                <button className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium shadow-sm transition-all ${isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-[#3ec3ff]/20' : 'bg-primary text-white'}`}>1</button>
                <button className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/10 hover:text-[#3ec3ff]' : 'text-textSecondary hover:bg-lightBlueBg hover:text-primary'}`}>2</button>
                <button className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-400 hover:bg-white/10 hover:text-[#3ec3ff]' : 'text-textSecondary hover:bg-lightBlueBg hover:text-primary'}`}>3</button>
            </div>
            <button className={`text-sm font-medium transition-colors disabled:opacity-50 ${isDarkMode ? 'text-gray-400 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>Next</button>
        </div>
    );
};
