import React from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export const SearchHeader = ({ title, searchQuery, setSearchQuery }) => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`p-5 md:p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${isDarkMode ? 'bg-transparent border-white/10' : 'bg-white border-borderColor'}`}>
            <h2 className={`text-[18px] font-headings font-bold tracking-wide uppercase ${isDarkMode ? 'text-white' : 'text-dark'}`}>{title}</h2>
            {setSearchQuery && (
                <div className="relative w-full sm:w-64">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-4 pr-10 py-2 rounded-full text-sm transition-all font-medium focus:outline-none focus:ring-2 ${isDarkMode
                            ? 'bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#3ec3ff]/50 focus:ring-[#3ec3ff]/20'
                            : 'bg-lightBlueBg border border-borderColor text-textPrimary focus:border-primary/50 focus:ring-primary/20'
                            }`}
                    />
                    <button className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-gray-600 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>
                        <Search size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};
