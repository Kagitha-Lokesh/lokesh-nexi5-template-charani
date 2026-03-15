import { 
    CheckCircle2, Clock, CreditCard, AlertTriangle, 
    TrendingUp, BarChart3 
} from 'lucide-react';

export const statsCards = [
    { title: 'Payroll Status', value: 312, label: 'Processed', icon: CheckCircle2, color: '#10B981', bgColor: 'bg-emerald-500/10', path: '/dashboard/payroll' },
    { title: 'Pending Payroll', value: 18, label: 'Employees', icon: Clock, color: '#F59E0B', bgColor: 'bg-amber-500/10', path: '/dashboard/hr-accountant/process-payroll' },
    { title: 'Reimbursements', value: 9, label: 'Requests', icon: CreditCard, color: '#8B5CF6', bgColor: 'bg-violet-500/10', path: '/dashboard/hr-accountant/reimbursements' },
    { title: 'Tax Compliance', value: 3, label: 'Pending Filings', icon: AlertTriangle, color: '#EF4444', bgColor: 'bg-red-500/10', path: '/dashboard/hr-accountant/statutory-compliance' },
    { title: 'Bonus Management', value: 12, label: 'Calculated', icon: TrendingUp, color: '#06B6D4', bgColor: 'bg-cyan-500/10', path: '/dashboard/hr-accountant/bonus-management' },
    { title: 'Financial Reports', value: 5, label: 'Generated', icon: BarChart3, color: '#6366F1', bgColor: 'bg-indigo-500/10', path: '/dashboard/hr-accountant/financial-reports' },
];
