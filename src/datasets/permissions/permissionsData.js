import {
    Shield, ShieldAlert, ShieldCheck, Lock,
    Plus, Key, Settings, FileText,
    FileCheck
} from 'lucide-react';

export const permissionsStatsCards = [
    { title: 'Total Roles', value: '7', label: 'Roles', icon: Shield, color: '#3182ce', bgColor: 'bg-blue-500/10' },
    { title: 'Total Permission Rules', value: '24', label: 'Rules', icon: ShieldAlert, color: '#e53e3e', bgColor: 'bg-red-500/10' },
    { title: 'Modules Protected', value: '14', label: 'Modules', icon: Lock, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'Permission Changes Today', value: '3', label: 'Updates', icon: FileCheck, color: '#38a169', bgColor: 'bg-green-500/10' },
];

export const modulesList = [
    'Dashboard', 'Employee Management', 'Recruitment', 'Attendance',
    'Leave Management', 'Payroll', 'Projects', 'Reports',
    'Accounts', 'Notifications', 'Settings'
];

export const permissionRoles = ['Admin', 'HR Head', 'HR Executive', 'HR Accountant', 'Manager', 'Employee'];

export const matrixData = [
    { module: 'Dashboard', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'View', 'HR Accountant': 'View', 'Manager': 'View', 'Employee': 'View' } },
    { module: 'Employee Management', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'View/Edit', 'HR Accountant': 'View', 'Manager': 'View', 'Employee': 'Restricted' } },
    { module: 'Recruitment', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'Full', 'HR Accountant': 'Restricted', 'Manager': 'View', 'Employee': 'Restricted' } },
    { module: 'Attendance', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'View/Edit', 'HR Accountant': 'View', 'Manager': 'Full', 'Employee': 'View/Create' } },
    { module: 'Leave Management', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'Full', 'HR Accountant': 'View', 'Manager': 'Full', 'Employee': 'View/Create' } },
    { module: 'Payroll', permissions: { 'Admin': 'Full', 'HR Head': 'Approve', 'HR Executive': 'Restricted', 'HR Accountant': 'Full', 'Manager': 'Restricted', 'Employee': 'View' } },
    { module: 'Projects', permissions: { 'Admin': 'Full', 'HR Head': 'View', 'HR Executive': 'Restricted', 'HR Accountant': 'View', 'Manager': 'Full', 'Employee': 'View' } },
    { module: 'Reports', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'View', 'HR Accountant': 'Full', 'Manager': 'View', 'Employee': 'Restricted' } },
    { module: 'Accounts', permissions: { 'Admin': 'Full', 'HR Head': 'View', 'HR Executive': 'Restricted', 'HR Accountant': 'Full', 'Manager': 'Restricted', 'Employee': 'Restricted' } },
    { module: 'Notifications', permissions: { 'Admin': 'Full', 'HR Head': 'Full', 'HR Executive': 'Full', 'HR Accountant': 'Full', 'Manager': 'Full', 'Employee': 'Full' } },
    { module: 'Settings', permissions: { 'Admin': 'Full', 'HR Head': 'View', 'HR Executive': 'Restricted', 'HR Accountant': 'Restricted', 'Manager': 'Restricted', 'Employee': 'Restricted' } },
];

export const roleSummaries = [
    { role: 'Admin', count: 35, total: 35, label: 'Full Access', color: 'bg-indigo-500' },
    { role: 'HR Head', count: 24, total: 35, label: '24 Permissions', color: 'bg-blue-500' },
    { role: 'HR Executive', count: 18, total: 35, label: '18 Permissions', color: 'bg-sky-500' },
    { role: 'HR Accountant', count: 16, total: 35, label: '16 Permissions', color: 'bg-pink-500' },
    { role: 'Manager', count: 12, total: 35, label: '12 Permissions', color: 'bg-amber-500' },
    { role: 'Employee', count: 8, total: 35, label: '8 Permissions', color: 'bg-gray-400' },
];

export const moduleAccess = [
    { name: 'Employee Management', roles: 4, level: 'High Control', updated: '2 days ago' },
    { name: 'Payroll', roles: 2, level: 'Restricted access', updated: '1 week ago' },
    { name: 'Recruitment', roles: 3, level: 'Departmental', updated: 'Yesterday' },
    { name: 'System Settings', roles: 1, level: 'Admin Only', updated: '1 month ago' },
];

export const permissionsAnalyticsData = [
    { name: 'Admin', permissions: 35 },
    { name: 'HR Head', permissions: 24 },
    { name: 'HR Exec', permissions: 18 },
    { name: 'HR Acc', permissions: 16 },
    { name: 'Manager', permissions: 12 },
    { name: 'Employee', permissions: 8 },
];

export const permissionsPieData = [
    { name: 'View Only', value: 45, color: '#38BDF8' },
    { name: 'Full Access', value: 25, color: '#6366F1' },
    { name: 'Edit Rights', value: 20, color: '#10B981' },
    { name: 'Restricted', value: 10, color: '#F43F5E' },
];

export const permissionsRecentActivity = [
    { text: 'Admin updated HR Executive permissions', time: '2 hours ago', icon: ShieldCheck, color: 'text-blue-500' },
    { text: 'Payroll access granted to HR Accountant', time: '5 hours ago', icon: Key, color: 'text-green-500' },
    { text: 'Manager role updated for Project Allocation', time: 'Yesterday', icon: Settings, color: 'text-amber-500' },
    { text: 'New permission rule added', time: '2 days ago', icon: Plus, color: 'text-indigo-500' },
];

export const permissionsQuickActions = [
    { label: 'Create Permission Rule', icon: Plus, color: 'text-blue-500' },
    { label: 'Assign Permission to Role', icon: Key, color: 'text-indigo-500' },
    { label: 'View Audit Logs', icon: FileCheck, color: 'text-pink-500' },
    { label: 'Export Permission Matrix', icon: FileText, color: 'text-amber-500' },
];
