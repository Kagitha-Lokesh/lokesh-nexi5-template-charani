import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, UserPlus, FilePlus, Building2, CalendarPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

export default function FloatingActions() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const actions = [
        { icon: UserPlus, label: 'Add Employee', path: '/dashboard/employee/add', color: 'bg-blue-500' },
        { icon: CalendarPlus, label: 'Apply Leave', path: '/dashboard/leaves/apply', color: 'bg-emerald-500' },
        { icon: Building2, label: 'Create Department', path: '/dashboard/departments/add', color: 'bg-indigo-500' },
        { icon: FilePlus, label: 'Add Event', path: '/dashboard/events', color: 'bg-amber-500' },
    ];

    return (
        <div className="fixed bottom-[88px] right-6 z-[60] lg:hidden">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col-reverse items-end gap-3 mb-4">
                        {actions.map((action, index) => (
                            <motion.button
                                key={index}
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                onClick={() => {
                                    navigate(action.path);
                                    setIsOpen(false);
                                }}
                                className="flex items-center gap-3 group"
                            >
                                <span className={`px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-dark'} opacity-0 group-hover:opacity-100 lg:group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                                    {action.label}
                                </span>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl ${action.color} active:scale-90 transition-transform`}>
                                    <action.icon size={20} />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            {/* Main FAB */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotate: isOpen ? 135 : 0 }}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all active:scale-95 ${isOpen ? 'bg-red-500' : 'bg-primary dark:bg-[#3ec3ff]'}`}
            >
                {isOpen ? <X size={28} /> : <Plus size={28} />}
            </motion.button>

            {/* Backdrop for FAB */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[-1]"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}
