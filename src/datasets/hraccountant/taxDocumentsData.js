import { ShieldCheck, FileText, Clock, Upload, FilePlus } from 'lucide-react';

export const taxStatsData = [
    { title: "Investment Proofs", count: 84, icon: ShieldCheck, color: "blue" },
    { title: "Tax Declarations", count: 126, icon: FileText, color: "emerald" },
    { title: "Form 16 Issued", count: 45, icon: FilePlus, color: "purple" },
    { title: "Pending Review", count: 32, icon: Clock, color: "amber" },
];

export const taxEmployeeDocuments = [
    { id: "EMP-1012", name: "Rahul Sharma", dept: "Engineering", type: "Investment Proof", year: "2025–26", date: "Mar 12", status: "Verified" },
    { id: "EMP-1015", name: "Priya Nair", dept: "HR", type: "Tax Declaration", year: "2025–26", date: "Mar 10", status: "Pending" },
    { id: "EMP-1022", name: "Kiran Deep", dept: "Operations", type: "Form 16A", year: "2025–26", date: "Mar 08", status: "Verified" },
    { id: "EMP-1031", name: "Amit Verma", dept: "Support", type: "Investment Proof", year: "2025–26", date: "Mar 05", status: "Rejected" },
    { id: "EMP-1045", name: "Sneha Gupta", dept: "Finance", type: "Tax Declaration", year: "2025–26", date: "Mar 02", status: "Verified" },
];

export const taxActivityTimeline = [
    { id: 1, action: "Investment proof uploaded by Rahul Sharma", time: "2 hours ago", icon: Upload, color: "blue" },
    { id: 2, action: "Tax declaration submitted by Priya Nair", time: "5 hours ago", icon: FileText, color: "emerald" },
    { id: 3, action: "Form 16 generated for Finance department", time: "Yesterday", icon: FilePlus, color: "purple" },
];
