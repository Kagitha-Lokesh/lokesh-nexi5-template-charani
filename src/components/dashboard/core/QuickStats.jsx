import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
    Building2,
    UserCheck,
    ClipboardCheck,
    CalendarOff,
    CalendarDays,
    CalendarCheck,
    CreditCard,
    Wallet,
    FileText,
    FolderKanban
} from 'lucide-react';

const statsData = [
    { id: 1, title: 'Departments', icon: Building2, color: 'text-[#06B6D4]', badge: '7', bgColor: 'bg-[#06B6D4]/10', path: '/dashboard/departments' },
    { id: 2, title: 'Employees', icon: UserCheck, color: 'text-[#38BDF8]', badge: '614', bgColor: 'bg-lightSky', path: '/dashboard/employee' },
    { id: 3, title: 'Attendance', icon: ClipboardCheck, color: 'text-[#10B981]', badge: '520', bgColor: 'bg-green-50', path: '/dashboard/attendance' },
    { id: 4, title: 'Holidays', icon: CalendarOff, color: 'text-[#F59E0B]', badge: '12', bgColor: 'bg-[#F59E0B]/10', path: '/dashboard/holidays' },
    { id: 5, title: 'Events', icon: CalendarDays, color: 'text-[#8B5CF6]', badge: '5', bgColor: 'bg-[#8B5CF6]/10', path: '/dashboard/events' },
    { id: 6, title: 'Leaves', icon: CalendarCheck, color: 'text-[#EF4444]', badge: '18', bgColor: 'bg-[#EF4444]/10', path: '/dashboard/leaves' },
    { id: 7, title: 'Payroll', icon: CreditCard, color: 'text-[#EC4899]', badge: 'Active', bgColor: 'bg-[#EC4899]/10', path: '/dashboard/payroll' },
    { id: 8, title: 'Accounts', icon: Wallet, color: 'text-[#14B8A6]', badge: 'Updated', bgColor: 'bg-[#14B8A6]/10', path: '/dashboard/accounts' },
    { id: 9, title: 'Reports', icon: FileText, color: 'text-[#6366F1]', badge: 'View', bgColor: 'bg-[#6366F1]/10', path: '/dashboard/reports' },
    { id: 10, title: 'Projects', icon: FolderKanban, color: 'text-[#2563EB]', badge: '84', bgColor: 'bg-[#2563EB]/10', path: '/dashboard/project' },
];

export default function QuickStats() {
    const { isDarkMode } = useTheme();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            {statsData.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Link
                        to={stat.path}
                        key={stat.id}
                        className={`p-6 rounded-[10px] border flex items-center gap-4 transition-all duration-300 group cursor-pointer ${isDarkMode ? 'bg-[#0c162d]/50 backdrop-blur-md border-white/10 shadow-xl hover:border-[#3ec3ff]/50 hover:shadow-[#3ec3ff]/10 hover:-translate-y-1' : 'bg-white border-borderColor shadow-[0px_10px_25px_rgba(0,0,0,0.08)] hover:border-primary/50 hover:shadow-lg hover:-translate-y-1'}`}
                    >
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${isDarkMode ? 'bg-white/5 group-hover:bg-white/10' : stat.bgColor} group-hover:scale-110 transition-transform`}>
                            <Icon size={24} className={isDarkMode ? 'text-[#3ec3ff]' : stat.color} />
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold font-headings transition-colors ${isDarkMode ? 'text-white' : 'text-dark'}`}>{stat.badge}</h3>
                            <p className={`text-[13px] font-medium transition-colors ${isDarkMode ? 'text-gray-400' : 'text-textSecondary'}`}>{stat.title}</p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
