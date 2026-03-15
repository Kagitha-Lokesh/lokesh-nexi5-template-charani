import { Plus, Building2, CheckCircle2, FileText } from 'lucide-react';

export const campaigns = [
    { id: 'BC-2026-01', name: 'Annual Performance Bonus 2026', type: 'Performance', active: true },
    { id: 'BC-2026-02', name: 'Festival Bonus',                type: 'Festival',    active: false },
    { id: 'BC-2026-03', name: 'Sales Incentive Program',       type: 'Sales',       active: true },
    { id: 'BC-2026-04', name: 'Project Reward - NEXI5 v1.0',   type: 'Project',     active: true },
    { id: 'BC-2026-05', name: 'Retention Bonus Q1',            type: 'Retention',   active: false },
];

export const deptPools = [
    { name: 'Engineering', total: 1200000, used: 850000, color: 'text-blue-500',   bg: 'bg-blue-500/10' },
    { name: 'Sales',       total: 1500000, used: 1100000, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Marketing',   total: 600000,  used: 420000, color: 'text-amber-500',   bg: 'bg-amber-500/10' },
    { name: 'HR',          total: 300000,  used: 280000, color: 'text-rose-500',    bg: 'bg-rose-500/10' },
];

export const allocations = [
    { id: 'EMP-1012', name: 'Rahul Sharma',   dept: 'Engineering', rating: 4.5, base: 85000, rec: 30000, apprv: 28000, status: 'Pending' },
    { id: 'EMP-1015', name: 'Priya Nair',     dept: 'HR',          rating: 4.2, base: 72000, rec: 25000, apprv: 25000, status: 'Approved' },
    { id: 'EMP-1022', name: 'Amit Kumar',     dept: 'Sales',       rating: 4.8, base: 68000, rec: 40000, apprv: 38000, status: 'Pending' },
    { id: 'EMP-1030', name: 'Sneha Patel',    dept: 'Marketing',   rating: 4.0, base: 62000, rec: 20000, apprv: 20000, status: 'Approved' },
    { id: 'EMP-1041', name: 'Vijay Reddy',    dept: 'Finance',     rating: 3.8, base: 78000, rec: 15000, apprv: 0,     status: 'Rejected' },
    { id: 'EMP-1053', name: 'Asha Menon',     dept: 'Support',     rating: 4.6, base: 58000, rec: 25000, apprv: 25000, status: 'Paid' },
];

export const pendingApprovals = [
    { name: 'Rahul Sharma', dept: 'Engineering', amt: '₹28,000', by: 'Manager', status: 'Pending' },
    { name: 'Amit Kumar',  dept: 'Sales',       amt: '₹38,000', by: 'Manager', status: 'Pending' },
];

export const bonusActivity = [
    { text: 'Bonus campaign created for FY2026',           time: '1 day ago',   icon: Plus,           color: 'text-blue-500' },
    { text: 'Engineering department bonus pool updated',   time: 'Yesterday',   icon: Building2,      color: 'text-emerald-500' },
    { text: 'Bonus approved for Priya Nair (₹25,000)',      time: '3 hours ago', icon: CheckCircle2,   color: 'text-green-500' },
    { text: 'Bonus report exported for Management review', time: '5 hours ago', icon: FileText,       color: 'text-amber-500' },
];

export const BONUS_STATUS_STYLE = {
    Pending:  'bg-amber-500/10  text-amber-500  border-amber-500/20',
    Approved: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    Rejected: 'bg-red-500/10    text-red-500    border-red-500/20',
    Paid:     'bg-blue-500/10   text-blue-500   border-blue-500/20',
};

export const BONUS_DEPARTMENTS = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
export const CAMPAIGN_TYPES = ['All', 'Performance', 'Sales Incentive', 'Festival', 'Project Reward', 'Retention'];
