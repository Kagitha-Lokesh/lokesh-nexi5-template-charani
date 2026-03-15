import { CalendarOff, CheckCircle2, FolderKanban, Award, BarChart3, FileText, Calendar } from 'lucide-react';

export const kanbanProjects = {
    Planning: [
        { name: 'Analytics Revamp', members: ['RS', 'PK'], deadline: 'Mar 28', status: 'Planning' },
        { name: 'Mobile App Design', members: ['AN', 'VJ'], deadline: 'Apr 05', status: 'Planning' },
    ],
    'In Progress': [
        { name: 'Employee Portal UI', members: ['RS', 'PK', 'AN'], deadline: 'Mar 20', status: 'In Progress' },
        { name: 'Attendance Module', members: ['VJ', 'MK'], deadline: 'Mar 22', status: 'In Progress' },
    ],
    Review: [
        { name: 'Payroll Dashboard', members: ['RS', 'PK'], deadline: 'Mar 16', status: 'Review' },
    ],
    Completed: [
        { name: 'HR Analytics Page', members: ['AN', 'RS', 'VJ'], deadline: 'Mar 10', status: 'Completed' },
        { name: 'Leave Management', members: ['MK', 'PK'], deadline: 'Mar 08', status: 'Completed' },
    ],
};

export const kanbanColumnColors = {
    Planning: { bg: 'bg-violet-500/10', text: 'text-violet-500', border: 'border-violet-500/20', dot: 'bg-violet-500' },
    'In Progress': { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', dot: 'bg-blue-400' },
    Review: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20', dot: 'bg-amber-500' },
    Completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
};

export const pendingApprovals = [
    { person: 'Rahul Sharma', type: 'Leave Requests', detail: '2 days (Mar 18–19)', category: 'leave', icon: CalendarOff, color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { person: 'Ankit Verma', type: 'Task Approvals', detail: 'Homepage Redesign — Task Completed', category: 'task', icon: CheckCircle2, color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
    { person: 'Priya Nair', type: 'Project Updates', detail: 'Employee Portal — Milestone Update', category: 'project', icon: FolderKanban, color: 'text-violet-500', bgColor: 'bg-violet-500/10', borderColor: 'border-violet-500/20' },
    { person: 'Vikram Joshi', type: 'Leave Requests', detail: '1 day — Medical (Mar 20)', category: 'leave', icon: CalendarOff, color: 'text-amber-500', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/20' },
    { person: 'Meera Kapoor', type: 'Task Approvals', detail: 'API Integration — Review Requested', category: 'task', icon: CheckCircle2, color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/20' },
];

export const teamActivities = [
    { text: 'New project assigned to Engineering team', time: '1 hour ago', icon: FolderKanban, color: 'text-blue-500' },
    { text: 'Leave request submitted by Rahul Sharma', time: '2 hours ago', icon: CalendarOff, color: 'text-amber-500' },
    { text: 'Task completed by Sales team', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Project milestone achieved — Payroll Dashboard', time: 'Yesterday', icon: Award, color: 'text-violet-500' },
    { text: 'Team productivity report generated', time: '2 days ago', icon: BarChart3, color: 'text-indigo-500' },
];

export const quickActions = [
    { label: 'Assign New Project', icon: FolderKanban, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/dashboard/project' },
    { label: 'Approve Leave Requests', icon: CalendarOff, color: 'text-amber-500', bg: 'bg-amber-500/10', path: '/dashboard/leaves' },
    { label: 'Generate Team Report', icon: FileText, color: 'text-violet-500', bg: 'bg-violet-500/10', path: '/dashboard/reports' },
    { label: 'Schedule Team Meeting', icon: Calendar, color: 'text-emerald-500', bg: 'bg-emerald-500/10', path: '#' },
];
