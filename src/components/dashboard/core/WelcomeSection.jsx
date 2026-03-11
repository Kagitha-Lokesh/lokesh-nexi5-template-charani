import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function WelcomeSection() {
    const { isDarkMode } = useTheme();

    return (
        <div className={`rounded-[10px] p-6 md:p-8 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:-translate-y-0.5 border ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl hover:shadow-[#3ec3ff]/10' : 'bg-white border-borderColor shadow-[0px_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0px_15px_35px_rgba(0,0,0,0.1)]'}`}>
            <div>
                <h2 className="text-[20px] md:text-[24px] font-headings font-bold mb-1 transition-colors">Welcome Jason Porter!</h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-textSecondary'} text-sm font-body transition-colors`}>Measure how fast you're growing monthly recurring revenue.</p>
            </div>
            <Link to="/reports" className={`group flex items-center gap-2 font-medium text-sm transition-all px-4 py-2 rounded-md active:scale-95 ${isDarkMode ? 'text-[#3ec3ff] bg-white/5 hover:bg-white/10' : 'text-primary bg-lightSky/30 hover:bg-lightSky/50'}`}>
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}
