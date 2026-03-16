import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import SuggestionList from './SuggestionList';
import TypingIndicator from './TypingIndicator';
import { getAIResponse, roleBasedSuggestions, roleBasedTips } from '@/datasets/aiChat';

export default function AIChatbot() {
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
            const aiResponse = getAIResponse(text);
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
        <div className={`rounded-[10px] shadow-sm overflow-hidden h-[600px] flex flex-col md:flex-row border transition-all duration-300 ${
            isDarkMode 
            ? 'bg-[#0f172a]/80 backdrop-blur-xl border-white/10 text-white' 
            : 'bg-white border-gray-200 text-textPrimary'
        }`}>
            {/* Left Side: Conversation Area */}
            <div className={`flex-1 flex flex-col min-w-0 border-r ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                <div className={`p-6 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                    <h2 className="text-lg font-semibold italic">NEXI5 AI Assistant</h2>
                    <p className={`text-sm italic ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>Ask HR related questions.</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6 flex flex-col scrollbar-thin dark:scrollbar-thumb-slate-700 scrollbar-thumb-gray-200">
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

                <div className={`p-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50/50'}`}>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            </div>

            {/* Right Side: Suggestions Panel */}
            <div className={`w-full md:w-80 p-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
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
