import { motion } from 'framer-motion';
import { UserPlus, CalendarPlus, Building2, ClipboardList, BarChart3, CalendarRange } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

export default function QuickActions() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const shortcuts = [
        { icon: UserPlus, label: 'Add Employee', path: '/dashboard/employee/add' },
        { icon: CalendarPlus, label: 'Apply Leave', path: '/dashboard/leaves/apply' },
        { icon: Building2, label: 'Create Dept', path: '/dashboard/departments/add' },
        { icon: ClipboardList, label: 'Generate Payroll', path: '/dashboard/payroll' },
        { icon: BarChart3, label: 'View Reports', path: '/dashboard/reports' },
        { icon: CalendarRange, label: 'Add Event', path: '/dashboard/events' },
    ];

    return (
        <div className="mb-8 overflow-hidden">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Quick Actions
            </h4>
            
            <div className="flex overflow-x-auto gap-3 pb-4 px-1 snap-x snap-mandatory hide-scrollbar">
                {shortcuts.map((shortcut, index) => (
                    <motion.button
                        key={index}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(shortcut.path)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full whitespace-nowrap snap-start transition-all shadow-sm border ${
                            isDarkMode 
                            ? 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10 hover:border-[#3ec3ff]/50' 
                            : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50 hover:border-primary/50 shadow-soft'
                        }`}
                    >
                        <shortcut.icon size={16} className={isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'} />
                        <span className="text-xs font-bold">{shortcut.label}</span>
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
