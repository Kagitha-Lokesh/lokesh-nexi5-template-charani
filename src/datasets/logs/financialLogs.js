import { CheckCircle2, TrendingUp, FileText, CreditCard, AlertTriangle } from 'lucide-react';

export const financialActivities = [
    { text: 'Payroll processed for Engineering department', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Salary revision approved for Sales team', time: '5 hours ago', icon: TrendingUp, color: 'text-blue-500' },
    { text: 'PF contribution submitted for March', time: 'Yesterday', icon: FileText, color: 'text-violet-500' },
    { text: 'Reimbursement approved for Marketing employee', time: '2 days ago', icon: CreditCard, color: 'text-amber-500' },
    { text: 'TDS mismatch flagged in Finance batch PR-1106', time: '3 days ago', icon: AlertTriangle, color: 'text-red-500' },
];
