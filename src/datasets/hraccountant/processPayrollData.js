import {
    CheckCircle2, Clock, Activity, AlertTriangle, Download,
    BarChart3, Send, PlayCircle, Calculator
} from 'lucide-react';

export const batchCards = [
    { title: 'Employees in Batch', value: 148, icon: CheckCircle2, color: '#38BDF8', bgColor: 'bg-blue-500/10' },
    { title: 'Verified Attendance', value: 132, icon: Activity, color: '#10B981', bgColor: 'bg-emerald-500/10' },
    { title: 'Pending Calculations', value: 16, icon: Clock, color: '#F59E0B', bgColor: 'bg-amber-500/10' },
];

export const employeePayrollData = [
    { id: 'EMP-1041', name: 'Rahul Sharma', dept: 'Engineering', days: 22, base: '₹85k', allowances: '₹5k', deductions: '₹3k', net: '₹87k', status: 'Pending' },
    { id: 'EMP-1023', name: 'Priya Nair', dept: 'HR', days: 21, base: '₹72k', allowances: '₹4k', deductions: '₹2k', net: '₹74k', status: 'Processed' },
    { id: 'EMP-1077', name: 'Amit Kumar', dept: 'Sales', days: 20, base: '₹68k', allowances: '₹6k', deductions: '₹3k', net: '₹71k', status: 'Pending' },
    { id: 'EMP-1055', name: 'Sneha Patel', dept: 'Marketing', days: 22, base: '₹61k', allowances: '₹3k', deductions: '₹2.5k', net: '₹61.5k', status: 'Calculated' },
    { id: 'EMP-1089', name: 'Vijay Reddy', dept: 'Finance', days: 18, base: '₹78k', allowances: '₹5k', deductions: '₹4k', net: '₹79k', status: 'Error' },
    { id: 'EMP-1034', name: 'Asha Menon', dept: 'Support', days: 22, base: '₹55k', allowances: '₹2k', deductions: '₹1.5k', net: '₹55.5k', status: 'Processed' },
    { id: 'EMP-1062', name: 'Naveen Roy', dept: 'Engineering', days: 21, base: '₹90k', allowances: '₹6k', deductions: '₹4k', net: '₹92k', status: 'Calculated' },
    { id: 'EMP-1091', name: 'Divya Krishnan', dept: 'HR', days: 20, base: '₹65k', allowances: '₹3.5k', deductions: '₹2k', net: '₹66.5k', status: 'Pending' },
];

export const processPayrollDeptDist = [
    { name: 'Engineering', value: 42, color: '#38BDF8' },
    { name: 'Sales', value: 28, color: '#8B5CF6' },
    { name: 'Marketing', value: 14, color: '#10B981' },
    { name: 'HR', value: 10, color: '#F59E0B' },
    { name: 'Finance', value: 12, color: '#EF4444' },
];

export const payrollExpenseTrend = [
    { month: 'Jan', amount: 95 },
    { month: 'Feb', amount: 98 },
    { month: 'Mar', amount: 102 },
    { month: 'Apr', amount: 110 },
];

export const processPayrollTimeline = [
    { text: 'Payroll batch created for March 2026', time: '2 hours ago', icon: PlayCircle, color: 'text-blue-500' },
    { text: 'Attendance data imported successfully', time: '3 hours ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Salary calculation completed for Engineering', time: 'Yesterday', icon: Calculator, color: 'text-violet-500' },
    { text: 'Payroll approved for HR department', time: '2 days ago', icon: CheckCircle2, color: 'text-green-500' },
    { text: 'Tax mismatch flagged in Finance batch', time: '3 days ago', icon: AlertTriangle, color: 'text-red-500' },
];

export const processPayrollQuickActions = [
    { label: 'Start Payroll Batch', icon: PlayCircle, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { label: 'Verify Attendance', icon: CheckCircle2, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10' },
    { label: 'Generate Report', icon: BarChart3, color: 'text-violet-500', bgColor: 'bg-violet-500/10' },
    { label: 'Download Sheet', icon: Download, color: 'text-amber-500', bgColor: 'bg-amber-500/10' },
    { label: 'Send Payslips', icon: Send, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10' },
];

export const PROCESS_DEPARTMENTS = ['All', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Support'];
export const PROCESS_MONTHS = ['March 2026', 'February 2026', 'January 2026'];
export const PROCESS_EMP_TYPES = ['All', 'Full-time', 'Contract'];
export const PROCESS_BATCHES = ['All', 'Batch A', 'Batch B'];
export const PROCESS_ATT_STATUSES = ['All', 'Verified', 'Pending'];
