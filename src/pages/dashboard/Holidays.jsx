import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { holidaysData } from '@/datasets';
import { useTheme } from '@/context/ThemeContext';

export default function HolidaysManagement() {
    const { isDarkMode } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 h-full flex flex-col font-body min-h-screen border-none ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Main Content Card */}
            <div className={`rounded-[10px] border flex flex-col flex-1 pb-4 overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border-borderColor'}`}>

                {/* Card Header */}
                <div className="p-5 md:p-6 flex justify-end">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search something..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-4 pr-10 py-2 border rounded-md text-sm transition-all focus:outline-none ${isDarkMode
                                ? 'bg-white/5 border-white/10 text-white focus:border-[#3ec3ff] focus:ring-1 focus:ring-[#3ec3ff]/50'
                                : 'border-borderColor text-textPrimary focus:border-primary'
                                }`}
                        />
                        <button className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isDarkMode ? 'text-gray-500 hover:text-[#3ec3ff]' : 'text-textSecondary hover:text-primary'}`}>
                            <Search size={16} />
                        </button>
                    </div>
                </div>

                {/* Table Content */}
                <div className="px-5 md:px-6 w-full">
                    {/* Custom Header Row */}
                    <div className={`grid grid-cols-12 gap-4 px-6 py-4 text-xs font-semibold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                        <div className="col-span-3">DAY</div>
                        <div className="col-span-4">DATE</div>
                        <div className="col-span-5">HOLIDAY</div>
                    </div>

                    {/* Rows as Separate Containers */}
                    <div className="flex flex-col gap-3 pb-8">
                        {holidaysData.filter(h => h.name.toLowerCase().includes(searchQuery.toLowerCase())).map((row, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-12 gap-4 items-center px-6 py-4 rounded-[8px] border transition-all group cursor-pointer ${isDarkMode
                                    ? 'border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#3ec3ff]/30 hover:shadow-lg'
                                    : 'border-borderColor hover:bg-lightSky/50'
                                    }`}
                            >
                                <div className={`col-span-3 text-[14px] ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                                    {row.day}
                                </div>
                                <div className={`col-span-4 text-[14px] font-medium text-left ${isDarkMode ? 'text-gray-300' : 'text-textSecondary'}`}>
                                    {row.date}
                                </div>
                                <div className={`col-span-5 text-[14px] font-semibold text-left transition-colors ${isDarkMode ? 'text-white group-hover:text-[#3ec3ff]' : 'text-textPrimary'}`}>
                                    {row.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
