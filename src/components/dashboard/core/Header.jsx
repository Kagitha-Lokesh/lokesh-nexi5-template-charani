import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Bell, Search, Settings, User, LogOut, MessageSquare, Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';

export default function Header({ sidebarOpen, setSidebarOpen, handleLogout }) {

    const [lang] = useState('EN');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    // Determine title and placeholder based on current route path
    const location = useLocation();
    let pageTitle = 'HR Dashboard';
    let searchPlaceholder = 'Search employees or reports';

    if (location.pathname.includes('/users')) {
        pageTitle = 'Users';
        searchPlaceholder = 'Search employees';
    } else if (location.pathname.includes('/departments')) {
        pageTitle = 'Departments';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/employee')) {
        pageTitle = 'Employee';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/holidays')) {
        pageTitle = 'Holidays';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/events')) {
        pageTitle = 'Events';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/payroll')) {
        pageTitle = 'Payroll';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/accounts')) {
        pageTitle = 'Accounts';
        searchPlaceholder = 'Search...';
    } else if (location.pathname.includes('/reports')) {
        pageTitle = 'Report';
        searchPlaceholder = 'Search...';
    }

    return (
        <header className={`h-[80px] px-4 md:px-6 flex items-center justify-between border-b sticky top-0 z-10 transition-all ${isDarkMode ? 'bg-[#0c162d]/80 backdrop-blur-md border-white/10 text-white' : 'bg-white border-borderColor'}`}>
            {/* Left side */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors"
                >
                    <Menu size={24} />
                </button>

                <h1 className="text-lg md:text-xl font-semibold hidden sm:block tracking-tight">{pageTitle}</h1>


                <div className="relative hidden md:flex items-center w-full max-w-md ml-4">
                    <Search className={`absolute left-3 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`} size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        className={`w-full border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-all font-body ${isDarkMode ? 'bg-white/10 text-white placeholder:text-gray-500 focus:ring-[#3ec3ff]/30' : 'bg-lightBlueBg text-textPrimary focus:ring-primary/20'}`}
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden sm:flex items-center gap-4 mr-2">
                    {/* Language */}
                    <button className="flex items-center gap-1 text-sm text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] font-medium transition-colors">
                        {lang} <ChevronDown size={14} />
                    </button>

                    {/* Reports */}
                    <button className="flex items-center gap-1 text-sm text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] font-medium transition-colors">
                        Reports <ChevronDown size={14} />
                    </button>

                    {/* Project */}
                    <button className="flex items-center gap-1 text-sm text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] font-medium transition-colors">
                        Project <ChevronDown size={14} />
                    </button>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all flex items-center justify-center ${isDarkMode ? 'text-[#3ec3ff] hover:bg-white/10' : 'text-amber-500 hover:bg-gray-100'}`}
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button className="p-2 relative text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky dark:hover:bg-white/10 rounded-full transition-all">
                        <MessageSquare size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0c162d]"></span>
                    </button>
                    <button className="p-2 relative text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky dark:hover:bg-white/10 rounded-full transition-all">
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary dark:bg-[#3ec3ff] rounded-full border-2 border-white dark:border-[#0c162d]"></span>
                    </button>
                </div>

                {/* Profile */}
                <div className="relative">
                    <div
                        className="flex items-center gap-2 ml-1 cursor-pointer"
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                    >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[1.5px] ${isDarkMode ? 'shadow-[0_0_10px_rgba(62,195,255,0.3)]' : ''}`}>
                            <div className="w-full h-full rounded-full bg-white dark:bg-dark border-2 border-white dark:border-gray-800 overflow-hidden">
                                <p className="w-full h-full object-cover text-center items-center justify-center flex text-white bg-primary dark:bg-primary/80 font-bold">L</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Dropdown Menu */}
                    {showProfileMenu && (
                        <div className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 border z-50 transition-all ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white' : 'bg-white border-gray-100'}`}>
                            <p className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-textSecondary hover:bg-gray-100'}`}>Profile</p>
                            <p className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 cursor-pointer ${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-textSecondary hover:bg-gray-100'}`}>Settings</p>
                            <button
                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-gray-100'}`}
                                onClick={handleLogout}
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
