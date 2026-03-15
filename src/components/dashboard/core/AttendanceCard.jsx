import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function AttendanceCard() {
    const { isDarkMode } = useTheme();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const handleCheckIn = () => {
        setIsCheckedIn(true);
        setCheckInTime(new Date());
    };

    const handleCheckOut = () => {
        if (!isCheckedIn) return;
        setIsCheckedIn(false);
        setCheckOutTime(new Date());
    };

    const getWorkingHoursString = () => {
        if (!checkInTime) return '—';
        let endObj = isCheckedIn ? currentTime : checkOutTime;
        if (!endObj) return '—';

        const diffMs = endObj.getTime() - checkInTime.getTime();
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${diffHrs}h ${diffMins}m`;
    };

    return (
        <div className={`p-6 rounded-[10px] border flex flex-col xl:flex-row items-center justify-between gap-6 transition-all ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl' : 'bg-white shadow-[0px_10px_25px_rgba(0,0,0,0.08)] border-borderColor'}`}>
            <div className="flex flex-col xl:flex-row items-center gap-6 w-full xl:w-auto">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 relative shadow-sm border ${isDarkMode ? 'bg-white/5 text-[#3ec3ff] border-white/10' : 'bg-lightSky text-primary border-borderColor'}`}>
                    <Clock size={32} />
                    {isCheckedIn && <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 animate-pulse ${isDarkMode ? 'bg-[#3ec3ff] border-[#0c162d]' : 'bg-green-500 border-white'}`}></div>}
                </div>
                <div className="text-center xl:text-left">
                    <h2 className={`text-xl font-bold font-headings ${isDarkMode ? 'text-white' : 'text-dark'}`}>My Attendance</h2>
                    <p className={`text-sm font-semibold uppercase tracking-wider mt-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>{formatDate(currentTime)}</p>
                    <p className={`text-3xl font-black mt-1 drop-shadow-sm font-headings tracking-tight ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{formatTime(currentTime)}</p>
                </div>
            </div>

            <div className={`flex flex-col sm:flex-row items-center gap-6 divide-y sm:divide-y-0 sm:divide-x w-full xl:w-auto justify-center xl:justify-end xl:flex-1 ${isDarkMode ? 'divide-white/5' : 'divide-borderColor'}`}>
                <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Check-In Time</span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{checkInTime ? formatTime(checkInTime) : '—'}</span>
                </div>
                <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Check-Out Time</span>
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-300' : 'text-dark'}`}>{checkOutTime ? formatTime(checkOutTime) : '—'}</span>
                </div>
                <div className="flex flex-col px-4 text-center sm:text-left pt-4 sm:pt-0">
                    <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-gray-600' : 'text-textSecondary'}`}>Working Hours</span>
                    <span className={`text-lg font-bold ${isCheckedIn ? (isDarkMode ? 'text-[#3ec3ff]' : 'text-primary') : (isDarkMode ? 'text-gray-300' : 'text-dark')}`}>{getWorkingHoursString()}</span>
                </div>
            </div>

            <div className="flex flex-row items-center gap-4 w-full xl:w-auto justify-center xl:justify-end">
                <button
                    onClick={handleCheckIn}
                    disabled={isCheckedIn}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all font-semibold shadow-sm w-full sm:w-auto text-sm ${!isCheckedIn ? (isDarkMode ? 'bg-[#3ec3ff] text-dark hover:bg-[#3ec3ff]/90 hover:shadow-[0_0_20px_rgba(62,195,255,0.3)]' : 'bg-[#22C55E] text-white hover:bg-green-600') : (isDarkMode ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 border border-borderColor')}`}
                >
                    <LogIn size={20} />
                    Check In
                </button>
                <button
                    onClick={handleCheckOut}
                    disabled={!isCheckedIn}
                    className={`flex items-center justify-center gap-2 px-6 py-3 rounded-md transition-all font-semibold shadow-sm w-full sm:w-auto text-sm ${isCheckedIn ? (isDarkMode ? 'bg-red-500/80 text-white hover:bg-red-600' : 'bg-[#EF4444] text-white hover:bg-red-600') : (isDarkMode ? 'bg-white/5 text-gray-600 border border-white/10 cursor-not-allowed' : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-70 border border-borderColor')}`}
                >
                    <LogOut size={20} />
                    Check Out
                </button>
            </div>
        </div>
    );
}
