import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionList from './SuggestionList';
import TypingIndicator from './TypingIndicator';
import { getAIResponse, roleBasedSuggestions, roleBasedTips } from '@/datasets/aiChat';

export default function AIChatbot({ isFloating = false, onClose }) {
    const { isDarkMode } = useTheme();
    const userRole = localStorage.getItem('userRole') || 'employee';
    const suggestions = roleBasedSuggestions[userRole] || roleBasedSuggestions.default;
    const currentTip = roleBasedTips[userRole] || roleBasedTips.default;
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm NEXI5 AI Assistant. How can I help you today?", isUser: false, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text) => {
        const newUserMessage = {
            id: Date.now(),
            text,
            isUser: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const aiResponse = getAIResponse(text, userRole);
            const newAiMessage = {
                id: Date.now() + 1,
                text: aiResponse,
                isUser: false,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={`shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 ${
            isFloating ? 'h-full w-full' : 'h-[600px] md:rounded-xl'
        } ${
            isDarkMode 
            ? 'bg-[#0f172a]/95 backdrop-blur-2xl text-white' 
            : 'bg-white text-textPrimary'
        }`}>
            {/* Left Side: Conversation Area */}
            <div className={`flex-1 flex flex-col min-w-0 border-r ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className={`p-4 md:p-6 border-b flex items-center justify-between ${isDarkMode ? 'border-white/10 bg-white/5' : 'border-gray-100 bg-gray-50/50'}`}>
                    <div>
                        <h2 className="text-base md:text-lg font-bold">NEXI5 AI Assistant</h2>
                        <p className={`text-[11px] md:text-sm ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>HR Copilot • Ask anything</p>
                    </div>
                    {isFloating && (
                        <button 
                            onClick={onClose}
                            className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors`}
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-gray-200">
                    <div className="flex-1" /> {/* Spacer to push messages to bottom */}
                    {messages.map((msg) => (
                        <ChatMessage 
                            key={msg.id} 
                            message={msg.text} 
                            isUser={msg.isUser} 
                            timestamp={msg.timestamp} 
                        />
                    ))}
                    {isTyping && <TypingIndicator />}
                    <div ref={messagesEndRef} />
                </div>

                <div className={`p-4 md:p-6 ${isDarkMode ? 'bg-white/5' : 'bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.03)]'}`}>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>

            {/* Right Side: Suggestions Panel - Hidden in mobile floating mode */}
            <div className={`w-full md:w-80 p-6 ${isFloating ? 'hidden md:block' : ''} ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                <SuggestionList 
                    suggestions={suggestions} 
                    onSelectSuggestion={handleSendMessage} 
                />
                
                <div className={`mt-8 p-4 rounded-xl border transition-all ${
                    isDarkMode 
                    ? 'bg-sky-400/10 border-sky-400/20' 
                    : 'bg-sky-50 border-sky-100'
                }`}>
                    <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">Tips</h4>
                    <p className={`text-[11px] leading-relaxed font-italic ${isDarkMode ? 'text-sky-200/70' : 'text-sky-800/70'}`}>
                        {currentTip}
                    </p>
                </div>
            </div>
        </div>
    );
}
