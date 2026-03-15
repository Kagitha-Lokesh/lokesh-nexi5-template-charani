import { FileCheck, Send, Grid, RefreshCw } from 'lucide-react';

export const form16InitialRecords = [
    { id: 'EMP-1012', name: 'Rahul Sharma', dept: 'Engineering', fy: '2025–26', date: 'Mar 15', status: 'Generated', email: 'rahul@company.com', sentDate: 'Mar 15' },
    { id: 'EMP-1015', name: 'Priya Nair', dept: 'HR', fy: '2025–26', date: '-', status: 'Pending', email: 'priya@company.com', sentDate: 'Pending' },
    { id: 'EMP-1022', name: 'Kiran Deep', dept: 'Operations', fy: '2025–26', date: 'Mar 14', status: 'Generated', email: 'kiran@company.com', sentDate: 'Mar 14' },
    { id: 'EMP-1031', name: 'Amit Verma', dept: 'Support', fy: '2025–26', date: 'Mar 12', status: 'Sent', email: 'amit@company.com', sentDate: 'Mar 13' },
    { id: 'EMP-1045', name: 'Sneha Gupta', dept: 'Finance', fy: '2025–26', date: 'Mar 10', status: 'Generated', email: 'sneha@company.com', sentDate: 'Pending' },
];

export const form16ActivityTimeline = [
    { text: 'Form 16 generated for Engineering department', time: '2 hours ago', icon: FileCheck, color: 'text-emerald-500' },
    { text: 'Certificate emailed to Rahul Sharma', time: '5 hours ago', icon: Send, color: 'text-blue-500' },
    { text: 'Bulk generation completed for Finance team', time: 'Yesterday', icon: Grid, color: 'text-purple-500' },
    { text: 'Certificate regenerated for Priya Nair', time: 'Mar 12', icon: RefreshCw, color: 'text-amber-500' },
];
