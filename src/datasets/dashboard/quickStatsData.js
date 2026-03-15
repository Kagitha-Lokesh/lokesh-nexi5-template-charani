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
    FolderKanban,
    Users,
    UserPlus,
    Shield,
    Briefcase,
    FileSearch,
    BarChart3,
    Bell
} from 'lucide-react';

export const roleStatsData = {
    admin: [
        { id: 1, title: 'Departments', icon: Building2, color: 'text-[#06B6D4]', badge: '7', bgColor: 'bg-[#06B6D4]/10', path: '/dashboard/departments' },
        { id: 2, title: 'Employees', icon: UserCheck, color: 'text-[#38BDF8]', badge: '614', bgColor: 'bg-lightSky', path: '/dashboard/employees' },
        { id: 3, title: 'Projects', icon: FolderKanban, color: 'text-[#2563EB]', badge: '84', bgColor: 'bg-blue-500/10', path: '/dashboard/project' },
        { id: 4, title: 'Attendance', icon: ClipboardCheck, color: 'text-[#10B981]', badge: '520', bgColor: 'bg-green-50', path: '/dashboard/attendance' },
        { id: 5, title: 'Leaves', icon: CalendarCheck, color: 'text-[#EF4444]', badge: '18', bgColor: 'bg-[#EF4444]/10', path: '/dashboard/leaves' },
    ],
    'hr-head': [
        { id: 1, title: 'Employees', icon: Users, color: 'text-[#38BDF8]', badge: '845', bgColor: 'bg-blue-500/10', path: '/dashboard/employees' },
        { id: 2, title: 'Open Jobs', icon: Briefcase, color: 'text-[#8B5CF6]', badge: '12', bgColor: 'bg-violet-500/10', path: '/dashboard/recruitment-overview' },
        { id: 3, title: 'Hiring', icon: UserPlus, color: 'text-[#10B981]', badge: '5', bgColor: 'bg-green-50', path: '/dashboard/hr-head/hiring-requests' },
        { id: 4, title: 'Payroll', icon: CreditCard, color: 'text-[#EC4899]', badge: 'Active', bgColor: 'bg-pink-500/10', path: '/dashboard/hr-head/payroll-approval' },
        { id: 5, title: 'Reports', icon: BarChart3, color: 'text-[#6366F1]', badge: 'View', bgColor: 'bg-indigo-500/10', path: '/dashboard/reports' },
    ],
    'hr-accountant': [
        { id: 1, title: 'Payroll', icon: Wallet, color: 'text-[#EC4899]', badge: 'Active', bgColor: 'bg-pink-500/10', path: '/dashboard/hr-accountant' },
        { id: 2, title: 'Slips', icon: FileText, color: 'text-[#38BDF8]', badge: '450', bgColor: 'bg-blue-500/10', path: '/dashboard/hr-accountant/salary-slips' },
        { id: 3, title: 'Reimburse', icon: CreditCard, color: 'text-[#F59E0B]', badge: '12', bgColor: 'bg-amber-500/10', path: '/dashboard/hr-accountant/reimbursements' },
        { id: 4, title: 'Compliance', icon: Shield, color: 'text-[#10B981]', badge: '100%', bgColor: 'bg-green-50', path: '/dashboard/hr-accountant/statutory-compliance' },
        { id: 5, title: 'Reports', icon: BarChart3, color: 'text-[#6366F1]', badge: 'View', bgColor: 'bg-indigo-500/10', path: '/dashboard/hr-accountant/financial-reports' },
    ],
    bde: [
        { id: 1, title: 'Clients', icon: Users, color: 'text-[#38BDF8]', badge: '48', bgColor: 'bg-blue-500/10', path: '/dashboard/bde/client-management' },
        { id: 2, title: 'Deals', icon: Briefcase, color: 'text-[#8B5CF6]', badge: '15', bgColor: 'bg-violet-500/10', path: '/dashboard/bde/deal-pipeline' },
        { id: 3, title: 'Revenue', icon: CreditCard, color: 'text-[#10B981]', badge: '4.2M', bgColor: 'bg-green-50', path: '/dashboard/bde/revenue-tracking' },
        { id: 4, title: 'Meetings', icon: CalendarDays, color: 'text-[#F59E0B]', badge: '6', bgColor: 'bg-amber-500/10', path: '/dashboard/bde/meetings' },
        { id: 5, title: 'Proposals', icon: FileText, color: 'text-[#EC4899]', badge: '8', bgColor: 'bg-pink-500/10', path: '/dashboard/bde/proposal-management' },
    ],
    manager: [
        { id: 1, title: 'My Team', icon: Users, color: 'text-[#38BDF8]', badge: '12', bgColor: 'bg-blue-500/10', path: '/dashboard/team' },
        { id: 2, title: 'Projects', icon: FolderKanban, color: 'text-[#2563EB]', badge: '8', bgColor: 'bg-blue-500/10', path: '/dashboard/manager/monitoring' },
        { id: 3, title: 'Attendance', icon: ClipboardCheck, color: 'text-[#10B981]', badge: '10', bgColor: 'bg-green-50', path: '/dashboard/manager/team-attendance' },
        { id: 4, title: 'Leaves', icon: CalendarOff, color: 'text-[#EF4444]', badge: '4', bgColor: 'bg-red-500/10', path: '/dashboard/manager/leave-approvals' },
        { id: 5, title: 'Reviews', icon: BarChart3, color: 'text-[#6366F1]', badge: '2', bgColor: 'bg-indigo-500/10', path: '/dashboard/manager/performance-reviews' },
    ],
    'hr-executive': [
        { id: 1, title: 'Employees', icon: UserCheck, color: 'text-[#38BDF8]', badge: '320', bgColor: 'bg-blue-500/10', path: '/dashboard/employees' },
        { id: 2, title: 'Assets', icon: Wallet, color: 'text-[#8B5CF6]', badge: '45', bgColor: 'bg-violet-500/10', path: '/dashboard/hr-executive/assets' },
        { id: 3, title: 'Attendance', icon: ClipboardCheck, color: 'text-[#10B981]', badge: '280', bgColor: 'bg-green-50', path: '/dashboard/attendance' },
        { id: 4, title: 'Leaves', icon: CalendarOff, color: 'text-[#EF4444]', badge: '9', bgColor: 'bg-red-500/10', path: '/dashboard/leaves' },
        { id: 5, title: 'Reports', icon: BarChart3, color: 'text-[#6366F1]', badge: 'View', bgColor: 'bg-indigo-500/10', path: '/dashboard/hr-executive/reports' },
    ],
    employee: [
        { id: 1, title: 'Attendance', icon: ClipboardCheck, color: 'text-[#10B981]', badge: '98%', bgColor: 'bg-green-50', path: '/dashboard/attendance' },
        { id: 2, title: 'Leaves', icon: CalendarCheck, color: 'text-[#EF4444]', badge: '12', bgColor: 'bg-red-500/10', path: '/dashboard/leaves' },
        { id: 3, title: 'Holidays', icon: CalendarOff, color: 'text-[#F59E0B]', badge: '8', bgColor: 'bg-amber-500/10', path: '/dashboard/holidays' },
        { id: 4, title: 'Events', icon: CalendarDays, color: 'text-[#8B5CF6]', badge: '3', bgColor: 'bg-[#8B5CF6]/10', path: '/dashboard/events' },
        { id: 5, title: 'Notifs', icon: Bell, color: 'text-[#6366F1]', badge: '5', bgColor: 'bg-indigo-500/10', path: '/dashboard/notifications' },
    ]
};
