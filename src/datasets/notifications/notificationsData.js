import { 
    Bell, Mail, ShieldAlert, UserCheck, CreditCard, 
    CalendarCheck, Shield, Activity, Zap, AlertTriangle,
    CheckCircle2, Info, Download, Settings
} from 'lucide-react';

export const notificationStats = [
    { title: 'Total Notifications', value: '128', label: 'All', icon: Bell, color: '#3ec3ff', bgColor: 'bg-blue-500/10' },
    { title: 'Unread Notifications', value: '12', label: 'New', icon: Mail, color: '#f6ad55', bgColor: 'bg-orange-500/10' },
    { title: 'System Alerts', value: '3', label: 'Critical', icon: ShieldAlert, color: '#e53e3e', bgColor: 'bg-red-500/10' },
    { title: 'HR Updates', value: '25', label: 'Monthly', icon: UserCheck, color: '#38a169', bgColor: 'bg-green-500/10' },
];

export const notificationItems = [
    { 
        id: 1, 
        text: 'Multiple failed login attempts detected', 
        module: 'Security', 
        priority: 'High', 
        date: 'Today, 2:30 PM', 
        status: 'Critical', 
        icon: ShieldAlert, 
        color: 'text-red-500',
        unread: true
    },
    { 
        id: 2, 
        text: 'New employee onboarding completed for Sarah Jenkins', 
        module: 'HR', 
        priority: 'Medium', 
        date: 'Today, 11:15 AM', 
        status: 'Unread', 
        icon: UserCheck, 
        color: 'text-emerald-500',
        unread: true
    },
    { 
        id: 3, 
        text: 'Payroll processed successfully for March 2026', 
        module: 'Payroll', 
        priority: 'Low', 
        date: 'Today, 9:00 AM', 
        status: 'Read', 
        icon: CreditCard, 
        color: 'text-blue-500',
        unread: false
    },
    { 
        id: 4, 
        text: 'Leave request pending approval: David Miller', 
        module: 'Leave', 
        priority: 'Medium', 
        date: 'Yesterday, 4:45 PM', 
        status: 'Unread', 
        icon: CalendarCheck, 
        color: 'text-orange-500',
        unread: true
    },
    { 
        id: 5, 
        text: 'Recruitment interview scheduled: Senior Developer', 
        module: 'Recruitment', 
        priority: 'Low', 
        date: 'Yesterday, 2:00 PM', 
        status: 'Read', 
        icon: UserCheck, // Replaced BriefcaseIcon with UserCheck or import standard one
        color: 'text-purple-500',
        unread: false
    },
    { 
        id: 6, 
        text: 'Admin permissions updated for user John Doe', 
        module: 'Security', 
        priority: 'High', 
        date: 'Mar 10, 2026', 
        status: 'Read', 
        icon: Shield, 
        color: 'text-red-500',
        unread: false
    }
];

export const notificationCategories = [
    { name: 'HR Updates', count: 45, percentage: 65, color: 'bg-emerald-500' },
    { name: 'Recruitment', count: 28, percentage: 40, color: 'bg-purple-500' },
    { name: 'Payroll Alerts', count: 15, percentage: 25, color: 'bg-blue-500' },
    { name: 'Security', count: 12, percentage: 15, color: 'bg-red-500' },
    { name: 'System Updates', count: 28, percentage: 35, color: 'bg-orange-500' },
];

export const criticalAlerts = [
    { text: 'Multiple failed login attempts detected', time: '2 hours ago', icon: ShieldAlert, color: 'text-red-500' },
    { text: 'Payroll configuration modified', time: '5 hours ago', icon: Activity, color: 'text-blue-500' },
    { text: 'Admin permissions updated', time: 'Yesterday', icon: Shield, color: 'text-purple-500' },
    { text: 'System security settings changed', time: '2 days ago', icon: Zap, color: 'text-orange-500' },
    { text: 'Database backup failed', time: '3 days ago', icon: AlertTriangle, color: 'text-red-600' },
];

export const notificationQuickActions = [
    { label: 'Mark All as Read', icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'View System Alerts', icon: Info, color: 'text-blue-500' },
    { label: 'Export Notifications', icon: Download, color: 'text-orange-500' },
    { label: 'Security Protocols', icon: Shield, color: 'text-red-500' },
    { label: 'Manage Settings', icon: Settings, color: 'text-purple-500' }
];
