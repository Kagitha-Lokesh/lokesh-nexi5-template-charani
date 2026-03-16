import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function ChatMessage({ message, isUser, timestamp }) {
    const { isDarkMode } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}
        >
            <div
                className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed relative ${
                    isUser
                        ? 'bg-[#dcf8c6] dark:bg-[#054d44] text-dark dark:text-gray-100 rounded-tr-none shadow-sm'
                        : isDarkMode
                            ? 'bg-[#1f2c33] text-gray-100 rounded-tl-none border-none shadow-sm'
                            : 'bg-white text-textPrimary rounded-tl-none border-none shadow-sm'
                }`}
            >
                {message}
            </div>
            <span className={`text-[10px] mt-1 px-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                {timestamp}
            </span>
        </motion.div>
    );
}
