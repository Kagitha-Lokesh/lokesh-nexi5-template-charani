import { CreditCard, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

export const deptPayrollDist = [
    { name: 'Engineering', value: 42, color: '#38BDF8' },
    { name: 'Sales', value: 25, color: '#8B5CF6' },
    { name: 'Support', value: 15, color: '#06B6D4' },
    { name: 'Marketing', value: 12, color: '#10B981' },
    { name: 'Finance', value: 10, color: '#EF4444' },
    { name: 'HR', value: 8, color: '#F59E0B' },
];

export const monthlyTrend = [
    { month: 'Jan', cost: 90 },
    { month: 'Feb', cost: 95 },
    { month: 'Mar', cost: 98 },
    { month: 'Apr', cost: 102 },
    { month: 'May', cost: 108 },
];

export const complianceData = [
    { name: 'Compliant', value: 92, color: '#10B981' },
    { name: 'Pending Verification', value: 6, color: '#F59E0B' },
    { name: 'Compliance Issues', value: 2, color: '#EF4444' },
];

export const payrollRecords = [
    { id: 'PR-1101', employee: 'Rahul Sharma', dept: 'Engineering', base: 85000, bonus: 5000, deductions: 3000, net: 87000, status: 'Pending', empType: 'Full Time', allowances: 4000, tax: 2000, otherDed: 1000, empId: 'EMP-201' },
    { id: 'PR-1102', employee: 'Priya Nair', dept: 'Human Resources', base: 72000, bonus: 4000, deductions: 2500, net: 73500, status: 'Pending', empType: 'Full Time', allowances: 3000, tax: 1800, otherDed: 700, empId: 'EMP-202' },
    { id: 'PR-1103', employee: 'Amit Kumar', dept: 'Sales', base: 68000, bonus: 6000, deductions: 3200, net: 70800, status: 'Pending', empType: 'Full Time', allowances: 2500, tax: 1900, otherDed: 1300, empId: 'EMP-203' },
    { id: 'PR-1104', employee: 'Ananya Mehta', dept: 'Marketing', base: 60000, bonus: 3000, deductions: 2000, net: 61000, status: 'Approved', empType: 'Full Time', allowances: 2000, tax: 1500, otherDed: 500, empId: 'EMP-204' },
    { id: 'PR-1105', employee: 'Vikram Singh', dept: 'Engineering', base: 92000, bonus: 7000, deductions: 4500, net: 94500, status: 'Approved', empType: 'Full Time', allowances: 5000, tax: 2800, otherDed: 1700, empId: 'EMP-205' },
    { id: 'PR-1106', employee: 'Deepa Reddy', dept: 'Finance', base: 75000, bonus: 3500, deductions: 2800, net: 75700, status: 'Rejected', empType: 'Full Time', allowances: 3000, tax: 2000, otherDed: 800, empId: 'EMP-206' },
    { id: 'PR-1107', employee: 'Saurabh Joshi', dept: 'Engineering', base: 88000, bonus: 5500, deductions: 3800, net: 89700, status: 'Processed', empType: 'Full Time', allowances: 4200, tax: 2500, otherDed: 1300, empId: 'EMP-207' },
    { id: 'PR-1108', employee: 'Neha Kapoor', dept: 'Sales', base: 55000, bonus: 8000, deductions: 2200, net: 60800, status: 'Pending', empType: 'Contract', allowances: 1500, tax: 1400, otherDed: 800, empId: 'EMP-208' },
];

export const payrollActivities = [
    { text: 'Payroll batch submitted for April approval — 48 employees', time: '1 hour ago', icon: CreditCard, color: 'text-blue-500' },
    { text: 'Salary adjustment requested for Sales department (PR-1103)', time: '3 hours ago', icon: RefreshCw, color: 'text-amber-500' },
    { text: 'Bonus allocation updated for Marketing team — Q1 incentives', time: 'Yesterday', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'Payroll approved for Finance department — March cycle', time: '2 days ago', icon: CheckCircle2, color: 'text-violet-500' },
    { text: 'Compliance issue flagged in PR-1106 — needs HR review', time: '3 days ago', icon: AlertTriangle, color: 'text-red-500' },
];

export const payrollMonths = ['All Months', 'January', 'February', 'March', 'April', 'May'];
export const payrollDepts = ['All Departments', 'Engineering', 'Sales', 'Marketing', 'Human Resources', 'Finance', 'Customer Support'];
export const payrollEmpTypes = ['All Types', 'Full Time', 'Part Time', 'Contract', 'Intern'];
export const payrollStatuses = ['All Status', 'Pending Approval', 'Approved', 'Rejected', 'Processed'];
export const payrollPaymentStatuses = ['All Payments', 'Paid', 'Unpaid', 'On Hold'];
