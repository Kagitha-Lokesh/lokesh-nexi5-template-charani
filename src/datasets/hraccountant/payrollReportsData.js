import {
    CheckCircle2, Clock, Banknote, FileCheck,
    Users, DownloadCloud, TrendingUp
} from 'lucide-react';

export const payrollProgressData = [
    { label: 'Payroll Processed', value: 110, suffix: ' Employees', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Pending Payroll', value: 8, suffix: ' Employees', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Salary Paid', value: 1.2, suffix: ' Cr', prefix: '₹', icon: Banknote, color: 'text-blue-500', bg: 'bg-blue-50' },
];

export const monthlyTrendData = [
    { month: 'Jan', amount: 85 },
    { month: 'Feb', amount: 92 },
    { month: 'Mar', amount: 110 },
    { month: 'Apr', amount: 120 },
];

export const salaryDistData = [
    { name: 'Basic Salary', value: 60, color: '#3ec3ff' },
    { name: 'Allowances', value: 25, color: '#a855f7' },
    { name: 'Bonuses', value: 10, color: '#f59e0b' },
    { name: 'Deductions', value: 5, color: '#ef4444' },
];

export const deptPayrollData = [
    { dept: 'Engineering', amount: 60, employees: 45 },
    { dept: 'Sales', amount: 25, employees: 30 },
    { dept: 'HR', amount: 8, employees: 10 },
    { dept: 'Finance', amount: 10, employees: 8 },
    { dept: 'Operations', amount: 12, employees: 15 },
];

export const employeePayrollRecords = [
    { id: 'EMP-1012', name: 'Rahul Sharma', dept: 'Engineering', salary: '₹1,00,000', allow: '₹20,000', deduct: '₹15,000', net: '₹1,05,000', status: 'Processed' },
    { id: 'EMP-1015', name: 'Priya Nair', dept: 'HR', salary: '₹80,000', allow: '₹10,000', deduct: '₹8,000', net: '₹82,000', status: 'Pending' },
    { id: 'EMP-1022', name: 'Vikram Singh', dept: 'Sales', salary: '₹90,000', allow: '₹15,000', deduct: '₹10,000', net: '₹95,000', status: 'Processed' },
    { id: 'EMP-1031', name: 'Neha Gupta', dept: 'Engineering', salary: '₹1,20,000', allow: '₹25,000', deduct: '₹18,000', net: '₹1,27,000', status: 'Failed' },
];

export const payrollActivity = [
    { id: 1, text: 'March payroll processed for Engineering department', time: '2 hours ago', icon: FileCheck, color: 'text-emerald-500' },
    { id: 2, text: 'Salary slips generated for 110 employees', time: '4 hours ago', icon: Users, color: 'text-blue-500' },
    { id: 3, text: 'Payroll export downloaded by HR Accountant', time: 'Yesterday', icon: DownloadCloud, color: 'text-amber-500' },
    { id: 4, text: 'Payroll adjustments updated for Sales team', time: '2 days ago', icon: TrendingUp, color: 'text-violet-500' },
];

export const payrollFilterOptions = [
    { label: 'Payroll Month', options: ['March', 'February', 'January'] },
    { label: 'Financial Year', options: ['2025–2026', '2024–2025'] },
    { label: 'Department', options: ['All Departments', 'Engineering', 'Sales', 'HR'] },
    { label: 'Employee Type', options: ['All Types', 'Full Time', 'Contract', 'Intern'] },
    { label: 'Payroll Status', options: ['All Status', 'Processed', 'Pending', 'Failed'] },
];
