import { 
    History, User, ShieldAlert, Lock, Save, Shield, Key, Clock, FileSearch
} from 'lucide-react';

export const auditStats = [
    { title: 'Total System Events', value: '1,284', label: 'Events', icon: History, color: '#3182ce', bgColor: 'bg-blue-500/10' },
    { title: 'Admin Actions Today', value: '32', label: 'Admin Actions', icon: User, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'Security Alerts', value: '3', label: 'Security Alerts', icon: ShieldAlert, color: '#e53e3e', bgColor: 'bg-red-500/10' },
    { title: 'Failed Login Attempts', value: '5', label: 'Failed Logins', icon: Lock, color: '#f6ad55', bgColor: 'bg-orange-500/10' },
];

export const activityTrend = [
    { day: 'Mon', activity: 120 },
    { day: 'Tue', activity: 150 },
    { day: 'Wed', activity: 180 },
    { day: 'Thu', activity: 140 },
    { day: 'Fri', activity: 210 },
    { day: 'Sat', activity: 90 },
    { day: 'Sun', activity: 70 },
];

export const moduleActions = [
    { module: 'Employee', actions: 450 },
    { module: 'Recruitment', actions: 320 },
    { module: 'Payroll', actions: 180 },
    { module: 'Attendance', actions: 240 },
    { module: 'Projects', actions: 150 },
    { module: 'Settings', actions: 120 },
];

export const auditLogs = [
    { time: '2026-03-20 10:32', user: 'Admin', role: 'Admin', module: 'Permissions', action: 'Updated Role Access', ip: '192.168.1.12', status: 'Success' },
    { time: '2026-03-20 10:15', user: 'Sarah Lee', role: 'HR Executive', module: 'Recruitment', action: 'Created Job Posting', ip: '192.168.1.24', status: 'Success' },
    { time: '2026-03-20 09:55', user: 'David Brown', role: 'Manager', module: 'Leave', action: 'Approved Leave', ip: '192.168.1.35', status: 'Success' },
    { time: '2026-03-20 09:22', user: 'Unknown', role: '—', module: 'Login', action: 'Failed Login Attempt', ip: '192.168.1.56', status: 'Failed' },
];

export const activeUsers = [
    { user: 'Admin', role: 'Admin', actions: 48, last: 'Today' },
    { user: 'Sarah Lee', role: 'HR Executive', actions: 22, last: 'Today' },
    { user: 'David Brown', role: 'Manager', actions: 16, last: 'Yesterday' },
    { user: 'Emily Clark', role: 'HR Accountant', actions: 14, last: 'Yesterday' },
];

export const criticalEvents = [
    { text: 'Permission changes detected for Manager role', time: '2 hours ago', icon: Key, color: 'text-red-500' },
    { text: 'Multiple failed login attempts from IP 192.168.1.56', time: '4 hours ago', icon: ShieldAlert, color: 'text-orange-500' },
    { text: 'Payroll configuration updated by Admin', time: 'Yesterday', icon: Save, color: 'text-blue-500' },
    { text: 'Role permissions modified: HR Executive', time: 'Yesterday', icon: Shield, color: 'text-purple-500' },
    { text: 'System settings updated: 2FA enforced', time: '2 days ago', icon: Lock, color: 'text-emerald-500' },
];

export const auditQuickActions = [
    { label: 'Export Audit Logs', icon: History, color: 'text-blue-500', bgColor: 'bg-blue-500/10' }, // Changed Download to History for consistency if needed, or stick to orig
    { label: 'View Security Dashboard', icon: Shield, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
    { label: 'Manage Permissions', icon: Key, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Review System Alerts', icon: ShieldAlert, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { label: 'Download Compliance Report', icon: FileSearch, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
];

export const auditFilterOptions = {
    roles: ['All Roles', 'Admin', 'HR Manager', 'HR Executive', 'Employee'],
    modules: ['All Modules', 'Employee Management', 'Recruitment', 'Payroll', 'System Settings'],
    actions: ['All Actions', 'Create', 'Update', 'Delete', 'Login']
};
