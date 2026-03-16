import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function TypingIndicator() {
    const { isDarkMode } = useTheme();
    return (
        <div className={`flex items-center space-x-2 p-3 rounded-lg w-fit ${
            isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-gray-100'
        }`}>
            <div className="flex space-x-1">
                {[0, 1, 2].map((dot) => (
                    <motion.div
                        key={dot}
                        className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: dot * 0.2
                        }}
                    />
                ))}
            </div>
            <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-300' : 'text-textSecondary'}`}>NEXI5 AI is typing...</span>
        </div>
    );
}
