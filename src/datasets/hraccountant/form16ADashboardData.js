import { FileCheck, ShieldCheck, Send, FileDown } from 'lucide-react';

export const form16ARecords = [
    { id: 'EMP-1012', name: 'Rahul Sharma', dept: 'Engineering', q: 'Q2', fy: '2025–26', status: 'Generated', email: 'rahul@company.com', sentDate: 'Mar 15' },
    { id: 'EMP-1015', name: 'Priya Nair', dept: 'HR', q: 'Q3', fy: '2025–26', status: 'Pending', email: 'priya@company.com', sentDate: 'Pending' },
    { id: 'EMP-1022', name: 'Kiran Deep', dept: 'Operations', q: 'Q2', fy: '2025–26', status: 'Generated', email: 'kiran@company.com', sentDate: 'Mar 14' },
    { id: 'EMP-1031', name: 'Amit Verma', dept: 'Support', q: 'Q2', fy: '2025–26', status: 'Filed', email: 'amit@company.com', sentDate: 'Mar 13' },
    { id: 'EMP-1045', name: 'Sneha Gupta', dept: 'Finance', q: 'Q3', fy: '2025–26', status: 'Pending', email: 'sneha@company.com', sentDate: 'Pending' },
];

export const form16AFilingTracker = [
    { quarter: 'Q1', status: 'Filed', date: 'Jul 31, 2025' },
    { quarter: 'Q2', status: 'Filed', date: 'Oct 31, 2025' },
    { quarter: 'Q3', status: 'Pending', date: 'Expected: Jan 31' },
    { quarter: 'Q4', status: 'Not Started', date: '-' },
];

export const form16AActivityTimeline = [
    { text: 'Q2 Form 16A certificates generated', time: '2 hours ago', icon: FileCheck, color: 'text-emerald-500' },
    { text: 'TDS filing submitted to government portal', time: '5 hours ago', icon: ShieldCheck, color: 'text-blue-500' },
    { text: 'Certificate emailed to employees', time: 'Yesterday', icon: Send, color: 'text-indigo-500' },
    { text: 'Quarterly compliance report exported', time: 'Mar 11', icon: FileDown, color: 'text-purple-500' },
];
