import { Plus, Calendar, FileText, BarChart3 } from 'lucide-react';

export const recentSalesActivity = [
    { id: 1, text: 'New lead added: TechNova Solutions (IT)', time: '1 hour ago', type: 'lead' },
    { id: 2, text: 'Proposal sent to Global Finance Ltd', time: '3 hours ago', type: 'proposal' },
    { id: 3, text: 'Meeting scheduled with Zenith Retail', time: '5 hours ago', type: 'meeting' },
    { id: 4, text: 'Deal closed with EcoEnergy Systems', time: 'Yesterday', type: 'closed' },
];

export const quickSalesActions = [
    { label: 'Add New Lead', icon: Plus, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Schedule Meeting', icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { label: 'Create Proposal', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Sales Reports', icon: BarChart3, color: 'text-emerald-500', bg: 'bg-emerald-500/10' }
];
