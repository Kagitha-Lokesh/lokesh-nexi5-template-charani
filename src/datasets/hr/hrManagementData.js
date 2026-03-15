import {
    Users, UserCheck, Briefcase, CalendarOff, TrendingUp,
    CheckCircle2, LayoutGrid, FileText, Activity, BarChart3,
    ClipboardList, UserPlus
} from 'lucide-react';

// Local aliases to avoid hoisting issues
const LocalFileCheck = CheckCircle2;
const LocalLayers = Activity;
const LocalFileBarChart = BarChart3;

export const hrStatsCards = [
    { title: 'Total Employees', value: '614', label: 'Employees', icon: Users, color: '#3182ce', bgColor: 'bg-blue-500/10' },
    { title: 'Active HR Staff', value: '8', label: 'Staff', icon: UserCheck, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'Open Job Positions', value: '12', label: 'Jobs', icon: Briefcase, color: '#e53e3e', bgColor: 'bg-red-500/10' },
    { title: 'Employees On Leave', value: '18', label: 'On Leave', icon: CalendarOff, color: '#f6ad55', bgColor: 'bg-orange-500/10' },
    { title: 'New Hires', value: '25', label: 'This Month', icon: UserPlus, color: '#38a169', bgColor: 'bg-green-500/10' },
    { title: 'Turnover Rate', value: '4%', label: 'Turnover', icon: TrendingUp, color: '#d53f8c', bgColor: 'bg-pink-500/10' },
];

export const hrHiringTrendData = [
    { month: 'Jan', hires: 12 },
    { month: 'Feb', hires: 18 },
    { month: 'Mar', hires: 15 },
    { month: 'Apr', hires: 25 },
    { month: 'May', hires: 22 },
    { month: 'Jun', hires: 28 },
];

export const hrDistributionData = [
    { name: 'Engineering', value: 220, color: '#3182ce' },
    { name: 'Marketing', value: 60, color: '#38a169' },
    { name: 'HR', value: 45, color: '#805ad5' },
    { name: 'Finance', value: 30, color: '#ecc94b' },
    { name: 'Sales', value: 50, color: '#f6ad55' },
    { name: 'Operations', value: 80, color: '#d53f8c' },
];

export const recruitmentMetrics = [
    { label: 'Open Positions', value: 12, icon: Briefcase, color: 'text-blue-500' },
    { label: 'Applications', value: 84, icon: FileText, color: 'text-purple-500' },
    { label: 'Interviews', value: 32, icon: ClipboardList, color: 'text-orange-500' },
    { label: 'Offers Issued', value: 10, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Onboarding', value: 8, icon: UserPlus, color: 'text-pink-500' },
];

export const hrEmployeeActivities = [
    { name: 'John Smith', dept: 'Engineering', action: 'Leave Applied', module: 'Leave Module', date: 'Today', status: 'Pending' },
    { name: 'Sarah Lee', dept: 'Marketing', action: 'Joined Company', module: 'Onboarding', date: 'Yesterday', status: 'Completed' },
    { name: 'David Brown', dept: 'HR', action: 'Updated Profile', module: 'Employee Module', date: 'Today', status: 'Completed' },
    { name: 'Emily Clark', dept: 'Finance', action: 'Payroll Processed', module: 'Payroll', date: 'Yesterday', status: 'Completed' },
];

export const hrDeptWorkforce = [
    { dept: 'Engineering', employees: 220, managers: 6, projects: 28, attendance: '96%', score: 'Excellent' },
    { dept: 'HR', employees: 45, managers: 2, projects: 5, attendance: '94%', score: 'Good' },
    { dept: 'Finance', employees: 30, managers: 1, projects: 2, attendance: '98%', score: 'Excellent' },
    { dept: 'Marketing', employees: 60, managers: 2, projects: 10, attendance: '92%', score: 'Good' },
];

export const hrActivitiesData = [
    { text: 'New employee onboarding completed', time: '2 hours ago', icon: UserCheck, color: 'text-green-500' },
    { text: 'Payroll approved for June 2026', time: '5 hours ago', icon: LocalFileCheck, color: 'text-blue-500' },
    { text: 'New job posting: Senior React Developer', time: 'Yesterday', icon: Briefcase, color: 'text-purple-500' },
    { text: 'Leave request approved for Sarah Jenkins', time: '2 days ago', icon: CheckCircle2, color: 'text-orange-500' },
    { text: 'New department "Data Science" created', time: '3 days ago', icon: LayoutGrid, color: 'text-indigo-500' },
];

export const hrQuickActions = [
    { label: 'Add Employee', icon: UserPlus, color: 'text-blue-500' },
    { label: 'Create Job Posting', icon: Briefcase, color: 'text-purple-500' },
    { label: 'View Recruitment Pipeline', icon: LocalLayers, color: 'text-orange-500' },
    { label: 'Generate HR Report', icon: LocalFileBarChart, color: 'text-pink-500' },
    { label: 'View Attendance Dashboard', icon: LayoutGrid, color: 'text-emerald-500' },
];
