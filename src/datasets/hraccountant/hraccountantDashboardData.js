import { 
    CheckCircle2, Clock, CreditCard, AlertTriangle, 
    TrendingUp, BarChart3, DollarSign, FileText, Download
} from 'lucide-react';

export const hrAccountantStatsCards = [
    { title: 'Payroll Status', value: 312, label: 'Processed', icon: CheckCircle2, color: '#10B981', bgColor: 'bg-emerald-500/10', path: '/dashboard/payroll' },
    { title: 'Pending Payroll', value: 18, label: 'Employees', icon: Clock, color: '#F59E0B', bgColor: 'bg-amber-500/10', path: '/dashboard/hr-accountant/process-payroll' },
    { title: 'Reimbursements', value: 9, label: 'Requests', icon: CreditCard, color: '#8B5CF6', bgColor: 'bg-violet-500/10', path: '/dashboard/hr-accountant/reimbursements' },
    { title: 'Tax Compliance', value: 3, label: 'Pending Filings', icon: AlertTriangle, color: '#EF4444', bgColor: 'bg-red-500/10', path: '/dashboard/hr-accountant/statutory-compliance' },
    { title: 'Bonus Management', value: 12, label: 'Calculated', icon: TrendingUp, color: '#06B6D4', bgColor: 'bg-cyan-500/10', path: '/dashboard/hr-accountant/bonus-management' },
    { title: 'Financial Reports', value: 5, label: 'Generated', icon: BarChart3, color: '#6366F1', bgColor: 'bg-indigo-500/10', path: '/dashboard/hr-accountant/financial-reports' },
];

export const salaryDistribution = [
    { name: 'Engineering', value: 42, color: '#38BDF8' },
    { name: 'Sales', value: 25, color: '#8B5CF6' },
    { name: 'Marketing', value: 14, color: '#10B981' },
    { name: 'HR', value: 9, color: '#F59E0B' },
    { name: 'Finance', value: 11, color: '#EF4444' },
    { name: 'Support', value: 13, color: '#06B6D4' },
];

export const monthlyPayrollTrend = [
    { month: 'Jan', amount: 95 },
    { month: 'Feb', amount: 97 },
    { month: 'Mar', amount: 102 },
    { month: 'Apr', amount: 108 },
    { month: 'May', amount: 110 },
];

export const taxCompliance = [
    { name: 'PF Submitted', value: 70, color: '#10B981' },
    { name: 'ESI Filed', value: 20, color: '#38BDF8' },
    { name: 'TDS Pending', value: 10, color: '#EF4444' },
];

export const payrollActivity = [
    { id: 'PR-2041', name: 'Rahul Sharma', dept: 'Engineering', salary: '₹85k', deductions: '₹3k', netPay: '₹82k', status: 'Processed' },
    { id: 'PR-2042', name: 'Priya Nair', dept: 'HR', salary: '₹72k', deductions: '₹2k', netPay: '₹70k', status: 'Pending' },
    { id: 'PR-2043', name: 'Amit Kumar', dept: 'Sales', salary: '₹68k', deductions: '₹3k', netPay: '₹65k', status: 'Processed' },
    { id: 'PR-2044', name: 'Sneha Patel', dept: 'Marketing', salary: '₹61k', deductions: '₹2.5k', netPay: '₹58.5k', status: 'Pending' },
    { id: 'PR-2045', name: 'Vijay Reddy', dept: 'Finance', salary: '₹78k', deductions: '₹4k', netPay: '₹74k', status: 'Failed' },
    { id: 'PR-2046', name: 'Asha Menon', dept: 'Support', salary: '₹55k', deductions: '₹2k', netPay: '₹53k', status: 'Processed' },
];

export const reimbursements = [
    { name: 'Rahul Sharma', dept: 'Engineering', type: 'Travel', amount: '₹4,200', date: 'Mar 12', status: 'Pending' },
    { name: 'Priya Nair', dept: 'HR', type: 'Medical', amount: '₹2,800', date: 'Mar 11', status: 'Approved' },
    { name: 'Amit Kumar', dept: 'Sales', type: 'Fuel', amount: '₹1,600', date: 'Mar 10', status: 'Pending' },
    { name: 'Sneha Patel', dept: 'Marketing', type: 'Training', amount: '₹8,500', date: 'Mar 9', status: 'Approved' },
];

export const hrAccountantQuickActions = [
    { label: 'Process Payroll', icon: DollarSign, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', path: '/dashboard/payroll' },
    { label: 'Approve Reimbursements', icon: CheckCircle2, color: 'text-blue-500', bgColor: 'bg-blue-500/10', path: '/dashboard/reimbursements' },
    { label: 'Generate Salary Reports', icon: BarChart3, color: 'text-violet-500', bgColor: 'bg-violet-500/10', path: '/dashboard/reports' },
    { label: 'Review Tax Compliance', icon: FileText, color: 'text-amber-500', bgColor: 'bg-amber-500/10', path: '/dashboard/reports' },
    { label: 'Download Payroll Sheet', icon: Download, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', path: '/dashboard/reports' },
];

export const financialActivities = [
    { text: 'Payroll processed for Engineering department', time: '2 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Salary revision approved for Sales team', time: '5 hours ago', icon: TrendingUp, color: 'text-blue-500' },
    { text: 'PF contribution submitted for March', time: 'Yesterday', icon: FileText, color: 'text-violet-500' },
    { text: 'Reimbursement approved for Marketing employee', time: '2 days ago', icon: CreditCard, color: 'text-amber-500' },
    { text: 'TDS mismatch flagged in Finance batch PR-1106', time: '3 days ago', icon: AlertTriangle, color: 'text-red-500' },
];
