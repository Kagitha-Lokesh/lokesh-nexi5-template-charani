import { NavLink } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
    LayoutDashboard, Building2, UserCheck, ClipboardCheck, CalendarOff,
    CalendarDays, CalendarCheck, CreditCard, Wallet, FileText, FolderKanban,
    ChevronRight, X, LogOut, Settings
} from 'lucide-react';
import logo from '@/assets/nexi5-logo.png';
import { sidebarConfig, globalMenuItems } from '@/config/sidebarConfig';

export default function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
    const { isDarkMode } = useTheme();
    const role = localStorage.getItem('userRole') || 'employee';
    const menuItems = sidebarConfig[role] || [];

    // eslint-disable-next-line no-unused-vars
    const NavItem = ({ icon: Icon, label, path, exact }) => {
        return (
            <NavLink
                to={path}
                end={exact}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 transition-all relative group ${isActive
                        ? 'text-primary bg-lightSky/50 dark:bg-white/10 dark:text-[#3ec3ff]'
                        : 'text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky/30 dark:hover:bg-white/5'}`
                }
            >
                {({ isActive }) => (
                    <>
                        {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary dark:bg-[#3ec3ff] rounded-r-md"></div>
                        )}
                        <Icon size={20} className={isActive ? 'text-primary dark:text-[#3ec3ff]' : 'text-textSecondary dark:text-gray-400 group-hover:text-primary dark:group-hover:text-[#3ec3ff] transition-colors'} />
                        <span className="font-medium text-[15px]">{label}</span>
                        {label === 'Project' && <ChevronRight size={16} className="ml-auto" />}
                    </>
                )}
            </NavLink>
        );
    };

    return (
        <>
            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-dark/20 dark:bg-black/40 z-20 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-30 w-[260px] flex flex-col transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${isDarkMode ? 'bg-[#0c162d]/90 backdrop-blur-md border-r border-white/10' : 'bg-white border-r border-borderColor'}`}>

                {/* Logo Area */}
                <div className={`h-24 flex items-center justify-between px-6 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <div
                        className="flex items-center justify-center p-2 bg-gray-900 dark:bg-transparent rounded-lg transition-all cursor-pointer h-16 w-full max-w-[160px]"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img src={logo} alt="Logo" className={`h-[120px] md:h-[120px] object-contain transition-all ${isDarkMode ? 'brightness-110 drop-shadow-[0_0_8px_rgba(62,195,255,0.3)]' : ''}`} />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-textSecondary dark:text-gray-400 hover:text-dark dark:hover:text-white ml-2">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Content */}
                <div className={`flex-1 overflow-y-auto py-6 space-y-8 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-white/10' : 'scrollbar-thumb-borderColor'} scrollbar-track-transparent`}>

                    {/* Role Based Categorized Menu */}
                    <div className="flex flex-col gap-8">
                        {menuItems.map((category, catIdx) => (
                            <div key={category.category + catIdx} className="flex flex-col">
                                {/* Category Heading */}
                                <div className="px-6 mb-2">
                                    <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-[#3ec3ff] shadow-[0_0_15px_rgba(62,195,255,0.1)]' : 'text-primary'}`}>
                                        {category.category}
                                    </h3>
                                    <div className={`h-[1px] w-full mt-1.5 ${isDarkMode ? 'bg-gradient-to-r from-[#3ec3ff]/30 to-transparent' : 'bg-gradient-to-r from-primary/20 to-transparent'}`} />
                                </div>

                                <nav className="flex flex-col">
                                    <ul className="space-y-1">
                                        {category.items.map((item, index) => (
                                            <li key={item.path + index}>
                                                <NavItem {...item} />
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </div>
                        ))}
                    </div>

                    {/* Shared / Global Menu */}
                    <div className="flex flex-col pt-4">
                        <div className="px-6 mb-2">
                            <h3 className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                Account Settings
                            </h3>
                            <div className={`h-[1px] w-full mt-1.5 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`} />
                        </div>
                        <nav className="flex flex-col">
                            <ul className="space-y-1">
                                {globalMenuItems.map((item, index) => (
                                    <li key={item.path + index}>
                                        <NavItem {...item} />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                </div>

                {/* Logout Button at bottom */}
                <div className={`p-4 border-t ${isDarkMode ? 'border-white/10' : 'border-borderColor'} mt-auto`}>
                    <button
                        onClick={handleLogout}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-700 dark:hover:text-red-400 rounded-md transition-colors font-medium text-[15px]`}
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}
