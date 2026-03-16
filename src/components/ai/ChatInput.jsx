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
            className={`flex items-center space-x-2 p-2 border rounded-full shadow-sm focus-within:ring-1 focus-within:ring-sky-400 transition-all duration-200 ${
                isDarkMode 
                ? 'bg-[#1e293b] border-white/10 focus-within:border-sky-400' 
                : 'bg-white border-gray-200 focus-within:border-sky-400'
            }`}
        >
            <button
                type="button"
                className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                    ? 'text-gray-400 hover:text-sky-400 hover:bg-gray-700' 
                    : 'text-textSecondary hover:text-secondary hover:bg-gray-100'
                }`}
            >
                <Paperclip className="w-5 h-5" />
            </button>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask something about HR..."
                className={`flex-1 bg-transparent border-none focus:ring-0 text-sm placeholder-gray-400 ${
                    isDarkMode ? 'text-gray-100' : 'text-textPrimary'
                }`}
            />
            <button
                type="button"
                className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                    ? 'text-gray-400 hover:text-sky-400 hover:bg-gray-700' 
                    : 'text-textSecondary hover:text-secondary hover:bg-gray-100'
                }`}
            >
                <Mic className="w-5 h-5" />
            </button>
            <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2 rounded-full transition-all duration-200 ${
                    message.trim() 
                        ? 'bg-sky-400 text-white hover:bg-sky-500 shadow-md' 
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                }`}
            >
                <Send className="w-5 h-5" />
            </button>
        </form>
    );
}
