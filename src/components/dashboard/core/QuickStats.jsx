import { roleStatsData } from '@/datasets/dashboard/quickStatsData';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useTheme } from '@/context/ThemeContext';

export default function QuickStats() {
    const { isDarkMode } = useTheme();
    const role = localStorage.getItem('userRole') || 'employee';
    const statsData = roleStatsData[role] || roleStatsData['employee'];

    return (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 gap-2 lg:gap-6 mb-6">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                const isNumeric = !isNaN(parseFloat(stat.badge));
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        key={stat.id}
                    >
                        <Link
                            to={stat.path}
                            className={`h-[100px] lg:h-full p-3 lg:p-6 rounded-[12px] border flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-4 transition-all duration-300 group cursor-pointer relative overflow-hidden text-center lg:text-left ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl hover:border-[#3ec3ff]/50' : 'bg-white border-borderColor shadow-soft hover:border-primary/50'}`}
                        >
                            <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isDarkMode ? 'bg-blue-400' : 'bg-primary'}`} />

                            <div className={`w-8 h-8 lg:w-14 lg:h-14 rounded-full flex items-center justify-center shrink-0 relative z-10 ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : stat.bgColor} group-hover:scale-110 transition-transform`}>
                                <Icon size={18} className={`lg:w-[24px] lg:h-[24px] ${isDarkMode ? 'text-[#3ec3ff]' : stat.color}`} />
                            </div>
                            <div className="relative z-10 flex-1 min-w-0">
                                <h3 className={`text-[15px] lg:text-xl font-bold font-headings truncate transition-colors ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                    {isNumeric ? <CountUp end={parseFloat(stat.badge)} duration={2} separator="," decimals={stat.badge.includes('.') ? 1 : 0} /> : stat.badge}
                                </h3>
                                <p className={`text-[10px] lg:text-[13px] font-bold uppercase tracking-tight transition-colors leading-tight truncate ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
