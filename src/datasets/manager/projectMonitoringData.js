import {
    FolderKanban, CheckCircle2, AlertTriangle,
    Plus, ClipboardList, Activity, FileText, Edit, UserPlus
} from 'lucide-react';

// Re-export FileBarChart used in component
export { UserPlus as UserPlusIcon } from 'lucide-react';
const FileBarChart = FileText;

export const projectsOverview = [
    { id: 1, title: 'Active Projects',    count: 6,  percentage: 75, color: '#38BDF8', icon: FolderKanban, trend: '+2 this month' },
    { id: 2, title: 'Completed Projects', count: 12, percentage: 100, color: '#10B981', icon: CheckCircle2, trend: '+4 this month' },
    { id: 3, title: 'Delayed Projects',   count: 2,  percentage: 15, color: '#EF4444', icon: AlertTriangle, trend: 'Critical attention' },
];

export const milestones = [
    { project: 'HRM Portal',   milestone: 'Dashboard UI', deadline: 'Apr 10, 2026', status: 'In Progress', progress: 70,  color: '#38BDF8' },
    { project: 'Employee App', milestone: 'Backend API',  deadline: 'Apr 15, 2026', status: 'In Progress', progress: 40,  color: '#38BDF8' },
    { project: 'Payroll Sys',  milestone: 'Tax Module',   deadline: 'May 05, 2026', status: 'Pending',     progress: 0,   color: '#F59E0B' },
    { project: 'Client Portal',milestone: 'Final Testing',deadline: 'Mar 28, 2026', status: 'Delayed',     progress: 85,  color: '#EF4444' },
    { project: 'Mobile App',   milestone: 'Store Release',deadline: 'Apr 25, 2026', status: 'Completed',   progress: 100, color: '#10B981' },
];

export const workloadData = [
    { team: 'Frontend', tasks: 10 },
    { team: 'Backend',  tasks: 8 },
    { team: 'QA Team',   tasks: 6 },
    { team: 'Design',   tasks: 4 },
    { team: 'DevOps',   tasks: 3 },
];

export const completionRateData = [
    { name: 'Completed',   value: 55, color: '#10B981' },
    { name: 'In Progress', value: 30, color: '#38BDF8' },
    { name: 'Pending',     value: 10, color: '#F59E0B' },
    { name: 'Delayed',     value: 5,  color: '#EF4444' },
];

export const horizontalTimeline = [
    { stage: 'Project Kickoff', date: 'Mar 1',  status: 'Completed', progress: 100, color: '#10B981' },
    { stage: 'Design Phase',    date: 'Mar 10', status: 'Completed', progress: 100, color: '#10B981' },
    { stage: 'Development',     date: 'Mar 20', status: 'In Progress', progress: 65, color: '#38BDF8' },
    { stage: 'Testing Phase',   date: 'Apr 5',  status: 'Pending',     progress: 0,  color: '#F59E0B' },
    { stage: 'Release',         date: 'Apr 20', status: 'Pending',     progress: 0,  color: '#F59E0B' },
];

export const riskIssues = [
    { id: 1, project: 'HRM Portal',   type: 'Deadline Risk', impact: 'High',   team: 'Frontend Team', status: 'Under Review', color: '#EF4444' },
    { id: 2, project: 'Employee App', type: 'Resource Risk', impact: 'Medium', team: 'Backend Team',  status: 'Resolved',     color: '#F59E0B' },
    { id: 3, project: 'Mobile App',   type: 'Scope Creep',   impact: 'Low',    team: 'Design Team',   status: 'In Discussion',  color: '#10B981' },
    { id: 4, project: 'Payroll Sys',  type: 'Security Risk', impact: 'High',   team: 'QA Team',       status: 'Investigating', color: '#EF4444' },
];

export const recentUpdates = [
    { id: 1, update: 'Frontend team completed dashboard module', time: '10 min ago', icon: CheckCircle2, color: '#10B981' },
    { id: 2, update: 'QA team started testing phase for Employee App', time: '1 hour ago', icon: Activity, color: '#38BDF8' },
    { id: 3, update: 'Milestone updated for HRM Portal', time: '3 hours ago', icon: Edit, color: '#F59E0B' },
    { id: 4, update: 'Project report generated for Q1', time: 'Yesterday', icon: FileText, color: '#8b5cf6' },
];

export const projectQuickActions = [
    { label: 'Create New Project', icon: Plus,          color: 'bg-blue-600' },
    { label: 'Add Milestone',      icon: ClipboardList, color: 'bg-indigo-600' },
    { label: 'Assign Team',        icon: UserPlus,      color: 'bg-emerald-600' },
    { label: 'Generate Report',    icon: FileBarChart,  color: 'bg-amber-600' },
];
