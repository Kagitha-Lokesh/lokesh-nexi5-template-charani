import { DollarSign, CheckCircle2, BarChart3, FileText, Download } from 'lucide-react';

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

export const quickActions = [
    { label: 'Process Payroll', icon: DollarSign, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', path: '/dashboard/payroll' },
    { label: 'Approve Reimbursements', icon: CheckCircle2, color: 'text-blue-500', bgColor: 'bg-blue-500/10', path: '/dashboard/reimbursements' },
    { label: 'Generate Salary Reports', icon: BarChart3, color: 'text-violet-500', bgColor: 'bg-violet-500/10', path: '/dashboard/reports' },
    { label: 'Review Tax Compliance', icon: FileText, color: 'text-amber-500', bgColor: 'bg-amber-500/10', path: '/dashboard/reports' },
    { label: 'Download Payroll Sheet', icon: Download, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', path: '/dashboard/reports' },
];
