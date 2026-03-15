import { CheckCircle2, MessageSquare, UserCheck, Calendar, XCircle } from 'lucide-react';

export const interviewPipelineData = [
    { stage: 'Interviews Scheduled', count: 45, fill: '#38BDF8' },
    { stage: 'Technical Completed', count: 30, fill: '#8B5CF6' },
    { stage: 'HR Completed', count: 22, fill: '#3B82F6' },
    { stage: 'Final Interviews', count: 12, fill: '#F59E0B' },
    { stage: 'Offers Recommended', count: 7, fill: '#10B981' },
];

export const interviewerPerformance = [
    { name: 'John', conducted: 12, passed: 7, rejected: 4, pending: 1 },
    { name: 'Sarah', conducted: 9, passed: 5, rejected: 3, pending: 1 },
    { name: 'David', conducted: 7, passed: 4, rejected: 2, pending: 1 },
    { name: 'Emily', conducted: 6, passed: 3, rejected: 2, pending: 1 },
];

export const outcomesData = [
    { name: 'Selected', value: 12, color: '#10B981' },
    { name: 'Rejected', value: 25, color: '#EF4444' },
    { name: 'Pending Decision', value: 10, color: '#F59E0B' },
    { name: 'Offer Recommended', value: 7, color: '#38BDF8' },
];

export const interviews = [
    { id: 'IV-001', candidate: 'Rahul Sharma', role: 'Frontend Developer', dept: 'Engineering', interviewer: 'John', type: 'Technical', date: 'Mar 20', status: 'Scheduled' },
    { id: 'IV-002', candidate: 'Priya Nair', role: 'HR Executive', dept: 'Human Resources', interviewer: 'Sarah', type: 'HR Round', date: 'Mar 19', status: 'Pending Feedback' },
    { id: 'IV-003', candidate: 'Amit Kumar', role: 'Sales Manager', dept: 'Sales', interviewer: 'David', type: 'Final Round', date: 'Mar 18', status: 'Completed' },
    { id: 'IV-004', candidate: 'Ananya Mehta', role: 'Marketing Specialist', dept: 'Marketing', interviewer: 'Emily', type: 'Technical', date: 'Mar 17', status: 'Scheduled' },
    { id: 'IV-005', candidate: 'Vikram Singh', role: 'Backend Developer', dept: 'Engineering', interviewer: 'John', type: 'Managerial', date: 'Mar 16', status: 'Completed' },
    { id: 'IV-006', candidate: 'Deepa Reddy', role: 'Financial Analyst', dept: 'Finance', interviewer: 'Sarah', type: 'HR Round', date: 'Mar 15', status: 'Cancelled' },
    { id: 'IV-007', candidate: 'Saurabh Joshi', role: 'DevOps Engineer', dept: 'Engineering', interviewer: 'David', type: 'Technical', date: 'Mar 14', status: 'Pending Feedback' },
    { id: 'IV-008', candidate: 'Neha Kapoor', role: 'UI/UX Designer', dept: 'Design', interviewer: 'Emily', type: 'Final Round', date: 'Mar 13', status: 'Scheduled' },
];

export const interviewActivities = [
    { text: 'Technical interview completed for Backend Developer role', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500' },
    { text: 'HR interview feedback submitted by Sarah for Priya Nair', time: '3 hours ago', icon: MessageSquare, color: 'text-blue-500' },
    { text: 'Candidate shortlisted after final interview — Sales Manager', time: 'Yesterday', icon: UserCheck, color: 'text-violet-500' },
    { text: 'Interview rescheduled for Sales Manager position (Mar 20)', time: '2 days ago', icon: Calendar, color: 'text-amber-500' },
    { text: 'Interview cancelled for Finance Analyst — candidate withdrew', time: '3 days ago', icon: XCircle, color: 'text-red-500' },
];

export const interviewRoles = ['All Roles', 'Frontend Developer', 'Backend Developer', 'HR Executive', 'Sales Manager', 'DevOps Engineer'];
export const interviewDepts = ['All Departments', 'Engineering', 'Human Resources', 'Sales', 'Marketing', 'Finance', 'Design'];
export const interviewerList = ['All Interviewers', 'John', 'Sarah', 'David', 'Emily'];
export const interviewStageFilters = ['All Stages', 'Technical Interview', 'HR Interview', 'Managerial Interview', 'Final Round'];
export const interviewStatusFilters = ['All Status', 'Scheduled', 'Completed', 'Pending Feedback', 'Cancelled'];
export const interviewDateRanges = [{ label: 'Last 7 Days', value: '7' }, { label: 'Last 30 Days', value: '30' }, { label: 'Last 90 Days', value: '90' }];
