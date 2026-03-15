import { 
    Users, Package, ClipboardCheck, Calendar 
} from 'lucide-react';

export const onboardingStatsData = [
    { label: 'Employee Details', value: 342, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', path: '/dashboard/employees' },
    { label: 'Asset Management', value: 12, icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10', path: '/dashboard/hr-executive/assets' },
    { label: 'Attendance Overview', value: 310, icon: ClipboardCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10', path: '/dashboard/attendance' },
    { label: 'Leave Requests', value: 8, icon: Calendar, color: 'text-amber-500', bg: 'bg-amber-500/10', path: '/dashboard/leaves' },
];

export const pipelineStagesData = [
    { id: 'offer-accepted', title: 'Offer Accepted', color: 'bg-blue-500' },
    { id: 'docs-submitted', title: 'Documents Submitted', color: 'bg-indigo-500' },
    { id: 'verification', title: 'Verification in Progress', color: 'bg-amber-500' },
    { id: 'orientation', title: 'Orientation Scheduled', color: 'bg-purple-500' },
    { id: 'onboarded', title: 'Onboarding Completed', color: 'bg-emerald-500' },
];

export const candidatePipelineData = {
    'offer-accepted': [
        { id: 'CAN-001', name: 'Rahul Sharma', role: 'Frontend Developer', dept: 'Engineering', date: 'Apr 15', hr: 'Ananya' },
    ],
    'docs-submitted': [
        { id: 'CAN-002', name: 'Sneha Gupta', role: 'Product Designer', dept: 'Design', date: 'Apr 18', hr: 'Ravi' },
    ],
    'verification': [
        { id: 'CAN-005', name: 'Amit Singh', role: 'Backend Dev', dept: 'Engineering', date: 'Apr 10', hr: 'Ananya' },
    ],
    'orientation': [
        { id: 'CAN-003', name: 'Priya Verma', role: 'QA Engineer', dept: 'QA', date: 'Apr 20', hr: 'Ravi' },
    ],
    'onboarded': [
        { id: 'CAN-004', name: 'Kavya Nair', role: 'HR Operations', dept: 'HR', date: 'Apr 05', hr: 'Ananya' },
    ],
};

export const upcomingJoinersData = [
    { name: 'Rahul Sharma', position: 'Frontend Developer', department: 'Engineering', joiningDate: 'Apr 15', stage: 'Document Verification', hr: 'Ananya' },
    { name: 'Priya Verma', position: 'QA Engineer', department: 'QA', joiningDate: 'Apr 20', stage: 'Orientation', hr: 'Ravi' },
    { name: 'Sneha Gupta', position: 'Product Designer', department: 'Design', joiningDate: 'Apr 18', stage: 'Offer Accepted', hr: 'Ravi' },
];

export const recentOnboardingActivityData = [
    { text: 'Documents uploaded by Rahul Sharma', time: '2 hours ago', type: 'upload' },
    { text: 'Orientation scheduled for Priya Verma', time: '4 hours ago', type: 'scheduled' },
    { text: 'Background verification started for Amit Singh', time: 'Yesterday', type: 'verification' },
    { text: 'Offer accepted by Kavya Nair', time: '2 days ago', type: 'accepted' },
];

export const onboardingFilterOptions = [
    { label: 'Department', options: ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'] },
    { label: 'Joining Date', options: ['Next 7 Days', 'Next 30 Days', 'Apr 2026', 'May 2026'] },
    { label: 'Onboarding Stage', options: ['All Stages', 'Offer Accepted', 'Docs Submitted', 'Verification', 'Orientation'] },
    { label: 'Assigned HR', options: ['All HRs', 'Ananya', 'Ravi', 'Suresh'] },
];
