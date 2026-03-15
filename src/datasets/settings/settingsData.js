import { 
    Users, ShieldCheck, LayoutGrid, ShieldAlert, Languages, Globe, 
    Calendar, Palette, Building2, Clock, RefreshCw, MapPin, Mail, 
    Phone, Navigation, UserCog, Shield, Bell, Lock, Save, FileText, Zap, Download
} from 'lucide-react';

export const settingsStats = [
    { title: 'Total Users', value: '614', label: 'Users', icon: Users, color: '#3ec3ff', bgColor: 'bg-blue-500/10' },
    { title: 'Active Roles', value: '7', label: 'Roles', icon: ShieldCheck, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'System Modules', value: '14', label: 'Modules', icon: LayoutGrid, color: '#38a169', bgColor: 'bg-green-500/10' },
    { title: 'Pending Alerts', value: '2', label: 'Alerts', icon: ShieldAlert, color: '#e53e3e', bgColor: 'bg-red-500/10' },
];

export const generalSettings = [
    { name: 'Default Language', value: 'English', icon: Languages },
    { name: 'Timezone', value: 'UTC +5:30', icon: Globe },
    { name: 'Date Format', value: 'DD/MM/YYYY', icon: Calendar },
    { name: 'System Theme', value: 'Dark Mode', icon: Palette },
];

export const organizationSettings = [
    { label: 'Company Name', value: 'NEXI5 Technologies', icon: Building2 },
    { label: 'Company Address', value: '123 Business Way, Silicon Valley', icon: MapPin },
    { label: 'Company Email', value: 'hr@nexi5.com', icon: Mail },
    { label: 'Company Phone', value: '+1 (555) 001-0022', icon: Phone },
    { label: 'Working Hours', value: '9:00 AM - 6:00 PM', icon: Clock },
    { label: 'Payroll Cycle', value: 'Monthly', icon: RefreshCw },
];

export const notificationSettings = [
    { name: 'Email Notifications', active: true },
    { name: 'System Alerts', active: true },
    { name: 'Payroll Alerts', active: true },
    { name: 'Leave Approval Alerts', active: true },
    { name: 'Recruitment Notifications', active: false },
];

export const securityPolicies = [
    { name: 'Two-Factor Authentication', status: 'Enabled', active: true },
    { name: 'Password Expiry Policy', status: '90 Days', active: true },
    { name: 'Login Session Timeout', status: '30 Minutes', active: true },
    { name: 'IP Access Restrictions', status: 'Not Configured', active: false },
];

export const userPreferences = [
    { label: 'Dashboard Layout', value: 'Default', icon: LayoutGrid },
    { label: 'Landing Page', value: 'Dashboard', icon: Navigation },
    { label: 'Language Preference', value: 'English', icon: Languages },
];

export const recentChanges = [
    { text: 'Admin updated system timezone', time: '2 hours ago', icon: Globe, color: 'text-blue-500' },
    { text: 'Password policy updated', time: '5 hours ago', icon: Shield, color: 'text-purple-500' },
    { text: 'Notification settings modified', time: 'Yesterday', icon: Bell, color: 'text-orange-500' },
    { text: 'Security configuration changed', time: '2 days ago', icon: Lock, color: 'text-emerald-500' },
];

export const settingsQuickActions = [
    { label: 'Backup System', icon: Save, color: 'text-blue-500' },
    { label: 'Reset System Cache', icon: RefreshCw, color: 'text-purple-500' },
    { label: 'Export Configuration', icon: Download, color: 'text-orange-500' },
    { label: 'View System Logs', icon: FileText, color: 'text-pink-500' },
    { label: 'Manage Integrations', icon: Zap, color: 'text-emerald-500' }
];
