import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getCurrentUserData } from '@/config/roleData';

export default function WelcomeSection() {
    const { isDarkMode } = useTheme();
    const userData = getCurrentUserData();

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`rounded-[10px] p-6 md:p-8 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:-translate-y-0.5 border relative overflow-hidden group ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-2xl hover:shadow-[#3ec3ff]/10' : 'bg-white border-borderColor shadow-[0px_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0px_15px_35px_rgba(0,0,0,0.1)]'}`}
        >
            <div className="absolute top-0 right-0 w-64 h-64 -mr-20 -mt-20 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-500/20 transition-all duration-700" />
            
            <div className="relative z-10">
                <h2 className={`text-[20px] md:text-[24px] font-headings font-bold mb-1 transition-colors ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                    Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 animate-gradient-x">{userData.name}!</span>
                </h2>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-textSecondary'} text-sm font-body transition-colors`}>Measure how fast you're growing monthly recurring revenue.</p>
            </div>
            <Link to="/reports" className={`group relative z-10 flex items-center gap-2 font-medium text-sm transition-all px-4 py-2 rounded-md active:scale-95 ${isDarkMode ? 'text-[#3ec3ff] bg-white/5 hover:bg-white/10' : 'text-primary bg-lightSky/30 hover:bg-lightSky/50'}`}>
                Learn More
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
}
