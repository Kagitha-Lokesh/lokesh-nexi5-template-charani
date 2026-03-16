import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

export default function SuggestionList({ suggestions, onSelectSuggestion }) {
    const { isDarkMode } = useTheme();
    return (
        <div className="flex flex-col space-y-3">
            <h3 className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-200' : 'text-textPrimary'}`}>Suggested Questions</h3>
            <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelectSuggestion(suggestion)}
                        className={`text-xs px-4 py-2 border rounded-full transition-all duration-200 text-left ${
                            isDarkMode
                            ? 'bg-white/5 border-white/10 text-sky-400 hover:bg-white/10 hover:border-sky-400'
                            : 'bg-lightBlueBg border-transparent text-secondary hover:bg-white hover:border-sky-400'
                        }`}
                    >
                        {suggestion}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
