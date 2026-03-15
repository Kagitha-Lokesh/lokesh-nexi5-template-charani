import { CheckCircle2, XCircle, FileText, AlertTriangle, Activity } from 'lucide-react';

export const hiringRequests = [
    { id: 'HR-301', dept: 'Engineering', title: 'Backend Developer', requestedBy: 'Manager Rahul', positions: 2, priority: 'High', date: 'Mar 11', status: 'Pending', experience: '3+ Years', type: 'Full Time', budget: '₹10L – ₹14L', reason: 'Expansion of product backend team for Q2 scaling.', managerComment: 'Urgently needed before the April release sprint.' },
    { id: 'HR-302', dept: 'Sales', title: 'Sales Manager', requestedBy: 'Manager Priya', positions: 1, priority: 'Medium', date: 'Mar 10', status: 'Pending', experience: '5+ Years', type: 'Full Time', budget: '₹12L – ₹18L', reason: 'New regional territory requires dedicated leadership.', managerComment: 'Preferably someone with FMCG background.' },
    { id: 'HR-303', dept: 'Marketing', title: 'Digital Marketer', requestedBy: 'Manager Arjun', positions: 1, priority: 'Low', date: 'Mar 9', status: 'Approved', experience: '2+ Years', type: 'Full Time', budget: '₹6L – ₹9L', reason: 'Scale up digital campaigns for upcoming product launch.', managerComment: 'Must have performance marketing experience.' },
    { id: 'HR-304', dept: 'Finance', title: 'Financial Analyst', requestedBy: 'Manager Sonia', positions: 1, priority: 'Medium', date: 'Mar 8', status: 'In Progress', experience: '4+ Years', type: 'Full Time', budget: '₹9L – ₹13L', reason: 'Regulatory compliance team expansion.', managerComment: 'CFA preferred. Immediate joining required.' },
    { id: 'HR-305', dept: 'Engineering', title: 'DevOps Engineer', requestedBy: 'Manager Rahul', positions: 2, priority: 'High', date: 'Mar 7', status: 'Pending', experience: '4+ Years', type: 'Full Time', budget: '₹14L – ₹20L', reason: 'Infrastructure scaling for new data platform.', managerComment: 'AWS/GCP certified preferred.' },
    { id: 'HR-306', dept: 'Human Resources', title: 'HR Specialist', requestedBy: 'Manager David', positions: 1, priority: 'Low', date: 'Mar 6', status: 'Rejected', experience: '3+ Years', type: 'Full Time', budget: '₹5L – ₹8L', reason: 'Headcount growth support.', managerComment: 'Rejected due to current budget freeze.' },
    { id: 'HR-307', dept: 'Sales', title: 'Sales Executive', requestedBy: 'Manager Priya', positions: 3, priority: 'High', date: 'Mar 5', status: 'In Progress', experience: '1+ Year', type: 'Full Time', budget: '₹4L – ₹7L', reason: '3 new city launches require frontline sales team.', managerComment: 'Hindi + English fluency required.' },
];

export const priorityChartData = [
    { name: 'High Priority', value: 8, color: '#EF4444' },
    { name: 'Medium Priority', value: 14, color: '#F59E0B' },
    { name: 'Low Priority', value: 6, color: '#38BDF8' },
];

export const recentActivities = [
    { text: 'Hiring request approved for Engineering department (HR-298)', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Sales department submitted new hiring request (HR-302)', time: '5 hours ago', icon: FileText, color: 'text-blue-500' },
    { text: 'Marketing job request rejected due to budget constraints', time: 'Yesterday', icon: XCircle, color: 'text-red-500' },
    { text: 'Priority updated to High for Backend Developer role', time: '2 days ago', icon: AlertTriangle, color: 'text-amber-500' },
    { text: 'DevOps Engineer request moved to In Progress', time: '3 days ago', icon: Activity, color: 'text-violet-500' },
];

export const hiringDepts = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'Finance', 'Human Resources'];
export const hiringStatuses = ['All Status', 'Pending', 'Approved', 'Rejected', 'In Progress'];
export const hiringPriorities = ['All Priority', 'High', 'Medium', 'Low'];
export const hiringDateRanges = [{ label: 'Last 7 Days', value: '7' }, { label: 'Last 30 Days', value: '30' }, { label: 'Last 90 Days', value: '90' }];

export const hiringQuickActions = [
    { label: 'View Recruitment Pipeline', icon: 'BarChart3', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Approve Pending Requests', icon: 'CheckCircle2', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Generate Hiring Report', icon: 'Download', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Open Workforce Planning', icon: 'Users', color: 'text-violet-500', bg: 'bg-violet-500/10' },
];
