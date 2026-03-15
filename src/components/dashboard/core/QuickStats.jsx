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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                const isNumeric = !isNaN(parseFloat(stat.badge));
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        key={stat.id}
                    >
                        <Link
                            to={stat.path}
                            className={`h-full p-6 rounded-[10px] border flex items-center gap-4 transition-all duration-300 group cursor-pointer relative overflow-hidden ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl hover:border-[#3ec3ff]/50 hover:shadow-[#3ec3ff]/10 hover:-translate-y-1' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)] hover:border-primary/50 hover:shadow-lg hover:-translate-y-1'}`}
                        >
                            <div className={`absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${isDarkMode ? 'bg-blue-400' : 'bg-primary'}`} />

                            <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 relative z-10 ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : stat.bgColor} group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                                <Icon size={24} className={isDarkMode ? 'text-[#3ec3ff]' : stat.color} />
                            </div>
                            <div className="relative z-10">
                                <h3 className={`text-xl font-bold font-headings transition-colors ${isDarkMode ? 'text-white' : 'text-dark'}`}>
                                    {isNumeric ? <CountUp end={parseFloat(stat.badge)} duration={2} separator="," decimals={stat.badge.includes('.') ? 1 : 0} /> : stat.badge}
                                </h3>
                                <p className={`text-[13px] font-medium transition-colors ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                            </div>
                        </Link>
                    </motion.div>
                );
            })}
        </div>
    );
}
