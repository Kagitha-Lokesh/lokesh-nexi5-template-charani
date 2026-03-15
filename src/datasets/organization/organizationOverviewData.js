import { 
    Users, Building2, FolderKanban, Briefcase, ClipboardCheck, TrendingUp, 
    UserCheck, CheckCircle2, LayoutGrid, FileSearch
} from 'lucide-react';

export const organizationStats = [
    { title: 'Total Employees', value: '614', label: 'Employees', icon: Users, color: '#38BDF8', bgColor: 'bg-blue-500/10' },
    { title: 'Total Departments', value: '7', label: 'Departments', icon: Building2, color: '#06B6D4', bgColor: 'bg-cyan-500/10' },
    { title: 'Active Projects', value: '84', label: 'Projects', icon: FolderKanban, color: '#2563EB', bgColor: 'bg-indigo-500/10' },
    { title: 'Open Positions', value: '12', label: 'Positions', icon: Briefcase, color: '#10B981', bgColor: 'bg-emerald-500/10' },
    { title: 'Attendance Today', value: '520', label: 'Attendance', icon: ClipboardCheck, color: '#F59E0B', bgColor: 'bg-amber-500/10' },
    { title: 'Total Clients', value: '16', label: 'Clients', icon: TrendingUp, color: '#EC4899', bgColor: 'bg-pink-500/10' },
];

export const departmentPerformance = [
    { department: 'Engineering', head: 'David Lee', employees: 220, projects: 28, attendance: '96%', score: 'Excellent', status: 'Active' },
    { department: 'HR', head: 'Sarah Johnson', employees: 45, projects: 5, attendance: '94%', score: 'Good', status: 'Active' },
    { department: 'Finance', head: 'Michael Brown', employees: 30, projects: 2, attendance: '98%', score: 'Excellent', status: 'Active' },
    { department: 'Marketing', head: 'Emma Davis', employees: 60, projects: 10, attendance: '92%', score: 'Good', status: 'Active' },
];

export const employeeDistribution = [
    { name: 'Engineering', value: 220, color: '#38BDF8' },
    { name: 'Marketing', value: 60, color: '#2563EB' },
    { name: 'HR', value: 45, color: '#06B6D4' },
    { name: 'Finance', value: 30, color: '#10B981' },
    { name: 'Sales', value: 50, color: '#F59E0B' },
    { name: 'Operations', value: 80, color: '#EC4899' },
];

export const growthTrends = [
    { month: 'Jan', hires: 15 },
    { month: 'Feb', hires: 32 },
    { month: 'Mar', hires: 28 },
    { month: 'Apr', hires: 45 },
    { month: 'May', hires: 38 },
    { month: 'Jun', hires: 52 },
];

export const projectAllocation = [
    { name: 'Engineering', projects: 28 },
    { name: 'Marketing', projects: 10 },
    { name: 'HR', projects: 5 },
    { name: 'Finance', projects: 2 },
    { name: 'Sales', projects: 15 },
];

export const recentActivities = [
    { text: 'New department created', time: '2 hours ago', icon: Building2, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { text: '5 employees onboarded', time: '5 hours ago', icon: UserCheck, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { text: 'Payroll approved', time: 'Yesterday', icon: CheckCircle2, color: 'text-indigo-500', bgColor: 'bg-indigo-500/10' },
    { text: 'Project assigned to Engineering team', time: '2 days ago', icon: FolderKanban, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
    { text: 'New HR Executive added', time: '3 days ago', icon: LayoutGrid, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
];

export const organizationAlerts = [
    { title: 'Payroll pending approval', details: 'Finance dept, Jun 2026', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
    { title: 'New hiring request submitted', details: 'Engineering dept, 2 positions', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    { title: '3 employees on leave today', details: 'Marketing & HR depts', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
    { title: 'Project milestone approaching', details: 'Client: NexGen Solutions', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' }
];

export const organizationalHierarchy = {
    label: "Admin / CEO",
    subLabel: "Top Management",
    icon: UserCheck, // Replaced ShieldCheck with UserCheck or import
    color: "text-indigo-500",
    children: [
        {
            label: "HR Head",
            subLabel: "HR Management",
            icon: UserCheck,
            color: "text-primary",
            children: [
                { label: "HR Executive", icon: LayoutGrid, color: "text-emerald-500" },
                { label: "HR Accountant", icon: FileSearch, color: "text-pink-500" }
            ]
        },
        {
            label: "Manager",
            subLabel: "Team Lead",
            icon: Users,
            color: "text-amber-500",
            children: [
                { label: "Employees", icon: Users, color: "text-blue-500" }
            ]
        },
        { label: "BDS", icon: TrendingUp, color: "text-cyan-500" }
    ]
};
