import { 
    Users, ShieldCheck, LayoutGrid, ShieldAlert, Monitor, Shield, Cloud, 
    Activity, Database, Zap, Clock, Key, Lock, Save, FileText, Settings
} from 'lucide-react';

export const systemStats = [
    { title: 'Total Users', value: '614', label: 'Users', icon: Users, color: '#3ec3ff', bgColor: 'bg-blue-500/10' },
    { title: 'Active Roles', value: '7', label: 'Roles', icon: ShieldCheck, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'System Modules', value: '14', label: 'Modules', icon: LayoutGrid, color: '#38a169', bgColor: 'bg-green-500/10' },
    { title: 'System Alerts', value: '2', label: 'Alerts', icon: ShieldAlert, color: '#e53e3e', bgColor: 'bg-red-500/10' },
];

export const platformConfigs = [
    { name: 'Organization Information', value: 'NEXI5 Technologies', type: 'text' },
    { name: 'Default Timezone', value: 'UTC +5:30', type: 'select' },
    { name: 'System Language', value: 'English', type: 'select' },
    { name: 'Date & Time Format', value: 'DD/MM/YYYY', type: 'select' },
    { name: 'Email Notification Settings', value: 'Enabled', type: 'status' },
];

export const securitySettings = [
    { name: 'Two-Factor Authentication', status: 'Enabled', active: true },
    { name: 'Password Policy', status: 'Strong (Alpha-numeric)', active: true },
    { name: 'Login Session Timeout', status: '30 Minutes', active: true },
    { name: 'IP Access Restrictions', status: 'Not Configured', active: false },
    { name: 'Account Lockout Rules', status: '5 Attempts', active: true },
];

export const platformIntegrations = [
    { name: 'Email SMTP Server', status: 'Connected', icon: Settings, color: 'text-blue-500' }, // Replaced Mail with Settings if not imported
    { name: 'Cloud Storage (AWS S3)', status: 'Connected', icon: Cloud, color: 'text-indigo-500' },
    { name: 'HR Analytics Service', status: 'Connected', icon: Activity, color: 'text-emerald-500' },
    { name: 'Payroll API', status: 'Pending Setup', icon: Database, color: 'text-orange-500' },
    { name: 'Notification Service', status: 'Connected', icon: Zap, color: 'text-purple-500' },
];

export const organizationPreferences = [
    { label: 'Company Name', value: 'NEXI5 Technologies' },
    { label: 'Working Hours', value: '9:00 AM - 6:00 PM' },
    { label: 'Payroll Cycle', value: 'Monthly' },
    { label: 'Attendance Policy', value: 'Flexible' },
    { label: 'Holiday Calendar', value: 'Fixed Yearly' },
];

export const systemActivity = [
    { text: 'Admin updated password policy', time: '2 hours ago', icon: Shield, color: 'text-blue-500' },
    { text: 'System integration configured: AWS S3', time: '5 hours ago', icon: Cloud, color: 'text-indigo-500' },
    { text: 'New role permission updated: Manager', time: 'Yesterday', icon: Key, color: 'text-purple-500' },
    { text: 'Security settings modified: 2FA enabled', time: '2 days ago', icon: Lock, color: 'text-emerald-500' },
    { text: 'System backup completed successfully', time: '3 days ago', icon: Save, color: 'text-pink-500' },
];

export const systemQuickActions = [
    { label: 'Backup System Data', icon: Save, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Update Security Settings', icon: Shield, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
    { label: 'Manage Integrations', icon: Settings, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { label: 'Export System Logs', icon: FileText, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
    { label: 'View Audit Logs', icon: Activity, color: 'text-pink-500', bgColor: 'bg-pink-500/10' },
];
