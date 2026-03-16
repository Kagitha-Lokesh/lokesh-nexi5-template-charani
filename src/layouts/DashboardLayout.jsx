import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import Sidebar from '@/components/dashboard/core/Sidebar';
import Header from '@/components/dashboard/core/Header';
import FloatingActions from '@/components/dashboard/core/FloatingActions';
import BottomNav from '@/components/dashboard/core/BottomNav';
import FloatingAI from '@/components/dashboard/core/FloatingAI';

export default function DashboardLayout({ children, handleLogout }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-300 font-body ${isDarkMode ? 'dark auth-background text-white' : 'bg-lightBlueBg text-dark'}`}>
            {/* Sidebar Component */}
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
            />

            {/* Main Content Wrapper */}
            <div className="relative flex flex-col flex-1 overflow-hidden">
                {/* Header Component */}
                <div className="shrink-0">
                    <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        handleLogout={handleLogout}
                    />
                </div>

                {/* Main Page Content */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 lg:p-6 pb-24 lg:pb-6">
                    {children}
                </main>

                {/* Floating Action Buttons for Mobile */}
                <FloatingAI />
                <FloatingActions />

                {/* Bottom Navigation for Mobile */}
                <BottomNav />
            </div>
        </div>
    );
}
