import { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function ChatInput({ onSendMessage }) {
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            className={`flex items-center space-x-1 md:space-x-2 p-1.5 md:p-2 border rounded-full shadow-sm focus-within:ring-1 focus-within:ring-sky-400 transition-all duration-200 ${
                isDarkMode 
                ? 'bg-[#1e293b] border-white/10 focus-within:border-sky-400' 
                : 'bg-white border-gray-200 focus-within:border-sky-400'
            }`}
        >
            <button
                type="button"
                className={`p-1.5 md:p-2 rounded-full transition-colors flex-shrink-0 ${
                    isDarkMode 
                    ? 'text-gray-400 hover:text-sky-400 hover:bg-gray-700' 
                    : 'text-textSecondary hover:text-secondary hover:bg-gray-100'
                }`}
            >
                <Paperclip className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask HR..."
                className={`flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-xs md:text-sm placeholder-gray-400 ${
                    isDarkMode ? 'text-gray-100' : 'text-textPrimary'
                }`}
            />
            <button
                type="button"
                className={`p-1.5 md:p-2 rounded-full transition-colors flex-shrink-0 ${
                    isDarkMode 
                    ? 'text-gray-400 hover:text-sky-400 hover:bg-gray-700' 
                    : 'text-textSecondary hover:text-secondary hover:bg-gray-100'
                }`}
            >
                <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
                type="submit"
                disabled={!message.trim()}
                className={`p-1.5 md:p-2 rounded-full transition-all duration-200 flex-shrink-0 ${
                    message.trim() 
                        ? 'bg-sky-400 text-white hover:bg-sky-500 shadow-md' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
            >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
        </form>
    );
}
