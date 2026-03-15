import { 
    Users, Building2, Shield, ClipboardCheck, 
    CalendarCheck, CreditCard, ShieldAlert, Bell 
} from 'lucide-react';

export const adminStatsCards = [
    { title: 'Total Employees', value: '614', label: 'Employees', icon: Users, color: '#38BDF8', bgColor: 'bg-blue-500/10', path: '/dashboard/employees' },
    { title: 'Organization', value: '7', label: 'Departments', icon: Building2, color: '#06B6D4', bgColor: 'bg-cyan-500/10', path: '/dashboard/org-overview' },
    { title: 'User Roles', value: '4', label: 'Manage Roles', icon: Shield, color: '#2563EB', bgColor: 'bg-indigo-500/10', path: '/dashboard/manage-roles' },
    { title: 'Attendance Today', value: '520', label: 'Attendance', icon: ClipboardCheck, color: '#10B981', bgColor: 'bg-emerald-500/10', path: '/dashboard/attendance' },
    { title: 'Leave Requests', value: '18', label: 'Pending', icon: CalendarCheck, color: '#EF4444', bgColor: 'bg-red-500/10', path: '/dashboard/leaves' },
    { title: 'Payroll Processed', value: 'Active', label: 'Global Payroll', icon: CreditCard, color: '#EC4899', bgColor: 'bg-pink-500/10', path: '/dashboard/payroll' },
    { title: 'System Alerts', value: '3', label: 'Audit Logs', icon: ShieldAlert, color: '#6366F1', bgColor: 'bg-violet-500/10', path: '/dashboard/audit-logs' },
];

export const recruitmentSummary = {
    totalOpenJobs: '12',
    newHires: '45',
    activeCandidates: '128'
};

export const payrollDashboardSummary = {
    status: 'Active',
    pendingApprovals: '8',
    totalProcessed: '$1.2M'
};

export const projectDashboardSummary = {
    activeProjects: '24',
    teamAllocation: '85%',
    upcomingDeadlines: '4'
};
