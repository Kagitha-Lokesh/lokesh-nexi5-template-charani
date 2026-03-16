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
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    isUser
                        ? 'bg-sky-400 text-white rounded-tr-none shadow-md'
                        : isDarkMode
                            ? 'bg-white/10 text-gray-100 rounded-tl-none border border-white/5'
                            : 'bg-gray-100 text-textPrimary rounded-tl-none border border-transparent shadow-sm'
                } transition-all duration-200 hover:shadow-lg`}
            >
                {message}
            </div>
            <span className={`text-[10px] mt-1 px-1 ${isDarkMode ? 'text-gray-500' : 'text-textSecondary'}`}>
                {timestamp}
            </span>
        </motion.div>
    );
}
