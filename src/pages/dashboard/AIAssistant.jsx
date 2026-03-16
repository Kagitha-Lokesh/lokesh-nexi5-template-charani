import AIChatbot from '@/components/ai/AIChatbot';
import { motion } from 'framer-motion';

export default function AIAssistant() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 md:p-6 lg:p-8 flex flex-col font-body min-h-[calc(100vh-80px)]"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-semibold text-textPrimary dark:text-gray-100">AI Assistant</h1>
                    <p className="text-sm text-textSecondary dark:text-gray-400 mt-1">Get instant answers to your HR queries</p>
                </div>
                
                <div className="flex items-center space-x-2 text-xs font-medium text-textSecondary dark:text-gray-300 bg-white dark:bg-darkSecondary px-3 py-1.5 rounded-full shadow-sm border border-gray-100 dark:border-gray-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span>System Online</span>
                </div>
            </div>

            <AIChatbot />

            <div className="py-6 text-center mt-auto">
                <p className="text-textSecondary text-xs">Copyright © NEXI5 HRM Portal | AI Powered Service</p>
            </div>
        </motion.div>
    );
}
