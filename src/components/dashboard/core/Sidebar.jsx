import { NavLink } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
    LayoutDashboard, Building2, UserCheck, ClipboardCheck, CalendarOff,
    CalendarDays, CalendarCheck, CreditCard, Wallet, FileText, FolderKanban,
    ChevronRight, X, LogOut
} from 'lucide-react';
import logo from '@/assets/NEXI5-logo.png';

const hrmsMenu = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', exact: true },
    { icon: Building2, label: 'Departments', path: '/dashboard/departments' },
    { icon: UserCheck, label: 'Employee', path: '/dashboard/employee' },
    { icon: ClipboardCheck, label: 'Attendance', path: '/dashboard/attendance' },
    { icon: CalendarCheck, label: 'Leave Management', path: '/dashboard/leaves' },
    { icon: CreditCard, label: 'Payroll', path: '/dashboard/payroll' },
    { icon: Wallet, label: 'Accounts', path: '/dashboard/accounts' },
    { icon: FileText, label: 'Reports', path: '/dashboard/reports' },
    { icon: CalendarOff, label: 'Holidays', path: '/dashboard/holidays' },
    { icon: CalendarDays, label: 'Events', path: '/dashboard/events' },
];

const projectMenu = [
    { icon: FolderKanban, label: 'Projects', path: '/dashboard/project' }
];

export default function Sidebar({ sidebarOpen, setSidebarOpen, handleLogout }) {
    const { isDarkMode } = useTheme();

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
                <div className={`h-20 flex items-center justify-between px-6 border-b ${isDarkMode ? 'border-white/10' : 'border-borderColor'}`}>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                        <img src={logo} alt="Logo" className={`w-48 h-24 object-contain rounded-lg transition-all ${isDarkMode ? 'brightness-110 drop-shadow-[0_0_8px_rgba(62,195,255,0.3)]' : ''}`} />
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-textSecondary dark:text-gray-400 hover:text-dark dark:hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Content */}
                <div className={`flex-1 overflow-y-auto py-6 scrollbar-thin ${isDarkMode ? 'scrollbar-thumb-white/10' : 'scrollbar-thumb-borderColor'} scrollbar-track-transparent`}>

                    {/* HRMS Group */}
                    <div className="mb-6">
                        <h3 className="px-6 text-xs font-semibold text-textSecondary dark:text-gray-500 uppercase tracking-wider mb-2">HRMS</h3>
                        <nav className="flex flex-col">
                            {hrmsMenu.map((item, index) => (
                                <NavItem key={index} {...item} />
                            ))}
                        </nav>
                    </div>

                    {/* Project Group */}
                    <div className="mb-6">
                        <h3 className="px-6 text-xs font-semibold text-textSecondary dark:text-gray-500 uppercase tracking-wider mb-2">Project</h3>
                        <nav className="flex flex-col">
                            {projectMenu.map((item, index) => (
                                <NavItem key={index} {...item} />
                            ))}
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
