import { 
    Users, FolderKanban, ClipboardList, 
    CalendarOff, BarChart3 
} from 'lucide-react';

export const teamOverviewCards = [
    { title: 'Total Team Members', value: 18, icon: Users, color: '#38BDF8', bgColor: 'bg-blue-500/10', path: '/dashboard/team' },
    { title: 'Active Projects', value: 6, icon: FolderKanban, color: '#8B5CF6', bgColor: 'bg-violet-500/10', path: '/dashboard/manager/monitoring' },
    { title: 'Team Attendance', value: 16, icon: ClipboardList, color: '#10B981', bgColor: 'bg-emerald-500/10', path: '/dashboard/manager/team-attendance' },
    { title: 'Leave Approvals', value: 3, icon: CalendarOff, color: '#EF4444', bgColor: 'bg-red-500/10', path: '/dashboard/manager/leave-approvals' },
    { title: 'Performance Reviews', value: 2, icon: BarChart3, color: '#F59E0B', bgColor: 'bg-amber-500/10', path: '/dashboard/manager/performance-reviews' },
];
