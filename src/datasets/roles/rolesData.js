import { 
    Shield, ShieldCheck, Key, Users, Zap, Settings, Plus, UserPlus, Lock, FileText
} from 'lucide-react';

export const rolesStats = [
    { title: 'Total Roles', value: '7', label: 'Roles', icon: Shield, color: '#38BDF8', bgColor: 'bg-blue-500/10' },
    { title: 'Active Roles', value: '6', label: 'Active', icon: ShieldCheck, color: '#10B981', bgColor: 'bg-emerald-500/10' },
    { title: 'System Permissions', value: '24', label: 'Permissions', icon: Key, color: '#F59E0B', bgColor: 'bg-amber-500/10' },
    { title: 'Users Assigned', value: '614', label: 'Users', icon: Users, color: '#6366F1', bgColor: 'bg-violet-500/10' },
];

export const rolesList = [
    { name: 'Admin / CEO', desc: 'Full system control', users: 1, perms: 35, date: 'Jan 2026', status: 'Active' },
    { name: 'HR Head', desc: 'HR strategy management', users: 3, perms: 24, date: 'Jan 2026', status: 'Active' },
    { name: 'HR Executive', desc: 'Recruitment operations', users: 5, perms: 18, date: 'Feb 2026', status: 'Active' },
    { name: 'HR Accountant', desc: 'Payroll management', users: 2, perms: 15, date: 'Feb 2026', status: 'Active' },
    { name: 'Manager', desc: 'Team supervision', users: 8, perms: 12, date: 'Feb 2026', status: 'Active' },
    { name: 'Employee', desc: 'Self-service portal', users: 595, perms: 6, date: 'Feb 2026', status: 'Active' },
];

export const rolePermissions = [
    { role: 'Admin', modules: ['All Modules'], color: 'bg-indigo-500/10 text-indigo-500' },
    { role: 'HR Head', modules: ['Recruitment', 'Employees', 'Payroll Approval'], color: 'bg-blue-500/10 text-blue-500' },
    { role: 'HR Executive', modules: ['Job Posting', 'Interviews', 'Onboarding'], color: 'bg-emerald-500/10 text-emerald-500' },
    { role: 'HR Accountant', modules: ['Payroll', 'Salary Slips', 'Compliance'], color: 'bg-pink-500/10 text-pink-500' },
    { role: 'Manager', modules: ['Team Management', 'Leave Approvals'], color: 'bg-amber-500/10 text-amber-500' },
    { role: 'Employee', modules: ['Attendance', 'Leave', 'Payroll View'], color: 'bg-gray-500/10 text-gray-500' },
];

export const roleAssignmentData = [
    { label: 'Employees', value: 595, total: 614, color: 'bg-blue-500' },
    { label: 'Managers', value: 8, total: 614, color: 'bg-amber-500' },
    { label: 'HR Team Members', value: 10, total: 614, color: 'bg-emerald-500' },
    { label: 'Admin Accounts', value: 1, total: 614, color: 'bg-pink-500' }
];

export const roleActivities = [
    { text: 'New role "HR Accountant" created', time: '5 hours ago', type: 'create' },
    { text: 'Manager role permissions updated', time: 'Yesterday', type: 'update' },
    { text: 'Employee role access modified', time: '2 days ago', type: 'update' },
    { text: 'New HR Executive assigned', time: '3 days ago', type: 'assign' },
];

export const rolesQuickActions = [
    { label: 'Create New Role', icon: Plus, color: 'text-blue-500' },
    { label: 'Assign Role to User', icon: UserPlus, color: 'text-indigo-500' },
    { label: 'View Permission Matrix', icon: Lock, color: 'text-pink-500' },
    { label: 'Export Role Report', icon: FileText, color: 'text-amber-500' }
];
