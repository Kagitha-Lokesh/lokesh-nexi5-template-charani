import { motion } from 'framer-motion';
import { LayoutDashboard, Users, CalendarDays, Wallet, UserCircle } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';

export default function BottomNav() {
  const { isDarkMode } = useTheme();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Employees', path: '/dashboard/employee' },
    { icon: CalendarDays, label: 'Leaves', path: '/dashboard/leaves' },
    { icon: Wallet, label: 'Payroll', path: '/dashboard/payroll' },
    { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-16 z-[55] lg:hidden border-t backdrop-blur-lg transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0c162d]/90 border-white/10' : 'bg-white/90 border-gray-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]'
    }`}>
      <div className="grid grid-cols-5 h-full max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-all relative group ${
                isActive 
                  ? (isDarkMode ? 'text-[#3ec3ff]' : 'text-primary') 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <div className={`p-1 rounded-lg transition-colors ${isActive ? (isDarkMode ? 'bg-[#3ec3ff]/10' : 'bg-primary/10') : ''}`}>
                <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-95'}`}>
                {item.label}
              </span>
              
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active"
                  className={`absolute top-0 w-8 h-1 rounded-b-full ${isDarkMode ? 'bg-[#3ec3ff]' : 'bg-primary'}`}
                />
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
