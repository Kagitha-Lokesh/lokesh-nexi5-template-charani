import { 
    Users, Briefcase, ClipboardList, FolderKanban, 
    Receipt, ShieldCheck 
} from 'lucide-react';

export const statsCards = [
    { title: 'Total Employees', value: 845, label: 'Employees', icon: Users, color: '#38BDF8', bgColor: 'bg-blue-500/10', path: '/dashboard/employees' },
    { title: 'Open Job Positions', value: 12, label: 'Open Jobs', icon: Briefcase, color: '#8B5CF6', bgColor: 'bg-violet-500/10', path: '/dashboard/hr-head/recruitment-management' },
    { title: 'Hiring Requests', value: 5, label: 'Pending Approvals', icon: ClipboardList, color: '#F59E0B', bgColor: 'bg-amber-500/10', path: '/dashboard/hr-head/hiring-requests' },
    { title: 'Project Allocation', value: 92, label: 'Team Allocated %', icon: FolderKanban, color: '#10B981', bgColor: 'bg-emerald-500/10', path: '/dashboard/project' },
    { title: 'Payroll Approvals', value: 3, label: 'Pending Batches', icon: Receipt, color: '#EC4899', bgColor: 'bg-pink-500/10', path: '/dashboard/hr-head/payroll-approval' },
    { title: 'Policy Reviews', value: 4, label: 'Pending Reviews', icon: ShieldCheck, color: '#6366F1', bgColor: 'bg-indigo-500/10', path: '/dashboard/hr-head/hr-policies-compliance' },
];
