import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import AIChatbot from '@/components/ai/AIChatbot';

export default function FloatingAI() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();

    const handleToggle = () => {
        if (window.innerWidth < 1024) {
            navigate('/dashboard/ai-assistant');
        } else {
            setIsOpen(!isOpen);
        }
    };

    return (
        <div className="fixed bottom-[88px] right-[88px] z-[60] lg:hidden">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="absolute bottom-20 right-0 w-[85vw] max-w-[320px] h-[480px] shadow-2xl rounded-2xl overflow-hidden pointer-events-auto"
                    >
                        <AIChatbot isFloating={true} onClose={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggle}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all relative ${
                    isOpen ? 'bg-red-500' : 'bg-blue-600'
                }`}
            >
                {isOpen ? <X size={28} /> : (
                    <>
                        <MessageSquare size={28} />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">AI</span>
                    </>
                )}
            </motion.button>
        </div>
    );
}
