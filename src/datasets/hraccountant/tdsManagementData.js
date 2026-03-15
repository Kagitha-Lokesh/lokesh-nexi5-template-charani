import { Users, Banknote, Clock, ShieldCheck, Calculator, FileText, RefreshCw } from 'lucide-react';

export const taxSummary = [
    { title: "Employees with Tax Deductions", value: 110, icon: Users, color: "blue" },
    { title: "Total Tax Deducted", value: 475000, icon: Banknote, color: "emerald", isCurrency: true },
    { title: "Pending Tax Deductions", value: 62000, icon: Clock, color: "amber", isCurrency: true },
    { title: "Tax Filed with Government", value: 413000, icon: ShieldCheck, color: "purple", isCurrency: true },
];

export const employeeTaxRecords = [
    { id: "EMP-1012", name: "Rahul Sharma", dept: "Engineering", salary: 1200000, regime: "New Regime", estimatedTax: 85000 },
    { id: "EMP-1015", name: "Priya Nair", dept: "HR", salary: 950000, regime: "Old Regime", estimatedTax: 62000 },
    { id: "EMP-1022", name: "Kiran Deep", dept: "Operations", salary: 1500000, regime: "New Regime", estimatedTax: 125000 },
    { id: "EMP-1031", name: "Amit Verma", dept: "Support", salary: 800000, regime: "Old Regime", estimatedTax: 45000 },
];

export const monthlyDeductions = [
    { name: "Rahul Sharma", salary: 100000, taxable: 82000, monthlyTds: 7500, totalTds: 52500, status: "Paid" },
    { name: "Priya Nair", salary: 80000, taxable: 65000, monthlyTds: 5200, totalTds: 36400, status: "Pending" },
    { name: "Kiran Deep", salary: 125000, taxable: 105000, monthlyTds: 12000, totalTds: 84000, status: "Paid" },
    { name: "Amit Verma", salary: 66000, taxable: 52000, monthlyTds: 3800, totalTds: 26600, status: "Processing" },
];

export const taxDocuments = [
    { name: "Form 16", employee: "Rahul Sharma", year: "2025–2026", date: "Mar 15", status: "Generated" },
    { name: "Form 16A", employee: "Priya Nair", year: "2025–2026", date: "-", status: "Pending" },
    { name: "TDS Certificate", employee: "Kiran Deep", year: "2025–2026", date: "Mar 12", status: "Generated" },
    { name: "Investment Proofs", employee: "Amit Verma", year: "2025–2026", date: "Mar 10", status: "Uploaded" },
];

export const tdsFilingSteps = [
    { id: 1, title: "Tax Deduction Calculation", status: "completed", date: "Mar 10" },
    { id: 2, title: "Quarterly TDS Filing", status: "completed", date: "Mar 12" },
    { id: 3, title: "Payment Submission", status: "current", date: "Mar 14 (Expected)" },
    { id: 4, title: "Government Acknowledgment", status: "waiting", date: "-" },
];

export const tdsRecentActivity = [
    { id: 1, action: "Monthly TDS deductions calculated", time: "2 hours ago", icon: Calculator },
    { id: 2, action: "Quarterly tax filing completed", time: "5 hours ago", icon: ShieldCheck },
    { id: 3, action: "Form 16 generated for employees", time: "Yesterday", icon: FileText },
    { id: 4, action: "Tax declarations updated for EMP-1045", time: "Mar 12", icon: RefreshCw },
];
