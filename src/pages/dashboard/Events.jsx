import { Minimize2, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { daysOfWeek, currentMonthTitle, getEventsForDay } from '@/datasets/events/eventsData';

export default function EventsManagement() {
    const { isDarkMode } = useTheme();

    // Generating a simple 35-cell grid for a month view simulation (March 2026 starts on a Sunday)
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    const emptyTrailingDays = Array.from({ length: 35 - 31 }, (_, i) => i + 1); // filler for end of grid

    return (
        <div className={`animate-fade-in p-4 md:p-6 lg:p-8 h-full flex flex-col font-body min-h-screen border-none ${isDarkMode ? 'bg-transparent text-white' : 'bg-lightBlueBg'}`}>

            {/* Main Content Card container */}
            <div className={`rounded-[10px] border flex flex-col flex-1 overflow-hidden transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_30px_rgba(0,0,0,0.08)] border-borderColor'}`}>

                {/* Card Header Top */}
                <div className={`p-4 md:p-5 flex justify-between items-center border-b ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-50/50 border-borderColor'}`}>
                    <h2 className={`text-[18px] font-semibold uppercase tracking-wide ${isDarkMode ? 'text-white' : 'text-textPrimary'}`}>
                        Sara Hopkins
                    </h2>
                    <div className={`flex items-center gap-3 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>
                        <button className="hover:text-primary transition-colors"><Minimize2 size={16} /></button>
                        <button className="hover:text-primary transition-colors"><Maximize2 size={16} /></button>
                        <button className="hover:text-red-500 transition-colors"><X size={16} /></button>
                    </div>
                </div>

                {/* Calendar Controls */}
                <div className="p-5 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-textPrimary'}`}>{currentMonthTitle}</h3>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                        {/* View Switch */}
                        <div className={`flex rounded-md border p-1 shadow-sm overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-lightBlueBg border-borderColor'}`}>
                            <button className={`px-4 py-1.5 text-sm font-medium transition-all rounded-sm ${isDarkMode ? 'bg-[#3ec3ff] text-dark shadow-md' : 'bg-white text-primary shadow-sm'}`}>
                                month
                            </button>
                            <button className={`px-4 py-1.5 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-textSecondary hover:text-textPrimary'}`}>
                                week
                            </button>
                            <button className={`px-4 py-1.5 text-sm font-medium transition-colors ${isDarkMode ? 'text-gray-500 hover:text-white' : 'text-textSecondary hover:text-textPrimary'}`}>
                                day
                            </button>
                        </div>

                        {/* Arrows */}
                        <div className="flex items-center gap-1">
                            <button className={`p-1.5 rounded-full border transition-all ${isDarkMode ? 'border-white/10 text-gray-500 hover:text-[#3ec3ff] hover:border-[#3ec3ff]' : 'border-borderColor text-textSecondary hover:text-primary hover:border-primary'}`}>
                                <ChevronLeft size={18} />
                            </button>
                            <button className={`p-1.5 rounded-full border transition-all ${isDarkMode ? 'border-white/10 text-gray-500 hover:text-[#3ec3ff] hover:border-[#3ec3ff]' : 'border-borderColor text-textSecondary hover:text-primary hover:border-primary'}`}>
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Calendar Grid Container */}
                <div className="flex-1 px-5 pb-5 md:px-6 md:pb-6 overflow-x-auto">
                    <div className="min-w-[768px]"> {/* Ensure grid doesn't collapse too much on mobile */}

                        {/* Days Header */}
                        <div className={`grid grid-cols-7 border-t border-l ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                            {daysOfWeek.map((day, index) => {
                                const isWeekend = index === 0 || index === 6;
                                return (
                                    <div key={day} className={`py-3 px-2 text-center text-sm font-semibold border-r border-b ${isDarkMode
                                        ? (isWeekend ? 'bg-[#3ec3ff]/10 text-[#3ec3ff] border-white/10' : 'bg-white/5 text-gray-400 border-white/10')
                                        : (isWeekend ? 'bg-lightSky text-primary border-borderColor' : 'bg-gray-50/50 text-textSecondary border-borderColor')
                                        }`}>
                                        {day}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Calendar Cells */}
                        <div className={`grid grid-cols-7 border-l ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>

                            {/* Actual Days */}
                            {daysInMonth.map((day) => {
                                const isToday = day === 5; // Simulating today
                                const isWeekend = day % 7 === 1 || day % 7 === 0;
                                const dayEvents = getEventsForDay(day);

                                return (
                                    <div
                                        key={`day-${day}`}
                                        className={`min-h-[100px] md:min-h-[120px] border-r border-b p-2 relative group transition-colors ${isDarkMode
                                            ? (isToday ? 'bg-[#3ec3ff]/20 border-white/10' : isWeekend ? 'bg-[#3ec3ff]/5 border-white/10 hover:bg-[#3ec3ff]/10' : 'bg-transparent border-white/10 hover:bg-white/5')
                                            : (isToday ? 'bg-yellow-50/50 border-borderColor' : isWeekend ? 'bg-lightSky border-borderColor hover:bg-lightSky/50' : 'bg-white border-borderColor hover:bg-lightBlueBg/50')
                                            }`}
                                    >
                                        <span className={`text-[14px] font-medium ${isToday ? (isDarkMode ? 'text-[#3ec3ff]' : 'text-primary') : isWeekend ? (isDarkMode ? 'text-[#3ec3ff]/70' : 'text-primary') : (isDarkMode ? 'text-gray-300' : 'text-textPrimary')}`}>
                                            {day}
                                        </span>

                                        {/* Events Injection */}
                                        <div className="mt-2 flex flex-col gap-1 w-full max-w-[full] pr-1">
                                            {dayEvents.map((event, idx) => {
                                                if (event.type === 'primary') {
                                                    return (
                                                        <div key={idx} className={`w-full text-white text-[11px] font-medium px-2 py-1 rounded truncate shadow-sm hover:brightness-110 cursor-pointer transition-all ${isDarkMode ? 'bg-blue-600/80 shadow-[0_0_10px_rgba(37,99,235,0.3)]' : 'bg-secondary'}`}>
                                                            {event.title}
                                                        </div>
                                                    );
                                                }
                                                if (event.type === 'outline') {
                                                    return (
                                                        <div key={idx} className={`w-full border text-[11px] font-semibold px-2 py-1 rounded truncate shadow-sm hover:brightness-95 cursor-pointer transition-all ${isDarkMode ? 'bg-[#3ec3ff]/20 text-[#3ec3ff] border-[#3ec3ff]/30' : 'bg-lightSky text-primary border-primary/20'}`}>
                                                            {event.title}
                                                        </div>
                                                    );
                                                }
                                                if (event.type === 'teal') {
                                                    return (
                                                        <div key={idx} className={`w-full text-white text-[11px] font-medium px-2 py-1 rounded truncate shadow-sm hover:brightness-110 cursor-pointer transition-all ${isDarkMode ? 'bg-teal-600/80' : 'bg-teal-500'}`}>
                                                            {event.title}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Trailing Empty Days to fill the 35-cell grid (5 rows) */}
                            {emptyTrailingDays.map((day) => {
                                const isWeekend = day % 7 === 1 || day % 7 === 0;
                                return (
                                    <div
                                        key={`empty-${day}`}
                                        className={`min-h-[100px] md:min-h-[120px] border-r border-b p-2 ${isDarkMode
                                            ? (isWeekend ? 'bg-[#3ec3ff]/5 border-white/10' : 'bg-white/5 border-white/10')
                                            : (isWeekend ? 'bg-lightSky/60 border-borderColor' : 'bg-gray-50/30 border-borderColor')
                                            }`}
                                    >
                                        <span className={`text-[14px] font-medium ${isWeekend ? (isDarkMode ? 'text-[#3ec3ff]/30' : 'text-primary/40') : (isDarkMode ? 'text-gray-700' : 'text-gray-300')}`}>{day}</span>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
