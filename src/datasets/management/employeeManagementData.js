import { 
    Users, UserCheck, UserPlus, Calendar, Laptop, Building2, 
    Edit2, TrendingUp, FileText
} from 'lucide-react';

export const employeeMgmtStatsCards = [
    { title: 'Total Employees', value: '614', label: 'Employees', icon: Users, color: '#3B82F6', bgColor: 'bg-blue-500/10' },
    { title: 'Active Employees', value: '590', label: 'Active', icon: UserCheck, color: '#10B981', bgColor: 'bg-green-500/10' },
    { title: 'New Hires This Month', value: '25', label: 'New Hires', icon: UserPlus, color: '#8B5CF6', bgColor: 'bg-purple-500/10' },
    { title: 'Employees On Leave', value: '18', label: 'On Leave', icon: Calendar, color: '#EF4444', bgColor: 'bg-red-500/10' },
    { title: 'Remote Employees', value: '120', label: 'Remote', icon: Laptop, color: '#06B6D4', bgColor: 'bg-cyan-500/10' },
    { title: 'Departments', value: '7', label: 'Departments', icon: Building2, color: '#F59E0B', bgColor: 'bg-amber-500/10' },
];

export const employeeMgmtGrowthData = [
    { month: 'Jan', hires: 15 },
    { month: 'Feb', hires: 22 },
    { month: 'Mar', hires: 18 },
    { month: 'Apr', hires: 25 },
    { month: 'May', hires: 21 },
    { month: 'Jun', hires: 30 },
];

export const deptDistribution = [
    { name: 'Engineering', value: 220, color: '#3B82F6' },
    { name: 'HR', value: 45, color: '#10B981' },
    { name: 'Finance', value: 30, color: '#8B5CF6' },
    { name: 'Marketing', value: 60, color: '#F59E0B' },
    { name: 'Sales', value: 85, color: '#EC4899' },
    { name: 'Operations', value: 174, color: '#06B6D4' },
];

export const employeeDirectory = [
    { name: 'John Smith', empId: 'EMP001', dept: 'Engineering', role: 'Software Engineer', manager: 'David Lee', status: 'Active', date: 'Jan 10' },
    { name: 'Sarah Johnson', empId: 'EMP002', dept: 'HR', role: 'HR Executive', manager: 'Michael Brown', status: 'Active', date: 'Feb 03' },
    { name: 'David Clark', empId: 'EMP003', dept: 'Marketing', role: 'Marketing Specialist', manager: 'Emma Davis', status: 'Active', date: 'Mar 05' },
    { name: 'Emily Brown', empId: 'EMP004', dept: 'Finance', role: 'Accountant', manager: 'Robert White', status: 'On Leave', date: 'Apr 02' },
];

export const deptWorkforce = [
    { dept: 'Engineering', employees: 220, managers: 6, projects: 28, attendance: '96%', score: 'Excellent' },
    { dept: 'HR', employees: 45, managers: 2, projects: 5, attendance: '94%', score: 'Good' },
    { dept: 'Finance', employees: 30, managers: 1, projects: 2, attendance: '98%', score: 'Excellent' },
    { dept: 'Marketing', employees: 60, managers: 2, projects: 10, attendance: '92%', score: 'Good' },
];

export const employeeMgmtRecentActivities = [
    { text: 'New employee joined Engineering department', time: '2 hours ago', icon: UserPlus, color: 'text-blue-500' },
    { text: 'Employee profile updated: Sarah Johnson', time: '4 hours ago', icon: Edit2, color: 'text-green-500' },
    { text: 'Leave request submitted by David Clark', time: 'Yesterday', icon: Calendar, color: 'text-amber-500' },
    { text: 'Employee promoted to Manager: John Smith', time: '2 days ago', icon: TrendingUp, color: 'text-purple-500' },
    { text: 'Payroll updated for Finance department', time: '3 days ago', icon: FileText, color: 'text-pink-500' },
];
