import { 
    Building2, Target, FileCheck, DollarSign, FolderKanban, 
    AlertCircle, Zap, CalendarDays, BarChart3, Layers
} from 'lucide-react';

export const statsCards = [
    { title: 'Total Clients', value: '16', label: 'Clients', icon: Building2, color: '#3182ce', bgColor: 'bg-blue-500/10' },
    { title: 'Active Business Deals', value: '12', label: 'Deals', icon: Target, color: '#805ad5', bgColor: 'bg-purple-500/10' },
    { title: 'Active Contracts', value: '10', label: 'Contracts', icon: FileCheck, color: '#38a169', bgColor: 'bg-green-500/10' },
    { title: 'Revenue This Quarter', value: '$2.3M', label: 'Revenue', icon: DollarSign, color: '#f6ad55', bgColor: 'bg-orange-500/10' },
    { title: 'Projects Delivered', value: '84', label: 'Projects', icon: FolderKanban, color: '#3182ce', bgColor: 'bg-indigo-500/10' },
    { title: 'Pending Client Requests', value: '5', label: 'Pending', icon: AlertCircle, color: '#e53e3e', bgColor: 'bg-red-500/10' },
];

export const revenueTrendData = [
    { month: 'Jan', revenue: 240 },
    { month: 'Feb', revenue: 380 },
    { month: 'Mar', revenue: 320 },
    { month: 'Apr', revenue: 450 },
    { month: 'May', revenue: 520 },
    { month: 'Jun', revenue: 610 },
];

export const revenueByClientData = [
    { name: 'Fidel Softech', value: 320, fill: '#3182ce' },
    { name: 'Ariyog', value: 210, fill: '#805ad5' },
    { name: 'Global Finance', value: 180, fill: '#38a169' },
    { name: 'RetailHub', value: 250, fill: '#f6ad55' },
    { name: 'TechStream', value: 150, fill: '#d53f8c' },
];

export const industryDistribution = [
    { name: 'IT Services', value: 35, color: '#3182ce' },
    { name: 'Healthcare', value: 20, color: '#38a169' },
    { name: 'Finance', value: 15, color: '#805ad5' },
    { name: 'Retail', value: 15, color: '#f6ad55' },
    { name: 'Education', value: 10, color: '#ecc94b' },
    { name: 'Government', value: 5, color: '#d53f8c' },
];

export const activeClients = [
    { name: 'Fidel Softech', industry: 'IT Services', projects: 6, manager: 'John Smith', status: 'Active', revenue: '$320K' },
    { name: 'Ariyog', industry: 'Healthcare', projects: 4, manager: 'Sarah Lee', status: 'Active', revenue: '$210K' },
    { name: 'Global Finance', industry: 'Finance', projects: 3, manager: 'David Brown', status: 'Active', revenue: '$180K' },
    { name: 'RetailHub', industry: 'Retail', projects: 5, manager: 'Emily Clark', status: 'Active', revenue: '$250K' },
];

export const businessOpportunities = [
    { name: 'Mobile App Development', client: 'Ariyog', value: '$120K', stage: 'Proposal', owner: 'BDE Team', date: 'Apr 12' },
    { name: 'Enterprise HR Platform', client: 'Global Finance', value: '$240K', stage: 'Negotiation', owner: 'BDE Team', date: 'May 03' },
    { name: 'Retail CRM Integration', client: 'RetailHub', value: '$80K', stage: 'Lead', owner: 'BDE Team', date: 'Apr 20' },
];

export const clientProjectsData = [
    { client: 'Fidel Softech', projects: 6 },
    { client: 'Ariyog', projects: 4 },
    { client: 'Global Finance', projects: 3 },
    { client: 'RetailHub', projects: 5 },
    { client: 'TechStream', projects: 2 },
];

export const recentActivities = [
    { text: 'New client onboarded: GreenTech Solutions', time: '2 hours ago', icon: Building2, color: 'text-blue-500' },
    { text: 'Contract signed with Ariyog for Phase 2', time: '5 hours ago', icon: FileCheck, color: 'text-green-500' },
    { text: 'Proposal submitted for Global Finance', time: 'Yesterday', icon: Zap, color: 'text-purple-500' }, // Changed FileText to Zap for variety
    { text: 'New project assigned to Engineering team', time: '2 days ago', icon: Zap, color: 'text-pink-500' },
    { text: 'Client meeting scheduled: RetailHub', time: '3 days ago', icon: CalendarDays, color: 'text-amber-500' },
];

export const clientQuickActions = [
    { label: 'Add New Client', icon: Building2, color: 'text-blue-500' },
    { label: 'Create Business Proposal', icon: Target, color: 'text-purple-500' },
    { label: 'View Client Reports', icon: BarChart3, color: 'text-orange-500' },
    { label: 'View Revenue Reports', icon: DollarSign, color: 'text-pink-500' },
    { label: 'Assign Project to Client', icon: Layers, color: 'text-emerald-500' }
];
