import { FileText, ShieldCheck, CheckCircle2, Activity, AlertTriangle } from 'lucide-react';

export const policyCategories = [
    { name: 'Workplace Conduct', value: 8, color: '#38BDF8' },
    { name: 'Leave Policies', value: 6, color: '#10B981' },
    { name: 'Attendance', value: 5, color: '#8B5CF6' },
    { name: 'Data Privacy', value: 4, color: '#F59E0B' },
    { name: 'Remote Work', value: 3, color: '#06B6D4' },
];

export const complianceStatus = [
    { name: 'Compliant', value: 85, color: '#10B981' },
    { name: 'Pending Review', value: 10, color: '#F59E0B' },
    { name: 'Violations', value: 5, color: '#EF4444' },
];

export const adoptionTrend = [
    { month: 'Jan', rate: 60 },
    { month: 'Feb', rate: 68 },
    { month: 'Mar', rate: 75 },
    { month: 'Apr', rate: 80 },
    { month: 'May', rate: 85 },
];

export const policies = [
    { id: 'POL-001', name: 'Employee Code of Conduct', category: 'Workplace Conduct', dept: 'All', effective: 'Jan 2024', compliance: 'Compliant', updated: 'Feb 2025' },
    { id: 'POL-002', name: 'Annual Leave Policy', category: 'Leave Policies', dept: 'All', effective: 'Mar 2024', compliance: 'Compliant', updated: 'Jan 2025' },
    { id: 'POL-003', name: 'Remote Work Guidelines', category: 'Remote Work', dept: 'Engineering', effective: 'Feb 2024', compliance: 'Pending Review', updated: 'Mar 2025' },
    { id: 'POL-004', name: 'Data Security Policy', category: 'Data Privacy', dept: 'All', effective: 'Jan 2024', compliance: 'Compliant', updated: 'Dec 2024' },
    { id: 'POL-005', name: 'Attendance & Punctuality Policy', category: 'Attendance', dept: 'All', effective: 'Apr 2024', compliance: 'Compliant', updated: 'Feb 2025' },
    { id: 'POL-006', name: 'Workplace Anti-Harassment', category: 'Workplace Conduct', dept: 'All', effective: 'Jun 2023', compliance: 'Violation Detected', updated: 'Jan 2025' },
    { id: 'POL-007', name: 'GDPR Compliance Framework', category: 'Data Privacy', dept: 'All', effective: 'May 2023', compliance: 'Compliant', updated: 'Dec 2024' },
    { id: 'POL-008', name: 'Part-Time & Flex Work Policy', category: 'Remote Work', dept: 'HR', effective: 'Jul 2024', compliance: 'Pending Review', updated: 'Mar 2025' },
];

export const acknowledgments = [
    { id: 'ACK-001', employee: 'Rahul Sharma', dept: 'Engineering', policy: 'Code of Conduct', date: 'Mar 12', status: 'Acknowledged' },
    { id: 'ACK-002', employee: 'Priya Nair', dept: 'Human Resources', policy: 'Leave Policy', date: 'Mar 11', status: 'Acknowledged' },
    { id: 'ACK-003', employee: 'Amit Kumar', dept: 'Sales', policy: 'Data Security Policy', date: 'Mar 9', status: 'Pending' },
    { id: 'ACK-004', employee: 'Ananya Mehta', dept: 'Marketing', policy: 'Remote Work Guidelines', date: 'Mar 8', status: 'Pending' },
    { id: 'ACK-005', employee: 'Vikram Singh', dept: 'Engineering', policy: 'Data Security Policy', date: 'Mar 7', status: 'Acknowledged' },
    { id: 'ACK-006', employee: 'Deepa Reddy', dept: 'Finance', policy: 'Attendance Policy', date: 'Mar 6', status: 'Acknowledged' },
];

export const policyRecentUpdates = [
    { text: 'Remote Work Policy updated — New hybrid model guidelines added', time: '2 hours ago', icon: FileText, color: 'text-blue-500' },
    { text: 'Data Security Policy revised — GDPR compliance addendum', time: 'Yesterday', icon: ShieldCheck, color: 'text-emerald-500' },
    { text: 'Employee Code of Conduct reviewed and re-published', time: '2 days ago', icon: CheckCircle2, color: 'text-violet-500' },
    { text: 'New attendance guidelines published for all departments', time: '4 days ago', icon: Activity, color: 'text-amber-500' },
    { text: 'Workplace Anti-Harassment policy violation flagged for review', time: '1 week ago', icon: AlertTriangle, color: 'text-red-500' },
];

export const policyCategoryFilters = ['All Categories', 'Workplace Conduct', 'Leave Policies', 'Attendance', 'Data Privacy', 'Remote Work'];
export const policyDepts = ['All Departments', 'All', 'Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance'];
export const policyStatusFilters = ['All Status', 'Active', 'Draft', 'Archived'];
export const policyComplianceFilters = ['All Compliance', 'Compliant', 'Pending Review', 'Violation Detected'];
