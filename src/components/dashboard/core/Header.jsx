import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
    Bell, Search, Settings, User, LogOut, MessageSquare,
    Menu, ChevronDown, Moon, Sun, X, CheckCheck, Clock, Bot
} from 'lucide-react';
import { ROLE_LABELS } from '@/config/roles';
import { sidebarConfig, globalMenuItems } from '@/config/sidebarConfig';
import { getCurrentUserData, ROLE_NOTIFICATIONS } from '@/config/roleData';

export default function Header({ sidebarOpen, setSidebarOpen, handleLogout }) {

    const [lang] = useState('EN');
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifPanel, setShowNotifPanel] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const profileRef = useRef(null);
    const notifRef = useRef(null);

    // ── Current user / role ──────────────────────────────────────────────────
    const userRole = localStorage.getItem('userRole') || 'employee';
    const userData = getCurrentUserData();

    // ── Notifications ────────────────────────────────────────────────────────
    const [notifications, setNotifications] = useState(
        ROLE_NOTIFICATIONS[userRole] || ROLE_NOTIFICATIONS.employee
    );
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const dismissNotif = (id) => setNotifications(prev => prev.filter(n => n.id !== id));

    // ── Outside click close ──────────────────────────────────────────────────
    useEffect(() => {
        const handler = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfileMenu(false);
            if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifPanel(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // ── Page title logic ─────────────────────────────────────────────────────
    const location = useLocation();
    const allMenuItems = [...(sidebarConfig[userRole] || []), ...globalMenuItems];
    const activeItem = allMenuItems.find(item =>
        location.pathname === item.path ||
        (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
    );
    let pageTitle = ROLE_LABELS[userRole] || 'HR Dashboard';
    if (activeItem) {
        pageTitle = activeItem.label === 'Dashboard' ? ROLE_LABELS[userRole] : activeItem.label;
    }

    // ── Profile route based on role ──────────────────────────────────────────
    const profileRoute = '/dashboard/profile';
    const settingsRoute = '/dashboard/settings';

    return (
        <header className={`h-[56px] lg:h-[80px] px-4 md:px-6 flex items-center justify-between border-b sticky top-0 z-10 transition-all ${isDarkMode ? 'bg-[#0c162d]/80 backdrop-blur-md border-white/10 text-white' : 'bg-white border-borderColor'}`}>

            {/* ── Left side ─────────────────────────────────────────────── */}
            <div className="flex items-center gap-4 flex-1">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 -ml-2 text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] transition-colors"
                >
                    <Menu size={22} />
                </button>

                <div className="flex-1 flex justify-center lg:justify-start">
                    <h1 className="text-base md:text-xl font-bold tracking-tight lg:font-semibold">
                        <span className="lg:hidden">NEXI5 HRM</span>
                        <span className="hidden lg:inline">{pageTitle}</span>
                    </h1>
                </div>

                <div className="relative hidden md:flex items-center w-full max-w-md ml-4">
                    <Search className={`absolute left-3 ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`} size={18} />
                    <input
                        type="text"
                        placeholder="Search employees or reports"
                        className={`w-full border-none rounded-full py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 transition-all font-body ${isDarkMode ? 'bg-white/10 text-white placeholder:text-gray-500 focus:ring-[#3ec3ff]/30' : 'bg-lightBlueBg text-textPrimary focus:ring-primary/20'}`}
                    />
                </div>
            </div>

            {/* ── Right side ────────────────────────────────────────────── */}
            <div className="flex items-center gap-3 sm:gap-5">
                <div className="hidden sm:flex items-center gap-4 mr-2">
                    {/* Language, Reports, and Project dropdowns removed as per request */}
                </div>

                {/* Icons */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-2 rounded-full transition-all flex items-center justify-center ${isDarkMode ? 'text-[#3ec3ff] hover:bg-white/10' : 'text-amber-500 hover:bg-gray-100'}`}
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* AI Assistant icon */}
                    <button 
                        onClick={() => navigate('/dashboard/ai-assistant')}
                        className="p-2 relative text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky dark:hover:bg-white/10 rounded-full transition-all"
                        title="AI Assistant"
                    >
                        <Bot size={20} />
                    </button>

                    {/* Messages icon */}
                    <button 
                        onClick={() => navigate('/dashboard/hr-chat')}
                        className="p-2 relative text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky dark:hover:bg-white/10 rounded-full transition-all"
                        title="Messages"
                    >
                        <MessageSquare size={20} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0c162d]" />
                    </button>

                    {/* Notifications bell + sliding dropdown ─────────────── */}
                    <div className="relative" ref={notifRef}>
                        <button
                            onClick={() => { setShowNotifPanel(p => !p); setShowProfileMenu(false); }}
                            className="p-2 relative text-textSecondary dark:text-gray-400 hover:text-primary dark:hover:text-[#3ec3ff] hover:bg-lightSky dark:hover:bg-white/10 rounded-full transition-all group"
                        >
                            <Bell size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-0.5 flex items-center justify-center text-[9px] font-bold bg-primary dark:bg-[#3ec3ff] text-white dark:text-[#0c162d] rounded-full border-2 border-white dark:border-[#0c162d] animate-pulse">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {showNotifPanel && (
                            <div className={`absolute right-0 mt-2 w-96 max-w-[95vw] rounded-xl border shadow-2xl z-50 overflow-hidden ${isDarkMode ? 'bg-[#0c162d] border-white/10' : 'bg-white border-gray-200'}`}>
                                {/* Header */}
                                <div className={`flex items-center justify-between px-4 py-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                    <div className="flex items-center gap-2">
                                        <span className={`font-bold font-headings text-sm ${isDarkMode ? 'text-white' : 'text-dark'}`}>Notifications</span>
                                        {unreadCount > 0 && <span className="px-1.5 py-0.5 rounded-full bg-primary dark:bg-[#3ec3ff] text-white dark:text-[#0c162d] text-[10px] font-bold">{unreadCount}</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={markAllRead} title="Mark all read" className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                                            <CheckCheck size={14} /> All read
                                        </button>
                                        <button onClick={() => setShowNotifPanel(false)} className={`p-1 rounded-lg ${isDarkMode ? 'hover:bg-white/10 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}><X size={14} /></button>
                                    </div>
                                </div>

                                {/* Notification list */}
                                <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-white/5">
                                    {notifications.map(n => (
                                        <div key={n.id} className={`flex items-start gap-3 px-4 py-3 transition-all group ${!n.read ? (isDarkMode ? 'bg-[#3ec3ff]/5' : 'bg-blue-50/50') : ''} ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'}`}>
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${n.bg}`}>
                                                <n.icon size={15} className={n.color} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-bold leading-tight mb-0.5 ${isDarkMode ? 'text-gray-200' : 'text-dark'}`}>
                                                    {n.title}
                                                    {!n.read && <span className="inline-block w-1.5 h-1.5 bg-primary dark:bg-[#3ec3ff] rounded-full ml-1.5 align-middle" />}
                                                </p>
                                                <p className="text-[11px] text-gray-500 leading-snug">{n.desc}</p>
                                                <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1"><Clock size={9} />{n.time}</p>
                                            </div>
                                            <button onClick={() => dismissNotif(n.id)} className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-all shrink-0 ${isDarkMode ? 'hover:bg-white/10 text-gray-500' : 'hover:bg-gray-200 text-gray-400'}`}><X size={12} /></button>
                                        </div>
                                    ))}
                                    {notifications.length === 0 && (
                                        <div className="p-8 text-center text-xs text-gray-400">No notifications</div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className={`px-4 py-2.5 border-t text-center ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                    <button
                                        onClick={() => { setShowNotifPanel(false); navigate('/dashboard/hr-head/hr-chat'); }}
                                        className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-[#3ec3ff] hover:text-[#3ec3ff]/80' : 'text-primary hover:text-blue-700'}`}
                                    >
                                        View all notifications →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Profile avatar + dropdown ──────────────────────────────── */}
                <div className="relative" ref={profileRef}>
                    <div
                        className="flex items-center gap-2 ml-1 cursor-pointer"
                        onClick={() => { setShowProfileMenu(p => !p); setShowNotifPanel(false); }}
                    >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[1.5px] ${isDarkMode ? 'shadow-[0_0_10px_rgba(62,195,255,0.3)]' : ''}`}>
                            <div className="w-full h-full rounded-full bg-white dark:bg-dark border-2 border-white dark:border-gray-800 overflow-hidden">
                                {userData.avatar ? (
                                    <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                                ) : (
                                    <p className={`w-full h-full object-cover text-center items-center justify-center flex text-white font-bold ${userData.avatarColor || 'bg-primary'}`}>
                                        {userData.avatarInitial}
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* Name + role pill (hidden on small screens) */}
                        <div className="hidden lg:flex flex-col leading-none">
                            <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{userData.name}</span>
                            <span className={`text-[10px] font-semibold mt-0.5 ${isDarkMode ? 'text-[#3ec3ff]' : 'text-primary'}`}>{userData.role}</span>
                        </div>
                        <ChevronDown size={12} className="hidden lg:block text-gray-400" />
                    </div>

                    {/* Profile Dropdown Menu */}
                    {showProfileMenu && (
                        <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl py-2 border z-50 overflow-hidden ${isDarkMode ? 'bg-[#0c162d] border-white/10 text-white' : 'bg-white border-gray-100'}`}>
                            {/* User info header */}
                            <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`}>
                                <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-dark'}`}>{userData.name}</p>
                                <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                                <span className={`mt-1.5 inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-[#3ec3ff]/10 text-[#3ec3ff]' : 'bg-primary/10 text-primary'}`}>{userData.role}</span>
                            </div>

                            <p
                                onClick={() => { navigate(profileRoute); setShowProfileMenu(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 cursor-pointer transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-textSecondary hover:bg-gray-50'}`}
                            >
                                <User size={15} /> Profile
                            </p>
                            <p
                                onClick={() => { navigate(settingsRoute); setShowProfileMenu(false); }}
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 cursor-pointer transition-colors ${isDarkMode ? 'text-gray-300 hover:bg-white/10' : 'text-textSecondary hover:bg-gray-50'}`}
                            >
                                <Settings size={15} /> Settings
                            </p>

                            <div className={`my-1 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-100'}`} />

                            <button
                                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors ${isDarkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'}`}
                                onClick={handleLogout}
                            >
                                <LogOut size={15} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
